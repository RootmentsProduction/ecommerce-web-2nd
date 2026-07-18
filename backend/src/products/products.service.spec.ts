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
        count: jest.fn(),
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

  describe('create — storefront flags', () => {
    it('should pass newArrival=true to Prisma create when provided', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);
      prismaMock.product.create.mockResolvedValue({
        id: 'prod-new',
        sku: 'SKU-NEW',
        name: 'New Ring',
        status: ProductStatus.ACTIVE,
      });

      await service.create(
        {
          name: 'New Ring',
          sku: 'SKU-NEW',
          slug: 'new-ring',
          sellingPrice: 1000,
          mrp: 1200,
          categoryId: 'cat-1',
          status: 'Active',
          newArrival: true,
          bestSeller: false,
          images: [],
          variants: [],
        },
        'admin@test.com',
      );

      const createCall = prismaMock.product.create.mock.calls[0][0];
      expect(createCall.data.newArrival).toBe(true);
      expect(createCall.data.bestSeller).toBe(false);
    });

    it('should include imageRole when creating product with images', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);
      prismaMock.product.create.mockResolvedValue({
        id: 'prod-img',
        sku: 'SKU-IMG',
        name: 'Image Test',
        status: ProductStatus.ACTIVE,
      });

      await service.create(
        {
          name: 'Image Test',
          sku: 'SKU-IMG',
          slug: 'image-test',
          sellingPrice: 500,
          mrp: 600,
          categoryId: 'cat-1',
          status: 'Active',
          images: [
            {
              url: 'https://cdn.test/primary.jpg',
              isPrimary: true,
              imageRole: 'PRIMARY',
              sortOrder: 1,
            },
            {
              url: 'https://cdn.test/hover.jpg',
              isPrimary: false,
              imageRole: 'HOVER',
              sortOrder: 2,
            },
          ],
          variants: [],
        },
        'admin@test.com',
      );

      const createCall = prismaMock.product.create.mock.calls[0][0];
      const imageData = createCall.data.images.create;
      expect(imageData[0].imageRole).toBe('PRIMARY');
      expect(imageData[1].imageRole).toBe('HOVER');
    });

    it('should default newArrival and bestSeller to false when omitted', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);
      prismaMock.product.create.mockResolvedValue({
        id: 'prod-def',
        sku: 'SKU-DEF',
        name: 'Default Test',
        status: ProductStatus.ACTIVE,
      });

      prismaMock.product.create.mockClear();

      await service.create(
        {
          name: 'Default Test',
          sku: 'SKU-DEF',
          slug: 'default-test',
          sellingPrice: 1000,
          mrp: 1200,
          categoryId: 'cat-1',
          status: 'Active',
          images: [],
          variants: [],
        },
        'admin@test.com',
      );

      const createCall = prismaMock.product.create.mock.calls[0][0];
      expect(createCall.data.newArrival).toBe(false);
      expect(createCall.data.bestSeller).toBe(false);
    });

    it('should throw BadRequestException if multiple PRIMARY images are provided', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);
      await expect(
        service.create(
          {
            name: 'Multiple Primary',
            sku: 'SKU-MP',
            slug: 'multiple-primary',
            sellingPrice: 1000,
            mrp: 1200,
            categoryId: 'cat-1',
            status: 'Active',
            images: [
              {
                url: '1.jpg',
                isPrimary: true,
                imageRole: 'PRIMARY',
                sortOrder: 1,
              },
              {
                url: '2.jpg',
                isPrimary: true,
                imageRole: 'PRIMARY',
                sortOrder: 2,
              },
            ],
            variants: [],
          },
          'admin@test.com',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if multiple HOVER images are provided', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);
      await expect(
        service.create(
          {
            name: 'Multiple Hover',
            sku: 'SKU-MH',
            slug: 'multiple-hover',
            sellingPrice: 1000,
            mrp: 1200,
            categoryId: 'cat-1',
            status: 'Active',
            images: [
              {
                url: '1.jpg',
                isPrimary: false,
                imageRole: 'HOVER',
                sortOrder: 1,
              },
              {
                url: '2.jpg',
                isPrimary: false,
                imageRole: 'HOVER',
                sortOrder: 2,
              },
            ],
            variants: [],
          },
          'admin@test.com',
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll — newArrival / bestSeller filters', () => {
    it('should apply newArrival:true filter to the where clause', async () => {
      prismaMock.product.findMany.mockResolvedValue([]);
      await service.findAll({ newArrival: true, isAdmin: false });
      const whereClause = prismaMock.product.findMany.mock.calls[0][0].where;
      expect(whereClause.newArrival).toBe(true);
    });

    it('should apply bestSeller:true filter to the where clause', async () => {
      prismaMock.product.findMany.mockResolvedValue([]);
      await service.findAll({ bestSeller: true, isAdmin: false });
      const whereClause = prismaMock.product.findMany.mock.calls[0][0].where;
      expect(whereClause.bestSeller).toBe(true);
    });

    it('should restrict to ACTIVE status for public queries', async () => {
      prismaMock.product.findMany.mockResolvedValue([]);
      await service.findAll({ isAdmin: false });
      const whereClause = prismaMock.product.findMany.mock.calls[0][0].where;
      expect(whereClause.status).toBe(ProductStatus.ACTIVE);
    });
  });

  describe('findAll — advanced filters and pagination', () => {
    beforeEach(() => {
      prismaMock.product.findMany.mockReset();
      prismaMock.product.count = jest.fn().mockResolvedValue(0);
    });

    it('should apply price filters correctly', async () => {
      prismaMock.product.findMany.mockResolvedValue([]);
      await service.findAll({ minPrice: 1000, maxPrice: 5000, isAdmin: false });
      const whereClause = prismaMock.product.findMany.mock.calls[0][0].where;
      expect(whereClause.sellingPrice).toEqual({ gte: 1000, lte: 5000 });
    });

    it('should apply occasion and gender filters', async () => {
      prismaMock.product.findMany.mockResolvedValue([]);
      await service.findAll({
        occasion: 'Everyday',
        gender: 'Women',
        isAdmin: false,
      });
      const whereClause = prismaMock.product.findMany.mock.calls[0][0].where;
      expect(whereClause.occasion).toEqual({
        equals: 'Everyday',
        mode: 'insensitive',
      });
      expect(whereClause.gender).toEqual({
        equals: 'Women',
        mode: 'insensitive',
      });
    });

    it('should apply sorting mapping', async () => {
      prismaMock.product.findMany.mockResolvedValue([]);
      await service.findAll({ sort: 'price_asc', isAdmin: false });
      const orderByClause =
        prismaMock.product.findMany.mock.calls[0][0].orderBy;
      expect(orderByClause).toEqual({ sellingPrice: 'asc' });
    });

    it('should return paginated result for public query', async () => {
      prismaMock.product.findMany.mockResolvedValue([{ id: '1' }]);
      prismaMock.product.count.mockResolvedValue(10);
      const result = await service.findAll({
        page: 2,
        limit: 5,
        isAdmin: false,
      });
      expect(result).toEqual({
        products: [{ id: '1' }],
        total: 10,
        page: 2,
        limit: 5,
        totalPages: 2,
      });
      const findManyCall = prismaMock.product.findMany.mock.calls[0][0];
      expect(findManyCall.skip).toBe(5);
      expect(findManyCall.take).toBe(5);
    });
  });

  describe('getFilterMetadata', () => {
    it('should compile correct counts and pricing bounds', async () => {
      const activeProducts = [
        {
          id: 'p1',
          sellingPrice: 5000,
          occasion: 'Everyday',
          gender: 'Women',
          category: { id: 'c1', name: 'Rings', slug: 'rings' },
          variants: [],
          inventory: { currentStock: 10 },
        },
        {
          id: 'p2',
          sellingPrice: 15000,
          occasion: 'Bridal',
          gender: 'Men',
          category: { id: 'c1', name: 'Rings', slug: 'rings' },
          variants: [],
          inventory: { currentStock: 0 },
        },
      ];
      prismaMock.product.findMany.mockResolvedValue(activeProducts);

      const metadata = await service.getFilterMetadata();
      expect(metadata.categories).toEqual([
        { id: 'c1', name: 'Rings', slug: 'rings', count: 2 },
      ]);
      expect(metadata.price).toEqual({ min: 5000, max: 15000 });
      expect(metadata.occasions).toEqual([
        { value: 'Everyday', count: 1 },
        { value: 'Bridal', count: 1 },
      ]);
      expect(metadata.genders).toEqual([
        { value: 'Women', count: 1 },
        { value: 'Men', count: 1 },
      ]);
      expect(metadata.availability).toEqual({
        inStock: 1, // inventory is null (so trackInventory falls back to true but variantStock is also 0, wait! Let's check mainStock + variantStock calculation: mainStock is 0 since inventory is null, variants is empty, so totalStock is 0, inStock should be 0 unless variants or inventory is defined. Let's make sure mock data has stock)
        outOfStock: 1,
      });
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if product does not exist', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);
      await expect(service.remove('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should set status to ARCHIVED instead of deleting from db', async () => {
      prismaMock.product.findUnique.mockResolvedValue({
        id: 'p1',
        status: 'ACTIVE',
      });
      prismaMock.product.update.mockResolvedValue({
        id: 'p1',
        status: 'ARCHIVED',
      });

      const result = await service.remove('p1');
      expect(result.status).toBe('ARCHIVED');
      expect(prismaMock.product.update).toHaveBeenCalledWith({
        where: { id: 'p1' },
        data: { status: 'ARCHIVED' },
      });
      expect(prismaMock.product.delete).not.toHaveBeenCalled();
    });
  });
});
