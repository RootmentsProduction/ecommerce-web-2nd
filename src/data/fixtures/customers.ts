import { AdminCustomer, AdminStat } from "@/types/admin";

export const customerStatsFixture: AdminStat[] = [
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

export const adminCustomersFixture: AdminCustomer[] = [
  {
    id: "c-001",
    name: "Priya Sharma",
    mobile: "+91 85436 21678",
    email: "priya.sharma@outlook.com",
    ordersCount: 14,
    totalSpend: "₹45,000",
    dateJoined: "24 Jun 2026",
  },
  {
    id: "c-002",
    name: "Amit Patel",
    mobile: "+91 98234 56781",
    email: "amit.patel@gmail.com",
    ordersCount: 10,
    totalSpend: "₹23,000",
    dateJoined: "25 Jun 2026",
  },
  {
    id: "c-003",
    name: "Sneha Reddy",
    mobile: "+91 76543 21098",
    email: "sneha.reddy@yahoo.com",
    ordersCount: 8,
    totalSpend: "₹35,000",
    dateJoined: "26 Jun 2026",
  },
  {
    id: "c-004",
    name: "Rohan Mehta",
    mobile: "+91 81234 56789",
    email: "rohan.mehta@gmail.com",
    ordersCount: 12,
    totalSpend: "₹27,000",
    dateJoined: "27 Jun 2026",
  },
  {
    id: "c-005",
    name: "Vikram Malhotra",
    mobile: "+91 90123 45678",
    email: "vikram.malhotra@gmail.com",
    ordersCount: 5,
    totalSpend: "₹24,400",
    dateJoined: "28 Jun 2026",
  },
  {
    id: "c-006",
    name: "Ananya Iyer",
    mobile: "+91 88776 65544",
    email: "ananya.iyer@gmail.com",
    ordersCount: 3,
    totalSpend: "₹20,000",
    dateJoined: "29 Jun 2026",
  },
  {
    id: "c-007",
    name: "Kabir Sen",
    mobile: "+91 99887 76655",
    email: "kabir.sen@gmail.com",
    ordersCount: 17,
    totalSpend: "₹22,800",
    dateJoined: "30 Jun 2026",
  },
];
