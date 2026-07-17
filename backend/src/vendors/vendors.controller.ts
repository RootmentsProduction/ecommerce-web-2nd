import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../generated/prisma/client.js';
import {
  VendorsService,
  CreateVendorDto,
  CreateVendorAddressDto,
  CreateVendorContactDto,
  CreateVendorBankDto,
} from './vendors.service';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class VendorAddressDto implements CreateVendorAddressDto {
  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  attention?: string;

  @IsString()
  @IsOptional()
  countryRegion?: string;

  @IsString()
  @IsNotEmpty()
  street1: string;

  @IsString()
  @IsOptional()
  street2?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  fax?: string;
}

class VendorContactDto implements CreateVendorContactDto {
  @IsString()
  @IsOptional()
  salutation?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  workPhone?: string;

  @IsString()
  @IsOptional()
  mobile?: string;
}

class VendorBankDto implements CreateVendorBankDto {
  @IsString()
  @IsNotEmpty()
  accountHolderName: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  ifscCode: string;
}

export class CreateVendorBodyDto implements CreateVendorDto {
  @IsString()
  @IsOptional()
  salutation?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  workPhone: string;

  @IsString()
  mobile: string;

  @IsString()
  language: string;

  @IsString()
  gstTreatment: string;

  @IsString()
  sourceOfSupply: string;

  @IsString()
  pan: string;

  @IsString()
  gstin: string;

  @IsString()
  currency: string;

  @IsString()
  paymentTerms: string;

  @IsString()
  tdsRate: string;

  @IsString()
  remarks: string;

  @IsString()
  @IsOptional()
  attachments?: string;

  @IsString()
  @IsOptional()
  commentsJson?: string;

  @IsString()
  @IsOptional()
  historyJson?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @ValidateNested()
  @Type(() => VendorAddressDto)
  billingAddress: VendorAddressDto;

  @ValidateNested()
  @Type(() => VendorAddressDto)
  shippingAddress: VendorAddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VendorContactDto)
  contactPersons: VendorContactDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VendorBankDto)
  bankAccounts: VendorBankDto[];
}

export class UpdateVendorBodyDto {
  @IsString()
  @IsOptional()
  salutation?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  workPhone?: string;

  @IsString()
  @IsOptional()
  mobile?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  gstTreatment?: string;

  @IsString()
  @IsOptional()
  sourceOfSupply?: string;

  @IsString()
  @IsOptional()
  pan?: string;

  @IsString()
  @IsOptional()
  gstin?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  paymentTerms?: string;

  @IsString()
  @IsOptional()
  tdsRate?: string;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsString()
  @IsOptional()
  attachments?: string;

  @IsString()
  @IsOptional()
  commentsJson?: string;

  @IsString()
  @IsOptional()
  historyJson?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => VendorAddressDto)
  billingAddress?: VendorAddressDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => VendorAddressDto)
  shippingAddress?: VendorAddressDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendorContactDto)
  contactPersons?: VendorContactDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendorBankDto)
  bankAccounts?: VendorBankDto[];
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  async getVendors() {
    return this.vendorsService.findAll();
  }

  @Get(':id')
  async getVendorDetails(@Param('id') id: string) {
    return this.vendorsService.findOne(id);
  }

  @Post()
  async createVendor(@Body() dto: CreateVendorBodyDto) {
    return this.vendorsService.create(dto);
  }

  @Put(':id')
  async updateVendor(
    @Param('id') id: string,
    @Body() dto: UpdateVendorBodyDto,
  ) {
    return this.vendorsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVendor(@Param('id') id: string) {
    await this.vendorsService.remove(id);
  }
}
