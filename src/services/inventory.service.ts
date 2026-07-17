import { AdminInventoryItem, InventoryDetails, StockTransaction } from "@/types/admin";
import { apiFetch } from "@/services/api";

// ----- Admin inventory levels -----
export async function getInventoryItems(): Promise<AdminInventoryItem[]> {
  try {
    const data = await apiFetch<AdminInventoryItem[]>("/api/inventory");
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getInventoryById(id: string): Promise<InventoryDetails | undefined> {
  try {
    return await apiFetch<InventoryDetails>(`/api/inventory/${id}`);
  } catch {
    return undefined;
  }
}

// ----- Manual stock adjustments -----
export interface AdjustStockPayload {
  productId?: string;
  variantId?: string;
  type: string;
  quantity: number;
  reason: string;
}

export async function adjustStock(payload: AdjustStockPayload): Promise<{
  inventoryId: string;
  beforeStock: number;
  afterStock: number;
}> {
  return apiFetch("/api/inventory/adjust", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ----- Transaction history -----
export async function getStockTransactions(sku?: string): Promise<StockTransaction[]> {
  try {
    const data = await apiFetch<StockTransaction[]>("/api/inventory/transactions");
    if (!data) return [];
    if (sku) {
      const cleanSku = sku.replace("#", "").trim();
      return data.filter((tx) => tx.sku && tx.sku.replace("#", "").trim() === cleanSku);
    }
    return data;
  } catch {
    return [];
  }
}
