import { PrismaService } from '../prisma/prisma.service';
import { StockTransactionType } from '../generated/prisma/client.js';
export interface AdjustStockDto {
    productId?: string;
    variantId?: string;
    type: string;
    quantity: number;
    reason: string;
}
export declare class InventoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private mapTransactionType;
    getInventoryLevels(): Promise<{
        id: string;
        productId: string;
        variantId: string | null;
        sku: string;
        productName: string;
        variantName: string | null;
        imageUrl: string;
        currentStock: number;
        reservedStock: number;
        incomingStock: number;
        minimumRequired: number;
        reorderPoint: number;
        updatedAt: Date;
    }[]>;
    adjustStock(dto: AdjustStockDto, adminEmail: string): Promise<{
        inventoryId: string;
        beforeStock: number;
        afterStock: number;
        transaction: {
            id: string;
            createdAt: Date;
            productId: string;
            variantId: string | null;
            type: StockTransactionType;
            quantity: number;
            beforeStock: number;
            afterStock: number;
            reason: string;
            reference: string | null;
            changedBy: string;
        };
    }>;
    getTransactionHistory(): Promise<{
        id: string;
        date: Date;
        type: StockTransactionType;
        quantity: number;
        beforeStock: number;
        afterStock: number;
        reason: string;
        reference: string | null;
        changedBy: string;
        productId: string;
        productName: string;
        variantName: string | null;
        sku: string;
    }[]>;
}
