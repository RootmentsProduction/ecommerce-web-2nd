"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_js_1 = require("../generated/prisma/client.js");
const email_service_1 = require("../email/email.service");
let OrdersService = class OrdersService {
    prisma;
    emailService;
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async create(customerId, dto) {
        if (!dto.items || dto.items.length === 0) {
            throw new common_1.BadRequestException('Order must contain at least one item.');
        }
        const order = await this.prisma.$transaction(async (tx) => {
            const orderCount = await tx.order.count();
            const orderNumber = `ORD-${Date.now()}-${String(orderCount + 1).padStart(4, '0')}`;
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
                    shippingAddress: dto.shippingAddress,
                    billingAddress: dto.billingAddress,
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
        try {
            const customer = await this.prisma.user.findUnique({
                where: { id: customerId },
            });
            if (customer) {
                await this.emailService.sendOrderConfirmation(order, customer);
                await this.emailService.sendAdminOrderNotification(order, customer);
            }
        }
        catch (err) {
            console.error('Failed to dispatch order notification emails:', err);
        }
        return order;
    }
    async findMyOrders(customerId) {
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
    async findOne(idOrNumber, user) {
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
            throw new common_1.NotFoundException(`Order ${idOrNumber} not found.`);
        }
        if (user.role === 'CUSTOMER' && order.customerId !== user.id) {
            throw new common_1.NotFoundException(`Order ${idOrNumber} not found.`);
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
    async updateStatus(id, status, adminEmail) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found.`);
        }
        const previousStatus = order.status;
        const targetStatus = status.toUpperCase();
        if (previousStatus === targetStatus) {
            return order;
        }
        const lowStockItems = [];
        const updatedOrder = await this.prisma.$transaction(async (tx) => {
            const ENABLE_STOCK_DEDUCTION_ON_ORDER_CONFIRMATION = true;
            const isConfirming = (previousStatus === 'PENDING_PAYMENT' ||
                previousStatus === 'CANCELLED') &&
                (targetStatus === 'CONFIRMED' ||
                    targetStatus === 'PROCESSING' ||
                    targetStatus === 'DELIVERED');
            const isCancelling = (previousStatus === 'CONFIRMED' ||
                previousStatus === 'PROCESSING' ||
                previousStatus === 'DELIVERED') &&
                targetStatus === 'CANCELLED';
            if (ENABLE_STOCK_DEDUCTION_ON_ORDER_CONFIRMATION && isConfirming) {
                for (const item of order.items) {
                    const whereClause = {};
                    if (item.variantId) {
                        whereClause.variantId = item.variantId;
                    }
                    else {
                        whereClause.productId = item.productId;
                    }
                    const inventory = await tx.inventory.findFirst({
                        where: whereClause,
                    });
                    if (!inventory) {
                        throw new common_1.BadRequestException(`Inventory record not found for item ${item.name} (SKU: ${item.sku})`);
                    }
                    const beforeStock = inventory.currentStock;
                    const afterStock = beforeStock - item.quantity;
                    if (afterStock < 0) {
                        throw new common_1.BadRequestException(`Insufficient stock to confirm order. SKU ${item.sku} has only ${beforeStock} units available, but ${item.quantity} are requested.`);
                    }
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
                    await tx.stockTransaction.create({
                        data: {
                            productId: item.productId,
                            variantId: item.variantId,
                            type: client_js_1.StockTransactionType.SALE,
                            quantity: -item.quantity,
                            beforeStock,
                            afterStock,
                            reason: `Sale checkout deduction (Order: ${order.orderNumber})`,
                            changedBy: adminEmail,
                            reference: order.id,
                        },
                    });
                }
            }
            else if (ENABLE_STOCK_DEDUCTION_ON_ORDER_CONFIRMATION && isCancelling) {
                for (const item of order.items) {
                    const whereClause = {};
                    if (item.variantId) {
                        whereClause.variantId = item.variantId;
                    }
                    else {
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
                        await tx.stockTransaction.create({
                            data: {
                                productId: item.productId,
                                variantId: item.variantId,
                                type: client_js_1.StockTransactionType.CUSTOMER_RETURN,
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
            const updatedOrder = await tx.order.update({
                where: { id },
                data: {
                    status: targetStatus,
                    ...(isConfirming ? { paymentStatus: 'PAID' } : {}),
                    ...(targetStatus === 'CANCELLED' ? { paymentStatus: 'FAILED' } : {}),
                },
                include: {
                    items: true,
                },
            });
            return updatedOrder;
        });
        if (lowStockItems.length > 0) {
            for (const item of lowStockItems) {
                try {
                    await this.emailService.sendLowStockAlert(item.sku, item.name, item.variantName, item.stock);
                }
                catch (err) {
                    console.error(`Failed to send low stock alert for SKU ${item.sku}:`, err);
                }
            }
        }
        return updatedOrder;
    }
    async markOrderAsPaid(orderId, paymentDetails) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found.`);
        }
        if (order.paymentStatus === 'PAID') {
            return order;
        }
        const lowStockItems = [];
        const updatedOrder = await this.prisma.$transaction(async (tx) => {
            const currentOrder = await tx.order.findUnique({
                where: { id: orderId },
                include: { items: true },
            });
            if (!currentOrder) {
                throw new common_1.NotFoundException(`Order with ID ${orderId} not found.`);
            }
            if (currentOrder.paymentStatus === 'PAID') {
                return currentOrder;
            }
            for (const item of currentOrder.items) {
                const whereClause = {};
                if (item.variantId) {
                    whereClause.variantId = item.variantId;
                }
                else {
                    whereClause.productId = item.productId;
                }
                const inventory = await tx.inventory.findFirst({
                    where: whereClause,
                });
                if (!inventory) {
                    throw new common_1.BadRequestException(`Inventory record not found for item ${item.name} (SKU: ${item.sku})`);
                }
                const beforeStock = inventory.currentStock;
                const afterStock = beforeStock - item.quantity;
                if (afterStock < 0) {
                    throw new common_1.BadRequestException(`Insufficient stock to confirm order. SKU ${item.sku} has only ${beforeStock} units available, but ${item.quantity} are requested.`);
                }
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
                await tx.stockTransaction.create({
                    data: {
                        productId: item.productId,
                        variantId: item.variantId,
                        type: client_js_1.StockTransactionType.SALE,
                        quantity: -item.quantity,
                        beforeStock,
                        afterStock,
                        reason: `PhonePe checkout deduction (Order: ${currentOrder.orderNumber})`,
                        changedBy: 'SYSTEM',
                        reference: currentOrder.id,
                    },
                });
            }
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
        try {
            const customer = await this.prisma.user.findUnique({
                where: { id: order.customerId },
            });
            if (customer) {
                await this.emailService.sendOrderConfirmation(updatedOrder, customer);
                await this.emailService.sendAdminOrderNotification(updatedOrder, customer);
            }
        }
        catch (err) {
            console.error('Failed to dispatch order notification emails after payment:', err);
        }
        if (lowStockItems.length > 0) {
            for (const item of lowStockItems) {
                try {
                    await this.emailService.sendLowStockAlert(item.sku, item.name, item.variantName, item.stock);
                }
                catch (err) {
                    console.error(`Failed to send low stock alert for SKU ${item.sku}:`, err);
                }
            }
        }
        return updatedOrder;
    }
    async markOrderAsFailed(orderId, paymentResponse) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                paymentStatus: 'FAILED',
                paymentResponse,
            },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map