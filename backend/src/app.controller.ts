import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma.service.js';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('health')
  async getHealth() {
    let databaseStatus = 'UP';
    let errorMessage: string | null = null;
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
    } catch (e) {
      errorMessage = e instanceof Error ? e.message : String(e);
      databaseStatus = 'DOWN';
    }
    return {
      status: 'OK',
      database: databaseStatus,
      error: errorMessage,
    };
  }
}
