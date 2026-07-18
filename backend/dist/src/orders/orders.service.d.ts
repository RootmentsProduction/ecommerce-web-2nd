import { PrismaService } from '../prisma/prisma.service';
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
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(customerId: string, dto: CreateOrderDto): Promise<{
        items: {
            id: string;
            name: string;
            sku: string;
            productId: string;
            variantId: string | null;
            quantity: number;
            variantName: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        total: import("@prisma/client-runtime-utils").Decimal;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findMyOrders(customerId: string): Promise<({
        items: {
            id: string;
            name: string;
            sku: string;
            productId: string;
            variantId: string | null;
            quantity: number;
            variantName: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        total: import("@prisma/client-runtime-utils").Decimal;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    findOne(id: string, user: {
        id: string;
        role: string;
    }): Promise<{
        items: ({
            product: {
                images: {
                    url: string;
                    id: string;
                    sortOrder: number;
                    createdAt: Date;
                    altText: string | null;
                    isPrimary: boolean;
                    imageRole: import("../generated/prisma/enums").ProductImageRole;
                    productId: string;
                }[];
            } & {
                id: string;
                name: string;
                slug: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                sku: string;
                shortDescription: string | null;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                mrp: import("@prisma/client-runtime-utils").Decimal | null;
                costPrice: import("@prisma/client-runtime-utils").Decimal | null;
                status: import("../generated/prisma/enums").ProductStatus;
                featured: boolean;
                newArrival: boolean;
                bestSeller: boolean;
                showOnHomepage: boolean;
                occasion: string;
                gender: string;
                categoryId: string;
            };
        } & {
            id: string;
            name: string;
            sku: string;
            productId: string;
            variantId: string | null;
            quantity: number;
            variantName: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            orderId: string;
        })[];
        customer: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums").UserStatus;
            email: string;
            passwordHash: string;
            firstName: string | null;
            lastName: string | null;
            role: import("../generated/prisma/enums").UserRole;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        total: import("@prisma/client-runtime-utils").Decimal;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findAll(): Promise<({
        items: {
            id: string;
            name: string;
            sku: string;
            productId: string;
            variantId: string | null;
            quantity: number;
            variantName: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            orderId: string;
        }[];
        customer: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums").UserStatus;
            email: string;
            passwordHash: string;
            firstName: string | null;
            lastName: string | null;
            role: import("../generated/prisma/enums").UserRole;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        total: import("@prisma/client-runtime-utils").Decimal;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    updateStatus(id: string, status: string, adminEmail: string): Promise<{
        items: {
            id: string;
            name: string;
            sku: string;
            productId: string;
            variantId: string | null;
            quantity: number;
            variantName: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        total: import("@prisma/client-runtime-utils").Decimal;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
    }>;
}
