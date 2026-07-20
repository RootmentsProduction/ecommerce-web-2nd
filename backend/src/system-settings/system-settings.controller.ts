import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '../generated/prisma/client.js';
import { SystemSettingsService } from './system-settings.service';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateSettingDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  value: string;
}

@Controller('system-settings')
export class SystemSettingsController {
  constructor(private readonly settingsService: SystemSettingsService) {}

  @Public()
  @Get()
  async getSettings() {
    return this.settingsService.getAllSettings();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateSetting(@Body() dto: UpdateSettingDto) {
    return this.settingsService.setSetting(dto.key, dto.value);
  }
}
