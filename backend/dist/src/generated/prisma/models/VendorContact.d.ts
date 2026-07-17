import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VendorContactModel = runtime.Types.Result.DefaultSelection<Prisma.$VendorContactPayload>;
export type AggregateVendorContact = {
    _count: VendorContactCountAggregateOutputType | null;
    _min: VendorContactMinAggregateOutputType | null;
    _max: VendorContactMaxAggregateOutputType | null;
};
export type VendorContactMinAggregateOutputType = {
    id: string | null;
    vendorId: string | null;
    salutation: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    workPhone: string | null;
    mobile: string | null;
};
export type VendorContactMaxAggregateOutputType = {
    id: string | null;
    vendorId: string | null;
    salutation: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    workPhone: string | null;
    mobile: string | null;
};
export type VendorContactCountAggregateOutputType = {
    id: number;
    vendorId: number;
    salutation: number;
    firstName: number;
    lastName: number;
    email: number;
    workPhone: number;
    mobile: number;
    _all: number;
};
export type VendorContactMinAggregateInputType = {
    id?: true;
    vendorId?: true;
    salutation?: true;
    firstName?: true;
    lastName?: true;
    email?: true;
    workPhone?: true;
    mobile?: true;
};
export type VendorContactMaxAggregateInputType = {
    id?: true;
    vendorId?: true;
    salutation?: true;
    firstName?: true;
    lastName?: true;
    email?: true;
    workPhone?: true;
    mobile?: true;
};
export type VendorContactCountAggregateInputType = {
    id?: true;
    vendorId?: true;
    salutation?: true;
    firstName?: true;
    lastName?: true;
    email?: true;
    workPhone?: true;
    mobile?: true;
    _all?: true;
};
export type VendorContactAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorContactWhereInput;
    orderBy?: Prisma.VendorContactOrderByWithRelationInput | Prisma.VendorContactOrderByWithRelationInput[];
    cursor?: Prisma.VendorContactWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VendorContactCountAggregateInputType;
    _min?: VendorContactMinAggregateInputType;
    _max?: VendorContactMaxAggregateInputType;
};
export type GetVendorContactAggregateType<T extends VendorContactAggregateArgs> = {
    [P in keyof T & keyof AggregateVendorContact]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVendorContact[P]> : Prisma.GetScalarType<T[P], AggregateVendorContact[P]>;
};
export type VendorContactGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorContactWhereInput;
    orderBy?: Prisma.VendorContactOrderByWithAggregationInput | Prisma.VendorContactOrderByWithAggregationInput[];
    by: Prisma.VendorContactScalarFieldEnum[] | Prisma.VendorContactScalarFieldEnum;
    having?: Prisma.VendorContactScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VendorContactCountAggregateInputType | true;
    _min?: VendorContactMinAggregateInputType;
    _max?: VendorContactMaxAggregateInputType;
};
export type VendorContactGroupByOutputType = {
    id: string;
    vendorId: string;
    salutation: string | null;
    firstName: string;
    lastName: string;
    email: string;
    workPhone: string | null;
    mobile: string | null;
    _count: VendorContactCountAggregateOutputType | null;
    _min: VendorContactMinAggregateOutputType | null;
    _max: VendorContactMaxAggregateOutputType | null;
};
export type GetVendorContactGroupByPayload<T extends VendorContactGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VendorContactGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VendorContactGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VendorContactGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VendorContactGroupByOutputType[P]>;
}>>;
export type VendorContactWhereInput = {
    AND?: Prisma.VendorContactWhereInput | Prisma.VendorContactWhereInput[];
    OR?: Prisma.VendorContactWhereInput[];
    NOT?: Prisma.VendorContactWhereInput | Prisma.VendorContactWhereInput[];
    id?: Prisma.StringFilter<"VendorContact"> | string;
    vendorId?: Prisma.StringFilter<"VendorContact"> | string;
    salutation?: Prisma.StringNullableFilter<"VendorContact"> | string | null;
    firstName?: Prisma.StringFilter<"VendorContact"> | string;
    lastName?: Prisma.StringFilter<"VendorContact"> | string;
    email?: Prisma.StringFilter<"VendorContact"> | string;
    workPhone?: Prisma.StringNullableFilter<"VendorContact"> | string | null;
    mobile?: Prisma.StringNullableFilter<"VendorContact"> | string | null;
    vendor?: Prisma.XOR<Prisma.VendorScalarRelationFilter, Prisma.VendorWhereInput>;
};
export type VendorContactOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    salutation?: Prisma.SortOrderInput | Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    workPhone?: Prisma.SortOrderInput | Prisma.SortOrder;
    mobile?: Prisma.SortOrderInput | Prisma.SortOrder;
    vendor?: Prisma.VendorOrderByWithRelationInput;
};
export type VendorContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VendorContactWhereInput | Prisma.VendorContactWhereInput[];
    OR?: Prisma.VendorContactWhereInput[];
    NOT?: Prisma.VendorContactWhereInput | Prisma.VendorContactWhereInput[];
    vendorId?: Prisma.StringFilter<"VendorContact"> | string;
    salutation?: Prisma.StringNullableFilter<"VendorContact"> | string | null;
    firstName?: Prisma.StringFilter<"VendorContact"> | string;
    lastName?: Prisma.StringFilter<"VendorContact"> | string;
    email?: Prisma.StringFilter<"VendorContact"> | string;
    workPhone?: Prisma.StringNullableFilter<"VendorContact"> | string | null;
    mobile?: Prisma.StringNullableFilter<"VendorContact"> | string | null;
    vendor?: Prisma.XOR<Prisma.VendorScalarRelationFilter, Prisma.VendorWhereInput>;
}, "id">;
export type VendorContactOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    salutation?: Prisma.SortOrderInput | Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    workPhone?: Prisma.SortOrderInput | Prisma.SortOrder;
    mobile?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.VendorContactCountOrderByAggregateInput;
    _max?: Prisma.VendorContactMaxOrderByAggregateInput;
    _min?: Prisma.VendorContactMinOrderByAggregateInput;
};
export type VendorContactScalarWhereWithAggregatesInput = {
    AND?: Prisma.VendorContactScalarWhereWithAggregatesInput | Prisma.VendorContactScalarWhereWithAggregatesInput[];
    OR?: Prisma.VendorContactScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VendorContactScalarWhereWithAggregatesInput | Prisma.VendorContactScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"VendorContact"> | string;
    vendorId?: Prisma.StringWithAggregatesFilter<"VendorContact"> | string;
    salutation?: Prisma.StringNullableWithAggregatesFilter<"VendorContact"> | string | null;
    firstName?: Prisma.StringWithAggregatesFilter<"VendorContact"> | string;
    lastName?: Prisma.StringWithAggregatesFilter<"VendorContact"> | string;
    email?: Prisma.StringWithAggregatesFilter<"VendorContact"> | string;
    workPhone?: Prisma.StringNullableWithAggregatesFilter<"VendorContact"> | string | null;
    mobile?: Prisma.StringNullableWithAggregatesFilter<"VendorContact"> | string | null;
};
export type VendorContactCreateInput = {
    id?: string;
    salutation?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    workPhone?: string | null;
    mobile?: string | null;
    vendor: Prisma.VendorCreateNestedOneWithoutContactsInput;
};
export type VendorContactUncheckedCreateInput = {
    id?: string;
    vendorId: string;
    salutation?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    workPhone?: string | null;
    mobile?: string | null;
};
export type VendorContactUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    salutation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    workPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mobile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vendor?: Prisma.VendorUpdateOneRequiredWithoutContactsNestedInput;
};
export type VendorContactUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vendorId?: Prisma.StringFieldUpdateOperationsInput | string;
    salutation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    workPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mobile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorContactCreateManyInput = {
    id?: string;
    vendorId: string;
    salutation?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    workPhone?: string | null;
    mobile?: string | null;
};
export type VendorContactUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    salutation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    workPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mobile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorContactUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vendorId?: Prisma.StringFieldUpdateOperationsInput | string;
    salutation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    workPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mobile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorContactListRelationFilter = {
    every?: Prisma.VendorContactWhereInput;
    some?: Prisma.VendorContactWhereInput;
    none?: Prisma.VendorContactWhereInput;
};
export type VendorContactOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VendorContactCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    salutation?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    workPhone?: Prisma.SortOrder;
    mobile?: Prisma.SortOrder;
};
export type VendorContactMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    salutation?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    workPhone?: Prisma.SortOrder;
    mobile?: Prisma.SortOrder;
};
export type VendorContactMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    salutation?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    workPhone?: Prisma.SortOrder;
    mobile?: Prisma.SortOrder;
};
export type VendorContactCreateNestedManyWithoutVendorInput = {
    create?: Prisma.XOR<Prisma.VendorContactCreateWithoutVendorInput, Prisma.VendorContactUncheckedCreateWithoutVendorInput> | Prisma.VendorContactCreateWithoutVendorInput[] | Prisma.VendorContactUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorContactCreateOrConnectWithoutVendorInput | Prisma.VendorContactCreateOrConnectWithoutVendorInput[];
    createMany?: Prisma.VendorContactCreateManyVendorInputEnvelope;
    connect?: Prisma.VendorContactWhereUniqueInput | Prisma.VendorContactWhereUniqueInput[];
};
export type VendorContactUncheckedCreateNestedManyWithoutVendorInput = {
    create?: Prisma.XOR<Prisma.VendorContactCreateWithoutVendorInput, Prisma.VendorContactUncheckedCreateWithoutVendorInput> | Prisma.VendorContactCreateWithoutVendorInput[] | Prisma.VendorContactUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorContactCreateOrConnectWithoutVendorInput | Prisma.VendorContactCreateOrConnectWithoutVendorInput[];
    createMany?: Prisma.VendorContactCreateManyVendorInputEnvelope;
    connect?: Prisma.VendorContactWhereUniqueInput | Prisma.VendorContactWhereUniqueInput[];
};
export type VendorContactUpdateManyWithoutVendorNestedInput = {
    create?: Prisma.XOR<Prisma.VendorContactCreateWithoutVendorInput, Prisma.VendorContactUncheckedCreateWithoutVendorInput> | Prisma.VendorContactCreateWithoutVendorInput[] | Prisma.VendorContactUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorContactCreateOrConnectWithoutVendorInput | Prisma.VendorContactCreateOrConnectWithoutVendorInput[];
    upsert?: Prisma.VendorContactUpsertWithWhereUniqueWithoutVendorInput | Prisma.VendorContactUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: Prisma.VendorContactCreateManyVendorInputEnvelope;
    set?: Prisma.VendorContactWhereUniqueInput | Prisma.VendorContactWhereUniqueInput[];
    disconnect?: Prisma.VendorContactWhereUniqueInput | Prisma.VendorContactWhereUniqueInput[];
    delete?: Prisma.VendorContactWhereUniqueInput | Prisma.VendorContactWhereUniqueInput[];
    connect?: Prisma.VendorContactWhereUniqueInput | Prisma.VendorContactWhereUniqueInput[];
    update?: Prisma.VendorContactUpdateWithWhereUniqueWithoutVendorInput | Prisma.VendorContactUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?: Prisma.VendorContactUpdateManyWithWhereWithoutVendorInput | Prisma.VendorContactUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: Prisma.VendorContactScalarWhereInput | Prisma.VendorContactScalarWhereInput[];
};
export type VendorContactUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: Prisma.XOR<Prisma.VendorContactCreateWithoutVendorInput, Prisma.VendorContactUncheckedCreateWithoutVendorInput> | Prisma.VendorContactCreateWithoutVendorInput[] | Prisma.VendorContactUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorContactCreateOrConnectWithoutVendorInput | Prisma.VendorContactCreateOrConnectWithoutVendorInput[];
    upsert?: Prisma.VendorContactUpsertWithWhereUniqueWithoutVendorInput | Prisma.VendorContactUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: Prisma.VendorContactCreateManyVendorInputEnvelope;
    set?: Prisma.VendorContactWhereUniqueInput | Prisma.VendorContactWhereUniqueInput[];
    disconnect?: Prisma.VendorContactWhereUniqueInput | Prisma.VendorContactWhereUniqueInput[];
    delete?: Prisma.VendorContactWhereUniqueInput | Prisma.VendorContactWhereUniqueInput[];
    connect?: Prisma.VendorContactWhereUniqueInput | Prisma.VendorContactWhereUniqueInput[];
    update?: Prisma.VendorContactUpdateWithWhereUniqueWithoutVendorInput | Prisma.VendorContactUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?: Prisma.VendorContactUpdateManyWithWhereWithoutVendorInput | Prisma.VendorContactUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: Prisma.VendorContactScalarWhereInput | Prisma.VendorContactScalarWhereInput[];
};
export type VendorContactCreateWithoutVendorInput = {
    id?: string;
    salutation?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    workPhone?: string | null;
    mobile?: string | null;
};
export type VendorContactUncheckedCreateWithoutVendorInput = {
    id?: string;
    salutation?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    workPhone?: string | null;
    mobile?: string | null;
};
export type VendorContactCreateOrConnectWithoutVendorInput = {
    where: Prisma.VendorContactWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorContactCreateWithoutVendorInput, Prisma.VendorContactUncheckedCreateWithoutVendorInput>;
};
export type VendorContactCreateManyVendorInputEnvelope = {
    data: Prisma.VendorContactCreateManyVendorInput | Prisma.VendorContactCreateManyVendorInput[];
    skipDuplicates?: boolean;
};
export type VendorContactUpsertWithWhereUniqueWithoutVendorInput = {
    where: Prisma.VendorContactWhereUniqueInput;
    update: Prisma.XOR<Prisma.VendorContactUpdateWithoutVendorInput, Prisma.VendorContactUncheckedUpdateWithoutVendorInput>;
    create: Prisma.XOR<Prisma.VendorContactCreateWithoutVendorInput, Prisma.VendorContactUncheckedCreateWithoutVendorInput>;
};
export type VendorContactUpdateWithWhereUniqueWithoutVendorInput = {
    where: Prisma.VendorContactWhereUniqueInput;
    data: Prisma.XOR<Prisma.VendorContactUpdateWithoutVendorInput, Prisma.VendorContactUncheckedUpdateWithoutVendorInput>;
};
export type VendorContactUpdateManyWithWhereWithoutVendorInput = {
    where: Prisma.VendorContactScalarWhereInput;
    data: Prisma.XOR<Prisma.VendorContactUpdateManyMutationInput, Prisma.VendorContactUncheckedUpdateManyWithoutVendorInput>;
};
export type VendorContactScalarWhereInput = {
    AND?: Prisma.VendorContactScalarWhereInput | Prisma.VendorContactScalarWhereInput[];
    OR?: Prisma.VendorContactScalarWhereInput[];
    NOT?: Prisma.VendorContactScalarWhereInput | Prisma.VendorContactScalarWhereInput[];
    id?: Prisma.StringFilter<"VendorContact"> | string;
    vendorId?: Prisma.StringFilter<"VendorContact"> | string;
    salutation?: Prisma.StringNullableFilter<"VendorContact"> | string | null;
    firstName?: Prisma.StringFilter<"VendorContact"> | string;
    lastName?: Prisma.StringFilter<"VendorContact"> | string;
    email?: Prisma.StringFilter<"VendorContact"> | string;
    workPhone?: Prisma.StringNullableFilter<"VendorContact"> | string | null;
    mobile?: Prisma.StringNullableFilter<"VendorContact"> | string | null;
};
export type VendorContactCreateManyVendorInput = {
    id?: string;
    salutation?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    workPhone?: string | null;
    mobile?: string | null;
};
export type VendorContactUpdateWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    salutation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    workPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mobile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorContactUncheckedUpdateWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    salutation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    workPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mobile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorContactUncheckedUpdateManyWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    salutation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    workPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mobile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorContactSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vendorId?: boolean;
    salutation?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    workPhone?: boolean;
    mobile?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorContact"]>;
export type VendorContactSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vendorId?: boolean;
    salutation?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    workPhone?: boolean;
    mobile?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorContact"]>;
export type VendorContactSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vendorId?: boolean;
    salutation?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    workPhone?: boolean;
    mobile?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorContact"]>;
export type VendorContactSelectScalar = {
    id?: boolean;
    vendorId?: boolean;
    salutation?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    workPhone?: boolean;
    mobile?: boolean;
};
export type VendorContactOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "vendorId" | "salutation" | "firstName" | "lastName" | "email" | "workPhone" | "mobile", ExtArgs["result"]["vendorContact"]>;
export type VendorContactInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
};
export type VendorContactIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
};
export type VendorContactIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
};
export type $VendorContactPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VendorContact";
    objects: {
        vendor: Prisma.$VendorPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        vendorId: string;
        salutation: string | null;
        firstName: string;
        lastName: string;
        email: string;
        workPhone: string | null;
        mobile: string | null;
    }, ExtArgs["result"]["vendorContact"]>;
    composites: {};
};
export type VendorContactGetPayload<S extends boolean | null | undefined | VendorContactDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VendorContactPayload, S>;
export type VendorContactCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VendorContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VendorContactCountAggregateInputType | true;
};
export interface VendorContactDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VendorContact'];
        meta: {
            name: 'VendorContact';
        };
    };
    findUnique<T extends VendorContactFindUniqueArgs>(args: Prisma.SelectSubset<T, VendorContactFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VendorContactClient<runtime.Types.Result.GetResult<Prisma.$VendorContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VendorContactFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VendorContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorContactClient<runtime.Types.Result.GetResult<Prisma.$VendorContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VendorContactFindFirstArgs>(args?: Prisma.SelectSubset<T, VendorContactFindFirstArgs<ExtArgs>>): Prisma.Prisma__VendorContactClient<runtime.Types.Result.GetResult<Prisma.$VendorContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VendorContactFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VendorContactFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorContactClient<runtime.Types.Result.GetResult<Prisma.$VendorContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VendorContactFindManyArgs>(args?: Prisma.SelectSubset<T, VendorContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VendorContactCreateArgs>(args: Prisma.SelectSubset<T, VendorContactCreateArgs<ExtArgs>>): Prisma.Prisma__VendorContactClient<runtime.Types.Result.GetResult<Prisma.$VendorContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VendorContactCreateManyArgs>(args?: Prisma.SelectSubset<T, VendorContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VendorContactCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VendorContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VendorContactDeleteArgs>(args: Prisma.SelectSubset<T, VendorContactDeleteArgs<ExtArgs>>): Prisma.Prisma__VendorContactClient<runtime.Types.Result.GetResult<Prisma.$VendorContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VendorContactUpdateArgs>(args: Prisma.SelectSubset<T, VendorContactUpdateArgs<ExtArgs>>): Prisma.Prisma__VendorContactClient<runtime.Types.Result.GetResult<Prisma.$VendorContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VendorContactDeleteManyArgs>(args?: Prisma.SelectSubset<T, VendorContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VendorContactUpdateManyArgs>(args: Prisma.SelectSubset<T, VendorContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VendorContactUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VendorContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VendorContactUpsertArgs>(args: Prisma.SelectSubset<T, VendorContactUpsertArgs<ExtArgs>>): Prisma.Prisma__VendorContactClient<runtime.Types.Result.GetResult<Prisma.$VendorContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VendorContactCountArgs>(args?: Prisma.Subset<T, VendorContactCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VendorContactCountAggregateOutputType> : number>;
    aggregate<T extends VendorContactAggregateArgs>(args: Prisma.Subset<T, VendorContactAggregateArgs>): Prisma.PrismaPromise<GetVendorContactAggregateType<T>>;
    groupBy<T extends VendorContactGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VendorContactGroupByArgs['orderBy'];
    } : {
        orderBy?: VendorContactGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VendorContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VendorContactFieldRefs;
}
export interface Prisma__VendorContactClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    vendor<T extends Prisma.VendorDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VendorDefaultArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VendorContactFieldRefs {
    readonly id: Prisma.FieldRef<"VendorContact", 'String'>;
    readonly vendorId: Prisma.FieldRef<"VendorContact", 'String'>;
    readonly salutation: Prisma.FieldRef<"VendorContact", 'String'>;
    readonly firstName: Prisma.FieldRef<"VendorContact", 'String'>;
    readonly lastName: Prisma.FieldRef<"VendorContact", 'String'>;
    readonly email: Prisma.FieldRef<"VendorContact", 'String'>;
    readonly workPhone: Prisma.FieldRef<"VendorContact", 'String'>;
    readonly mobile: Prisma.FieldRef<"VendorContact", 'String'>;
}
export type VendorContactFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelect<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    include?: Prisma.VendorContactInclude<ExtArgs> | null;
    where: Prisma.VendorContactWhereUniqueInput;
};
export type VendorContactFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelect<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    include?: Prisma.VendorContactInclude<ExtArgs> | null;
    where: Prisma.VendorContactWhereUniqueInput;
};
export type VendorContactFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelect<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    include?: Prisma.VendorContactInclude<ExtArgs> | null;
    where?: Prisma.VendorContactWhereInput;
    orderBy?: Prisma.VendorContactOrderByWithRelationInput | Prisma.VendorContactOrderByWithRelationInput[];
    cursor?: Prisma.VendorContactWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorContactScalarFieldEnum | Prisma.VendorContactScalarFieldEnum[];
};
export type VendorContactFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelect<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    include?: Prisma.VendorContactInclude<ExtArgs> | null;
    where?: Prisma.VendorContactWhereInput;
    orderBy?: Prisma.VendorContactOrderByWithRelationInput | Prisma.VendorContactOrderByWithRelationInput[];
    cursor?: Prisma.VendorContactWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorContactScalarFieldEnum | Prisma.VendorContactScalarFieldEnum[];
};
export type VendorContactFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelect<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    include?: Prisma.VendorContactInclude<ExtArgs> | null;
    where?: Prisma.VendorContactWhereInput;
    orderBy?: Prisma.VendorContactOrderByWithRelationInput | Prisma.VendorContactOrderByWithRelationInput[];
    cursor?: Prisma.VendorContactWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorContactScalarFieldEnum | Prisma.VendorContactScalarFieldEnum[];
};
export type VendorContactCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelect<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    include?: Prisma.VendorContactInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorContactCreateInput, Prisma.VendorContactUncheckedCreateInput>;
};
export type VendorContactCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VendorContactCreateManyInput | Prisma.VendorContactCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VendorContactCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    data: Prisma.VendorContactCreateManyInput | Prisma.VendorContactCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.VendorContactIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type VendorContactUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelect<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    include?: Prisma.VendorContactInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorContactUpdateInput, Prisma.VendorContactUncheckedUpdateInput>;
    where: Prisma.VendorContactWhereUniqueInput;
};
export type VendorContactUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VendorContactUpdateManyMutationInput, Prisma.VendorContactUncheckedUpdateManyInput>;
    where?: Prisma.VendorContactWhereInput;
    limit?: number;
};
export type VendorContactUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorContactUpdateManyMutationInput, Prisma.VendorContactUncheckedUpdateManyInput>;
    where?: Prisma.VendorContactWhereInput;
    limit?: number;
    include?: Prisma.VendorContactIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type VendorContactUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelect<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    include?: Prisma.VendorContactInclude<ExtArgs> | null;
    where: Prisma.VendorContactWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorContactCreateInput, Prisma.VendorContactUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VendorContactUpdateInput, Prisma.VendorContactUncheckedUpdateInput>;
};
export type VendorContactDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelect<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    include?: Prisma.VendorContactInclude<ExtArgs> | null;
    where: Prisma.VendorContactWhereUniqueInput;
};
export type VendorContactDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorContactWhereInput;
    limit?: number;
};
export type VendorContactDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorContactSelect<ExtArgs> | null;
    omit?: Prisma.VendorContactOmit<ExtArgs> | null;
    include?: Prisma.VendorContactInclude<ExtArgs> | null;
};
