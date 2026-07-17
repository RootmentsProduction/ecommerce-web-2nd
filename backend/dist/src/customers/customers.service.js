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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_js_1 = require("../generated/prisma/client.js");
let CustomersService = class CustomersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const customers = await this.prisma.user.findMany({
            where: {
                role: client_js_1.UserRole.CUSTOMER,
            },
            include: {
                orders: {
                    where: {
                        status: {
                            in: ['CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'DELIVERED'],
                        },
                    },
                    select: {
                        total: true,
                    },
                },
                _count: {
                    select: {
                        orders: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return customers.map((c) => {
            const totalSpend = c.orders.reduce((sum, order) => sum + Number(order.total), 0);
            return {
                id: c.id,
                email: c.email,
                firstName: c.firstName,
                lastName: c.lastName,
                status: c.status,
                createdAt: c.createdAt,
                joinedDate: c.createdAt,
                orderCount: c._count.orders,
                totalSpend,
            };
        });
    }
    async findOne(id) {
        const customer = await this.prisma.user.findFirst({
            where: {
                id,
                role: client_js_1.UserRole.CUSTOMER,
            },
            include: {
                orders: {
                    orderBy: { createdAt: 'desc' },
                },
                addresses: true,
            },
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found.`);
        }
        const activeOrders = customer.orders.filter((o) => ['CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'DELIVERED'].includes(o.status));
        const totalSpend = activeOrders.reduce((sum, order) => sum + Number(order.total), 0);
        return {
            id: customer.id,
            email: customer.email,
            firstName: customer.firstName,
            lastName: customer.lastName,
            status: customer.status,
            createdAt: customer.createdAt,
            joinedDate: customer.createdAt,
            orderCount: customer.orders.length,
            totalSpend,
            orders: customer.orders,
            addresses: customer.addresses,
        };
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map