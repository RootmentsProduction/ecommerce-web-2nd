import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
} from 'class-validator';

export class CreateShipmentDto {
  @IsNumber()
  @IsOptional()
  @Min(0.1)
  length?: number;

  @IsNumber()
  @IsOptional()
  @Min(0.1)
  width?: number;

  @IsNumber()
  @IsOptional()
  @Min(0.1)
  height?: number;

  @IsNumber()
  @IsOptional()
  @Min(0.01)
  weight?: number;

  @IsString()
  @IsOptional()
  pickupLocation?: string;

  @IsNumber()
  @IsOptional()
  courierCompanyId?: number;
}

export class EstimateShippingDto {
  @IsString()
  @IsNotEmpty()
  pincode: string;

  @IsNumber()
  @IsOptional()
  @Min(0.01)
  weight?: number;

  @IsNumber()
  @IsOptional()
  @Min(0.1)
  length?: number;

  @IsNumber()
  @IsOptional()
  @Min(0.1)
  width?: number;

  @IsNumber()
  @IsOptional()
  @Min(0.1)
  height?: number;

  @IsNumber()
  @IsOptional()
  orderValue?: number;
}

export class UpdateShippingSettingsDto {
  @IsString()
  @IsOptional()
  pickupLocation?: string;

  @IsNumber()
  @IsOptional()
  defaultLength?: number;

  @IsNumber()
  @IsOptional()
  defaultWidth?: number;

  @IsNumber()
  @IsOptional()
  defaultHeight?: number;

  @IsNumber()
  @IsOptional()
  defaultWeight?: number;

  @IsString()
  @IsOptional()
  weightUnit?: string;

  @IsBoolean()
  @IsOptional()
  autoPickup?: boolean;

  @IsBoolean()
  @IsOptional()
  autoManifest?: boolean;

  @IsString()
  @IsOptional()
  defaultCourier?: string;

  @IsNumber()
  @IsOptional()
  freeShippingThreshold?: number;

  @IsNumber()
  @IsOptional()
  standardShippingFee?: number;

  @IsNumber()
  @IsOptional()
  expressShippingFee?: number;

  @IsBoolean()
  @IsOptional()
  codEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  internationalShipping?: boolean;

  @IsBoolean()
  @IsOptional()
  returnShippingEnabled?: boolean;

  @IsString()
  @IsOptional()
  rtoSettings?: string;

  @IsString()
  @IsOptional()
  webhookSecret?: string;
}
