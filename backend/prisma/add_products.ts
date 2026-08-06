import "dotenv/config";
import { Pool, PoolConfig } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  ProductStatus,
  ProductImageRole,
  StockTransactionType,
} from "../src/generated/prisma/client.js";
import * as fs from "fs";
import * as path from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is missing.");
}

const url = new URL(connectionString);
let sslConfig: any = false;

if (url.searchParams.get("sslmode") !== "disable") {
  sslConfig = {
    rejectUnauthorized: false,
  };

  try {
    const certPath = path.join(__dirname, "../src/prisma/global-bundle.pem");
    if (fs.existsSync(certPath)) {
      sslConfig = {
        ca: fs.readFileSync(certPath),
      };
    }
  } catch (e) {
    // Fallback
  }
}

const poolConfig: PoolConfig = {
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  host: url.hostname,
  port: url.port ? parseInt(url.port, 10) : 5432,
  database: url.pathname.substring(1),
  ssl: sslConfig,
};

const pool = new Pool(poolConfig);
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Fetching existing categories from database...");
  const categories = await prisma.category.findMany();
  console.log(`Found ${categories.length} categories:`, categories.map((c) => `${c.name} (${c.slug})`));

  const earringsCategory = categories.find((c) => c.slug === "earrings" || c.name.toLowerCase().includes("earring"));
  const necklacesCategory = categories.find((c) => c.slug === "necklaces" || c.name.toLowerCase().includes("necklace"));
  const pendantCategory = categories.find((c) => c.slug === "pendant" || c.name.toLowerCase().includes("pendant"));

  if (!earringsCategory || !necklacesCategory || !pendantCategory) {
    console.error("Could not match all 3 categories in the database.");
    process.exit(1);
  }

  console.log("Matched categories:");
  console.log(" - Earrings ID:", earringsCategory.id);
  console.log(" - Necklaces ID:", necklacesCategory.id);
  console.log(" - Pendant ID:", pendantCategory.id);

  const productsData = [
    // ---------------- EARRINGS ----------------
    {
      name: "Elegant Diamond Solitaire Studs",
      slug: "elegant-diamond-solitaire-studs",
      sku: "EAR-SOL-001",
      shortDescription: "Timeless 14K Gold Diamond Solitaire Stud Earrings.",
      description: "Crafted with sparkling round brilliant cut diamonds set in 14K hallmarked yellow gold. Perfect for everyday elegance or special occasions.",
      sellingPrice: 14999,
      mrp: 18999,
      costPrice: 9500,
      status: ProductStatus.ACTIVE,
      featured: true,
      bestSeller: true,
      newArrival: true,
      showOnHomepage: true,
      occasion: "Everyday",
      gender: "Women",
      categoryId: earringsCategory.id,
      stock: 25,
      images: [
        {
          url: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000",
          altText: "Diamond Solitaire Studs Front",
          isPrimary: true,
          imageRole: ProductImageRole.PRIMARY,
          sortOrder: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000",
          altText: "Diamond Solitaire Studs Side View",
          isPrimary: false,
          imageRole: ProductImageRole.HOVER,
          sortOrder: 1,
        },
      ],
    },
    {
      name: "Royal Kundan Drop Earrings",
      slug: "royal-kundan-drop-earrings",
      sku: "EAR-KUN-002",
      shortDescription: "Intricate Kundan and Pearl Drop Jhumkas.",
      description: "Exquisite traditional Indian Kundan craftsmanship with soft freshwater pearl drops and vibrant enamel detailing. Ideal for festive and wedding wear.",
      sellingPrice: 8499,
      mrp: 11999,
      costPrice: 5000,
      status: ProductStatus.ACTIVE,
      featured: true,
      bestSeller: false,
      newArrival: true,
      showOnHomepage: true,
      occasion: "Wedding",
      gender: "Women",
      categoryId: earringsCategory.id,
      stock: 15,
      images: [
        {
          url: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1000",
          altText: "Royal Kundan Drop Earrings",
          isPrimary: true,
          imageRole: ProductImageRole.PRIMARY,
          sortOrder: 0,
        },
      ],
    },
    {
      name: "Classic 18K Gold Hoop Earrings",
      slug: "classic-18k-gold-hoop-earrings",
      sku: "EAR-HOP-003",
      shortDescription: "Sleek and polished 18K Yellow Gold Hoops.",
      description: "Minimalist, lightweight 18K yellow gold hoop earrings designed for a seamless, comfortable fit from day to night.",
      sellingPrice: 11299,
      mrp: 13999,
      costPrice: 7800,
      status: ProductStatus.ACTIVE,
      featured: false,
      bestSeller: true,
      newArrival: false,
      showOnHomepage: false,
      occasion: "Casual",
      gender: "Women",
      categoryId: earringsCategory.id,
      stock: 30,
      images: [
        {
          url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000",
          altText: "Classic 18K Gold Hoop Earrings",
          isPrimary: true,
          imageRole: ProductImageRole.PRIMARY,
          sortOrder: 0,
        },
      ],
    },

    // ---------------- NECKLACES ----------------
    {
      name: "Radiant Emerald & Diamond Choker Necklace",
      slug: "radiant-emerald-diamond-choker-necklace",
      sku: "NEC-EME-001",
      shortDescription: "Statement Emerald and Diamond Choker Necklace in 18K White Gold.",
      description: "Unparalleled luxury featuring oval-cut natural emeralds surrounded by brilliant pavé diamonds. Statement piece for gala dinners and weddings.",
      sellingPrice: 45999,
      mrp: 54999,
      costPrice: 31000,
      status: ProductStatus.ACTIVE,
      featured: true,
      bestSeller: true,
      newArrival: true,
      showOnHomepage: true,
      occasion: "Wedding",
      gender: "Women",
      categoryId: necklacesCategory.id,
      stock: 10,
      images: [
        {
          url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
          altText: "Emerald & Diamond Choker Necklace",
          isPrimary: true,
          imageRole: ProductImageRole.PRIMARY,
          sortOrder: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1611591475168-a4005b816223?q=80&w=1000",
          altText: "Emerald & Diamond Choker Model View",
          isPrimary: false,
          imageRole: ProductImageRole.HOVER,
          sortOrder: 1,
        },
      ],
    },
    {
      name: "Traditional Temple Gold Necklace",
      slug: "traditional-temple-gold-necklace",
      sku: "NEC-TMP-002",
      shortDescription: "Heritage 22K Gold Plated Temple Jewelry Necklace.",
      description: "Inspired by South Indian temple motifs with Goddess Lakshmi coins and rubies. Handcrafted with traditional precision.",
      sellingPrice: 38999,
      mrp: 44999,
      costPrice: 26000,
      status: ProductStatus.ACTIVE,
      featured: false,
      bestSeller: true,
      newArrival: false,
      showOnHomepage: true,
      occasion: "Festive",
      gender: "Women",
      categoryId: necklacesCategory.id,
      stock: 12,
      images: [
        {
          url: "https://images.unsplash.com/photo-1611591475168-a4005b816223?q=80&w=1000",
          altText: "Traditional Temple Gold Necklace",
          isPrimary: true,
          imageRole: ProductImageRole.PRIMARY,
          sortOrder: 0,
        },
      ],
    },
    {
      name: "Sleek Minimalist Layered Gold Chain",
      slug: "sleek-minimalist-layered-gold-chain",
      sku: "NEC-CHN-003",
      shortDescription: "Delicate 14K Gold Layered Chain Necklace.",
      description: "Contemporary double-layered chain necklace in 14K yellow gold. Versatile for office wear or weekend outings.",
      sellingPrice: 6999,
      mrp: 8999,
      costPrice: 4200,
      status: ProductStatus.ACTIVE,
      featured: false,
      bestSeller: false,
      newArrival: true,
      showOnHomepage: false,
      occasion: "Everyday",
      gender: "Women",
      categoryId: necklacesCategory.id,
      stock: 40,
      images: [
        {
          url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000",
          altText: "Sleek Minimalist Layered Gold Chain",
          isPrimary: true,
          imageRole: ProductImageRole.PRIMARY,
          sortOrder: 0,
        },
      ],
    },

    // ---------------- PENDANT ----------------
    {
      name: "Celestial Sapphire & Diamond Pendant",
      slug: "celestial-sapphire-diamond-pendant",
      sku: "PEN-SAP-001",
      shortDescription: "Deep Blue Sapphire with Diamond Halo in 18K White Gold.",
      description: "Captivating royal blue sapphire central gemstone encircled by a halo of natural diamonds. Includes 18-inch white gold chain.",
      sellingPrice: 18499,
      mrp: 22999,
      costPrice: 12000,
      status: ProductStatus.ACTIVE,
      featured: true,
      bestSeller: true,
      newArrival: true,
      showOnHomepage: true,
      occasion: "Gifting",
      gender: "Women",
      categoryId: pendantCategory.id,
      stock: 20,
      images: [
        {
          url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
          altText: "Celestial Sapphire & Diamond Pendant",
          isPrimary: true,
          imageRole: ProductImageRole.PRIMARY,
          sortOrder: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000",
          altText: "Celestial Sapphire Pendant Side View",
          isPrimary: false,
          imageRole: ProductImageRole.HOVER,
          sortOrder: 1,
        },
      ],
    },
    {
      name: "Eternal Heart Diamond Pendant",
      slug: "eternal-heart-diamond-pendant",
      sku: "PEN-HRT-002",
      shortDescription: "Romantic 14K Rose Gold Heart Pendant with Diamonds.",
      description: "Gracefully shaped heart pendant with micro-pave set diamonds in 14K rose gold. An unforgettable gift of love.",
      sellingPrice: 12999,
      mrp: 15999,
      costPrice: 8500,
      status: ProductStatus.ACTIVE,
      featured: true,
      bestSeller: false,
      newArrival: true,
      showOnHomepage: true,
      occasion: "Anniversary",
      gender: "Women",
      categoryId: pendantCategory.id,
      stock: 18,
      images: [
        {
          url: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000",
          altText: "Eternal Heart Diamond Pendant",
          isPrimary: true,
          imageRole: ProductImageRole.PRIMARY,
          sortOrder: 0,
        },
      ],
    },
    {
      name: "Vintage Pearl Solitaire Pendant",
      slug: "vintage-pearl-solitaire-pendant",
      sku: "PEN-PRL-003",
      shortDescription: "South Sea Pearl Pendant with Accent Diamond.",
      description: "Luminous 9mm South Sea cultured pearl suspended from a diamond-accented 14K yellow gold bail.",
      sellingPrice: 7499,
      mrp: 9999,
      costPrice: 4800,
      status: ProductStatus.ACTIVE,
      featured: false,
      bestSeller: true,
      newArrival: false,
      showOnHomepage: false,
      occasion: "Everyday",
      gender: "Women",
      categoryId: pendantCategory.id,
      stock: 22,
      images: [
        {
          url: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000",
          altText: "Vintage Pearl Solitaire Pendant",
          isPrimary: true,
          imageRole: ProductImageRole.PRIMARY,
          sortOrder: 0,
        },
      ],
    },
  ];

  console.log("Seeding products...");
  for (const item of productsData) {
    const { stock, images, ...productFields } = item;

    // Check if product already exists by SKU
    const existing = await prisma.product.findUnique({
      where: { sku: productFields.sku },
    });

    if (existing) {
      console.log(`Product SKU ${productFields.sku} already exists. Skipping...`);
      continue;
    }

    const createdProduct = await prisma.product.create({
      data: {
        ...productFields,
        images: {
          create: images.map((img) => ({
            url: img.url,
            altText: img.altText,
            isPrimary: img.isPrimary,
            imageRole: img.imageRole,
            sortOrder: img.sortOrder,
          })),
        },
      },
    });

    // Create inventory record for the product
    await prisma.inventory.create({
      data: {
        productId: createdProduct.id,
        currentStock: stock,
        minimumRequired: 5,
        reorderPoint: 10,
      },
    });

    // Create stock transaction record
    if (stock > 0) {
      await prisma.stockTransaction.create({
        data: {
          productId: createdProduct.id,
          type: StockTransactionType.OPENING_STOCK,
          quantity: stock,
          beforeStock: 0,
          afterStock: stock,
          reason: "Initial seed stock creation",
          changedBy: "SYSTEM",
        },
      });
    }

    console.log(`Created product: ${createdProduct.name} [SKU: ${createdProduct.sku}]`);
  }

  console.log("Product seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding products:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
