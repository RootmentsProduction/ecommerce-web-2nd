import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductStatus } from '../generated/prisma/client.js';

describe('ProductsService', () => {
  let service: ProductsService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      product: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      productImage: {
        createMany: jest.fn(),
      },
      productVariant: {
        createMany: jest.fn(),
      },
      inventory: {
        createMany: jest.fn(),
        create: jest.fn(),
      },
      stockTransaction: {
        createMany: jest.fn(),
        create: jest.fn(),
      },
      $transaction: jest.fn().mockImplementation(async (callback) => {
        return callback(prismaMock);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  describe('findOne', () => {
    it('should throw NotFoundException if product does not exist', async () => {
      prismaMock.product.findFirst.mockResolvedValue(null);
      await expect(service.findOne('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return product when found by id or slug or sku', async () => {
      const mockProduct = {
        id: 'prod-123',
        name: 'Diamond Ring',
        slug: 'diamond-ring',
        sku: 'DR-001',
      };
      prismaMock.product.findFirst.mockResolvedValue(mockProduct);

      const result = await service.findOne('diamond-ring');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('create', () => {
    it('should throw BadRequestException if sku already exists', async () => {
      prismaMock.product.findUnique.mockResolvedValue({ id: '123' });
      await expect(
        service.create({
          name: 'Diamond Ring',
          sku: 'DR-001',
          slug: 'diamond-ring',
          sellingPrice: 10000,
          mrp: 12000,
          categoryId: 'cat-123',
          status: 'Active',
          images: [],
          variants: [],
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should successfully create product, images, and initial stock inside transaction', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);
      prismaMock.product.create.mockResolvedValue({
        id: 'new-prod-id',
        sku: 'DR-001',
        name: 'Diamond Ring',
        status: ProductStatus.ACTIVE,
      });

      const result = await service.create({
        name: 'Diamond Ring',
        sku: 'DR-001',
        slug: 'diamond-ring',
        sellingPrice: 10000,
        mrp: 12000,
        categoryId: 'cat-123',
        status: 'Active',
        trackInventory: true,
        initialStock: 10,
        images: [{ url: 'http://s3/img.jpg', isPrimary: true, sortOrder: 1 }],
        variants: [],
      });

      expect(prismaMock.product.create).toHaveBeenCalled();
      expect(prismaMock.inventory.create).toHaveBeenCalled();
      expect(result.id).toBe('new-prod-id');
    });
  });
});
