import { IsEnum, IsNotEmpty } from 'class-validator';

export enum PurchaseOrderStatus {
  DRAFT = 'Draft',
  SENT = 'Sent',
  PARTIALLY_RECEIVED = 'Partially_Received',
  RECEIVED = 'Received',
  CANCELLED = 'Cancelled',
}

export class UpdatePOStatusBodyDto {
  @IsEnum(PurchaseOrderStatus)
  @IsNotEmpty()
  status: PurchaseOrderStatus;
}
