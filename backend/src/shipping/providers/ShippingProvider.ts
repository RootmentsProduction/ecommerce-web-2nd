export abstract class ShippingProvider {
  abstract readonly providerName: string;

  /**
   * Authenticate with shipping provider API
   */
  abstract login(forceRefresh?: boolean): Promise<string>;

  /**
   * Check courier serviceability & estimated rates for package
   */
  abstract getServiceability(params: {
    pickup_postcode: string;
    delivery_postcode: string;
    weight: number;
    length?: number;
    width?: number;
    height?: number;
    cod?: number;
    declared_value?: number;
  }): Promise<any>;

  /**
   * Register order shipment with carrier
   */
  abstract createShipment(payload: any): Promise<any>;

  /**
   * Assign courier and generate Airway Bill (AWB)
   */
  abstract generateAWB(payload: { shipment_id: string | number; courier_id?: string | number }): Promise<any>;

  /**
   * Request carrier pickup
   */
  abstract requestPickup(shipmentId: string | number): Promise<any>;

  /**
   * Generate downloadable shipping label document URL
   */
  abstract generateLabel(shipmentId: string | number): Promise<any>;

  /**
   * Generate downloadable manifest document URL
   */
  abstract generateManifest(shipmentId: string | number): Promise<any>;

  /**
   * Generate downloadable order invoice PDF URL
   */
  abstract generateInvoice(orderId: string | number): Promise<any>;

  /**
   * Fetch live shipment tracking activities by AWB or Shipment ID
   */
  abstract trackShipment(awbOrShipmentId: string): Promise<any>;

  /**
   * Cancel registered shipment with carrier
   */
  abstract cancelShipment(shipmentId: string | number): Promise<any>;
}

export const SHIPPING_PROVIDER = 'SHIPPING_PROVIDER';
