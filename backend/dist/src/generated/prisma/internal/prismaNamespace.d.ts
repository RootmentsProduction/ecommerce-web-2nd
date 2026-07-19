import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly Category: "Category";
    readonly Product: "Product";
    readonly ProductImage: "ProductImage";
    readonly ProductVariant: "ProductVariant";
    readonly Inventory: "Inventory";
    readonly StockTransaction: "StockTransaction";
    readonly User: "User";
    readonly EmailOtp: "EmailOtp";
    readonly RefreshSession: "RefreshSession";
    readonly Vendor: "Vendor";
    readonly VendorAddress: "VendorAddress";
    readonly VendorContact: "VendorContact";
    readonly VendorBankAccount: "VendorBankAccount";
    readonly PurchaseOrder: "PurchaseOrder";
    readonly PurchaseOrderItem: "PurchaseOrderItem";
    readonly PurchaseReceipt: "PurchaseReceipt";
    readonly PurchaseReceiptItem: "PurchaseReceiptItem";
    readonly CustomerAddress: "CustomerAddress";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly SystemSetting: "SystemSetting";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "category" | "product" | "productImage" | "productVariant" | "inventory" | "stockTransaction" | "user" | "emailOtp" | "refreshSession" | "vendor" | "vendorAddress" | "vendorContact" | "vendorBankAccount" | "purchaseOrder" | "purchaseOrderItem" | "purchaseReceipt" | "purchaseReceiptItem" | "customerAddress" | "order" | "orderItem" | "systemSetting";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Category: {
            payload: Prisma.$CategoryPayload<ExtArgs>;
            fields: Prisma.CategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findFirst: {
                    args: Prisma.CategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findMany: {
                    args: Prisma.CategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                create: {
                    args: Prisma.CategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                createMany: {
                    args: Prisma.CategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                delete: {
                    args: Prisma.CategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                update: {
                    args: Prisma.CategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.CategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                upsert: {
                    args: Prisma.CategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                aggregate: {
                    args: Prisma.CategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCategory>;
                };
                groupBy: {
                    args: Prisma.CategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryCountAggregateOutputType> | number;
                };
            };
        };
        Product: {
            payload: Prisma.$ProductPayload<ExtArgs>;
            fields: Prisma.ProductFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findFirst: {
                    args: Prisma.ProductFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findMany: {
                    args: Prisma.ProductFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                create: {
                    args: Prisma.ProductCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                createMany: {
                    args: Prisma.ProductCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                delete: {
                    args: Prisma.ProductDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                update: {
                    args: Prisma.ProductUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                upsert: {
                    args: Prisma.ProductUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                aggregate: {
                    args: Prisma.ProductAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProduct>;
                };
                groupBy: {
                    args: Prisma.ProductGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductCountAggregateOutputType> | number;
                };
            };
        };
        ProductImage: {
            payload: Prisma.$ProductImagePayload<ExtArgs>;
            fields: Prisma.ProductImageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductImageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductImageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                findFirst: {
                    args: Prisma.ProductImageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductImageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                findMany: {
                    args: Prisma.ProductImageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>[];
                };
                create: {
                    args: Prisma.ProductImageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                createMany: {
                    args: Prisma.ProductImageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductImageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>[];
                };
                delete: {
                    args: Prisma.ProductImageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                update: {
                    args: Prisma.ProductImageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                deleteMany: {
                    args: Prisma.ProductImageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductImageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductImageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>[];
                };
                upsert: {
                    args: Prisma.ProductImageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                aggregate: {
                    args: Prisma.ProductImageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductImage>;
                };
                groupBy: {
                    args: Prisma.ProductImageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductImageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductImageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductImageCountAggregateOutputType> | number;
                };
            };
        };
        ProductVariant: {
            payload: Prisma.$ProductVariantPayload<ExtArgs>;
            fields: Prisma.ProductVariantFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductVariantFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductVariantFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                findFirst: {
                    args: Prisma.ProductVariantFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductVariantFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                findMany: {
                    args: Prisma.ProductVariantFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>[];
                };
                create: {
                    args: Prisma.ProductVariantCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                createMany: {
                    args: Prisma.ProductVariantCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductVariantCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>[];
                };
                delete: {
                    args: Prisma.ProductVariantDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                update: {
                    args: Prisma.ProductVariantUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductVariantDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductVariantUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductVariantUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>[];
                };
                upsert: {
                    args: Prisma.ProductVariantUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                aggregate: {
                    args: Prisma.ProductVariantAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductVariant>;
                };
                groupBy: {
                    args: Prisma.ProductVariantGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductVariantGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductVariantCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductVariantCountAggregateOutputType> | number;
                };
            };
        };
        Inventory: {
            payload: Prisma.$InventoryPayload<ExtArgs>;
            fields: Prisma.InventoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InventoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InventoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                findFirst: {
                    args: Prisma.InventoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InventoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                findMany: {
                    args: Prisma.InventoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>[];
                };
                create: {
                    args: Prisma.InventoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                createMany: {
                    args: Prisma.InventoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InventoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>[];
                };
                delete: {
                    args: Prisma.InventoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                update: {
                    args: Prisma.InventoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                deleteMany: {
                    args: Prisma.InventoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InventoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InventoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>[];
                };
                upsert: {
                    args: Prisma.InventoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                aggregate: {
                    args: Prisma.InventoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInventory>;
                };
                groupBy: {
                    args: Prisma.InventoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InventoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryCountAggregateOutputType> | number;
                };
            };
        };
        StockTransaction: {
            payload: Prisma.$StockTransactionPayload<ExtArgs>;
            fields: Prisma.StockTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StockTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StockTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.StockTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StockTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransactionPayload>;
                };
                findMany: {
                    args: Prisma.StockTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransactionPayload>[];
                };
                create: {
                    args: Prisma.StockTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransactionPayload>;
                };
                createMany: {
                    args: Prisma.StockTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StockTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransactionPayload>[];
                };
                delete: {
                    args: Prisma.StockTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransactionPayload>;
                };
                update: {
                    args: Prisma.StockTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.StockTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StockTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StockTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.StockTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.StockTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStockTransaction>;
                };
                groupBy: {
                    args: Prisma.StockTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StockTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockTransactionCountAggregateOutputType> | number;
                };
            };
        };
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        EmailOtp: {
            payload: Prisma.$EmailOtpPayload<ExtArgs>;
            fields: Prisma.EmailOtpFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmailOtpFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailOtpPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmailOtpFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailOtpPayload>;
                };
                findFirst: {
                    args: Prisma.EmailOtpFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailOtpPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmailOtpFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailOtpPayload>;
                };
                findMany: {
                    args: Prisma.EmailOtpFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailOtpPayload>[];
                };
                create: {
                    args: Prisma.EmailOtpCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailOtpPayload>;
                };
                createMany: {
                    args: Prisma.EmailOtpCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EmailOtpCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailOtpPayload>[];
                };
                delete: {
                    args: Prisma.EmailOtpDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailOtpPayload>;
                };
                update: {
                    args: Prisma.EmailOtpUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailOtpPayload>;
                };
                deleteMany: {
                    args: Prisma.EmailOtpDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmailOtpUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EmailOtpUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailOtpPayload>[];
                };
                upsert: {
                    args: Prisma.EmailOtpUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailOtpPayload>;
                };
                aggregate: {
                    args: Prisma.EmailOtpAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmailOtp>;
                };
                groupBy: {
                    args: Prisma.EmailOtpGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailOtpGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmailOtpCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailOtpCountAggregateOutputType> | number;
                };
            };
        };
        RefreshSession: {
            payload: Prisma.$RefreshSessionPayload<ExtArgs>;
            fields: Prisma.RefreshSessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RefreshSessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshSessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RefreshSessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshSessionPayload>;
                };
                findFirst: {
                    args: Prisma.RefreshSessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshSessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RefreshSessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshSessionPayload>;
                };
                findMany: {
                    args: Prisma.RefreshSessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshSessionPayload>[];
                };
                create: {
                    args: Prisma.RefreshSessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshSessionPayload>;
                };
                createMany: {
                    args: Prisma.RefreshSessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RefreshSessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshSessionPayload>[];
                };
                delete: {
                    args: Prisma.RefreshSessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshSessionPayload>;
                };
                update: {
                    args: Prisma.RefreshSessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshSessionPayload>;
                };
                deleteMany: {
                    args: Prisma.RefreshSessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RefreshSessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RefreshSessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshSessionPayload>[];
                };
                upsert: {
                    args: Prisma.RefreshSessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshSessionPayload>;
                };
                aggregate: {
                    args: Prisma.RefreshSessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRefreshSession>;
                };
                groupBy: {
                    args: Prisma.RefreshSessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshSessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RefreshSessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshSessionCountAggregateOutputType> | number;
                };
            };
        };
        Vendor: {
            payload: Prisma.$VendorPayload<ExtArgs>;
            fields: Prisma.VendorFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VendorFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VendorFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                findFirst: {
                    args: Prisma.VendorFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VendorFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                findMany: {
                    args: Prisma.VendorFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>[];
                };
                create: {
                    args: Prisma.VendorCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                createMany: {
                    args: Prisma.VendorCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VendorCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>[];
                };
                delete: {
                    args: Prisma.VendorDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                update: {
                    args: Prisma.VendorUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                deleteMany: {
                    args: Prisma.VendorDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VendorUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VendorUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>[];
                };
                upsert: {
                    args: Prisma.VendorUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                aggregate: {
                    args: Prisma.VendorAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVendor>;
                };
                groupBy: {
                    args: Prisma.VendorGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VendorCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorCountAggregateOutputType> | number;
                };
            };
        };
        VendorAddress: {
            payload: Prisma.$VendorAddressPayload<ExtArgs>;
            fields: Prisma.VendorAddressFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VendorAddressFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorAddressPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VendorAddressFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorAddressPayload>;
                };
                findFirst: {
                    args: Prisma.VendorAddressFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorAddressPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VendorAddressFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorAddressPayload>;
                };
                findMany: {
                    args: Prisma.VendorAddressFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorAddressPayload>[];
                };
                create: {
                    args: Prisma.VendorAddressCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorAddressPayload>;
                };
                createMany: {
                    args: Prisma.VendorAddressCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VendorAddressCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorAddressPayload>[];
                };
                delete: {
                    args: Prisma.VendorAddressDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorAddressPayload>;
                };
                update: {
                    args: Prisma.VendorAddressUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorAddressPayload>;
                };
                deleteMany: {
                    args: Prisma.VendorAddressDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VendorAddressUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VendorAddressUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorAddressPayload>[];
                };
                upsert: {
                    args: Prisma.VendorAddressUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorAddressPayload>;
                };
                aggregate: {
                    args: Prisma.VendorAddressAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVendorAddress>;
                };
                groupBy: {
                    args: Prisma.VendorAddressGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorAddressGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VendorAddressCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorAddressCountAggregateOutputType> | number;
                };
            };
        };
        VendorContact: {
            payload: Prisma.$VendorContactPayload<ExtArgs>;
            fields: Prisma.VendorContactFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VendorContactFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorContactPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VendorContactFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorContactPayload>;
                };
                findFirst: {
                    args: Prisma.VendorContactFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorContactPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VendorContactFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorContactPayload>;
                };
                findMany: {
                    args: Prisma.VendorContactFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorContactPayload>[];
                };
                create: {
                    args: Prisma.VendorContactCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorContactPayload>;
                };
                createMany: {
                    args: Prisma.VendorContactCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VendorContactCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorContactPayload>[];
                };
                delete: {
                    args: Prisma.VendorContactDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorContactPayload>;
                };
                update: {
                    args: Prisma.VendorContactUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorContactPayload>;
                };
                deleteMany: {
                    args: Prisma.VendorContactDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VendorContactUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VendorContactUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorContactPayload>[];
                };
                upsert: {
                    args: Prisma.VendorContactUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorContactPayload>;
                };
                aggregate: {
                    args: Prisma.VendorContactAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVendorContact>;
                };
                groupBy: {
                    args: Prisma.VendorContactGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorContactGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VendorContactCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorContactCountAggregateOutputType> | number;
                };
            };
        };
        VendorBankAccount: {
            payload: Prisma.$VendorBankAccountPayload<ExtArgs>;
            fields: Prisma.VendorBankAccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VendorBankAccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorBankAccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VendorBankAccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorBankAccountPayload>;
                };
                findFirst: {
                    args: Prisma.VendorBankAccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorBankAccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VendorBankAccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorBankAccountPayload>;
                };
                findMany: {
                    args: Prisma.VendorBankAccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorBankAccountPayload>[];
                };
                create: {
                    args: Prisma.VendorBankAccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorBankAccountPayload>;
                };
                createMany: {
                    args: Prisma.VendorBankAccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VendorBankAccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorBankAccountPayload>[];
                };
                delete: {
                    args: Prisma.VendorBankAccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorBankAccountPayload>;
                };
                update: {
                    args: Prisma.VendorBankAccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorBankAccountPayload>;
                };
                deleteMany: {
                    args: Prisma.VendorBankAccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VendorBankAccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VendorBankAccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorBankAccountPayload>[];
                };
                upsert: {
                    args: Prisma.VendorBankAccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorBankAccountPayload>;
                };
                aggregate: {
                    args: Prisma.VendorBankAccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVendorBankAccount>;
                };
                groupBy: {
                    args: Prisma.VendorBankAccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorBankAccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VendorBankAccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorBankAccountCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseOrder: {
            payload: Prisma.$PurchaseOrderPayload<ExtArgs>;
            fields: Prisma.PurchaseOrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseOrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseOrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseOrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseOrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseOrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>[];
                };
                create: {
                    args: Prisma.PurchaseOrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseOrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseOrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseOrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                update: {
                    args: Prisma.PurchaseOrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseOrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseOrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseOrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseOrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseOrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseOrder>;
                };
                groupBy: {
                    args: Prisma.PurchaseOrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseOrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseOrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseOrderCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseOrderItem: {
            payload: Prisma.$PurchaseOrderItemPayload<ExtArgs>;
            fields: Prisma.PurchaseOrderItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseOrderItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseOrderItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseOrderItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseOrderItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseOrderItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>[];
                };
                create: {
                    args: Prisma.PurchaseOrderItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseOrderItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseOrderItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseOrderItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                update: {
                    args: Prisma.PurchaseOrderItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseOrderItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseOrderItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseOrderItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseOrderItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseOrderItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseOrderItem>;
                };
                groupBy: {
                    args: Prisma.PurchaseOrderItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseOrderItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseOrderItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseOrderItemCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseReceipt: {
            payload: Prisma.$PurchaseReceiptPayload<ExtArgs>;
            fields: Prisma.PurchaseReceiptFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseReceiptFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseReceiptFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseReceiptFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseReceiptFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseReceiptFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptPayload>[];
                };
                create: {
                    args: Prisma.PurchaseReceiptCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseReceiptCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseReceiptCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseReceiptDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptPayload>;
                };
                update: {
                    args: Prisma.PurchaseReceiptUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseReceiptDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseReceiptUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseReceiptUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseReceiptUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseReceiptAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseReceipt>;
                };
                groupBy: {
                    args: Prisma.PurchaseReceiptGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseReceiptGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseReceiptCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseReceiptCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseReceiptItem: {
            payload: Prisma.$PurchaseReceiptItemPayload<ExtArgs>;
            fields: Prisma.PurchaseReceiptItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseReceiptItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseReceiptItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptItemPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseReceiptItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseReceiptItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptItemPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseReceiptItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptItemPayload>[];
                };
                create: {
                    args: Prisma.PurchaseReceiptItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptItemPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseReceiptItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseReceiptItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptItemPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseReceiptItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptItemPayload>;
                };
                update: {
                    args: Prisma.PurchaseReceiptItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseReceiptItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseReceiptItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseReceiptItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptItemPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseReceiptItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReceiptItemPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseReceiptItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseReceiptItem>;
                };
                groupBy: {
                    args: Prisma.PurchaseReceiptItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseReceiptItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseReceiptItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseReceiptItemCountAggregateOutputType> | number;
                };
            };
        };
        CustomerAddress: {
            payload: Prisma.$CustomerAddressPayload<ExtArgs>;
            fields: Prisma.CustomerAddressFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CustomerAddressFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerAddressPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CustomerAddressFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerAddressPayload>;
                };
                findFirst: {
                    args: Prisma.CustomerAddressFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerAddressPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CustomerAddressFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerAddressPayload>;
                };
                findMany: {
                    args: Prisma.CustomerAddressFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerAddressPayload>[];
                };
                create: {
                    args: Prisma.CustomerAddressCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerAddressPayload>;
                };
                createMany: {
                    args: Prisma.CustomerAddressCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CustomerAddressCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerAddressPayload>[];
                };
                delete: {
                    args: Prisma.CustomerAddressDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerAddressPayload>;
                };
                update: {
                    args: Prisma.CustomerAddressUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerAddressPayload>;
                };
                deleteMany: {
                    args: Prisma.CustomerAddressDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CustomerAddressUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CustomerAddressUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerAddressPayload>[];
                };
                upsert: {
                    args: Prisma.CustomerAddressUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerAddressPayload>;
                };
                aggregate: {
                    args: Prisma.CustomerAddressAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCustomerAddress>;
                };
                groupBy: {
                    args: Prisma.CustomerAddressGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerAddressGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CustomerAddressCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerAddressCountAggregateOutputType> | number;
                };
            };
        };
        Order: {
            payload: Prisma.$OrderPayload<ExtArgs>;
            fields: Prisma.OrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findFirst: {
                    args: Prisma.OrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findMany: {
                    args: Prisma.OrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                create: {
                    args: Prisma.OrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                createMany: {
                    args: Prisma.OrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                delete: {
                    args: Prisma.OrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                update: {
                    args: Prisma.OrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                upsert: {
                    args: Prisma.OrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                aggregate: {
                    args: Prisma.OrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrder>;
                };
                groupBy: {
                    args: Prisma.OrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderCountAggregateOutputType> | number;
                };
            };
        };
        OrderItem: {
            payload: Prisma.$OrderItemPayload<ExtArgs>;
            fields: Prisma.OrderItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                findFirst: {
                    args: Prisma.OrderItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                findMany: {
                    args: Prisma.OrderItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                create: {
                    args: Prisma.OrderItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                createMany: {
                    args: Prisma.OrderItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                delete: {
                    args: Prisma.OrderItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                update: {
                    args: Prisma.OrderItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                upsert: {
                    args: Prisma.OrderItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                aggregate: {
                    args: Prisma.OrderItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderItem>;
                };
                groupBy: {
                    args: Prisma.OrderItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderItemCountAggregateOutputType> | number;
                };
            };
        };
        SystemSetting: {
            payload: Prisma.$SystemSettingPayload<ExtArgs>;
            fields: Prisma.SystemSettingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SystemSettingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SystemSettingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                findFirst: {
                    args: Prisma.SystemSettingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SystemSettingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                findMany: {
                    args: Prisma.SystemSettingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>[];
                };
                create: {
                    args: Prisma.SystemSettingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                createMany: {
                    args: Prisma.SystemSettingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SystemSettingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>[];
                };
                delete: {
                    args: Prisma.SystemSettingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                update: {
                    args: Prisma.SystemSettingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                deleteMany: {
                    args: Prisma.SystemSettingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SystemSettingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SystemSettingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>[];
                };
                upsert: {
                    args: Prisma.SystemSettingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                aggregate: {
                    args: Prisma.SystemSettingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSystemSetting>;
                };
                groupBy: {
                    args: Prisma.SystemSettingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SystemSettingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SystemSettingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SystemSettingCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly description: "description";
    readonly image: "image";
    readonly isActive: "isActive";
    readonly sortOrder: "sortOrder";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly sku: "sku";
    readonly shortDescription: "shortDescription";
    readonly description: "description";
    readonly sellingPrice: "sellingPrice";
    readonly mrp: "mrp";
    readonly costPrice: "costPrice";
    readonly status: "status";
    readonly featured: "featured";
    readonly newArrival: "newArrival";
    readonly bestSeller: "bestSeller";
    readonly showOnHomepage: "showOnHomepage";
    readonly occasion: "occasion";
    readonly gender: "gender";
    readonly categoryId: "categoryId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const ProductImageScalarFieldEnum: {
    readonly id: "id";
    readonly url: "url";
    readonly altText: "altText";
    readonly isPrimary: "isPrimary";
    readonly imageRole: "imageRole";
    readonly sortOrder: "sortOrder";
    readonly productId: "productId";
    readonly createdAt: "createdAt";
};
export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum];
export declare const ProductVariantScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly sku: "sku";
    readonly sellingPrice: "sellingPrice";
    readonly isActive: "isActive";
    readonly productId: "productId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum];
export declare const InventoryScalarFieldEnum: {
    readonly id: "id";
    readonly currentStock: "currentStock";
    readonly reservedStock: "reservedStock";
    readonly incomingStock: "incomingStock";
    readonly minimumRequired: "minimumRequired";
    readonly reorderPoint: "reorderPoint";
    readonly productId: "productId";
    readonly variantId: "variantId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InventoryScalarFieldEnum = (typeof InventoryScalarFieldEnum)[keyof typeof InventoryScalarFieldEnum];
export declare const StockTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly quantity: "quantity";
    readonly beforeStock: "beforeStock";
    readonly afterStock: "afterStock";
    readonly reason: "reason";
    readonly reference: "reference";
    readonly changedBy: "changedBy";
    readonly productId: "productId";
    readonly variantId: "variantId";
    readonly createdAt: "createdAt";
};
export type StockTransactionScalarFieldEnum = (typeof StockTransactionScalarFieldEnum)[keyof typeof StockTransactionScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly role: "role";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const EmailOtpScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly otpHash: "otpHash";
    readonly purpose: "purpose";
    readonly expiresAt: "expiresAt";
    readonly attempts: "attempts";
    readonly createdAt: "createdAt";
};
export type EmailOtpScalarFieldEnum = (typeof EmailOtpScalarFieldEnum)[keyof typeof EmailOtpScalarFieldEnum];
export declare const RefreshSessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly userAgent: "userAgent";
    readonly ipAddress: "ipAddress";
    readonly createdAt: "createdAt";
};
export type RefreshSessionScalarFieldEnum = (typeof RefreshSessionScalarFieldEnum)[keyof typeof RefreshSessionScalarFieldEnum];
export declare const VendorScalarFieldEnum: {
    readonly id: "id";
    readonly salutation: "salutation";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly companyName: "companyName";
    readonly displayName: "displayName";
    readonly email: "email";
    readonly workPhone: "workPhone";
    readonly mobile: "mobile";
    readonly language: "language";
    readonly gstTreatment: "gstTreatment";
    readonly sourceOfSupply: "sourceOfSupply";
    readonly pan: "pan";
    readonly gstin: "gstin";
    readonly currency: "currency";
    readonly paymentTerms: "paymentTerms";
    readonly tdsRate: "tdsRate";
    readonly remarks: "remarks";
    readonly attachments: "attachments";
    readonly commentsJson: "commentsJson";
    readonly historyJson: "historyJson";
    readonly payables: "payables";
    readonly unusedCredits: "unusedCredits";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VendorScalarFieldEnum = (typeof VendorScalarFieldEnum)[keyof typeof VendorScalarFieldEnum];
export declare const VendorAddressScalarFieldEnum: {
    readonly id: "id";
    readonly vendorId: "vendorId";
    readonly type: "type";
    readonly attention: "attention";
    readonly countryRegion: "countryRegion";
    readonly street1: "street1";
    readonly street2: "street2";
    readonly city: "city";
    readonly state: "state";
    readonly zipCode: "zipCode";
    readonly phone: "phone";
    readonly fax: "fax";
};
export type VendorAddressScalarFieldEnum = (typeof VendorAddressScalarFieldEnum)[keyof typeof VendorAddressScalarFieldEnum];
export declare const VendorContactScalarFieldEnum: {
    readonly id: "id";
    readonly vendorId: "vendorId";
    readonly salutation: "salutation";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly email: "email";
    readonly workPhone: "workPhone";
    readonly mobile: "mobile";
};
export type VendorContactScalarFieldEnum = (typeof VendorContactScalarFieldEnum)[keyof typeof VendorContactScalarFieldEnum];
export declare const VendorBankAccountScalarFieldEnum: {
    readonly id: "id";
    readonly vendorId: "vendorId";
    readonly accountHolderName: "accountHolderName";
    readonly bankName: "bankName";
    readonly accountNumber: "accountNumber";
    readonly ifscCode: "ifscCode";
};
export type VendorBankAccountScalarFieldEnum = (typeof VendorBankAccountScalarFieldEnum)[keyof typeof VendorBankAccountScalarFieldEnum];
export declare const PurchaseOrderScalarFieldEnum: {
    readonly id: "id";
    readonly vendorId: "vendorId";
    readonly vendorName: "vendorName";
    readonly vendorState: "vendorState";
    readonly deliverToBranch: "deliverToBranch";
    readonly deliverToState: "deliverToState";
    readonly deliverToAddress: "deliverToAddress";
    readonly referenceNumber: "referenceNumber";
    readonly date: "date";
    readonly deliveryDate: "deliveryDate";
    readonly paymentTerms: "paymentTerms";
    readonly shipmentPreference: "shipmentPreference";
    readonly status: "status";
    readonly subtotal: "subtotal";
    readonly discountType: "discountType";
    readonly discountValue: "discountValue";
    readonly discountUnit: "discountUnit";
    readonly discountAfterTax: "discountAfterTax";
    readonly discountAmount: "discountAmount";
    readonly taxSplitType: "taxSplitType";
    readonly cgstAmount: "cgstAmount";
    readonly sgstAmount: "sgstAmount";
    readonly igstAmount: "igstAmount";
    readonly taxTotal: "taxTotal";
    readonly tdsTcsType: "tdsTcsType";
    readonly tdsTcsRate: "tdsTcsRate";
    readonly tdsTcsAmount: "tdsTcsAmount";
    readonly tdsTcsName: "tdsTcsName";
    readonly adjustment: "adjustment";
    readonly total: "total";
    readonly customerNotes: "customerNotes";
    readonly termsAndConditions: "termsAndConditions";
    readonly attachments: "attachments";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PurchaseOrderScalarFieldEnum = (typeof PurchaseOrderScalarFieldEnum)[keyof typeof PurchaseOrderScalarFieldEnum];
export declare const PurchaseOrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly purchaseOrderId: "purchaseOrderId";
    readonly sku: "sku";
    readonly name: "name";
    readonly size: "size";
    readonly quantity: "quantity";
    readonly receivedQuantity: "receivedQuantity";
    readonly rate: "rate";
    readonly taxRate: "taxRate";
    readonly taxAmount: "taxAmount";
    readonly amount: "amount";
};
export type PurchaseOrderItemScalarFieldEnum = (typeof PurchaseOrderItemScalarFieldEnum)[keyof typeof PurchaseOrderItemScalarFieldEnum];
export declare const PurchaseReceiptScalarFieldEnum: {
    readonly id: "id";
    readonly purchaseOrderId: "purchaseOrderId";
    readonly receivedBy: "receivedBy";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type PurchaseReceiptScalarFieldEnum = (typeof PurchaseReceiptScalarFieldEnum)[keyof typeof PurchaseReceiptScalarFieldEnum];
export declare const PurchaseReceiptItemScalarFieldEnum: {
    readonly id: "id";
    readonly receiptId: "receiptId";
    readonly sku: "sku";
    readonly quantityReceived: "quantityReceived";
};
export type PurchaseReceiptItemScalarFieldEnum = (typeof PurchaseReceiptItemScalarFieldEnum)[keyof typeof PurchaseReceiptItemScalarFieldEnum];
export declare const CustomerAddressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly street1: "street1";
    readonly street2: "street2";
    readonly city: "city";
    readonly state: "state";
    readonly zipCode: "zipCode";
    readonly country: "country";
    readonly phone: "phone";
    readonly createdAt: "createdAt";
};
export type CustomerAddressScalarFieldEnum = (typeof CustomerAddressScalarFieldEnum)[keyof typeof CustomerAddressScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly orderNumber: "orderNumber";
    readonly customerId: "customerId";
    readonly status: "status";
    readonly paymentStatus: "paymentStatus";
    readonly subtotal: "subtotal";
    readonly taxTotal: "taxTotal";
    readonly shippingCharge: "shippingCharge";
    readonly discountAmount: "discountAmount";
    readonly total: "total";
    readonly shippingAddress: "shippingAddress";
    readonly billingAddress: "billingAddress";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly productId: "productId";
    readonly variantId: "variantId";
    readonly name: "name";
    readonly sku: "sku";
    readonly variantName: "variantName";
    readonly quantity: "quantity";
    readonly price: "price";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const SystemSettingScalarFieldEnum: {
    readonly key: "key";
    readonly value: "value";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SystemSettingScalarFieldEnum = (typeof SystemSettingScalarFieldEnum)[keyof typeof SystemSettingScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type EnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus'>;
export type ListEnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus[]'>;
export type EnumProductImageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductImageRole'>;
export type ListEnumProductImageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductImageRole[]'>;
export type EnumStockTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockTransactionType'>;
export type ListEnumStockTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockTransactionType[]'>;
export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>;
export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>;
export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>;
export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>;
export type EnumOtpPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OtpPurpose'>;
export type ListEnumOtpPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OtpPurpose[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
};
export type GlobalOmitConfig = {
    category?: Prisma.CategoryOmit;
    product?: Prisma.ProductOmit;
    productImage?: Prisma.ProductImageOmit;
    productVariant?: Prisma.ProductVariantOmit;
    inventory?: Prisma.InventoryOmit;
    stockTransaction?: Prisma.StockTransactionOmit;
    user?: Prisma.UserOmit;
    emailOtp?: Prisma.EmailOtpOmit;
    refreshSession?: Prisma.RefreshSessionOmit;
    vendor?: Prisma.VendorOmit;
    vendorAddress?: Prisma.VendorAddressOmit;
    vendorContact?: Prisma.VendorContactOmit;
    vendorBankAccount?: Prisma.VendorBankAccountOmit;
    purchaseOrder?: Prisma.PurchaseOrderOmit;
    purchaseOrderItem?: Prisma.PurchaseOrderItemOmit;
    purchaseReceipt?: Prisma.PurchaseReceiptOmit;
    purchaseReceiptItem?: Prisma.PurchaseReceiptItemOmit;
    customerAddress?: Prisma.CustomerAddressOmit;
    order?: Prisma.OrderOmit;
    orderItem?: Prisma.OrderItemOmit;
    systemSetting?: Prisma.SystemSettingOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
