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
    getNotifications(): Promise<{
        lowStock: {
            sku: string;
            productName: string;
            variantName: string | null;
            currentStock: number;
        }[];
        recentOrders: {
            id: string;
            orderNumber: string;
            total: number;
            customerName: string;
            createdAt: Date;
            status: string;
        }[];
    }>;
}
