export type StatusType = 
  | "Delivered" 
  | "Shipped" 
  | "Pending" 
  | "Processing" 
  | "Cancelled" 
  | "Active" 
  | "Low Stock" 
  | "Out of Stock";

export interface AdminStat {
  id: string;
  title: string;
  value: string;
  subNote: string;
  icon?: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  productName: string;
  value: string;
  status: StatusType;
  date: string;
}

export interface AdminProduct {
  sku: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: StatusType;
  image?: string;
}

export interface AdminInventoryItem {
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  minRequired: number;
  status: StatusType;
}

export interface AdminVendor {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minRequired: number;
  status: StatusType;
}

export interface AdminCustomer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  ordersCount: number;
  totalSpend: string;
  dateJoined: string;
}

export interface AdminNavItem {
  title: string;
  href: string;
  iconName: string;
  isActive?: boolean;
  subItems?: Array<{ title: string; href: string }>;
}

export interface NavSection {
  sectionTitle: string;
  items: AdminNavItem[];
}
