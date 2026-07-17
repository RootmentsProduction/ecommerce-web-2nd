import {
  Controller,
  Post,
  Put,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../generated/prisma/client.js';
import { MediaService } from './media.service';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class GetPresignedUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsIn([
    'products/images',
    'products/videos',
    'categories',
    'banners',
    'vendors/documents',
    'users',
  ])
  folder: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;
}

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('presigned-url')
  @HttpCode(HttpStatus.OK)
  async getPresignedUrl(@Body() dto: GetPresignedUrlDto) {
    const { folder, filename, contentType } = dto;
    return this.mediaService.getPresignedUploadUrl(
      folder,
      filename,
      contentType,
    );
  }

  // Fallback endpoint for local development mock uploads
  @Put('mock-upload')
  @HttpCode(HttpStatus.OK)
  mockUpload(@Query('key') key: string) {
    return {
      message: `Local mock S3 upload completed successfully for key: ${key}`,
      success: true,
      url: `/uploads/${key}`,
    };
  }
}
