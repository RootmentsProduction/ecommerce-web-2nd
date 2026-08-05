import { PrismaService } from '../prisma/prisma.service';
export interface CreateCategoryDto {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    isActive?: boolean;
    sortOrder?: number;
}
export interface UpdateCategoryDto {
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
    isActive?: boolean;
    sortOrder?: number;
}
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(isAdmin?: boolean): Promise<{
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
    findOne(idOrSlug: string): Promise<{
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
    create(dto: CreateCategoryDto): Promise<{
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
    update(id: string, dto: UpdateCategoryDto): Promise<{
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
    remove(id: string): Promise<{
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
}
