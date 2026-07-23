"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const email_module_1 = require("./email/email.module");
const auth_module_1 = require("./auth/auth.module");
const media_module_1 = require("./media/media.module");
const categories_module_1 = require("./categories/categories.module");
const products_module_1 = require("./products/products.module");
const inventory_module_1 = require("./inventory/inventory.module");
const vendors_module_1 = require("./vendors/vendors.module");
const purchase_orders_module_1 = require("./purchase-orders/purchase-orders.module");
const customers_module_1 = require("./customers/customers.module");
const orders_module_1 = require("./orders/orders.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const system_settings_module_1 = require("./system-settings/system-settings.module");
const phonepe_module_1 = require("./phonepe/phonepe.module");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            email_module_1.EmailModule,
            auth_module_1.AuthModule,
            media_module_1.MediaModule,
            categories_module_1.CategoriesModule,
            products_module_1.ProductsModule,
            inventory_module_1.InventoryModule,
            vendors_module_1.VendorsModule,
            purchase_orders_module_1.PurchaseOrdersModule,
            customers_module_1.CustomersModule,
            orders_module_1.OrdersModule,
            dashboard_module_1.DashboardModule,
            system_settings_module_1.SystemSettingsModule,
            phonepe_module_1.PhonepeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map