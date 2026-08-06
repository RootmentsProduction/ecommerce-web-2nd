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

const FALLBACK_CRAFTS_PRODUCTS: Product[] = [
  // 1. Plush Toys
  {
    id: "craft-prod-1",
    title: "Fluffy Teddy Bear Plushie",
    name: "Fluffy Teddy Bear Plushie",
    slug: "fluffy-teddy-bear-plushie",
    price: 1499,
    mrp: 1899,
    discount: 21,
    images: ["/crafts/plush_teddy_bear.png"],
    productImages: [{ id: "img-1", url: "/crafts/plush_teddy_bear.png", imageRole: "PRIMARY", isPrimary: true, sortOrder: 0, altText: "Teddy Bear" }],
    primaryImage: "/crafts/plush_teddy_bear.png",
    hoverImage: null,
    galleryImages: [],
    category: "Plush Toys",
    rating: 5.0,
    reviewCount: 24,
    description: "Cute plush teddy bear handcrafted with ultra-soft cotton fabric.",
    highlights: ["Handcrafted", "Non-toxic", "Machine washable"],
    attributes: [],
    occasion: ["Everyday"],
    gender: "Unisex",
    isBestSeller: true,
    isNewArrival: true,
    stock: 25,
    sku: "PLUSH-TEDDY-01",
    variants: [],
  },
  // 2. Keychains
  {
    id: "craft-prod-2",
    title: "Knitted Sweater Bear Keychain",
    name: "Knitted Sweater Bear Keychain",
    slug: "knitted-sweater-bear-keychain",
    price: 499,
    mrp: 699,
    discount: 28,
    images: ["/crafts/bear_keychain.png"],
    productImages: [{ id: "img-2", url: "/crafts/bear_keychain.png", imageRole: "PRIMARY", isPrimary: true, sortOrder: 0, altText: "Bear Keychain" }],
    primaryImage: "/crafts/bear_keychain.png",
    hoverImage: null,
    galleryImages: [],
    category: "Keychains",
    rating: 4.9,
    reviewCount: 18,
    description: "Handmade brown plush bear keychain with cute knitted mini sweater.",
    highlights: ["Stainless key ring", "Handmade sweater"],
    attributes: [],
    occasion: ["Everyday"],
    gender: "Unisex",
    isBestSeller: true,
    isNewArrival: true,
    stock: 30,
    sku: "KEYCHAIN-BEAR-02",
    variants: [],
  },
  // 3. Stationery
  {
    id: "craft-prod-3",
    title: "Pastel Aesthetic Gel Pen & Journal Set",
    name: "Pastel Aesthetic Gel Pen & Journal Set",
    slug: "pastel-aesthetic-journal-set",
    price: 899,
    mrp: 1199,
    discount: 25,
    images: ["/crafts/cat_stationaries.png"],
    productImages: [{ id: "img-3", url: "/crafts/cat_stationaries.png", imageRole: "PRIMARY", isPrimary: true, sortOrder: 0, altText: "Stationery Set" }],
    primaryImage: "/crafts/cat_stationaries.png",
    hoverImage: null,
    galleryImages: [],
    category: "Stationery",
    rating: 4.8,
    reviewCount: 31,
    description: "Charming pastel gel pen set with hardbound aesthetic linen diary.",
    highlights: ["Smooth ink", "100 GSM cream pages"],
    attributes: [],
    occasion: ["Gifting"],
    gender: "Unisex",
    isBestSeller: true,
    isNewArrival: true,
    stock: 50,
    sku: "STAT-JOURNAL-03",
    variants: [],
  },
  // 4. Art & Craft
  {
    id: "craft-prod-4",
    title: "DIY Crochet Animal Starter Kit",
    name: "DIY Crochet Animal Starter Kit",
    slug: "diy-crochet-animal-kit",
    price: 1299,
    mrp: 1699,
    discount: 23,
    images: ["/crafts/cat_stationaries.png"],
    productImages: [{ id: "img-4", url: "/crafts/cat_stationaries.png", imageRole: "PRIMARY", isPrimary: true, sortOrder: 0, altText: "Crochet Kit" }],
    primaryImage: "/crafts/cat_stationaries.png",
    hoverImage: null,
    galleryImages: [],
    category: "Art & Craft",
    rating: 5.0,
    reviewCount: 14,
    description: "Beginner-friendly DIY kit with colorful yarn, crochet hooks, and video guide.",
    highlights: ["All materials included", "Step-by-step tutorial"],
    attributes: [],
    occasion: ["Everyday"],
    gender: "Unisex",
    isBestSeller: false,
    isNewArrival: true,
    stock: 20,
    sku: "CRAFT-CROCHET-04",
    variants: [],
  },
  // 5. Hair Accessories
  {
    id: "craft-prod-5",
    title: "Pastel Flower Hairpin & Scrunchie Pack",
    name: "Pastel Flower Hairpin & Scrunchie Pack",
    slug: "pastel-flower-hairpin-pack",
    price: 599,
    mrp: 799,
    discount: 25,
    images: ["/crafts/teething_ring_toy.png"],
    productImages: [{ id: "img-5", url: "/crafts/teething_ring_toy.png", imageRole: "PRIMARY", isPrimary: true, sortOrder: 0, altText: "Hair Accessories" }],
    primaryImage: "/crafts/teething_ring_toy.png",
    hoverImage: null,
    galleryImages: [],
    category: "Hair Accessories",
    rating: 4.9,
    reviewCount: 42,
    description: "Set of 5 handmade velvet flower hair clips and soft silk scrunchies.",
    highlights: ["Soft elastic", "Gentle on hair"],
    attributes: [],
    occasion: ["Everyday"],
    gender: "Unisex",
    isBestSeller: true,
    isNewArrival: false,
    stock: 60,
    sku: "HAIR-FLOWER-05",
    variants: [],
  },
  // 6. Bags & Pouches
  {
    id: "craft-prod-6",
    title: "Embroidered Canvas Bear Pencil Pouch",
    name: "Embroidered Canvas Bear Pencil Pouch",
    slug: "embroidered-bear-canvas-pouch",
    price: 799,
    mrp: 999,
    discount: 20,
    images: ["/crafts/bear_keychain.png"],
    productImages: [{ id: "img-6", url: "/crafts/bear_keychain.png", imageRole: "PRIMARY", isPrimary: true, sortOrder: 0, altText: "Pouch" }],
    primaryImage: "/crafts/bear_keychain.png",
    hoverImage: null,
    galleryImages: [],
    category: "Bags & Pouches",
    rating: 4.7,
    reviewCount: 19,
    description: "Durable cotton canvas zip pouch with cute embroidered bear design.",
    highlights: ["Multi-compartment", "Washable canvas"],
    attributes: [],
    occasion: ["Everyday"],
    gender: "Unisex",
    isBestSeller: false,
    isNewArrival: true,
    stock: 35,
    sku: "BAG-POUCH-06",
    variants: [],
  },
  // 7. Drinkware
  {
    id: "craft-prod-7",
    title: "Handmade Ceramic Bunny Mug with Lid",
    name: "Handmade Ceramic Bunny Mug with Lid",
    slug: "handmade-ceramic-bunny-mug",
    price: 1199,
    mrp: 1499,
    discount: 20,
    images: ["/crafts/plush_rocking_horse.png"],
    productImages: [{ id: "img-7", url: "/crafts/plush_rocking_horse.png", imageRole: "PRIMARY", isPrimary: true, sortOrder: 0, altText: "Bunny Mug" }],
    primaryImage: "/crafts/plush_rocking_horse.png",
    hoverImage: null,
    galleryImages: [],
    category: "Drinkware",
    rating: 5.0,
    reviewCount: 27,
    description: "Handcrafted 350ml ceramic coffee mug with matching lid and spoon.",
    highlights: ["Microwave safe", "Hand-painted ceramic"],
    attributes: [],
    occasion: ["Gifting"],
    gender: "Unisex",
    isBestSeller: true,
    isNewArrival: true,
    stock: 15,
    sku: "DRINK-MUG-07",
    variants: [],
  },
  // 8. Home & Living
  {
    id: "craft-prod-8",
    title: "Hand-poured Botanical Scented Candle",
    name: "Hand-poured Botanical Scented Candle",
    slug: "botanical-scented-candle",
    price: 999,
    mrp: 1299,
    discount: 23,
    images: ["/crafts/cat_home_living.png"],
    productImages: [{ id: "img-8", url: "/crafts/cat_home_living.png", imageRole: "PRIMARY", isPrimary: true, sortOrder: 0, altText: "Candle" }],
    primaryImage: "/crafts/cat_home_living.png",
    hoverImage: null,
    galleryImages: [],
    category: "Home & Living",
    rating: 4.9,
    reviewCount: 35,
    description: "100% natural soy wax candle infused with lavender and dried flower petals.",
    highlights: ["40-hour burn time", "Natural soy wax"],
    attributes: [],
    occasion: ["Everyday"],
    gender: "Unisex",
    isBestSeller: true,
    isNewArrival: false,
    stock: 22,
    sku: "HOME-CANDLE-08",
    variants: [],
  },
  // 9. Gifting
  {
    id: "craft-prod-9",
    title: "Luxury Handmade Craft & Plush Gift Box",
    name: "Luxury Handmade Craft & Plush Gift Box",
    slug: "handmade-craft-gift-box",
    price: 2499,
    mrp: 2999,
    discount: 16,
    images: ["/crafts/hero_stacking_toy.png"],
    productImages: [{ id: "img-9", url: "/crafts/hero_stacking_toy.png", imageRole: "PRIMARY", isPrimary: true, sortOrder: 0, altText: "Gift Box" }],
    primaryImage: "/crafts/hero_stacking_toy.png",
    hoverImage: null,
    galleryImages: [],
    category: "Gifting",
    rating: 5.0,
    reviewCount: 16,
    description: "Curated aesthetic gift box containing plushie, scented candle, journal, and greeting card.",
    highlights: ["Gift wrapped", "Customizable message"],
    attributes: [],
    occasion: ["Gifting"],
    gender: "Unisex",
    isBestSeller: true,
    isNewArrival: true,
    stock: 12,
    sku: "GIFT-BOX-09",
    variants: [],
  },
];

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
      const mapped = (data.products as BackendProductResponse[]).map(mapBackendProduct);
      return mapped.length > 0 ? mapped : FALLBACK_CRAFTS_PRODUCTS;
    }
    if (Array.isArray(data)) {
      const mapped = data.map(mapBackendProduct);
      return mapped.length > 0 ? mapped : FALLBACK_CRAFTS_PRODUCTS;
    }
    return FALLBACK_CRAFTS_PRODUCTS;
  } catch {
    return FALLBACK_CRAFTS_PRODUCTS;
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

  const filterFallback = (products: Product[]) => {
    if (!params) return products;
    let filtered = products;

    if (params.category) {
      const catQuery = params.category.toLowerCase().replace(/-/g, ' ');
      const matches = filtered.filter(p => {
        const catName = p.category.toLowerCase().replace(/-/g, ' ');
        return catName.includes(catQuery) || catQuery.includes(catName);
      });
      if (matches.length > 0) {
        filtered = matches;
      }
    }

    if (params.search) {
      const s = params.search.toLowerCase();
      const matches = filtered.filter(p => p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
      if (matches.length > 0) {
        filtered = matches;
      }
    }

    return filtered;
  };

  try {
    const data = await apiFetch<Record<string, unknown> | BackendProductResponse[]>(`/api/products?${query.toString()}`, {
      cache: "no-store",
    });
    if (data && typeof data === "object" && "products" in data) {
      const mapped = (data.products as BackendProductResponse[]).map(mapBackendProduct);
      if (mapped.length > 0) {
        return {
          products: mapped,
          total: Number(data.total),
          page: Number(data.page),
          limit: Number(data.limit),
          totalPages: Number(data.totalPages),
        };
      }
    }
    if (Array.isArray(data) && data.length > 0) {
      const mapped = data.map(mapBackendProduct);
      return {
        products: mapped,
        total: mapped.length,
        page: 1,
        limit: mapped.length,
        totalPages: 1,
      };
    }
    const filtered = filterFallback(FALLBACK_CRAFTS_PRODUCTS);
    return { products: filtered, total: filtered.length, page: 1, limit: 12, totalPages: 1 };
  } catch {
    const filtered = filterFallback(FALLBACK_CRAFTS_PRODUCTS);
    return { products: filtered, total: filtered.length, page: 1, limit: 12, totalPages: 1 };
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
  const fallbackMeta: FilterMetadata = {
    categories: [
      { id: 'cat-1', name: 'Stationery', slug: 'stationery', count: 5 },
      { id: 'cat-2', name: 'Art & Craft', slug: 'art-craft', count: 4 },
      { id: 'cat-3', name: 'Drinkware', slug: 'drinkware', count: 6 },
      { id: 'cat-4', name: 'Hair Accessories', slug: 'hair-accessories', count: 8 },
      { id: 'cat-5', name: 'Bags & Pouches', slug: 'bags-pouches', count: 7 },
      { id: 'cat-6', name: 'Plush Toys', slug: 'plush-toys', count: 12 },
      { id: 'cat-7', name: 'Keychains', slug: 'keychains', count: 9 },
      { id: 'cat-8', name: 'Home & Living', slug: 'home-living', count: 5 },
      { id: 'cat-9', name: 'Gifting', slug: 'gifting', count: 10 },
    ],
    price: { min: 499, max: 2999 },
    occasions: [{ value: 'Everyday', count: 8 }, { value: 'Gifting', count: 5 }],
    genders: [{ value: 'Unisex', count: 12 }],
    purities: [],
    brands: [],
    availability: { inStock: 9, outOfStock: 0 },
  };

  try {
    const data = await apiFetch<FilterMetadata>("/api/products/filters", {
      cache: "no-store",
    });
    return (data && data.categories && data.categories.length > 0) ? data : fallbackMeta;
  } catch {
    return fallbackMeta;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const data = await apiFetch<BackendProductResponse>(`/api/products/${slug}`, {
      cache: "no-store",
    });
    if (data) return mapBackendProduct(data);
  } catch {
    // API unreachable or not found on backend, fall back below
  }
  
  // Search fallback products by slug, ID, or slugified title
  return FALLBACK_CRAFTS_PRODUCTS.find(
    (p) => p.slug === slug || p.id === slug || p.slug === slug.toLowerCase()
  );
}

// ----- Admin CRUD -----
export async function getAdminProducts(params?: {
  category?: string;
  search?: string;
  status?: string;
}): Promise<AdminProduct[]> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.search) query.set("search", params.search);
  if (params?.status) query.set("status", params.status);

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

export async function permanentDeleteProduct(id: string): Promise<void> {
  await apiFetch<void>(`/api/products/${id}/permanent`, { method: "DELETE" });
}

// Backward-compat alias used by inventory pages
export const getAdminProductBySku = getAdminProductById;
