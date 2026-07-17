import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { InventoryService, AdjustStockDto } from './inventory.service';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AdjustStockBodyDto implements AdjustStockDto {
  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  @IsOptional()
  variantId?: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  reason: string;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async getInventoryLevels() {
    return this.inventoryService.getInventoryLevels();
  }

  @Post('adjust')
  async adjustStock(
    @Body() dto: AdjustStockBodyDto,
    @CurrentUser() admin: any,
  ) {
    const email = (admin as { email: string }).email;
    return this.inventoryService.adjustStock(dto, email);
  }

  @Get('transactions')
  async getTransactionHistory() {
    return this.inventoryService.getTransactionHistory();
  }
}
