import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockTransactionType, Prisma } from '../generated/prisma/client.js';

export interface CreatePOItemDto {
  sku: string;
  name: string;
  size?: string;
  quantity: number;
  rate: number;
  taxRate: number;
  taxAmount: number;
  amount: number;
}

export interface CreatePurchaseOrderDto {
  vendorId: string;
  vendorName: string;
  vendorState: string;
  deliverToBranch: string;
  deliverToState: string;
  deliverToAddress: string;
  referenceNumber?: string;
  date: string;
  deliveryDate?: string;
  paymentTerms: string;
  shipmentPreference?: string;
  status: string; // 'Draft' | 'Sent' | 'Partially_Received' | 'Received' | 'Cancelled'
  items: CreatePOItemDto[];
  subtotal: number;
  discountType: string;
  discountValue: number;
  discountUnit: string;
  discountAfterTax: boolean;
  discountAmount: number;
  taxSplitType: string;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  taxTotal: number;
  tdsTcsType: string;
  tdsTcsRate: number;
  tdsTcsAmount: number;
  tdsTcsName?: string;
  adjustment: number;
  total: number;
  customerNotes?: string;
  termsAndConditions?: string;
  attachments?: string; // serialized JSON array
}

export interface ReceivePOItemsDto {
  receivedBy: string;
  notes?: string;
  items: { sku: string; quantityReceived: number }[];
}

@Injectable()
export class PurchaseOrdersService {
  constructor(private readonly prisma: PrismaService) {}

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

  async findOne(id: string) {
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
      throw new NotFoundException(`Purchase Order ${id} not found.`);
    }

    return po;
  }

  async create(dto: CreatePurchaseOrderDto) {
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

  async update(id: string, dto: CreatePurchaseOrderDto) {
    const po = await this.prisma.purchaseOrder.findUnique({
      where: { id },
    });

    if (!po) {
      throw new NotFoundException(`Purchase Order ${id} not found.`);
    }

    if (po.status === 'Received') {
      throw new BadRequestException(
        'Cannot modify a fully received purchase order.',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // Delete old items
      await tx.purchaseOrderItem.deleteMany({ where: { purchaseOrderId: id } });

      // Update PO and recreate items
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

  async receiveItems(id: string, dto: ReceivePOItemsDto) {
    const po = await this.prisma.purchaseOrder.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!po) {
      throw new NotFoundException(`Purchase Order ${id} not found.`);
    }

    if (po.status === 'Cancelled') {
      throw new BadRequestException(
        'Cannot receive items on a cancelled purchase order.',
      );
    }

    if (po.status === 'Received') {
      throw new BadRequestException(
        'Purchase Order is already fully received.',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Create the PurchaseReceipt record
      const receipt = await tx.purchaseReceipt.create({
        data: {
          purchaseOrderId: id,
          receivedBy: dto.receivedBy,
          notes: dto.notes,
        },
      });

      // 2. Process each item being received
      for (const itemDto of dto.items) {
        if (itemDto.quantityReceived <= 0) {
          throw new BadRequestException(
            `Quantity received for SKU ${itemDto.sku} must be greater than zero.`,
          );
        }

        const poItem = po.items.find((item) => item.sku === itemDto.sku);
        if (!poItem) {
          throw new BadRequestException(
            `SKU ${itemDto.sku} is not part of this purchase order.`,
          );
        }

        const remaining = poItem.quantity - poItem.receivedQuantity;
        if (itemDto.quantityReceived > remaining) {
          throw new BadRequestException(
            `Cannot receive ${itemDto.quantityReceived} units for SKU ${itemDto.sku}. Only ${remaining} units remaining.`,
          );
        }

        // Update the receivedQuantity in PO Item
        await tx.purchaseOrderItem.update({
          where: { id: poItem.id },
          data: {
            receivedQuantity:
              poItem.receivedQuantity + itemDto.quantityReceived,
          },
        });

        // Insert Receipt Item details
        await tx.purchaseReceiptItem.create({
          data: {
            receiptId: receipt.id,
            sku: itemDto.sku,
            quantityReceived: itemDto.quantityReceived,
          },
        });

        // Increment Inventory currentStock & incomingStock
        // Find if it's a product variant or base product
        const variant = await tx.productVariant.findUnique({
          where: { sku: itemDto.sku },
        });

        const inventoryTarget: Prisma.InventoryWhereInput = {};
        let productId: string;
        let variantId: string | null = null;

        if (variant) {
          inventoryTarget.variantId = variant.id;
          productId = variant.productId;
          variantId = variant.id;
        } else {
          const product = await tx.product.findUnique({
            where: { sku: itemDto.sku },
          });
          if (!product) {
            throw new BadRequestException(
              `SKU ${itemDto.sku} does not match any product or variant.`,
            );
          }
          inventoryTarget.productId = product.id;
          productId = product.id;
        }

        const inventory = await tx.inventory.findFirst({
          where: inventoryTarget,
        });

        if (!inventory) {
          throw new NotFoundException(
            `Inventory record not found for SKU ${itemDto.sku}`,
          );
        }

        const beforeStock = inventory.currentStock;
        const afterStock = beforeStock + itemDto.quantityReceived;

        await tx.inventory.update({
          where: { id: inventory.id },
          data: {
            currentStock: afterStock,
          },
        });

        // Create StockTransaction log
        await tx.stockTransaction.create({
          data: {
            productId,
            variantId,
            type: StockTransactionType.PURCHASE_RECEIPT,
            quantity: itemDto.quantityReceived,
            beforeStock,
            afterStock,
            reason: `Purchase order receipt (PO ref: ${id})`,
            changedBy: dto.receivedBy,
            reference: id,
          },
        });
      }

      // 3. Re-evaluate PO Status
      const refreshedItems = await tx.purchaseOrderItem.findMany({
        where: { purchaseOrderId: id },
      });

      const allReceived = refreshedItems.every(
        (item) => item.receivedQuantity === item.quantity,
      );
      const someReceived = refreshedItems.some(
        (item) => item.receivedQuantity > 0,
      );

      let newStatus = 'Sent';
      if (allReceived) {
        newStatus = 'Received';
      } else if (someReceived) {
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

  async updateStatus(id: string, status: string) {
    const po = await this.prisma.purchaseOrder.findUnique({
      where: { id },
    });

    if (!po) {
      throw new NotFoundException(`Purchase Order ${id} not found.`);
    }

    const current = po.status;
    const target = status;

    if (current === target) {
      return po;
    }

    // Cancelled and Received statuses are final states
    if (current === 'Cancelled') {
      throw new BadRequestException('Cannot modify status of a cancelled purchase order.');
    }
    if (current === 'Received') {
      throw new BadRequestException('Cannot modify status of a fully received purchase order.');
    }

    // Specific invalid transitions
    if (current === 'Sent' && target === 'Draft') {
      throw new BadRequestException('Cannot transition status from Sent back to Draft.');
    }
    if (current === 'Partially_Received' && target === 'Draft') {
      throw new BadRequestException('Cannot transition status from Partially Received back to Draft.');
    }
    if (current === 'Partially_Received' && target === 'Sent') {
      throw new BadRequestException('Cannot transition status from Partially Received back to Sent.');
    }

    return this.prisma.purchaseOrder.update({
      where: { id },
      data: { status },
    });
  }
}
