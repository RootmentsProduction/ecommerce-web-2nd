import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);
  private readonly s3Client: S3Client | null = null;
  private readonly bucketName: string | null = null;
  private readonly region: string;
  private readonly cloudFrontUrl: string | null = null;
  private readonly prefix: string;

  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    this.region =
      this.configService.get<string>('AWS_REGION') || 'ap-southeast-2';
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET') || null;
    this.cloudFrontUrl =
      this.configService.get<string>('AWS_S3_CLOUDFRONT_URL') || null;

    const nodeEnv = this.configService.get<string>('NODE_ENV') || 'development';
    this.prefix = nodeEnv === 'production' ? 'production/' : 'staging/';

    if (accessKeyId && secretAccessKey && this.bucketName) {
      this.s3Client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.logger.log(
        `AWS S3 Media Storage initialized (Bucket: ${this.bucketName}, Prefix: ${this.prefix})`,
      );
    } else {
      this.logger.warn(
        'AWS S3 configurations missing. Falling back to local mock uploads.',
      );
    }
  }

  getPrefix(): string {
    return this.prefix;
  }

  async getPresignedUploadUrl(
    folder: string,
    filename: string,
    contentType: string,
  ): Promise<{ uploadUrl: string; fileUrl: string; key: string }> {
    const sanitizedFilename = filename
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9.-]/g, '');
    const key = `${this.prefix}${folder}/${Date.now()}-${sanitizedFilename}`;

    // Validate MIME type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'video/mp4',
      'video/quicktime',
      'video/webm',
      'application/pdf',
    ];
    if (!allowedTypes.includes(contentType)) {
      throw new BadRequestException(`File type ${contentType} is not allowed.`);
    }

    if (this.s3Client && this.bucketName) {
      try {
        const command = new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          ContentType: contentType,
        });

        // Expires in 15 minutes
        const uploadUrl = await getSignedUrl(this.s3Client, command, {
          expiresIn: 900,
        });

        let fileUrl: string;
        if (this.cloudFrontUrl) {
          const cleanCfUrl = this.cloudFrontUrl.replace(/\/$/, '');
          fileUrl = `${cleanCfUrl}/${key}`;
        } else {
          fileUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
        }

        return { uploadUrl, fileUrl, key };
      } catch (error) {
        this.logger.error('Failed to generate presigned S3 URL:', error);
        throw new BadRequestException('Failed to generate upload URL');
      }
    } else {
      // Local development mock behavior
      const mockUploadUrl = `http://localhost:${this.configService.get<number>('PORT') || 7001}/api/media/mock-upload?key=${key}`;
      const mockFileUrl = `/uploads/${key}`;
      return {
        uploadUrl: mockUploadUrl,
        fileUrl: mockFileUrl,
        key,
      };
    }
  }

  async deleteFile(key: string): Promise<void> {
    if (this.s3Client && this.bucketName) {
      try {
        const command = new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        });
        await this.s3Client.send(command);
        this.logger.log(`Successfully deleted S3 file key: ${key}`);
      } catch (error) {
        this.logger.error(`Failed to delete S3 key ${key}:`, error);
      }
    } else {
      this.logger.log(`[Mock S3] Deleting mock file key: ${key}`);
    }
  }
}
