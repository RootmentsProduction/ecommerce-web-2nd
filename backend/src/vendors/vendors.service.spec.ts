import { Test, TestingModule } from '@nestjs/testing';
import { VendorsService } from './vendors.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('VendorsService', () => {
  let service: VendorsService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      vendor: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      vendorAddress: {
        deleteMany: jest.fn(),
        createMany: jest.fn(),
      },
      vendorContact: {
        deleteMany: jest.fn(),
        createMany: jest.fn(),
      },
      vendorBankAccount: {
        deleteMany: jest.fn(),
        createMany: jest.fn(),
      },
      $transaction: jest.fn().mockImplementation(async (callback) => {
        return callback(prismaMock);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<VendorsService>(VendorsService);
  });

  describe('findOne', () => {
    it('should throw NotFoundException if vendor does not exist', async () => {
      prismaMock.vendor.findUnique.mockResolvedValue(null);
      await expect(service.findOne('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return vendor with nested records when found', async () => {
      const mockVendor = {
        id: 'vend-123',
        displayName: 'Jewels Corp',
        addresses: [],
        contacts: [],
        bankAccounts: [],
      };
      prismaMock.vendor.findUnique.mockResolvedValue(mockVendor);

      const result = await service.findOne('vend-123');
      expect(result).toEqual(mockVendor);
    });
  });

  describe('create', () => {
    it('should throw BadRequestException if email already registered', async () => {
      prismaMock.vendor.findFirst.mockResolvedValue({ id: 'existing-id' });
      await expect(
        service.create({
          firstName: 'John',
          lastName: 'Doe',
          companyName: 'ACME',
          displayName: 'John ACME',
          email: 'johndoe@example.com',
          workPhone: '',
          mobile: '',
          language: 'English',
          gstTreatment: 'Unregistered',
          sourceOfSupply: 'State',
          pan: '',
          gstin: '',
          currency: 'INR',
          paymentTerms: 'Net 30',
          tdsRate: 'None',
          remarks: '',
          billingAddress: {
            street1: 'Street',
            city: 'City',
            state: 'State',
            zipCode: '12345',
            type: 'BILLING',
          },
          shippingAddress: {
            street1: 'Street',
            city: 'City',
            state: 'State',
            zipCode: '12345',
            type: 'SHIPPING',
          },
          contactPersons: [],
          bankAccounts: [],
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
