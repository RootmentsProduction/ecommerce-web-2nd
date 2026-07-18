import { apiFetch } from "@/services/api";

export interface DashboardStats {
  todaysRevenue: number;
  monthlyRevenue: number;
  todaysOrdersCount: number;
  newCustomersCount: number;
  productsSoldToday: number;
  lowStockCount: number;
  totalProducts: number;
  totalCategories: number;
  monthlySales: { month: string; revenue: number; profit: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats | null> {
  try {
    return await apiFetch<DashboardStats>("/api/dashboard/stats");
  } catch {
    return null;
  }
}
