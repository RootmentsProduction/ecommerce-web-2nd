import { AdminOrder, AdminOrderDetails, AdminCustomer, StatusType } from "@/types/admin";
import { apiFetch } from "@/services/api";

// Mappers to translate backend models into frontend type definitions
export function mapBackendOrderToAdminOrder(order: any): AdminOrder {
  const customerName = order.customer
    ? `${order.customer.firstName || ""} ${order.customer.lastName || ""}`.trim()
    : "Guest Customer";

  const firstItem = order.items?.[0];
  const itemsCount = order.items?.length || 0;
  const productName = firstItem
    ? `${firstItem.name}${itemsCount > 1 ? ` (+${itemsCount - 1} items)` : ""}`
    : "No items";

  const date = order.createdAt ? new Date(order.createdAt).toLocaleString("en-IN") : "N/A";

  let status: StatusType = "Pending";
  const stat = order.status?.toUpperCase();
  if (stat === "PENDING_PAYMENT") status = "Pending Payment";
  else if (stat === "CONFIRMED") status = "Confirmed";
  else if (stat === "PROCESSING") status = "Processing";
  else if (stat === "PACKED") status = "Packed";
  else if (stat === "SHIPPED") status = "Shipped";
  else if (stat === "DELIVERED") status = "Delivered";
  else if (stat === "CANCELLED") status = "Cancelled";
  else if (stat === "RETURNED") status = "Returned";

  return {
    id: order.orderNumber || order.id,
    customerName,
    productName,
    value: `₹${Number(order.total || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
    status,
    date,
  };
}

export function mapBackendOrderToAdminOrderDetails(order: any): AdminOrderDetails {
  const customerName = order.customer
    ? `${order.customer.firstName || ""} ${order.customer.lastName || ""}`.trim()
    : "Guest Customer";

  const date = order.createdAt ? new Date(order.createdAt).toLocaleString("en-IN") : "N/A";

  let status: StatusType = "Pending";
  const stat = order.status?.toUpperCase();
  if (stat === "PENDING_PAYMENT") status = "Pending Payment";
  else if (stat === "CONFIRMED") status = "Confirmed";
  else if (stat === "PROCESSING") status = "Processing";
  else if (stat === "PACKED") status = "Packed";
  else if (stat === "SHIPPED") status = "Shipped";
  else if (stat === "DELIVERED") status = "Delivered";
  else if (stat === "CANCELLED") status = "Cancelled";
  else if (stat === "RETURNED") status = "Returned";

  // Safely parse JSON or address objects
  const parseAddress = (addr: any) => {
    if (!addr) return { street: "—", city: "—", state: "—", zipCode: "—", country: "—" };
    const a = typeof addr === "string" ? JSON.parse(addr) : addr;
    return {
      street: a.street || a.street1 || "—",
      city: a.city || "—",
      state: a.state || "—",
      zipCode: a.zipCode || a.zipcode || "—",
      country: a.country || "—",
    };
  };

  const shippingAddress = parseAddress(order.shippingAddress);
  const billingAddress = parseAddress(order.billingAddress);

  const items = (order.items || []).map((item: any) => {
    const primaryImgObj = item.product?.images?.find((img: any) => img.imageRole === "PRIMARY" || img.isPrimary);
    const image = primaryImgObj ? primaryImgObj.url : (item.product?.images?.[0]?.url || undefined);
    return {
      productId: item.productId,
      productName: item.name,
      sku: item.sku,
      variant: item.variantName || undefined,
      quantity: item.quantity,
      unitPrice: `₹${Number(item.price || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      totalPrice: `₹${(Number(item.price || 0) * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      image,
    };
  });

  const totalDeductedQty = (order.items || []).reduce((sum: number, item: any) => sum + item.quantity, 0);
  const isDeducted = ["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"].includes(order.status?.toUpperCase());

  // Build a realistic timeline events list based on state progression
  const timeline = [
    {
      title: "Order Placed",
      description: `Order ${order.orderNumber} successfully registered by the storefront engine.`,
      date: order.createdAt ? new Date(order.createdAt).toLocaleString("en-IN") : undefined,
      status: "completed" as const,
    },
    {
      title: "Payment Settlement",
      description: order.paymentStatus === "PAID" ? "Settled through PG processor." : "Payment settlement pending.",
      date: order.paymentStatus === "PAID" ? (order.updatedAt ? new Date(order.updatedAt).toLocaleString("en-IN") : undefined) : undefined,
      status: order.paymentStatus === "PAID" ? ("completed" as const) : ("current" as const),
    },
    {
      title: "Assay & Processing",
      description: "Item packaging, assay cert checks, and boxing.",
      status: isDeducted ? ("completed" as const) : ("upcoming" as const),
    },
    {
      title: "Dispatched",
      description: "Assigned courier logistics airway bill numbers.",
      status: ["SHIPPED", "DELIVERED"].includes(order.status?.toUpperCase()) ? ("completed" as const) : ("upcoming" as const),
    },
    {
      title: "Delivered",
      description: "Handed over to customer with confirmation signature.",
      status: order.status?.toUpperCase() === "DELIVERED" ? ("completed" as const) : ("upcoming" as const),
    },
  ];

  return {
    id: order.id, // Must keep real DB UUID so updateStatus works
    date,
    status,
    customerName,
    customerPhone: order.customer?.phone || "—",
    customerEmail: order.customer?.email || "—",
    shippingAddress,
    billingAddress,
    items,
    payment: {
      method: "Razorpay / Online",
      status: order.paymentStatus,
      subtotal: `₹${Number(order.subtotal || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      shipping: `₹${Number(order.shippingCharge || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      tax: `₹${Number(order.taxTotal || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      discount: `₹${Number(order.discountAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      grandTotal: `₹${Number(order.total || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
    },
    stockDeductionStatus: isDeducted ? "Completed" : "Pending",
    stockDeductedQty: totalDeductedQty,
    timeline,
  };
}

// ----- Admin: all orders -----
export async function getOrders(): Promise<AdminOrder[]> {
  try {
    const data = await apiFetch<any[]>("/api/orders");
    return (data ?? []).map(mapBackendOrderToAdminOrder);
  } catch {
    return [];
  }
}

export async function getOrderById(id: string): Promise<AdminOrderDetails | undefined> {
  try {
    const data = await apiFetch<any>(`/api/orders/${id}`);
    return data ? mapBackendOrderToAdminOrderDetails(data) : undefined;
  } catch {
    return undefined;
  }
}

export async function updateOrderStatus(id: string, status: string): Promise<AdminOrder> {
  // Map friendly StatusType name back to database expected uppercase status
  const databaseStatusMap: Record<string, string> = {
    "Pending Payment": "PENDING_PAYMENT",
    "Confirmed": "CONFIRMED",
    "Processing": "PROCESSING",
    "Packed": "PACKED",
    "Shipped": "SHIPPED",
    "Delivered": "DELIVERED",
    "Cancelled": "CANCELLED",
    "Returned": "RETURNED",
  };
  const dbStatus = databaseStatusMap[status] || status.toUpperCase();

  const data = await apiFetch<any>(`/api/orders/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status: dbStatus }),
  });
  return mapBackendOrderToAdminOrder(data);
}

// ----- Customer: own orders -----
export async function getMyOrders(): Promise<AdminOrder[]> {
  try {
    const data = await apiFetch<AdminOrder[]>("/api/orders/my");
    return data ?? [];
  } catch {
    return [];
  }
}

export async function placeOrder(payload: {
  customerId?: string;
  subtotal: number;
  taxTotal: number;
  shippingCharge?: number;
  discountAmount?: number;
  total: number;
  shippingAddress: object;
  billingAddress: object;
  notes?: string;
  items: {
    productId: string;
    variantId?: string;
    name: string;
    sku: string;
    variantName?: string;
    quantity: number;
    price: number;
  }[];
}): Promise<{ id: string; orderNumber: string }> {
  return apiFetch("/api/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ----- Customers list -----
export async function getCustomers(): Promise<AdminCustomer[]> {
  try {
    const data = await apiFetch<AdminCustomer[]>("/api/customers");
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getCustomerById(id: string): Promise<AdminCustomer | undefined> {
  try {
    return await apiFetch<AdminCustomer>(`/api/customers/${id}`);
  } catch {
    return undefined;
  }
}
