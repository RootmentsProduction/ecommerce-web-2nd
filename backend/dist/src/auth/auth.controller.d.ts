import * as express from 'express';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto, VerifyOtpDto, ResendOtpDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    private setRefreshCookie;
    private clearRefreshCookie;
    signup(dto: SignupDto): Promise<{
        message: string;
    }>;
    verifyEmail(dto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    resendOtp(dto: ResendOtpDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto, req: express.Request, res: express.Response, ip: string): Promise<{
        accessToken: string;
        user: any;
    }>;
    refresh(req: express.Request, res: express.Response, ip: string): Promise<{
        accessToken: string;
        user: any;
    }>;
    logout(req: express.Request, res: express.Response): Promise<{
        message: string;
    }>;
    me(user: any): {
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
            role: import("../generated/prisma/enums").UserRole;
            status: import("../generated/prisma/enums").UserStatus;
            createdAt: Date;
        };
    };
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
