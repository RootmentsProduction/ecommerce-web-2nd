import { MediaService } from './media.service';
export declare class GetPresignedUrlDto {
    folder: string;
    filename: string;
    contentType: string;
}
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    getPresignedUrl(dto: GetPresignedUrlDto): Promise<{
        uploadUrl: string;
        fileUrl: string;
        key: string;
    }>;
    mockUpload(key: string): {
        message: string;
        success: boolean;
        url: string;
    };
}
