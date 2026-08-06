import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '../generated/prisma/client.js';
import { ShippingService } from './shipping.service';
import { CourierService } from './courier.service';
import {
  CreateShipmentDto,
  EstimateShippingDto,
  UpdateShippingSettingsDto,
} from './shipping.dto';

@Controller('shipping')
export class ShippingController {
  constructor(
    private readonly shippingService: ShippingService,
    private readonly courierService: CourierService,
  ) {}

  /**
   * Estimate shipping rates during checkout (Public)
   */
  @Public()
  @Post('estimate')
  async estimateShipping(@Body() dto: EstimateShippingDto) {
    return this.courierService.estimateShipping(dto);
  }

  /**
   * Webhook receiver for Shiprocket live status updates (Public)
   */
  @Public()
  @Post('webhook')
  async handleWebhook(
    @Body() payload: any,
    @Headers('x-shiprocket-secret') secretHeader?: string,
  ) {
    return this.shippingService.handleWebhook(payload, secretHeader);
  }

  /**
   * Get Shipment details for an Order (Customer / Admin)
   */
  @UseGuards(JwtAuthGuard)
  @Get('orders/:orderId')
  async getShipmentDetails(@Param('orderId') orderId: string) {
    return this.shippingService.getShipmentByOrderId(orderId);
  }

  /**
   * Track Shipment live status (Customer / Admin)
   */
  @UseGuards(JwtAuthGuard)
  @Get('orders/:orderId/track')
  async trackShipment(@Param('orderId') orderId: string) {
    return this.shippingService.trackShipment(orderId);
  }

  /**
   * Admin: Create Shipment in Shiprocket
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('orders/:orderId/ship')
  async createShipment(
    @Param('orderId') orderId: string,
    @Body() dto: CreateShipmentDto,
  ) {
    return this.shippingService.createShipment(orderId, dto);
  }

  /**
   * Admin: Assign Courier / Generate AWB Code
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('orders/:orderId/awb')
  async generateAwb(
    @Param('orderId') orderId: string,
    @Body() body: { courierCompanyId?: number },
  ) {
    return this.shippingService.generateAwb(orderId, body?.courierCompanyId);
  }

  /**
   * Admin: Request Pickup from Courier
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('orders/:orderId/pickup')
  async requestPickup(@Param('orderId') orderId: string) {
    return this.shippingService.requestPickup(orderId);
  }

  /**
   * Admin: Generate Label PDF URL
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('orders/:orderId/label')
  async generateLabel(@Param('orderId') orderId: string) {
    return this.shippingService.generateLabel(orderId);
  }

  /**
   * Admin: Generate Invoice PDF URL
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('orders/:orderId/invoice')
  async generateInvoice(@Param('orderId') orderId: string) {
    return this.shippingService.generateInvoice(orderId);
  }

  /**
   * Admin: Generate Manifest Document URL
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('orders/:orderId/manifest')
  async generateManifest(@Param('orderId') orderId: string) {
    return this.shippingService.generateManifest(orderId);
  }

  /**
   * Admin: Force Sync Status with Shiprocket
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('orders/:orderId/sync')
  async syncStatus(@Param('orderId') orderId: string) {
    return this.shippingService.trackShipment(orderId);
  }

  /**
   * Admin: Cancel Shipment
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('orders/:orderId/cancel')
  async cancelShipment(@Param('orderId') orderId: string) {
    return this.shippingService.cancelShipment(orderId);
  }

  /**
   * Admin: Get Shipping Settings
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Get('settings')
  async getSettings() {
    return this.shippingService.getSettings();
  }

  /**
   * Admin: Update Shipping Settings
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Put('settings')
  async updateSettings(@Body() dto: UpdateShippingSettingsDto) {
    return this.shippingService.updateSettings(dto);
  }

  /**
   * Admin: Test Connection to Shiprocket API
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('settings/test')
  async testConnection() {
    return this.shippingService.testConnection();
  }
}
