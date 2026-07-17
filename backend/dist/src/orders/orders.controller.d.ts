import { UserRole } from '../generated/prisma/client.js';
import { OrdersService, CreateOrderDto, CreateOrderItemDto } from './orders.service';
declare class CreateOrderItemBodyDto implements CreateOrderItemDto {
    productId: string;
    variantId?: string;
    name: string;
    sku: string;
    variantName?: string;
    quantity: number;
    price: number;
}
export declare class CreateOrderBodyDto implements CreateOrderDto {
    subtotal: number;
    taxTotal: number;
    shippingCharge?: number;
    discountAmount?: number;
    total: number;
    shippingAddress: any;
    billingAddress: any;
    notes?: string;
    items: CreateOrderItemBodyDto[];
}
export declare class UpdateOrderStatusBodyDto {
    status: string;
}
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(dto: CreateOrderBodyDto, user: any): Promise<{
        items: {
            id: string;
            name: string;
            sku: string;
            productId: string;
            variantId: string | null;
            quantity: number;
            orderId: string;
            variantName: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    getMyOrders(user: any): Promise<({
        items: {
            id: string;
            name: string;
            sku: string;
            productId: string;
            variantId: string | null;
            quantity: number;
            orderId: string;
            variantName: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
    })[]>;
    getAdminOrders(): Promise<({
        items: {
            id: string;
            name: string;
            sku: string;
            productId: string;
            variantId: string | null;
            quantity: number;
            orderId: string;
            variantName: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
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
            role: UserRole;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
    })[]>;
    getOrderDetails(id: string, user: any): Promise<{
        items: ({
            product: {
                images: {
                    url: string;
                    id: string;
                    sortOrder: number;
                    createdAt: Date;
                    altText: string | null;
                    isPrimary: boolean;
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
                categoryId: string;
            };
        } & {
            id: string;
            name: string;
            sku: string;
            productId: string;
            variantId: string | null;
            quantity: number;
            orderId: string;
            variantName: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
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
            role: UserRole;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    updateOrderStatus(id: string, dto: UpdateOrderStatusBodyDto, admin: any): Promise<{
        items: {
            id: string;
            name: string;
            sku: string;
            productId: string;
            variantId: string | null;
            quantity: number;
            orderId: string;
            variantName: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
}
export {};
