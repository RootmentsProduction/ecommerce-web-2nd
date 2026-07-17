/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import {
  OtpPurpose,
  User,
  UserRole,
  UserStatus,
} from '../generated/prisma/client.js';
import { SignupDto, LoginDto, ResetPasswordDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private emailService: EmailService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private hashValue(value: string): string {
    return crypto.createHash('sha256').update(value).digest('hex');
  }

  private generateRandomToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  async signup(dto: SignupDto): Promise<void> {
    const email = dto.email.toLowerCase().trim();
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email is already registered.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.createUser({
      email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: UserRole.CUSTOMER,
      status: UserStatus.PENDING_VERIFICATION,
    });

    const otp = await this.generateOtp(user.id, OtpPurpose.EMAIL_VERIFICATION);
    await this.emailService.sendVerificationOtp(email, otp);
  }

  async generateOtp(userId: string, purpose: OtpPurpose): Promise<string> {
    const cooldownSeconds =
      this.configService.get<number>('OTP_COOLDOWN_SECONDS') || 60;
    const expiryMinutes =
      this.configService.get<number>('OTP_EXPIRY_MINUTES') || 15;

    // Check resend cooldown
    const latestOtp = await this.prisma.emailOtp.findFirst({
      where: { userId, purpose },
      orderBy: { createdAt: 'desc' },
    });

    if (latestOtp) {
      const secondsPassed = Math.floor(
        (Date.now() - latestOtp.createdAt.getTime()) / 1000,
      );
      if (secondsPassed < cooldownSeconds) {
        const waitTime = cooldownSeconds - secondsPassed;
        throw new BadRequestException(
          `Please wait ${waitTime} seconds before requesting a new code.`,
        );
      }
    }

    // Generate 6-digit code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = this.hashValue(otp);
    const expiresAt = new Date(Date.now() + expiryMinutes * 60000);

    // Delete older OTPs of same purpose for the user
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

  async resendOtp(email: string): Promise<void> {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) {
      // Return generic success to avoid email enumeration
      return;
    }

    if (user.status !== UserStatus.PENDING_VERIFICATION) {
      throw new BadRequestException('Email is already verified.');
    }

    const otp = await this.generateOtp(user.id, OtpPurpose.EMAIL_VERIFICATION);
    await this.emailService.sendVerificationOtp(normalizedEmail, otp);
  }

  async verifyOtp(
    email: string,
    otp: string,
    purpose: OtpPurpose,
  ): Promise<void> {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) {
      throw new BadRequestException('Invalid or expired verification code.');
    }

    const latestOtp = await this.prisma.emailOtp.findFirst({
      where: { userId: user.id, purpose },
      orderBy: { createdAt: 'desc' },
    });

    if (!latestOtp) {
      throw new BadRequestException('Invalid or expired verification code.');
    }

    if (new Date() > latestOtp.expiresAt) {
      await this.prisma.emailOtp.delete({ where: { id: latestOtp.id } });
      throw new BadRequestException('Verification code has expired.');
    }

    const otpHash = this.hashValue(otp);
    if (latestOtp.otpHash !== otpHash) {
      const attempts = latestOtp.attempts + 1;
      if (attempts >= 5) {
        await this.prisma.emailOtp.delete({ where: { id: latestOtp.id } });
        throw new BadRequestException(
          'Too many failed attempts. Please request a new code.',
        );
      }

      await this.prisma.emailOtp.update({
        where: { id: latestOtp.id },
        data: { attempts },
      });
      throw new BadRequestException('Invalid or expired verification code.');
    }

    // Success: delete the verified OTP
    await this.prisma.emailOtp.delete({ where: { id: latestOtp.id } });

    if (purpose === OtpPurpose.EMAIL_VERIFICATION) {
      await this.usersService.updateUserStatus(user.id, UserStatus.ACTIVE);
    }
  }

  async login(
    dto: LoginDto,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<{ accessToken: string; user: any; refreshToken: string }> {
    const email = dto.email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (user.status === UserStatus.BLOCKED) {
      throw new UnauthorizedException('Account is blocked.');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (user.status === UserStatus.PENDING_VERIFICATION) {
      throw new UnauthorizedException('Please verify your email address.');
    }

    const tokens = await this.generateTokenSet(user, userAgent, ipAddress);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.sanitizeUser(user),
    };
  }

  async adminLogin(
    dto: LoginDto,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<{ accessToken: string; user: any; refreshToken: string }> {
    const email = dto.email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (user.status === UserStatus.BLOCKED) {
      throw new UnauthorizedException('Account is blocked.');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN) {
      throw new UnauthorizedException(
        'Access denied: admin credentials required.',
      );
    }

    const tokens = await this.generateTokenSet(user, userAgent, ipAddress);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.sanitizeUser(user),
    };
  }

  async refreshTokens(
    refreshToken: string,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<{ accessToken: string; user: any; refreshToken: string }> {
    const tokenHash = this.hashValue(refreshToken);
    const session = await this.prisma.refreshSession.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!session) {
      throw new UnauthorizedException('Invalid or expired session.');
    }

    if (new Date() > session.expiresAt) {
      await this.prisma.refreshSession.delete({ where: { id: session.id } });
      throw new UnauthorizedException('Session has expired.');
    }

    if (session.user.status === UserStatus.BLOCKED) {
      await this.prisma.refreshSession.delete({ where: { id: session.id } });
      throw new UnauthorizedException('Account is blocked.');
    }

    // Rotate tokens: delete old session
    await this.prisma.refreshSession.delete({ where: { id: session.id } });

    const tokens = await this.generateTokenSet(
      session.user,
      userAgent,
      ipAddress,
    );
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.sanitizeUser(session.user),
    };
  }

  async logout(refreshToken: string): Promise<void> {
    const tokenHash = this.hashValue(refreshToken);
    await this.prisma.refreshSession.deleteMany({
      where: { tokenHash },
    });
  }

  async forgotPassword(email: string): Promise<void> {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) {
      // Avoid user enumeration
      return;
    }

    const otp = await this.generateOtp(user.id, OtpPurpose.PASSWORD_RESET);
    await this.emailService.sendPasswordResetOtp(normalizedEmail, otp);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const email = dto.email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid or expired verification code.');
    }

    await this.verifyOtp(email, dto.otp, OtpPurpose.PASSWORD_RESET);

    const passwordHash = await bcrypt.hash(dto.password, 10);
    await this.usersService.updatePasswordHash(user.id, passwordHash);

    // Terminate all user sessions for safety after password reset
    await this.prisma.refreshSession.deleteMany({
      where: { userId: user.id },
    });
  }

  private async generateTokenSet(
    user: User,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { userId: user.id, email: user.email, role: user.role };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: (this.configService.get<string>('JWT_ACCESS_EXPIRY') ||
        '15m') as any,
    });

    const refreshToken = this.generateRandomToken();
    const tokenHash = this.hashValue(refreshToken);

    // Default 7 days
    const refreshExpiryDays = 7;
    const expiresAt = new Date(
      Date.now() + refreshExpiryDays * 24 * 60 * 60 * 1000,
    );

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

  sanitizeUser(user: User) {
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
}
