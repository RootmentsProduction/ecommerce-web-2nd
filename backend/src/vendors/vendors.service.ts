import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateVendorAddressDto {
  type: string;
  attention?: string;
  countryRegion?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  fax?: string;
}

export interface CreateVendorContactDto {
  salutation?: string;
  firstName: string;
  lastName: string;
  email: string;
  workPhone?: string;
  mobile?: string;
}

export interface CreateVendorBankDto {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface CreateVendorDto {
  salutation?: string;
  firstName: string;
  lastName: string;
  companyName: string;
  displayName: string;
  email: string;
  workPhone: string;
  mobile: string;
  language: string;
  gstTreatment: string;
  sourceOfSupply: string;
  pan: string;
  gstin: string;
  currency: string;
  paymentTerms: string;
  tdsRate: string;
  remarks: string;
  attachments?: string; // serialized JSON array
  commentsJson?: string; // serialized JSON array
  historyJson?: string; // serialized JSON array
  status?: string;
  billingAddress: CreateVendorAddressDto;
  shippingAddress: CreateVendorAddressDto;
  contactPersons: CreateVendorContactDto[];
  bankAccounts: CreateVendorBankDto[];
}

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.vendor.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { id },
      include: {
        addresses: true,
        contacts: true,
        bankAccounts: true,
      },
    });

    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${id} not found.`);
    }

    return vendor;
  }

  async create(dto: CreateVendorDto) {
    // Check if email already exists
    const existing = await this.prisma.vendor.findFirst({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('A vendor with this email already exists.');
    }

    return this.prisma.$transaction(async (tx) => {
      // Create primary vendor record
      const vendor = await tx.vendor.create({
        data: {
          salutation: dto.salutation,
          firstName: dto.firstName,
          lastName: dto.lastName,
          companyName: dto.companyName,
          displayName: dto.displayName,
          email: dto.email,
          workPhone: dto.workPhone,
          mobile: dto.mobile,
          language: dto.language,
          gstTreatment: dto.gstTreatment,
          sourceOfSupply: dto.sourceOfSupply,
          pan: dto.pan,
          gstin: dto.gstin,
          currency: dto.currency,
          paymentTerms: dto.paymentTerms,
          tdsRate: dto.tdsRate,
          remarks: dto.remarks,
          attachments: dto.attachments,
          commentsJson: dto.commentsJson,
          historyJson: dto.historyJson,
          status: dto.status ?? 'Active',
        },
      });

      // Insert billing/shipping addresses
      const billing = dto.billingAddress;
      const shipping = dto.shippingAddress;
      await tx.vendorAddress.createMany({
        data: [
          {
            vendorId: vendor.id,
            type: 'BILLING',
            attention: billing.attention,
            countryRegion: billing.countryRegion,
            street1: billing.street1,
            street2: billing.street2,
            city: billing.city,
            state: billing.state,
            zipCode: billing.zipCode,
            phone: billing.phone,
            fax: billing.fax,
          },
          {
            vendorId: vendor.id,
            type: 'SHIPPING',
            attention: shipping.attention,
            countryRegion: shipping.countryRegion,
            street1: shipping.street1,
            street2: shipping.street2,
            city: shipping.city,
            state: shipping.state,
            zipCode: shipping.zipCode,
            phone: shipping.phone,
            fax: shipping.fax,
          },
        ],
      });

      // Insert contact persons
      if (dto.contactPersons && dto.contactPersons.length > 0) {
        await tx.vendorContact.createMany({
          data: dto.contactPersons.map((contact) => ({
            vendorId: vendor.id,
            salutation: contact.salutation,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            workPhone: contact.workPhone,
            mobile: contact.mobile,
          })),
        });
      }

      // Insert bank accounts
      if (dto.bankAccounts && dto.bankAccounts.length > 0) {
        await tx.vendorBankAccount.createMany({
          data: dto.bankAccounts.map((bank) => ({
            vendorId: vendor.id,
            accountHolderName: bank.accountHolderName,
            bankName: bank.bankName,
            accountNumber: bank.accountNumber,
            ifscCode: bank.ifscCode,
          })),
        });
      }

      return vendor;
    });
  }

  async update(id: string, dto: Partial<CreateVendorDto>) {
    const existing = await this.prisma.vendor.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Vendor with ID ${id} not found.`);
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Update nested sub-records ONLY if provided
      if (dto.billingAddress && dto.shippingAddress) {
        await tx.vendorAddress.deleteMany({ where: { vendorId: id } });
        const billing = dto.billingAddress;
        const shipping = dto.shippingAddress;
        await tx.vendorAddress.createMany({
          data: [
            {
              vendorId: id,
              type: 'BILLING',
              attention: billing.attention,
              countryRegion: billing.countryRegion,
              street1: billing.street1,
              street2: billing.street2,
              city: billing.city,
              state: billing.state,
              zipCode: billing.zipCode,
              phone: billing.phone,
              fax: billing.fax,
            },
            {
              vendorId: id,
              type: 'SHIPPING',
              attention: shipping.attention,
              countryRegion: shipping.countryRegion,
              street1: shipping.street1,
              street2: shipping.street2,
              city: shipping.city,
              state: shipping.state,
              zipCode: shipping.zipCode,
              phone: shipping.phone,
              fax: shipping.fax,
            },
          ],
        });
      }

      if (dto.contactPersons) {
        await tx.vendorContact.deleteMany({ where: { vendorId: id } });
        if (dto.contactPersons.length > 0) {
          await tx.vendorContact.createMany({
            data: dto.contactPersons.map((contact) => ({
              vendorId: id,
              salutation: contact.salutation,
              firstName: contact.firstName,
              lastName: contact.lastName,
              email: contact.email,
              workPhone: contact.workPhone,
              mobile: contact.mobile,
            })),
          });
        }
      }

      if (dto.bankAccounts) {
        await tx.vendorBankAccount.deleteMany({ where: { vendorId: id } });
        if (dto.bankAccounts.length > 0) {
          await tx.vendorBankAccount.createMany({
            data: dto.bankAccounts.map((bank) => ({
              vendorId: id,
              accountHolderName: bank.accountHolderName,
              bankName: bank.bankName,
              accountNumber: bank.accountNumber,
              ifscCode: bank.ifscCode,
            })),
          });
        }
      }

      // 2. Build update data with only defined fields
      const updateData: any = {};
      const fields = [
        'salutation',
        'firstName',
        'lastName',
        'companyName',
        'displayName',
        'email',
        'workPhone',
        'mobile',
        'language',
        'gstTreatment',
        'sourceOfSupply',
        'pan',
        'gstin',
        'currency',
        'paymentTerms',
        'tdsRate',
        'remarks',
        'attachments',
        'commentsJson',
        'historyJson',
        'status',
      ];

      for (const field of fields) {
        if ((dto as any)[field] !== undefined) {
          updateData[field] = (dto as any)[field];
        }
      }

      // 3. Update main vendor record
      return tx.vendor.update({
        where: { id },
        data: updateData,
      });
    });
  }

  async remove(id: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { id },
      include: {
        _count: {
          select: { purchaseOrders: true },
        },
      },
    });

    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${id} not found.`);
    }

    if (vendor._count.purchaseOrders > 0) {
      // Change status to Inactive instead of deleting
      return this.prisma.vendor.update({
        where: { id },
        data: { status: 'Inactive' },
      });
    }

    return this.prisma.vendor.delete({
      where: { id },
    });
  }
}
