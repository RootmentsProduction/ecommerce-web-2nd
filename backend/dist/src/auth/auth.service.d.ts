import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { OtpPurpose, User, UserRole, UserStatus } from '../generated/prisma/client.js';
import { SignupDto, LoginDto, ResetPasswordDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private usersService;
    private emailService;
    private jwtService;
    private configService;
    private readonly logger;
    constructor(prisma: PrismaService, usersService: UsersService, emailService: EmailService, jwtService: JwtService, configService: ConfigService);
    private hashValue;
    private generateRandomToken;
    signup(dto: SignupDto): Promise<void>;
    generateOtp(userId: string, purpose: OtpPurpose): Promise<string>;
    resendOtp(email: string): Promise<void>;
    verifyOtp(email: string, otp: string, purpose: OtpPurpose): Promise<void>;
    login(dto: LoginDto, userAgent?: string, ipAddress?: string): Promise<{
        accessToken: string;
        user: any;
        refreshToken: string;
    }>;
    adminLogin(dto: LoginDto, userAgent?: string, ipAddress?: string): Promise<{
        accessToken: string;
        user: any;
        refreshToken: string;
    }>;
    refreshTokens(refreshToken: string, userAgent?: string, ipAddress?: string): Promise<{
        accessToken: string;
        user: any;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<void>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(dto: ResetPasswordDto): Promise<void>;
    private generateTokenSet;
    sanitizeUser(user: User): {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        role: UserRole;
        status: UserStatus;
        createdAt: Date;
    };
}
