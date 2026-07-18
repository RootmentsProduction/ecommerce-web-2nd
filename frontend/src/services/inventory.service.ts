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

export interface BackendStockTransaction {
  id: string;
  date: string;
  type: string;
  quantity: number;
  beforeStock: number;
  afterStock: number;
  reason: string;
  reference?: string | null;
  changedBy: string;
  productId: string;
  productName: string;
  variantName?: string | null;
  sku: string;
}

export function mapBackendStockTransaction(t: BackendStockTransaction): StockTransaction {
  let transactionType: StockTransaction["transactionType"] = "Manual Correction";
  if (t.type === "OPENING_STOCK") {
    transactionType = "Opening Stock";
  } else if (t.type === "STOCK_ADDED") {
    transactionType = "Stock Added";
  } else if (t.type === "CUSTOMER_SALE") {
    transactionType = "Customer Sale";
  } else if (t.type === "DAMAGED_ITEM") {
    transactionType = "Damaged Item";
  } else if (t.type === "CUSTOMER_RETURN") {
    transactionType = "Customer Return";
  } else if (t.type === "MANUAL_CORRECTION") {
    transactionType = "Manual Correction";
  }

  const change = t.quantity >= 0 ? `+${t.quantity}` : `${t.quantity}`;

  return {
    id: t.id,
    date: new Date(t.date).toLocaleString(),
    productId: t.productId,
    productName: t.productName,
    sku: t.sku,
    variant: t.variantName || undefined,
    change,
    before: t.beforeStock,
    after: t.afterStock,
    reason: t.reason,
    reference: t.reference || "—",
    changedBy: t.changedBy,
    transactionType,
    isAutomatic: t.changedBy.toLowerCase().includes("system"),
  };
}

// ----- Transaction history -----
export async function getStockTransactions(sku?: string): Promise<StockTransaction[]> {
  try {
    const data = await apiFetch<BackendStockTransaction[]>("/api/inventory/transactions");
    if (!data) return [];
    const mapped = data.map(mapBackendStockTransaction);
    if (sku) {
      const cleanSku = sku.replace("#", "").trim();
      return mapped.filter((tx) => tx.sku && tx.sku.replace("#", "").trim() === cleanSku);
    }
    return mapped;
  } catch {
    return [];
  }
}
