import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getPublicProducts(query: GetProductsQueryDto): Promise<({
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
            imageRole: import("../generated/prisma/enums").ProductImageRole;
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
                imageRole: import("../generated/prisma/enums").ProductImageRole;
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
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getAdminProducts(category?: string, search?: string, status?: string): Promise<({
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
            imageRole: import("../generated/prisma/enums").ProductImageRole;
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
                imageRole: import("../generated/prisma/enums").ProductImageRole;
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
    getProductDetails(idOrSlug: string): Promise<{
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
            imageRole: import("../generated/prisma/enums").ProductImageRole;
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
    }>;
    createProduct(dto: CreateProductDto, admin: any): Promise<{
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
    }>;
    updateProduct(id: string, dto: UpdateProductDto): Promise<{
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
    }>;
    archiveProduct(id: string): Promise<void>;
    permanentDeleteProduct(id: string): Promise<void>;
}
