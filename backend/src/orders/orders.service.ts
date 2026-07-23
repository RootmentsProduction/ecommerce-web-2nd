import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockTransactionType, Prisma } from '../generated/prisma/client.js';
import { EmailService } from '../email/email.service';

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
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(customerId: string, dto: CreateOrderDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item.');
    }

    const order = await this.prisma.$transaction(async (tx) => {
      // Generate a unique order number
      const orderCount = await tx.order.count();
      const orderNumber = `ORD-${Date.now()}-${String(orderCount + 1).padStart(4, '0')}`;

      // Create order with snapshotted prices, set to PENDING_PAYMENT
      return tx.order.create({
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
    });

    // Try sending booking emails out-of-transaction (async/non-blocking)
    try {
      const customer = await this.prisma.user.findUnique({
        where: { id: customerId },
      });
      if (customer) {
        // Send order confirmation to customer
        await this.emailService.sendOrderConfirmation(order, customer);
        // Send alert to administrator
        await this.emailService.sendAdminOrderNotification(order, customer);
      }
    } catch (err) {
      // Log notification error but do not disrupt order completion
      console.error('Failed to dispatch order notification emails:', err);
    }

    return order;
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

  async findOne(idOrNumber: string, user: { id: string; role: string }) {
    const order = await this.prisma.order.findFirst({
      where: {
        OR: [
          { id: idOrNumber },
          { orderNumber: idOrNumber },
        ],
      },
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
      throw new NotFoundException(`Order ${idOrNumber} not found.`);
    }

    // Customer can only view their own orders
    if (user.role === 'CUSTOMER' && order.customerId !== user.id) {
      throw new NotFoundException(`Order ${idOrNumber} not found.`);
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

    const lowStockItems: { sku: string; name: string; variantName: string | null; stock: number }[] = [];

    const updatedOrder = await this.prisma.$transaction(async (tx) => {
      // Feature flag to control whether stock is deducted on confirmation. Set to true so inventory is updated when order confirms.
      const ENABLE_STOCK_DEDUCTION_ON_ORDER_CONFIRMATION = true;

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

          if (afterStock < 5) {
            lowStockItems.push({
              sku: item.sku,
              name: item.name,
              variantName: item.variantName || null,
              stock: afterStock,
            });
          }

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

    // Send low-stock alert emails async after transaction commits successfully
    if (lowStockItems.length > 0) {
      for (const item of lowStockItems) {
        try {
          await this.emailService.sendLowStockAlert(
            item.sku,
            item.name,
            item.variantName,
            item.stock,
          );
        } catch (err) {
          console.error(`Failed to send low stock alert for SKU ${item.sku}:`, err);
        }
      }
    }

    return updatedOrder;
  }

  async markOrderAsPaid(
    orderId: string,
    paymentDetails: {
      paymentMethod: string;
      paymentProvider: string;
      phonepeTransactionId: string;
      merchantTransactionId: string;
      paymentReference?: string;
      paymentResponse: string;
      paymentCompletedAt: Date;
    },
  ) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    if (order.paymentStatus === 'PAID') {
      return order; // Idempotent check
    }

    const lowStockItems: { sku: string; name: string; variantName: string | null; stock: number }[] = [];

    const updatedOrder = await this.prisma.$transaction(async (tx) => {
      // Re-fetch order in transaction to prevent race conditions
      const currentOrder = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (!currentOrder) {
        throw new NotFoundException(`Order with ID ${orderId} not found.`);
      }

      if (currentOrder.paymentStatus === 'PAID') {
        return currentOrder;
      }

      // Deduct inventory
      for (const item of currentOrder.items) {
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

        if (afterStock < 5) {
          lowStockItems.push({
            sku: item.sku,
            name: item.name,
            variantName: item.variantName || null,
            stock: afterStock,
          });
        }

        // Log SALE transaction
        await tx.stockTransaction.create({
          data: {
            productId: item.productId,
            variantId: item.variantId,
            type: StockTransactionType.SALE,
            quantity: -item.quantity,
            beforeStock,
            afterStock,
            reason: `PhonePe checkout deduction (Order: ${currentOrder.orderNumber})`,
            changedBy: 'SYSTEM',
            reference: currentOrder.id,
          },
        });
      }

      // Update order status to CONFIRMED and payment status to PAID
      return tx.order.update({
        where: { id: orderId },
        data: {
          status: 'CONFIRMED',
          paymentStatus: 'PAID',
          paymentMethod: paymentDetails.paymentMethod,
          paymentProvider: paymentDetails.paymentProvider,
          phonepeTransactionId: paymentDetails.phonepeTransactionId,
          merchantTransactionId: paymentDetails.merchantTransactionId,
          paymentReference: paymentDetails.paymentReference,
          paymentCompletedAt: paymentDetails.paymentCompletedAt,
          paymentResponse: paymentDetails.paymentResponse,
        },
        include: {
          items: true,
        },
      });
    });

    // Send notifications out-of-transaction (async/non-blocking)
    try {
      const customer = await this.prisma.user.findUnique({
        where: { id: order.customerId },
      });
      if (customer) {
        // Send order confirmation to customer
        await this.emailService.sendOrderConfirmation(updatedOrder, customer);
        // Send alert to administrator
        await this.emailService.sendAdminOrderNotification(updatedOrder, customer);
      }
    } catch (err) {
      console.error('Failed to dispatch order notification emails after payment:', err);
    }

    // Send low-stock alert emails async
    if (lowStockItems.length > 0) {
      for (const item of lowStockItems) {
        try {
          await this.emailService.sendLowStockAlert(
            item.sku,
            item.name,
            item.variantName,
            item.stock,
          );
        } catch (err) {
          console.error(`Failed to send low stock alert for SKU ${item.sku}:`, err);
        }
      }
    }

    return updatedOrder;
  }

  async markOrderAsFailed(orderId: string, paymentResponse: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'FAILED',
        paymentResponse,
      },
    });
  }
}
