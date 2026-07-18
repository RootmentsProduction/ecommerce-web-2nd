import { Category } from "@/types/category";
import { AdminCategory } from "@/types/admin";
import { apiFetch } from "@/services/api";

// ----- Public storefront -----
export async function getCategories(): Promise<Category[]> {
  try {
    const data = await apiFetch<Category[]>("/api/categories", { cache: "no-store" });
    return data ?? [];
  } catch {
    return [];
  }
}

// ----- Admin CRUD -----
export async function getAdminCategories(): Promise<AdminCategory[]> {
  try {
    const data = await apiFetch<AdminCategory[]>("/api/categories/admin");
    return data ?? [];
  } catch {
    return [];
  }
}

export async function createCategory(
  payload: Omit<AdminCategory, "id" | "productCount">
): Promise<AdminCategory> {
  return apiFetch<AdminCategory>("/api/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateCategory(
  id: string,
  payload: Partial<AdminCategory>
): Promise<AdminCategory> {
  return apiFetch<AdminCategory>(`/api/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteCategory(id: string): Promise<void> {
  await apiFetch<void>(`/api/categories/${id}`, { method: "DELETE" });
}
