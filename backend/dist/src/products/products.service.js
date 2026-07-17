"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProductsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_js_1 = require("../generated/prisma/client.js");
let ProductsService = ProductsService_1 = class ProductsService {
    prisma;
    logger = new common_1.Logger(ProductsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapStatus(status) {
        const s = status.toUpperCase();
        if (s === 'ACTIVE')
            return client_js_1.ProductStatus.ACTIVE;
        if (s === 'ARCHIVED')
            return client_js_1.ProductStatus.ARCHIVED;
        return client_js_1.ProductStatus.DRAFT;
    }
    async findAll(query) {
        const where = {};
        if (!query.isAdmin) {
            where.status = client_js_1.ProductStatus.ACTIVE;
        }
        else {
            where.status = { not: client_js_1.ProductStatus.ARCHIVED };
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
    async findOne(idOrSlug) {
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
            throw new common_1.NotFoundException(`Product ${idOrSlug} not found.`);
        }
        return product;
    }
    async create(dto, adminEmail) {
        const slug = dto.slug.toLowerCase().trim();
        const existingSlug = await this.prisma.product.findUnique({
            where: { slug },
        });
        if (existingSlug) {
            throw new common_1.BadRequestException('A product with this slug already exists.');
        }
        const existingSku = await this.prisma.product.findUnique({
            where: { sku: dto.sku },
        });
        if (existingSku) {
            throw new common_1.BadRequestException('A product with this SKU already exists.');
        }
        const status = this.mapStatus(dto.status);
        return this.prisma.$transaction(async (tx) => {
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
                    const varInitialStock = variantDto.initialStock ?? initialStock;
                    await tx.inventory.create({
                        data: {
                            variantId: variant.id,
                            currentStock: varInitialStock,
                            minimumRequired: minStock,
                            reorderPoint: minStock * 2,
                        },
                    });
                    if (varInitialStock > 0) {
                        await tx.stockTransaction.create({
                            data: {
                                productId: product.id,
                                variantId: variant.id,
                                type: client_js_1.StockTransactionType.OPENING_STOCK,
                                quantity: varInitialStock,
                                beforeStock: 0,
                                afterStock: varInitialStock,
                                reason: 'Initial opening stock creation',
                                changedBy: adminEmail,
                            },
                        });
                    }
                }
            }
            else {
                await tx.inventory.create({
                    data: {
                        productId: product.id,
                        currentStock: initialStock,
                        minimumRequired: minStock,
                        reorderPoint: minStock * 2,
                    },
                });
                if (initialStock > 0) {
                    await tx.stockTransaction.create({
                        data: {
                            productId: product.id,
                            type: client_js_1.StockTransactionType.OPENING_STOCK,
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
    async update(id, dto) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { images: true, variants: true },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found.`);
        }
        if (dto.slug) {
            const slug = dto.slug.toLowerCase().trim();
            if (slug !== product.slug) {
                const existing = await this.prisma.product.findUnique({
                    where: { slug },
                });
                if (existing) {
                    throw new common_1.BadRequestException('A product with this slug already exists.');
                }
                dto.slug = slug;
            }
        }
        const status = dto.status ? this.mapStatus(dto.status) : undefined;
        return this.prisma.$transaction(async (tx) => {
            if (dto.images) {
                await tx.productImage.deleteMany({ where: { productId: id } });
                await tx.productImage.createMany({
                    data: dto.images.map((img) => ({
                        ...img,
                        productId: id,
                    })),
                });
            }
            if (dto.variants) {
                const variantIdsToKeep = [];
                for (const varDto of dto.variants) {
                    if (varDto.id) {
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
                    }
                    else {
                        const newVar = await tx.productVariant.create({
                            data: {
                                productId: id,
                                name: varDto.name,
                                sku: varDto.sku,
                                sellingPrice: varDto.sellingPrice,
                                isActive: varDto.isActive,
                            },
                        });
                        await tx.inventory.create({
                            data: {
                                variantId: newVar.id,
                                currentStock: 0,
                            },
                        });
                        variantIdsToKeep.push(newVar.id);
                    }
                }
                const variantsToRemove = product.variants.filter((v) => !variantIdsToKeep.includes(v.id));
                if (variantsToRemove.length > 0) {
                    await tx.productVariant.deleteMany({
                        where: {
                            id: { in: variantsToRemove.map((v) => v.id) },
                        },
                    });
                }
            }
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
    async remove(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found.`);
        }
        return this.prisma.product.update({
            where: { id },
            data: { status: client_js_1.ProductStatus.ARCHIVED },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = ProductsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map