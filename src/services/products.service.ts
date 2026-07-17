import { Product } from "@/types/product";
import { AdminProduct, AdminProductFormData } from "@/types/admin";
import { apiFetch } from "@/services/api";

// ----- Public storefront -----
export async function getProducts(params?: {
  category?: string;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  search?: string;
}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.featured) query.set("featured", "true");
  if (params?.bestSeller) query.set("bestSeller", "true");
  if (params?.newArrival) query.set("newArrival", "true");
  if (params?.search) query.set("search", params.search);

  try {
    const data = await apiFetch<Product[]>(`/api/products?${query.toString()}`);
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    return await apiFetch<Product>(`/api/products/${slug}`);
  } catch {
    return undefined;
  }
}

// ----- Admin CRUD -----
export async function getAdminProducts(params?: {
  category?: string;
  search?: string;
}): Promise<AdminProduct[]> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.search) query.set("search", params.search);

  try {
    const data = await apiFetch<AdminProduct[]>(`/api/products/admin?${query.toString()}`);
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getAdminProductById(id: string): Promise<AdminProductFormData | undefined> {
  try {
    return await apiFetch<AdminProductFormData>(`/api/products/${id}`);
  } catch {
    return undefined;
  }
}

export async function createProduct(payload: AdminProductFormData): Promise<AdminProduct> {
  return apiFetch<AdminProduct>("/api/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateProduct(
  id: string,
  payload: Partial<AdminProductFormData>
): Promise<AdminProduct> {
  return apiFetch<AdminProduct>(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function archiveProduct(id: string): Promise<void> {
  await apiFetch<void>(`/api/products/${id}`, { method: "DELETE" });
}

// Backward-compat alias used by inventory pages
export const getAdminProductBySku = getAdminProductById;
