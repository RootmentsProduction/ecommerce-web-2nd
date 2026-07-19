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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_js_1 = require("../generated/prisma/client.js");
const email_service_1 = require("../email/email.service");
let InventoryService = class InventoryService {
    prisma;
    emailService;
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    mapTransactionType(type) {
        const t = type.toUpperCase();
        if (t === 'STOCK_ADDED')
            return client_js_1.StockTransactionType.STOCK_ADDED;
        if (t === 'STOCK_REMOVED')
            return client_js_1.StockTransactionType.STOCK_REMOVED;
        if (t === 'DAMAGED')
            return client_js_1.StockTransactionType.DAMAGED;
        if (t === 'SALE')
            return client_js_1.StockTransactionType.SALE;
        if (t === 'CUSTOMER_RETURN')
            return client_js_1.StockTransactionType.CUSTOMER_RETURN;
        if (t === 'PURCHASE_RECEIPT')
            return client_js_1.StockTransactionType.PURCHASE_RECEIPT;
        return client_js_1.StockTransactionType.MANUAL_CORRECTION;
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
            const sku = isVariant ? inv.variant.sku : inv.product.sku;
            const productName = isVariant
                ? inv.variant.product.name
                : inv.product.name;
            const variantName = isVariant ? inv.variant.name : null;
            const productId = isVariant ? inv.variant.productId : inv.productId;
            const imageUrl = isVariant
                ? inv.variant.product.images[0]?.url || ''
                : inv.product.images[0]?.url || '';
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
    async adjustStock(dto, adminEmail) {
        if (!dto.productId && !dto.variantId) {
            throw new common_1.BadRequestException('Either productId or variantId must be provided.');
        }
        const transactionType = this.mapTransactionType(dto.type);
        return this.prisma.$transaction(async (tx) => {
            const whereClause = {};
            if (dto.variantId) {
                whereClause.variantId = dto.variantId;
            }
            else {
                whereClause.productId = dto.productId;
            }
            const inventory = await tx.inventory.findFirst({
                where: whereClause,
            });
            if (!inventory) {
                throw new common_1.NotFoundException('Inventory record not found for the specified target.');
            }
            const beforeStock = inventory.currentStock;
            let afterStock = beforeStock;
            if (transactionType === client_js_1.StockTransactionType.STOCK_ADDED ||
                transactionType === client_js_1.StockTransactionType.PURCHASE_RECEIPT) {
                afterStock += Math.abs(dto.quantity);
            }
            else if (transactionType === client_js_1.StockTransactionType.STOCK_REMOVED ||
                transactionType === client_js_1.StockTransactionType.DAMAGED) {
                afterStock -= Math.abs(dto.quantity);
            }
            else {
                afterStock += dto.quantity;
            }
            if (afterStock < 0) {
                throw new common_1.BadRequestException(`Adjustment would result in negative stock level (${afterStock}). Operation aborted.`);
            }
            await tx.inventory.update({
                where: { id: inventory.id },
                data: {
                    currentStock: afterStock,
                },
            });
            let productId = inventory.productId;
            let productName = '';
            let variantName = null;
            let sku = '';
            if (inventory.variantId) {
                const variant = await tx.productVariant.findUnique({
                    where: { id: inventory.variantId },
                    include: { product: true },
                });
                productId = variant.productId;
                productName = variant.product.name;
                variantName = variant.name;
                sku = variant.sku;
            }
            else {
                const product = await tx.product.findUnique({
                    where: { id: inventory.productId },
                });
                productName = product.name;
                sku = product.sku;
            }
            const transaction = await tx.stockTransaction.create({
                data: {
                    productId: productId,
                    variantId: inventory.variantId,
                    type: transactionType,
                    quantity: dto.quantity,
                    beforeStock,
                    afterStock,
                    reason: dto.reason,
                    changedBy: adminEmail,
                },
            });
            if (afterStock < 5 && afterStock < beforeStock) {
                try {
                    await this.emailService.sendLowStockAlert(sku, productName, variantName, afterStock);
                }
                catch (err) {
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
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map