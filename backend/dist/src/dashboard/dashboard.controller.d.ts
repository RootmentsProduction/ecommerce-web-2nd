import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
