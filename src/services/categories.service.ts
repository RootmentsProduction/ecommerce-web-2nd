import { Category } from "@/types/category";
import { AdminCategory } from "@/types/admin";
import { categoriesFixture, adminCategoriesFixture } from "@/data/fixtures/categories";

export async function getCategories(): Promise<Category[]> {
  return categoriesFixture;
}

export async function getAdminCategories(): Promise<AdminCategory[]> {
  return adminCategoriesFixture;
}
