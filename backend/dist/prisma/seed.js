"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_js_1 = require("../src/generated/prisma/client.js");
const bcrypt = __importStar(require("bcrypt"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is missing.");
}
const url = new URL(connectionString);
let sslConfig = false;
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
    }
    catch (e) {
    }
}
const poolConfig = {
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    host: url.hostname,
    port: url.port ? parseInt(url.port, 10) : 5432,
    database: url.pathname.substring(1),
    ssl: sslConfig,
};
const pool = new pg_1.Pool(poolConfig);
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_js_1.PrismaClient({ adapter });
async function main() {
    console.log("Starting database seeding...");
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
//# sourceMappingURL=seed.js.map