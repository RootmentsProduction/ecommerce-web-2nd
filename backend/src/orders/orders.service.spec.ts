import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      order: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn().mockImplementation(async (callback) => {
        return callback(prismaMock);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  describe('create', () => {
    it('should throw BadRequestException if order has no items', async () => {
      await expect(
        service.create('cust-123', {
          subtotal: 0,
          taxTotal: 0,
          total: 0,
          shippingAddress: {},
          billingAddress: {},
          items: [],
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create order successfully inside transaction', async () => {
      prismaMock.order.count.mockResolvedValue(0);
      prismaMock.order.create.mockResolvedValue({
        id: 'order-123',
        orderNumber: 'ORD-mock-0001',
      });

      const result = await service.create('cust-123', {
        subtotal: 1000,
        taxTotal: 30,
        total: 1030,
        shippingAddress: { city: 'Mumbai' },
        billingAddress: { city: 'Mumbai' },
        items: [
          {
            productId: 'prod-123',
            name: 'Ring',
            sku: 'DR-001',
            quantity: 1,
            price: 1000,
          },
        ],
      });

      expect(prismaMock.order.create).toHaveBeenCalled();
      expect(result.id).toBe('order-123');
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if order does not exist', async () => {
      prismaMock.order.findUnique.mockResolvedValue(null);
      await expect(
        service.findOne('invalid-id', { id: 'cust-123', role: 'CUSTOMER' }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
