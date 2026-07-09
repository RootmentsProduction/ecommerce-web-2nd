import { AdminStat } from "@/types/admin";

export const dashboardStats: AdminStat[] = [
  {
    id: "revenue",
    title: "TODAY'S REVENUE",
    value: "₹ 2,34,500",
    subNote: "₹ 30.4L this month",
  },
  {
    id: "orders",
    title: "TODAY'S ORDERS",
    value: "47",
    subNote: "+18 vs yesterday",
  },
  {
    id: "customers",
    title: "NEW CUSTOMERS",
    value: "24",
    subNote: "48 returning",
  },
  {
    id: "conversion",
    title: "CONVERSION RATE",
    value: "40.4%",
    subNote: "of site visitors",
  },
  {
    id: "sold",
    title: "PRODUCTS SOLD",
    value: "40",
    subNote: "units today",
  },
];

// High fidelity curve points representing the screenshot
// Month: index (0-11)
// Revenue (Orange line): 0-100 scale matching visual curve height
// Profit (Green line): 0-100 scale matching visual curve height
export const monthlySalesData = [
  { month: "Jan", revenue: 50, profit: 38 },
  { month: "Feb", revenue: 68, profit: 67 },
  { month: "Mar", revenue: 62, profit: 58 },
  { month: "Apr", revenue: 67, profit: 34 },
  { month: "May", revenue: 60, profit: 32 },
  { month: "Jun", revenue: 70, profit: 38 },
  { month: "Jul", revenue: 68, profit: 58 },
  { month: "Aug", revenue: 78, profit: 54 },
  { month: "Sep", revenue: 72, profit: 42 },
  { month: "Oct", revenue: 78, profit: 56 },
  { month: "Nov", revenue: 70, profit: 48 },
  { month: "Dec", revenue: 60, profit: 52 },
];
