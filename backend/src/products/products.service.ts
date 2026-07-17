import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ProductStatus,
  StockTransactionType,
  Prisma,
} from '../generated/prisma/client.js';

export interface CreateProductDto {
  name: string;
  sku: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  sellingPrice: number;
  mrp: number;
  costPrice?: number;
  categoryId: string;
  status: string; // 'Draft' | 'Active' | 'Archived' (will map to ProductStatus)
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  showOnHomepage?: boolean;
  trackInventory?: boolean;
  initialStock?: number;
  minStock?: number;
  images: {
    url: string;
    altText?: string;
    isPrimary: boolean;
    sortOrder: number;
  }[];
  variants: {
    name: string;
    sku: string;
    sellingPrice?: number;
    isActive: boolean;
    initialStock?: number;
  }[];
}

export interface UpdateProductDto {
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
  images?: {
    url: string;
    altText?: string;
    isPrimary: boolean;
    sortOrder: number;
  }[];
  variants?: {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: number;
    isActive: boolean;
  }[];
}

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly prisma: PrismaService) {}

  private mapStatus(status: string): ProductStatus {
    const s = status.toUpperCase();
    if (s === 'ACTIVE') return ProductStatus.ACTIVE;
    if (s === 'ARCHIVED') return ProductStatus.ARCHIVED;
    return ProductStatus.DRAFT;
  }

  async findAll(query: {
    category?: string;
    featured?: boolean;
    bestSeller?: boolean;
    newArrival?: boolean;
    search?: string;
    isAdmin?: boolean;
  }) {
    const where: Prisma.ProductWhereInput = {};

    if (!query.isAdmin) {
      where.status = ProductStatus.ACTIVE;
    } else {
      where.status = { not: ProductStatus.ARCHIVED }; // Don't show archived in admin unless requested
    }

    if (query.category) {
      where.category = {
        slug: query.category,
      };
    }

    if (query.featured !== undefined) {
      where.featured = query.featured;
    }

    if (query.bestSeller !== undefined) {
      where.bestSeller = query.bestSeller;
    }

    if (query.newArrival !== undefined) {
      where.newArrival = query.newArrival;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { sku: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.product.findMany({
      where,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
        variants: true,
        inventory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(idOrSlug: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
        variants: {
          include: {
            inventory: true,
          },
        },
        inventory: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product ${idOrSlug} not found.`);
    }

    return product;
  }

  async create(dto: CreateProductDto, adminEmail: string) {
    const slug = dto.slug.toLowerCase().trim();

    // Check slug and sku duplicates
    const existingSlug = await this.prisma.product.findUnique({
      where: { slug },
    });
    if (existingSlug) {
      throw new BadRequestException('A product with this slug already exists.');
    }

    const existingSku = await this.prisma.product.findUnique({
      where: { sku: dto.sku },
    });
    if (existingSku) {
      throw new BadRequestException('A product with this SKU already exists.');
    }

    const status = this.mapStatus(dto.status);

    return this.prisma.$transaction(async (tx) => {
      // 1. Create the base product
      const product = await tx.product.create({
        data: {
          name: dto.name,
          slug,
          sku: dto.sku,
          shortDescription: dto.shortDescription,
          description: dto.description,
          sellingPrice: dto.sellingPrice,
          mrp: dto.mrp,
          costPrice: dto.costPrice,
          status,
          featured: dto.featured ?? false,
          newArrival: dto.newArrival ?? true,
          bestSeller: dto.bestSeller ?? false,
          showOnHomepage: dto.showOnHomepage ?? false,
          categoryId: dto.categoryId,
          images: {
            create: dto.images,
          },
        },
      });

      const initialStock = dto.initialStock ?? 0;
      const minStock = dto.minStock ?? 0;

      // 2. Handle Variants & Inventories
      if (dto.variants && dto.variants.length > 0) {
        for (const variantDto of dto.variants) {
          const variant = await tx.productVariant.create({
            data: {
              productId: product.id,
              name: variantDto.name,
              sku: variantDto.sku,
              sellingPrice: variantDto.sellingPrice ?? dto.sellingPrice,
              isActive: variantDto.isActive ?? true,
            },
          });

          // Create inventory for variant
          const varInitialStock = variantDto.initialStock ?? initialStock;
          await tx.inventory.create({
            data: {
              variantId: variant.id,
              currentStock: varInitialStock,
              minimumRequired: minStock,
              reorderPoint: minStock * 2,
            },
          });

          // Log opening stock transaction if stock > 0
          if (varInitialStock > 0) {
            await tx.stockTransaction.create({
              data: {
                productId: product.id,
                variantId: variant.id,
                type: StockTransactionType.OPENING_STOCK,
                quantity: varInitialStock,
                beforeStock: 0,
                afterStock: varInitialStock,
                reason: 'Initial opening stock creation',
                changedBy: adminEmail,
              },
            });
          }
        }
      } else {
        // Base product inventory (no variants)
        await tx.inventory.create({
          data: {
            productId: product.id,
            currentStock: initialStock,
            minimumRequired: minStock,
            reorderPoint: minStock * 2,
          },
        });

        // Log opening stock transaction if stock > 0
        if (initialStock > 0) {
          await tx.stockTransaction.create({
            data: {
              productId: product.id,
              type: StockTransactionType.OPENING_STOCK,
              quantity: initialStock,
              beforeStock: 0,
              afterStock: initialStock,
              reason: 'Initial opening stock creation',
              changedBy: adminEmail,
            },
          });
        }
      }

      return product;
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true, variants: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    // Verify slug uniqueness if changing
    if (dto.slug) {
      const slug = dto.slug.toLowerCase().trim();
      if (slug !== product.slug) {
        const existing = await this.prisma.product.findUnique({
          where: { slug },
        });
        if (existing) {
          throw new BadRequestException(
            'A product with this slug already exists.',
          );
        }
        dto.slug = slug;
      }
    }

    const status = dto.status ? this.mapStatus(dto.status) : undefined;

    return this.prisma.$transaction(async (tx) => {
      // 1. Update images if provided (delete old ones first)
      if (dto.images) {
        await tx.productImage.deleteMany({ where: { productId: id } });
        await tx.productImage.createMany({
          data: dto.images.map((img) => ({
            ...img,
            productId: id,
          })),
        });
      }

      // 2. Update variants if provided
      if (dto.variants) {
        const variantIdsToKeep: string[] = [];

        for (const varDto of dto.variants) {
          if (varDto.id) {
            // Update existing variant
            const updatedVar = await tx.productVariant.update({
              where: { id: varDto.id },
              data: {
                name: varDto.name,
                sku: varDto.sku,
                sellingPrice: varDto.sellingPrice,
                isActive: varDto.isActive,
              },
            });
            variantIdsToKeep.push(updatedVar.id);
          } else {
            // Create new variant with 0 initial stock
            const newVar = await tx.productVariant.create({
              data: {
                productId: id,
                name: varDto.name,
                sku: varDto.sku,
                sellingPrice: varDto.sellingPrice,
                isActive: varDto.isActive,
              },
            });
            // Setup inventory
            await tx.inventory.create({
              data: {
                variantId: newVar.id,
                currentStock: 0,
              },
            });
            variantIdsToKeep.push(newVar.id);
          }
        }

        // Deactivate or delete variants not in the update payload
        const variantsToRemove = product.variants.filter(
          (v) => !variantIdsToKeep.includes(v.id),
        );
        if (variantsToRemove.length > 0) {
          await tx.productVariant.deleteMany({
            where: {
              id: { in: variantsToRemove.map((v) => v.id) },
            },
          });
        }
      }

      // 3. Update main product details
      return tx.product.update({
        where: { id },
        data: {
          name: dto.name,
          slug: dto.slug,
          sku: dto.sku,
          shortDescription: dto.shortDescription,
          description: dto.description,
          sellingPrice: dto.sellingPrice,
          mrp: dto.mrp,
          costPrice: dto.costPrice,
          categoryId: dto.categoryId,
          status,
          featured: dto.featured,
          newArrival: dto.newArrival,
          bestSeller: dto.bestSeller,
          showOnHomepage: dto.showOnHomepage,
        },
      });
    });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    // Set to ARCHIVED instead of deleting to preserve order history
    return this.prisma.product.update({
      where: { id },
      data: { status: ProductStatus.ARCHIVED },
    });
  }
}
