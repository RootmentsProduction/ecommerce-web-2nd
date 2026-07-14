import { AdminProductFormData } from "@/types/admin";

export const adminProductsDetail: Record<string, AdminProductFormData> = {
  "SKU-OO1": {
    name: "Golden Chain | Ring",
    sku: "SKU-OO1",
    slug: "golden-chain-ring",
    shortDescription: "A premium 22kt golden band adorned with intricate floral chain patterns.",
    description: "Crafted for timeless elegance, this Golden Chain Ring combines master craftsmanship with modern minimalist design. Adorned with a delicate chain link engraving, it is forged from pure 22kt hallmarked yellow gold. Perfect for bridal ensembles, anniversary celebrations, or statement daily wear.",
    category: "Rings",
    gender: "Unisex",
    occasion: "Bridal",
    material: "Gold",
    sellingPrice: "4500",
    mrp: "5500",
    discountPercent: 18,
    taxCategory: "GST 3%",
    costPrice: "3200",
    trackInventory: true,
    initialStock: 24,
    minStock: 5,
    allowBackorder: false,
    status: "Active",
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    showOnHomepage: true,
    publishDate: "2026-06-01",
    media: [
      { id: "img-1", url: "/images/placeholder-ring-1.jpg", isPrimary: true },
      { id: "img-2", url: "/images/placeholder-ring-2.jpg", isPrimary: false },
      { id: "img-3", url: "/images/placeholder-ring-3.jpg", isPrimary: false },
    ],
    variants: [
      { id: "var-1", name: "Gold / 16 inch", sku: "SKU-OO1-G16", price: "4500", stock: 12, status: "Active" },
      { id: "var-2", name: "Gold / 18 inch", sku: "SKU-OO1-G18", price: "4700", stock: 10, status: "Active" },
      { id: "var-3", name: "Silver / 16 inch", sku: "SKU-OO1-S16", price: "3500", stock: 2, status: "Low Stock" },
    ]
  },
  "SKU-OO2": {
    name: "Classic Diamond Studs",
    sku: "SKU-OO2",
    slug: "classic-diamond-studs",
    shortDescription: "Brilliant-cut solitaire diamonds set in an 18kt white gold crown.",
    description: "An essential addition to any luxury collection, these classic studs feature top-grade VVS1 clarity, E-color round-cut diamonds. Total weight of 1.0 carat, secure screw-back setting in premium white gold.",
    category: "Earrings",
    gender: "Women",
    occasion: "Everyday",
    material: "Diamond",
    sellingPrice: "120000",
    mrp: "150000",
    discountPercent: 20,
    taxCategory: "GST 3%",
    costPrice: "90000",
    trackInventory: true,
    initialStock: 18,
    minStock: 2,
    allowBackorder: false,
    status: "Active",
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    showOnHomepage: true,
    publishDate: "2026-05-15",
    media: [
      { id: "img-4", url: "/images/placeholder-earring-1.jpg", isPrimary: true },
    ],
    variants: [
      { id: "var-4", name: "White Gold / 1.0ct", sku: "SKU-OO2-WG10", price: "120000", stock: 10, status: "Active" },
      { id: "var-5", name: "Yellow Gold / 1.0ct", sku: "SKU-OO2-YG10", price: "120000", stock: 8, status: "Active" },
    ]
  },
  "SKU-OO3": {
    name: "Emperor Emerald Pendant",
    sku: "SKU-OO3",
    slug: "emperor-emerald-pendant",
    shortDescription: "A deep green Zambian emerald surrounded by micro-pave diamonds.",
    description: "Indulge in royal sophistication. This pendant showcases a natural, cushion-cut 2.5ct emerald suspended from a delicate 18kt yellow gold chain. Accentuated by a double halo of brilliant micro-pavé diamonds.",
    category: "Necklaces",
    gender: "Women",
    occasion: "Bridal",
    material: "Emerald",
    sellingPrice: "85000",
    mrp: "95000",
    discountPercent: 10,
    taxCategory: "GST 3%",
    costPrice: "65000",
    trackInventory: true,
    initialStock: 2,
    minStock: 3,
    allowBackorder: true,
    status: "Active",
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    showOnHomepage: false,
    publishDate: "2026-06-10",
    media: [
      { id: "img-5", url: "/images/placeholder-pendant-1.jpg", isPrimary: true },
    ],
    variants: []
  }
};

// Help map slug or SKU names including '#' prefixes
export const getProductDetailById = (id: string): AdminProductFormData | undefined => {
  const cleanId = id.replace("#", "").trim();
  return adminProductsDetail[cleanId] || adminProductsDetail["SKU-OO1"]; // Fallback to ring if not found
};
