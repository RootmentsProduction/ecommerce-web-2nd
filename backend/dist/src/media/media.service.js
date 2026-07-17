"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MediaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let MediaService = MediaService_1 = class MediaService {
    configService;
    logger = new common_1.Logger(MediaService_1.name);
    s3Client = null;
    bucketName = null;
    region;
    cloudFrontUrl = null;
    prefix;
    constructor(configService) {
        this.configService = configService;
        const accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');
        this.region =
            this.configService.get('AWS_REGION') || 'ap-southeast-2';
        this.bucketName = this.configService.get('AWS_S3_BUCKET') || null;
        this.cloudFrontUrl =
            this.configService.get('AWS_S3_CLOUDFRONT_URL') || null;
        const nodeEnv = this.configService.get('NODE_ENV') || 'development';
        this.prefix = nodeEnv === 'production' ? 'production/' : 'staging/';
        if (accessKeyId && secretAccessKey && this.bucketName) {
            this.s3Client = new client_s3_1.S3Client({
                region: this.region,
                credentials: {
                    accessKeyId,
                    secretAccessKey,
                },
            });
            this.logger.log(`AWS S3 Media Storage initialized (Bucket: ${this.bucketName}, Prefix: ${this.prefix})`);
        }
        else {
            this.logger.warn('AWS S3 configurations missing. Falling back to local mock uploads.');
        }
    }
    getPrefix() {
        return this.prefix;
    }
    async getPresignedUploadUrl(folder, filename, contentType) {
        const sanitizedFilename = filename
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9.-]/g, '');
        const key = `${this.prefix}${folder}/${Date.now()}-${sanitizedFilename}`;
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
            throw new common_1.BadRequestException(`File type ${contentType} is not allowed.`);
        }
        if (this.s3Client && this.bucketName) {
            try {
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                    ContentType: contentType,
                });
                const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, {
                    expiresIn: 900,
                });
                let fileUrl;
                if (this.cloudFrontUrl) {
                    const cleanCfUrl = this.cloudFrontUrl.replace(/\/$/, '');
                    fileUrl = `${cleanCfUrl}/${key}`;
                }
                else {
                    fileUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
                }
                return { uploadUrl, fileUrl, key };
            }
            catch (error) {
                this.logger.error('Failed to generate presigned S3 URL:', error);
                throw new common_1.BadRequestException('Failed to generate upload URL');
            }
        }
        else {
            const mockUploadUrl = `http://localhost:${this.configService.get('PORT') || 7001}/api/media/mock-upload?key=${key}`;
            const mockFileUrl = `/uploads/${key}`;
            return {
                uploadUrl: mockUploadUrl,
                fileUrl: mockFileUrl,
                key,
            };
        }
    }
    async deleteFile(key) {
        if (this.s3Client && this.bucketName) {
            try {
                const command = new client_s3_1.DeleteObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                });
                await this.s3Client.send(command);
                this.logger.log(`Successfully deleted S3 file key: ${key}`);
            }
            catch (error) {
                this.logger.error(`Failed to delete S3 key ${key}:`, error);
            }
        }
        else {
            this.logger.log(`[Mock S3] Deleting mock file key: ${key}`);
        }
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = MediaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MediaService);
//# sourceMappingURL=media.service.js.map