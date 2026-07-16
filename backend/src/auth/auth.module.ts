/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminAuthController } from './admin-auth.controller';
import { UsersModule } from '../users/users.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret:
          config.get<string>('JWT_SECRET') ||
          'change_this_to_a_long_random_secret',
        signOptions: {
          expiresIn: (config.get<string>('JWT_ACCESS_EXPIRY') || '15m') as any,
        },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController, AdminAuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
