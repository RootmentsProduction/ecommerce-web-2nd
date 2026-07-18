import { apiFetch } from "@/services/api";
import { PurchaseOrder } from "@/types/purchase-order";


export interface ReceivePOPayload {
  receivedBy: string;
  notes?: string;
  items: { sku: string; quantityReceived: number }[];
}

export async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
  try {
    const data = await apiFetch<PurchaseOrder[]>("/api/purchase-orders");
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getPurchaseOrderById(id: string): Promise<PurchaseOrder | undefined> {
  try {
    return await apiFetch<PurchaseOrder>(`/api/purchase-orders/${id}`);
  } catch {
    return undefined;
  }
}

export async function createPurchaseOrder(payload: Omit<PurchaseOrder, "id">): Promise<PurchaseOrder> {
  return apiFetch<PurchaseOrder>("/api/purchase-orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updatePurchaseOrder(
  id: string,
  payload: Partial<PurchaseOrder>
): Promise<PurchaseOrder> {
  return apiFetch<PurchaseOrder>(`/api/purchase-orders/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function updatePurchaseOrderStatus(
  id: string,
  status: string
): Promise<PurchaseOrder> {
  return apiFetch<PurchaseOrder>(`/api/purchase-orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function receivePurchaseOrderItems(
  id: string,
  payload: ReceivePOPayload
): Promise<{ receiptId: string; status: string }> {
  return apiFetch(`/api/purchase-orders/${id}/receive`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
