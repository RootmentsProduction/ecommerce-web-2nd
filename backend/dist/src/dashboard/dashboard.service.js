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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_js_1 = require("../generated/prisma/client.js");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats() {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const startOfYear = new Date();
        startOfYear.setMonth(0, 1);
        startOfYear.setHours(0, 0, 0, 0);
        const endOfYear = new Date();
        endOfYear.setMonth(11, 31);
        endOfYear.setHours(23, 59, 59, 999);
        const [todaysRevenueResult, monthlyRevenueResult, todaysOrdersCount, newCustomersCount, orderItemsTodayResult, lowStockResult, totalProducts, totalCategories, yearOrders,] = await Promise.all([
            this.prisma.order.aggregate({
                where: {
                    createdAt: { gte: startOfToday },
                    status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
                },
                _sum: {
                    total: true,
                },
            }),
            this.prisma.order.aggregate({
                where: {
                    createdAt: { gte: startOfMonth },
                    status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
                },
                _sum: {
                    total: true,
                },
            }),
            this.prisma.order.count({
                where: {
                    createdAt: { gte: startOfToday },
                },
            }),
            this.prisma.user.count({
                where: {
                    role: client_js_1.UserRole.CUSTOMER,
                    createdAt: { gte: startOfToday },
                },
            }),
            this.prisma.orderItem.aggregate({
                where: {
                    order: {
                        createdAt: { gte: startOfToday },
                        status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
                    },
                },
                _sum: {
                    quantity: true,
                },
            }),
            this.prisma.$queryRaw(client_js_1.Prisma.sql `SELECT COUNT(*)::int as count FROM "Inventory" WHERE "currentStock" <= "minimumRequired"`),
            this.prisma.product.count({
                where: { status: 'ACTIVE' },
            }),
            this.prisma.category.count({
                where: { isActive: true },
            }),
            this.prisma.order.findMany({
                where: {
                    createdAt: { gte: startOfYear, lte: endOfYear },
                    status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
                },
                select: {
                    total: true,
                    createdAt: true,
                },
            }),
        ]);
        const todaysRevenue = Number(todaysRevenueResult._sum?.total ?? 0);
        const monthlyRevenue = Number(monthlyRevenueResult._sum?.total ?? 0);
        const productsSoldToday = orderItemsTodayResult._sum?.quantity ?? 0;
        const lowStockCount = lowStockResult[0]?.count ?? 0;
        const monthlySales = [];
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const revenueByMonth = new Array(12).fill(0);
        for (const order of yearOrders) {
            const monthIndex = new Date(order.createdAt).getMonth();
            if (monthIndex >= 0 && monthIndex < 12) {
                revenueByMonth[monthIndex] += Number(order.total);
            }
        }
        for (let i = 0; i < 12; i++) {
            const rev = revenueByMonth[i];
            monthlySales.push({
                month: months[i],
                revenue: Math.round(rev / 1000),
                profit: Math.round((rev * 0.4) / 1000),
            });
        }
        return {
            todaysRevenue,
            monthlyRevenue,
            todaysOrdersCount,
            newCustomersCount,
            productsSoldToday,
            lowStockCount,
            totalProducts,
            totalCategories,
            monthlySales,
        };
    }
    async getNotifications() {
        const lowStockInventories = await this.prisma.inventory.findMany({
            where: {
                currentStock: { lt: 5 },
            },
            include: {
                product: true,
                variant: {
                    include: {
                        product: true,
                    },
                },
            },
            take: 10,
            orderBy: {
                currentStock: 'asc',
            },
        });
        const lowStock = lowStockInventories.map((inv) => {
            const isVariant = !!inv.variantId;
            const sku = isVariant ? inv.variant.sku : inv.product.sku;
            const productName = isVariant
                ? inv.variant.product.name
                : inv.product.name;
            const variantName = isVariant ? inv.variant.name : null;
            return {
                sku,
                productName,
                variantName,
                currentStock: inv.currentStock,
            };
        });
        const recentOrdersRaw = await this.prisma.order.findMany({
            include: {
                customer: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 5,
        });
        const recentOrders = recentOrdersRaw.map((o) => ({
            id: o.id,
            orderNumber: o.orderNumber,
            total: Number(o.total),
            customerName: `${o.customer.firstName || ''} ${o.customer.lastName || ''}`.trim() ||
                'Guest Customer',
            createdAt: o.createdAt,
            status: o.status,
        }));
        return {
            lowStock,
            recentOrders,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map