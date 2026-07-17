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
exports.VendorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VendorsService = class VendorsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.vendor.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const vendor = await this.prisma.vendor.findUnique({
            where: { id },
            include: {
                addresses: true,
                contacts: true,
                bankAccounts: true,
            },
        });
        if (!vendor) {
            throw new common_1.NotFoundException(`Vendor with ID ${id} not found.`);
        }
        return vendor;
    }
    async create(dto) {
        const existing = await this.prisma.vendor.findFirst({
            where: { email: dto.email },
        });
        if (existing) {
            throw new common_1.BadRequestException('A vendor with this email already exists.');
        }
        return this.prisma.$transaction(async (tx) => {
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
    async update(id, dto) {
        const existing = await this.prisma.vendor.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException(`Vendor with ID ${id} not found.`);
        }
        return this.prisma.$transaction(async (tx) => {
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
            const updateData = {};
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
                if (dto[field] !== undefined) {
                    updateData[field] = dto[field];
                }
            }
            return tx.vendor.update({
                where: { id },
                data: updateData,
            });
        });
    }
    async remove(id) {
        const vendor = await this.prisma.vendor.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { purchaseOrders: true },
                },
            },
        });
        if (!vendor) {
            throw new common_1.NotFoundException(`Vendor with ID ${id} not found.`);
        }
        if (vendor._count.purchaseOrders > 0) {
            return this.prisma.vendor.update({
                where: { id },
                data: { status: 'Inactive' },
            });
        }
        return this.prisma.vendor.delete({
            where: { id },
        });
    }
};
exports.VendorsService = VendorsService;
exports.VendorsService = VendorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VendorsService);
//# sourceMappingURL=vendors.service.js.map