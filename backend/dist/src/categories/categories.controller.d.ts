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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        isActive: boolean;
        sortOrder: number;
    }[]>;
    getAdminCategories(): Promise<{
        productCount: number;
        _count: {
            products: number;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        isActive: boolean;
        sortOrder: number;
    }[]>;
    getCategoryDetails(idOrSlug: string): Promise<{
        productCount: number;
        _count: {
            products: number;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
    createCategory(dto: CreateCategoryBodyDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
    updateCategory(id: string, dto: UpdateCategoryBodyDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
    deleteCategory(id: string): Promise<void>;
}
