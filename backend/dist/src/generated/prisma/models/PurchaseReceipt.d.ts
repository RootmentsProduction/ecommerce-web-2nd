import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PurchaseReceiptModel = runtime.Types.Result.DefaultSelection<Prisma.$PurchaseReceiptPayload>;
export type AggregatePurchaseReceipt = {
    _count: PurchaseReceiptCountAggregateOutputType | null;
    _min: PurchaseReceiptMinAggregateOutputType | null;
    _max: PurchaseReceiptMaxAggregateOutputType | null;
};
export type PurchaseReceiptMinAggregateOutputType = {
    id: string | null;
    purchaseOrderId: string | null;
    receivedBy: string | null;
    notes: string | null;
    createdAt: Date | null;
};
export type PurchaseReceiptMaxAggregateOutputType = {
    id: string | null;
    purchaseOrderId: string | null;
    receivedBy: string | null;
    notes: string | null;
    createdAt: Date | null;
};
export type PurchaseReceiptCountAggregateOutputType = {
    id: number;
    purchaseOrderId: number;
    receivedBy: number;
    notes: number;
    createdAt: number;
    _all: number;
};
export type PurchaseReceiptMinAggregateInputType = {
    id?: true;
    purchaseOrderId?: true;
    receivedBy?: true;
    notes?: true;
    createdAt?: true;
};
export type PurchaseReceiptMaxAggregateInputType = {
    id?: true;
    purchaseOrderId?: true;
    receivedBy?: true;
    notes?: true;
    createdAt?: true;
};
export type PurchaseReceiptCountAggregateInputType = {
    id?: true;
    purchaseOrderId?: true;
    receivedBy?: true;
    notes?: true;
    createdAt?: true;
    _all?: true;
};
export type PurchaseReceiptAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseReceiptWhereInput;
    orderBy?: Prisma.PurchaseReceiptOrderByWithRelationInput | Prisma.PurchaseReceiptOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PurchaseReceiptCountAggregateInputType;
    _min?: PurchaseReceiptMinAggregateInputType;
    _max?: PurchaseReceiptMaxAggregateInputType;
};
export type GetPurchaseReceiptAggregateType<T extends PurchaseReceiptAggregateArgs> = {
    [P in keyof T & keyof AggregatePurchaseReceipt]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePurchaseReceipt[P]> : Prisma.GetScalarType<T[P], AggregatePurchaseReceipt[P]>;
};
export type PurchaseReceiptGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseReceiptWhereInput;
    orderBy?: Prisma.PurchaseReceiptOrderByWithAggregationInput | Prisma.PurchaseReceiptOrderByWithAggregationInput[];
    by: Prisma.PurchaseReceiptScalarFieldEnum[] | Prisma.PurchaseReceiptScalarFieldEnum;
    having?: Prisma.PurchaseReceiptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PurchaseReceiptCountAggregateInputType | true;
    _min?: PurchaseReceiptMinAggregateInputType;
    _max?: PurchaseReceiptMaxAggregateInputType;
};
export type PurchaseReceiptGroupByOutputType = {
    id: string;
    purchaseOrderId: string;
    receivedBy: string;
    notes: string | null;
    createdAt: Date;
    _count: PurchaseReceiptCountAggregateOutputType | null;
    _min: PurchaseReceiptMinAggregateOutputType | null;
    _max: PurchaseReceiptMaxAggregateOutputType | null;
};
export type GetPurchaseReceiptGroupByPayload<T extends PurchaseReceiptGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PurchaseReceiptGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PurchaseReceiptGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PurchaseReceiptGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PurchaseReceiptGroupByOutputType[P]>;
}>>;
export type PurchaseReceiptWhereInput = {
    AND?: Prisma.PurchaseReceiptWhereInput | Prisma.PurchaseReceiptWhereInput[];
    OR?: Prisma.PurchaseReceiptWhereInput[];
    NOT?: Prisma.PurchaseReceiptWhereInput | Prisma.PurchaseReceiptWhereInput[];
    id?: Prisma.StringFilter<"PurchaseReceipt"> | string;
    purchaseOrderId?: Prisma.StringFilter<"PurchaseReceipt"> | string;
    receivedBy?: Prisma.StringFilter<"PurchaseReceipt"> | string;
    notes?: Prisma.StringNullableFilter<"PurchaseReceipt"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PurchaseReceipt"> | Date | string;
    purchaseOrder?: Prisma.XOR<Prisma.PurchaseOrderScalarRelationFilter, Prisma.PurchaseOrderWhereInput>;
    items?: Prisma.PurchaseReceiptItemListRelationFilter;
};
export type PurchaseReceiptOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    purchaseOrderId?: Prisma.SortOrder;
    receivedBy?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    purchaseOrder?: Prisma.PurchaseOrderOrderByWithRelationInput;
    items?: Prisma.PurchaseReceiptItemOrderByRelationAggregateInput;
};
export type PurchaseReceiptWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PurchaseReceiptWhereInput | Prisma.PurchaseReceiptWhereInput[];
    OR?: Prisma.PurchaseReceiptWhereInput[];
    NOT?: Prisma.PurchaseReceiptWhereInput | Prisma.PurchaseReceiptWhereInput[];
    purchaseOrderId?: Prisma.StringFilter<"PurchaseReceipt"> | string;
    receivedBy?: Prisma.StringFilter<"PurchaseReceipt"> | string;
    notes?: Prisma.StringNullableFilter<"PurchaseReceipt"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PurchaseReceipt"> | Date | string;
    purchaseOrder?: Prisma.XOR<Prisma.PurchaseOrderScalarRelationFilter, Prisma.PurchaseOrderWhereInput>;
    items?: Prisma.PurchaseReceiptItemListRelationFilter;
}, "id">;
export type PurchaseReceiptOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    purchaseOrderId?: Prisma.SortOrder;
    receivedBy?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PurchaseReceiptCountOrderByAggregateInput;
    _max?: Prisma.PurchaseReceiptMaxOrderByAggregateInput;
    _min?: Prisma.PurchaseReceiptMinOrderByAggregateInput;
};
export type PurchaseReceiptScalarWhereWithAggregatesInput = {
    AND?: Prisma.PurchaseReceiptScalarWhereWithAggregatesInput | Prisma.PurchaseReceiptScalarWhereWithAggregatesInput[];
    OR?: Prisma.PurchaseReceiptScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PurchaseReceiptScalarWhereWithAggregatesInput | Prisma.PurchaseReceiptScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PurchaseReceipt"> | string;
    purchaseOrderId?: Prisma.StringWithAggregatesFilter<"PurchaseReceipt"> | string;
    receivedBy?: Prisma.StringWithAggregatesFilter<"PurchaseReceipt"> | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"PurchaseReceipt"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PurchaseReceipt"> | Date | string;
};
export type PurchaseReceiptCreateInput = {
    id?: string;
    receivedBy: string;
    notes?: string | null;
    createdAt?: Date | string;
    purchaseOrder: Prisma.PurchaseOrderCreateNestedOneWithoutReceiptsInput;
    items?: Prisma.PurchaseReceiptItemCreateNestedManyWithoutReceiptInput;
};
export type PurchaseReceiptUncheckedCreateInput = {
    id?: string;
    purchaseOrderId: string;
    receivedBy: string;
    notes?: string | null;
    createdAt?: Date | string;
    items?: Prisma.PurchaseReceiptItemUncheckedCreateNestedManyWithoutReceiptInput;
};
export type PurchaseReceiptUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purchaseOrder?: Prisma.PurchaseOrderUpdateOneRequiredWithoutReceiptsNestedInput;
    items?: Prisma.PurchaseReceiptItemUpdateManyWithoutReceiptNestedInput;
};
export type PurchaseReceiptUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purchaseOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.PurchaseReceiptItemUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type PurchaseReceiptCreateManyInput = {
    id?: string;
    purchaseOrderId: string;
    receivedBy: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type PurchaseReceiptUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PurchaseReceiptUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purchaseOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PurchaseReceiptListRelationFilter = {
    every?: Prisma.PurchaseReceiptWhereInput;
    some?: Prisma.PurchaseReceiptWhereInput;
    none?: Prisma.PurchaseReceiptWhereInput;
};
export type PurchaseReceiptOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PurchaseReceiptCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    purchaseOrderId?: Prisma.SortOrder;
    receivedBy?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PurchaseReceiptMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    purchaseOrderId?: Prisma.SortOrder;
    receivedBy?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PurchaseReceiptMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    purchaseOrderId?: Prisma.SortOrder;
    receivedBy?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PurchaseReceiptScalarRelationFilter = {
    is?: Prisma.PurchaseReceiptWhereInput;
    isNot?: Prisma.PurchaseReceiptWhereInput;
};
export type PurchaseReceiptCreateNestedManyWithoutPurchaseOrderInput = {
    create?: Prisma.XOR<Prisma.PurchaseReceiptCreateWithoutPurchaseOrderInput, Prisma.PurchaseReceiptUncheckedCreateWithoutPurchaseOrderInput> | Prisma.PurchaseReceiptCreateWithoutPurchaseOrderInput[] | Prisma.PurchaseReceiptUncheckedCreateWithoutPurchaseOrderInput[];
    connectOrCreate?: Prisma.PurchaseReceiptCreateOrConnectWithoutPurchaseOrderInput | Prisma.PurchaseReceiptCreateOrConnectWithoutPurchaseOrderInput[];
    createMany?: Prisma.PurchaseReceiptCreateManyPurchaseOrderInputEnvelope;
    connect?: Prisma.PurchaseReceiptWhereUniqueInput | Prisma.PurchaseReceiptWhereUniqueInput[];
};
export type PurchaseReceiptUncheckedCreateNestedManyWithoutPurchaseOrderInput = {
    create?: Prisma.XOR<Prisma.PurchaseReceiptCreateWithoutPurchaseOrderInput, Prisma.PurchaseReceiptUncheckedCreateWithoutPurchaseOrderInput> | Prisma.PurchaseReceiptCreateWithoutPurchaseOrderInput[] | Prisma.PurchaseReceiptUncheckedCreateWithoutPurchaseOrderInput[];
    connectOrCreate?: Prisma.PurchaseReceiptCreateOrConnectWithoutPurchaseOrderInput | Prisma.PurchaseReceiptCreateOrConnectWithoutPurchaseOrderInput[];
    createMany?: Prisma.PurchaseReceiptCreateManyPurchaseOrderInputEnvelope;
    connect?: Prisma.PurchaseReceiptWhereUniqueInput | Prisma.PurchaseReceiptWhereUniqueInput[];
};
export type PurchaseReceiptUpdateManyWithoutPurchaseOrderNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseReceiptCreateWithoutPurchaseOrderInput, Prisma.PurchaseReceiptUncheckedCreateWithoutPurchaseOrderInput> | Prisma.PurchaseReceiptCreateWithoutPurchaseOrderInput[] | Prisma.PurchaseReceiptUncheckedCreateWithoutPurchaseOrderInput[];
    connectOrCreate?: Prisma.PurchaseReceiptCreateOrConnectWithoutPurchaseOrderInput | Prisma.PurchaseReceiptCreateOrConnectWithoutPurchaseOrderInput[];
    upsert?: Prisma.PurchaseReceiptUpsertWithWhereUniqueWithoutPurchaseOrderInput | Prisma.PurchaseReceiptUpsertWithWhereUniqueWithoutPurchaseOrderInput[];
    createMany?: Prisma.PurchaseReceiptCreateManyPurchaseOrderInputEnvelope;
    set?: Prisma.PurchaseReceiptWhereUniqueInput | Prisma.PurchaseReceiptWhereUniqueInput[];
    disconnect?: Prisma.PurchaseReceiptWhereUniqueInput | Prisma.PurchaseReceiptWhereUniqueInput[];
    delete?: Prisma.PurchaseReceiptWhereUniqueInput | Prisma.PurchaseReceiptWhereUniqueInput[];
    connect?: Prisma.PurchaseReceiptWhereUniqueInput | Prisma.PurchaseReceiptWhereUniqueInput[];
    update?: Prisma.PurchaseReceiptUpdateWithWhereUniqueWithoutPurchaseOrderInput | Prisma.PurchaseReceiptUpdateWithWhereUniqueWithoutPurchaseOrderInput[];
    updateMany?: Prisma.PurchaseReceiptUpdateManyWithWhereWithoutPurchaseOrderInput | Prisma.PurchaseReceiptUpdateManyWithWhereWithoutPurchaseOrderInput[];
    deleteMany?: Prisma.PurchaseReceiptScalarWhereInput | Prisma.PurchaseReceiptScalarWhereInput[];
};
export type PurchaseReceiptUncheckedUpdateManyWithoutPurchaseOrderNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseReceiptCreateWithoutPurchaseOrderInput, Prisma.PurchaseReceiptUncheckedCreateWithoutPurchaseOrderInput> | Prisma.PurchaseReceiptCreateWithoutPurchaseOrderInput[] | Prisma.PurchaseReceiptUncheckedCreateWithoutPurchaseOrderInput[];
    connectOrCreate?: Prisma.PurchaseReceiptCreateOrConnectWithoutPurchaseOrderInput | Prisma.PurchaseReceiptCreateOrConnectWithoutPurchaseOrderInput[];
    upsert?: Prisma.PurchaseReceiptUpsertWithWhereUniqueWithoutPurchaseOrderInput | Prisma.PurchaseReceiptUpsertWithWhereUniqueWithoutPurchaseOrderInput[];
    createMany?: Prisma.PurchaseReceiptCreateManyPurchaseOrderInputEnvelope;
    set?: Prisma.PurchaseReceiptWhereUniqueInput | Prisma.PurchaseReceiptWhereUniqueInput[];
    disconnect?: Prisma.PurchaseReceiptWhereUniqueInput | Prisma.PurchaseReceiptWhereUniqueInput[];
    delete?: Prisma.PurchaseReceiptWhereUniqueInput | Prisma.PurchaseReceiptWhereUniqueInput[];
    connect?: Prisma.PurchaseReceiptWhereUniqueInput | Prisma.PurchaseReceiptWhereUniqueInput[];
    update?: Prisma.PurchaseReceiptUpdateWithWhereUniqueWithoutPurchaseOrderInput | Prisma.PurchaseReceiptUpdateWithWhereUniqueWithoutPurchaseOrderInput[];
    updateMany?: Prisma.PurchaseReceiptUpdateManyWithWhereWithoutPurchaseOrderInput | Prisma.PurchaseReceiptUpdateManyWithWhereWithoutPurchaseOrderInput[];
    deleteMany?: Prisma.PurchaseReceiptScalarWhereInput | Prisma.PurchaseReceiptScalarWhereInput[];
};
export type PurchaseReceiptCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.PurchaseReceiptCreateWithoutItemsInput, Prisma.PurchaseReceiptUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.PurchaseReceiptCreateOrConnectWithoutItemsInput;
    connect?: Prisma.PurchaseReceiptWhereUniqueInput;
};
export type PurchaseReceiptUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseReceiptCreateWithoutItemsInput, Prisma.PurchaseReceiptUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.PurchaseReceiptCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.PurchaseReceiptUpsertWithoutItemsInput;
    connect?: Prisma.PurchaseReceiptWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PurchaseReceiptUpdateToOneWithWhereWithoutItemsInput, Prisma.PurchaseReceiptUpdateWithoutItemsInput>, Prisma.PurchaseReceiptUncheckedUpdateWithoutItemsInput>;
};
export type PurchaseReceiptCreateWithoutPurchaseOrderInput = {
    id?: string;
    receivedBy: string;
    notes?: string | null;
    createdAt?: Date | string;
    items?: Prisma.PurchaseReceiptItemCreateNestedManyWithoutReceiptInput;
};
export type PurchaseReceiptUncheckedCreateWithoutPurchaseOrderInput = {
    id?: string;
    receivedBy: string;
    notes?: string | null;
    createdAt?: Date | string;
    items?: Prisma.PurchaseReceiptItemUncheckedCreateNestedManyWithoutReceiptInput;
};
export type PurchaseReceiptCreateOrConnectWithoutPurchaseOrderInput = {
    where: Prisma.PurchaseReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseReceiptCreateWithoutPurchaseOrderInput, Prisma.PurchaseReceiptUncheckedCreateWithoutPurchaseOrderInput>;
};
export type PurchaseReceiptCreateManyPurchaseOrderInputEnvelope = {
    data: Prisma.PurchaseReceiptCreateManyPurchaseOrderInput | Prisma.PurchaseReceiptCreateManyPurchaseOrderInput[];
    skipDuplicates?: boolean;
};
export type PurchaseReceiptUpsertWithWhereUniqueWithoutPurchaseOrderInput = {
    where: Prisma.PurchaseReceiptWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseReceiptUpdateWithoutPurchaseOrderInput, Prisma.PurchaseReceiptUncheckedUpdateWithoutPurchaseOrderInput>;
    create: Prisma.XOR<Prisma.PurchaseReceiptCreateWithoutPurchaseOrderInput, Prisma.PurchaseReceiptUncheckedCreateWithoutPurchaseOrderInput>;
};
export type PurchaseReceiptUpdateWithWhereUniqueWithoutPurchaseOrderInput = {
    where: Prisma.PurchaseReceiptWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseReceiptUpdateWithoutPurchaseOrderInput, Prisma.PurchaseReceiptUncheckedUpdateWithoutPurchaseOrderInput>;
};
export type PurchaseReceiptUpdateManyWithWhereWithoutPurchaseOrderInput = {
    where: Prisma.PurchaseReceiptScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseReceiptUpdateManyMutationInput, Prisma.PurchaseReceiptUncheckedUpdateManyWithoutPurchaseOrderInput>;
};
export type PurchaseReceiptScalarWhereInput = {
    AND?: Prisma.PurchaseReceiptScalarWhereInput | Prisma.PurchaseReceiptScalarWhereInput[];
    OR?: Prisma.PurchaseReceiptScalarWhereInput[];
    NOT?: Prisma.PurchaseReceiptScalarWhereInput | Prisma.PurchaseReceiptScalarWhereInput[];
    id?: Prisma.StringFilter<"PurchaseReceipt"> | string;
    purchaseOrderId?: Prisma.StringFilter<"PurchaseReceipt"> | string;
    receivedBy?: Prisma.StringFilter<"PurchaseReceipt"> | string;
    notes?: Prisma.StringNullableFilter<"PurchaseReceipt"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PurchaseReceipt"> | Date | string;
};
export type PurchaseReceiptCreateWithoutItemsInput = {
    id?: string;
    receivedBy: string;
    notes?: string | null;
    createdAt?: Date | string;
    purchaseOrder: Prisma.PurchaseOrderCreateNestedOneWithoutReceiptsInput;
};
export type PurchaseReceiptUncheckedCreateWithoutItemsInput = {
    id?: string;
    purchaseOrderId: string;
    receivedBy: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type PurchaseReceiptCreateOrConnectWithoutItemsInput = {
    where: Prisma.PurchaseReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseReceiptCreateWithoutItemsInput, Prisma.PurchaseReceiptUncheckedCreateWithoutItemsInput>;
};
export type PurchaseReceiptUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.PurchaseReceiptUpdateWithoutItemsInput, Prisma.PurchaseReceiptUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.PurchaseReceiptCreateWithoutItemsInput, Prisma.PurchaseReceiptUncheckedCreateWithoutItemsInput>;
    where?: Prisma.PurchaseReceiptWhereInput;
};
export type PurchaseReceiptUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.PurchaseReceiptWhereInput;
    data: Prisma.XOR<Prisma.PurchaseReceiptUpdateWithoutItemsInput, Prisma.PurchaseReceiptUncheckedUpdateWithoutItemsInput>;
};
export type PurchaseReceiptUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purchaseOrder?: Prisma.PurchaseOrderUpdateOneRequiredWithoutReceiptsNestedInput;
};
export type PurchaseReceiptUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purchaseOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PurchaseReceiptCreateManyPurchaseOrderInput = {
    id?: string;
    receivedBy: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type PurchaseReceiptUpdateWithoutPurchaseOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.PurchaseReceiptItemUpdateManyWithoutReceiptNestedInput;
};
export type PurchaseReceiptUncheckedUpdateWithoutPurchaseOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.PurchaseReceiptItemUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type PurchaseReceiptUncheckedUpdateManyWithoutPurchaseOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PurchaseReceiptCountOutputType = {
    items: number;
};
export type PurchaseReceiptCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | PurchaseReceiptCountOutputTypeCountItemsArgs;
};
export type PurchaseReceiptCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptCountOutputTypeSelect<ExtArgs> | null;
};
export type PurchaseReceiptCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseReceiptItemWhereInput;
};
export type PurchaseReceiptSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    purchaseOrderId?: boolean;
    receivedBy?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    purchaseOrder?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.PurchaseReceipt$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.PurchaseReceiptCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseReceipt"]>;
export type PurchaseReceiptSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    purchaseOrderId?: boolean;
    receivedBy?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    purchaseOrder?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseReceipt"]>;
export type PurchaseReceiptSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    purchaseOrderId?: boolean;
    receivedBy?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    purchaseOrder?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseReceipt"]>;
export type PurchaseReceiptSelectScalar = {
    id?: boolean;
    purchaseOrderId?: boolean;
    receivedBy?: boolean;
    notes?: boolean;
    createdAt?: boolean;
};
export type PurchaseReceiptOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "purchaseOrderId" | "receivedBy" | "notes" | "createdAt", ExtArgs["result"]["purchaseReceipt"]>;
export type PurchaseReceiptInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    purchaseOrder?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.PurchaseReceipt$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.PurchaseReceiptCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PurchaseReceiptIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    purchaseOrder?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
};
export type PurchaseReceiptIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    purchaseOrder?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
};
export type $PurchaseReceiptPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PurchaseReceipt";
    objects: {
        purchaseOrder: Prisma.$PurchaseOrderPayload<ExtArgs>;
        items: Prisma.$PurchaseReceiptItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        purchaseOrderId: string;
        receivedBy: string;
        notes: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["purchaseReceipt"]>;
    composites: {};
};
export type PurchaseReceiptGetPayload<S extends boolean | null | undefined | PurchaseReceiptDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload, S>;
export type PurchaseReceiptCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PurchaseReceiptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PurchaseReceiptCountAggregateInputType | true;
};
export interface PurchaseReceiptDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PurchaseReceipt'];
        meta: {
            name: 'PurchaseReceipt';
        };
    };
    findUnique<T extends PurchaseReceiptFindUniqueArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PurchaseReceiptFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PurchaseReceiptFindFirstArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptFindFirstArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PurchaseReceiptFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PurchaseReceiptFindManyArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PurchaseReceiptCreateArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptCreateArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PurchaseReceiptCreateManyArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PurchaseReceiptCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PurchaseReceiptDeleteArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptDeleteArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PurchaseReceiptUpdateArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptUpdateArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PurchaseReceiptDeleteManyArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PurchaseReceiptUpdateManyArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PurchaseReceiptUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PurchaseReceiptUpsertArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptUpsertArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PurchaseReceiptCountArgs>(args?: Prisma.Subset<T, PurchaseReceiptCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PurchaseReceiptCountAggregateOutputType> : number>;
    aggregate<T extends PurchaseReceiptAggregateArgs>(args: Prisma.Subset<T, PurchaseReceiptAggregateArgs>): Prisma.PrismaPromise<GetPurchaseReceiptAggregateType<T>>;
    groupBy<T extends PurchaseReceiptGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PurchaseReceiptGroupByArgs['orderBy'];
    } : {
        orderBy?: PurchaseReceiptGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PurchaseReceiptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseReceiptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PurchaseReceiptFieldRefs;
}
export interface Prisma__PurchaseReceiptClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    purchaseOrder<T extends Prisma.PurchaseOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.PurchaseReceipt$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseReceipt$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PurchaseReceiptFieldRefs {
    readonly id: Prisma.FieldRef<"PurchaseReceipt", 'String'>;
    readonly purchaseOrderId: Prisma.FieldRef<"PurchaseReceipt", 'String'>;
    readonly receivedBy: Prisma.FieldRef<"PurchaseReceipt", 'String'>;
    readonly notes: Prisma.FieldRef<"PurchaseReceipt", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PurchaseReceipt", 'DateTime'>;
}
export type PurchaseReceiptFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptInclude<ExtArgs> | null;
    where: Prisma.PurchaseReceiptWhereUniqueInput;
};
export type PurchaseReceiptFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptInclude<ExtArgs> | null;
    where: Prisma.PurchaseReceiptWhereUniqueInput;
};
export type PurchaseReceiptFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptInclude<ExtArgs> | null;
    where?: Prisma.PurchaseReceiptWhereInput;
    orderBy?: Prisma.PurchaseReceiptOrderByWithRelationInput | Prisma.PurchaseReceiptOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseReceiptScalarFieldEnum | Prisma.PurchaseReceiptScalarFieldEnum[];
};
export type PurchaseReceiptFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptInclude<ExtArgs> | null;
    where?: Prisma.PurchaseReceiptWhereInput;
    orderBy?: Prisma.PurchaseReceiptOrderByWithRelationInput | Prisma.PurchaseReceiptOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseReceiptScalarFieldEnum | Prisma.PurchaseReceiptScalarFieldEnum[];
};
export type PurchaseReceiptFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptInclude<ExtArgs> | null;
    where?: Prisma.PurchaseReceiptWhereInput;
    orderBy?: Prisma.PurchaseReceiptOrderByWithRelationInput | Prisma.PurchaseReceiptOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseReceiptScalarFieldEnum | Prisma.PurchaseReceiptScalarFieldEnum[];
};
export type PurchaseReceiptCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseReceiptCreateInput, Prisma.PurchaseReceiptUncheckedCreateInput>;
};
export type PurchaseReceiptCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PurchaseReceiptCreateManyInput | Prisma.PurchaseReceiptCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PurchaseReceiptCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    data: Prisma.PurchaseReceiptCreateManyInput | Prisma.PurchaseReceiptCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PurchaseReceiptIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PurchaseReceiptUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseReceiptUpdateInput, Prisma.PurchaseReceiptUncheckedUpdateInput>;
    where: Prisma.PurchaseReceiptWhereUniqueInput;
};
export type PurchaseReceiptUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PurchaseReceiptUpdateManyMutationInput, Prisma.PurchaseReceiptUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseReceiptWhereInput;
    limit?: number;
};
export type PurchaseReceiptUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseReceiptUpdateManyMutationInput, Prisma.PurchaseReceiptUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseReceiptWhereInput;
    limit?: number;
    include?: Prisma.PurchaseReceiptIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PurchaseReceiptUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptInclude<ExtArgs> | null;
    where: Prisma.PurchaseReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseReceiptCreateInput, Prisma.PurchaseReceiptUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PurchaseReceiptUpdateInput, Prisma.PurchaseReceiptUncheckedUpdateInput>;
};
export type PurchaseReceiptDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptInclude<ExtArgs> | null;
    where: Prisma.PurchaseReceiptWhereUniqueInput;
};
export type PurchaseReceiptDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseReceiptWhereInput;
    limit?: number;
};
export type PurchaseReceipt$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptItemInclude<ExtArgs> | null;
    where?: Prisma.PurchaseReceiptItemWhereInput;
    orderBy?: Prisma.PurchaseReceiptItemOrderByWithRelationInput | Prisma.PurchaseReceiptItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseReceiptItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseReceiptItemScalarFieldEnum | Prisma.PurchaseReceiptItemScalarFieldEnum[];
};
export type PurchaseReceiptDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptInclude<ExtArgs> | null;
};
