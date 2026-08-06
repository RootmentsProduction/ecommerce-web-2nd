import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SystemSettingsService } from '../system-settings/system-settings.service';
import {
  ShiprocketAuthResponse,
  CourierServiceabilityRequest,
  ShiprocketServiceabilityResponse,
  CreateShiprocketOrderPayload,
  CreateShiprocketOrderResponse,
  AssignAwbPayload,
  AssignAwbResponse,
  RequestPickupResponse,
  GenerateLabelResponse,
  GenerateInvoiceResponse,
  GenerateManifestResponse,
  TrackingData,
} from './shipping.types';

@Injectable()
export class ShiprocketService {
  private readonly logger = new Logger(ShiprocketService.name);
  private token: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor(
    private readonly configService: ConfigService,
    private readonly systemSettingsService: SystemSettingsService,
  ) {}

  private getBaseUrl(): string {
    return (
      this.configService.get<string>('SHIPROCKET_BASE_URL') ||
      'https://apiv2.shiprocket.in/v1/external'
    );
  }

  private async getCredentials(): Promise<{ email: string; pass: string }> {
    const dbEmail = await this.systemSettingsService.getSetting('shipping.shiprocket_email');
    const dbPass = await this.systemSettingsService.getSetting('shipping.shiprocket_password');

    const email = dbEmail || this.configService.get<string>('SHIPROCKET_EMAIL') || '';
    const pass = dbPass || this.configService.get<string>('SHIPROCKET_PASSWORD') || '';

    return { email, pass };
  }

  /**
   * Authenticates with Shiprocket API and retrieves JWT token.
   * Auto-refreshes token in memory.
   */
  async authenticate(forceRefresh = false): Promise<string> {
    const now = Date.now();
    if (!forceRefresh && this.token && this.tokenExpiresAt > now + 60000) {
      return this.token;
    }

    const { email, pass } = await this.getCredentials();
    if (!email || !pass) {
      this.logger.warn('Shiprocket email or password not configured.');
      throw new HttpException(
        'Shiprocket credentials are missing. Please configure them in Settings -> Shipping.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const baseUrl = this.getBaseUrl();
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });

      if (!response.ok) {
        const errText = await response.text();
        this.logger.error(`Shiprocket auth failed: HTTP ${response.status} - ${errText}`);
        throw new HttpException(
          `Shiprocket authentication failed (Status ${response.status}). Check credentials.`,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const data = (await response.json()) as ShiprocketAuthResponse;
      if (!data.token) {
        throw new HttpException(
          'Shiprocket response did not contain an authentication token.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      this.token = data.token;
      // Shiprocket tokens usually last ~10 days. We set expiry to 9 days to be safe.
      this.tokenExpiresAt = Date.now() + 9 * 24 * 60 * 60 * 1000;
      this.logger.log('Shiprocket authentication successful. Token cached in memory.');
      return this.token;
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      this.logger.error(`Shiprocket connection error during auth: ${error.message}`);
      throw new HttpException(
        'Unable to connect to Shiprocket API.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Universal fetch wrapper with auto-retry on 401 (token expiration).
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    let token = await this.authenticate();
    const baseUrl = this.getBaseUrl();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers as Record<string, string>),
    };

    let response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized -> Refresh token & retry once
    if (response.status === 401) {
      this.logger.warn('Shiprocket returned 401 Unauthorized. Refreshing token and retrying...');
      token = await this.authenticate(true);
      headers.Authorization = `Bearer ${token}`;
      response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(
        `Shiprocket API Error [${options.method || 'GET'} ${endpoint}]: HTTP ${response.status} - ${errorText}`,
      );
      throw new HttpException(
        `Shiprocket API Error (${response.status}): ${errorText.substring(0, 200)}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return (await response.json()) as T;
  }

  /**
   * Check courier serviceability & rate estimation
   */
  async checkServiceability(
    params: CourierServiceabilityRequest,
  ): Promise<ShiprocketServiceabilityResponse> {
    const query = new URLSearchParams({
      pickup_postcode: params.pickup_postcode,
      delivery_postcode: params.delivery_postcode,
      weight: String(params.weight),
      cod: String(params.cod),
    });

    if (params.length) query.append('length', String(params.length));
    if (params.width) query.append('width', String(params.width));
    if (params.height) query.append('height', String(params.height));
    if (params.declared_value) query.append('declared_value', String(params.declared_value));

    return this.request<ShiprocketServiceabilityResponse>(
      `/courier/serviceability/?${query.toString()}`,
    );
  }

  /**
   * Create an adhoc shipment order on Shiprocket
   */
  async createOrder(payload: CreateShiprocketOrderPayload): Promise<CreateShiprocketOrderResponse> {
    return this.request<CreateShiprocketOrderResponse>('/orders/create/adhoc', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Assign courier & generate AWB code
   */
  async assignAwb(payload: AssignAwbPayload): Promise<AssignAwbResponse> {
    return this.request<AssignAwbResponse>('/courier/assign/awb', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Request shipment pickup
   */
  async requestPickup(shipmentId: string | number): Promise<RequestPickupResponse> {
    return this.request<RequestPickupResponse>('/courier/generate/pickup', {
      method: 'POST',
      body: JSON.stringify({ shipment_id: [shipmentId] }),
    });
  }

  /**
   * Generate shipping label PDF
   */
  async generateLabel(shipmentId: string | number): Promise<GenerateLabelResponse> {
    return this.request<GenerateLabelResponse>('/courier/generate/label', {
      method: 'POST',
      body: JSON.stringify({ shipment_id: [shipmentId] }),
    });
  }

  /**
   * Generate order invoice PDF
   */
  async generateInvoice(orderId: string | number): Promise<GenerateInvoiceResponse> {
    return this.request<GenerateInvoiceResponse>('/orders/print/invoice', {
      method: 'POST',
      body: JSON.stringify({ ids: [orderId] }),
    });
  }

  /**
   * Generate shipment manifest
   */
  async generateManifest(shipmentId: string | number): Promise<GenerateManifestResponse> {
    return this.request<GenerateManifestResponse>('/manifests/generate', {
      method: 'POST',
      body: JSON.stringify({ shipment_id: [shipmentId] }),
    });
  }

  /**
   * Track shipment by AWB code
   */
  async trackByAwb(awb: string): Promise<TrackingData> {
    return this.request<TrackingData>(`/courier/track/awb/${awb}`);
  }

  /**
   * Track shipment by Shipment ID
   */
  async trackByShipmentId(shipmentId: string | number): Promise<TrackingData> {
    return this.request<TrackingData>(`/courier/track/shipment/${shipmentId}`);
  }

  /**
   * Cancel order on Shiprocket
   */
  async cancelOrder(shiprocketOrderId: string | number): Promise<any> {
    return this.request<any>('/orders/cancel', {
      method: 'POST',
      body: JSON.stringify({ ids: [shiprocketOrderId] }),
    });
  }
}
