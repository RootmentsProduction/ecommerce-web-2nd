import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrdersService } from '../orders/orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { ChecksumUtil } from './utils/checksum.util';
import { PhonepePaymentRequest, PhonepeCallbackPayload } from './interfaces/phonepe-payload.interface';

@Injectable()
export class PhonepeService {
  private readonly logger = new Logger('PhonepeService');
  private readonly merchantId: string;
  private readonly saltKey: string;
  private readonly saltIndex: number;
  private readonly baseUrl: string;
  private readonly callbackUrl: string;
  private readonly redirectUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly ordersService: OrdersService,
    private readonly prisma: PrismaService,
  ) {
    this.merchantId = this.configService.get<string>('PHONEPE_MERCHANT_ID') || 'YOUR_MERCHANT_ID';
    this.saltKey = this.configService.get<string>('PHONEPE_SALT_KEY') || 'YOUR_SALT_KEY';
    this.saltIndex = Number(this.configService.get<string>('PHONEPE_SALT_INDEX') || '1');
    this.baseUrl = this.configService.get<string>('PHONEPE_BASE_URL') || 'https://api-preprod.phonepe.com';
    this.callbackUrl = this.configService.get<string>('PHONEPE_CALLBACK_URL') || 'http://localhost:7001/api/payments/phonepe/callback';
    this.redirectUrl = this.configService.get<string>('PHONEPE_REDIRECT_URL') || 'http://localhost:3000/payment/success';
  }

  /**
   * Generates a PhonePe payment redirect URL for a given order
   */
  async createPayment(orderId: string): Promise<{ redirectUrl: string }> {
    this.logger.log(`Initiating payment for Order: ${orderId}`);
    
    // Fetch the order to get the total amount
    const order = await this.ordersService.findOne(orderId, { id: '', role: 'ADMIN' });
    if (!order) {
      this.logger.error(`Payment initiation failed: Order ${orderId} not found`);
      throw new BadRequestException(`Order ${orderId} not found.`);
    }

    if (order.paymentStatus === 'PAID') {
      this.logger.warn(`Payment initiation failed: Order ${orderId} is already PAID`);
      throw new BadRequestException(`Order ${orderId} has already been paid.`);
    }

    const amountInPaise = Math.round(Number(order.total) * 100);
    const merchantTransactionId = `TXN-${Date.now()}-${order.orderNumber}`;

    // Safely extract phone number from shipping address if present
    const shippingAddress = order.shippingAddress as any;
    const mobileNumber = shippingAddress?.phone || undefined;

    // Construct request payload
    const payload: PhonepePaymentRequest = {
      merchantId: this.merchantId,
      merchantTransactionId,
      merchantUserId: `USR-${order.customerId}`,
      amount: amountInPaise,
      redirectUrl: `${this.redirectUrl}?merchantTransactionId=${merchantTransactionId}`,
      redirectMode: 'REDIRECT',
      callbackUrl: this.callbackUrl,
      mobileNumber,
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const apiEndpoint = '/pg/v1/pay';
    const checksum = ChecksumUtil.generatePayChecksum(base64Payload, apiEndpoint, this.saltKey, this.saltIndex);

    try {
      this.logger.log(`Sending payment request to PhonePe API: ${this.baseUrl}${apiEndpoint}`);
      const response = await fetch(`${this.baseUrl}${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'X-VERIFY': checksum,
        },
        body: JSON.stringify({ request: base64Payload }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`PhonePe Gateway error status: ${response.status}. Response: ${errorText}`);
        throw new InternalServerErrorException('PhonePe payment gateway returned an error.');
      }

      const resData = await response.json();
      if (resData.success && resData.data?.instrumentResponse?.redirectInfo?.url) {
        // Save the merchant transaction ID in database
        await this.prisma.order.update({
          where: { id: orderId },
          data: {
            merchantTransactionId,
            paymentProvider: 'PhonePe',
          },
        });
        
        this.logger.log(`Payment request successfully queued. Merchant Transaction ID: ${merchantTransactionId}`);
        return {
          redirectUrl: resData.data.instrumentResponse.redirectInfo.url,
        };
      } else {
        this.logger.error(`PhonePe Gateway rejected request: ${JSON.stringify(resData)}`);
        throw new InternalServerErrorException('Failed to generate payment redirect from PhonePe.');
      }
    } catch (err) {
      this.logger.error(`PhonePe Payment Request failure: ${err.message}`, err.stack);
      throw new InternalServerErrorException(`Gateway timeout or connectivity issue: ${err.message}`);
    }
  }

  /**
   * Verifies the status of a payment directly with PhonePe status check API
   */
  async checkPaymentStatus(merchantTransactionId: string): Promise<any> {
    this.logger.log(`Verifying payment status for Merchant Transaction ID: ${merchantTransactionId}`);

    const apiEndpoint = `/pg/v1/status/${this.merchantId}/${merchantTransactionId}`;
    const checksum = ChecksumUtil.generateStatusChecksum(this.merchantId, merchantTransactionId, this.saltKey, this.saltIndex);

    try {
      const response = await fetch(`${this.baseUrl}${apiEndpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': this.merchantId,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`PhonePe checkPaymentStatus API error status: ${response.status}. Response: ${errorText}`);
        throw new InternalServerErrorException('Failed to fetch status from PhonePe gateway.');
      }

      const resData = await response.json();
      this.logger.log(`PhonePe Check Status API returned: ${JSON.stringify(resData)}`);

      const order = await this.prisma.order.findFirst({
        where: { merchantTransactionId },
      });

      if (!order) {
        this.logger.error(`Verification error: Order with merchantTransactionId ${merchantTransactionId} not found`);
        throw new BadRequestException('Order not found for transaction.');
      }

      // Handle successful status response
      if (resData.success && resData.code === 'PAYMENT_SUCCESS') {
        this.logger.log(`Payment confirmed SUCCESS for Order ${order.id}. Transitioning state and deducting stock...`);
        const phonepeTransactionId = resData.data.transactionId;
        const paymentDetails = {
          paymentMethod: resData.data.paymentInstrument?.type || 'Online',
          paymentProvider: 'PhonePe',
          phonepeTransactionId,
          merchantTransactionId,
          paymentReference: resData.data.paymentInstrument?.utr || undefined,
          paymentResponse: JSON.stringify(resData),
          paymentCompletedAt: new Date(),
        };

        const updatedOrder = await this.ordersService.markOrderAsPaid(order.id, paymentDetails);
        this.logger.log(`Order ${order.id} marked as PAID. Inventory deducted successfully.`);
        return {
          status: 'SUCCESS',
          order: updatedOrder,
        };
      } else if (resData.success && resData.code === 'PAYMENT_PENDING') {
        this.logger.warn(`Payment remains PENDING for Order ${order.id}.`);
        return {
          status: 'PENDING',
          order,
        };
      } else {
        this.logger.error(`Payment failed or cancelled (Code: ${resData.code}) for Order ${order.id}.`);
        const failedOrder = await this.ordersService.markOrderAsFailed(order.id, JSON.stringify(resData));
        return {
          status: 'FAILED',
          order: failedOrder,
        };
      }
    } catch (err) {
      this.logger.error(`Failed to verify payment status for ${merchantTransactionId}: ${err.message}`, err.stack);
      throw new InternalServerErrorException(`Status check error: ${err.message}`);
    }
  }

  /**
   * Processes backend-to-backend callback request sent by PhonePe
   */
  async processCallback(base64Response: string, xVerifyHeader: string): Promise<boolean> {
    this.logger.log(`Processing incoming backend callback from PhonePe. Header X-VERIFY: ${xVerifyHeader}`);

    // Verify signature
    const isValidSignature = ChecksumUtil.verifyCallbackSignature(base64Response, xVerifyHeader, this.saltKey, this.saltIndex);
    if (!isValidSignature) {
      this.logger.error('Callback signature verification FAILED. Rejecting callback request.');
      throw new BadRequestException('Invalid signature.');
    }

    const decodedPayloadStr = Buffer.from(base64Response, 'base64').toString('utf-8');
    const callbackData: PhonepeCallbackPayload = JSON.parse(decodedPayloadStr);
    
    this.logger.log(`Callback decoded payload: ${decodedPayloadStr}`);
    
    const merchantTransactionId = callbackData.data.merchantTransactionId;
    const order = await this.prisma.order.findFirst({
      where: { merchantTransactionId },
    });

    if (!order) {
      this.logger.error(`Callback error: Order with merchant transaction ID ${merchantTransactionId} not found`);
      throw new BadRequestException('Order not found.');
    }

    if (callbackData.success && callbackData.code === 'PAYMENT_SUCCESS') {
      this.logger.log(`Callback confirmation SUCCESS for Order ${order.id}. Settle order...`);
      const paymentDetails = {
        paymentMethod: callbackData.data.paymentInstrument?.type || 'Online',
        paymentProvider: 'PhonePe',
        phonepeTransactionId: callbackData.data.transactionId,
        merchantTransactionId,
        paymentReference: callbackData.data.paymentInstrument?.utr || undefined,
        paymentResponse: decodedPayloadStr,
        paymentCompletedAt: new Date(),
      };

      await this.ordersService.markOrderAsPaid(order.id, paymentDetails);
    } else {
      this.logger.error(`Callback failed: payment unsuccessful (code: ${callbackData.code}) for Order ${order.id}`);
      await this.ordersService.markOrderAsFailed(order.id, decodedPayloadStr);
    }

    return true;
  }

  /**
   * Placeholder refund method
   */
  async processRefund(orderId: string, refundAmount: number): Promise<any> {
    this.logger.log(`Refund request received for Order: ${orderId}, Amount: ${refundAmount}`);
    
    const order = await this.ordersService.findOne(orderId, { id: '', role: 'ADMIN' });
    if (!order) {
      throw new BadRequestException(`Order ${orderId} not found.`);
    }

    if (order.paymentStatus !== 'PAID') {
      throw new BadRequestException(`Order ${orderId} must be in PAID status to initiate a refund.`);
    }

    // Verify refund amount is valid
    if (refundAmount > Number(order.total)) {
      throw new BadRequestException(`Refund amount cannot exceed order total of ₹${order.total}`);
    }

    const refundTransactionId = `REF-${Date.now()}-${order.orderNumber}`;
    this.logger.log(`Initiating placeholder refund with ID: ${refundTransactionId}`);

    // In a real application, we would make a POST call to `${this.baseUrl}/pg/v1/refund` with signed payload.
    // Since this is a placeholder implementation:
    const mockRefundResponse = {
      success: true,
      code: 'REFUND_INITIATED',
      message: 'Refund has been successfully initiated.',
      data: {
        merchantId: this.merchantId,
        merchantTransactionId: refundTransactionId,
        originalTransactionId: order.merchantTransactionId,
        amount: Math.round(refundAmount * 100),
        state: 'PENDING',
      },
    };

    // Update order state
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'REFUNDED',
        paymentResponse: JSON.stringify(mockRefundResponse),
      },
    });

    this.logger.log(`Placeholder refund completed for Order: ${orderId}`);
    return mockRefundResponse;
  }
}
