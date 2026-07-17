import { ProductsService, CreateProductDto, UpdateProductDto } from './products.service';
declare class CreateProductImageDto {
    url: string;
    altText?: string;
    isPrimary: boolean;
    sortOrder: number;
}
declare class CreateProductVariantDto {
    name: string;
    sku: string;
    sellingPrice?: number;
    isActive: boolean;
    initialStock?: number;
}
declare class UpdateProductVariantDto {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: number;
    isActive: boolean;
}
export declare class CreateProductBodyDto implements CreateProductDto {
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
    images: CreateProductImageDto[];
    variants: CreateProductVariantDto[];
}
export declare class UpdateProductBodyDto implements UpdateProductDto {
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
    images?: CreateProductImageDto[];
    variants?: UpdateProductVariantDto[];
}
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getPublicProducts(category?: string, featured?: string, bestSeller?: string, newArrival?: string, search?: string): Promise<({
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
        status: import("../generated/prisma/enums").ProductStatus;
        featured: boolean;
        newArrival: boolean;
        bestSeller: boolean;
        showOnHomepage: boolean;
        categoryId: string;
    })[]>;
    getAdminProducts(category?: string, search?: string): Promise<({
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
        status: import("../generated/prisma/enums").ProductStatus;
        featured: boolean;
        newArrival: boolean;
        bestSeller: boolean;
        showOnHomepage: boolean;
        categoryId: string;
    })[]>;
    getProductDetails(idOrSlug: string): Promise<{
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
        status: import("../generated/prisma/enums").ProductStatus;
        featured: boolean;
        newArrival: boolean;
        bestSeller: boolean;
        showOnHomepage: boolean;
        categoryId: string;
    }>;
    createProduct(dto: CreateProductBodyDto, admin: any): Promise<{
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
    }>;
    updateProduct(id: string, dto: UpdateProductBodyDto): Promise<{
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
    }>;
    archiveProduct(id: string): Promise<void>;
}
export {};
