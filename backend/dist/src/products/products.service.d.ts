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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            description: string | null;
            image: string | null;
            isActive: boolean;
            sortOrder: number;
        } | null;
        inventory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            currentStock: number;
            reservedStock: number;
            incomingStock: number;
            minimumRequired: number;
            reorderPoint: number;
            productId: string | null;
            variantId: string | null;
        } | null;
        images: {
            url: string;
            id: string;
            createdAt: Date;
            sortOrder: number;
            altText: string | null;
            isPrimary: boolean;
            imageRole: ProductImageRole;
            productId: string;
        }[];
        variants: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            sku: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal | null;
            productId: string;
        }[];
    } & {
        id: string;
        status: ProductStatus;
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
    })[] | {
        products: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
                description: string | null;
                image: string | null;
                isActive: boolean;
                sortOrder: number;
            } | null;
            inventory: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                currentStock: number;
                reservedStock: number;
                incomingStock: number;
                minimumRequired: number;
                reorderPoint: number;
                productId: string | null;
                variantId: string | null;
            } | null;
            images: {
                url: string;
                id: string;
                createdAt: Date;
                sortOrder: number;
                altText: string | null;
                isPrimary: boolean;
                imageRole: ProductImageRole;
                productId: string;
            }[];
            variants: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                isActive: boolean;
                sku: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal | null;
                productId: string;
            }[];
        } & {
            id: string;
            status: ProductStatus;
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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            description: string | null;
            image: string | null;
            isActive: boolean;
            sortOrder: number;
        } | null;
        inventory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            currentStock: number;
            reservedStock: number;
            incomingStock: number;
            minimumRequired: number;
            reorderPoint: number;
            productId: string | null;
            variantId: string | null;
        } | null;
        images: {
            url: string;
            id: string;
            createdAt: Date;
            sortOrder: number;
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
                currentStock: number;
                reservedStock: number;
                incomingStock: number;
                minimumRequired: number;
                reorderPoint: number;
                productId: string | null;
                variantId: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            sku: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal | null;
            productId: string;
        })[];
    } & {
        id: string;
        status: ProductStatus;
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
    }>;
    private validateImageRoles;
    create(dto: CreateProductDto, adminEmail: string): Promise<{
        id: string;
        status: ProductStatus;
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
    }>;
    update(id: string, dto: UpdateProductDto): Promise<{
        id: string;
        status: ProductStatus;
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
    }>;
    remove(id: string): Promise<{
        id: string;
        status: ProductStatus;
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
    }>;
    permanentDelete(id: string): Promise<{
        id: string;
        status: ProductStatus;
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
    }>;
}
