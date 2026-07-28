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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const email_service_1 = require("../email/email.service");
const client_js_1 = require("../generated/prisma/client.js");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
let AuthService = AuthService_1 = class AuthService {
    prisma;
    usersService;
    emailService;
    jwtService;
    configService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(prisma, usersService, emailService, jwtService, configService) {
        this.prisma = prisma;
        this.usersService = usersService;
        this.emailService = emailService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    hashValue(value) {
        return crypto.createHash('sha256').update(value).digest('hex');
    }
    generateRandomToken() {
        return crypto.randomBytes(32).toString('hex');
    }
    async signup(dto) {
        const email = dto.email.toLowerCase().trim();
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            if (existingUser.status === client_js_1.UserStatus.PENDING_VERIFICATION) {
                const passwordHash = await bcrypt.hash(dto.password, 10);
                await this.prisma.user.update({
                    where: { id: existingUser.id },
                    data: {
                        passwordHash,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                    },
                });
                const otp = await this.generateOtp(existingUser.id, client_js_1.OtpPurpose.EMAIL_VERIFICATION);
                await this.emailService.sendVerificationOtp(email, otp);
                return;
            }
            throw new common_1.ConflictException('Email is already registered.');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.createUser({
            email,
            passwordHash,
            firstName: dto.firstName,
            lastName: dto.lastName,
            role: client_js_1.UserRole.CUSTOMER,
            status: client_js_1.UserStatus.PENDING_VERIFICATION,
        });
        const otp = await this.generateOtp(user.id, client_js_1.OtpPurpose.EMAIL_VERIFICATION);
        await this.emailService.sendVerificationOtp(email, otp);
    }
    async generateOtp(userId, purpose) {
        const cooldownSeconds = this.configService.get('OTP_COOLDOWN_SECONDS') || 60;
        const expiryMinutes = this.configService.get('OTP_EXPIRY_MINUTES') || 15;
        const latestOtp = await this.prisma.emailOtp.findFirst({
            where: { userId, purpose },
            orderBy: { createdAt: 'desc' },
        });
        if (latestOtp) {
            const secondsPassed = Math.floor((Date.now() - latestOtp.createdAt.getTime()) / 1000);
            if (secondsPassed < cooldownSeconds) {
                const waitTime = cooldownSeconds - secondsPassed;
                throw new common_1.BadRequestException(`Please wait ${waitTime} seconds before requesting a new code.`);
            }
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = this.hashValue(otp);
        const expiresAt = new Date(Date.now() + expiryMinutes * 60000);
        await this.prisma.emailOtp.deleteMany({
            where: { userId, purpose },
        });
        await this.prisma.emailOtp.create({
            data: {
                userId,
                otpHash,
                purpose,
                expiresAt,
            },
        });
        return otp;
    }
    async resendOtp(email) {
        const normalizedEmail = email.toLowerCase().trim();
        const user = await this.usersService.findByEmail(normalizedEmail);
        if (!user) {
            return;
        }
        if (user.status !== client_js_1.UserStatus.PENDING_VERIFICATION) {
            throw new common_1.BadRequestException('Email is already verified.');
        }
        const otp = await this.generateOtp(user.id, client_js_1.OtpPurpose.EMAIL_VERIFICATION);
        await this.emailService.sendVerificationOtp(normalizedEmail, otp);
    }
    async verifyOtp(email, otp, purpose) {
        const normalizedEmail = email.toLowerCase().trim();
        const user = await this.usersService.findByEmail(normalizedEmail);
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired verification code.');
        }
        const latestOtp = await this.prisma.emailOtp.findFirst({
            where: { userId: user.id, purpose },
            orderBy: { createdAt: 'desc' },
        });
        if (!latestOtp) {
            throw new common_1.BadRequestException('Invalid or expired verification code.');
        }
        if (new Date() > latestOtp.expiresAt) {
            await this.prisma.emailOtp.delete({ where: { id: latestOtp.id } });
            throw new common_1.BadRequestException('Verification code has expired.');
        }
        const otpHash = this.hashValue(otp);
        if (latestOtp.otpHash !== otpHash) {
            const attempts = latestOtp.attempts + 1;
            if (attempts >= 5) {
                await this.prisma.emailOtp.delete({ where: { id: latestOtp.id } });
                throw new common_1.BadRequestException('Too many failed attempts. Please request a new code.');
            }
            await this.prisma.emailOtp.update({
                where: { id: latestOtp.id },
                data: { attempts },
            });
            throw new common_1.BadRequestException('Invalid or expired verification code.');
        }
        await this.prisma.emailOtp.delete({ where: { id: latestOtp.id } });
        if (purpose === client_js_1.OtpPurpose.EMAIL_VERIFICATION) {
            await this.usersService.updateUserStatus(user.id, client_js_1.UserStatus.ACTIVE);
        }
    }
    async login(dto, userAgent, ipAddress) {
        const email = dto.email.toLowerCase().trim();
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password.');
        }
        if (user.status === client_js_1.UserStatus.BLOCKED) {
            throw new common_1.UnauthorizedException('Account is blocked.');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password.');
        }
        if (user.status === client_js_1.UserStatus.PENDING_VERIFICATION) {
            throw new common_1.UnauthorizedException('Please verify your email address.');
        }
        const tokens = await this.generateTokenSet(user, userAgent, ipAddress);
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: this.sanitizeUser(user),
        };
    }
    async adminLogin(dto, userAgent, ipAddress) {
        const email = dto.email.toLowerCase().trim();
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password.');
        }
        if (user.status === client_js_1.UserStatus.BLOCKED) {
            throw new common_1.UnauthorizedException('Account is blocked.');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password.');
        }
        if (user.role !== client_js_1.UserRole.ADMIN && user.role !== client_js_1.UserRole.SUPER_ADMIN) {
            throw new common_1.UnauthorizedException('Access denied: admin credentials required.');
        }
        const tokens = await this.generateTokenSet(user, userAgent, ipAddress);
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: this.sanitizeUser(user),
        };
    }
    async refreshTokens(refreshToken, userAgent, ipAddress) {
        const tokenHash = this.hashValue(refreshToken);
        const session = await this.prisma.refreshSession.findUnique({
            where: { tokenHash },
            include: { user: true },
        });
        if (!session) {
            throw new common_1.UnauthorizedException('Invalid or expired session.');
        }
        if (new Date() > session.expiresAt) {
            await this.prisma.refreshSession.delete({ where: { id: session.id } });
            throw new common_1.UnauthorizedException('Session has expired.');
        }
        if (session.user.status === client_js_1.UserStatus.BLOCKED) {
            await this.prisma.refreshSession.delete({ where: { id: session.id } });
            throw new common_1.UnauthorizedException('Account is blocked.');
        }
        await this.prisma.refreshSession.delete({ where: { id: session.id } });
        const tokens = await this.generateTokenSet(session.user, userAgent, ipAddress);
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: this.sanitizeUser(session.user),
        };
    }
    async logout(refreshToken) {
        const tokenHash = this.hashValue(refreshToken);
        await this.prisma.refreshSession.deleteMany({
            where: { tokenHash },
        });
    }
    async forgotPassword(email) {
        const normalizedEmail = email.toLowerCase().trim();
        const user = await this.usersService.findByEmail(normalizedEmail);
        if (!user) {
            return;
        }
        const otp = await this.generateOtp(user.id, client_js_1.OtpPurpose.PASSWORD_RESET);
        await this.emailService.sendPasswordResetOtp(normalizedEmail, otp);
    }
    async resetPassword(dto) {
        const email = dto.email.toLowerCase().trim();
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired verification code.');
        }
        await this.verifyOtp(email, dto.otp, client_js_1.OtpPurpose.PASSWORD_RESET);
        const passwordHash = await bcrypt.hash(dto.password, 10);
        await this.usersService.updatePasswordHash(user.id, passwordHash);
        await this.prisma.refreshSession.deleteMany({
            where: { userId: user.id },
        });
    }
    async generateTokenSet(user, userAgent, ipAddress) {
        const payload = { userId: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: (this.configService.get('JWT_ACCESS_EXPIRY') ||
                '15m'),
        });
        const refreshToken = this.generateRandomToken();
        const tokenHash = this.hashValue(refreshToken);
        const refreshExpiryDays = 7;
        const expiresAt = new Date(Date.now() + refreshExpiryDays * 24 * 60 * 60 * 1000);
        await this.prisma.refreshSession.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt,
                userAgent,
                ipAddress,
            },
        });
        return { accessToken, refreshToken };
    }
    sanitizeUser(user) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        email_service_1.EmailService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map