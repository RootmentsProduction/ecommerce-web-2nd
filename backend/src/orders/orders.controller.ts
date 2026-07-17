import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import {
  OrdersService,
  CreateOrderDto,
  CreateOrderItemDto,
} from './orders.service';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderItemBodyDto implements CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsOptional()
  variantId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsOptional()
  variantName?: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class CreateOrderBodyDto implements CreateOrderDto {
  @IsNumber()
  subtotal: number;

  @IsNumber()
  taxTotal: number;

  @IsNumber()
  @IsOptional()
  shippingCharge?: number;

  @IsNumber()
  @IsOptional()
  discountAmount?: number;

  @IsNumber()
  total: number;

  @IsNotEmpty()
  shippingAddress: any;

  @IsNotEmpty()
  billingAddress: any;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemBodyDto)
  items: CreateOrderItemBodyDto[];
}

export class UpdateOrderStatusBodyDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body() dto: CreateOrderBodyDto, @CurrentUser() user: any) {
    const userId = (user as { id: string }).id;
    return this.ordersService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyOrders(@CurrentUser() user: any) {
    const userId = (user as { id: string }).id;
    return this.ordersService.findMyOrders(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Get()
  async getAdminOrders() {
    return this.ordersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrderDetails(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersService.findOne(id, user as { id: string; role: string });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Put(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusBodyDto,
    @CurrentUser() admin: any,
  ) {
    const email = (admin as { email: string }).email;
    return this.ordersService.updateStatus(id, dto.status, email);
  }
}
