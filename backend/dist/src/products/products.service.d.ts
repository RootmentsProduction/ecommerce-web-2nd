import { PrismaService } from '../prisma/prisma.service';
import { ProductStatus } from '../generated/prisma/client.js';
export interface CreateProductDto {
    name: string;
    sku: string;
    slug: string;
    shortDescription?: string;
    description?: string;
    sellingPrice: number;
    mrp: number;
    costPrice?: number;
    categoryId: string;
    status: string;
    featured?: boolean;
    newArrival?: boolean;
    bestSeller?: boolean;
    showOnHomepage?: boolean;
    trackInventory?: boolean;
    initialStock?: number;
    minStock?: number;
    images: {
        url: string;
        altText?: string;
        isPrimary: boolean;
        sortOrder: number;
    }[];
    variants: {
        name: string;
        sku: string;
        sellingPrice?: number;
        isActive: boolean;
        initialStock?: number;
    }[];
}
export interface UpdateProductDto {
    name?: string;
    sku?: string;
    slug?: string;
    shortDescription?: string;
    description?: string;
    sellingPrice?: number;
    mrp?: number;
    costPrice?: number;
    categoryId?: string;
    status?: string;
    featured?: boolean;
    newArrival?: boolean;
    bestSeller?: boolean;
    showOnHomepage?: boolean;
    images?: {
        url: string;
        altText?: string;
        isPrimary: boolean;
        sortOrder: number;
    }[];
    variants?: {
        id?: string;
        name: string;
        sku: string;
        sellingPrice?: number;
        isActive: boolean;
    }[];
}
export declare class ProductsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    private mapStatus;
    findAll(query: {
        category?: string;
        featured?: boolean;
        bestSeller?: boolean;
        newArrival?: boolean;
        search?: string;
        isAdmin?: boolean;
    }): Promise<({
        category: {
            id: string;
            name: string;
            slug: string;
            description: string | null;
            image: string | null;
            isActive: boolean;
            sortOrder: number;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            url: string;
            id: string;
            sortOrder: number;
            createdAt: Date;
            altText: string | null;
            isPrimary: boolean;
            productId: string;
        }[];
        variants: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal | null;
            productId: string;
        }[];
        inventory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string | null;
            currentStock: number;
            reservedStock: number;
            incomingStock: number;
            minimumRequired: number;
            reorderPoint: number;
            variantId: string | null;
        } | null;
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
        status: ProductStatus;
        featured: boolean;
        newArrival: boolean;
        bestSeller: boolean;
        showOnHomepage: boolean;
        categoryId: string;
    })[]>;
    findOne(idOrSlug: string): Promise<{
        category: {
            id: string;
            name: string;
            slug: string;
            description: string | null;
            image: string | null;
            isActive: boolean;
            sortOrder: number;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            url: string;
            id: string;
            sortOrder: number;
            createdAt: Date;
            altText: string | null;
            isPrimary: boolean;
            productId: string;
        }[];
        variants: ({
            inventory: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string | null;
                currentStock: number;
                reservedStock: number;
                incomingStock: number;
                minimumRequired: number;
                reorderPoint: number;
                variantId: string | null;
            } | null;
        } & {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal | null;
            productId: string;
        })[];
        inventory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string | null;
            currentStock: number;
            reservedStock: number;
            incomingStock: number;
            minimumRequired: number;
            reorderPoint: number;
            variantId: string | null;
        } | null;
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
        status: ProductStatus;
        featured: boolean;
        newArrival: boolean;
        bestSeller: boolean;
        showOnHomepage: boolean;
        categoryId: string;
    }>;
    create(dto: CreateProductDto, adminEmail: string): Promise<{
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
        status: ProductStatus;
        featured: boolean;
        newArrival: boolean;
        bestSeller: boolean;
        showOnHomepage: boolean;
        categoryId: string;
    }>;
    update(id: string, dto: UpdateProductDto): Promise<{
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
        status: ProductStatus;
        featured: boolean;
        newArrival: boolean;
        bestSeller: boolean;
        showOnHomepage: boolean;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
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
        status: ProductStatus;
        featured: boolean;
        newArrival: boolean;
        bestSeller: boolean;
        showOnHomepage: boolean;
        categoryId: string;
    }>;
}
