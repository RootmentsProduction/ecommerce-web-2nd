import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../generated/prisma/client.js';
import {
  PurchaseOrdersService,
  CreatePurchaseOrderDto,
  CreatePOItemDto,
  ReceivePOItemsDto,
} from './purchase-orders.service';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePOStatusBodyDto } from './dto/update-po-status.dto';

class CreatePOItemBodyDto implements CreatePOItemDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  rate: number;

  @IsNumber()
  taxRate: number;

  @IsNumber()
  taxAmount: number;

  @IsNumber()
  amount: number;
}

export class CreatePOBodyDto implements CreatePurchaseOrderDto {
  @IsString()
  @IsNotEmpty()
  vendorId: string;

  @IsString()
  @IsNotEmpty()
  vendorName: string;

  @IsString()
  @IsNotEmpty()
  vendorState: string;

  @IsString()
  @IsNotEmpty()
  deliverToBranch: string;

  @IsString()
  @IsNotEmpty()
  deliverToState: string;

  @IsString()
  @IsNotEmpty()
  deliverToAddress: string;

  @IsString()
  @IsOptional()
  referenceNumber?: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsOptional()
  deliveryDate?: string;

  @IsString()
  @IsNotEmpty()
  paymentTerms: string;

  @IsString()
  @IsOptional()
  shipmentPreference?: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePOItemBodyDto)
  items: CreatePOItemBodyDto[];

  @IsNumber()
  subtotal: number;

  @IsString()
  @IsNotEmpty()
  discountType: string;

  @IsNumber()
  discountValue: number;

  @IsString()
  @IsNotEmpty()
  discountUnit: string;

  @IsBoolean()
  discountAfterTax: boolean;

  @IsNumber()
  discountAmount: number;

  @IsString()
  @IsNotEmpty()
  taxSplitType: string;

  @IsNumber()
  cgstAmount: number;

  @IsNumber()
  sgstAmount: number;

  @IsNumber()
  igstAmount: number;

  @IsNumber()
  taxTotal: number;

  @IsString()
  @IsNotEmpty()
  tdsTcsType: string;

  @IsNumber()
  tdsTcsRate: number;

  @IsNumber()
  tdsTcsAmount: number;

  @IsString()
  @IsOptional()
  tdsTcsName?: string;

  @IsNumber()
  adjustment: number;

  @IsNumber()
  total: number;

  @IsString()
  @IsOptional()
  customerNotes?: string;

  @IsString()
  @IsOptional()
  termsAndConditions?: string;

  @IsString()
  @IsOptional()
  attachments?: string;
}

class ReceiveItemDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  quantityReceived: number;
}

export class ReceivePOBodyDto implements ReceivePOItemsDto {
  @IsString()
  @IsNotEmpty()
  receivedBy: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReceiveItemDto)
  items: ReceiveItemDto[];
}

export class UpdatePOBodyDto {
  @IsString()
  @IsOptional()
  vendorId?: string;

  @IsString()
  @IsOptional()
  vendorName?: string;

  @IsString()
  @IsOptional()
  vendorState?: string;

  @IsString()
  @IsOptional()
  deliverToBranch?: string;

  @IsString()
  @IsOptional()
  deliverToState?: string;

  @IsString()
  @IsOptional()
  deliverToAddress?: string;

  @IsString()
  @IsOptional()
  referenceNumber?: string;

  @IsString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  deliveryDate?: string;

  @IsString()
  @IsOptional()
  paymentTerms?: string;

  @IsString()
  @IsOptional()
  shipmentPreference?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsOptional()
  subtotal?: number;

  @IsString()
  @IsOptional()
  discountType?: string;

  @IsNumber()
  @IsOptional()
  discountValue?: number;

  @IsString()
  @IsOptional()
  discountUnit?: string;

  @IsBoolean()
  @IsOptional()
  discountAfterTax?: boolean;

  @IsNumber()
  @IsOptional()
  discountAmount?: number;

  @IsString()
  @IsOptional()
  taxSplitType?: string;

  @IsNumber()
  @IsOptional()
  cgstAmount?: number;

  @IsNumber()
  @IsOptional()
  sgstAmount?: number;

  @IsNumber()
  @IsOptional()
  igstAmount?: number;

  @IsNumber()
  @IsOptional()
  taxTotal?: number;

  @IsString()
  @IsOptional()
  tdsTcsType?: string;

  @IsNumber()
  @IsOptional()
  tdsTcsRate?: number;

  @IsNumber()
  @IsOptional()
  tdsTcsAmount?: number;

  @IsString()
  @IsOptional()
  tdsTcsName?: string;

  @IsNumber()
  @IsOptional()
  adjustment?: number;

  @IsNumber()
  @IsOptional()
  total?: number;

  @IsString()
  @IsOptional()
  customerNotes?: string;

  @IsString()
  @IsOptional()
  termsAndConditions?: string;

  @IsString()
  @IsOptional()
  attachments?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePOItemBodyDto)
  items?: CreatePOItemBodyDto[];
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly poService: PurchaseOrdersService) {}

  @Get()
  async getPurchaseOrders() {
    return this.poService.findAll();
  }

  @Get(':id')
  async getPurchaseOrderDetails(@Param('id') id: string) {
    return this.poService.findOne(id);
  }

  @Post()
  async createPurchaseOrder(@Body() dto: CreatePOBodyDto) {
    return this.poService.create(dto);
  }

  @Put(':id')
  async updatePurchaseOrder(
    @Param('id') id: string,
    @Body() dto: CreatePOBodyDto,
  ) {
    return this.poService.update(id, dto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdatePOStatusBodyDto,
  ) {
    return this.poService.updateStatus(id, dto.status);
  }

  @Post(':id/receive')
  async receiveItems(@Param('id') id: string, @Body() dto: ReceivePOBodyDto) {
    return this.poService.receiveItems(id, dto);
  }
}
