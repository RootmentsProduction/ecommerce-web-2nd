"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const admin_auth_controller_1 = require("./admin-auth.controller");
const users_module_1 = require("../users/users.module");
const email_module_1 = require("../email/email.module");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            email_module_1.EmailModule,
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET') ||
                        'change_this_to_a_long_random_secret',
                    signOptions: {
                        expiresIn: (config.get('JWT_ACCESS_EXPIRY') || '15m'),
                    },
                }),
            }),
        ],
        providers: [auth_service_1.AuthService, jwt_auth_guard_1.JwtAuthGuard],
        controllers: [auth_controller_1.AuthController, admin_auth_controller_1.AdminAuthController],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule, jwt_auth_guard_1.JwtAuthGuard, users_module_1.UsersModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map