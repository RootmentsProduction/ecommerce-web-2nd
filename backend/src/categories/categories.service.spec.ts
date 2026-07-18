import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      category: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      product: {
        count: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('findAll', () => {
    it('should return a list of categories mapped with product counts', async () => {
      const mockDbCategories = [
        {
          id: 'cat-1',
          name: 'Necklaces',
          slug: 'necklaces',
          sortOrder: 1,
          _count: { products: 5 },
        },
      ];
      prismaMock.category.findMany.mockResolvedValue(mockDbCategories);

      const result = await service.findAll(false);
      expect(result).toEqual([
        {
          id: 'cat-1',
          name: 'Necklaces',
          slug: 'necklaces',
          sortOrder: 1,
          _count: { products: 5 },
          productCount: 5,
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if category is not found', async () => {
      prismaMock.category.findFirst.mockResolvedValue(null);
      await expect(service.findOne('invalid-slug')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return category when found by slug or id', async () => {
      const mockCategory = {
        id: 'cat-1',
        name: 'Necklaces',
        slug: 'necklaces',
        _count: { products: 5 },
      };
      prismaMock.category.findFirst.mockResolvedValue(mockCategory);

      const result = await service.findOne('necklaces');
      expect(result.productCount).toBe(5);
    });
  });

  describe('create', () => {
    it('should throw BadRequestException if slug already exists', async () => {
      prismaMock.category.findUnique.mockResolvedValue({ id: '123' });
      await expect(
        service.create({ name: 'Necklaces', slug: 'necklaces' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create new category successfully', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);
      prismaMock.category.create.mockResolvedValue({
        id: 'new-id',
        name: 'Bracelets',
        slug: 'bracelets',
      });

      const result = await service.create({
        name: 'Bracelets',
        slug: 'bracelets',
      });
      expect(result.name).toBe('Bracelets');
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if category does not exist', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);
      await expect(service.remove('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if active (non-archived) products remain', async () => {
      prismaMock.category.findUnique.mockResolvedValue({ id: 'cat-1' });
      prismaMock.product.count.mockResolvedValue(2);

      await expect(service.remove('cat-1')).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.product.count).toHaveBeenCalledWith({
        where: {
          categoryId: 'cat-1',
          status: { not: 'ARCHIVED' },
        },
      });
    });

    it('should delete category successfully if only archived products remain', async () => {
      prismaMock.category.findUnique.mockResolvedValue({ id: 'cat-1' });
      prismaMock.product.count.mockResolvedValue(0);
      prismaMock.category.delete.mockResolvedValue({ id: 'cat-1' });

      const result = await service.remove('cat-1');
      expect(result).toEqual({ id: 'cat-1' });
      expect(prismaMock.category.delete).toHaveBeenCalledWith({
        where: { id: 'cat-1' },
      });
    });
  });
});
