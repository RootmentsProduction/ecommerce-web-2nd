import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockTransactionType, Prisma } from '../generated/prisma/client.js';

export interface CreateOrderItemDto {
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  variantName?: string;
  quantity: number;
  price: number;
}

export interface CreateOrderDto {
  subtotal: number;
  taxTotal: number;
  shippingCharge?: number;
  discountAmount?: number;
  total: number;
  shippingAddress: any;
  billingAddress: any;
  notes?: string;
  items: CreateOrderItemDto[];
}

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(customerId: string, dto: CreateOrderDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item.');
    }

    return this.prisma.$transaction(async (tx) => {
      // Generate a unique order number
      const orderCount = await tx.order.count();
      const orderNumber = `ORD-${Date.now()}-${String(orderCount + 1).padStart(4, '0')}`;

      // Create order with snapshotted prices, set to PENDING_PAYMENT
      const order = await tx.order.create({
        data: {
          orderNumber,
          customerId,
          status: 'PENDING_PAYMENT',
          paymentStatus: 'PENDING',
          subtotal: dto.subtotal,
          taxTotal: dto.taxTotal,
          shippingCharge: dto.shippingCharge ?? 0,
          discountAmount: dto.discountAmount ?? 0,
          total: dto.total,
          shippingAddress: dto.shippingAddress as Prisma.InputJsonValue,
          billingAddress: dto.billingAddress as Prisma.InputJsonValue,
          notes: dto.notes,
          items: {
            create: dto.items.map((item) => ({
              productId: item.productId,
              variantId: item.variantId,
              name: item.name,
              sku: item.sku,
              variantName: item.variantName,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return order;
    });
  }

  async findMyOrders(customerId: string) {
    return this.prisma.order.findMany({
      where: { customerId },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, user: { id: string; role: string }) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true } },
              },
            },
          },
        },
        customer: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }

    // Customer can only view their own orders
    if (user.role === 'CUSTOMER' && order.customerId !== user.id) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }

    return order;
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        customer: true,
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateStatus(id: string, status: string, adminEmail: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }

    const previousStatus = order.status;
    const targetStatus = status.toUpperCase();

    // Prevent duplicate processing
    if (previousStatus === targetStatus) {
      return order;
    }

    return this.prisma.$transaction(async (tx) => {
      // Feature flag to control whether stock is deducted on confirmation. Set to false until payment engine is approved.
      const ENABLE_STOCK_DEDUCTION_ON_ORDER_CONFIRMATION = false;

      const isConfirming =
        (previousStatus === 'PENDING_PAYMENT' ||
          previousStatus === 'CANCELLED') &&
        (targetStatus === 'CONFIRMED' ||
          targetStatus === 'PROCESSING' ||
          targetStatus === 'DELIVERED');

      const isCancelling =
        (previousStatus === 'CONFIRMED' ||
          previousStatus === 'PROCESSING' ||
          previousStatus === 'DELIVERED') &&
        targetStatus === 'CANCELLED';

      if (ENABLE_STOCK_DEDUCTION_ON_ORDER_CONFIRMATION && isConfirming) {
        for (const item of order.items) {
          // Find the inventory target
          const whereClause: Prisma.InventoryWhereInput = {};
          if (item.variantId) {
            whereClause.variantId = item.variantId;
          } else {
            whereClause.productId = item.productId;
          }

          const inventory = await tx.inventory.findFirst({
            where: whereClause,
          });

          if (!inventory) {
            throw new BadRequestException(
              `Inventory record not found for item ${item.name} (SKU: ${item.sku})`,
            );
          }

          const beforeStock = inventory.currentStock;
          const afterStock = beforeStock - item.quantity;

          if (afterStock < 0) {
            throw new BadRequestException(
              `Insufficient stock to confirm order. SKU ${item.sku} has only ${beforeStock} units available, but ${item.quantity} are requested.`,
            );
          }

          // Deduct stock
          await tx.inventory.update({
            where: { id: inventory.id },
            data: {
              currentStock: afterStock,
            },
          });

          // Log SALE transaction
          await tx.stockTransaction.create({
            data: {
              productId: item.productId,
              variantId: item.variantId,
              type: StockTransactionType.SALE,
              quantity: -item.quantity,
              beforeStock,
              afterStock,
              reason: `Sale checkout deduction (Order: ${order.orderNumber})`,
              changedBy: adminEmail,
              reference: order.id,
            },
          });
        }
      } else if (ENABLE_STOCK_DEDUCTION_ON_ORDER_CONFIRMATION && isCancelling) {
        // Refund inventory
        for (const item of order.items) {
          const whereClause: Prisma.InventoryWhereInput = {};
          if (item.variantId) {
            whereClause.variantId = item.variantId;
          } else {
            whereClause.productId = item.productId;
          }

          const inventory = await tx.inventory.findFirst({
            where: whereClause,
          });

          if (inventory) {
            const beforeStock = inventory.currentStock;
            const afterStock = beforeStock + item.quantity;

            await tx.inventory.update({
              where: { id: inventory.id },
              data: {
                currentStock: afterStock,
              },
            });

            // Log CUSTOMER_RETURN or stock correction transaction
            await tx.stockTransaction.create({
              data: {
                productId: item.productId,
                variantId: item.variantId,
                type: StockTransactionType.CUSTOMER_RETURN,
                quantity: item.quantity,
                beforeStock,
                afterStock,
                reason: `Order cancellation refund (Order: ${order.orderNumber})`,
                changedBy: adminEmail,
                reference: order.id,
              },
            });
          }
        }
      }

      // Update order status
      const updatedOrder = await tx.order.update({
        where: { id },
        data: {
          status: targetStatus,
          // Simulate payment completion if confirming
          ...(isConfirming ? { paymentStatus: 'PAID' } : {}),
          ...(targetStatus === 'CANCELLED' ? { paymentStatus: 'FAILED' } : {}),
        },
        include: {
          items: true,
        },
      });

      return updatedOrder;
    });
  }
}
