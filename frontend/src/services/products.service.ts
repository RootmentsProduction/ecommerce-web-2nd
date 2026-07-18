import { Product, BackendProductResponse, BackendProductImage } from "@/types/product";
import { AdminProduct, AdminProductFormData } from "@/types/admin";
import { apiFetch } from "@/services/api";

// ----- Helpers & Mappers -----
export function mapBackendProduct(p: BackendProductResponse): Product {
  const price = p.sellingPrice ? Number(p.sellingPrice) : 0;
  const mrp = p.mrp ? Number(p.mrp) : price;
  const discount = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

  // Extract / cast images array
  const rawImages = p.images || [];
  
  // Format to BackendProductImage format
  const productImages: BackendProductImage[] = rawImages.map((img) => ({
    id: img.id,
    url: img.url,
    imageRole: (img.imageRole || (img.isPrimary ? "PRIMARY" : "GALLERY")) as 'PRIMARY' | 'HOVER' | 'GALLERY',
    isPrimary: img.imageRole === "PRIMARY" || img.isPrimary,
    sortOrder: img.sortOrder || 0,
    altText: img.altText || "",
  }));

  // Find primary image
  const primaryImgObj = productImages.find((img) => img.imageRole === "PRIMARY");
  const primaryImage = primaryImgObj ? primaryImgObj.url : (productImages[0]?.url || "/placeholder.png");

  // Find hover image
  const hoverImgObj = productImages.find((img) => img.imageRole === "HOVER");
  const hoverImage = hoverImgObj ? hoverImgObj.url : (productImages[1]?.url || null);

  // Gallery images are everything else
  const galleryImages = productImages
    .filter((img) => img.imageRole !== "PRIMARY" && img.imageRole !== "HOVER")
    .map((img) => img.url);

  // For compatibility images array (sorted by primary, then hover, then gallery)
  const compatibilityImages: string[] = [];
  if (primaryImgObj) compatibilityImages.push(primaryImgObj.url);
  if (hoverImgObj) compatibilityImages.push(hoverImgObj.url);
  productImages.forEach((img) => {
    if (img.imageRole !== "PRIMARY" && img.imageRole !== "HOVER") {
      compatibilityImages.push(img.url);
    }
  });

  if (compatibilityImages.length === 0 && productImages.length > 0) {
    compatibilityImages.push(productImages[0].url);
  }
  if (compatibilityImages.length === 0) {
    compatibilityImages.push("/placeholder.png");
  }

  return {
    id: p.id,
    title: p.name,
    slug: p.slug,
    price,
    mrp,
    discount,
    images: compatibilityImages,
    productImages,
    primaryImage,
    hoverImage,
    galleryImages,
    category: p.category?.name || "",
    rating: 5.0,
    reviewCount: 0,
    description: p.description || "",
    highlights: [],
    attributes: [],
    occasion: p.occasion ? [p.occasion] : ["Everyday"],
    gender: (p.gender as 'Women' | 'Men' | 'Unisex') || "Unisex",
    isBestSeller: p.bestSeller || false,
    isNewArrival: p.newArrival || false,
    stock: p.inventory?.currentStock ?? 0,
    sku: p.sku,
    variants: p.variants || [],
    name: p.name,
  };
}

export function mapBackendProductToAdminFormData(data: BackendProductResponse): AdminProductFormData {
  return {
    id: data.id,
    name: data.name,
    sku: data.sku,
    slug: data.slug,
    shortDescription: data.shortDescription || "",
    description: data.description || "",
    category: data.categoryId || "", // Category ID
    gender: data.gender || "Unisex",
    occasion: data.occasion || "Everyday",
    material: data.material || "Gold",
    sellingPrice: data.sellingPrice?.toString() || "",
    mrp: data.mrp?.toString() || "",
    discountPercent: data.discountPercent || 0,
    taxCategory: data.taxCategory || "GST 3%",
    costPrice: data.costPrice?.toString() || "",
    trackInventory: data.inventory ? true : false,
    initialStock: data.inventory?.currentStock ?? 0,
    minStock: data.inventory?.minimumRequired ?? 0,
    allowBackorder: data.allowBackorder || false,
    status: data.status === "ACTIVE" ? "Active" : data.status === "ARCHIVED" ? "Archived" : "Draft",
    isFeatured: data.featured || false,
    isNewArrival: data.newArrival || false,
    isBestSeller: data.bestSeller || false,
    showOnHomepage: data.showOnHomepage || false,
    publishDate: data.publishDate || "",
    media: (data.images || []).map((img) => ({
      id: img.id,
      url: img.url,
      isPrimary: img.imageRole === "PRIMARY" || img.isPrimary,
      imageRole: img.imageRole || "GALLERY",
      altText: img.altText || "",
    })),
    variants: (data.variants || []).map((v) => ({
      id: v.id,
      name: v.name,
      sku: v.sku,
      price: v.sellingPrice?.toString() || "",
      stock: v.inventory?.currentStock ?? 0,
      status: v.isActive ? "Active" : "Hidden",
    })),
  };
}

export function mapBackendProductToAdminProduct(p: BackendProductResponse): AdminProduct {
  const currentStock = p.inventory?.currentStock ?? 0;
  
  let stockStatus: "In Stock" | "Low Stock" | "Out of Stock" = "In Stock";
  if (currentStock === 0) {
    stockStatus = "Out of Stock";
  } else if (currentStock <= 5) {
    stockStatus = "Low Stock";
  }
  
  let publicationStatus: "Active" | "Draft" | "Archived" = "Draft";
  if (p.status === "ACTIVE" || p.status === "Active") {
    publicationStatus = "Active";
  } else if (p.status === "ARCHIVED" || p.status === "Archived") {
    publicationStatus = "Archived";
  }
  
  const primaryImgObj = p.images?.find((img) => img.imageRole === "PRIMARY" || img.isPrimary);
  const image = primaryImgObj ? primaryImgObj.url : (p.images?.[0]?.url || undefined);

  return {
    id: p.id,
    sku: p.sku,
    name: p.name,
    category: p.category?.name || "Uncategorized",
    price: p.sellingPrice ? p.sellingPrice.toString() : "0",
    stock: currentStock,
    stockStatus,
    publicationStatus,
    image,
  };
}

// ----- Public storefront -----
export interface GetProductsParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  occasion?: string;
  gender?: string;
  inStock?: boolean;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  newArrival?: boolean;
  bestSeller?: boolean;
  featured?: boolean;
}

export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, String(value));
      }
    });
  }

  try {
    const data = await apiFetch<Record<string, unknown> | BackendProductResponse[]>(`/api/products?${query.toString()}`, {
      cache: "no-store",
    });
    if (data && typeof data === "object" && "products" in data) {
      return (data.products as BackendProductResponse[]).map(mapBackendProduct);
    }
    if (Array.isArray(data)) {
      return data.map(mapBackendProduct);
    }
    return [];
  } catch {
    return [];
  }
}

export interface PaginatedProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getProductsPaginated(params?: GetProductsParams): Promise<PaginatedProductsResponse> {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, String(value));
      }
    });
  }

  try {
    const data = await apiFetch<Record<string, unknown> | BackendProductResponse[]>(`/api/products?${query.toString()}`, {
      cache: "no-store",
    });
    if (data && typeof data === "object" && "products" in data) {
      return {
        products: (data.products as BackendProductResponse[]).map(mapBackendProduct),
        total: Number(data.total),
        page: Number(data.page),
        limit: Number(data.limit),
        totalPages: Number(data.totalPages),
      };
    }
    if (Array.isArray(data)) {
      const mapped = data.map(mapBackendProduct);
      return {
        products: mapped,
        total: mapped.length,
        page: 1,
        limit: mapped.length,
        totalPages: 1,
      };
    }
    return { products: [], total: 0, page: 1, limit: 12, totalPages: 1 };
  } catch {
    return { products: [], total: 0, page: 1, limit: 12, totalPages: 1 };
  }
}

export interface FilterCategoryMetadata {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface FilterValueMetadata {
  value: string;
  count: number;
}

export interface FilterMetadata {
  categories: FilterCategoryMetadata[];
  price: {
    min: number;
    max: number;
  };
  occasions: FilterValueMetadata[];
  genders: FilterValueMetadata[];
  purities: FilterValueMetadata[];
  brands: FilterValueMetadata[];
  availability: {
    inStock: number;
    outOfStock: number;
  };
}

export async function getFilterMetadata(): Promise<FilterMetadata> {
  try {
    const data = await apiFetch<FilterMetadata>("/api/products/filters", {
      cache: "no-store",
    });
    return data ?? {
      categories: [],
      price: { min: 0, max: 0 },
      occasions: [],
      genders: [],
      purities: [],
      brands: [],
      availability: { inStock: 0, outOfStock: 0 },
    };
  } catch {
    return {
      categories: [],
      price: { min: 0, max: 0 },
      occasions: [],
      genders: [],
      purities: [],
      brands: [],
      availability: { inStock: 0, outOfStock: 0 },
    };
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const data = await apiFetch<BackendProductResponse>(`/api/products/${slug}`, {
      cache: "no-store",
    });
    return data ? mapBackendProduct(data) : undefined;
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
    const data = await apiFetch<BackendProductResponse[]>(`/api/products/admin?${query.toString()}`);
    return (data ?? []).map(mapBackendProductToAdminProduct);
  } catch {
    return [];
  }
}

export async function getAdminProductById(id: string): Promise<AdminProductFormData | undefined> {
  try {
    const data = await apiFetch<BackendProductResponse>(`/api/products/${id}`);
    return data ? mapBackendProductToAdminFormData(data) : undefined;
  } catch {
    return undefined;
  }
}

export async function createProduct(payload: unknown): Promise<AdminProduct> {
  return apiFetch<AdminProduct>("/api/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateProduct(
  id: string,
  payload: unknown
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
