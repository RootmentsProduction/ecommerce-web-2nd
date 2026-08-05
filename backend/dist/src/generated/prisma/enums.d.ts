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
export declare const ProductImageRole: {
    readonly PRIMARY: "PRIMARY";
    readonly HOVER: "HOVER";
    readonly GALLERY: "GALLERY";
};
export type ProductImageRole = (typeof ProductImageRole)[keyof typeof ProductImageRole];
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
export declare const ShipmentStatus: {
    readonly NEW: "NEW";
    readonly COURIER_ASSIGNED: "COURIER_ASSIGNED";
    readonly PICKUP_SCHEDULED: "PICKUP_SCHEDULED";
    readonly PICKED_UP: "PICKED_UP";
    readonly IN_TRANSIT: "IN_TRANSIT";
    readonly OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
    readonly RTO_INITIATED: "RTO_INITIATED";
    readonly RTO_DELIVERED: "RTO_DELIVERED";
};
export type ShipmentStatus = (typeof ShipmentStatus)[keyof typeof ShipmentStatus];
export declare const PickupStatus: {
    readonly PENDING: "PENDING";
    readonly SCHEDULED: "SCHEDULED";
    readonly PICKED_UP: "PICKED_UP";
    readonly CANCELLED: "CANCELLED";
};
export type PickupStatus = (typeof PickupStatus)[keyof typeof PickupStatus];
