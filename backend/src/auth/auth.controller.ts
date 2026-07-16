/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  Ip,
} from '@nestjs/common';
import * as express from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { OtpPurpose } from '../generated/prisma/client.js';
import {
  SignupDto,
  LoginDto,
  VerifyOtpDto,
  ResendOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private setRefreshCookie(res: express.Response, token: string) {
    const isProd =
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging';

    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  private clearRefreshCookie(res: express.Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      path: '/',
    });
  }

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    await this.authService.signup(dto);
    return {
      message: 'Signup successful. Verification OTP sent to your email.',
    };
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() dto: VerifyOtpDto) {
    await this.authService.verifyOtp(
      dto.email,
      dto.otp,
      OtpPurpose.EMAIL_VERIFICATION,
    );
    return { message: 'Email verified successfully. You can now log in.' };
  }

  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  async resendOtp(@Body() dto: ResendOtpDto) {
    await this.authService.resendOtp(dto.email);
    return { message: 'Verification OTP code resent if email exists.' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
    @Ip() ip: string,
  ) {
    const userAgent = req.headers['user-agent'];
    const result = await this.authService.login(dto, userAgent, ip);
    this.setRefreshCookie(res, result.refreshToken);
    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
    @Ip() ip: string,
  ) {
    const token = req.cookies['refreshToken'];
    if (!token) {
      throw new UnauthorizedException('Session expired. Please log in again.');
    }
    const userAgent = req.headers['user-agent'];
    try {
      const result = await this.authService.refreshTokens(token, userAgent, ip);
      this.setRefreshCookie(res, result.refreshToken);
      return {
        accessToken: result.accessToken,
        user: result.user,
      };
    } catch (error) {
      this.clearRefreshCookie(res);
      throw error;
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const token = req.cookies['refreshToken'];
    if (token) {
      await this.authService.logout(token);
    }
    this.clearRefreshCookie(res);
    return { message: 'Logged out successfully.' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: any) {
    return { user: this.authService.sanitizeUser(user) };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto.email);
    return {
      message: 'If the email exists, a password reset code has been sent.',
    };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);
    return { message: 'Password reset successful. You can now log in.' };
  }
}
