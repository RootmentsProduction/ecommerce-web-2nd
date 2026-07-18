import { Product } from './product';

export interface SelectedAttribute {
  name: string; // e.g. "Ring Size", "Metal Type"
  value: string; // e.g. "6", "18k Yellow Gold"
}

export interface CartItem {
  id: string; // unique combination of product id + selected attributes
  product: Product;
  quantity: number;
  selectedAttributes: SelectedAttribute[];
}
