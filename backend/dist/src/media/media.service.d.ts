import { ConfigService } from '@nestjs/config';
export declare class MediaService {
    private configService;
    private readonly logger;
    private readonly s3Client;
    private readonly bucketName;
    private readonly region;
    private readonly cloudFrontUrl;
    private readonly prefix;
    constructor(configService: ConfigService);
    getPrefix(): string;
    getPresignedUploadUrl(folder: string, filename: string, contentType: string): Promise<{
        uploadUrl: string;
        fileUrl: string;
        key: string;
    }>;
    deleteFile(key: string): Promise<void>;
}
