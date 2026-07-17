export type StatusType = 
  | "Delivered" 
  | "Shipped" 
  | "Pending" 
  | "Processing" 
  | "Cancelled" 
  | "Active" 
  | "Low Stock" 
  | "Out of Stock"
  | "In Stock"
  | "Pending Payment"
  | "Confirmed"
  | "Packed"
  | "Returned"
  | "Draft"
  | "Hidden"
  | "Archived";

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
  id?: string;
  sku: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status?: StatusType; // Keep for fallback compatibility
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  publicationStatus: "Active" | "Draft" | "Archived";
  image?: string;
}

export interface AdminInventoryItem {
  productId?: string;
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
  // Legacy fixture fields
  name?: string;
  mobile?: string;
  ordersCount?: number;
  dateJoined?: string;
  // Real API fields
  firstName?: string;
  lastName?: string;
  email: string;
  status?: string;
  orderCount?: number;
  totalSpend?: number | string;
  joinedDate?: string | Date;
  createdAt?: string | Date;
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

// New UI Types

export interface AdminProductMedia {
  id: string;
  url: string;
  isPrimary: boolean;
  altText?: string;
  file?: File;
}

export interface AdminProductVariant {
  id: string;
  name: string; // e.g. "Gold / 16 inch"
  sku: string;
  price: string;
  stock: number;
  status: StatusType;
}

export interface AdminProductFormData {
  id?: string;
  name: string;
  sku: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory?: string;
  brand?: string;
  collection?: string;
  gender: string;
  occasion: string;
  material: string;
  purity?: string;
  hsnCode?: string;
  unit?: string;
  size?: string;
  isReturnable?: boolean;
  
  // Sales Info
  isSellable?: boolean;
  sellingPrice: string;
  mrp: string;
  offerPrice?: string;
  discountPercent: number;
  taxPreference?: string; // "Taxable" | "Exempt"
  intraStateTaxRate?: string;
  interStateTaxRate?: string;
  priceIncludesGst?: boolean;
  taxCategory: string;
  
  // Purchase Info
  isPurchasable?: boolean;
  costPrice?: string;
  preferredVendor?: string;
  purchaseNotes?: string;
  
  // Inventory
  trackInventory: boolean;
  initialStock: number; // Will represent Opening Stock on create
  minStock: number; // Will represent Minimum Required Stock
  reorderPoint?: number;
  allowBackorder: boolean;
  
  // Visibility and SEO
  status: "Draft" | "Active";
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  showOnHomepage: boolean;
  publishDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoSlug?: string;
  
  media: AdminProductMedia[];
  variants: AdminProductVariant[];
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "Active" | "Draft" | "Hidden";
  productCount: number;
  displayOrder: number;
  image?: string;
}

export interface InventoryDetails {
  productId: string;
  productName: string;
  sku: string;
  category: string;
  image?: string;
  currentStock: number;
  minRequired: number;
  availableStock: number;
  reservedStock: number;
  incomingStock: number;
  status: StatusType;
  variantsStock?: AdminProductVariant[];
}

export interface StockAdjustment {
  productId: string;
  variantId?: string;
  adjustmentType: "Add Stock" | "Remove Stock" | "Set Exact Quantity" | "Damaged Item" | "Returned Item" | "Manual Correction";
  quantity: number;
  reason: string;
  referenceNumber?: string;
  notes?: string;
}

export interface StockTransaction {
  id: string;
  date: string;
  productId: string;
  productName: string;
  sku: string;
  variant?: string;
  change: string; // e.g. "+15"
  before: number;
  after: number;
  reason: string;
  reference: string;
  changedBy: string;
  isAutomatic?: boolean;
  transactionType: "Opening Stock" | "Stock Added" | "Customer Sale" | "Damaged Item" | "Customer Return" | "Manual Correction";
}

export interface AdminAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AdminOrderItem {
  productId: string;
  productName: string;
  sku: string;
  variant?: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  image?: string;
}

export interface PaymentDetails {
  method: string;
  status: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  subtotal: string;
  shipping: string;
  tax: string;
  discount: string;
  grandTotal: string;
}

export interface OrderTimelineEvent {
  title: string;
  description: string;
  date?: string;
  status: "completed" | "current" | "upcoming";
}

export interface AdminOrderDetails {
  id: string;
  date: string;
  status: StatusType;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: AdminAddress;
  billingAddress: AdminAddress;
  items: AdminOrderItem[];
  payment: PaymentDetails;
  stockDeductionStatus: string;
  stockDeductedQty: number;
  stockDeductionTime?: string;
  stockDeductionRef?: string;
  stockDeductionProduct?: string;
  stockDeductionVariant?: string;
  stockDeductionBeforeStock?: number;
  stockDeductionAfterStock?: number;
  timeline: OrderTimelineEvent[];
}
