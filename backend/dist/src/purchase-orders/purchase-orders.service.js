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
exports.PurchaseOrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_js_1 = require("../generated/prisma/client.js");
let PurchaseOrdersService = class PurchaseOrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.purchaseOrder.findMany({
            include: {
                vendor: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const po = await this.prisma.purchaseOrder.findUnique({
            where: { id },
            include: {
                vendor: true,
                items: true,
                receipts: {
                    include: {
                        items: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
        if (!po) {
            throw new common_1.NotFoundException(`Purchase Order ${id} not found.`);
        }
        return po;
    }
    async create(dto) {
        return this.prisma.$transaction(async (tx) => {
            const po = await tx.purchaseOrder.create({
                data: {
                    vendorId: dto.vendorId,
                    vendorName: dto.vendorName,
                    vendorState: dto.vendorState,
                    deliverToBranch: dto.deliverToBranch,
                    deliverToState: dto.deliverToState,
                    deliverToAddress: dto.deliverToAddress,
                    referenceNumber: dto.referenceNumber,
                    date: new Date(dto.date),
                    deliveryDate: dto.deliveryDate ? new Date(dto.deliveryDate) : null,
                    paymentTerms: dto.paymentTerms,
                    shipmentPreference: dto.shipmentPreference,
                    status: dto.status,
                    subtotal: dto.subtotal,
                    discountType: dto.discountType,
                    discountValue: dto.discountValue,
                    discountUnit: dto.discountUnit,
                    discountAfterTax: dto.discountAfterTax,
                    discountAmount: dto.discountAmount,
                    taxSplitType: dto.taxSplitType,
                    cgstAmount: dto.cgstAmount,
                    sgstAmount: dto.sgstAmount,
                    igstAmount: dto.igstAmount,
                    taxTotal: dto.taxTotal,
                    tdsTcsType: dto.tdsTcsType,
                    tdsTcsRate: dto.tdsTcsRate,
                    tdsTcsAmount: dto.tdsTcsAmount,
                    tdsTcsName: dto.tdsTcsName,
                    adjustment: dto.adjustment,
                    total: dto.total,
                    customerNotes: dto.customerNotes,
                    termsAndConditions: dto.termsAndConditions,
                    attachments: dto.attachments,
                    items: {
                        create: dto.items,
                    },
                },
                include: {
                    items: true,
                },
            });
            return po;
        });
    }
    async update(id, dto) {
        const po = await this.prisma.purchaseOrder.findUnique({
            where: { id },
        });
        if (!po) {
            throw new common_1.NotFoundException(`Purchase Order ${id} not found.`);
        }
        if (po.status === 'Received') {
            throw new common_1.BadRequestException('Cannot modify a fully received purchase order.');
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.purchaseOrderItem.deleteMany({ where: { purchaseOrderId: id } });
            return tx.purchaseOrder.update({
                where: { id },
                data: {
                    vendorId: dto.vendorId,
                    vendorName: dto.vendorName,
                    vendorState: dto.vendorState,
                    deliverToBranch: dto.deliverToBranch,
                    deliverToState: dto.deliverToState,
                    deliverToAddress: dto.deliverToAddress,
                    referenceNumber: dto.referenceNumber,
                    date: new Date(dto.date),
                    deliveryDate: dto.deliveryDate ? new Date(dto.deliveryDate) : null,
                    paymentTerms: dto.paymentTerms,
                    shipmentPreference: dto.shipmentPreference,
                    status: dto.status,
                    subtotal: dto.subtotal,
                    discountType: dto.discountType,
                    discountValue: dto.discountValue,
                    discountUnit: dto.discountUnit,
                    discountAfterTax: dto.discountAfterTax,
                    discountAmount: dto.discountAmount,
                    taxSplitType: dto.taxSplitType,
                    cgstAmount: dto.cgstAmount,
                    sgstAmount: dto.sgstAmount,
                    igstAmount: dto.igstAmount,
                    taxTotal: dto.taxTotal,
                    tdsTcsType: dto.tdsTcsType,
                    tdsTcsRate: dto.tdsTcsRate,
                    tdsTcsAmount: dto.tdsTcsAmount,
                    tdsTcsName: dto.tdsTcsName,
                    adjustment: dto.adjustment,
                    total: dto.total,
                    customerNotes: dto.customerNotes,
                    termsAndConditions: dto.termsAndConditions,
                    attachments: dto.attachments,
                    items: {
                        create: dto.items,
                    },
                },
                include: {
                    items: true,
                },
            });
        });
    }
    async receiveItems(id, dto) {
        const po = await this.prisma.purchaseOrder.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!po) {
            throw new common_1.NotFoundException(`Purchase Order ${id} not found.`);
        }
        if (po.status === 'Cancelled') {
            throw new common_1.BadRequestException('Cannot receive items on a cancelled purchase order.');
        }
        if (po.status === 'Received') {
            throw new common_1.BadRequestException('Purchase Order is already fully received.');
        }
        return this.prisma.$transaction(async (tx) => {
            const receipt = await tx.purchaseReceipt.create({
                data: {
                    purchaseOrderId: id,
                    receivedBy: dto.receivedBy,
                    notes: dto.notes,
                },
            });
            for (const itemDto of dto.items) {
                if (itemDto.quantityReceived <= 0) {
                    throw new common_1.BadRequestException(`Quantity received for SKU ${itemDto.sku} must be greater than zero.`);
                }
                const poItem = po.items.find((item) => item.sku === itemDto.sku);
                if (!poItem) {
                    throw new common_1.BadRequestException(`SKU ${itemDto.sku} is not part of this purchase order.`);
                }
                const remaining = poItem.quantity - poItem.receivedQuantity;
                if (itemDto.quantityReceived > remaining) {
                    throw new common_1.BadRequestException(`Cannot receive ${itemDto.quantityReceived} units for SKU ${itemDto.sku}. Only ${remaining} units remaining.`);
                }
                await tx.purchaseOrderItem.update({
                    where: { id: poItem.id },
                    data: {
                        receivedQuantity: poItem.receivedQuantity + itemDto.quantityReceived,
                    },
                });
                await tx.purchaseReceiptItem.create({
                    data: {
                        receiptId: receipt.id,
                        sku: itemDto.sku,
                        quantityReceived: itemDto.quantityReceived,
                    },
                });
                const variant = await tx.productVariant.findUnique({
                    where: { sku: itemDto.sku },
                });
                const inventoryTarget = {};
                let productId;
                let variantId = null;
                if (variant) {
                    inventoryTarget.variantId = variant.id;
                    productId = variant.productId;
                    variantId = variant.id;
                }
                else {
                    const product = await tx.product.findUnique({
                        where: { sku: itemDto.sku },
                    });
                    if (!product) {
                        throw new common_1.BadRequestException(`SKU ${itemDto.sku} does not match any product or variant.`);
                    }
                    inventoryTarget.productId = product.id;
                    productId = product.id;
                }
                const inventory = await tx.inventory.findFirst({
                    where: inventoryTarget,
                });
                if (!inventory) {
                    throw new common_1.NotFoundException(`Inventory record not found for SKU ${itemDto.sku}`);
                }
                const beforeStock = inventory.currentStock;
                const afterStock = beforeStock + itemDto.quantityReceived;
                await tx.inventory.update({
                    where: { id: inventory.id },
                    data: {
                        currentStock: afterStock,
                    },
                });
                await tx.stockTransaction.create({
                    data: {
                        productId,
                        variantId,
                        type: client_js_1.StockTransactionType.PURCHASE_RECEIPT,
                        quantity: itemDto.quantityReceived,
                        beforeStock,
                        afterStock,
                        reason: `Purchase order receipt (PO ref: ${id})`,
                        changedBy: dto.receivedBy,
                        reference: id,
                    },
                });
            }
            const refreshedItems = await tx.purchaseOrderItem.findMany({
                where: { purchaseOrderId: id },
            });
            const allReceived = refreshedItems.every((item) => item.receivedQuantity === item.quantity);
            const someReceived = refreshedItems.some((item) => item.receivedQuantity > 0);
            let newStatus = 'Sent';
            if (allReceived) {
                newStatus = 'Received';
            }
            else if (someReceived) {
                newStatus = 'Partially_Received';
            }
            await tx.purchaseOrder.update({
                where: { id },
                data: { status: newStatus },
            });
            return {
                receiptId: receipt.id,
                status: newStatus,
            };
        });
    }
    async updateStatus(id, status) {
        const po = await this.prisma.purchaseOrder.findUnique({
            where: { id },
        });
        if (!po) {
            throw new common_1.NotFoundException(`Purchase Order ${id} not found.`);
        }
        const current = po.status;
        const target = status;
        if (current === target) {
            return po;
        }
        if (current === 'Cancelled') {
            throw new common_1.BadRequestException('Cannot modify status of a cancelled purchase order.');
        }
        if (current === 'Received') {
            throw new common_1.BadRequestException('Cannot modify status of a fully received purchase order.');
        }
        if (current === 'Sent' && target === 'Draft') {
            throw new common_1.BadRequestException('Cannot transition status from Sent back to Draft.');
        }
        if (current === 'Partially_Received' && target === 'Draft') {
            throw new common_1.BadRequestException('Cannot transition status from Partially Received back to Draft.');
        }
        if (current === 'Partially_Received' && target === 'Sent') {
            throw new common_1.BadRequestException('Cannot transition status from Partially Received back to Sent.');
        }
        return this.prisma.purchaseOrder.update({
            where: { id },
            data: { status },
        });
    }
};
exports.PurchaseOrdersService = PurchaseOrdersService;
exports.PurchaseOrdersService = PurchaseOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchaseOrdersService);
//# sourceMappingURL=purchase-orders.service.js.map