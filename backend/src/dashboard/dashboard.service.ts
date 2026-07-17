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

    // Todays Revenue (orders not pending or cancelled)
    const todaysOrdersList = await this.prisma.order.findMany({
      where: {
        createdAt: { gte: startOfToday },
        status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
      },
    });
    const todaysRevenue = todaysOrdersList.reduce(
      (sum, o) => sum + Number(o.total),
      0,
    );

    // This Month's Revenue
    const monthlyOrdersList = await this.prisma.order.findMany({
      where: {
        createdAt: { gte: startOfMonth },
        status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
      },
    });
    const monthlyRevenue = monthlyOrdersList.reduce(
      (sum, o) => sum + Number(o.total),
      0,
    );

    // Today's Orders Count
    const todaysOrdersCount = await this.prisma.order.count({
      where: {
        createdAt: { gte: startOfToday },
      },
    });

    // New Customers Count
    const newCustomersCount = await this.prisma.user.count({
      where: {
        role: UserRole.CUSTOMER,
        createdAt: { gte: startOfToday },
      },
    });

    // Products Sold Today
    const orderItemsToday = await this.prisma.orderItem.findMany({
      where: {
        order: {
          createdAt: { gte: startOfToday },
          status: { notIn: ['PENDING_PAYMENT', 'CANCELLED'] },
        },
      },
    });
    const productsSoldToday = orderItemsToday.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    // Low Stock Count
    const lowStockResult = await this.prisma.$queryRaw<{ count: number }[]>(
      Prisma.sql`SELECT COUNT(*)::int as count FROM "Inventory" WHERE "currentStock" <= "minimumRequired"`,
    );
    const lowStockCount = lowStockResult[0]?.count ?? 0;

    // Category and Product counts
    const totalProducts = await this.prisma.product.count({
      where: { status: 'ACTIVE' },
    });
    const totalCategories = await this.prisma.category.count({
      where: { isActive: true },
    });

    // Simple Monthly Sales data for charts
    // Let's generate a list of monthly sales for the last 12 months based on Postgres orders
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
