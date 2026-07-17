/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Ip,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import * as express from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Public } from './decorators/public.decorator';

@Controller('admin/auth')
export class AdminAuthController {
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

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
    @Ip() ip: string,
  ) {
    const userAgent = req.headers['user-agent'];
    const result = await this.authService.adminLogin(dto, userAgent, ip);
    this.setRefreshCookie(res, result.refreshToken);
    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }
}
