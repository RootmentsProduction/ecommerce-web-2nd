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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = exports.GetPresignedUrlDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_js_1 = require("../generated/prisma/client.js");
const media_service_1 = require("./media.service");
const class_validator_1 = require("class-validator");
class GetPresignedUrlDto {
    folder;
    filename;
    contentType;
}
exports.GetPresignedUrlDto = GetPresignedUrlDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([
        'products/images',
        'products/videos',
        'categories',
        'banners',
        'vendors/documents',
        'users',
    ]),
    __metadata("design:type", String)
], GetPresignedUrlDto.prototype, "folder", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetPresignedUrlDto.prototype, "filename", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetPresignedUrlDto.prototype, "contentType", void 0);
let MediaController = class MediaController {
    mediaService;
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async getPresignedUrl(dto) {
        const { folder, filename, contentType } = dto;
        return this.mediaService.getPresignedUploadUrl(folder, filename, contentType);
    }
    mockUpload(key) {
        return {
            message: `Local mock S3 upload completed successfully for key: ${key}`,
            success: true,
            url: `/uploads/${key}`,
        };
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_js_1.UserRole.ADMIN, client_js_1.UserRole.SUPER_ADMIN),
    (0, common_1.Post)('presigned-url'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPresignedUrlDto]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getPresignedUrl", null);
__decorate([
    (0, common_1.Put)('mock-upload'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "mockUpload", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map