import { CategoriesService, CreateCategoryDto, UpdateCategoryDto } from './categories.service';
export declare class CreateCategoryBodyDto implements CreateCategoryDto {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    isActive?: boolean;
    sortOrder?: number;
}
export declare class UpdateCategoryBodyDto implements UpdateCategoryDto {
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
    isActive?: boolean;
    sortOrder?: number;
}
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getPublicCategories(): Promise<{
        productCount: number;
        _count: {
            products: number;
        };
        id: string;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        isActive: boolean;
        sortOrder: number;
        defaultLength: number | null;
        defaultWidth: number | null;
        defaultHeight: number | null;
        defaultWeight: number | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getAdminCategories(): Promise<{
        productCount: number;
        _count: {
            products: number;
        };
        id: string;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        isActive: boolean;
        sortOrder: number;
        defaultLength: number | null;
        defaultWidth: number | null;
        defaultHeight: number | null;
        defaultWeight: number | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getCategoryDetails(idOrSlug: string): Promise<{
        productCount: number;
        _count: {
            products: number;
        };
        id: string;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        isActive: boolean;
        sortOrder: number;
        defaultLength: number | null;
        defaultWidth: number | null;
        defaultHeight: number | null;
        defaultWeight: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createCategory(dto: CreateCategoryBodyDto): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        isActive: boolean;
        sortOrder: number;
        defaultLength: number | null;
        defaultWidth: number | null;
        defaultHeight: number | null;
        defaultWeight: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCategory(id: string, dto: UpdateCategoryBodyDto): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        isActive: boolean;
        sortOrder: number;
        defaultLength: number | null;
        defaultWidth: number | null;
        defaultHeight: number | null;
        defaultWeight: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteCategory(id: string): Promise<void>;
}
