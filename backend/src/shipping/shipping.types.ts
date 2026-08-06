export interface ShiprocketAuthResponse {
  token: string;
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  created_at?: string;
}

export interface CourierServiceabilityRequest {
  pickup_postcode: string;
  delivery_postcode: string;
  weight: string | number;
  cod: 0 | 1;
  length?: number;
  width?: number;
  height?: number;
  declared_value?: number;
}

export interface CourierServiceabilityCompany {
  courier_company_id: number;
  courier_name: string;
  city?: string;
  state?: string;
  rating?: number;
  etd?: string;
  estimated_delivery_days?: string | number;
  rate?: number;
  cod?: number;
  coverage_charges?: number;
  freight_charge?: number;
  surface_max_weight?: number;
  air_max_weight?: number;
  is_surface?: boolean;
}

export interface ShiprocketServiceabilityResponse {
  status: number;
  data?: {
    available_courier_companies?: CourierServiceabilityCompany[];
    recommended_courier_company_id?: number;
    shiprocket_recommended_courier_id?: number;
  };
}

export interface ShiprocketOrderItem {
  name: string;
  sku: string;
  units: number;
  selling_price: number | string;
  discount?: number | string;
  tax?: number | string;
  hsn?: string;
}

export interface CreateShiprocketOrderPayload {
  order_id: string;
  order_date: string; // YYYY-MM-DD HH:mm
  pickup_location: string;
  channel_id?: string;
  comment?: string;
  billing_customer_name: string;
  billing_last_name?: string;
  billing_address: string;
  billing_address_2?: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  shipping_customer_name?: string;
  shipping_last_name?: string;
  shipping_address?: string;
  shipping_address_2?: string;
  shipping_city?: string;
  shipping_pincode?: string;
  shipping_country?: string;
  shipping_state?: string;
  shipping_email?: string;
  shipping_phone?: string;
  order_items: ShiprocketOrderItem[];
  payment_method: 'Prepaid' | 'COD';
  shipping_charges?: number;
  giftwrap_charges?: number;
  transaction_charges?: number;
  total_discount?: number;
  sub_total: number;
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface CreateShiprocketOrderResponse {
  order_id: number;
  shipment_id: number;
  status: string;
  status_code: number;
  onboarding_completed_now?: number;
  awb_code?: string;
  courier_company_id?: string | number;
  courier_name?: string;
}

export interface AssignAwbPayload {
  shipment_id: string | number;
  courier_id?: string | number;
  status?: string;
}

export interface AssignAwbResponse {
  status: number;
  response?: {
    data?: {
      awb_code?: string;
      courier_company_id?: number;
      courier_name?: string;
      applied_weight?: number;
      routing_code?: string;
      charged_weight?: number;
    };
  };
  awb_assign_status?: number;
}

export interface RequestPickupPayload {
  shipment_id: (string | number)[];
}

export interface RequestPickupResponse {
  pickup_status: number;
  response?: {
    pickup_scheduled_date?: string;
    pickup_token_number?: string;
    status?: string;
  };
}

export interface GenerateLabelResponse {
  label_created?: number;
  label_url?: string;
  response?: string;
}

export interface GenerateInvoiceResponse {
  is_invoice_created?: boolean;
  invoice_url?: string;
}

export interface GenerateManifestResponse {
  status?: boolean;
  manifest_url?: string;
}

export interface TrackingData {
  track_status: number;
  shipment_status: number;
  shipment_track?: Array<{
    id: number;
    awb_code: string;
    courier_name: string;
    current_status: string;
    delivered_to?: string;
    destination?: string;
    origin?: string;
    pickup_date?: string;
    delivered_date?: string;
    weight?: string;
    packages?: number;
    consignee_name?: string;
    edd?: string;
  }>;
  shipment_track_activities?: Array<{
    date: string;
    status: string;
    activity: string;
    location: string;
    'sr-status'?: string;
  }>;
  track_url?: string;
}

export interface WebhookShiprocketPayload {
  current_status: string;
  shipment_id: number | string;
  awb: string;
  courier_name?: string;
  pickup_date?: string;
  delivered_date?: string;
  etd?: string;
  scans?: Array<{
    date: string;
    status: string;
    activity: string;
    location: string;
  }>;
  [key: string]: any;
}

export interface ShippingSettingsData {
  pickupLocation: string;
  defaultLength: number;
  defaultWidth: number;
  defaultHeight: number;
  defaultWeight: number;
  weightUnit: string;
  autoPickup: boolean;
  autoManifest: boolean;
  defaultCourier: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  codEnabled: boolean;
  internationalShipping: boolean;
  returnShippingEnabled: boolean;
  rtoSettings: string;
  webhookSecret: string;
}
