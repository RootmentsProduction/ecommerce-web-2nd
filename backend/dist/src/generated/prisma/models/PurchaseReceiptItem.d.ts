import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PurchaseReceiptItemModel = runtime.Types.Result.DefaultSelection<Prisma.$PurchaseReceiptItemPayload>;
export type AggregatePurchaseReceiptItem = {
    _count: PurchaseReceiptItemCountAggregateOutputType | null;
    _avg: PurchaseReceiptItemAvgAggregateOutputType | null;
    _sum: PurchaseReceiptItemSumAggregateOutputType | null;
    _min: PurchaseReceiptItemMinAggregateOutputType | null;
    _max: PurchaseReceiptItemMaxAggregateOutputType | null;
};
export type PurchaseReceiptItemAvgAggregateOutputType = {
    quantityReceived: number | null;
};
export type PurchaseReceiptItemSumAggregateOutputType = {
    quantityReceived: number | null;
};
export type PurchaseReceiptItemMinAggregateOutputType = {
    id: string | null;
    receiptId: string | null;
    sku: string | null;
    quantityReceived: number | null;
};
export type PurchaseReceiptItemMaxAggregateOutputType = {
    id: string | null;
    receiptId: string | null;
    sku: string | null;
    quantityReceived: number | null;
};
export type PurchaseReceiptItemCountAggregateOutputType = {
    id: number;
    receiptId: number;
    sku: number;
    quantityReceived: number;
    _all: number;
};
export type PurchaseReceiptItemAvgAggregateInputType = {
    quantityReceived?: true;
};
export type PurchaseReceiptItemSumAggregateInputType = {
    quantityReceived?: true;
};
export type PurchaseReceiptItemMinAggregateInputType = {
    id?: true;
    receiptId?: true;
    sku?: true;
    quantityReceived?: true;
};
export type PurchaseReceiptItemMaxAggregateInputType = {
    id?: true;
    receiptId?: true;
    sku?: true;
    quantityReceived?: true;
};
export type PurchaseReceiptItemCountAggregateInputType = {
    id?: true;
    receiptId?: true;
    sku?: true;
    quantityReceived?: true;
    _all?: true;
};
export type PurchaseReceiptItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseReceiptItemWhereInput;
    orderBy?: Prisma.PurchaseReceiptItemOrderByWithRelationInput | Prisma.PurchaseReceiptItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseReceiptItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PurchaseReceiptItemCountAggregateInputType;
    _avg?: PurchaseReceiptItemAvgAggregateInputType;
    _sum?: PurchaseReceiptItemSumAggregateInputType;
    _min?: PurchaseReceiptItemMinAggregateInputType;
    _max?: PurchaseReceiptItemMaxAggregateInputType;
};
export type GetPurchaseReceiptItemAggregateType<T extends PurchaseReceiptItemAggregateArgs> = {
    [P in keyof T & keyof AggregatePurchaseReceiptItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePurchaseReceiptItem[P]> : Prisma.GetScalarType<T[P], AggregatePurchaseReceiptItem[P]>;
};
export type PurchaseReceiptItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseReceiptItemWhereInput;
    orderBy?: Prisma.PurchaseReceiptItemOrderByWithAggregationInput | Prisma.PurchaseReceiptItemOrderByWithAggregationInput[];
    by: Prisma.PurchaseReceiptItemScalarFieldEnum[] | Prisma.PurchaseReceiptItemScalarFieldEnum;
    having?: Prisma.PurchaseReceiptItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PurchaseReceiptItemCountAggregateInputType | true;
    _avg?: PurchaseReceiptItemAvgAggregateInputType;
    _sum?: PurchaseReceiptItemSumAggregateInputType;
    _min?: PurchaseReceiptItemMinAggregateInputType;
    _max?: PurchaseReceiptItemMaxAggregateInputType;
};
export type PurchaseReceiptItemGroupByOutputType = {
    id: string;
    receiptId: string;
    sku: string;
    quantityReceived: number;
    _count: PurchaseReceiptItemCountAggregateOutputType | null;
    _avg: PurchaseReceiptItemAvgAggregateOutputType | null;
    _sum: PurchaseReceiptItemSumAggregateOutputType | null;
    _min: PurchaseReceiptItemMinAggregateOutputType | null;
    _max: PurchaseReceiptItemMaxAggregateOutputType | null;
};
export type GetPurchaseReceiptItemGroupByPayload<T extends PurchaseReceiptItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PurchaseReceiptItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PurchaseReceiptItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PurchaseReceiptItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PurchaseReceiptItemGroupByOutputType[P]>;
}>>;
export type PurchaseReceiptItemWhereInput = {
    AND?: Prisma.PurchaseReceiptItemWhereInput | Prisma.PurchaseReceiptItemWhereInput[];
    OR?: Prisma.PurchaseReceiptItemWhereInput[];
    NOT?: Prisma.PurchaseReceiptItemWhereInput | Prisma.PurchaseReceiptItemWhereInput[];
    id?: Prisma.StringFilter<"PurchaseReceiptItem"> | string;
    receiptId?: Prisma.StringFilter<"PurchaseReceiptItem"> | string;
    sku?: Prisma.StringFilter<"PurchaseReceiptItem"> | string;
    quantityReceived?: Prisma.IntFilter<"PurchaseReceiptItem"> | number;
    receipt?: Prisma.XOR<Prisma.PurchaseReceiptScalarRelationFilter, Prisma.PurchaseReceiptWhereInput>;
};
export type PurchaseReceiptItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    sku?: Prisma.SortOrder;
    quantityReceived?: Prisma.SortOrder;
    receipt?: Prisma.PurchaseReceiptOrderByWithRelationInput;
};
export type PurchaseReceiptItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PurchaseReceiptItemWhereInput | Prisma.PurchaseReceiptItemWhereInput[];
    OR?: Prisma.PurchaseReceiptItemWhereInput[];
    NOT?: Prisma.PurchaseReceiptItemWhereInput | Prisma.PurchaseReceiptItemWhereInput[];
    receiptId?: Prisma.StringFilter<"PurchaseReceiptItem"> | string;
    sku?: Prisma.StringFilter<"PurchaseReceiptItem"> | string;
    quantityReceived?: Prisma.IntFilter<"PurchaseReceiptItem"> | number;
    receipt?: Prisma.XOR<Prisma.PurchaseReceiptScalarRelationFilter, Prisma.PurchaseReceiptWhereInput>;
}, "id">;
export type PurchaseReceiptItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    sku?: Prisma.SortOrder;
    quantityReceived?: Prisma.SortOrder;
    _count?: Prisma.PurchaseReceiptItemCountOrderByAggregateInput;
    _avg?: Prisma.PurchaseReceiptItemAvgOrderByAggregateInput;
    _max?: Prisma.PurchaseReceiptItemMaxOrderByAggregateInput;
    _min?: Prisma.PurchaseReceiptItemMinOrderByAggregateInput;
    _sum?: Prisma.PurchaseReceiptItemSumOrderByAggregateInput;
};
export type PurchaseReceiptItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.PurchaseReceiptItemScalarWhereWithAggregatesInput | Prisma.PurchaseReceiptItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.PurchaseReceiptItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PurchaseReceiptItemScalarWhereWithAggregatesInput | Prisma.PurchaseReceiptItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PurchaseReceiptItem"> | string;
    receiptId?: Prisma.StringWithAggregatesFilter<"PurchaseReceiptItem"> | string;
    sku?: Prisma.StringWithAggregatesFilter<"PurchaseReceiptItem"> | string;
    quantityReceived?: Prisma.IntWithAggregatesFilter<"PurchaseReceiptItem"> | number;
};
export type PurchaseReceiptItemCreateInput = {
    id?: string;
    sku: string;
    quantityReceived: number;
    receipt: Prisma.PurchaseReceiptCreateNestedOneWithoutItemsInput;
};
export type PurchaseReceiptItemUncheckedCreateInput = {
    id?: string;
    receiptId: string;
    sku: string;
    quantityReceived: number;
};
export type PurchaseReceiptItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    receipt?: Prisma.PurchaseReceiptUpdateOneRequiredWithoutItemsNestedInput;
};
export type PurchaseReceiptItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityReceived?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PurchaseReceiptItemCreateManyInput = {
    id?: string;
    receiptId: string;
    sku: string;
    quantityReceived: number;
};
export type PurchaseReceiptItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityReceived?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PurchaseReceiptItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityReceived?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PurchaseReceiptItemListRelationFilter = {
    every?: Prisma.PurchaseReceiptItemWhereInput;
    some?: Prisma.PurchaseReceiptItemWhereInput;
    none?: Prisma.PurchaseReceiptItemWhereInput;
};
export type PurchaseReceiptItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PurchaseReceiptItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    sku?: Prisma.SortOrder;
    quantityReceived?: Prisma.SortOrder;
};
export type PurchaseReceiptItemAvgOrderByAggregateInput = {
    quantityReceived?: Prisma.SortOrder;
};
export type PurchaseReceiptItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    sku?: Prisma.SortOrder;
    quantityReceived?: Prisma.SortOrder;
};
export type PurchaseReceiptItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    sku?: Prisma.SortOrder;
    quantityReceived?: Prisma.SortOrder;
};
export type PurchaseReceiptItemSumOrderByAggregateInput = {
    quantityReceived?: Prisma.SortOrder;
};
export type PurchaseReceiptItemCreateNestedManyWithoutReceiptInput = {
    create?: Prisma.XOR<Prisma.PurchaseReceiptItemCreateWithoutReceiptInput, Prisma.PurchaseReceiptItemUncheckedCreateWithoutReceiptInput> | Prisma.PurchaseReceiptItemCreateWithoutReceiptInput[] | Prisma.PurchaseReceiptItemUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.PurchaseReceiptItemCreateOrConnectWithoutReceiptInput | Prisma.PurchaseReceiptItemCreateOrConnectWithoutReceiptInput[];
    createMany?: Prisma.PurchaseReceiptItemCreateManyReceiptInputEnvelope;
    connect?: Prisma.PurchaseReceiptItemWhereUniqueInput | Prisma.PurchaseReceiptItemWhereUniqueInput[];
};
export type PurchaseReceiptItemUncheckedCreateNestedManyWithoutReceiptInput = {
    create?: Prisma.XOR<Prisma.PurchaseReceiptItemCreateWithoutReceiptInput, Prisma.PurchaseReceiptItemUncheckedCreateWithoutReceiptInput> | Prisma.PurchaseReceiptItemCreateWithoutReceiptInput[] | Prisma.PurchaseReceiptItemUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.PurchaseReceiptItemCreateOrConnectWithoutReceiptInput | Prisma.PurchaseReceiptItemCreateOrConnectWithoutReceiptInput[];
    createMany?: Prisma.PurchaseReceiptItemCreateManyReceiptInputEnvelope;
    connect?: Prisma.PurchaseReceiptItemWhereUniqueInput | Prisma.PurchaseReceiptItemWhereUniqueInput[];
};
export type PurchaseReceiptItemUpdateManyWithoutReceiptNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseReceiptItemCreateWithoutReceiptInput, Prisma.PurchaseReceiptItemUncheckedCreateWithoutReceiptInput> | Prisma.PurchaseReceiptItemCreateWithoutReceiptInput[] | Prisma.PurchaseReceiptItemUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.PurchaseReceiptItemCreateOrConnectWithoutReceiptInput | Prisma.PurchaseReceiptItemCreateOrConnectWithoutReceiptInput[];
    upsert?: Prisma.PurchaseReceiptItemUpsertWithWhereUniqueWithoutReceiptInput | Prisma.PurchaseReceiptItemUpsertWithWhereUniqueWithoutReceiptInput[];
    createMany?: Prisma.PurchaseReceiptItemCreateManyReceiptInputEnvelope;
    set?: Prisma.PurchaseReceiptItemWhereUniqueInput | Prisma.PurchaseReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseReceiptItemWhereUniqueInput | Prisma.PurchaseReceiptItemWhereUniqueInput[];
    delete?: Prisma.PurchaseReceiptItemWhereUniqueInput | Prisma.PurchaseReceiptItemWhereUniqueInput[];
    connect?: Prisma.PurchaseReceiptItemWhereUniqueInput | Prisma.PurchaseReceiptItemWhereUniqueInput[];
    update?: Prisma.PurchaseReceiptItemUpdateWithWhereUniqueWithoutReceiptInput | Prisma.PurchaseReceiptItemUpdateWithWhereUniqueWithoutReceiptInput[];
    updateMany?: Prisma.PurchaseReceiptItemUpdateManyWithWhereWithoutReceiptInput | Prisma.PurchaseReceiptItemUpdateManyWithWhereWithoutReceiptInput[];
    deleteMany?: Prisma.PurchaseReceiptItemScalarWhereInput | Prisma.PurchaseReceiptItemScalarWhereInput[];
};
export type PurchaseReceiptItemUncheckedUpdateManyWithoutReceiptNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseReceiptItemCreateWithoutReceiptInput, Prisma.PurchaseReceiptItemUncheckedCreateWithoutReceiptInput> | Prisma.PurchaseReceiptItemCreateWithoutReceiptInput[] | Prisma.PurchaseReceiptItemUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.PurchaseReceiptItemCreateOrConnectWithoutReceiptInput | Prisma.PurchaseReceiptItemCreateOrConnectWithoutReceiptInput[];
    upsert?: Prisma.PurchaseReceiptItemUpsertWithWhereUniqueWithoutReceiptInput | Prisma.PurchaseReceiptItemUpsertWithWhereUniqueWithoutReceiptInput[];
    createMany?: Prisma.PurchaseReceiptItemCreateManyReceiptInputEnvelope;
    set?: Prisma.PurchaseReceiptItemWhereUniqueInput | Prisma.PurchaseReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseReceiptItemWhereUniqueInput | Prisma.PurchaseReceiptItemWhereUniqueInput[];
    delete?: Prisma.PurchaseReceiptItemWhereUniqueInput | Prisma.PurchaseReceiptItemWhereUniqueInput[];
    connect?: Prisma.PurchaseReceiptItemWhereUniqueInput | Prisma.PurchaseReceiptItemWhereUniqueInput[];
    update?: Prisma.PurchaseReceiptItemUpdateWithWhereUniqueWithoutReceiptInput | Prisma.PurchaseReceiptItemUpdateWithWhereUniqueWithoutReceiptInput[];
    updateMany?: Prisma.PurchaseReceiptItemUpdateManyWithWhereWithoutReceiptInput | Prisma.PurchaseReceiptItemUpdateManyWithWhereWithoutReceiptInput[];
    deleteMany?: Prisma.PurchaseReceiptItemScalarWhereInput | Prisma.PurchaseReceiptItemScalarWhereInput[];
};
export type PurchaseReceiptItemCreateWithoutReceiptInput = {
    id?: string;
    sku: string;
    quantityReceived: number;
};
export type PurchaseReceiptItemUncheckedCreateWithoutReceiptInput = {
    id?: string;
    sku: string;
    quantityReceived: number;
};
export type PurchaseReceiptItemCreateOrConnectWithoutReceiptInput = {
    where: Prisma.PurchaseReceiptItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseReceiptItemCreateWithoutReceiptInput, Prisma.PurchaseReceiptItemUncheckedCreateWithoutReceiptInput>;
};
export type PurchaseReceiptItemCreateManyReceiptInputEnvelope = {
    data: Prisma.PurchaseReceiptItemCreateManyReceiptInput | Prisma.PurchaseReceiptItemCreateManyReceiptInput[];
    skipDuplicates?: boolean;
};
export type PurchaseReceiptItemUpsertWithWhereUniqueWithoutReceiptInput = {
    where: Prisma.PurchaseReceiptItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseReceiptItemUpdateWithoutReceiptInput, Prisma.PurchaseReceiptItemUncheckedUpdateWithoutReceiptInput>;
    create: Prisma.XOR<Prisma.PurchaseReceiptItemCreateWithoutReceiptInput, Prisma.PurchaseReceiptItemUncheckedCreateWithoutReceiptInput>;
};
export type PurchaseReceiptItemUpdateWithWhereUniqueWithoutReceiptInput = {
    where: Prisma.PurchaseReceiptItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseReceiptItemUpdateWithoutReceiptInput, Prisma.PurchaseReceiptItemUncheckedUpdateWithoutReceiptInput>;
};
export type PurchaseReceiptItemUpdateManyWithWhereWithoutReceiptInput = {
    where: Prisma.PurchaseReceiptItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseReceiptItemUpdateManyMutationInput, Prisma.PurchaseReceiptItemUncheckedUpdateManyWithoutReceiptInput>;
};
export type PurchaseReceiptItemScalarWhereInput = {
    AND?: Prisma.PurchaseReceiptItemScalarWhereInput | Prisma.PurchaseReceiptItemScalarWhereInput[];
    OR?: Prisma.PurchaseReceiptItemScalarWhereInput[];
    NOT?: Prisma.PurchaseReceiptItemScalarWhereInput | Prisma.PurchaseReceiptItemScalarWhereInput[];
    id?: Prisma.StringFilter<"PurchaseReceiptItem"> | string;
    receiptId?: Prisma.StringFilter<"PurchaseReceiptItem"> | string;
    sku?: Prisma.StringFilter<"PurchaseReceiptItem"> | string;
    quantityReceived?: Prisma.IntFilter<"PurchaseReceiptItem"> | number;
};
export type PurchaseReceiptItemCreateManyReceiptInput = {
    id?: string;
    sku: string;
    quantityReceived: number;
};
export type PurchaseReceiptItemUpdateWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityReceived?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PurchaseReceiptItemUncheckedUpdateWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityReceived?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PurchaseReceiptItemUncheckedUpdateManyWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sku?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityReceived?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PurchaseReceiptItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    receiptId?: boolean;
    sku?: boolean;
    quantityReceived?: boolean;
    receipt?: boolean | Prisma.PurchaseReceiptDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseReceiptItem"]>;
export type PurchaseReceiptItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    receiptId?: boolean;
    sku?: boolean;
    quantityReceived?: boolean;
    receipt?: boolean | Prisma.PurchaseReceiptDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseReceiptItem"]>;
export type PurchaseReceiptItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    receiptId?: boolean;
    sku?: boolean;
    quantityReceived?: boolean;
    receipt?: boolean | Prisma.PurchaseReceiptDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseReceiptItem"]>;
export type PurchaseReceiptItemSelectScalar = {
    id?: boolean;
    receiptId?: boolean;
    sku?: boolean;
    quantityReceived?: boolean;
};
export type PurchaseReceiptItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "receiptId" | "sku" | "quantityReceived", ExtArgs["result"]["purchaseReceiptItem"]>;
export type PurchaseReceiptItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receipt?: boolean | Prisma.PurchaseReceiptDefaultArgs<ExtArgs>;
};
export type PurchaseReceiptItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receipt?: boolean | Prisma.PurchaseReceiptDefaultArgs<ExtArgs>;
};
export type PurchaseReceiptItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receipt?: boolean | Prisma.PurchaseReceiptDefaultArgs<ExtArgs>;
};
export type $PurchaseReceiptItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PurchaseReceiptItem";
    objects: {
        receipt: Prisma.$PurchaseReceiptPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        receiptId: string;
        sku: string;
        quantityReceived: number;
    }, ExtArgs["result"]["purchaseReceiptItem"]>;
    composites: {};
};
export type PurchaseReceiptItemGetPayload<S extends boolean | null | undefined | PurchaseReceiptItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload, S>;
export type PurchaseReceiptItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PurchaseReceiptItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PurchaseReceiptItemCountAggregateInputType | true;
};
export interface PurchaseReceiptItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PurchaseReceiptItem'];
        meta: {
            name: 'PurchaseReceiptItem';
        };
    };
    findUnique<T extends PurchaseReceiptItemFindUniqueArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PurchaseReceiptItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PurchaseReceiptItemFindFirstArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PurchaseReceiptItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PurchaseReceiptItemFindManyArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PurchaseReceiptItemCreateArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptItemCreateArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PurchaseReceiptItemCreateManyArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PurchaseReceiptItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PurchaseReceiptItemDeleteArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptItemDeleteArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PurchaseReceiptItemUpdateArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptItemUpdateArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PurchaseReceiptItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, PurchaseReceiptItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PurchaseReceiptItemUpdateManyArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PurchaseReceiptItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PurchaseReceiptItemUpsertArgs>(args: Prisma.SelectSubset<T, PurchaseReceiptItemUpsertArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PurchaseReceiptItemCountArgs>(args?: Prisma.Subset<T, PurchaseReceiptItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PurchaseReceiptItemCountAggregateOutputType> : number>;
    aggregate<T extends PurchaseReceiptItemAggregateArgs>(args: Prisma.Subset<T, PurchaseReceiptItemAggregateArgs>): Prisma.PrismaPromise<GetPurchaseReceiptItemAggregateType<T>>;
    groupBy<T extends PurchaseReceiptItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PurchaseReceiptItemGroupByArgs['orderBy'];
    } : {
        orderBy?: PurchaseReceiptItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PurchaseReceiptItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseReceiptItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PurchaseReceiptItemFieldRefs;
}
export interface Prisma__PurchaseReceiptItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    receipt<T extends Prisma.PurchaseReceiptDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseReceiptDefaultArgs<ExtArgs>>): Prisma.Prisma__PurchaseReceiptClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PurchaseReceiptItemFieldRefs {
    readonly id: Prisma.FieldRef<"PurchaseReceiptItem", 'String'>;
    readonly receiptId: Prisma.FieldRef<"PurchaseReceiptItem", 'String'>;
    readonly sku: Prisma.FieldRef<"PurchaseReceiptItem", 'String'>;
    readonly quantityReceived: Prisma.FieldRef<"PurchaseReceiptItem", 'Int'>;
}
export type PurchaseReceiptItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseReceiptItemWhereUniqueInput;
};
export type PurchaseReceiptItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseReceiptItemWhereUniqueInput;
};
export type PurchaseReceiptItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PurchaseReceiptItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PurchaseReceiptItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PurchaseReceiptItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseReceiptItemCreateInput, Prisma.PurchaseReceiptItemUncheckedCreateInput>;
};
export type PurchaseReceiptItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PurchaseReceiptItemCreateManyInput | Prisma.PurchaseReceiptItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PurchaseReceiptItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptItemOmit<ExtArgs> | null;
    data: Prisma.PurchaseReceiptItemCreateManyInput | Prisma.PurchaseReceiptItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PurchaseReceiptItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PurchaseReceiptItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseReceiptItemUpdateInput, Prisma.PurchaseReceiptItemUncheckedUpdateInput>;
    where: Prisma.PurchaseReceiptItemWhereUniqueInput;
};
export type PurchaseReceiptItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PurchaseReceiptItemUpdateManyMutationInput, Prisma.PurchaseReceiptItemUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseReceiptItemWhereInput;
    limit?: number;
};
export type PurchaseReceiptItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseReceiptItemUpdateManyMutationInput, Prisma.PurchaseReceiptItemUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseReceiptItemWhereInput;
    limit?: number;
    include?: Prisma.PurchaseReceiptItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PurchaseReceiptItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseReceiptItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseReceiptItemCreateInput, Prisma.PurchaseReceiptItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PurchaseReceiptItemUpdateInput, Prisma.PurchaseReceiptItemUncheckedUpdateInput>;
};
export type PurchaseReceiptItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseReceiptItemWhereUniqueInput;
};
export type PurchaseReceiptItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseReceiptItemWhereInput;
    limit?: number;
};
export type PurchaseReceiptItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReceiptItemInclude<ExtArgs> | null;
};
