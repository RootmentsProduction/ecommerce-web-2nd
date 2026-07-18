import { AdminOrder, AdminOrderDetails, AdminCustomer } from "@/types/admin";
import { apiFetch } from "@/services/api";

// ----- Admin: all orders -----
export async function getOrders(): Promise<AdminOrder[]> {
  try {
    const data = await apiFetch<AdminOrder[]>("/api/orders");
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getOrderById(id: string): Promise<AdminOrderDetails | undefined> {
  try {
    return await apiFetch<AdminOrderDetails>(`/api/orders/${id}`);
  } catch {
    return undefined;
  }
}

export async function updateOrderStatus(id: string, status: string): Promise<AdminOrder> {
  return apiFetch<AdminOrder>(`/api/orders/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
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
