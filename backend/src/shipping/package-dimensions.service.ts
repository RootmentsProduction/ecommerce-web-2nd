import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface ResolvedPackageDimensions {
  length: number;
  width: number;
  height: number;
  weight: number;
  source: 'PRODUCT' | 'CATEGORY' | 'SETTINGS';
}

@Injectable()
export class PackageDimensionsService {
  private readonly logger = new Logger(PackageDimensionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Resolves final shipment package dimensions using priority cascade:
   * 1. Product Dimensions (if all products in order specify length, width, height, weight)
   * 2. Category Defaults (if product category specifies defaults)
   * 3. ShippingSettings Defaults (fallback)
   */
  async resolveOrderDimensions(
    orderId: string,
    defaultSettings: { length: number; width: number; height: number; weight: number },
  ): Promise<ResolvedPackageDimensions> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              include: { category: true },
            },
          },
        },
      },
    });

    if (!order || !order.items || order.items.length === 0) {
      return {
        ...defaultSettings,
        source: 'SETTINGS',
      };
    }

    // Try Product Level
    let maxProductL = 0;
    let maxProductW = 0;
    let maxProductH = 0;
    let totalProductWeight = 0;
    let hasAllProductDims = true;

    for (const item of order.items) {
      const p = item.product;
      if (
        p &&
        p.packageLength &&
        p.packageWidth &&
        p.packageHeight &&
        p.packageWeight
      ) {
        maxProductL = Math.max(maxProductL, p.packageLength);
        maxProductW = Math.max(maxProductW, p.packageWidth);
        maxProductH = Math.max(maxProductH, p.packageHeight);
        totalProductWeight += p.packageWeight * item.quantity;
      } else {
        hasAllProductDims = false;
        break;
      }
    }

    if (hasAllProductDims && maxProductL > 0) {
      this.logger.log(`Resolved dimensions from Product level for order ${orderId}`);
      return {
        length: maxProductL,
        width: maxProductW,
        height: maxProductH,
        weight: Math.max(0.1, totalProductWeight),
        source: 'PRODUCT',
      };
    }

    // Try Category Level
    let maxCategoryL = 0;
    let maxCategoryW = 0;
    let maxCategoryH = 0;
    let totalCategoryWeight = 0;
    let hasAllCategoryDims = true;

    for (const item of order.items) {
      const cat = item.product?.category;
      if (
        cat &&
        cat.defaultLength &&
        cat.defaultWidth &&
        cat.defaultHeight &&
        cat.defaultWeight
      ) {
        maxCategoryL = Math.max(maxCategoryL, cat.defaultLength);
        maxCategoryW = Math.max(maxCategoryW, cat.defaultWidth);
        maxCategoryH = Math.max(maxCategoryH, cat.defaultHeight);
        totalCategoryWeight += cat.defaultWeight * item.quantity;
      } else {
        hasAllCategoryDims = false;
        break;
      }
    }

    if (hasAllCategoryDims && maxCategoryL > 0) {
      this.logger.log(`Resolved dimensions from Category level for order ${orderId}`);
      return {
        length: maxCategoryL,
        width: maxCategoryW,
        height: maxCategoryH,
        weight: Math.max(0.1, totalCategoryWeight),
        source: 'CATEGORY',
      };
    }

    // Fallback to ShippingSettings
    this.logger.log(`Fallback to ShippingSettings defaults for order ${orderId}`);
    return {
      length: defaultSettings.length,
      width: defaultSettings.width,
      height: defaultSettings.height,
      weight: defaultSettings.weight,
      source: 'SETTINGS',
    };
  }
}
