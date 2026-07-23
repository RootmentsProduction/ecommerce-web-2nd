import "dotenv/config";
import { Pool, PoolConfig } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProductStatus, StockTransactionType } from "../src/generated/prisma/client.js";

import * as fs from "fs";
import * as path from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is missing.");
}

const url = new URL(connectionString);
let sslConfig: any = false;

if (url.searchParams.get('sslmode') !== 'disable') {
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
  console.log("Starting database seeding...");

  // 1. Clean existing records in dependency order to prevent constraint violations
  console.log("Cleaning up existing database records...");
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.stockTransaction.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("Cleanup complete. Starting insertion...");

  // 2. Seed Categories
  const necklaces = await prisma.category.create({
    data: {
      name: "Necklaces",
      slug: "necklaces",
      description: "Premium handcrafted designer necklaces, chains, chokers, and royal emerald pendants.",
      isActive: true,
      sortOrder: 1,
    },
  });

  const earrings = await prisma.category.create({
    data: {
      name: "Earrings",
      slug: "earrings",
      description: "Elegant gold studs, crystal drop hoops, and premium solitaire brilliant diamond studs.",
      isActive: true,
      sortOrder: 2,
    },
  });

  const rings = await prisma.category.create({
    data: {
      name: "Rings",
      slug: "rings",
      description: "Forged engagement bands, nautical shell pearl rings, and luxury platinum solitaire bands.",
      isActive: true,
      sortOrder: 3,
    },
  });

  const bracelets = await prisma.category.create({
    data: {
      name: "Bracelets",
      slug: "bracelets",
      description: "Delicate luxury wrist chains, custom gemstone cuff links, and royal golden bands.",
      isActive: true,
      sortOrder: 4,
    },
  });

  console.log("Successfully seeded Categories.");

  // 3. Seed Product 1: Golden Chain Ring (with Variants)
  console.log("Seeding Product 1: Golden Chain Ring...");
  const product1 = await prisma.product.create({
    data: {
      name: "Golden Chain Ring",
      slug: "golden-chain-ring",
      sku: "SKU-001",
      shortDescription: "A premium 22kt golden band adorned with intricate floral chain patterns.",
      description: "Crafted for timeless elegance, this Golden Chain Ring combines master craftsmanship with modern minimalist design. Adorned with a delicate chain link engraving, it is forged from pure 22kt hallmarked yellow gold. Perfect for bridal ensembles, anniversary celebrations, or statement daily wear.",
      sellingPrice: 4500.00,
      mrp: 5500.00,
      costPrice: 3200.00,
      status: ProductStatus.ACTIVE,
      featured: true,
      newArrival: true,
      bestSeller: true,
      showOnHomepage: true,
      occasion: "Bridal",
      gender: "Women",
      categoryId: rings.id,
      images: {
        create: [
          { url: "/product-main.png", altText: "Main Golden Chain Ring View", isPrimary: true, imageRole: "PRIMARY", sortOrder: 1 },
          { url: "/product-hover.jpg", altText: "Alternate Angle View", isPrimary: false, imageRole: "HOVER", sortOrder: 2 },
        ],
      },
      variants: {
        create: [
          { name: "Gold / 16 inch", sku: "SKU-001-G16", sellingPrice: 4500.00, isActive: true },
          { name: "Gold / 18 inch", sku: "SKU-001-G18", sellingPrice: 4700.00, isActive: true },
          { name: "Silver / 16 inch", sku: "SKU-001-S16", sellingPrice: 3500.00, isActive: true },
        ],
      },
    },
    include: {
      variants: true,
    },
  });

  // Create Inventory and Transactions for Product 1 Variants
  const p1Variants = product1.variants;
  const p1Inventories = [
    { variantSku: "SKU-001-G16", current: 12, minReq: 5, reorder: 8 },
    { variantSku: "SKU-001-G18", current: 10, minReq: 5, reorder: 8 },
    { variantSku: "SKU-001-S16", current: 2, minReq: 5, reorder: 8 },
  ];

  for (const inv of p1Inventories) {
    const variant = p1Variants.find((v: { sku: string; id: string }) => v.sku === inv.variantSku);
    if (variant) {
      await prisma.inventory.create({
        data: {
          currentStock: inv.current,
          minimumRequired: inv.minReq,
          reorderPoint: inv.reorder,
          variantId: variant.id,
        },
      });

      await prisma.stockTransaction.create({
        data: {
          type: StockTransactionType.OPENING_STOCK,
          quantity: inv.current,
          beforeStock: 0,
          afterStock: inv.current,
          reason: "Initial inventory setup",
          reference: "SEED-INIT",
          changedBy: "System",
          productId: product1.id,
          variantId: variant.id,
        },
      });
    }
  }

  // 4. Seed Product 2: Classic Diamond Studs (with Variants)
  console.log("Seeding Product 2: Classic Diamond Studs...");
  const product2 = await prisma.product.create({
    data: {
      name: "Classic Diamond Studs",
      slug: "classic-diamond-studs",
      sku: "SKU-002",
      shortDescription: "Brilliant-cut solitaire diamonds set in an 18kt white gold crown.",
      description: "An essential addition to any luxury collection, these classic studs feature top-grade VVS1 clarity, E-color round-cut diamonds. Total weight of 1.0 carat, secure screw-back setting in premium white gold.",
      sellingPrice: 120000.00,
      mrp: 150000.00,
      costPrice: 90000.00,
      status: ProductStatus.ACTIVE,
      featured: true,
      newArrival: false,
      bestSeller: true,
      showOnHomepage: true,
      occasion: "Classic",
      gender: "Unisex",
      categoryId: earrings.id,
      images: {
        create: [
          { url: "/product-main.png", altText: "Solitaire studs front macro view", isPrimary: true, imageRole: "PRIMARY", sortOrder: 1 },
        ],
      },
      variants: {
        create: [
          { name: "White Gold / 1.0ct", sku: "SKU-002-WG10", sellingPrice: 120000.00, isActive: true },
          { name: "Yellow Gold / 1.0ct", sku: "SKU-002-YG10", sellingPrice: 120000.00, isActive: true },
        ],
      },
    },
    include: {
      variants: true,
    },
  });

  // Create Inventory and Transactions for Product 2 Variants
  const p2Variants = product2.variants;
  const p2Inventories = [
    { variantSku: "SKU-002-WG10", current: 10, minReq: 2, reorder: 4 },
    { variantSku: "SKU-002-YG10", current: 8, minReq: 2, reorder: 4 },
  ];

  for (const inv of p2Inventories) {
    const variant = p2Variants.find((v: { sku: string; id: string }) => v.sku === inv.variantSku);
    if (variant) {
      await prisma.inventory.create({
        data: {
          currentStock: inv.current,
          minimumRequired: inv.minReq,
          reorderPoint: inv.reorder,
          variantId: variant.id,
        },
      });

      await prisma.stockTransaction.create({
        data: {
          type: StockTransactionType.OPENING_STOCK,
          quantity: inv.current,
          beforeStock: 0,
          afterStock: inv.current,
          reason: "Initial inventory setup",
          reference: "SEED-INIT",
          changedBy: "System",
          productId: product2.id,
          variantId: variant.id,
        },
      });
    }
  }

  // 5. Seed Product 3: Emperor Emerald Pendant (No Variants)
  console.log("Seeding Product 3: Emperor Emerald Pendant...");
  const product3 = await prisma.product.create({
    data: {
      name: "Emperor Emerald Pendant",
      slug: "emperor-emerald-pendant",
      sku: "SKU-003",
      shortDescription: "A deep green Zambian emerald surrounded by micro-pave diamonds.",
      description: "Indulge in royal sophistication. This pendant showcases a natural, cushion-cut 2.5ct emerald suspended from a delicate 18kt yellow gold chain. Accentuated by a double halo of brilliant micro-pavé diamonds.",
      sellingPrice: 85000.00,
      mrp: 95000.00,
      costPrice: 65000.00,
      status: ProductStatus.ACTIVE,
      featured: false,
      newArrival: true,
      bestSeller: false,
      showOnHomepage: false,
      occasion: "Classic",
      gender: "Women",
      categoryId: necklaces.id,
      images: {
        create: [
          { url: "/product-main.png", altText: "Emerald Pendant overview", isPrimary: true, imageRole: "PRIMARY", sortOrder: 1 },
        ],
      },
    },
  });

  // Create Inventory and Transaction for Product 3
  await prisma.inventory.create({
    data: {
      currentStock: 2,
      minimumRequired: 3,
      reorderPoint: 3,
      productId: product3.id,
    },
  });

  await prisma.stockTransaction.create({
    data: {
      type: StockTransactionType.OPENING_STOCK,
      quantity: 2,
      beforeStock: 0,
      afterStock: 2,
      reason: "Initial inventory setup",
      reference: "SEED-INIT",
      changedBy: "System",
      productId: product3.id,
    },
  });

  // 6. Seed Product 4: Pearl Crystal Ring For Women (No Variants, Out of Stock)
  console.log("Seeding Product 4: Pearl Crystal Ring For Women...");
  const product4 = await prisma.product.create({
    data: {
      name: "Pearl Crystal Ring For Women",
      slug: "pearl-crystal-ring-women",
      sku: "SKU-004",
      shortDescription: "A beautiful sea-inspired shell band highlighted by a glistening white pearl.",
      description: "A beautiful sea-inspired shell band highlighted by a glistening white pearl, capturing natural serenity in 18k yellow gold.",
      sellingPrice: 2399.00,
      mrp: 2399.00,
      costPrice: 1200.00,
      status: ProductStatus.ACTIVE,
      featured: true,
      newArrival: true,
      bestSeller: true,
      showOnHomepage: true,
      occasion: "Everyday",
      gender: "Women",
      categoryId: rings.id,
      images: {
        create: [
          { url: "/product-main.png", altText: "Pearl Crystal Ring View", isPrimary: true, imageRole: "PRIMARY", sortOrder: 1 },
        ],
      },
    },
  });

  // Create Inventory for Product 4
  await prisma.inventory.create({
    data: {
      currentStock: 0,
      minimumRequired: 5,
      reorderPoint: 5,
      productId: product4.id,
    },
  });

  // 7. Seed Product 5: Solitaire Platinum Band (No Variants, Draft Status)
  console.log("Seeding Product 5: Solitaire Platinum Band...");
  const product5 = await prisma.product.create({
    data: {
      name: "Solitaire Platinum Band",
      slug: "solitaire-platinum-band",
      sku: "SKU-005",
      shortDescription: "For the refined gentleman. Premium hallmarked platinum band embedded with a single clean solitaire diamond.",
      description: "For the refined gentleman. Premium hallmarked platinum band embedded with a single clean solitaire diamond.",
      sellingPrice: 75000.00,
      mrp: 75000.00,
      costPrice: 58000.00,
      status: ProductStatus.DRAFT,
      featured: false,
      newArrival: false,
      bestSeller: false,
      showOnHomepage: false,
      occasion: "Bridal",
      gender: "Men",
      categoryId: rings.id,
      images: {
        create: [
          { url: "/product-main.png", altText: "Men's Platinum Band View", isPrimary: true, imageRole: "PRIMARY", sortOrder: 1 },
        ],
      },
    },
  });

  // Create Inventory and Transaction for Product 5
  await prisma.inventory.create({
    data: {
      currentStock: 15,
      minimumRequired: 2,
      reorderPoint: 4,
      productId: product5.id,
    },
  });

  await prisma.stockTransaction.create({
    data: {
      type: StockTransactionType.OPENING_STOCK,
      quantity: 15,
      beforeStock: 0,
      afterStock: 15,
      reason: "Initial inventory setup",
      reference: "SEED-INIT",
      changedBy: "System",
      productId: product5.id,
    },
  });

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding the database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
