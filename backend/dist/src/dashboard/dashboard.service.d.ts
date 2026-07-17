import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        todaysRevenue: number;
        monthlyRevenue: number;
        todaysOrdersCount: number;
        newCustomersCount: number;
        productsSoldToday: number;
        lowStockCount: number;
        totalProducts: number;
        totalCategories: number;
        monthlySales: {
            month: string;
            revenue: number;
            profit: number;
        }[];
    }>;
}
