import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SystemSettingsModule } from '../system-settings/system-settings.module';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { ShiprocketService } from './shiprocket.service';
import { CourierService } from './courier.service';
import { TrackingService } from './tracking.service';
import { ShippingScheduler } from './shipping.scheduler';
import { PackageDimensionsService } from './package-dimensions.service';
import { ShippingLogService } from './shipping-log.service';
import { ShippingNotificationService } from './shipping-notification.service';
import { SHIPPING_PROVIDER } from './providers/ShippingProvider';
import { ShiprocketProvider } from './providers/ShiprocketProvider';

@Module({
  imports: [PrismaModule, SystemSettingsModule],
  controllers: [ShippingController],
  providers: [
    ShippingService,
    ShiprocketService,
    CourierService,
    TrackingService,
    ShippingScheduler,
    PackageDimensionsService,
    ShippingLogService,
    ShippingNotificationService,
    ShiprocketProvider,
    {
      provide: SHIPPING_PROVIDER,
      useClass: ShiprocketProvider,
    },
  ],
  exports: [
    ShippingService,
    ShiprocketService,
    CourierService,
    TrackingService,
    ShippingLogService,
    SHIPPING_PROVIDER,
  ],
})
export class ShippingModule {}
