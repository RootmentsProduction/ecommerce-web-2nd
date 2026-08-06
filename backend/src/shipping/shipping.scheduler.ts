import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ShippingService } from './shipping.service';

@Injectable()
export class ShippingScheduler {
  private readonly logger = new Logger(ShippingScheduler.name);

  constructor(private readonly shippingService: ShippingService) {}

  /**
   * Sync active shipments every 30 minutes automatically.
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handle30MinShipmentSync() {
    this.logger.log('Starting automated 30-minute Shiprocket shipment tracking sync...');
    try {
      const count = await this.shippingService.syncAllActiveShipments();
      this.logger.log(`Completed 30-minute shipment sync. Updated ${count} active shipments.`);
    } catch (error: any) {
      this.logger.error(`Automated 30-minute shipment sync failed: ${error.message}`);
    }
  }
}
