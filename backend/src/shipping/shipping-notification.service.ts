import { Injectable, Logger } from '@nestjs/common';
import { ShipmentStatus } from '../generated/prisma/client.js';

export interface ShipmentNotificationEvent {
  shipmentId: string;
  orderId: string;
  orderNumber: string;
  customerEmail: string;
  customerPhone?: string;
  status: ShipmentStatus;
  courier?: string;
  awb?: string;
  trackingUrl?: string;
  estimatedDelivery?: Date;
  timestamp: Date;
}

@Injectable()
export class ShippingNotificationService {
  private readonly logger = new Logger(ShippingNotificationService.name);

  /**
   * Dispatches shipment state notification hook.
   * Can be hooked to EmailService, SMS/WhatsApp gateways, or WebPush notifications.
   */
  async notifyShipmentStatusChange(event: ShipmentNotificationEvent) {
    this.logger.log(
      `[Notification Event] Shipment ${event.shipmentId} (Order #${event.orderNumber}) status updated to ${event.status}`,
    );

    // Event hooks ready for future external integration dispatchers
    switch (event.status) {
      case ShipmentStatus.COURIER_ASSIGNED:
        this.logger.log(`[Hook: Email/SMS] Courier assigned: ${event.courier}, AWB: ${event.awb}`);
        break;
      case ShipmentStatus.PICKUP_SCHEDULED:
        this.logger.log(`[Hook: Email/SMS] Pickup scheduled for Order #${event.orderNumber}`);
        break;
      case ShipmentStatus.OUT_FOR_DELIVERY:
        this.logger.log(`[Hook: WhatsApp/SMS] Out for delivery notification dispatched to ${event.customerPhone || event.customerEmail}`);
        break;
      case ShipmentStatus.DELIVERED:
        this.logger.log(`[Hook: Email/SMS/Push] Delivery confirmation sent for Order #${event.orderNumber}`);
        break;
      case ShipmentStatus.CANCELLED:
        this.logger.log(`[Hook: Email] Shipment cancellation notice sent for Order #${event.orderNumber}`);
        break;
      default:
        break;
    }
  }
}
