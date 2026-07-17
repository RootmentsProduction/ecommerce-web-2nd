import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VendorAddressModel = runtime.Types.Result.DefaultSelection<Prisma.$VendorAddressPayload>;
export type AggregateVendorAddress = {
    _count: VendorAddressCountAggregateOutputType | null;
    _min: VendorAddressMinAggregateOutputType | null;
    _max: VendorAddressMaxAggregateOutputType | null;
};
export type VendorAddressMinAggregateOutputType = {
    id: string | null;
    vendorId: string | null;
    type: string | null;
    attention: string | null;
    countryRegion: string | null;
    street1: string | null;
    street2: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    phone: string | null;
    fax: string | null;
};
export type VendorAddressMaxAggregateOutputType = {
    id: string | null;
    vendorId: string | null;
    type: string | null;
    attention: string | null;
    countryRegion: string | null;
    street1: string | null;
    street2: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    phone: string | null;
    fax: string | null;
};
export type VendorAddressCountAggregateOutputType = {
    id: number;
    vendorId: number;
    type: number;
    attention: number;
    countryRegion: number;
    street1: number;
    street2: number;
    city: number;
    state: number;
    zipCode: number;
    phone: number;
    fax: number;
    _all: number;
};
export type VendorAddressMinAggregateInputType = {
    id?: true;
    vendorId?: true;
    type?: true;
    attention?: true;
    countryRegion?: true;
    street1?: true;
    street2?: true;
    city?: true;
    state?: true;
    zipCode?: true;
    phone?: true;
    fax?: true;
};
export type VendorAddressMaxAggregateInputType = {
    id?: true;
    vendorId?: true;
    type?: true;
    attention?: true;
    countryRegion?: true;
    street1?: true;
    street2?: true;
    city?: true;
    state?: true;
    zipCode?: true;
    phone?: true;
    fax?: true;
};
export type VendorAddressCountAggregateInputType = {
    id?: true;
    vendorId?: true;
    type?: true;
    attention?: true;
    countryRegion?: true;
    street1?: true;
    street2?: true;
    city?: true;
    state?: true;
    zipCode?: true;
    phone?: true;
    fax?: true;
    _all?: true;
};
export type VendorAddressAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorAddressWhereInput;
    orderBy?: Prisma.VendorAddressOrderByWithRelationInput | Prisma.VendorAddressOrderByWithRelationInput[];
    cursor?: Prisma.VendorAddressWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VendorAddressCountAggregateInputType;
    _min?: VendorAddressMinAggregateInputType;
    _max?: VendorAddressMaxAggregateInputType;
};
export type GetVendorAddressAggregateType<T extends VendorAddressAggregateArgs> = {
    [P in keyof T & keyof AggregateVendorAddress]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVendorAddress[P]> : Prisma.GetScalarType<T[P], AggregateVendorAddress[P]>;
};
export type VendorAddressGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorAddressWhereInput;
    orderBy?: Prisma.VendorAddressOrderByWithAggregationInput | Prisma.VendorAddressOrderByWithAggregationInput[];
    by: Prisma.VendorAddressScalarFieldEnum[] | Prisma.VendorAddressScalarFieldEnum;
    having?: Prisma.VendorAddressScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VendorAddressCountAggregateInputType | true;
    _min?: VendorAddressMinAggregateInputType;
    _max?: VendorAddressMaxAggregateInputType;
};
export type VendorAddressGroupByOutputType = {
    id: string;
    vendorId: string;
    type: string;
    attention: string | null;
    countryRegion: string | null;
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipCode: string;
    phone: string | null;
    fax: string | null;
    _count: VendorAddressCountAggregateOutputType | null;
    _min: VendorAddressMinAggregateOutputType | null;
    _max: VendorAddressMaxAggregateOutputType | null;
};
export type GetVendorAddressGroupByPayload<T extends VendorAddressGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VendorAddressGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VendorAddressGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VendorAddressGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VendorAddressGroupByOutputType[P]>;
}>>;
export type VendorAddressWhereInput = {
    AND?: Prisma.VendorAddressWhereInput | Prisma.VendorAddressWhereInput[];
    OR?: Prisma.VendorAddressWhereInput[];
    NOT?: Prisma.VendorAddressWhereInput | Prisma.VendorAddressWhereInput[];
    id?: Prisma.StringFilter<"VendorAddress"> | string;
    vendorId?: Prisma.StringFilter<"VendorAddress"> | string;
    type?: Prisma.StringFilter<"VendorAddress"> | string;
    attention?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    countryRegion?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    street1?: Prisma.StringFilter<"VendorAddress"> | string;
    street2?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    city?: Prisma.StringFilter<"VendorAddress"> | string;
    state?: Prisma.StringFilter<"VendorAddress"> | string;
    zipCode?: Prisma.StringFilter<"VendorAddress"> | string;
    phone?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    fax?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    vendor?: Prisma.XOR<Prisma.VendorScalarRelationFilter, Prisma.VendorWhereInput>;
};
export type VendorAddressOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    attention?: Prisma.SortOrderInput | Prisma.SortOrder;
    countryRegion?: Prisma.SortOrderInput | Prisma.SortOrder;
    street1?: Prisma.SortOrder;
    street2?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    fax?: Prisma.SortOrderInput | Prisma.SortOrder;
    vendor?: Prisma.VendorOrderByWithRelationInput;
};
export type VendorAddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VendorAddressWhereInput | Prisma.VendorAddressWhereInput[];
    OR?: Prisma.VendorAddressWhereInput[];
    NOT?: Prisma.VendorAddressWhereInput | Prisma.VendorAddressWhereInput[];
    vendorId?: Prisma.StringFilter<"VendorAddress"> | string;
    type?: Prisma.StringFilter<"VendorAddress"> | string;
    attention?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    countryRegion?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    street1?: Prisma.StringFilter<"VendorAddress"> | string;
    street2?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    city?: Prisma.StringFilter<"VendorAddress"> | string;
    state?: Prisma.StringFilter<"VendorAddress"> | string;
    zipCode?: Prisma.StringFilter<"VendorAddress"> | string;
    phone?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    fax?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    vendor?: Prisma.XOR<Prisma.VendorScalarRelationFilter, Prisma.VendorWhereInput>;
}, "id">;
export type VendorAddressOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    attention?: Prisma.SortOrderInput | Prisma.SortOrder;
    countryRegion?: Prisma.SortOrderInput | Prisma.SortOrder;
    street1?: Prisma.SortOrder;
    street2?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    fax?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.VendorAddressCountOrderByAggregateInput;
    _max?: Prisma.VendorAddressMaxOrderByAggregateInput;
    _min?: Prisma.VendorAddressMinOrderByAggregateInput;
};
export type VendorAddressScalarWhereWithAggregatesInput = {
    AND?: Prisma.VendorAddressScalarWhereWithAggregatesInput | Prisma.VendorAddressScalarWhereWithAggregatesInput[];
    OR?: Prisma.VendorAddressScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VendorAddressScalarWhereWithAggregatesInput | Prisma.VendorAddressScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"VendorAddress"> | string;
    vendorId?: Prisma.StringWithAggregatesFilter<"VendorAddress"> | string;
    type?: Prisma.StringWithAggregatesFilter<"VendorAddress"> | string;
    attention?: Prisma.StringNullableWithAggregatesFilter<"VendorAddress"> | string | null;
    countryRegion?: Prisma.StringNullableWithAggregatesFilter<"VendorAddress"> | string | null;
    street1?: Prisma.StringWithAggregatesFilter<"VendorAddress"> | string;
    street2?: Prisma.StringNullableWithAggregatesFilter<"VendorAddress"> | string | null;
    city?: Prisma.StringWithAggregatesFilter<"VendorAddress"> | string;
    state?: Prisma.StringWithAggregatesFilter<"VendorAddress"> | string;
    zipCode?: Prisma.StringWithAggregatesFilter<"VendorAddress"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"VendorAddress"> | string | null;
    fax?: Prisma.StringNullableWithAggregatesFilter<"VendorAddress"> | string | null;
};
export type VendorAddressCreateInput = {
    id?: string;
    type: string;
    attention?: string | null;
    countryRegion?: string | null;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    phone?: string | null;
    fax?: string | null;
    vendor: Prisma.VendorCreateNestedOneWithoutAddressesInput;
};
export type VendorAddressUncheckedCreateInput = {
    id?: string;
    vendorId: string;
    type: string;
    attention?: string | null;
    countryRegion?: string | null;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    phone?: string | null;
    fax?: string | null;
};
export type VendorAddressUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    attention?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fax?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vendor?: Prisma.VendorUpdateOneRequiredWithoutAddressesNestedInput;
};
export type VendorAddressUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vendorId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    attention?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fax?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorAddressCreateManyInput = {
    id?: string;
    vendorId: string;
    type: string;
    attention?: string | null;
    countryRegion?: string | null;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    phone?: string | null;
    fax?: string | null;
};
export type VendorAddressUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    attention?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fax?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorAddressUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vendorId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    attention?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fax?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorAddressListRelationFilter = {
    every?: Prisma.VendorAddressWhereInput;
    some?: Prisma.VendorAddressWhereInput;
    none?: Prisma.VendorAddressWhereInput;
};
export type VendorAddressOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VendorAddressCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    attention?: Prisma.SortOrder;
    countryRegion?: Prisma.SortOrder;
    street1?: Prisma.SortOrder;
    street2?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    fax?: Prisma.SortOrder;
};
export type VendorAddressMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    attention?: Prisma.SortOrder;
    countryRegion?: Prisma.SortOrder;
    street1?: Prisma.SortOrder;
    street2?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    fax?: Prisma.SortOrder;
};
export type VendorAddressMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    attention?: Prisma.SortOrder;
    countryRegion?: Prisma.SortOrder;
    street1?: Prisma.SortOrder;
    street2?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    fax?: Prisma.SortOrder;
};
export type VendorAddressCreateNestedManyWithoutVendorInput = {
    create?: Prisma.XOR<Prisma.VendorAddressCreateWithoutVendorInput, Prisma.VendorAddressUncheckedCreateWithoutVendorInput> | Prisma.VendorAddressCreateWithoutVendorInput[] | Prisma.VendorAddressUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorAddressCreateOrConnectWithoutVendorInput | Prisma.VendorAddressCreateOrConnectWithoutVendorInput[];
    createMany?: Prisma.VendorAddressCreateManyVendorInputEnvelope;
    connect?: Prisma.VendorAddressWhereUniqueInput | Prisma.VendorAddressWhereUniqueInput[];
};
export type VendorAddressUncheckedCreateNestedManyWithoutVendorInput = {
    create?: Prisma.XOR<Prisma.VendorAddressCreateWithoutVendorInput, Prisma.VendorAddressUncheckedCreateWithoutVendorInput> | Prisma.VendorAddressCreateWithoutVendorInput[] | Prisma.VendorAddressUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorAddressCreateOrConnectWithoutVendorInput | Prisma.VendorAddressCreateOrConnectWithoutVendorInput[];
    createMany?: Prisma.VendorAddressCreateManyVendorInputEnvelope;
    connect?: Prisma.VendorAddressWhereUniqueInput | Prisma.VendorAddressWhereUniqueInput[];
};
export type VendorAddressUpdateManyWithoutVendorNestedInput = {
    create?: Prisma.XOR<Prisma.VendorAddressCreateWithoutVendorInput, Prisma.VendorAddressUncheckedCreateWithoutVendorInput> | Prisma.VendorAddressCreateWithoutVendorInput[] | Prisma.VendorAddressUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorAddressCreateOrConnectWithoutVendorInput | Prisma.VendorAddressCreateOrConnectWithoutVendorInput[];
    upsert?: Prisma.VendorAddressUpsertWithWhereUniqueWithoutVendorInput | Prisma.VendorAddressUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: Prisma.VendorAddressCreateManyVendorInputEnvelope;
    set?: Prisma.VendorAddressWhereUniqueInput | Prisma.VendorAddressWhereUniqueInput[];
    disconnect?: Prisma.VendorAddressWhereUniqueInput | Prisma.VendorAddressWhereUniqueInput[];
    delete?: Prisma.VendorAddressWhereUniqueInput | Prisma.VendorAddressWhereUniqueInput[];
    connect?: Prisma.VendorAddressWhereUniqueInput | Prisma.VendorAddressWhereUniqueInput[];
    update?: Prisma.VendorAddressUpdateWithWhereUniqueWithoutVendorInput | Prisma.VendorAddressUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?: Prisma.VendorAddressUpdateManyWithWhereWithoutVendorInput | Prisma.VendorAddressUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: Prisma.VendorAddressScalarWhereInput | Prisma.VendorAddressScalarWhereInput[];
};
export type VendorAddressUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: Prisma.XOR<Prisma.VendorAddressCreateWithoutVendorInput, Prisma.VendorAddressUncheckedCreateWithoutVendorInput> | Prisma.VendorAddressCreateWithoutVendorInput[] | Prisma.VendorAddressUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorAddressCreateOrConnectWithoutVendorInput | Prisma.VendorAddressCreateOrConnectWithoutVendorInput[];
    upsert?: Prisma.VendorAddressUpsertWithWhereUniqueWithoutVendorInput | Prisma.VendorAddressUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: Prisma.VendorAddressCreateManyVendorInputEnvelope;
    set?: Prisma.VendorAddressWhereUniqueInput | Prisma.VendorAddressWhereUniqueInput[];
    disconnect?: Prisma.VendorAddressWhereUniqueInput | Prisma.VendorAddressWhereUniqueInput[];
    delete?: Prisma.VendorAddressWhereUniqueInput | Prisma.VendorAddressWhereUniqueInput[];
    connect?: Prisma.VendorAddressWhereUniqueInput | Prisma.VendorAddressWhereUniqueInput[];
    update?: Prisma.VendorAddressUpdateWithWhereUniqueWithoutVendorInput | Prisma.VendorAddressUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?: Prisma.VendorAddressUpdateManyWithWhereWithoutVendorInput | Prisma.VendorAddressUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: Prisma.VendorAddressScalarWhereInput | Prisma.VendorAddressScalarWhereInput[];
};
export type VendorAddressCreateWithoutVendorInput = {
    id?: string;
    type: string;
    attention?: string | null;
    countryRegion?: string | null;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    phone?: string | null;
    fax?: string | null;
};
export type VendorAddressUncheckedCreateWithoutVendorInput = {
    id?: string;
    type: string;
    attention?: string | null;
    countryRegion?: string | null;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    phone?: string | null;
    fax?: string | null;
};
export type VendorAddressCreateOrConnectWithoutVendorInput = {
    where: Prisma.VendorAddressWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorAddressCreateWithoutVendorInput, Prisma.VendorAddressUncheckedCreateWithoutVendorInput>;
};
export type VendorAddressCreateManyVendorInputEnvelope = {
    data: Prisma.VendorAddressCreateManyVendorInput | Prisma.VendorAddressCreateManyVendorInput[];
    skipDuplicates?: boolean;
};
export type VendorAddressUpsertWithWhereUniqueWithoutVendorInput = {
    where: Prisma.VendorAddressWhereUniqueInput;
    update: Prisma.XOR<Prisma.VendorAddressUpdateWithoutVendorInput, Prisma.VendorAddressUncheckedUpdateWithoutVendorInput>;
    create: Prisma.XOR<Prisma.VendorAddressCreateWithoutVendorInput, Prisma.VendorAddressUncheckedCreateWithoutVendorInput>;
};
export type VendorAddressUpdateWithWhereUniqueWithoutVendorInput = {
    where: Prisma.VendorAddressWhereUniqueInput;
    data: Prisma.XOR<Prisma.VendorAddressUpdateWithoutVendorInput, Prisma.VendorAddressUncheckedUpdateWithoutVendorInput>;
};
export type VendorAddressUpdateManyWithWhereWithoutVendorInput = {
    where: Prisma.VendorAddressScalarWhereInput;
    data: Prisma.XOR<Prisma.VendorAddressUpdateManyMutationInput, Prisma.VendorAddressUncheckedUpdateManyWithoutVendorInput>;
};
export type VendorAddressScalarWhereInput = {
    AND?: Prisma.VendorAddressScalarWhereInput | Prisma.VendorAddressScalarWhereInput[];
    OR?: Prisma.VendorAddressScalarWhereInput[];
    NOT?: Prisma.VendorAddressScalarWhereInput | Prisma.VendorAddressScalarWhereInput[];
    id?: Prisma.StringFilter<"VendorAddress"> | string;
    vendorId?: Prisma.StringFilter<"VendorAddress"> | string;
    type?: Prisma.StringFilter<"VendorAddress"> | string;
    attention?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    countryRegion?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    street1?: Prisma.StringFilter<"VendorAddress"> | string;
    street2?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    city?: Prisma.StringFilter<"VendorAddress"> | string;
    state?: Prisma.StringFilter<"VendorAddress"> | string;
    zipCode?: Prisma.StringFilter<"VendorAddress"> | string;
    phone?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
    fax?: Prisma.StringNullableFilter<"VendorAddress"> | string | null;
};
export type VendorAddressCreateManyVendorInput = {
    id?: string;
    type: string;
    attention?: string | null;
    countryRegion?: string | null;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    phone?: string | null;
    fax?: string | null;
};
export type VendorAddressUpdateWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    attention?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fax?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorAddressUncheckedUpdateWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    attention?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fax?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorAddressUncheckedUpdateManyWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    attention?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fax?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VendorAddressSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vendorId?: boolean;
    type?: boolean;
    attention?: boolean;
    countryRegion?: boolean;
    street1?: boolean;
    street2?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    phone?: boolean;
    fax?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorAddress"]>;
export type VendorAddressSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vendorId?: boolean;
    type?: boolean;
    attention?: boolean;
    countryRegion?: boolean;
    street1?: boolean;
    street2?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    phone?: boolean;
    fax?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorAddress"]>;
export type VendorAddressSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vendorId?: boolean;
    type?: boolean;
    attention?: boolean;
    countryRegion?: boolean;
    street1?: boolean;
    street2?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    phone?: boolean;
    fax?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorAddress"]>;
export type VendorAddressSelectScalar = {
    id?: boolean;
    vendorId?: boolean;
    type?: boolean;
    attention?: boolean;
    countryRegion?: boolean;
    street1?: boolean;
    street2?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    phone?: boolean;
    fax?: boolean;
};
export type VendorAddressOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "vendorId" | "type" | "attention" | "countryRegion" | "street1" | "street2" | "city" | "state" | "zipCode" | "phone" | "fax", ExtArgs["result"]["vendorAddress"]>;
export type VendorAddressInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
};
export type VendorAddressIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
};
export type VendorAddressIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
};
export type $VendorAddressPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VendorAddress";
    objects: {
        vendor: Prisma.$VendorPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        vendorId: string;
        type: string;
        attention: string | null;
        countryRegion: string | null;
        street1: string;
        street2: string | null;
        city: string;
        state: string;
        zipCode: string;
        phone: string | null;
        fax: string | null;
    }, ExtArgs["result"]["vendorAddress"]>;
    composites: {};
};
export type VendorAddressGetPayload<S extends boolean | null | undefined | VendorAddressDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload, S>;
export type VendorAddressCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VendorAddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VendorAddressCountAggregateInputType | true;
};
export interface VendorAddressDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VendorAddress'];
        meta: {
            name: 'VendorAddress';
        };
    };
    findUnique<T extends VendorAddressFindUniqueArgs>(args: Prisma.SelectSubset<T, VendorAddressFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VendorAddressClient<runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VendorAddressFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VendorAddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorAddressClient<runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VendorAddressFindFirstArgs>(args?: Prisma.SelectSubset<T, VendorAddressFindFirstArgs<ExtArgs>>): Prisma.Prisma__VendorAddressClient<runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VendorAddressFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VendorAddressFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorAddressClient<runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VendorAddressFindManyArgs>(args?: Prisma.SelectSubset<T, VendorAddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VendorAddressCreateArgs>(args: Prisma.SelectSubset<T, VendorAddressCreateArgs<ExtArgs>>): Prisma.Prisma__VendorAddressClient<runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VendorAddressCreateManyArgs>(args?: Prisma.SelectSubset<T, VendorAddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VendorAddressCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VendorAddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VendorAddressDeleteArgs>(args: Prisma.SelectSubset<T, VendorAddressDeleteArgs<ExtArgs>>): Prisma.Prisma__VendorAddressClient<runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VendorAddressUpdateArgs>(args: Prisma.SelectSubset<T, VendorAddressUpdateArgs<ExtArgs>>): Prisma.Prisma__VendorAddressClient<runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VendorAddressDeleteManyArgs>(args?: Prisma.SelectSubset<T, VendorAddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VendorAddressUpdateManyArgs>(args: Prisma.SelectSubset<T, VendorAddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VendorAddressUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VendorAddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VendorAddressUpsertArgs>(args: Prisma.SelectSubset<T, VendorAddressUpsertArgs<ExtArgs>>): Prisma.Prisma__VendorAddressClient<runtime.Types.Result.GetResult<Prisma.$VendorAddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VendorAddressCountArgs>(args?: Prisma.Subset<T, VendorAddressCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VendorAddressCountAggregateOutputType> : number>;
    aggregate<T extends VendorAddressAggregateArgs>(args: Prisma.Subset<T, VendorAddressAggregateArgs>): Prisma.PrismaPromise<GetVendorAddressAggregateType<T>>;
    groupBy<T extends VendorAddressGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VendorAddressGroupByArgs['orderBy'];
    } : {
        orderBy?: VendorAddressGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VendorAddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VendorAddressFieldRefs;
}
export interface Prisma__VendorAddressClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    vendor<T extends Prisma.VendorDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VendorDefaultArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VendorAddressFieldRefs {
    readonly id: Prisma.FieldRef<"VendorAddress", 'String'>;
    readonly vendorId: Prisma.FieldRef<"VendorAddress", 'String'>;
    readonly type: Prisma.FieldRef<"VendorAddress", 'String'>;
    readonly attention: Prisma.FieldRef<"VendorAddress", 'String'>;
    readonly countryRegion: Prisma.FieldRef<"VendorAddress", 'String'>;
    readonly street1: Prisma.FieldRef<"VendorAddress", 'String'>;
    readonly street2: Prisma.FieldRef<"VendorAddress", 'String'>;
    readonly city: Prisma.FieldRef<"VendorAddress", 'String'>;
    readonly state: Prisma.FieldRef<"VendorAddress", 'String'>;
    readonly zipCode: Prisma.FieldRef<"VendorAddress", 'String'>;
    readonly phone: Prisma.FieldRef<"VendorAddress", 'String'>;
    readonly fax: Prisma.FieldRef<"VendorAddress", 'String'>;
}
export type VendorAddressFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelect<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    include?: Prisma.VendorAddressInclude<ExtArgs> | null;
    where: Prisma.VendorAddressWhereUniqueInput;
};
export type VendorAddressFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelect<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    include?: Prisma.VendorAddressInclude<ExtArgs> | null;
    where: Prisma.VendorAddressWhereUniqueInput;
};
export type VendorAddressFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelect<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    include?: Prisma.VendorAddressInclude<ExtArgs> | null;
    where?: Prisma.VendorAddressWhereInput;
    orderBy?: Prisma.VendorAddressOrderByWithRelationInput | Prisma.VendorAddressOrderByWithRelationInput[];
    cursor?: Prisma.VendorAddressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorAddressScalarFieldEnum | Prisma.VendorAddressScalarFieldEnum[];
};
export type VendorAddressFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelect<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    include?: Prisma.VendorAddressInclude<ExtArgs> | null;
    where?: Prisma.VendorAddressWhereInput;
    orderBy?: Prisma.VendorAddressOrderByWithRelationInput | Prisma.VendorAddressOrderByWithRelationInput[];
    cursor?: Prisma.VendorAddressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorAddressScalarFieldEnum | Prisma.VendorAddressScalarFieldEnum[];
};
export type VendorAddressFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelect<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    include?: Prisma.VendorAddressInclude<ExtArgs> | null;
    where?: Prisma.VendorAddressWhereInput;
    orderBy?: Prisma.VendorAddressOrderByWithRelationInput | Prisma.VendorAddressOrderByWithRelationInput[];
    cursor?: Prisma.VendorAddressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorAddressScalarFieldEnum | Prisma.VendorAddressScalarFieldEnum[];
};
export type VendorAddressCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelect<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    include?: Prisma.VendorAddressInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorAddressCreateInput, Prisma.VendorAddressUncheckedCreateInput>;
};
export type VendorAddressCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VendorAddressCreateManyInput | Prisma.VendorAddressCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VendorAddressCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    data: Prisma.VendorAddressCreateManyInput | Prisma.VendorAddressCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.VendorAddressIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type VendorAddressUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelect<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    include?: Prisma.VendorAddressInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorAddressUpdateInput, Prisma.VendorAddressUncheckedUpdateInput>;
    where: Prisma.VendorAddressWhereUniqueInput;
};
export type VendorAddressUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VendorAddressUpdateManyMutationInput, Prisma.VendorAddressUncheckedUpdateManyInput>;
    where?: Prisma.VendorAddressWhereInput;
    limit?: number;
};
export type VendorAddressUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorAddressUpdateManyMutationInput, Prisma.VendorAddressUncheckedUpdateManyInput>;
    where?: Prisma.VendorAddressWhereInput;
    limit?: number;
    include?: Prisma.VendorAddressIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type VendorAddressUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelect<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    include?: Prisma.VendorAddressInclude<ExtArgs> | null;
    where: Prisma.VendorAddressWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorAddressCreateInput, Prisma.VendorAddressUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VendorAddressUpdateInput, Prisma.VendorAddressUncheckedUpdateInput>;
};
export type VendorAddressDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelect<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    include?: Prisma.VendorAddressInclude<ExtArgs> | null;
    where: Prisma.VendorAddressWhereUniqueInput;
};
export type VendorAddressDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorAddressWhereInput;
    limit?: number;
};
export type VendorAddressDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorAddressSelect<ExtArgs> | null;
    omit?: Prisma.VendorAddressOmit<ExtArgs> | null;
    include?: Prisma.VendorAddressInclude<ExtArgs> | null;
};
