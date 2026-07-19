import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockTransactionType, Prisma } from '../generated/prisma/client.js';
import { EmailService } from '../email/email.service';

export interface AdjustStockDto {
  productId?: string;
  variantId?: string;
  type: string; // StockTransactionType matching e.g. STOCK_ADDED, STOCK_REMOVED, DAMAGED, MANUAL_CORRECTION
  quantity: number; // Positive or negative quantity
  reason: string;
}

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  private mapTransactionType(type: string): StockTransactionType {
    const t = type.toUpperCase();
    if (t === 'STOCK_ADDED') return StockTransactionType.STOCK_ADDED;
    if (t === 'STOCK_REMOVED') return StockTransactionType.STOCK_REMOVED;
    if (t === 'DAMAGED') return StockTransactionType.DAMAGED;
    if (t === 'SALE') return StockTransactionType.SALE;
    if (t === 'CUSTOMER_RETURN') return StockTransactionType.CUSTOMER_RETURN;
    if (t === 'PURCHASE_RECEIPT') return StockTransactionType.PURCHASE_RECEIPT;
    return StockTransactionType.MANUAL_CORRECTION;
  }

  async getInventoryLevels() {
    const inventories = await this.prisma.inventory.findMany({
      include: {
        product: {
          include: {
            images: { where: { isPrimary: true } },
          },
        },
        variant: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true } },
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return inventories.map((inv) => {
      const isVariant = !!inv.variantId;
      const sku = isVariant ? inv.variant!.sku : inv.product!.sku;
      const productName = isVariant
        ? inv.variant!.product.name
        : inv.product!.name;
      const variantName = isVariant ? inv.variant!.name : null;
      const productId = isVariant ? inv.variant!.productId : inv.productId!;
      const imageUrl = isVariant
        ? inv.variant!.product.images[0]?.url || ''
        : inv.product!.images[0]?.url || '';

      return {
        id: inv.id,
        productId,
        variantId: inv.variantId,
        sku,
        productName,
        variantName,
        imageUrl,
        currentStock: inv.currentStock,
        reservedStock: inv.reservedStock,
        incomingStock: inv.incomingStock,
        minimumRequired: inv.minimumRequired,
        reorderPoint: inv.reorderPoint,
        updatedAt: inv.updatedAt,
      };
    });
  }

  async adjustStock(dto: AdjustStockDto, adminEmail: string) {
    if (!dto.productId && !dto.variantId) {
      throw new BadRequestException(
        'Either productId or variantId must be provided.',
      );
    }

    const transactionType = this.mapTransactionType(dto.type);

    return this.prisma.$transaction(async (tx) => {
      // Find inventory
      const whereClause: Prisma.InventoryWhereInput = {};
      if (dto.variantId) {
        whereClause.variantId = dto.variantId;
      } else {
        whereClause.productId = dto.productId;
      }

      const inventory = await tx.inventory.findFirst({
        where: whereClause,
      });

      if (!inventory) {
        throw new NotFoundException(
          'Inventory record not found for the specified target.',
        );
      }

      const beforeStock = inventory.currentStock;
      let afterStock = beforeStock;

      // Adjustments logic
      // STOCK_ADDED, PURCHASE_RECEIPT increase stock
      // STOCK_REMOVED, DAMAGED decrease stock
      // MANUAL_CORRECTION can be positive or negative
      if (
        transactionType === StockTransactionType.STOCK_ADDED ||
        transactionType === StockTransactionType.PURCHASE_RECEIPT
      ) {
        afterStock += Math.abs(dto.quantity);
      } else if (
        transactionType === StockTransactionType.STOCK_REMOVED ||
        transactionType === StockTransactionType.DAMAGED
      ) {
        afterStock -= Math.abs(dto.quantity);
      } else {
        // MANUAL_CORRECTION
        afterStock += dto.quantity;
      }

      if (afterStock < 0) {
        throw new BadRequestException(
          `Adjustment would result in negative stock level (${afterStock}). Operation aborted.`,
        );
      }

      // Update inventory levels
      await tx.inventory.update({
        where: { id: inventory.id },
        data: {
          currentStock: afterStock,
        },
      });

      // Get target details for the log and email alert
      let productId = inventory.productId;
      let productName = '';
      let variantName: string | null = null;
      let sku = '';

      if (inventory.variantId) {
        const variant = await tx.productVariant.findUnique({
          where: { id: inventory.variantId },
          include: { product: true },
        });
        productId = variant!.productId;
        productName = variant!.product.name;
        variantName = variant!.name;
        sku = variant!.sku;
      } else {
        const product = await tx.product.findUnique({
          where: { id: inventory.productId! },
        });
        productName = product!.name;
        sku = product!.sku;
      }

      // Create transaction log
      const transaction = await tx.stockTransaction.create({
        data: {
          productId: productId!,
          variantId: inventory.variantId,
          type: transactionType,
          quantity: dto.quantity,
          beforeStock,
          afterStock,
          reason: dto.reason,
          changedBy: adminEmail,
        },
      });

      // Fire low stock email alert after transaction if stock drops below 5
      if (afterStock < 5 && afterStock < beforeStock) {
        try {
          await this.emailService.sendLowStockAlert(
            sku,
            productName,
            variantName,
            afterStock,
          );
        } catch (err) {
          console.error(`Failed to send low stock alert for SKU ${sku}:`, err);
        }
      }

      return {
        inventoryId: inventory.id,
        beforeStock,
        afterStock,
        transaction,
      };
    });
  }

  async getTransactionHistory() {
    const transactions = await this.prisma.stockTransaction.findMany({
      include: {
        product: true,
        variant: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return transactions.map((t) => ({
      id: t.id,
      date: t.createdAt,
      type: t.type,
      quantity: t.quantity,
      beforeStock: t.beforeStock,
      afterStock: t.afterStock,
      reason: t.reason,
      reference: t.reference || null,
      changedBy: t.changedBy,
      productId: t.productId,
      productName: t.product.name,
      variantName: t.variant?.name || null,
      sku: t.variant?.sku || t.product.sku,
    }));
  }
}
