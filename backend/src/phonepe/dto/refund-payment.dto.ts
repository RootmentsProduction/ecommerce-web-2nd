import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class RefundPaymentDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  @IsPositive()
  amount: number; // In Rupees
}
