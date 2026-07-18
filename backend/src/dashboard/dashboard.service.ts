import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole, Prisma } from '../generated/prisma/client.js';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

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

    // Run queries in parallel to drastically improve loading speed
    const [
      todaysRevenueResult,
      monthlyRevenueResult,
      todaysOrdersCount,
      newCustomersCount,
      orderItemsTodayResult,
      lowStockResult,
      totalProducts,
      totalCategories,
      yearOrders,
    ] = await Promise.all([
      // 1. Today's Revenue (orders not pending or cancelled) - uses aggregate sum
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: startOfToday },
          status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
        },
        _sum: {
          total: true,
        },
      }),

      // 2. This Month's Revenue - uses aggregate sum
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: startOfMonth },
          status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
        },
        _sum: {
          total: true,
        },
      }),

      // 3. Today's Orders Count
      this.prisma.order.count({
        where: {
          createdAt: { gte: startOfToday },
        },
      }),

      // 4. New Customers Count
      this.prisma.user.count({
        where: {
          role: UserRole.CUSTOMER,
          createdAt: { gte: startOfToday },
        },
      }),

      // 5. Products Sold Today - uses aggregate sum
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

      // 6. Low Stock Count
      this.prisma.$queryRaw<{ count: number }[]>(
        Prisma.sql`SELECT COUNT(*)::int as count FROM "Inventory" WHERE "currentStock" <= "minimumRequired"`,
      ),

      // 7. Total Products
      this.prisma.product.count({
        where: { status: 'ACTIVE' },
      }),

      // 8. Total Categories
      this.prisma.category.count({
        where: { isActive: true },
      }),

      // 9. Monthly Sales data for charts (fetch entire year in one query instead of 12)
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

    // Simple Monthly Sales data for charts
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

    // Compute monthly sums in JS
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
        revenue: Math.round(rev / 1000), // represented in thousands
        profit: Math.round((rev * 0.4) / 1000), // assume 40% margin
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
}
