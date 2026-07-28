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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        isActive: boolean;
        sortOrder: number;
    }[]>;
    findOne(idOrSlug: string): Promise<{
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
    create(dto: CreateCategoryDto): Promise<{
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
    update(id: string, dto: UpdateCategoryDto): Promise<{
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
    remove(id: string): Promise<{
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
}
