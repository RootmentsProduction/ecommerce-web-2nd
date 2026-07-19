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
  ProductImageRole,
  Prisma,
} from '../generated/prisma/client.js';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
  }) {
    const where: Prisma.ProductWhereInput = {};

    if (!query.isAdmin) {
      // Public storefront: only active products
      where.status = ProductStatus.ACTIVE;
    } else if (query.status) {
      // Admin filtered by a specific status tab
      const statusMap: Record<string, ProductStatus> = {
        Active: ProductStatus.ACTIVE,
        Draft: ProductStatus.DRAFT,
        Archived: ProductStatus.ARCHIVED,
        ACTIVE: ProductStatus.ACTIVE,
        DRAFT: ProductStatus.DRAFT,
        ARCHIVED: ProductStatus.ARCHIVED,
      };
      const mapped = statusMap[query.status];
      if (mapped) {
        where.status = mapped;
      } else {
        // 'All Products' tab: exclude Archived
        where.status = { not: ProductStatus.ARCHIVED };
      }
    } else {
      // Admin default (All Products): exclude Archived
      where.status = { not: ProductStatus.ARCHIVED };
    }

    if (query.category) {
      where.category = {
        slug: query.category,
      };
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      const priceFilter: Prisma.DecimalFilter = {};
      if (query.minPrice !== undefined) {
        priceFilter.gte = query.minPrice;
      }
      if (query.maxPrice !== undefined) {
        priceFilter.lte = query.maxPrice;
      }
      where.sellingPrice = priceFilter;
    }

    if (query.occasion) {
      where.occasion = {
        equals: query.occasion,
        mode: 'insensitive',
      };
    }

    if (query.gender) {
      where.gender = {
        equals: query.gender,
        mode: 'insensitive',
      };
    }

    if (query.inStock !== undefined) {
      if (query.inStock) {
        where.OR = [
          {
            inventory: {
              currentStock: { gt: 0 },
            },
          },
          {
            variants: {
              some: {
                inventory: {
                  currentStock: { gt: 0 },
                },
              },
            },
          },
        ];
      } else {
        where.inventory = {
          currentStock: { lte: 0 },
        };
        where.variants = {
          every: {
            inventory: {
              currentStock: { lte: 0 },
            },
          },
        };
      }
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
      const searchConditions: Prisma.ProductWhereInput[] = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { sku: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
      if (where.OR) {
        where.AND = [{ OR: where.OR }, { OR: searchConditions }];
        delete where.OR;
      } else {
        where.OR = searchConditions;
      }
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (query.sort) {
      switch (query.sort) {
        case 'newest':
          orderBy = { createdAt: 'desc' };
          break;
        case 'price_asc':
          orderBy = { sellingPrice: 'asc' };
          break;
        case 'price_desc':
          orderBy = { sellingPrice: 'desc' };
          break;
        case 'rating_desc':
          orderBy = { showOnHomepage: 'desc' };
          break;
        case 'featured':
        default:
          orderBy = { showOnHomepage: 'desc' };
          break;
      }
    }

    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 12;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          images: {
            orderBy: { sortOrder: 'asc' },
          },
          category: true,
          variants: true,
          inventory: true,
        },
        orderBy,
        skip: query.isAdmin ? undefined : skip,
        take: query.isAdmin ? undefined : limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    if (query.isAdmin) {
      return products;
    }

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getFilterMetadata() {
    const activeProducts = await this.prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
      },
      include: {
        category: true,
        inventory: true,
        variants: {
          include: {
            inventory: true,
          },
        },
      },
    });

    const categoryMap = new Map<
      string,
      { id: string; name: string; slug: string; count: number }
    >();
    for (const p of activeProducts) {
      if (p.category) {
        const cat = p.category;
        const existing = categoryMap.get(cat.id);
        if (existing) {
          existing.count += 1;
        } else {
          categoryMap.set(cat.id, {
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            count: 1,
          });
        }
      }
    }
    const categories = Array.from(categoryMap.values());

    let minPrice = 0;
    let maxPrice = 0;
    if (activeProducts.length > 0) {
      const prices = activeProducts.map((p) => Number(p.sellingPrice));
      minPrice = Math.min(...prices);
      maxPrice = Math.max(...prices);
    }

    const occasionMap = new Map<string, number>();
    for (const p of activeProducts) {
      if (p.occasion) {
        const val = p.occasion.trim();
        if (val) {
          const normalized =
            val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
          occasionMap.set(normalized, (occasionMap.get(normalized) || 0) + 1);
        }
      }
    }
    const occasions = Array.from(occasionMap.entries()).map(
      ([value, count]) => ({
        value,
        count,
      }),
    );

    const genderMap = new Map<string, number>();
    for (const p of activeProducts) {
      if (p.gender) {
        const val = p.gender.trim();
        if (val) {
          const normalized =
            val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
          genderMap.set(normalized, (genderMap.get(normalized) || 0) + 1);
        }
      }
    }
    const genders = Array.from(genderMap.entries()).map(([value, count]) => ({
      value,
      count,
    }));

    const purities: { value: string; count: number }[] = [];
    const brands: { value: string; count: number }[] = [];

    let inStock = 0;
    let outOfStock = 0;
    for (const p of activeProducts) {
      const mainStock = p.inventory?.currentStock ?? 0;
      const variantStock =
        p.variants?.reduce(
          (sum, v) => sum + (v.inventory?.currentStock ?? 0),
          0,
        ) ?? 0;
      const totalStock = mainStock + variantStock;
      if (totalStock > 0) {
        inStock += 1;
      } else {
        outOfStock += 1;
      }
    }

    return {
      categories,
      price: {
        min: minPrice,
        max: maxPrice,
      },
      occasions,
      genders,
      purities,
      brands,
      availability: {
        inStock,
        outOfStock,
      },
    };
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

  private validateImageRoles(
    images?: { imageRole?: string; isPrimary?: boolean }[],
  ) {
    if (!images || images.length === 0) return;

    let primaryCount = 0;
    let hoverCount = 0;

    for (const img of images) {
      if (img.imageRole === 'PRIMARY' || img.isPrimary) {
        primaryCount++;
      }
      if (img.imageRole === 'HOVER') {
        hoverCount++;
      }
    }

    if (primaryCount > 1) {
      throw new BadRequestException(
        'A product can only have one PRIMARY image.',
      );
    }
    if (hoverCount > 1) {
      throw new BadRequestException('A product can only have one HOVER image.');
    }
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

    this.validateImageRoles(dto.images);

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
          newArrival: dto.newArrival ?? false,
          bestSeller: dto.bestSeller ?? false,
          showOnHomepage: dto.showOnHomepage ?? false,
          occasion: dto.occasion || 'Everyday',
          gender: dto.gender || 'Unisex',
          categoryId: dto.categoryId,
          images: {
            create: (dto.images || []).map((img) => ({
              url: img.url,
              altText: img.altText,
              isPrimary: img.imageRole === 'PRIMARY',
              imageRole: img.imageRole || ProductImageRole.GALLERY,
              sortOrder: img.sortOrder,
            })),
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

    this.validateImageRoles(dto.images);

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
      // 1. Update images if provided (safe merge)
      if (dto.images) {
        const incomingUrls = dto.images.map((img) => img.url);

        // Identify images to delete
        const imagesToDelete = product.images.filter(
          (ext) => !incomingUrls.includes(ext.url),
        );
        if (imagesToDelete.length > 0) {
          await tx.productImage.deleteMany({
            where: {
              id: { in: imagesToDelete.map((d) => d.id) },
            },
          });
        }

        // Create or update images
        for (const imgDto of dto.images) {
          const matchingExisting = product.images.find(
            (ext) => ext.url === imgDto.url,
          );
          const isPrimaryValue = imgDto.imageRole === 'PRIMARY';
          const imageRoleValue = imgDto.imageRole || ProductImageRole.GALLERY;

          if (matchingExisting) {
            await tx.productImage.update({
              where: { id: matchingExisting.id },
              data: {
                altText: imgDto.altText,
                isPrimary: isPrimaryValue,
                imageRole: imageRoleValue,
                sortOrder: imgDto.sortOrder,
              },
            });
          } else {
            await tx.productImage.create({
              data: {
                productId: id,
                url: imgDto.url,
                altText: imgDto.altText,
                isPrimary: isPrimaryValue,
                imageRole: imageRoleValue,
                sortOrder: imgDto.sortOrder,
              },
            });
          }
        }
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
          occasion: dto.occasion,
          gender: dto.gender,
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

  async permanentDelete(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        _count: { select: { orderItems: true } },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    if (product.status !== ProductStatus.ARCHIVED) {
      throw new BadRequestException(
        'Only archived products can be permanently deleted. Archive the product first.',
      );
    }

    if (product._count.orderItems > 0) {
      throw new BadRequestException(
        `Cannot permanently delete this product — it appears in ${product._count.orderItems} order(s). Historical order records must remain intact.`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // Delete all stock transactions associated with this product
      await tx.stockTransaction.deleteMany({
        where: { productId: id },
      });

      return tx.product.delete({ where: { id } });
    });
  }
}
