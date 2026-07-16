import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StockTransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$StockTransactionPayload>;
export type AggregateStockTransaction = {
    _count: StockTransactionCountAggregateOutputType | null;
    _avg: StockTransactionAvgAggregateOutputType | null;
    _sum: StockTransactionSumAggregateOutputType | null;
    _min: StockTransactionMinAggregateOutputType | null;
    _max: StockTransactionMaxAggregateOutputType | null;
};
export type StockTransactionAvgAggregateOutputType = {
    quantity: number | null;
    beforeStock: number | null;
    afterStock: number | null;
};
export type StockTransactionSumAggregateOutputType = {
    quantity: number | null;
    beforeStock: number | null;
    afterStock: number | null;
};
export type StockTransactionMinAggregateOutputType = {
    id: string | null;
    type: $Enums.StockTransactionType | null;
    quantity: number | null;
    beforeStock: number | null;
    afterStock: number | null;
    reason: string | null;
    reference: string | null;
    changedBy: string | null;
    productId: string | null;
    variantId: string | null;
    createdAt: Date | null;
};
export type StockTransactionMaxAggregateOutputType = {
    id: string | null;
    type: $Enums.StockTransactionType | null;
    quantity: number | null;
    beforeStock: number | null;
    afterStock: number | null;
    reason: string | null;
    reference: string | null;
    changedBy: string | null;
    productId: string | null;
    variantId: string | null;
    createdAt: Date | null;
};
export type StockTransactionCountAggregateOutputType = {
    id: number;
    type: number;
    quantity: number;
    beforeStock: number;
    afterStock: number;
    reason: number;
    reference: number;
    changedBy: number;
    productId: number;
    variantId: number;
    createdAt: number;
    _all: number;
};
export type StockTransactionAvgAggregateInputType = {
    quantity?: true;
    beforeStock?: true;
    afterStock?: true;
};
export type StockTransactionSumAggregateInputType = {
    quantity?: true;
    beforeStock?: true;
    afterStock?: true;
};
export type StockTransactionMinAggregateInputType = {
    id?: true;
    type?: true;
    quantity?: true;
    beforeStock?: true;
    afterStock?: true;
    reason?: true;
    reference?: true;
    changedBy?: true;
    productId?: true;
    variantId?: true;
    createdAt?: true;
};
export type StockTransactionMaxAggregateInputType = {
    id?: true;
    type?: true;
    quantity?: true;
    beforeStock?: true;
    afterStock?: true;
    reason?: true;
    reference?: true;
    changedBy?: true;
    productId?: true;
    variantId?: true;
    createdAt?: true;
};
export type StockTransactionCountAggregateInputType = {
    id?: true;
    type?: true;
    quantity?: true;
    beforeStock?: true;
    afterStock?: true;
    reason?: true;
    reference?: true;
    changedBy?: true;
    productId?: true;
    variantId?: true;
    createdAt?: true;
    _all?: true;
};
export type StockTransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockTransactionWhereInput;
    orderBy?: Prisma.StockTransactionOrderByWithRelationInput | Prisma.StockTransactionOrderByWithRelationInput[];
    cursor?: Prisma.StockTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StockTransactionCountAggregateInputType;
    _avg?: StockTransactionAvgAggregateInputType;
    _sum?: StockTransactionSumAggregateInputType;
    _min?: StockTransactionMinAggregateInputType;
    _max?: StockTransactionMaxAggregateInputType;
};
export type GetStockTransactionAggregateType<T extends StockTransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateStockTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStockTransaction[P]> : Prisma.GetScalarType<T[P], AggregateStockTransaction[P]>;
};
export type StockTransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockTransactionWhereInput;
    orderBy?: Prisma.StockTransactionOrderByWithAggregationInput | Prisma.StockTransactionOrderByWithAggregationInput[];
    by: Prisma.StockTransactionScalarFieldEnum[] | Prisma.StockTransactionScalarFieldEnum;
    having?: Prisma.StockTransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StockTransactionCountAggregateInputType | true;
    _avg?: StockTransactionAvgAggregateInputType;
    _sum?: StockTransactionSumAggregateInputType;
    _min?: StockTransactionMinAggregateInputType;
    _max?: StockTransactionMaxAggregateInputType;
};
export type StockTransactionGroupByOutputType = {
    id: string;
    type: $Enums.StockTransactionType;
    quantity: number;
    beforeStock: number;
    afterStock: number;
    reason: string;
    reference: string | null;
    changedBy: string;
    productId: string;
    variantId: string | null;
    createdAt: Date;
    _count: StockTransactionCountAggregateOutputType | null;
    _avg: StockTransactionAvgAggregateOutputType | null;
    _sum: StockTransactionSumAggregateOutputType | null;
    _min: StockTransactionMinAggregateOutputType | null;
    _max: StockTransactionMaxAggregateOutputType | null;
};
export type GetStockTransactionGroupByPayload<T extends StockTransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StockTransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StockTransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StockTransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StockTransactionGroupByOutputType[P]>;
}>>;
export type StockTransactionWhereInput = {
    AND?: Prisma.StockTransactionWhereInput | Prisma.StockTransactionWhereInput[];
    OR?: Prisma.StockTransactionWhereInput[];
    NOT?: Prisma.StockTransactionWhereInput | Prisma.StockTransactionWhereInput[];
    id?: Prisma.StringFilter<"StockTransaction"> | string;
    type?: Prisma.EnumStockTransactionTypeFilter<"StockTransaction"> | $Enums.StockTransactionType;
    quantity?: Prisma.IntFilter<"StockTransaction"> | number;
    beforeStock?: Prisma.IntFilter<"StockTransaction"> | number;
    afterStock?: Prisma.IntFilter<"StockTransaction"> | number;
    reason?: Prisma.StringFilter<"StockTransaction"> | string;
    reference?: Prisma.StringNullableFilter<"StockTransaction"> | string | null;
    changedBy?: Prisma.StringFilter<"StockTransaction"> | string;
    productId?: Prisma.StringFilter<"StockTransaction"> | string;
    variantId?: Prisma.StringNullableFilter<"StockTransaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StockTransaction"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    variant?: Prisma.XOR<Prisma.ProductVariantNullableScalarRelationFilter, Prisma.ProductVariantWhereInput> | null;
};
export type StockTransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    beforeStock?: Prisma.SortOrder;
    afterStock?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    changedBy?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    variant?: Prisma.ProductVariantOrderByWithRelationInput;
};
export type StockTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.StockTransactionWhereInput | Prisma.StockTransactionWhereInput[];
    OR?: Prisma.StockTransactionWhereInput[];
    NOT?: Prisma.StockTransactionWhereInput | Prisma.StockTransactionWhereInput[];
    type?: Prisma.EnumStockTransactionTypeFilter<"StockTransaction"> | $Enums.StockTransactionType;
    quantity?: Prisma.IntFilter<"StockTransaction"> | number;
    beforeStock?: Prisma.IntFilter<"StockTransaction"> | number;
    afterStock?: Prisma.IntFilter<"StockTransaction"> | number;
    reason?: Prisma.StringFilter<"StockTransaction"> | string;
    reference?: Prisma.StringNullableFilter<"StockTransaction"> | string | null;
    changedBy?: Prisma.StringFilter<"StockTransaction"> | string;
    productId?: Prisma.StringFilter<"StockTransaction"> | string;
    variantId?: Prisma.StringNullableFilter<"StockTransaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StockTransaction"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    variant?: Prisma.XOR<Prisma.ProductVariantNullableScalarRelationFilter, Prisma.ProductVariantWhereInput> | null;
}, "id">;
export type StockTransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    beforeStock?: Prisma.SortOrder;
    afterStock?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    changedBy?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.StockTransactionCountOrderByAggregateInput;
    _avg?: Prisma.StockTransactionAvgOrderByAggregateInput;
    _max?: Prisma.StockTransactionMaxOrderByAggregateInput;
    _min?: Prisma.StockTransactionMinOrderByAggregateInput;
    _sum?: Prisma.StockTransactionSumOrderByAggregateInput;
};
export type StockTransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.StockTransactionScalarWhereWithAggregatesInput | Prisma.StockTransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.StockTransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StockTransactionScalarWhereWithAggregatesInput | Prisma.StockTransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"StockTransaction"> | string;
    type?: Prisma.EnumStockTransactionTypeWithAggregatesFilter<"StockTransaction"> | $Enums.StockTransactionType;
    quantity?: Prisma.IntWithAggregatesFilter<"StockTransaction"> | number;
    beforeStock?: Prisma.IntWithAggregatesFilter<"StockTransaction"> | number;
    afterStock?: Prisma.IntWithAggregatesFilter<"StockTransaction"> | number;
    reason?: Prisma.StringWithAggregatesFilter<"StockTransaction"> | string;
    reference?: Prisma.StringNullableWithAggregatesFilter<"StockTransaction"> | string | null;
    changedBy?: Prisma.StringWithAggregatesFilter<"StockTransaction"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"StockTransaction"> | string;
    variantId?: Prisma.StringNullableWithAggregatesFilter<"StockTransaction"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"StockTransaction"> | Date | string;
};
export type StockTransactionCreateInput = {
    id?: string;
    type: $Enums.StockTransactionType;
    quantity: number;
    beforeStock: number;
    afterStock: number;
    reason: string;
    reference?: string | null;
    changedBy: string;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutStockTransactionsInput;
    variant?: Prisma.ProductVariantCreateNestedOneWithoutStockTransactionsInput;
};
export type StockTransactionUncheckedCreateInput = {
    id?: string;
    type: $Enums.StockTransactionType;
    quantity: number;
    beforeStock: number;
    afterStock: number;
    reason: string;
    reference?: string | null;
    changedBy: string;
    productId: string;
    variantId?: string | null;
    createdAt?: Date | string;
};
export type StockTransactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockTransactionTypeFieldUpdateOperationsInput | $Enums.StockTransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    beforeStock?: Prisma.IntFieldUpdateOperationsInput | number;
    afterStock?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutStockTransactionsNestedInput;
    variant?: Prisma.ProductVariantUpdateOneWithoutStockTransactionsNestedInput;
};
export type StockTransactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockTransactionTypeFieldUpdateOperationsInput | $Enums.StockTransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    beforeStock?: Prisma.IntFieldUpdateOperationsInput | number;
    afterStock?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockTransactionCreateManyInput = {
    id?: string;
    type: $Enums.StockTransactionType;
    quantity: number;
    beforeStock: number;
    afterStock: number;
    reason: string;
    reference?: string | null;
    changedBy: string;
    productId: string;
    variantId?: string | null;
    createdAt?: Date | string;
};
export type StockTransactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockTransactionTypeFieldUpdateOperationsInput | $Enums.StockTransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    beforeStock?: Prisma.IntFieldUpdateOperationsInput | number;
    afterStock?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockTransactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockTransactionTypeFieldUpdateOperationsInput | $Enums.StockTransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    beforeStock?: Prisma.IntFieldUpdateOperationsInput | number;
    afterStock?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockTransactionListRelationFilter = {
    every?: Prisma.StockTransactionWhereInput;
    some?: Prisma.StockTransactionWhereInput;
    none?: Prisma.StockTransactionWhereInput;
};
export type StockTransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StockTransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    beforeStock?: Prisma.SortOrder;
    afterStock?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    changedBy?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StockTransactionAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    beforeStock?: Prisma.SortOrder;
    afterStock?: Prisma.SortOrder;
};
export type StockTransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    beforeStock?: Prisma.SortOrder;
    afterStock?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    changedBy?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StockTransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    beforeStock?: Prisma.SortOrder;
    afterStock?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    changedBy?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StockTransactionSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    beforeStock?: Prisma.SortOrder;
    afterStock?: Prisma.SortOrder;
};
export type StockTransactionCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.StockTransactionCreateWithoutProductInput, Prisma.StockTransactionUncheckedCreateWithoutProductInput> | Prisma.StockTransactionCreateWithoutProductInput[] | Prisma.StockTransactionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StockTransactionCreateOrConnectWithoutProductInput | Prisma.StockTransactionCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.StockTransactionCreateManyProductInputEnvelope;
    connect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
};
export type StockTransactionUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.StockTransactionCreateWithoutProductInput, Prisma.StockTransactionUncheckedCreateWithoutProductInput> | Prisma.StockTransactionCreateWithoutProductInput[] | Prisma.StockTransactionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StockTransactionCreateOrConnectWithoutProductInput | Prisma.StockTransactionCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.StockTransactionCreateManyProductInputEnvelope;
    connect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
};
export type StockTransactionUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.StockTransactionCreateWithoutProductInput, Prisma.StockTransactionUncheckedCreateWithoutProductInput> | Prisma.StockTransactionCreateWithoutProductInput[] | Prisma.StockTransactionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StockTransactionCreateOrConnectWithoutProductInput | Prisma.StockTransactionCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.StockTransactionUpsertWithWhereUniqueWithoutProductInput | Prisma.StockTransactionUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.StockTransactionCreateManyProductInputEnvelope;
    set?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    disconnect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    delete?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    connect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    update?: Prisma.StockTransactionUpdateWithWhereUniqueWithoutProductInput | Prisma.StockTransactionUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.StockTransactionUpdateManyWithWhereWithoutProductInput | Prisma.StockTransactionUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.StockTransactionScalarWhereInput | Prisma.StockTransactionScalarWhereInput[];
};
export type StockTransactionUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.StockTransactionCreateWithoutProductInput, Prisma.StockTransactionUncheckedCreateWithoutProductInput> | Prisma.StockTransactionCreateWithoutProductInput[] | Prisma.StockTransactionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StockTransactionCreateOrConnectWithoutProductInput | Prisma.StockTransactionCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.StockTransactionUpsertWithWhereUniqueWithoutProductInput | Prisma.StockTransactionUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.StockTransactionCreateManyProductInputEnvelope;
    set?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    disconnect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    delete?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    connect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    update?: Prisma.StockTransactionUpdateWithWhereUniqueWithoutProductInput | Prisma.StockTransactionUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.StockTransactionUpdateManyWithWhereWithoutProductInput | Prisma.StockTransactionUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.StockTransactionScalarWhereInput | Prisma.StockTransactionScalarWhereInput[];
};
export type StockTransactionCreateNestedManyWithoutVariantInput = {
    create?: Prisma.XOR<Prisma.StockTransactionCreateWithoutVariantInput, Prisma.StockTransactionUncheckedCreateWithoutVariantInput> | Prisma.StockTransactionCreateWithoutVariantInput[] | Prisma.StockTransactionUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.StockTransactionCreateOrConnectWithoutVariantInput | Prisma.StockTransactionCreateOrConnectWithoutVariantInput[];
    createMany?: Prisma.StockTransactionCreateManyVariantInputEnvelope;
    connect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
};
export type StockTransactionUncheckedCreateNestedManyWithoutVariantInput = {
    create?: Prisma.XOR<Prisma.StockTransactionCreateWithoutVariantInput, Prisma.StockTransactionUncheckedCreateWithoutVariantInput> | Prisma.StockTransactionCreateWithoutVariantInput[] | Prisma.StockTransactionUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.StockTransactionCreateOrConnectWithoutVariantInput | Prisma.StockTransactionCreateOrConnectWithoutVariantInput[];
    createMany?: Prisma.StockTransactionCreateManyVariantInputEnvelope;
    connect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
};
export type StockTransactionUpdateManyWithoutVariantNestedInput = {
    create?: Prisma.XOR<Prisma.StockTransactionCreateWithoutVariantInput, Prisma.StockTransactionUncheckedCreateWithoutVariantInput> | Prisma.StockTransactionCreateWithoutVariantInput[] | Prisma.StockTransactionUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.StockTransactionCreateOrConnectWithoutVariantInput | Prisma.StockTransactionCreateOrConnectWithoutVariantInput[];
    upsert?: Prisma.StockTransactionUpsertWithWhereUniqueWithoutVariantInput | Prisma.StockTransactionUpsertWithWhereUniqueWithoutVariantInput[];
    createMany?: Prisma.StockTransactionCreateManyVariantInputEnvelope;
    set?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    disconnect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    delete?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    connect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    update?: Prisma.StockTransactionUpdateWithWhereUniqueWithoutVariantInput | Prisma.StockTransactionUpdateWithWhereUniqueWithoutVariantInput[];
    updateMany?: Prisma.StockTransactionUpdateManyWithWhereWithoutVariantInput | Prisma.StockTransactionUpdateManyWithWhereWithoutVariantInput[];
    deleteMany?: Prisma.StockTransactionScalarWhereInput | Prisma.StockTransactionScalarWhereInput[];
};
export type StockTransactionUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: Prisma.XOR<Prisma.StockTransactionCreateWithoutVariantInput, Prisma.StockTransactionUncheckedCreateWithoutVariantInput> | Prisma.StockTransactionCreateWithoutVariantInput[] | Prisma.StockTransactionUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.StockTransactionCreateOrConnectWithoutVariantInput | Prisma.StockTransactionCreateOrConnectWithoutVariantInput[];
    upsert?: Prisma.StockTransactionUpsertWithWhereUniqueWithoutVariantInput | Prisma.StockTransactionUpsertWithWhereUniqueWithoutVariantInput[];
    createMany?: Prisma.StockTransactionCreateManyVariantInputEnvelope;
    set?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    disconnect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    delete?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    connect?: Prisma.StockTransactionWhereUniqueInput | Prisma.StockTransactionWhereUniqueInput[];
    update?: Prisma.StockTransactionUpdateWithWhereUniqueWithoutVariantInput | Prisma.StockTransactionUpdateWithWhereUniqueWithoutVariantInput[];
    updateMany?: Prisma.StockTransactionUpdateManyWithWhereWithoutVariantInput | Prisma.StockTransactionUpdateManyWithWhereWithoutVariantInput[];
    deleteMany?: Prisma.StockTransactionScalarWhereInput | Prisma.StockTransactionScalarWhereInput[];
};
export type EnumStockTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.StockTransactionType;
};
export type StockTransactionCreateWithoutProductInput = {
    id?: string;
    type: $Enums.StockTransactionType;
    quantity: number;
    beforeStock: number;
    afterStock: number;
    reason: string;
    reference?: string | null;
    changedBy: string;
    createdAt?: Date | string;
    variant?: Prisma.ProductVariantCreateNestedOneWithoutStockTransactionsInput;
};
export type StockTransactionUncheckedCreateWithoutProductInput = {
    id?: string;
    type: $Enums.StockTransactionType;
    quantity: number;
    beforeStock: number;
    afterStock: number;
    reason: string;
    reference?: string | null;
    changedBy: string;
    variantId?: string | null;
    createdAt?: Date | string;
};
export type StockTransactionCreateOrConnectWithoutProductInput = {
    where: Prisma.StockTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockTransactionCreateWithoutProductInput, Prisma.StockTransactionUncheckedCreateWithoutProductInput>;
};
export type StockTransactionCreateManyProductInputEnvelope = {
    data: Prisma.StockTransactionCreateManyProductInput | Prisma.StockTransactionCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type StockTransactionUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.StockTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockTransactionUpdateWithoutProductInput, Prisma.StockTransactionUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.StockTransactionCreateWithoutProductInput, Prisma.StockTransactionUncheckedCreateWithoutProductInput>;
};
export type StockTransactionUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.StockTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockTransactionUpdateWithoutProductInput, Prisma.StockTransactionUncheckedUpdateWithoutProductInput>;
};
export type StockTransactionUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.StockTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.StockTransactionUpdateManyMutationInput, Prisma.StockTransactionUncheckedUpdateManyWithoutProductInput>;
};
export type StockTransactionScalarWhereInput = {
    AND?: Prisma.StockTransactionScalarWhereInput | Prisma.StockTransactionScalarWhereInput[];
    OR?: Prisma.StockTransactionScalarWhereInput[];
    NOT?: Prisma.StockTransactionScalarWhereInput | Prisma.StockTransactionScalarWhereInput[];
    id?: Prisma.StringFilter<"StockTransaction"> | string;
    type?: Prisma.EnumStockTransactionTypeFilter<"StockTransaction"> | $Enums.StockTransactionType;
    quantity?: Prisma.IntFilter<"StockTransaction"> | number;
    beforeStock?: Prisma.IntFilter<"StockTransaction"> | number;
    afterStock?: Prisma.IntFilter<"StockTransaction"> | number;
    reason?: Prisma.StringFilter<"StockTransaction"> | string;
    reference?: Prisma.StringNullableFilter<"StockTransaction"> | string | null;
    changedBy?: Prisma.StringFilter<"StockTransaction"> | string;
    productId?: Prisma.StringFilter<"StockTransaction"> | string;
    variantId?: Prisma.StringNullableFilter<"StockTransaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StockTransaction"> | Date | string;
};
export type StockTransactionCreateWithoutVariantInput = {
    id?: string;
    type: $Enums.StockTransactionType;
    quantity: number;
    beforeStock: number;
    afterStock: number;
    reason: string;
    reference?: string | null;
    changedBy: string;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutStockTransactionsInput;
};
export type StockTransactionUncheckedCreateWithoutVariantInput = {
    id?: string;
    type: $Enums.StockTransactionType;
    quantity: number;
    beforeStock: number;
    afterStock: number;
    reason: string;
    reference?: string | null;
    changedBy: string;
    productId: string;
    createdAt?: Date | string;
};
export type StockTransactionCreateOrConnectWithoutVariantInput = {
    where: Prisma.StockTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockTransactionCreateWithoutVariantInput, Prisma.StockTransactionUncheckedCreateWithoutVariantInput>;
};
export type StockTransactionCreateManyVariantInputEnvelope = {
    data: Prisma.StockTransactionCreateManyVariantInput | Prisma.StockTransactionCreateManyVariantInput[];
    skipDuplicates?: boolean;
};
export type StockTransactionUpsertWithWhereUniqueWithoutVariantInput = {
    where: Prisma.StockTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockTransactionUpdateWithoutVariantInput, Prisma.StockTransactionUncheckedUpdateWithoutVariantInput>;
    create: Prisma.XOR<Prisma.StockTransactionCreateWithoutVariantInput, Prisma.StockTransactionUncheckedCreateWithoutVariantInput>;
};
export type StockTransactionUpdateWithWhereUniqueWithoutVariantInput = {
    where: Prisma.StockTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockTransactionUpdateWithoutVariantInput, Prisma.StockTransactionUncheckedUpdateWithoutVariantInput>;
};
export type StockTransactionUpdateManyWithWhereWithoutVariantInput = {
    where: Prisma.StockTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.StockTransactionUpdateManyMutationInput, Prisma.StockTransactionUncheckedUpdateManyWithoutVariantInput>;
};
export type StockTransactionCreateManyProductInput = {
    id?: string;
    type: $Enums.StockTransactionType;
    quantity: number;
    beforeStock: number;
    afterStock: number;
    reason: string;
    reference?: string | null;
    changedBy: string;
    variantId?: string | null;
    createdAt?: Date | string;
};
export type StockTransactionUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockTransactionTypeFieldUpdateOperationsInput | $Enums.StockTransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    beforeStock?: Prisma.IntFieldUpdateOperationsInput | number;
    afterStock?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    variant?: Prisma.ProductVariantUpdateOneWithoutStockTransactionsNestedInput;
};
export type StockTransactionUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockTransactionTypeFieldUpdateOperationsInput | $Enums.StockTransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    beforeStock?: Prisma.IntFieldUpdateOperationsInput | number;
    afterStock?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockTransactionUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockTransactionTypeFieldUpdateOperationsInput | $Enums.StockTransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    beforeStock?: Prisma.IntFieldUpdateOperationsInput | number;
    afterStock?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockTransactionCreateManyVariantInput = {
    id?: string;
    type: $Enums.StockTransactionType;
    quantity: number;
    beforeStock: number;
    afterStock: number;
    reason: string;
    reference?: string | null;
    changedBy: string;
    productId: string;
    createdAt?: Date | string;
};
export type StockTransactionUpdateWithoutVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockTransactionTypeFieldUpdateOperationsInput | $Enums.StockTransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    beforeStock?: Prisma.IntFieldUpdateOperationsInput | number;
    afterStock?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutStockTransactionsNestedInput;
};
export type StockTransactionUncheckedUpdateWithoutVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockTransactionTypeFieldUpdateOperationsInput | $Enums.StockTransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    beforeStock?: Prisma.IntFieldUpdateOperationsInput | number;
    afterStock?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockTransactionUncheckedUpdateManyWithoutVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockTransactionTypeFieldUpdateOperationsInput | $Enums.StockTransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    beforeStock?: Prisma.IntFieldUpdateOperationsInput | number;
    afterStock?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockTransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    quantity?: boolean;
    beforeStock?: boolean;
    afterStock?: boolean;
    reason?: boolean;
    reference?: boolean;
    changedBy?: boolean;
    productId?: boolean;
    variantId?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.StockTransaction$variantArgs<ExtArgs>;
}, ExtArgs["result"]["stockTransaction"]>;
export type StockTransactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    quantity?: boolean;
    beforeStock?: boolean;
    afterStock?: boolean;
    reason?: boolean;
    reference?: boolean;
    changedBy?: boolean;
    productId?: boolean;
    variantId?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.StockTransaction$variantArgs<ExtArgs>;
}, ExtArgs["result"]["stockTransaction"]>;
export type StockTransactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    quantity?: boolean;
    beforeStock?: boolean;
    afterStock?: boolean;
    reason?: boolean;
    reference?: boolean;
    changedBy?: boolean;
    productId?: boolean;
    variantId?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.StockTransaction$variantArgs<ExtArgs>;
}, ExtArgs["result"]["stockTransaction"]>;
export type StockTransactionSelectScalar = {
    id?: boolean;
    type?: boolean;
    quantity?: boolean;
    beforeStock?: boolean;
    afterStock?: boolean;
    reason?: boolean;
    reference?: boolean;
    changedBy?: boolean;
    productId?: boolean;
    variantId?: boolean;
    createdAt?: boolean;
};
export type StockTransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "quantity" | "beforeStock" | "afterStock" | "reason" | "reference" | "changedBy" | "productId" | "variantId" | "createdAt", ExtArgs["result"]["stockTransaction"]>;
export type StockTransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.StockTransaction$variantArgs<ExtArgs>;
};
export type StockTransactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.StockTransaction$variantArgs<ExtArgs>;
};
export type StockTransactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.StockTransaction$variantArgs<ExtArgs>;
};
export type $StockTransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StockTransaction";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        variant: Prisma.$ProductVariantPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: $Enums.StockTransactionType;
        quantity: number;
        beforeStock: number;
        afterStock: number;
        reason: string;
        reference: string | null;
        changedBy: string;
        productId: string;
        variantId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["stockTransaction"]>;
    composites: {};
};
export type StockTransactionGetPayload<S extends boolean | null | undefined | StockTransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload, S>;
export type StockTransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StockTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StockTransactionCountAggregateInputType | true;
};
export interface StockTransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StockTransaction'];
        meta: {
            name: 'StockTransaction';
        };
    };
    findUnique<T extends StockTransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, StockTransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StockTransactionClient<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StockTransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StockTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockTransactionClient<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StockTransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, StockTransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__StockTransactionClient<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StockTransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StockTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockTransactionClient<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StockTransactionFindManyArgs>(args?: Prisma.SelectSubset<T, StockTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StockTransactionCreateArgs>(args: Prisma.SelectSubset<T, StockTransactionCreateArgs<ExtArgs>>): Prisma.Prisma__StockTransactionClient<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StockTransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, StockTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StockTransactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StockTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StockTransactionDeleteArgs>(args: Prisma.SelectSubset<T, StockTransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__StockTransactionClient<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StockTransactionUpdateArgs>(args: Prisma.SelectSubset<T, StockTransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__StockTransactionClient<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StockTransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, StockTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StockTransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, StockTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StockTransactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StockTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StockTransactionUpsertArgs>(args: Prisma.SelectSubset<T, StockTransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__StockTransactionClient<runtime.Types.Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StockTransactionCountArgs>(args?: Prisma.Subset<T, StockTransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StockTransactionCountAggregateOutputType> : number>;
    aggregate<T extends StockTransactionAggregateArgs>(args: Prisma.Subset<T, StockTransactionAggregateArgs>): Prisma.PrismaPromise<GetStockTransactionAggregateType<T>>;
    groupBy<T extends StockTransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StockTransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: StockTransactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StockTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StockTransactionFieldRefs;
}
export interface Prisma__StockTransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    variant<T extends Prisma.StockTransaction$variantArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StockTransaction$variantArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StockTransactionFieldRefs {
    readonly id: Prisma.FieldRef<"StockTransaction", 'String'>;
    readonly type: Prisma.FieldRef<"StockTransaction", 'StockTransactionType'>;
    readonly quantity: Prisma.FieldRef<"StockTransaction", 'Int'>;
    readonly beforeStock: Prisma.FieldRef<"StockTransaction", 'Int'>;
    readonly afterStock: Prisma.FieldRef<"StockTransaction", 'Int'>;
    readonly reason: Prisma.FieldRef<"StockTransaction", 'String'>;
    readonly reference: Prisma.FieldRef<"StockTransaction", 'String'>;
    readonly changedBy: Prisma.FieldRef<"StockTransaction", 'String'>;
    readonly productId: Prisma.FieldRef<"StockTransaction", 'String'>;
    readonly variantId: Prisma.FieldRef<"StockTransaction", 'String'>;
    readonly createdAt: Prisma.FieldRef<"StockTransaction", 'DateTime'>;
}
export type StockTransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockTransactionSelect<ExtArgs> | null;
    omit?: Prisma.StockTransactionOmit<ExtArgs> | null;
    include?: Prisma.StockTransactionInclude<ExtArgs> | null;
    where: Prisma.StockTransactionWhereUniqueInput;
};
export type StockTransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockTransactionSelect<ExtArgs> | null;
    omit?: Prisma.StockTransactionOmit<ExtArgs> | null;
    include?: Prisma.StockTransactionInclude<ExtArgs> | null;
    where: Prisma.StockTransactionWhereUniqueInput;
};
export type StockTransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StockTransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StockTransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StockTransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockTransactionSelect<ExtArgs> | null;
    omit?: Prisma.StockTransactionOmit<ExtArgs> | null;
    include?: Prisma.StockTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StockTransactionCreateInput, Prisma.StockTransactionUncheckedCreateInput>;
};
export type StockTransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StockTransactionCreateManyInput | Prisma.StockTransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StockTransactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockTransactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StockTransactionOmit<ExtArgs> | null;
    data: Prisma.StockTransactionCreateManyInput | Prisma.StockTransactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StockTransactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StockTransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockTransactionSelect<ExtArgs> | null;
    omit?: Prisma.StockTransactionOmit<ExtArgs> | null;
    include?: Prisma.StockTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StockTransactionUpdateInput, Prisma.StockTransactionUncheckedUpdateInput>;
    where: Prisma.StockTransactionWhereUniqueInput;
};
export type StockTransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StockTransactionUpdateManyMutationInput, Prisma.StockTransactionUncheckedUpdateManyInput>;
    where?: Prisma.StockTransactionWhereInput;
    limit?: number;
};
export type StockTransactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockTransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StockTransactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StockTransactionUpdateManyMutationInput, Prisma.StockTransactionUncheckedUpdateManyInput>;
    where?: Prisma.StockTransactionWhereInput;
    limit?: number;
    include?: Prisma.StockTransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StockTransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockTransactionSelect<ExtArgs> | null;
    omit?: Prisma.StockTransactionOmit<ExtArgs> | null;
    include?: Prisma.StockTransactionInclude<ExtArgs> | null;
    where: Prisma.StockTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockTransactionCreateInput, Prisma.StockTransactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StockTransactionUpdateInput, Prisma.StockTransactionUncheckedUpdateInput>;
};
export type StockTransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockTransactionSelect<ExtArgs> | null;
    omit?: Prisma.StockTransactionOmit<ExtArgs> | null;
    include?: Prisma.StockTransactionInclude<ExtArgs> | null;
    where: Prisma.StockTransactionWhereUniqueInput;
};
export type StockTransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockTransactionWhereInput;
    limit?: number;
};
export type StockTransaction$variantArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    where?: Prisma.ProductVariantWhereInput;
};
export type StockTransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockTransactionSelect<ExtArgs> | null;
    omit?: Prisma.StockTransactionOmit<ExtArgs> | null;
    include?: Prisma.StockTransactionInclude<ExtArgs> | null;
};
