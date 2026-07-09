import { AdminCustomer, AdminStat } from "@/types/admin";

export const customerStats: AdminStat[] = [
  {
    id: "total_customers",
    title: "TOTAL CUSTOMERS",
    value: "8,534",
    subNote: "+4% vs yesterday",
  },
  {
    id: "new_customers",
    title: "NEW CUSTOMERS",
    value: "245",
    subNote: "+4% vs yesterday",
  },
  {
    id: "avg_value",
    title: "AVG. VALUE",
    value: "₹ 4,250",
    subNote: "+4% vs yesterday",
  },
  {
    id: "repeat_rate",
    title: "REPEAT PURCHASE RATE %",
    value: "41.2%",
    subNote: "+4% vs yesterday",
  },
];

export const adminCustomers: AdminCustomer[] = [
  {
    id: "c-001",
    name: "Priya Sharma",
    mobile: "+91 85436 21678",
    email: "priyasharma@gmail.com",
    ordersCount: 14,
    totalSpend: "₹4,500",
    dateJoined: "24 Jun 2026",
  },
  {
    id: "c-002",
    name: "Priya Sharma",
    mobile: "+91 85436 21678",
    email: "priyasharma@gmail.com",
    ordersCount: 10,
    totalSpend: "₹2,300",
    dateJoined: "24 Jun 2026",
  },
  {
    id: "c-003",
    name: "Priya Sharma",
    mobile: "+91 85436 21678",
    email: "priyasharma@gmail.com",
    ordersCount: 8,
    totalSpend: "₹3,500",
    dateJoined: "24 Jun 2026",
  },
  {
    id: "c-004",
    name: "Priya Sharma",
    mobile: "+91 85436 21678",
    email: "priyasharma@gmail.com",
    ordersCount: 12,
    totalSpend: "₹2,700",
    dateJoined: "24 Jun 2026",
  },
  {
    id: "c-005",
    name: "Priya Sharma",
    mobile: "+91 85436 21678",
    email: "priyasharma@gmail.com",
    ordersCount: 5,
    totalSpend: "₹2,440",
    dateJoined: "24 Jun 2026",
  },
  {
    id: "c-006",
    name: "Priya Sharma",
    mobile: "+91 85436 21678",
    email: "priyasharma@gmail.com",
    ordersCount: 3,
    totalSpend: "₹2,000",
    dateJoined: "24 Jun 2026",
  },
  {
    id: "c-007",
    name: "Priya Sharma",
    mobile: "+91 85436 21678",
    email: "priyasharma@gmail.com",
    ordersCount: 17,
    totalSpend: "₹2,280",
    dateJoined: "24 Jun 2026",
  },
];
