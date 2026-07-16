import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductVariantModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductVariantPayload>;
export type AggregateProductVariant = {
    _count: ProductVariantCountAggregateOutputType | null;
    _avg: ProductVariantAvgAggregateOutputType | null;
    _sum: ProductVariantSumAggregateOutputType | null;
    _min: ProductVariantMinAggregateOutputType | null;
    _max: ProductVariantMaxAggregateOutputType | null;
};
export type ProductVariantAvgAggregateOutputType = {
    sellingPrice: runtime.Decimal | null;
};
export type ProductVariantSumAggregateOutputType = {
    sellingPrice: runtime.Decimal | null;
};
export type ProductVariantMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    sku: string | null;
    sellingPrice: runtime.Decimal | null;
    isActive: boolean | null;
    productId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductVariantMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    sku: string | null;
    sellingPrice: runtime.Decimal | null;
    isActive: boolean | null;
    productId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductVariantCountAggregateOutputType = {
    id: number;
    name: number;
    sku: number;
    sellingPrice: number;
    isActive: number;
    productId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProductVariantAvgAggregateInputType = {
    sellingPrice?: true;
};
export type ProductVariantSumAggregateInputType = {
    sellingPrice?: true;
};
export type ProductVariantMinAggregateInputType = {
    id?: true;
    name?: true;
    sku?: true;
    sellingPrice?: true;
    isActive?: true;
    productId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductVariantMaxAggregateInputType = {
    id?: true;
    name?: true;
    sku?: true;
    sellingPrice?: true;
    isActive?: true;
    productId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductVariantCountAggregateInputType = {
    id?: true;
    name?: true;
    sku?: true;
    sellingPrice?: true;
    isActive?: true;
    productId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProductVariantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductVariantWhereInput;
    orderBy?: Prisma.ProductVariantOrderByWithRelationInput | Prisma.ProductVariantOrderByWithRelationInput[];
    cursor?: Prisma.ProductVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductVariantCountAggregateInputType;
    _avg?: ProductVariantAvgAggregateInputType;
    _sum?: ProductVariantSumAggregateInputType;
    _min?: ProductVariantMinAggregateInputType;
    _max?: ProductVariantMaxAggregateInputType;
};
export type GetProductVariantAggregateType<T extends ProductVariantAggregateArgs> = {
    [P in keyof T & keyof AggregateProductVariant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductVariant[P]> : Prisma.GetScalarType<T[P], AggregateProductVariant[P]>;
};
export type ProductVariantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductVariantWhereInput;
    orderBy?: Prisma.ProductVariantOrderByWithAggregationInput | Prisma.ProductVariantOrderByWithAggregationInput[];
    by: Prisma.ProductVariantScalarFieldEnum[] | Prisma.ProductVariantScalarFieldEnum;
    having?: Prisma.ProductVariantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductVariantCountAggregateInputType | true;
    _avg?: ProductVariantAvgAggregateInputType;
    _sum?: ProductVariantSumAggregateInputType;
    _min?: ProductVariantMinAggregateInputType;
    _max?: ProductVariantMaxAggregateInputType;
};
export type ProductVariantGroupByOutputType = {
    id: string;
    name: string;
    sku: string;
    sellingPrice: runtime.Decimal | null;
    isActive: boolean;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductVariantCountAggregateOutputType | null;
    _avg: ProductVariantAvgAggregateOutputType | null;
    _sum: ProductVariantSumAggregateOutputType | null;
    _min: ProductVariantMinAggregateOutputType | null;
    _max: ProductVariantMaxAggregateOutputType | null;
};
export type GetProductVariantGroupByPayload<T extends ProductVariantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductVariantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductVariantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductVariantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductVariantGroupByOutputType[P]>;
}>>;
export type ProductVariantWhereInput = {
    AND?: Prisma.ProductVariantWhereInput | Prisma.ProductVariantWhereInput[];
    OR?: Prisma.ProductVariantWhereInput[];
    NOT?: Prisma.ProductVariantWhereInput | Prisma.ProductVariantWhereInput[];
    id?: Prisma.StringFilter<"ProductVariant"> | string;
    name?: Prisma.StringFilter<"ProductVariant"> | string;
    sku?: Prisma.StringFilter<"ProductVariant"> | string;
    sellingPrice?: Prisma.DecimalNullableFilter<"ProductVariant"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFilter<"ProductVariant"> | boolean;
    productId?: Prisma.StringFilter<"ProductVariant"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProductVariant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductVariant"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    inventory?: Prisma.XOR<Prisma.InventoryNullableScalarRelationFilter, Prisma.InventoryWhereInput> | null;
    stockTransactions?: Prisma.StockTransactionListRelationFilter;
};
export type ProductVariantOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sku?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    inventory?: Prisma.InventoryOrderByWithRelationInput;
    stockTransactions?: Prisma.StockTransactionOrderByRelationAggregateInput;
};
export type ProductVariantWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    sku?: string;
    AND?: Prisma.ProductVariantWhereInput | Prisma.ProductVariantWhereInput[];
    OR?: Prisma.ProductVariantWhereInput[];
    NOT?: Prisma.ProductVariantWhereInput | Prisma.ProductVariantWhereInput[];
    name?: Prisma.StringFilter<"ProductVariant"> | string;
    sellingPrice?: Prisma.DecimalNullableFilter<"ProductVariant"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFilter<"ProductVariant"> | boolean;
    productId?: Prisma.StringFilter<"ProductVariant"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProductVariant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductVariant"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    inventory?: Prisma.XOR<Prisma.InventoryNullableScalarRelationFilter, Prisma.InventoryWhereInput> | null;
    stockTransactions?: Prisma.StockTransactionListRelationFilter;
}, "id" | "sku">;
export type ProductVariantOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sku?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProductVariantCountOrderByAggregateInput;
    _avg?: Prisma.ProductVariantAvgOrderByAggregateInput;
    _max?: Prisma.ProductVariantMaxOrderByAggregateInput;
    _min?: Prisma.ProductVariantMinOrderByAggregateInput;
    _sum?: Prisma.ProductVariantSumOrderByAggregateInput;
};
export type ProductVariantScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductVariantScalarWhereWithAggregatesInput | Prisma.ProductVariantScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductVariantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductVariantScalarWhereWithAggregatesInput | Prisma.ProductVariantScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProductVariant"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ProductVariant"> | string;
    sku?: Prisma.StringWithAggregatesFilter<"ProductVariant"> | string;
    sellingPrice?: Prisma.DecimalNullableWithAggregatesFilter<"ProductVariant"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"ProductVariant"> | boolean;
    productId?: Prisma.StringWithAggregatesFilter<"ProductVariant"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string;
};
export type ProductVariantCreateInput = {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutVariantsInput;
    inventory?: Prisma.InventoryCreateNestedOneWithoutVariantInput;
    stockTransactions?: Prisma.StockTransactionCreateNestedManyWithoutVariantInput;
};
export type ProductVariantUncheckedCreateInput = {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: boolean;
    productId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inventory?: Prisma.InventoryUncheckedCreateNestedOneWithoutVariantInput;
    stockTransactions?: Prisma.StockTransactionUncheckedCreateNestedManyWithoutVariantInput;
};
export type ProductVariantUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutVariantsNestedInput;
    inventory?: Prisma.InventoryUpdateOneWithoutVariantNestedInput;
    stockTransactions?: Prisma.StockTransactionUpdateManyWithoutVariantNestedInput;
};
export type ProductVariantUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventory?: Prisma.InventoryUncheckedUpdateOneWithoutVariantNestedInput;
    stockTransactions?: Prisma.StockTransactionUncheckedUpdateManyWithoutVariantNestedInput;
};
export type ProductVariantCreateManyInput = {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: boolean;
    productId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductVariantUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductVariantUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductVariantListRelationFilter = {
    every?: Prisma.ProductVariantWhereInput;
    some?: Prisma.ProductVariantWhereInput;
    none?: Prisma.ProductVariantWhereInput;
};
export type ProductVariantOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductVariantCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sku?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductVariantAvgOrderByAggregateInput = {
    sellingPrice?: Prisma.SortOrder;
};
export type ProductVariantMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sku?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductVariantMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sku?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductVariantSumOrderByAggregateInput = {
    sellingPrice?: Prisma.SortOrder;
};
export type ProductVariantNullableScalarRelationFilter = {
    is?: Prisma.ProductVariantWhereInput | null;
    isNot?: Prisma.ProductVariantWhereInput | null;
};
export type ProductVariantCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductVariantCreateWithoutProductInput, Prisma.ProductVariantUncheckedCreateWithoutProductInput> | Prisma.ProductVariantCreateWithoutProductInput[] | Prisma.ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductVariantCreateOrConnectWithoutProductInput | Prisma.ProductVariantCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductVariantCreateManyProductInputEnvelope;
    connect?: Prisma.ProductVariantWhereUniqueInput | Prisma.ProductVariantWhereUniqueInput[];
};
export type ProductVariantUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductVariantCreateWithoutProductInput, Prisma.ProductVariantUncheckedCreateWithoutProductInput> | Prisma.ProductVariantCreateWithoutProductInput[] | Prisma.ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductVariantCreateOrConnectWithoutProductInput | Prisma.ProductVariantCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductVariantCreateManyProductInputEnvelope;
    connect?: Prisma.ProductVariantWhereUniqueInput | Prisma.ProductVariantWhereUniqueInput[];
};
export type ProductVariantUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductVariantCreateWithoutProductInput, Prisma.ProductVariantUncheckedCreateWithoutProductInput> | Prisma.ProductVariantCreateWithoutProductInput[] | Prisma.ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductVariantCreateOrConnectWithoutProductInput | Prisma.ProductVariantCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductVariantUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductVariantUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductVariantCreateManyProductInputEnvelope;
    set?: Prisma.ProductVariantWhereUniqueInput | Prisma.ProductVariantWhereUniqueInput[];
    disconnect?: Prisma.ProductVariantWhereUniqueInput | Prisma.ProductVariantWhereUniqueInput[];
    delete?: Prisma.ProductVariantWhereUniqueInput | Prisma.ProductVariantWhereUniqueInput[];
    connect?: Prisma.ProductVariantWhereUniqueInput | Prisma.ProductVariantWhereUniqueInput[];
    update?: Prisma.ProductVariantUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductVariantUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductVariantUpdateManyWithWhereWithoutProductInput | Prisma.ProductVariantUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductVariantScalarWhereInput | Prisma.ProductVariantScalarWhereInput[];
};
export type ProductVariantUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductVariantCreateWithoutProductInput, Prisma.ProductVariantUncheckedCreateWithoutProductInput> | Prisma.ProductVariantCreateWithoutProductInput[] | Prisma.ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductVariantCreateOrConnectWithoutProductInput | Prisma.ProductVariantCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductVariantUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductVariantUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductVariantCreateManyProductInputEnvelope;
    set?: Prisma.ProductVariantWhereUniqueInput | Prisma.ProductVariantWhereUniqueInput[];
    disconnect?: Prisma.ProductVariantWhereUniqueInput | Prisma.ProductVariantWhereUniqueInput[];
    delete?: Prisma.ProductVariantWhereUniqueInput | Prisma.ProductVariantWhereUniqueInput[];
    connect?: Prisma.ProductVariantWhereUniqueInput | Prisma.ProductVariantWhereUniqueInput[];
    update?: Prisma.ProductVariantUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductVariantUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductVariantUpdateManyWithWhereWithoutProductInput | Prisma.ProductVariantUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductVariantScalarWhereInput | Prisma.ProductVariantScalarWhereInput[];
};
export type ProductVariantCreateNestedOneWithoutInventoryInput = {
    create?: Prisma.XOR<Prisma.ProductVariantCreateWithoutInventoryInput, Prisma.ProductVariantUncheckedCreateWithoutInventoryInput>;
    connectOrCreate?: Prisma.ProductVariantCreateOrConnectWithoutInventoryInput;
    connect?: Prisma.ProductVariantWhereUniqueInput;
};
export type ProductVariantUpdateOneWithoutInventoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProductVariantCreateWithoutInventoryInput, Prisma.ProductVariantUncheckedCreateWithoutInventoryInput>;
    connectOrCreate?: Prisma.ProductVariantCreateOrConnectWithoutInventoryInput;
    upsert?: Prisma.ProductVariantUpsertWithoutInventoryInput;
    disconnect?: Prisma.ProductVariantWhereInput | boolean;
    delete?: Prisma.ProductVariantWhereInput | boolean;
    connect?: Prisma.ProductVariantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductVariantUpdateToOneWithWhereWithoutInventoryInput, Prisma.ProductVariantUpdateWithoutInventoryInput>, Prisma.ProductVariantUncheckedUpdateWithoutInventoryInput>;
};
export type ProductVariantCreateNestedOneWithoutStockTransactionsInput = {
    create?: Prisma.XOR<Prisma.ProductVariantCreateWithoutStockTransactionsInput, Prisma.ProductVariantUncheckedCreateWithoutStockTransactionsInput>;
    connectOrCreate?: Prisma.ProductVariantCreateOrConnectWithoutStockTransactionsInput;
    connect?: Prisma.ProductVariantWhereUniqueInput;
};
export type ProductVariantUpdateOneWithoutStockTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductVariantCreateWithoutStockTransactionsInput, Prisma.ProductVariantUncheckedCreateWithoutStockTransactionsInput>;
    connectOrCreate?: Prisma.ProductVariantCreateOrConnectWithoutStockTransactionsInput;
    upsert?: Prisma.ProductVariantUpsertWithoutStockTransactionsInput;
    disconnect?: Prisma.ProductVariantWhereInput | boolean;
    delete?: Prisma.ProductVariantWhereInput | boolean;
    connect?: Prisma.ProductVariantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductVariantUpdateToOneWithWhereWithoutStockTransactionsInput, Prisma.ProductVariantUpdateWithoutStockTransactionsInput>, Prisma.ProductVariantUncheckedUpdateWithoutStockTransactionsInput>;
};
export type ProductVariantCreateWithoutProductInput = {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inventory?: Prisma.InventoryCreateNestedOneWithoutVariantInput;
    stockTransactions?: Prisma.StockTransactionCreateNestedManyWithoutVariantInput;
};
export type ProductVariantUncheckedCreateWithoutProductInput = {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inventory?: Prisma.InventoryUncheckedCreateNestedOneWithoutVariantInput;
    stockTransactions?: Prisma.StockTransactionUncheckedCreateNestedManyWithoutVariantInput;
};
export type ProductVariantCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductVariantWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductVariantCreateWithoutProductInput, Prisma.ProductVariantUncheckedCreateWithoutProductInput>;
};
export type ProductVariantCreateManyProductInputEnvelope = {
    data: Prisma.ProductVariantCreateManyProductInput | Prisma.ProductVariantCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductVariantUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductVariantWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductVariantUpdateWithoutProductInput, Prisma.ProductVariantUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductVariantCreateWithoutProductInput, Prisma.ProductVariantUncheckedCreateWithoutProductInput>;
};
export type ProductVariantUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductVariantWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductVariantUpdateWithoutProductInput, Prisma.ProductVariantUncheckedUpdateWithoutProductInput>;
};
export type ProductVariantUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductVariantScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductVariantUpdateManyMutationInput, Prisma.ProductVariantUncheckedUpdateManyWithoutProductInput>;
};
export type ProductVariantScalarWhereInput = {
    AND?: Prisma.ProductVariantScalarWhereInput | Prisma.ProductVariantScalarWhereInput[];
    OR?: Prisma.ProductVariantScalarWhereInput[];
    NOT?: Prisma.ProductVariantScalarWhereInput | Prisma.ProductVariantScalarWhereInput[];
    id?: Prisma.StringFilter<"ProductVariant"> | string;
    name?: Prisma.StringFilter<"ProductVariant"> | string;
    sku?: Prisma.StringFilter<"ProductVariant"> | string;
    sellingPrice?: Prisma.DecimalNullableFilter<"ProductVariant"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFilter<"ProductVariant"> | boolean;
    productId?: Prisma.StringFilter<"ProductVariant"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProductVariant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductVariant"> | Date | string;
};
export type ProductVariantCreateWithoutInventoryInput = {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutVariantsInput;
    stockTransactions?: Prisma.StockTransactionCreateNestedManyWithoutVariantInput;
};
export type ProductVariantUncheckedCreateWithoutInventoryInput = {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: boolean;
    productId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    stockTransactions?: Prisma.StockTransactionUncheckedCreateNestedManyWithoutVariantInput;
};
export type ProductVariantCreateOrConnectWithoutInventoryInput = {
    where: Prisma.ProductVariantWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductVariantCreateWithoutInventoryInput, Prisma.ProductVariantUncheckedCreateWithoutInventoryInput>;
};
export type ProductVariantUpsertWithoutInventoryInput = {
    update: Prisma.XOR<Prisma.ProductVariantUpdateWithoutInventoryInput, Prisma.ProductVariantUncheckedUpdateWithoutInventoryInput>;
    create: Prisma.XOR<Prisma.ProductVariantCreateWithoutInventoryInput, Prisma.ProductVariantUncheckedCreateWithoutInventoryInput>;
    where?: Prisma.ProductVariantWhereInput;
};
export type ProductVariantUpdateToOneWithWhereWithoutInventoryInput = {
    where?: Prisma.ProductVariantWhereInput;
    data: Prisma.XOR<Prisma.ProductVariantUpdateWithoutInventoryInput, Prisma.ProductVariantUncheckedUpdateWithoutInventoryInput>;
};
export type ProductVariantUpdateWithoutInventoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutVariantsNestedInput;
    stockTransactions?: Prisma.StockTransactionUpdateManyWithoutVariantNestedInput;
};
export type ProductVariantUncheckedUpdateWithoutInventoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    stockTransactions?: Prisma.StockTransactionUncheckedUpdateManyWithoutVariantNestedInput;
};
export type ProductVariantCreateWithoutStockTransactionsInput = {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutVariantsInput;
    inventory?: Prisma.InventoryCreateNestedOneWithoutVariantInput;
};
export type ProductVariantUncheckedCreateWithoutStockTransactionsInput = {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: boolean;
    productId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inventory?: Prisma.InventoryUncheckedCreateNestedOneWithoutVariantInput;
};
export type ProductVariantCreateOrConnectWithoutStockTransactionsInput = {
    where: Prisma.ProductVariantWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductVariantCreateWithoutStockTransactionsInput, Prisma.ProductVariantUncheckedCreateWithoutStockTransactionsInput>;
};
export type ProductVariantUpsertWithoutStockTransactionsInput = {
    update: Prisma.XOR<Prisma.ProductVariantUpdateWithoutStockTransactionsInput, Prisma.ProductVariantUncheckedUpdateWithoutStockTransactionsInput>;
    create: Prisma.XOR<Prisma.ProductVariantCreateWithoutStockTransactionsInput, Prisma.ProductVariantUncheckedCreateWithoutStockTransactionsInput>;
    where?: Prisma.ProductVariantWhereInput;
};
export type ProductVariantUpdateToOneWithWhereWithoutStockTransactionsInput = {
    where?: Prisma.ProductVariantWhereInput;
    data: Prisma.XOR<Prisma.ProductVariantUpdateWithoutStockTransactionsInput, Prisma.ProductVariantUncheckedUpdateWithoutStockTransactionsInput>;
};
export type ProductVariantUpdateWithoutStockTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutVariantsNestedInput;
    inventory?: Prisma.InventoryUpdateOneWithoutVariantNestedInput;
};
export type ProductVariantUncheckedUpdateWithoutStockTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventory?: Prisma.InventoryUncheckedUpdateOneWithoutVariantNestedInput;
};
export type ProductVariantCreateManyProductInput = {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductVariantUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventory?: Prisma.InventoryUpdateOneWithoutVariantNestedInput;
    stockTransactions?: Prisma.StockTransactionUpdateManyWithoutVariantNestedInput;
};
export type ProductVariantUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventory?: Prisma.InventoryUncheckedUpdateOneWithoutVariantNestedInput;
    stockTransactions?: Prisma.StockTransactionUncheckedUpdateManyWithoutVariantNestedInput;
};
export type ProductVariantUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductVariantCountOutputType = {
    stockTransactions: number;
};
export type ProductVariantCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    stockTransactions?: boolean | ProductVariantCountOutputTypeCountStockTransactionsArgs;
};
export type ProductVariantCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantCountOutputTypeSelect<ExtArgs> | null;
};
export type ProductVariantCountOutputTypeCountStockTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockTransactionWhereInput;
};
export type ProductVariantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    sku?: boolean;
    sellingPrice?: boolean;
    isActive?: boolean;
    productId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    inventory?: boolean | Prisma.ProductVariant$inventoryArgs<ExtArgs>;
    stockTransactions?: boolean | Prisma.ProductVariant$stockTransactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductVariantCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productVariant"]>;
export type ProductVariantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    sku?: boolean;
    sellingPrice?: boolean;
    isActive?: boolean;
    productId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productVariant"]>;
export type ProductVariantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    sku?: boolean;
    sellingPrice?: boolean;
    isActive?: boolean;
    productId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productVariant"]>;
export type ProductVariantSelectScalar = {
    id?: boolean;
    name?: boolean;
    sku?: boolean;
    sellingPrice?: boolean;
    isActive?: boolean;
    productId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProductVariantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "sku" | "sellingPrice" | "isActive" | "productId" | "createdAt" | "updatedAt", ExtArgs["result"]["productVariant"]>;
export type ProductVariantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    inventory?: boolean | Prisma.ProductVariant$inventoryArgs<ExtArgs>;
    stockTransactions?: boolean | Prisma.ProductVariant$stockTransactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductVariantCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductVariantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductVariantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $ProductVariantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductVariant";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        inventory: Prisma.$InventoryPayload<ExtArgs> | null;
        stockTransactions: Prisma.$StockTransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        sku: string;
        sellingPrice: runtime.Decimal | null;
        isActive: boolean;
        productId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["productVariant"]>;
    composites: {};
};
export type ProductVariantGetPayload<S extends boolean | null | undefined | ProductVariantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload, S>;
export type ProductVariantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductVariantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductVariantCountAggregateInputType | true;
};
export interface ProductVariantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductVariant'];
        meta: {
            name: 'ProductVariant';
        };
    };
    findUnique<T extends ProductVariantFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductVariantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductVariantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductVariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductVariantFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductVariantFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductVariantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductVariantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductVariantFindManyArgs>(args?: Prisma.SelectSubset<T, ProductVariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductVariantCreateArgs>(args: Prisma.SelectSubset<T, ProductVariantCreateArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductVariantCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductVariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductVariantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductVariantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductVariantDeleteArgs>(args: Prisma.SelectSubset<T, ProductVariantDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductVariantUpdateArgs>(args: Prisma.SelectSubset<T, ProductVariantUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductVariantDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductVariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductVariantUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductVariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductVariantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductVariantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductVariantUpsertArgs>(args: Prisma.SelectSubset<T, ProductVariantUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductVariantCountArgs>(args?: Prisma.Subset<T, ProductVariantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductVariantCountAggregateOutputType> : number>;
    aggregate<T extends ProductVariantAggregateArgs>(args: Prisma.Subset<T, ProductVariantAggregateArgs>): Prisma.PrismaPromise<GetProductVariantAggregateType<T>>;
    groupBy<T extends ProductVariantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductVariantGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductVariantGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductVariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductVariantFieldRefs;
}
export interface Prisma__ProductVariantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    inventory<T extends Prisma.ProductVariant$inventoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductVariant$inventoryArgs<ExtArgs>>): Prisma.Prisma__InventoryClient<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    stockTransactions<T extends Prisma.ProductVariant$stockTransactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductVariant$stockTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductVariantFieldRefs {
    readonly id: Prisma.FieldRef<"ProductVariant", 'String'>;
    readonly name: Prisma.FieldRef<"ProductVariant", 'String'>;
    readonly sku: Prisma.FieldRef<"ProductVariant", 'String'>;
    readonly sellingPrice: Prisma.FieldRef<"ProductVariant", 'Decimal'>;
    readonly isActive: Prisma.FieldRef<"ProductVariant", 'Boolean'>;
    readonly productId: Prisma.FieldRef<"ProductVariant", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProductVariant", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ProductVariant", 'DateTime'>;
}
export type ProductVariantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    where: Prisma.ProductVariantWhereUniqueInput;
};
export type ProductVariantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    where: Prisma.ProductVariantWhereUniqueInput;
};
export type ProductVariantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    where?: Prisma.ProductVariantWhereInput;
    orderBy?: Prisma.ProductVariantOrderByWithRelationInput | Prisma.ProductVariantOrderByWithRelationInput[];
    cursor?: Prisma.ProductVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductVariantScalarFieldEnum | Prisma.ProductVariantScalarFieldEnum[];
};
export type ProductVariantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    where?: Prisma.ProductVariantWhereInput;
    orderBy?: Prisma.ProductVariantOrderByWithRelationInput | Prisma.ProductVariantOrderByWithRelationInput[];
    cursor?: Prisma.ProductVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductVariantScalarFieldEnum | Prisma.ProductVariantScalarFieldEnum[];
};
export type ProductVariantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    where?: Prisma.ProductVariantWhereInput;
    orderBy?: Prisma.ProductVariantOrderByWithRelationInput | Prisma.ProductVariantOrderByWithRelationInput[];
    cursor?: Prisma.ProductVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductVariantScalarFieldEnum | Prisma.ProductVariantScalarFieldEnum[];
};
export type ProductVariantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductVariantCreateInput, Prisma.ProductVariantUncheckedCreateInput>;
};
export type ProductVariantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductVariantCreateManyInput | Prisma.ProductVariantCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductVariantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    data: Prisma.ProductVariantCreateManyInput | Prisma.ProductVariantCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductVariantIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductVariantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductVariantUpdateInput, Prisma.ProductVariantUncheckedUpdateInput>;
    where: Prisma.ProductVariantWhereUniqueInput;
};
export type ProductVariantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductVariantUpdateManyMutationInput, Prisma.ProductVariantUncheckedUpdateManyInput>;
    where?: Prisma.ProductVariantWhereInput;
    limit?: number;
};
export type ProductVariantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductVariantUpdateManyMutationInput, Prisma.ProductVariantUncheckedUpdateManyInput>;
    where?: Prisma.ProductVariantWhereInput;
    limit?: number;
    include?: Prisma.ProductVariantIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductVariantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    where: Prisma.ProductVariantWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductVariantCreateInput, Prisma.ProductVariantUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductVariantUpdateInput, Prisma.ProductVariantUncheckedUpdateInput>;
};
export type ProductVariantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    where: Prisma.ProductVariantWhereUniqueInput;
};
export type ProductVariantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductVariantWhereInput;
    limit?: number;
};
export type ProductVariant$inventoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventorySelect<ExtArgs> | null;
    omit?: Prisma.InventoryOmit<ExtArgs> | null;
    include?: Prisma.InventoryInclude<ExtArgs> | null;
    where?: Prisma.InventoryWhereInput;
};
export type ProductVariant$stockTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockTransactionSelect<ExtArgs> | null;
    omit?: Prisma.StockTransactionOmit<ExtArgs> | null;
    include?: Prisma.StockTransactionInclude<ExtArgs> | null;
    where?: Prisma.StockTransactionWhereInput;
    orderBy?: Prisma.StockTransactionOrderByWithRelationInput | Prisma.StockTransactionOrderByWithRelationInput[];
    cursor?: Prisma.StockTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockTransactionScalarFieldEnum | Prisma.StockTransactionScalarFieldEnum[];
};
export type ProductVariantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
};
