import { PrismaService } from '../prisma/prisma.service';
import { ProductStatus, ProductImageRole } from '../generated/prisma/client.js';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    private mapStatus;
    findAll(query: {
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        occasion?: string;
        gender?: string;
        inStock?: boolean;
        search?: string;
        sort?: string;
        page?: number;
        limit?: number;
        newArrival?: boolean;
        bestSeller?: boolean;
        featured?: boolean;
        isAdmin?: boolean;
        status?: string;
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
        } | null;
        images: {
            url: string;
            id: string;
            sortOrder: number;
            createdAt: Date;
            altText: string | null;
            isPrimary: boolean;
            imageRole: ProductImageRole;
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
        occasion: string;
        gender: string;
        categoryId: string | null;
    })[] | {
        products: ({
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
            } | null;
            images: {
                url: string;
                id: string;
                sortOrder: number;
                createdAt: Date;
                altText: string | null;
                isPrimary: boolean;
                imageRole: ProductImageRole;
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
            occasion: string;
            gender: string;
            categoryId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getFilterMetadata(): Promise<{
        categories: {
            id: string;
            name: string;
            slug: string;
            count: number;
        }[];
        price: {
            min: number;
            max: number;
        };
        occasions: {
            value: string;
            count: number;
        }[];
        genders: {
            value: string;
            count: number;
        }[];
        purities: {
            value: string;
            count: number;
        }[];
        brands: {
            value: string;
            count: number;
        }[];
        availability: {
            inStock: number;
            outOfStock: number;
        };
    }>;
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
        } | null;
        images: {
            url: string;
            id: string;
            sortOrder: number;
            createdAt: Date;
            altText: string | null;
            isPrimary: boolean;
            imageRole: ProductImageRole;
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
        occasion: string;
        gender: string;
        categoryId: string | null;
    }>;
    private validateImageRoles;
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
        occasion: string;
        gender: string;
        categoryId: string | null;
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
        occasion: string;
        gender: string;
        categoryId: string | null;
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
        occasion: string;
        gender: string;
        categoryId: string | null;
    }>;
    permanentDelete(id: string): Promise<{
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
        occasion: string;
        gender: string;
        categoryId: string | null;
    }>;
}
