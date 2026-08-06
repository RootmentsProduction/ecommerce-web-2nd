import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type ShipmentAction =
  | 'SHIPMENT_CREATED'
  | 'COURIER_ASSIGNED'
  | 'AWB_GENERATED'
  | 'PICKUP_REQUESTED'
  | 'LABEL_GENERATED'
  | 'INVOICE_GENERATED'
  | 'MANIFEST_GENERATED'
  | 'TRACKING_SYNC'
  | 'WEBHOOK_RECEIVED'
  | 'SHIPMENT_CANCELLED';

@Injectable()
export class ShippingLogService {
  private readonly logger = new Logger(ShippingLogService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Records an audit trail log entry for a shipment operation
   */
  async recordLog(params: {
    shipmentId: string;
    action: ShipmentAction;
    performedBy?: string;
    remarks?: string;
    payload?: any;
  }) {
    try {
      return await this.prisma.shipmentLog.create({
        data: {
          shipmentId: params.shipmentId,
          action: params.action,
          performedBy: params.performedBy || 'SYSTEM',
          remarks: params.remarks || null,
          payload: params.payload ? JSON.parse(JSON.stringify(params.payload)) : undefined,
        },
      });
    } catch (err: any) {
      this.logger.error(`Failed to record shipment log for ${params.shipmentId}: ${err.message}`);
    }
  }

  /**
   * Get logs audit trail for a shipment
   */
  async getLogs(shipmentId: string) {
    return this.prisma.shipmentLog.findMany({
      where: { shipmentId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
