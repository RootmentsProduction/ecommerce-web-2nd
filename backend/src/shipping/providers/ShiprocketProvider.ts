import { Injectable, Logger } from '@nestjs/common';
import { ShippingProvider } from './ShippingProvider';
import { ShiprocketService } from '../shiprocket.service';

@Injectable()
export class ShiprocketProvider implements ShippingProvider {
  readonly providerName = 'SHIPROCKET';
  private readonly logger = new Logger(ShiprocketProvider.name);

  constructor(private readonly shiprocketService: ShiprocketService) {}

  async login(forceRefresh?: boolean): Promise<string> {
    return this.shiprocketService.authenticate(forceRefresh);
  }

  async getServiceability(params: {
    pickup_postcode: string;
    delivery_postcode: string;
    weight: number;
    length?: number;
    width?: number;
    height?: number;
    cod?: number;
    declared_value?: number;
  }): Promise<any> {
    return this.shiprocketService.checkServiceability({
      pickup_postcode: params.pickup_postcode,
      delivery_postcode: params.delivery_postcode,
      weight: params.weight,
      length: params.length,
      width: params.width,
      height: params.height,
      cod: (params.cod === 1 ? 1 : 0) as 0 | 1,
      declared_value: params.declared_value,
    });
  }

  async createShipment(payload: any): Promise<any> {
    return this.shiprocketService.createOrder(payload);
  }

  async generateAWB(payload: { shipment_id: string | number; courier_id?: string | number }): Promise<any> {
    return this.shiprocketService.assignAwb({
      shipment_id: payload.shipment_id,
      courier_id: payload.courier_id,
    });
  }

  async requestPickup(shipmentId: string | number): Promise<any> {
    return this.shiprocketService.requestPickup(shipmentId);
  }

  async generateLabel(shipmentId: string | number): Promise<any> {
    return this.shiprocketService.generateLabel(shipmentId);
  }

  async generateManifest(shipmentId: string | number): Promise<any> {
    return this.shiprocketService.generateManifest(shipmentId);
  }

  async generateInvoice(orderId: string | number): Promise<any> {
    return this.shiprocketService.generateInvoice(orderId);
  }

  async trackShipment(awbOrShipmentId: string): Promise<any> {
    try {
      return await this.shiprocketService.trackByAwb(awbOrShipmentId);
    } catch {
      return this.shiprocketService.trackByShipmentId(awbOrShipmentId);
    }
  }

  async cancelShipment(shipmentId: string | number): Promise<any> {
    return this.shiprocketService.cancelOrder(shipmentId);
  }
}
