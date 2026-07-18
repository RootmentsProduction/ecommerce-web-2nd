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

let activeStatsPromise: Promise<DashboardStats | null> | null = null;

export async function getDashboardStats(): Promise<DashboardStats | null> {
  if (activeStatsPromise) {
    return activeStatsPromise;
  }

  activeStatsPromise = (async () => {
    try {
      return await apiFetch<DashboardStats>("/api/dashboard/stats");
    } catch {
      return null;
    } finally {
      // Clear the active promise after a short window (500ms)
      // to allow subsequent updates/refresh requests to fetch fresh data.
      setTimeout(() => {
        activeStatsPromise = null;
      }, 500);
    }
  })();

  return activeStatsPromise;
}
