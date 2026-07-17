export declare const ProductStatus: {
    readonly DRAFT: "DRAFT";
    readonly ACTIVE: "ACTIVE";
    readonly ARCHIVED: "ARCHIVED";
};
export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];
export declare const StockTransactionType: {
    readonly OPENING_STOCK: "OPENING_STOCK";
    readonly STOCK_ADDED: "STOCK_ADDED";
    readonly STOCK_REMOVED: "STOCK_REMOVED";
    readonly SALE: "SALE";
    readonly CUSTOMER_RETURN: "CUSTOMER_RETURN";
    readonly DAMAGED: "DAMAGED";
    readonly MANUAL_CORRECTION: "MANUAL_CORRECTION";
    readonly PURCHASE_RECEIPT: "PURCHASE_RECEIPT";
};
export type StockTransactionType = (typeof StockTransactionType)[keyof typeof StockTransactionType];
export declare const UserRole: {
    readonly CUSTOMER: "CUSTOMER";
    readonly ADMIN: "ADMIN";
    readonly SUPER_ADMIN: "SUPER_ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly PENDING_VERIFICATION: "PENDING_VERIFICATION";
    readonly ACTIVE: "ACTIVE";
    readonly BLOCKED: "BLOCKED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const OtpPurpose: {
    readonly EMAIL_VERIFICATION: "EMAIL_VERIFICATION";
    readonly PASSWORD_RESET: "PASSWORD_RESET";
};
export type OtpPurpose = (typeof OtpPurpose)[keyof typeof OtpPurpose];
