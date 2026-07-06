export interface ProductAttribute {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  mrp: number;
  discount: number; // percentage
  images: string[];
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
}
