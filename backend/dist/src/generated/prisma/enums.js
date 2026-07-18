"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpPurpose = exports.UserStatus = exports.UserRole = exports.ProductImageRole = exports.StockTransactionType = exports.ProductStatus = void 0;
exports.ProductStatus = {
    DRAFT: 'DRAFT',
    ACTIVE: 'ACTIVE',
    ARCHIVED: 'ARCHIVED'
};
exports.StockTransactionType = {
    OPENING_STOCK: 'OPENING_STOCK',
    STOCK_ADDED: 'STOCK_ADDED',
    STOCK_REMOVED: 'STOCK_REMOVED',
    SALE: 'SALE',
    CUSTOMER_RETURN: 'CUSTOMER_RETURN',
    DAMAGED: 'DAMAGED',
    MANUAL_CORRECTION: 'MANUAL_CORRECTION',
    PURCHASE_RECEIPT: 'PURCHASE_RECEIPT'
};
exports.ProductImageRole = {
    PRIMARY: 'PRIMARY',
    HOVER: 'HOVER',
    GALLERY: 'GALLERY'
};
exports.UserRole = {
    CUSTOMER: 'CUSTOMER',
    ADMIN: 'ADMIN',
    SUPER_ADMIN: 'SUPER_ADMIN'
};
exports.UserStatus = {
    PENDING_VERIFICATION: 'PENDING_VERIFICATION',
    ACTIVE: 'ACTIVE',
    BLOCKED: 'BLOCKED'
};
exports.OtpPurpose = {
    EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
    PASSWORD_RESET: 'PASSWORD_RESET'
};
//# sourceMappingURL=enums.js.map