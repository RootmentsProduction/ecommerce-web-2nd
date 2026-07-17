import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma.service.js';
export declare class AppController {
    private readonly appService;
    private readonly prismaService;
    constructor(appService: AppService, prismaService: PrismaService);
    getHello(): string;
    getHealth(): Promise<{
        status: string;
        database: string;
        error: string | null;
    }>;
}
