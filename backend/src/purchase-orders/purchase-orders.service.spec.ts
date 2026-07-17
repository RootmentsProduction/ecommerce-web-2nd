import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('PurchaseOrdersService', () => {
  let service: PurchaseOrdersService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      purchaseOrder: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      purchaseOrderItem: {
        createMany: jest.fn(),
        deleteMany: jest.fn(),
      },
      $transaction: jest.fn().mockImplementation(async (callback) => {
        return callback(prismaMock);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrdersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<PurchaseOrdersService>(PurchaseOrdersService);
  });

  describe('findOne', () => {
    it('should throw NotFoundException if purchase order is not found', async () => {
      prismaMock.purchaseOrder.findUnique.mockResolvedValue(null);
      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return PO when found', async () => {
      const mockPO = { id: 'PO-123', items: [] };
      prismaMock.purchaseOrder.findUnique.mockResolvedValue(mockPO);

      const result = await service.findOne('PO-123');
      expect(result).toEqual(mockPO);
    });
  });

  describe('create', () => {
    it('should create new PO and items successfully inside transaction', async () => {
      prismaMock.purchaseOrder.create.mockResolvedValue({
        id: 'PO-999',
        total: 1000,
      });

      const result = await service.create({
        vendorId: 'vend-123',
        vendorName: 'Jewels Corp',
        vendorState: 'MH',
        deliverToBranch: 'Mumbai',
        deliverToState: 'MH',
        deliverToAddress: 'Address info',
        date: '2026-07-16',
        paymentTerms: 'Net 30',
        status: 'Draft',
        items: [
          {
            sku: 'DR-001',
            name: 'Ring',
            quantity: 2,
            rate: 500,
            taxRate: 3,
            taxAmount: 30,
            amount: 1030,
          },
        ],
        subtotal: 1000,
        discountType: 'None',
        discountValue: 0,
        discountUnit: '%',
        discountAfterTax: false,
        discountAmount: 0,
        taxSplitType: 'CGST_SGST',
        cgstAmount: 15,
        sgstAmount: 15,
        igstAmount: 0,
        taxTotal: 30,
        tdsTcsType: 'None',
        tdsTcsRate: 0,
        tdsTcsAmount: 0,
        adjustment: 0,
        total: 1030,
      });

      expect(prismaMock.purchaseOrder.create).toHaveBeenCalled();
      expect(result.id).toBe('PO-999');
    });
  });
});
