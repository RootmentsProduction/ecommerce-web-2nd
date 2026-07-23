import { Module } from '@nestjs/common';
import { PhonepeService } from './phonepe.service';
import { PhonepeController } from './phonepe.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [PhonepeController],
  providers: [PhonepeService],
  exports: [PhonepeService],
})
export class PhonepeModule {}
