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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(isAdmin = false) {
        const where = {};
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
    async findOne(idOrSlug) {
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
            throw new common_1.NotFoundException(`Category ${idOrSlug} not found.`);
        }
        return {
            ...category,
            productCount: category._count.products,
        };
    }
    async create(dto) {
        const slug = dto.slug.toLowerCase().trim();
        const existing = await this.prisma.category.findUnique({ where: { slug } });
        if (existing) {
            throw new common_1.BadRequestException('A category with this slug already exists.');
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
    async update(id, dto) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found.`);
        }
        if (dto.slug) {
            const slug = dto.slug.toLowerCase().trim();
            if (slug !== category.slug) {
                const existing = await this.prisma.category.findUnique({
                    where: { slug },
                });
                if (existing) {
                    throw new common_1.BadRequestException('A category with this slug already exists.');
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
    async remove(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found.`);
        }
        const activeProductsCount = await this.prisma.product.count({
            where: {
                categoryId: id,
                status: { not: 'ARCHIVED' },
            },
        });
        if (activeProductsCount > 0) {
            throw new common_1.BadRequestException(`Cannot delete category. There are ${activeProductsCount} active products assigned to this category.`);
        }
        return this.prisma.category.delete({ where: { id } });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map