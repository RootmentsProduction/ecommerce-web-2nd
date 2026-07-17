import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import {
  ProductsService,
  CreateProductDto,
  UpdateProductDto,
} from './products.service';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateProductImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  altText?: string;

  @IsBoolean()
  isPrimary: boolean;

  @IsNumber()
  sortOrder: number;
}

class CreateProductVariantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @IsOptional()
  sellingPrice?: number;

  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  @IsOptional()
  initialStock?: number;
}

class UpdateProductVariantDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @IsOptional()
  sellingPrice?: number;

  @IsBoolean()
  isActive: boolean;
}

export class CreateProductBodyDto implements CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  sellingPrice: number;

  @IsNumber()
  mrp: number;

  @IsNumber()
  @IsOptional()
  costPrice?: number;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsBoolean()
  @IsOptional()
  newArrival?: boolean;

  @IsBoolean()
  @IsOptional()
  bestSeller?: boolean;

  @IsBoolean()
  @IsOptional()
  showOnHomepage?: boolean;

  @IsBoolean()
  @IsOptional()
  trackInventory?: boolean;

  @IsNumber()
  @IsOptional()
  initialStock?: number;

  @IsNumber()
  @IsOptional()
  minStock?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  images: CreateProductImageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants: CreateProductVariantDto[];
}

export class UpdateProductBodyDto implements UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  sellingPrice?: number;

  @IsNumber()
  @IsOptional()
  mrp?: number;

  @IsNumber()
  @IsOptional()
  costPrice?: number;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsBoolean()
  @IsOptional()
  newArrival?: boolean;

  @IsBoolean()
  @IsOptional()
  bestSeller?: boolean;

  @IsBoolean()
  @IsOptional()
  showOnHomepage?: boolean;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  images?: CreateProductImageDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantDto)
  variants?: UpdateProductVariantDto[];
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  async getPublicProducts(
    @Query('category') category?: string,
    @Query('featured') featured?: string,
    @Query('bestSeller') bestSeller?: string,
    @Query('newArrival') newArrival?: string,
    @Query('search') search?: string,
  ) {
    return this.productsService.findAll({
      category,
      featured: featured === 'true' ? true : undefined,
      bestSeller: bestSeller === 'true' ? true : undefined,
      newArrival: newArrival === 'true' ? true : undefined,
      search,
      isAdmin: false,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Get('admin')
  async getAdminProducts(
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    return this.productsService.findAll({
      category,
      search,
      isAdmin: true,
    });
  }

  @Public()
  @Get(':idOrSlug')
  async getProductDetails(@Param('idOrSlug') idOrSlug: string) {
    return this.productsService.findOne(idOrSlug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post()
  async createProduct(
    @Body() dto: CreateProductBodyDto,
    @CurrentUser() admin: any,
  ) {
    const email = (admin as { email: string }).email;
    return this.productsService.create(dto, email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductBodyDto,
  ) {
    return this.productsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async archiveProduct(@Param('id') id: string) {
    await this.productsService.remove(id);
  }
}
