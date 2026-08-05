import { PrismaService } from '../prisma/prisma.service';
export declare class CustomersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        status: import("../generated/prisma/enums").UserStatus;
        createdAt: Date;
        joinedDate: Date;
        orderCount: number;
        totalSpend: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        status: import("../generated/prisma/enums").UserStatus;
        createdAt: Date;
        joinedDate: Date;
        orderCount: number;
        totalSpend: number;
        orders: {
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
            paymentMethod: string | null;
            paymentProvider: string | null;
            phonepeTransactionId: string | null;
            merchantTransactionId: string | null;
            paymentReference: string | null;
            paymentCompletedAt: Date | null;
            paymentResponse: string | null;
        }[];
        addresses: {
            id: string;
            createdAt: Date;
            type: string;
            userId: string;
            street1: string;
            street2: string | null;
            city: string;
            state: string;
            zipCode: string;
            phone: string | null;
            country: string;
        }[];
    }>;
}
