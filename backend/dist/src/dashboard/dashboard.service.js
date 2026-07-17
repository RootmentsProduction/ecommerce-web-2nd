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
        const todaysOrdersList = await this.prisma.order.findMany({
            where: {
                createdAt: { gte: startOfToday },
                status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
            },
        });
        const todaysRevenue = todaysOrdersList.reduce((sum, o) => sum + Number(o.total), 0);
        const monthlyOrdersList = await this.prisma.order.findMany({
            where: {
                createdAt: { gte: startOfMonth },
                status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
            },
        });
        const monthlyRevenue = monthlyOrdersList.reduce((sum, o) => sum + Number(o.total), 0);
        const todaysOrdersCount = await this.prisma.order.count({
            where: {
                createdAt: { gte: startOfToday },
            },
        });
        const newCustomersCount = await this.prisma.user.count({
            where: {
                role: client_js_1.UserRole.CUSTOMER,
                createdAt: { gte: startOfToday },
            },
        });
        const orderItemsToday = await this.prisma.orderItem.findMany({
            where: {
                order: {
                    createdAt: { gte: startOfToday },
                    status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
                },
            },
        });
        const productsSoldToday = orderItemsToday.reduce((sum, item) => sum + item.quantity, 0);
        const lowStockResult = await this.prisma.$queryRaw(client_js_1.Prisma.sql `SELECT COUNT(*)::int as count FROM "Inventory" WHERE "currentStock" <= "minimumRequired"`);
        const lowStockCount = lowStockResult[0]?.count ?? 0;
        const totalProducts = await this.prisma.product.count({
            where: { status: 'ACTIVE' },
        });
        const totalCategories = await this.prisma.category.count({
            where: { isActive: true },
        });
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
        for (let i = 0; i < 12; i++) {
            const targetMonthStart = new Date();
            targetMonthStart.setMonth(i, 1);
            targetMonthStart.setHours(0, 0, 0, 0);
            const targetMonthEnd = new Date(targetMonthStart);
            targetMonthEnd.setMonth(i + 1, 0);
            targetMonthEnd.setHours(23, 59, 59, 999);
            const orders = await this.prisma.order.findMany({
                where: {
                    createdAt: { gte: targetMonthStart, lte: targetMonthEnd },
                    status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
                },
            });
            const rev = orders.reduce((sum, o) => sum + Number(o.total), 0);
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map