import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { StockTransactionType } from '../generated/prisma/client.js';

describe('InventoryService', () => {
  let service: InventoryService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      inventory: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
      },
      stockTransaction: {
        create: jest.fn(),
      },
      $transaction: jest.fn().mockImplementation(async (callback) => {
        return callback(prismaMock);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
  });

  describe('adjustStock', () => {
    it('should throw BadRequestException if both productId and variantId are missing', async () => {
      await expect(
        service.adjustStock(
          { type: 'STOCK_ADDED', quantity: 5, reason: 'Correction' },
          'admin@zorucci.com',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if inventory level is not found', async () => {
      prismaMock.inventory.findFirst.mockResolvedValue(null);
      await expect(
        service.adjustStock(
          {
            productId: 'prod-123',
            type: 'STOCK_ADDED',
            quantity: 5,
            reason: 'Correction',
          },
          'admin@zorucci.com',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully adjust stock and create a transaction entry in ledger', async () => {
      const mockInventory = {
        id: 'inv-123',
        productId: 'prod-123',
        currentStock: 10,
      };
      prismaMock.inventory.findFirst.mockResolvedValue(mockInventory);
      prismaMock.inventory.update.mockResolvedValue({
        ...mockInventory,
        currentStock: 15,
      });

      const result = await service.adjustStock(
        {
          productId: 'prod-123',
          type: 'STOCK_ADDED',
          quantity: 5,
          reason: 'Correction',
        },
        'admin@zorucci.com',
      );

      expect(prismaMock.inventory.update).toHaveBeenCalledWith({
        where: { id: 'inv-123' },
        data: { currentStock: 15 },
      });
      expect(prismaMock.stockTransaction.create).toHaveBeenCalledWith({
        data: {
          productId: 'prod-123',
          variantId: undefined,
          type: StockTransactionType.STOCK_ADDED,
          quantity: 5,
          beforeStock: 10,
          afterStock: 15,
          reason: 'Correction',
          changedBy: 'admin@zorucci.com',
        },
      });
      expect(result.afterStock).toBe(15);
    });
  });
});
