import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { Pool, PoolConfig } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private static pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is missing.');
    }

    // Parse the connection string manually using URL to avoid pg overriding SSL config
    const url = new URL(connectionString);

    // Attempt to load AWS RDS root CA certificate bundle
    let sslConfig: any = {
      rejectUnauthorized: false,
    };
    try {
      const certPath = path.join(__dirname, 'global-bundle.pem');
      if (fs.existsSync(certPath)) {
        sslConfig = {
          ca: fs.readFileSync(certPath),
        };
      }
    } catch (e) {
      // Fallback silently to rejectUnauthorized
    }

    const poolConfig: PoolConfig = {
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      host: url.hostname,
      port: url.port ? parseInt(url.port, 10) : 5432,
      database: url.pathname.substring(1), // Remove leading '/'
      ssl: sslConfig,
    };

    const pool = new Pool(poolConfig);
    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error', 'warn'],
    });

    PrismaService.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await PrismaService.pool.end();
  }
}
