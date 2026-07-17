import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma/client.js';

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

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(isAdmin: boolean = false) {
    const where: Prisma.CategoryWhereInput = {};
    if (!isAdmin) {
      where.isActive = true;
    }

    const categories = await this.prisma.category.findMany({
      where,
      orderBy: {
        sortOrder: 'asc',
      },
      include: {
        _count: {
          select: {
            products: {
              where: {
                status: 'ACTIVE',
              },
            },
          },
        },
      },
    });

    return categories.map((cat) => ({
      ...cat,
      productCount: cat._count.products,
    }));
  }

  async findOne(idOrSlug: string) {
    const category = await this.prisma.category.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        _count: {
          select: {
            products: {
              where: {
                status: 'ACTIVE',
              },
            },
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category ${idOrSlug} not found.`);
    }

    return {
      ...category,
      productCount: category._count.products,
    };
  }

  async create(dto: CreateCategoryDto) {
    const slug = dto.slug.toLowerCase().trim();

    // Check if slug exists
    const existing = await this.prisma.category.findUnique({ where: { slug } });
    if (existing) {
      throw new BadRequestException(
        'A category with this slug already exists.',
      );
    }

    return this.prisma.category.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        image: dto.image,
        isActive: dto.isActive ?? true,
        sortOrder: dto.sortOrder ?? 0,
      },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found.`);
    }

    if (dto.slug) {
      const slug = dto.slug.toLowerCase().trim();
      if (slug !== category.slug) {
        const existing = await this.prisma.category.findUnique({
          where: { slug },
        });
        if (existing) {
          throw new BadRequestException(
            'A category with this slug already exists.',
          );
        }
        dto.slug = slug;
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        image: dto.image,
        isActive: dto.isActive,
        sortOrder: dto.sortOrder,
      },
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found.`);
    }

    if (category._count.products > 0) {
      throw new BadRequestException(
        `Cannot delete category. There are ${category._count.products} products assigned to this category.`,
      );
    }

    return this.prisma.category.delete({ where: { id } });
  }
}
