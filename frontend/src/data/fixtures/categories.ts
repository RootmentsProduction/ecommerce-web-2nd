import { Category } from "@/types/category";
import { AdminCategory } from "@/types/admin";

export const categoriesFixture: Category[] = [
  {
    id: "cat-01",
    name: "Necklaces",
    slug: "necklaces",
    image: "/necklace-cat.jpg",
    count: 1,
  },
  {
    id: "cat-02",
    name: "Earrings",
    slug: "earrings",
    image: "/earrings-cat.jpg",
    count: 1,
  },
  {
    id: "cat-03",
    name: "Rings",
    slug: "rings",
    image: "/rings-cat.jpg",
    count: 3,
  },
];

export const adminCategoriesFixture: AdminCategory[] = [
  {
    id: "cat-01",
    name: "Necklaces",
    slug: "necklaces",
    description: "Premium handcrafted designer necklaces, chains, chokers, and royal emerald pendants.",
    status: "Active",
    productCount: 1,
    displayOrder: 1,
    image: "/necklace-cat.jpg",
  },
  {
    id: "cat-02",
    name: "Earrings",
    slug: "earrings",
    description: "Elegant gold studs, crystal drop hoops, and premium solitaire brilliant diamond studs.",
    status: "Active",
    productCount: 1,
    displayOrder: 2,
    image: "/earrings-cat.jpg",
  },
  {
    id: "cat-03",
    name: "Rings",
    slug: "rings",
    description: "Forged engagement bands, nautical shell pearl rings, and luxury platinum solitaire bands.",
    status: "Active",
    productCount: 3,
    displayOrder: 3,
    image: "/rings-cat.jpg",
  },
];
