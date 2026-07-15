import { AdminInventoryItem, InventoryDetails, StatusType, StockTransaction } from "@/types/admin";
import { adminProductsDetailFixture } from "@/data/fixtures/products";
import { adminInventoryTransactionsFixture } from "@/data/fixtures/stock-transactions";

export async function getInventoryItems(): Promise<AdminInventoryItem[]> {
  // Derive inventory list from products source of truth
  return Object.values(adminProductsDetailFixture).map((p) => {
    const currentStock = p.variants?.length > 0
      ? p.variants.reduce((sum, v) => sum + v.stock, 0)
      : p.initialStock;

    let status = "In Stock";
    if (currentStock === 0) {
      status = "Out of Stock";
    } else if (currentStock <= p.minStock) {
      status = "Low Stock";
    }

    return {
      sku: p.sku,
      name: p.name,
      category: p.category,
      currentStock,
      minRequired: p.minStock,
      status: status as StatusType,
    };
  });
}

export async function getInventoryBySku(sku: string): Promise<InventoryDetails | undefined> {
  const cleanSku = sku.replace("#", "").trim();
  const product = adminProductsDetailFixture[cleanSku];
  if (!product) return undefined;

  const currentStock = product.variants?.length > 0
    ? product.variants.reduce((sum, v) => sum + v.stock, 0)
    : product.initialStock;

  const reservedStock = product.variants?.length > 0
    ? Math.round(currentStock * 0.15) || 1
    : 2;

  const availableStock = currentStock > reservedStock ? currentStock - reservedStock : 0;
  const incomingStock = currentStock <= product.minStock ? 15 : 0;

  return {
    productId: product.sku,
    productName: product.name,
    sku: product.sku,
    category: product.category,
    image: product.media[0]?.url,
    currentStock,
    minRequired: product.minStock,
    availableStock,
    reservedStock,
    incomingStock,
    status: product.status === "Active" ? "Active" : "Draft",
    variantsStock: product.variants,
  };
}

export async function getStockTransactions(sku?: string): Promise<StockTransaction[]> {
  if (sku) {
    const cleanSku = sku.replace("#", "").trim();
    return adminInventoryTransactionsFixture.filter(
      (tx) => tx.sku.replace("#", "").trim() === cleanSku
    );
  }
  return adminInventoryTransactionsFixture;
}
