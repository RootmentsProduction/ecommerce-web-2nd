import { Product } from "@/types/product";
import { AdminProduct, AdminProductFormData } from "@/types/admin";
import { productsFixture, adminProductsFixture, adminProductsDetailFixture } from "@/data/fixtures/products";

export async function getProducts(): Promise<Product[]> {
  // Simulates upcoming backend API fetch
  return productsFixture;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getAdminProducts(): Promise<AdminProduct[]> {
  return adminProductsFixture;
}

export async function getAdminProductBySku(sku: string): Promise<AdminProductFormData | undefined> {
  const cleanSku = sku.replace("#", "").trim();
  return adminProductsDetailFixture[cleanSku] || adminProductsDetailFixture["SKU-001"];
}
