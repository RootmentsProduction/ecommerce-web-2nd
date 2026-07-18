export interface ProductAttribute {
  name: string;
  value: string;
}

export interface BackendProductImage {
  id: string;
  url: string;
  imageRole: 'PRIMARY' | 'HOVER' | 'GALLERY';
  isPrimary: boolean;
  sortOrder: number;
  altText?: string;
}

export interface BackendProductResponse {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription?: string | null;
  description?: string | null;
  sellingPrice: string | number;
  mrp?: string | number | null;
  costPrice?: string | number | null;
  status: string;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  showOnHomepage?: boolean;
  images?: BackendProductImage[];
  category?: { name: string };
  categoryId?: string;
  inventory?: {
    currentStock: number;
    minimumRequired?: number;
  } | null;
  variants?: {
    id: string;
    name: string;
    sku: string;
    sellingPrice?: string | number | null;
    isActive: boolean;
    inventory?: { currentStock: number } | null;
  }[];
  gender?: string;
  occasion?: string;
  material?: string;
  discountPercent?: number;
  taxCategory?: string;
  allowBackorder?: boolean;
  publishDate?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  mrp: number;
  discount: number; // percentage
  images: string[]; // compatibility field: sorted URLs
  productImages?: BackendProductImage[];
  primaryImage?: string | null;
  hoverImage?: string | null;
  galleryImages?: string[];
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  attributes: ProductAttribute[];
  occasion: string[];
  gender: 'Women' | 'Men' | 'Unisex';
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  stock: number;
  sku?: string;
  variants?: unknown[];
  name?: string;
}
