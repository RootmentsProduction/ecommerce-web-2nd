import { apiFetch } from '@/services/api';

export interface ShipmentEvent {
  id: string;
  status: string;
  statusCode?: number;
  activity: string;
  location?: string;
  eventTimestamp: string;
}

export interface ShipmentDetails {
  id: string;
  orderId: string;
  shiprocketOrderId?: string;
  shipmentId?: string;
  awb?: string;
  courierCompanyId?: number;
  courier?: string;
  trackingUrl?: string;
  pickupStatus?: string;
  shipmentStatus?: string;
  statusCode?: number;
  labelUrl?: string;
  manifestUrl?: string;
  invoiceUrl?: string;
  pickupScheduledDate?: string;
  pickupTokenNumber?: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  pickupLocation?: string;
  estimatedDelivery?: string;
  lastTrackingUpdate?: string;
  createdAt: string;
  updatedAt: string;
  events?: ShipmentEvent[];
}

export interface CourierOption {
  code: string;
  name: string;
  courierCompanyId: number;
  rate: number;
  estimatedDays: string;
  estimatedDeliveryDate?: string;
  rating?: number;
  isSurface?: boolean;
}

export type ShippingOption = CourierOption;

export interface EstimateShippingResult {
  pincode: string;
  isServiceable: boolean;
  freeShippingEligible: boolean;
  couriers?: CourierOption[];
  options: CourierOption[];
  defaultOption?: CourierOption;
}

export interface ShippingSettings {
  provider?: string;
  pickupLocation: string;
  defaultLength: number;
  defaultWidth: number;
  defaultHeight: number;
  defaultWeight: number;
  weightUnit: string;
  autoCreateShipment?: boolean;
  autoAssignCourier?: boolean;
  autoGenerateAwb?: boolean;
  autoSchedulePickup?: boolean;
  autoGenerateManifest?: boolean;
  autoGenerateLabel?: boolean;
  autoPickup?: boolean;
  autoManifest?: boolean;
  defaultCourier?: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  codEnabled: boolean;
  internationalShipping: boolean;
  returnShippingEnabled: boolean;
  rtoSettings: string;
  webhookSecret: string;
  shiprocketEmail?: string;
  shiprocketPassword?: string;
}

// ----- Public / Customer Methods -----

export async function estimateShipping(params: {
  pincode: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  orderValue?: number;
}): Promise<EstimateShippingResult> {
  return apiFetch('/api/shipping/estimate', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function getShipmentByOrderId(orderId: string): Promise<ShipmentDetails | null> {
  try {
    return await apiFetch<ShipmentDetails>(`/api/shipping/orders/${orderId}`);
  } catch {
    return null;
  }
}

export async function trackShipment(orderId: string): Promise<ShipmentDetails | null> {
  try {
    return await apiFetch<ShipmentDetails>(`/api/shipping/orders/${orderId}/track`);
  } catch {
    return null;
  }
}

// ----- Admin Methods -----

export async function createShipment(
  orderId: string,
  params?: {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
    pickupLocation?: string;
    courierCompanyId?: number;
  },
): Promise<ShipmentDetails> {
  return apiFetch(`/api/shipping/orders/${orderId}/ship`, {
    method: 'POST',
    body: JSON.stringify(params || {}),
  });
}

export async function generateAwb(
  orderId: string,
  courierCompanyId?: number,
): Promise<ShipmentDetails> {
  return apiFetch(`/api/shipping/orders/${orderId}/awb`, {
    method: 'POST',
    body: JSON.stringify({ courierCompanyId }),
  });
}

export async function requestPickup(orderId: string): Promise<ShipmentDetails> {
  return apiFetch(`/api/shipping/orders/${orderId}/pickup`, {
    method: 'POST',
  });
}

export async function generateLabel(orderId: string): Promise<ShipmentDetails> {
  return apiFetch(`/api/shipping/orders/${orderId}/label`, {
    method: 'POST',
  });
}

export async function generateInvoice(orderId: string): Promise<ShipmentDetails> {
  return apiFetch(`/api/shipping/orders/${orderId}/invoice`, {
    method: 'POST',
  });
}

export async function generateManifest(orderId: string): Promise<ShipmentDetails> {
  return apiFetch(`/api/shipping/orders/${orderId}/manifest`, {
    method: 'POST',
  });
}

export async function syncShipmentStatus(orderId: string): Promise<ShipmentDetails> {
  return apiFetch(`/api/shipping/orders/${orderId}/sync`, {
    method: 'POST',
  });
}

export async function cancelShipment(orderId: string): Promise<ShipmentDetails> {
  return apiFetch(`/api/shipping/orders/${orderId}/cancel`, {
    method: 'POST',
  });
}

export async function getShippingSettings(): Promise<ShippingSettings> {
  return apiFetch('/api/shipping/settings');
}

export async function updateShippingSettings(
  settings: Partial<ShippingSettings>,
): Promise<ShippingSettings> {
  return apiFetch('/api/shipping/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
}

export async function testShiprocketConnection(): Promise<{ success: boolean; message: string }> {
  return apiFetch('/api/shipping/settings/test', {
    method: 'POST',
  });
}
