import * as express from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
export declare class AdminAuthController {
    private authService;
    constructor(authService: AuthService);
    private setRefreshCookie;
    login(dto: LoginDto, req: express.Request, res: express.Response, ip: string): Promise<{
        accessToken: string;
        user: any;
    }>;
}
