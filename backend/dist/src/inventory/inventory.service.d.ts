import { PrismaService } from '../prisma/prisma.service';
import { StockTransactionType } from '../generated/prisma/client.js';
import { EmailService } from '../email/email.service';
export interface AdjustStockDto {
    productId?: string;
    variantId?: string;
    type: string;
    quantity: number;
    reason: string;
}
export declare class InventoryService {
    private readonly prisma;
    private readonly emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
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
            type: StockTransactionType;
            productId: string;
            variantId: string | null;
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
