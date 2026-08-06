import { Injectable, Inject, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SHIPPING_PROVIDER, ShippingProvider } from './providers/ShippingProvider';
import { ShippingLogService } from './shipping-log.service';
import { ShippingNotificationService } from './shipping-notification.service';
import { ShipmentStatus } from '../generated/prisma/client.js';

@Injectable()
export class TrackingService {
  private readonly logger = new Logger(TrackingService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(SHIPPING_PROVIDER) private readonly provider: ShippingProvider,
    private readonly logService: ShippingLogService,
    private readonly notificationService: ShippingNotificationService,
  ) {}

  /**
   * Sync tracking state for a single shipment
   */
  async syncTracking(shipmentId: string): Promise<any> {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id: shipmentId },
      include: { order: { include: { customer: true } } },
    });

    if (!shipment) {
      throw new Error(`Shipment with ID ${shipmentId} not found.`);
    }

    if (!shipment.awb && !shipment.shipmentId) {
      return shipment;
    }

    let trackingData: any = null;
    try {
      trackingData = await this.provider.trackShipment(shipment.awb || shipment.shipmentId || '');
    } catch (error: any) {
      this.logger.error(`Error fetching tracking for shipment ${shipmentId}: ${error.message}`);
      return shipment;
    }

    if (!trackingData) return shipment;

    return this.applyTrackingUpdates(shipment, trackingData);
  }

  /**
   * Apply tracking payload updates to shipment, events, and audit logs
   */
  async applyTrackingUpdates(shipment: any, trackingData: any): Promise<any> {
    const trackInfo = trackingData.shipment_track?.[0];
    const activities = trackingData.shipment_track_activities || [];

    const currentStatusStr = trackInfo?.current_status || 'IN_TRANSIT';
    const trackingUrl = trackingData.track_url || undefined;
    const estDelivery = trackInfo?.edd ? new Date(trackInfo.edd) : undefined;

    const newShipmentStatus = this.mapStatusToEnum(currentStatusStr);
    const mappedOrderStatus = this.mapStatusToOrderStatus(currentStatusStr);

    const oldStatus = shipment.shipmentStatus;

    // Update shipment record
    const updated = await this.prisma.shipment.update({
      where: { id: shipment.id },
      data: {
        shipmentStatus: newShipmentStatus,
        trackingUrl: trackingUrl || undefined,
        estimatedDelivery: estDelivery && !isNaN(estDelivery.getTime()) ? estDelivery : undefined,
        lastTrackingUpdate: new Date(),
        rawShipmentData: trackingData,
      },
      include: { events: true, logs: true, order: true },
    });

    // Log audit trail if status changed
    if (oldStatus !== newShipmentStatus) {
      await this.logService.recordLog({
        shipmentId: shipment.id,
        action: 'TRACKING_SYNC',
        performedBy: 'SYSTEM',
        remarks: `Status updated from ${oldStatus} to ${newShipmentStatus} (${currentStatusStr})`,
        payload: trackingData,
      });

      // Dispatch notification event hook
      const order = shipment.order;
      if (order) {
        await this.notificationService.notifyShipmentStatusChange({
          shipmentId: shipment.id,
          orderId: order.id,
          orderNumber: order.orderNumber,
          customerEmail: order.customer?.email || 'customer@example.com',
          status: newShipmentStatus,
          courier: shipment.courier || undefined,
          awb: shipment.awb || undefined,
          trackingUrl: updated.trackingUrl || undefined,
          estimatedDelivery: updated.estimatedDelivery || undefined,
          timestamp: new Date(),
        });
      }
    }

    // Update Order model status if changed
    if (mappedOrderStatus) {
      await this.prisma.order.update({
        where: { id: shipment.orderId },
        data: { status: mappedOrderStatus },
      });
    }

    // Persist new activities
    for (const act of activities) {
      const actDate = act.date ? new Date(act.date) : new Date();
      const existing = await this.prisma.shipmentEvent.findFirst({
        where: {
          shipmentId: shipment.id,
          activity: act.activity,
          eventTimestamp: actDate,
        },
      });

      if (!existing) {
        await this.prisma.shipmentEvent.create({
          data: {
            shipmentId: shipment.id,
            status: act.status || currentStatusStr,
            activity: act.activity,
            location: act.location || null,
            eventTimestamp: actDate,
            rawPayload: JSON.stringify(act),
          },
        });
      }
    }

    return updated;
  }

  mapStatusToEnum(srStatus: string): ShipmentStatus {
    const s = (srStatus || '').toUpperCase().trim();
    if (s.includes('DELIVERED')) return ShipmentStatus.DELIVERED;
    if (s.includes('OUT FOR DELIVERY')) return ShipmentStatus.OUT_FOR_DELIVERY;
    if (s.includes('IN TRANSIT') || s.includes('DISPATCHED') || s.includes('SHIPPED')) return ShipmentStatus.IN_TRANSIT;
    if (s.includes('PICKED UP')) return ShipmentStatus.PICKED_UP;
    if (s.includes('PICKUP SCHEDULED')) return ShipmentStatus.PICKUP_SCHEDULED;
    if (s.includes('ASSIGNED')) return ShipmentStatus.COURIER_ASSIGNED;
    if (s.includes('CANCEL')) return ShipmentStatus.CANCELLED;
    if (s.includes('RTO')) return ShipmentStatus.RTO_INITIATED;
    return ShipmentStatus.NEW;
  }

  mapStatusToOrderStatus(srStatus: string): string | null {
    const s = (srStatus || '').toUpperCase().trim();
    if (s.includes('DELIVERED')) return 'DELIVERED';
    if (s.includes('OUT FOR DELIVERY') || s.includes('IN TRANSIT') || s.includes('SHIPPED')) return 'SHIPPED';
    if (s.includes('PICKED UP') || s.includes('PACKED')) return 'PACKED';
    if (s.includes('CANCEL')) return 'CANCELLED';
    if (s.includes('RTO')) return 'RETURNED';
    return null;
  }
}
