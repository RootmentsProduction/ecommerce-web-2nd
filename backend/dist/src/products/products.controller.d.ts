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
            imageRole: import("../generated/prisma/enums").ProductImageRole;
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
                imageRole: import("../generated/prisma/enums").ProductImageRole;
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
            occasion: string;
            gender: string;
            categoryId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getAdminProducts(category?: string, search?: string, status?: string): Promise<({
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
            imageRole: import("../generated/prisma/enums").ProductImageRole;
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
                imageRole: import("../generated/prisma/enums").ProductImageRole;
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
        } | null;
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
        occasion: string;
        gender: string;
        categoryId: string | null;
    }>;
    createProduct(dto: CreateProductDto, admin: any): Promise<{
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
        categoryId: string | null;
    }>;
    updateProduct(id: string, dto: UpdateProductDto): Promise<{
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
        categoryId: string | null;
    }>;
    archiveProduct(id: string): Promise<void>;
    permanentDeleteProduct(id: string): Promise<void>;
}
