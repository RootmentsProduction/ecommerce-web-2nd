import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    let databaseStatus = 'UP';
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
    } catch {
      databaseStatus = 'DOWN';
    }
    return {
      status: 'OK',
      database: databaseStatus,
    };
  }
}
