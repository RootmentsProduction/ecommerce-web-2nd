import { Controller, Post, Get, Body, Param, Headers, BadRequestException, UseGuards } from '@nestjs/common';
import { PhonepeService } from './phonepe.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { RefundPaymentDto } from './dto/refund-payment.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('payments/phonepe')
export class PhonepeController {
  constructor(private readonly phonepeService: PhonepeService) {}

  /**
   * Generates a PhonePe payment redirect link for an order
   */
  @Post('create')
  async createPayment(@Body() dto: CreatePaymentDto) {
    return this.phonepeService.createPayment(dto.orderId);
  }

  /**
   * Checks payment status directly from the PhonePe Gateway (Public for redirect confirmation)
   */
  @Public()
  @Get('status/:merchantTransactionId')
  async checkStatus(@Param('merchantTransactionId') merchantTransactionId: string) {
    if (!merchantTransactionId) {
      throw new BadRequestException('Merchant transaction ID is required.');
    }
    return this.phonepeService.checkPaymentStatus(merchantTransactionId);
  }

  /**
   * Receives incoming callback notification from PhonePe (Public, webhook endpoint)
   */
  @Public()
  @Post('callback')
  async handleCallback(
    @Body() body: { response?: string },
    @Headers('x-verify') xVerify: string,
  ) {
    if (!body?.response) {
      throw new BadRequestException('Missing callback response payload.');
    }
    if (!xVerify) {
      throw new BadRequestException('Missing checksum verification header.');
    }

    const success = await this.phonepeService.processCallback(body.response, xVerify);
    return { success };
  }

  /**
   * Placeholder webhook endpoint (additional webhook url configuration fallback)
   */
  @Public()
  @Post('webhook')
  async handleWebhook(
    @Body() body: { response?: string },
    @Headers('x-verify') xVerify: string,
  ) {
    if (!body?.response || !xVerify) {
      throw new BadRequestException('Missing payload or verification header.');
    }
    const success = await this.phonepeService.processCallback(body.response, xVerify);
    return { success };
  }

  /**
   * Issues a refund for a completed order
   */
  @Post('refund')
  async refundPayment(@Body() dto: RefundPaymentDto) {
    return this.phonepeService.processRefund(dto.orderId, dto.amount);
  }
}
