import "dotenv/config";
import { Pool, PoolConfig } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import * as bcrypt from "bcrypt";
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
  console.log("Cleaning up existing database catalog records...");
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.stockTransaction.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("Catalog cleanup complete.");

  // 2. Seed Super Admin User
  console.log("Seeding Super Admin user...");
  const adminEmail = 'admin@zorucci.com';
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
    create: {
      email: adminEmail,
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log("Successfully seeded Super Admin user: admin@zorucci.com / Admin@123");
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
