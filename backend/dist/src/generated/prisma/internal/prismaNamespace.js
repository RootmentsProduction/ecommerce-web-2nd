"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.OrderItemScalarFieldEnum = exports.OrderScalarFieldEnum = exports.CustomerAddressScalarFieldEnum = exports.PurchaseReceiptItemScalarFieldEnum = exports.PurchaseReceiptScalarFieldEnum = exports.PurchaseOrderItemScalarFieldEnum = exports.PurchaseOrderScalarFieldEnum = exports.VendorBankAccountScalarFieldEnum = exports.VendorContactScalarFieldEnum = exports.VendorAddressScalarFieldEnum = exports.VendorScalarFieldEnum = exports.RefreshSessionScalarFieldEnum = exports.EmailOtpScalarFieldEnum = exports.UserScalarFieldEnum = exports.StockTransactionScalarFieldEnum = exports.InventoryScalarFieldEnum = exports.ProductVariantScalarFieldEnum = exports.ProductImageScalarFieldEnum = exports.ProductScalarFieldEnum = exports.CategoryScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.8.0",
    engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Category: 'Category',
    Product: 'Product',
    ProductImage: 'ProductImage',
    ProductVariant: 'ProductVariant',
    Inventory: 'Inventory',
    StockTransaction: 'StockTransaction',
    User: 'User',
    EmailOtp: 'EmailOtp',
    RefreshSession: 'RefreshSession',
    Vendor: 'Vendor',
    VendorAddress: 'VendorAddress',
    VendorContact: 'VendorContact',
    VendorBankAccount: 'VendorBankAccount',
    PurchaseOrder: 'PurchaseOrder',
    PurchaseOrderItem: 'PurchaseOrderItem',
    PurchaseReceipt: 'PurchaseReceipt',
    PurchaseReceiptItem: 'PurchaseReceiptItem',
    CustomerAddress: 'CustomerAddress',
    Order: 'Order',
    OrderItem: 'OrderItem'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.CategoryScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    image: 'image',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    sku: 'sku',
    shortDescription: 'shortDescription',
    description: 'description',
    sellingPrice: 'sellingPrice',
    mrp: 'mrp',
    costPrice: 'costPrice',
    status: 'status',
    featured: 'featured',
    newArrival: 'newArrival',
    bestSeller: 'bestSeller',
    showOnHomepage: 'showOnHomepage',
    occasion: 'occasion',
    gender: 'gender',
    categoryId: 'categoryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductImageScalarFieldEnum = {
    id: 'id',
    url: 'url',
    altText: 'altText',
    isPrimary: 'isPrimary',
    imageRole: 'imageRole',
    sortOrder: 'sortOrder',
    productId: 'productId',
    createdAt: 'createdAt'
};
exports.ProductVariantScalarFieldEnum = {
    id: 'id',
    name: 'name',
    sku: 'sku',
    sellingPrice: 'sellingPrice',
    isActive: 'isActive',
    productId: 'productId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.InventoryScalarFieldEnum = {
    id: 'id',
    currentStock: 'currentStock',
    reservedStock: 'reservedStock',
    incomingStock: 'incomingStock',
    minimumRequired: 'minimumRequired',
    reorderPoint: 'reorderPoint',
    productId: 'productId',
    variantId: 'variantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.StockTransactionScalarFieldEnum = {
    id: 'id',
    type: 'type',
    quantity: 'quantity',
    beforeStock: 'beforeStock',
    afterStock: 'afterStock',
    reason: 'reason',
    reference: 'reference',
    changedBy: 'changedBy',
    productId: 'productId',
    variantId: 'variantId',
    createdAt: 'createdAt'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.EmailOtpScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    otpHash: 'otpHash',
    purpose: 'purpose',
    expiresAt: 'expiresAt',
    attempts: 'attempts',
    createdAt: 'createdAt'
};
exports.RefreshSessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    userAgent: 'userAgent',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
};
exports.VendorScalarFieldEnum = {
    id: 'id',
    salutation: 'salutation',
    firstName: 'firstName',
    lastName: 'lastName',
    companyName: 'companyName',
    displayName: 'displayName',
    email: 'email',
    workPhone: 'workPhone',
    mobile: 'mobile',
    language: 'language',
    gstTreatment: 'gstTreatment',
    sourceOfSupply: 'sourceOfSupply',
    pan: 'pan',
    gstin: 'gstin',
    currency: 'currency',
    paymentTerms: 'paymentTerms',
    tdsRate: 'tdsRate',
    remarks: 'remarks',
    attachments: 'attachments',
    commentsJson: 'commentsJson',
    historyJson: 'historyJson',
    payables: 'payables',
    unusedCredits: 'unusedCredits',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.VendorAddressScalarFieldEnum = {
    id: 'id',
    vendorId: 'vendorId',
    type: 'type',
    attention: 'attention',
    countryRegion: 'countryRegion',
    street1: 'street1',
    street2: 'street2',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    phone: 'phone',
    fax: 'fax'
};
exports.VendorContactScalarFieldEnum = {
    id: 'id',
    vendorId: 'vendorId',
    salutation: 'salutation',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    workPhone: 'workPhone',
    mobile: 'mobile'
};
exports.VendorBankAccountScalarFieldEnum = {
    id: 'id',
    vendorId: 'vendorId',
    accountHolderName: 'accountHolderName',
    bankName: 'bankName',
    accountNumber: 'accountNumber',
    ifscCode: 'ifscCode'
};
exports.PurchaseOrderScalarFieldEnum = {
    id: 'id',
    vendorId: 'vendorId',
    vendorName: 'vendorName',
    vendorState: 'vendorState',
    deliverToBranch: 'deliverToBranch',
    deliverToState: 'deliverToState',
    deliverToAddress: 'deliverToAddress',
    referenceNumber: 'referenceNumber',
    date: 'date',
    deliveryDate: 'deliveryDate',
    paymentTerms: 'paymentTerms',
    shipmentPreference: 'shipmentPreference',
    status: 'status',
    subtotal: 'subtotal',
    discountType: 'discountType',
    discountValue: 'discountValue',
    discountUnit: 'discountUnit',
    discountAfterTax: 'discountAfterTax',
    discountAmount: 'discountAmount',
    taxSplitType: 'taxSplitType',
    cgstAmount: 'cgstAmount',
    sgstAmount: 'sgstAmount',
    igstAmount: 'igstAmount',
    taxTotal: 'taxTotal',
    tdsTcsType: 'tdsTcsType',
    tdsTcsRate: 'tdsTcsRate',
    tdsTcsAmount: 'tdsTcsAmount',
    tdsTcsName: 'tdsTcsName',
    adjustment: 'adjustment',
    total: 'total',
    customerNotes: 'customerNotes',
    termsAndConditions: 'termsAndConditions',
    attachments: 'attachments',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PurchaseOrderItemScalarFieldEnum = {
    id: 'id',
    purchaseOrderId: 'purchaseOrderId',
    sku: 'sku',
    name: 'name',
    size: 'size',
    quantity: 'quantity',
    receivedQuantity: 'receivedQuantity',
    rate: 'rate',
    taxRate: 'taxRate',
    taxAmount: 'taxAmount',
    amount: 'amount'
};
exports.PurchaseReceiptScalarFieldEnum = {
    id: 'id',
    purchaseOrderId: 'purchaseOrderId',
    receivedBy: 'receivedBy',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.PurchaseReceiptItemScalarFieldEnum = {
    id: 'id',
    receiptId: 'receiptId',
    sku: 'sku',
    quantityReceived: 'quantityReceived'
};
exports.CustomerAddressScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    street1: 'street1',
    street2: 'street2',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    country: 'country',
    phone: 'phone',
    createdAt: 'createdAt'
};
exports.OrderScalarFieldEnum = {
    id: 'id',
    orderNumber: 'orderNumber',
    customerId: 'customerId',
    status: 'status',
    paymentStatus: 'paymentStatus',
    subtotal: 'subtotal',
    taxTotal: 'taxTotal',
    shippingCharge: 'shippingCharge',
    discountAmount: 'discountAmount',
    total: 'total',
    shippingAddress: 'shippingAddress',
    billingAddress: 'billingAddress',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OrderItemScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    variantId: 'variantId',
    name: 'name',
    sku: 'sku',
    variantName: 'variantName',
    quantity: 'quantity',
    price: 'price'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map