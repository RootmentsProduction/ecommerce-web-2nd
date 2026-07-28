import { PrismaService } from '../prisma/prisma.service';
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
export declare class OrdersService {
    private readonly prisma;
    private readonly emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
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
        status: string;
        createdAt: Date;
        updatedAt: Date;
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
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
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
        status: string;
        createdAt: Date;
        updatedAt: Date;
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
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
    })[]>;
    findOne(idOrNumber: string, user: {
        id: string;
        role: string;
    }): Promise<{
        items: ({
            product: {
                images: {
                    url: string;
                    id: string;
                    createdAt: Date;
                    sortOrder: number;
                    altText: string | null;
                    isPrimary: boolean;
                    imageRole: import("../generated/prisma/enums").ProductImageRole;
                    productId: string;
                }[];
            } & {
                id: string;
                status: import("../generated/prisma/enums").ProductStatus;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
                description: string | null;
                categoryId: string | null;
                sku: string;
                shortDescription: string | null;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                mrp: import("@prisma/client-runtime-utils").Decimal | null;
                costPrice: import("@prisma/client-runtime-utils").Decimal | null;
                featured: boolean;
                newArrival: boolean;
                bestSeller: boolean;
                showOnHomepage: boolean;
                occasion: string;
                gender: string;
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
            email: string;
            passwordHash: string;
            firstName: string | null;
            lastName: string | null;
            role: import("../generated/prisma/enums").UserRole;
            status: import("../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
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
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
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
            email: string;
            passwordHash: string;
            firstName: string | null;
            lastName: string | null;
            role: import("../generated/prisma/enums").UserRole;
            status: import("../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
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
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
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
        status: string;
        createdAt: Date;
        updatedAt: Date;
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
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
    }>;
    markOrderAsPaid(orderId: string, paymentDetails: {
        paymentMethod: string;
        paymentProvider: string;
        phonepeTransactionId: string;
        merchantTransactionId: string;
        paymentReference?: string;
        paymentResponse: string;
        paymentCompletedAt: Date;
    }): Promise<{
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
        status: string;
        createdAt: Date;
        updatedAt: Date;
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
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
    }>;
    markOrderAsFailed(orderId: string, paymentResponse: string): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
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
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
    }>;
}
