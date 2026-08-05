import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SHIPPING_PROVIDER, ShippingProvider } from './providers/ShippingProvider';
import { PackageDimensionsService } from './package-dimensions.service';
import { ShippingLogService } from './shipping-log.service';
import { ShippingNotificationService } from './shipping-notification.service';
import { CreateShipmentDto, UpdateShippingSettingsDto } from './shipping.dto';
import { ShipmentStatus, PickupStatus } from '../generated/prisma/client.js';

import { TrackingService } from './tracking.service';

@Injectable()
export class ShippingService {
  private readonly logger = new Logger(ShippingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    @Inject(SHIPPING_PROVIDER) private readonly provider: ShippingProvider,
    private readonly packageDimensionsService: PackageDimensionsService,
    private readonly logService: ShippingLogService,
    private readonly notificationService: ShippingNotificationService,
    private readonly trackingService: TrackingService,
  ) {}

  /**
   * Track shipment for order using TrackingService
   */
  async trackShipment(orderId: string) {
    const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
    if (!shipment) {
      throw new HttpException('Shipment record not found for this order.', HttpStatus.NOT_FOUND);
    }
    return this.trackingService.syncTracking(shipment.id);
  }

  /**
   * Sync all active shipments (Used by 30-minute cron scheduler)
   */
  async syncAllActiveShipments(): Promise<number> {
    const activeShipments = await this.prisma.shipment.findMany({
      where: {
        shipmentStatus: {
          notIn: [ShipmentStatus.DELIVERED, ShipmentStatus.CANCELLED, ShipmentStatus.RTO_DELIVERED],
        },
      },
    });

    let count = 0;
    for (const s of activeShipments) {
      try {
        await this.trackingService.syncTracking(s.id);
        count++;
      } catch (e: any) {
        this.logger.error(`Error syncing shipment ${s.id}: ${e.message}`);
      }
    }
    this.logger.log(`Synced ${count} active shipments.`);
    return count;
  }

  /**
   * Process incoming Webhook payload from provider
   */
  async handleWebhook(payload: any, secretHeader?: string) {
    const settings = await this.getEffectiveSettings();
    if (settings.webhookSecret && secretHeader !== settings.webhookSecret) {
      this.logger.warn('Webhook secret mismatch header token.');
    }

    const rawStr = JSON.stringify(payload);
    const eventId = String(payload.shipment_id || payload.awb || Date.now());

    const log = await this.prisma.shippingWebhookLog.create({
      data: {
        eventId,
        event: payload.current_status || 'STATUS_UPDATE',
        payload: rawStr,
        receivedAt: new Date(),
      },
    });

    try {
      const awb = payload.awb;
      const shipmentIdSr = payload.shipment_id ? String(payload.shipment_id) : null;

      const shipment = await this.prisma.shipment.findFirst({
        where: {
          OR: [
            ...(awb ? [{ awb }] : []),
            ...(shipmentIdSr ? [{ shipmentId: shipmentIdSr }] : []),
          ],
        },
      });

      if (shipment) {
        const trackingPayload = {
          track_status: 1,
          shipment_status: 1,
          shipment_track: [
            {
              id: Number(shipmentIdSr || 0),
              awb_code: awb,
              courier_name: payload.courier_name || shipment.courier || '',
              current_status: payload.current_status || 'IN_TRANSIT',
              edd: payload.etd,
            },
          ],
          shipment_track_activities: payload.scans?.map((sc: any) => ({
            date: sc.date,
            status: sc.status,
            activity: sc.activity,
            location: sc.location,
          })),
        };

        await this.trackingService.applyTrackingUpdates(shipment, trackingPayload);
        await this.logService.recordLog({
          shipmentId: shipment.id,
          action: 'WEBHOOK_RECEIVED',
          performedBy: 'WEBHOOK',
          remarks: `Webhook status update: ${payload.current_status}`,
          payload,
        });
      }

      await this.prisma.shippingWebhookLog.update({
        where: { id: log.id },
        data: { processed: true },
      });

      return { success: true };
    } catch (err: any) {
      await this.prisma.shippingWebhookLog.update({
        where: { id: log.id },
        data: { error: err.message },
      });
      return { success: false, error: err.message };
    }
  }


  /**
   * Priority resolution: Database ShippingSettings -> .env fallback
   */
  async getEffectiveSettings() {
    let dbSettings = await this.prisma.shippingSettings.findFirst();

    if (!dbSettings) {
      dbSettings = await this.prisma.shippingSettings.create({
        data: {
          provider: 'SHIPROCKET',
          shiprocketEmail: this.configService.get<string>('SHIPROCKET_EMAIL') || '',
          shiprocketPassword: this.configService.get<string>('SHIPROCKET_PASSWORD') || '',
          pickupLocation: this.configService.get<string>('SHIPROCKET_PICKUP_LOCATION') || 'Primary',
          defaultLength: parseFloat(this.configService.get<string>('SHIPROCKET_DEFAULT_LENGTH') || '20'),
          defaultWidth: parseFloat(this.configService.get<string>('SHIPROCKET_DEFAULT_WIDTH') || '20'),
          defaultHeight: parseFloat(this.configService.get<string>('SHIPROCKET_DEFAULT_HEIGHT') || '10'),
          defaultWeight: parseFloat(this.configService.get<string>('SHIPROCKET_DEFAULT_WEIGHT') || '0.5'),
          webhookSecret: this.configService.get<string>('SHIPROCKET_WEBHOOK_SECRET') || '',
        },
      });
    }

    return {
      provider: dbSettings.provider || 'SHIPROCKET',
      shiprocketEmail: dbSettings.shiprocketEmail || this.configService.get<string>('SHIPROCKET_EMAIL') || '',
      shiprocketPassword: dbSettings.shiprocketPassword || this.configService.get<string>('SHIPROCKET_PASSWORD') || '',
      pickupLocation: dbSettings.pickupLocation || this.configService.get<string>('SHIPROCKET_PICKUP_LOCATION') || 'Primary',
      defaultLength: dbSettings.defaultLength || 20,
      defaultWidth: dbSettings.defaultWidth || 20,
      defaultHeight: dbSettings.defaultHeight || 10,
      defaultWeight: dbSettings.defaultWeight || 0.5,
      weightUnit: dbSettings.weightUnit || 'kg',
      autoCreateShipment: dbSettings.autoCreateShipment,
      autoAssignCourier: dbSettings.autoAssignCourier,
      autoGenerateAwb: dbSettings.autoGenerateAwb,
      autoSchedulePickup: dbSettings.autoSchedulePickup,
      autoGenerateManifest: dbSettings.autoGenerateManifest,
      autoGenerateLabel: dbSettings.autoGenerateLabel,
      freeShippingThreshold: Number(dbSettings.freeShippingThreshold || 2000),
      standardShippingCharge: Number(dbSettings.standardShippingCharge || 100),
      expressShippingCharge: Number(dbSettings.expressShippingCharge || 200),
      codEnabled: dbSettings.codEnabled,
      internationalShipping: dbSettings.internationalShipping,
      returnShippingEnabled: dbSettings.returnShippingEnabled,
      rtoSettings: dbSettings.rtoSettings || 'Return to Origin Default',
      webhookSecret: dbSettings.webhookSecret || this.configService.get<string>('SHIPROCKET_WEBHOOK_SECRET') || '',
    };
  }

  /**
   * Get Shipment details by Order ID
   */
  async getShipmentByOrderId(orderId: string) {
    return this.prisma.shipment.findUnique({
      where: { orderId },
      include: {
        events: { orderBy: { eventTimestamp: 'desc' } },
        logs: { orderBy: { createdAt: 'desc' } },
      },
    });
  }

  /**
   * Create a shipment using provider abstraction
   */
  async createShipment(orderId: string, dto?: CreateShipmentDto, performedBy = 'ADMIN') {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } }, customer: true },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    const settings = await this.getEffectiveSettings();

    // Resolve dimensions using priority cascade: Product -> Category -> Settings
    const dims = await this.packageDimensionsService.resolveOrderDimensions(orderId, {
      length: dto?.length || settings.defaultLength,
      width: dto?.width || settings.defaultWidth,
      height: dto?.height || settings.defaultHeight,
      weight: dto?.weight || settings.defaultWeight,
    });

    const shippingAddr: any = order.shippingAddress || {};
    const billingAddr: any = order.billingAddress || shippingAddr;
    const formattedDate = new Date(order.createdAt).toISOString().replace('T', ' ').substring(0, 16);

    const items = order.items.map((item) => ({
      name: item.name,
      sku: item.sku,
      units: item.quantity,
      selling_price: Number(item.price),
    }));

    const payload = {
      order_id: order.orderNumber || order.id,
      order_date: formattedDate,
      pickup_location: dto?.pickupLocation || settings.pickupLocation,
      comment: order.notes || 'Ecommerce Jewelry Order',
      billing_customer_name: `${order.customer?.firstName || 'Valued'} ${order.customer?.lastName || 'Customer'}`.trim(),
      billing_address: billingAddr.street || billingAddr.street1 || 'Address Line 1',
      billing_address_2: billingAddr.street2 || '',
      billing_city: billingAddr.city || 'City',
      billing_pincode: String(billingAddr.zipCode || billingAddr.postalCode || '110001'),
      billing_state: billingAddr.state || 'State',
      billing_country: billingAddr.country || 'India',
      billing_email: order.customer?.email || 'customer@example.com',
      billing_phone: billingAddr.phone || '9999999999',
      shipping_is_billing: true,
      order_items: items,
      payment_method: order.paymentMethod?.toUpperCase() === 'COD' ? 'COD' : 'Prepaid',
      shipping_charges: Number(order.shippingCharge || 0),
      sub_total: Number(order.subtotal),
      length: dims.length,
      width: dims.width,
      height: dims.height,
      weight: dims.weight,
    };

    let srRes: any;
    try {
      srRes = await this.provider.createShipment(payload);
    } catch (err: any) {
      this.logger.error(`Failed to create shipment on ${this.provider.providerName}: ${err.message}`);
      throw new HttpException(
        `Shipment creation failed on ${this.provider.providerName}: ${err.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const srOrderId = String(srRes.order_id || '');
    const srShipmentId = String(srRes.shipment_id || '');
    const awbCode = srRes.awb_code || null;
    const courierCompanyId = srRes.courier_company_id ? Number(srRes.courier_company_id) : null;
    const courierName = srRes.courier_name || null;

    const shipment = await this.prisma.shipment.upsert({
      where: { orderId },
      create: {
        orderId,
        shiprocketOrderId: srOrderId,
        shipmentId: srShipmentId,
        awb: awbCode,
        courierCompanyId,
        courier: courierName,
        pickupLocation: dto?.pickupLocation || settings.pickupLocation,
        length: dims.length,
        width: dims.width,
        height: dims.height,
        weight: dims.weight,
        shipmentStatus: ShipmentStatus.NEW,
        pickupStatus: PickupStatus.PENDING,
        rawShipmentData: srRes,
      },
      update: {
        shiprocketOrderId: srOrderId,
        shipmentId: srShipmentId,
        awb: awbCode || undefined,
        courierCompanyId: courierCompanyId || undefined,
        courier: courierName || undefined,
        pickupLocation: dto?.pickupLocation || settings.pickupLocation,
        length: dims.length,
        width: dims.width,
        height: dims.height,
        weight: dims.weight,
        shipmentStatus: ShipmentStatus.NEW,
        rawShipmentData: srRes,
      },
    });

    // Record audit log
    await this.logService.recordLog({
      shipmentId: shipment.id,
      action: 'SHIPMENT_CREATED',
      performedBy,
      remarks: `Shipment registered with ${this.provider.providerName}. Dimensions source: ${dims.source}`,
      payload: srRes,
    });

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'PROCESSING' },
    });

    // Automated courier / AWB assignment if automation switches enabled
    if (!shipment.awb && (settings.autoAssignCourier || settings.autoGenerateAwb || dto?.courierCompanyId)) {
      try {
        await this.generateAwb(orderId, dto?.courierCompanyId || courierCompanyId || undefined, 'SYSTEM');
      } catch (e: any) {
        this.logger.warn(`Auto-AWB assignment warning: ${e.message}`);
      }
    }

    return this.getShipmentByOrderId(orderId);
  }

  /**
   * Assign courier & generate AWB code
   */
  async generateAwb(orderId: string, courierCompanyId?: number, performedBy = 'ADMIN') {
    const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
    if (!shipment || !shipment.shipmentId) {
      throw new HttpException('Shipment not created yet.', HttpStatus.BAD_REQUEST);
    }

    const payload: any = { shipment_id: shipment.shipmentId };
    if (courierCompanyId) payload.courier_id = courierCompanyId;

    const res = await this.provider.generateAWB(payload);

    const awbData = res.response?.data;
    const awbCode = awbData?.awb_code;
    const courierId = awbData?.courier_company_id || courierCompanyId;
    const courierName = awbData?.courier_name || shipment.courier;

    if (!awbCode) {
      throw new HttpException('Provider could not assign an AWB for this courier.', HttpStatus.BAD_REQUEST);
    }

    const updated = await this.prisma.shipment.update({
      where: { orderId },
      data: {
        awb: awbCode,
        courierCompanyId: courierId ? Number(courierId) : undefined,
        courier: courierName || undefined,
        shipmentStatus: ShipmentStatus.COURIER_ASSIGNED,
        rawShipmentData: res,
      },
    });

    await this.logService.recordLog({
      shipmentId: shipment.id,
      action: 'AWB_GENERATED',
      performedBy,
      remarks: `AWB ${awbCode} generated for courier ${courierName}`,
      payload: res,
    });

    const settings = await this.getEffectiveSettings();
    if (settings.autoSchedulePickup) {
      try {
        await this.requestPickup(orderId, 'SYSTEM');
      } catch (e: any) {
        this.logger.warn(`Auto-pickup warning: ${e.message}`);
      }
    }

    return updated;
  }

  /**
   * Request carrier pickup
   */
  async requestPickup(orderId: string, performedBy = 'ADMIN') {
    const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
    if (!shipment || !shipment.shipmentId) {
      throw new HttpException('Shipment not created yet.', HttpStatus.BAD_REQUEST);
    }

    const res = await this.provider.requestPickup(shipment.shipmentId);

    const scheduledDate = res.response?.pickup_scheduled_date
      ? new Date(res.response.pickup_scheduled_date)
      : new Date();
    const tokenNo = res.response?.pickup_token_number || null;

    const updated = await this.prisma.shipment.update({
      where: { orderId },
      data: {
        pickupStatus: PickupStatus.SCHEDULED,
        pickupScheduledDate: scheduledDate,
        pickupTokenNumber: tokenNo || undefined,
        shipmentStatus: ShipmentStatus.PICKUP_SCHEDULED,
      },
    });

    await this.logService.recordLog({
      shipmentId: shipment.id,
      action: 'PICKUP_REQUESTED',
      performedBy,
      remarks: `Pickup requested for ${scheduledDate.toISOString()}`,
      payload: res,
    });

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'PACKED' },
    });

    const settings = await this.getEffectiveSettings();
    if (settings.autoGenerateManifest) {
      try {
        await this.generateManifest(orderId, 'SYSTEM');
      } catch (e: any) {
        this.logger.warn(`Auto-manifest warning: ${e.message}`);
      }
    }
    if (settings.autoGenerateLabel) {
      try {
        await this.generateLabel(orderId, 'SYSTEM');
      } catch (e: any) {
        this.logger.warn(`Auto-label warning: ${e.message}`);
      }
    }

    return updated;
  }

  /**
   * Generate Shipping Label URL
   */
  async generateLabel(orderId: string, performedBy = 'ADMIN') {
    const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
    if (!shipment || !shipment.shipmentId) {
      throw new HttpException('Shipment not created yet.', HttpStatus.BAD_REQUEST);
    }

    const res = await this.provider.generateLabel(shipment.shipmentId);
    const labelUrl = res.label_url || undefined;

    const updated = await this.prisma.shipment.update({
      where: { orderId },
      data: { labelUrl },
    });

    await this.logService.recordLog({
      shipmentId: shipment.id,
      action: 'LABEL_GENERATED',
      performedBy,
      remarks: `Shipping label URL: ${labelUrl || 'N/A'}`,
      payload: res,
    });

    return updated;
  }

  /**
   * Generate Invoice URL
   */
  async generateInvoice(orderId: string, performedBy = 'ADMIN') {
    const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
    if (!shipment || !shipment.shiprocketOrderId) {
      throw new HttpException('Provider Order ID missing.', HttpStatus.BAD_REQUEST);
    }

    const res = await this.provider.generateInvoice(shipment.shiprocketOrderId);
    const invoiceUrl = res.invoice_url || undefined;

    const updated = await this.prisma.shipment.update({
      where: { orderId },
      data: { invoiceUrl },
    });

    await this.logService.recordLog({
      shipmentId: shipment.id,
      action: 'INVOICE_GENERATED',
      performedBy,
      remarks: `Invoice URL: ${invoiceUrl || 'N/A'}`,
      payload: res,
    });

    return updated;
  }

  /**
   * Generate Manifest URL
   */
  async generateManifest(orderId: string, performedBy = 'ADMIN') {
    const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
    if (!shipment || !shipment.shipmentId) {
      throw new HttpException('Shipment not created yet.', HttpStatus.BAD_REQUEST);
    }

    const res = await this.provider.generateManifest(shipment.shipmentId);
    const manifestUrl = res.manifest_url || undefined;

    const updated = await this.prisma.shipment.update({
      where: { orderId },
      data: { manifestUrl },
    });

    await this.logService.recordLog({
      shipmentId: shipment.id,
      action: 'MANIFEST_GENERATED',
      performedBy,
      remarks: `Manifest URL: ${manifestUrl || 'N/A'}`,
      payload: res,
    });

    return updated;
  }

  /**
   * Cancel Shipment
   */
  async cancelShipment(orderId: string, performedBy = 'ADMIN') {
    const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
    if (!shipment) {
      throw new HttpException('Shipment not found.', HttpStatus.NOT_FOUND);
    }

    if (shipment.shiprocketOrderId) {
      try {
        await this.provider.cancelShipment(shipment.shiprocketOrderId);
      } catch (err: any) {
        this.logger.warn(`Provider cancel API warning: ${err.message}`);
      }
    }

    const updated = await this.prisma.shipment.update({
      where: { orderId },
      data: {
        shipmentStatus: ShipmentStatus.CANCELLED,
        pickupStatus: PickupStatus.CANCELLED,
      },
    });

    await this.logService.recordLog({
      shipmentId: shipment.id,
      action: 'SHIPMENT_CANCELLED',
      performedBy,
      remarks: 'Shipment cancelled with provider.',
    });

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    });

    return updated;
  }

  /**
   * Get Shipping Settings (Database settings priority -> .env fallback)
   */
  async getSettings() {
    return this.getEffectiveSettings();
  }

  /**
   * Update Shipping Settings database record
   */
  async updateSettings(dto: UpdateShippingSettingsDto) {
    let settings = await this.prisma.shippingSettings.findFirst();

    const data: any = {};
    if (dto.pickupLocation !== undefined) data.pickupLocation = dto.pickupLocation;
    if (dto.defaultLength !== undefined) data.defaultLength = dto.defaultLength;
    if (dto.defaultWidth !== undefined) data.defaultWidth = dto.defaultWidth;
    if (dto.defaultHeight !== undefined) data.defaultHeight = dto.defaultHeight;
    if (dto.defaultWeight !== undefined) data.defaultWeight = dto.defaultWeight;
    if (dto.weightUnit !== undefined) data.weightUnit = dto.weightUnit;
    if (dto.autoPickup !== undefined) data.autoSchedulePickup = dto.autoPickup;
    if (dto.autoManifest !== undefined) data.autoGenerateManifest = dto.autoManifest;
    if (dto.freeShippingThreshold !== undefined) data.freeShippingThreshold = dto.freeShippingThreshold;
    if (dto.standardShippingFee !== undefined) data.standardShippingCharge = dto.standardShippingFee;
    if (dto.expressShippingFee !== undefined) data.expressShippingCharge = dto.expressShippingFee;
    if (dto.codEnabled !== undefined) data.codEnabled = dto.codEnabled;
    if (dto.internationalShipping !== undefined) data.internationalShipping = dto.internationalShipping;
    if (dto.returnShippingEnabled !== undefined) data.returnShippingEnabled = dto.returnShippingEnabled;
    if (dto.rtoSettings !== undefined) data.rtoSettings = dto.rtoSettings;
    if (dto.webhookSecret !== undefined) data.webhookSecret = dto.webhookSecret;

    if (settings) {
      await this.prisma.shippingSettings.update({
        where: { id: settings.id },
        data,
      });
    } else {
      await this.prisma.shippingSettings.create({ data });
    }

    return this.getSettings();
  }

  /**
   * Test Connection to provider API
   */
  async testConnection() {
    try {
      const token = await this.provider.login(true);
      return {
        success: true,
        message: `Successfully authenticated with ${this.provider.providerName} API.`,
        tokenPreview: `${token.substring(0, 12)}...`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Connection test failed.',
      };
    }
  }
}
