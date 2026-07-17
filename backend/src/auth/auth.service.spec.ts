import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  OtpPurpose,
  UserRole,
  UserStatus,
} from '../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let prismaMock: any;
  let usersServiceMock: any;
  let emailServiceMock: any;
  let jwtServiceMock: any;
  let configServiceMock: any;

  beforeEach(async () => {
    prismaMock = {
      emailOtp: {
        findFirst: jest.fn(),
        deleteMany: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
      },
    };

    usersServiceMock = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
      updateUserStatus: jest.fn(),
    };

    emailServiceMock = {
      sendVerificationOtp: jest.fn(),
    };

    jwtServiceMock = {
      sign: jest.fn().mockReturnValue('mock-jwt-token'),
    };

    configServiceMock = {
      get: jest.fn((key: string) => {
        if (key === 'OTP_COOLDOWN_SECONDS') return 60;
        if (key === 'OTP_EXPIRY_MINUTES') return 15;
        if (key === 'JWT_ACCESS_SECRET') return 'access-secret';
        if (key === 'JWT_REFRESH_SECRET') return 'refresh-secret';
        if (key === 'JWT_ACCESS_EXPIRY') return '15m';
        if (key === 'JWT_REFRESH_EXPIRY') return '7d';
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: EmailService, useValue: emailServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should throw ConflictException if user already exists', async () => {
      usersServiceMock.findByEmail.mockResolvedValue({ id: '123' });
      await expect(
        service.signup({
          email: 'test@example.com',
          password: 'Password123!',
          firstName: 'John',
          lastName: 'Doe',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create user and generate email verification OTP if successful', async () => {
      usersServiceMock.findByEmail.mockResolvedValue(null);
      usersServiceMock.createUser.mockResolvedValue({
        id: '123',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
        status: UserStatus.PENDING_VERIFICATION,
      });
      prismaMock.emailOtp.findFirst.mockResolvedValue(null);
      prismaMock.emailOtp.create.mockResolvedValue({});

      await service.signup({
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      });

      expect(usersServiceMock.createUser).toHaveBeenCalled();
      expect(emailServiceMock.sendVerificationOtp).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      usersServiceMock.findByEmail.mockResolvedValue(null);
      await expect(
        service.login({ email: 'test@example.com', password: 'Password123!' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const hashedPassword = await bcrypt.hash('Password123!', 10);
      usersServiceMock.findByEmail.mockResolvedValue({
        id: '123',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        status: UserStatus.ACTIVE,
      });

      await expect(
        service.login({ email: 'test@example.com', password: 'WrongPassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if account is blocked', async () => {
      const hashedPassword = await bcrypt.hash('Password123!', 10);
      usersServiceMock.findByEmail.mockResolvedValue({
        id: '123',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        status: UserStatus.BLOCKED,
      });

      await expect(
        service.login({ email: 'test@example.com', password: 'Password123!' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
