import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CustomerAddressModel = runtime.Types.Result.DefaultSelection<Prisma.$CustomerAddressPayload>;
export type AggregateCustomerAddress = {
    _count: CustomerAddressCountAggregateOutputType | null;
    _min: CustomerAddressMinAggregateOutputType | null;
    _max: CustomerAddressMaxAggregateOutputType | null;
};
export type CustomerAddressMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: string | null;
    street1: string | null;
    street2: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    country: string | null;
    phone: string | null;
    createdAt: Date | null;
};
export type CustomerAddressMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: string | null;
    street1: string | null;
    street2: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    country: string | null;
    phone: string | null;
    createdAt: Date | null;
};
export type CustomerAddressCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    street1: number;
    street2: number;
    city: number;
    state: number;
    zipCode: number;
    country: number;
    phone: number;
    createdAt: number;
    _all: number;
};
export type CustomerAddressMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    street1?: true;
    street2?: true;
    city?: true;
    state?: true;
    zipCode?: true;
    country?: true;
    phone?: true;
    createdAt?: true;
};
export type CustomerAddressMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    street1?: true;
    street2?: true;
    city?: true;
    state?: true;
    zipCode?: true;
    country?: true;
    phone?: true;
    createdAt?: true;
};
export type CustomerAddressCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    street1?: true;
    street2?: true;
    city?: true;
    state?: true;
    zipCode?: true;
    country?: true;
    phone?: true;
    createdAt?: true;
    _all?: true;
};
export type CustomerAddressAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerAddressWhereInput;
    orderBy?: Prisma.CustomerAddressOrderByWithRelationInput | Prisma.CustomerAddressOrderByWithRelationInput[];
    cursor?: Prisma.CustomerAddressWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CustomerAddressCountAggregateInputType;
    _min?: CustomerAddressMinAggregateInputType;
    _max?: CustomerAddressMaxAggregateInputType;
};
export type GetCustomerAddressAggregateType<T extends CustomerAddressAggregateArgs> = {
    [P in keyof T & keyof AggregateCustomerAddress]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCustomerAddress[P]> : Prisma.GetScalarType<T[P], AggregateCustomerAddress[P]>;
};
export type CustomerAddressGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerAddressWhereInput;
    orderBy?: Prisma.CustomerAddressOrderByWithAggregationInput | Prisma.CustomerAddressOrderByWithAggregationInput[];
    by: Prisma.CustomerAddressScalarFieldEnum[] | Prisma.CustomerAddressScalarFieldEnum;
    having?: Prisma.CustomerAddressScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CustomerAddressCountAggregateInputType | true;
    _min?: CustomerAddressMinAggregateInputType;
    _max?: CustomerAddressMaxAggregateInputType;
};
export type CustomerAddressGroupByOutputType = {
    id: string;
    userId: string;
    type: string;
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string | null;
    createdAt: Date;
    _count: CustomerAddressCountAggregateOutputType | null;
    _min: CustomerAddressMinAggregateOutputType | null;
    _max: CustomerAddressMaxAggregateOutputType | null;
};
export type GetCustomerAddressGroupByPayload<T extends CustomerAddressGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CustomerAddressGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CustomerAddressGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CustomerAddressGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CustomerAddressGroupByOutputType[P]>;
}>>;
export type CustomerAddressWhereInput = {
    AND?: Prisma.CustomerAddressWhereInput | Prisma.CustomerAddressWhereInput[];
    OR?: Prisma.CustomerAddressWhereInput[];
    NOT?: Prisma.CustomerAddressWhereInput | Prisma.CustomerAddressWhereInput[];
    id?: Prisma.StringFilter<"CustomerAddress"> | string;
    userId?: Prisma.StringFilter<"CustomerAddress"> | string;
    type?: Prisma.StringFilter<"CustomerAddress"> | string;
    street1?: Prisma.StringFilter<"CustomerAddress"> | string;
    street2?: Prisma.StringNullableFilter<"CustomerAddress"> | string | null;
    city?: Prisma.StringFilter<"CustomerAddress"> | string;
    state?: Prisma.StringFilter<"CustomerAddress"> | string;
    zipCode?: Prisma.StringFilter<"CustomerAddress"> | string;
    country?: Prisma.StringFilter<"CustomerAddress"> | string;
    phone?: Prisma.StringNullableFilter<"CustomerAddress"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CustomerAddress"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type CustomerAddressOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    street1?: Prisma.SortOrder;
    street2?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type CustomerAddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CustomerAddressWhereInput | Prisma.CustomerAddressWhereInput[];
    OR?: Prisma.CustomerAddressWhereInput[];
    NOT?: Prisma.CustomerAddressWhereInput | Prisma.CustomerAddressWhereInput[];
    userId?: Prisma.StringFilter<"CustomerAddress"> | string;
    type?: Prisma.StringFilter<"CustomerAddress"> | string;
    street1?: Prisma.StringFilter<"CustomerAddress"> | string;
    street2?: Prisma.StringNullableFilter<"CustomerAddress"> | string | null;
    city?: Prisma.StringFilter<"CustomerAddress"> | string;
    state?: Prisma.StringFilter<"CustomerAddress"> | string;
    zipCode?: Prisma.StringFilter<"CustomerAddress"> | string;
    country?: Prisma.StringFilter<"CustomerAddress"> | string;
    phone?: Prisma.StringNullableFilter<"CustomerAddress"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CustomerAddress"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type CustomerAddressOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    street1?: Prisma.SortOrder;
    street2?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CustomerAddressCountOrderByAggregateInput;
    _max?: Prisma.CustomerAddressMaxOrderByAggregateInput;
    _min?: Prisma.CustomerAddressMinOrderByAggregateInput;
};
export type CustomerAddressScalarWhereWithAggregatesInput = {
    AND?: Prisma.CustomerAddressScalarWhereWithAggregatesInput | Prisma.CustomerAddressScalarWhereWithAggregatesInput[];
    OR?: Prisma.CustomerAddressScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CustomerAddressScalarWhereWithAggregatesInput | Prisma.CustomerAddressScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CustomerAddress"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"CustomerAddress"> | string;
    type?: Prisma.StringWithAggregatesFilter<"CustomerAddress"> | string;
    street1?: Prisma.StringWithAggregatesFilter<"CustomerAddress"> | string;
    street2?: Prisma.StringNullableWithAggregatesFilter<"CustomerAddress"> | string | null;
    city?: Prisma.StringWithAggregatesFilter<"CustomerAddress"> | string;
    state?: Prisma.StringWithAggregatesFilter<"CustomerAddress"> | string;
    zipCode?: Prisma.StringWithAggregatesFilter<"CustomerAddress"> | string;
    country?: Prisma.StringWithAggregatesFilter<"CustomerAddress"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"CustomerAddress"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CustomerAddress"> | Date | string;
};
export type CustomerAddressCreateInput = {
    id?: string;
    type: string;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    phone?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAddressesInput;
};
export type CustomerAddressUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: string;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    phone?: string | null;
    createdAt?: Date | string;
};
export type CustomerAddressUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAddressesNestedInput;
};
export type CustomerAddressUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerAddressCreateManyInput = {
    id?: string;
    userId: string;
    type: string;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    phone?: string | null;
    createdAt?: Date | string;
};
export type CustomerAddressUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerAddressUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerAddressListRelationFilter = {
    every?: Prisma.CustomerAddressWhereInput;
    some?: Prisma.CustomerAddressWhereInput;
    none?: Prisma.CustomerAddressWhereInput;
};
export type CustomerAddressOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CustomerAddressCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    street1?: Prisma.SortOrder;
    street2?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CustomerAddressMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    street1?: Prisma.SortOrder;
    street2?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CustomerAddressMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    street1?: Prisma.SortOrder;
    street2?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CustomerAddressCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CustomerAddressCreateWithoutUserInput, Prisma.CustomerAddressUncheckedCreateWithoutUserInput> | Prisma.CustomerAddressCreateWithoutUserInput[] | Prisma.CustomerAddressUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CustomerAddressCreateOrConnectWithoutUserInput | Prisma.CustomerAddressCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CustomerAddressCreateManyUserInputEnvelope;
    connect?: Prisma.CustomerAddressWhereUniqueInput | Prisma.CustomerAddressWhereUniqueInput[];
};
export type CustomerAddressUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CustomerAddressCreateWithoutUserInput, Prisma.CustomerAddressUncheckedCreateWithoutUserInput> | Prisma.CustomerAddressCreateWithoutUserInput[] | Prisma.CustomerAddressUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CustomerAddressCreateOrConnectWithoutUserInput | Prisma.CustomerAddressCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CustomerAddressCreateManyUserInputEnvelope;
    connect?: Prisma.CustomerAddressWhereUniqueInput | Prisma.CustomerAddressWhereUniqueInput[];
};
export type CustomerAddressUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CustomerAddressCreateWithoutUserInput, Prisma.CustomerAddressUncheckedCreateWithoutUserInput> | Prisma.CustomerAddressCreateWithoutUserInput[] | Prisma.CustomerAddressUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CustomerAddressCreateOrConnectWithoutUserInput | Prisma.CustomerAddressCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CustomerAddressUpsertWithWhereUniqueWithoutUserInput | Prisma.CustomerAddressUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CustomerAddressCreateManyUserInputEnvelope;
    set?: Prisma.CustomerAddressWhereUniqueInput | Prisma.CustomerAddressWhereUniqueInput[];
    disconnect?: Prisma.CustomerAddressWhereUniqueInput | Prisma.CustomerAddressWhereUniqueInput[];
    delete?: Prisma.CustomerAddressWhereUniqueInput | Prisma.CustomerAddressWhereUniqueInput[];
    connect?: Prisma.CustomerAddressWhereUniqueInput | Prisma.CustomerAddressWhereUniqueInput[];
    update?: Prisma.CustomerAddressUpdateWithWhereUniqueWithoutUserInput | Prisma.CustomerAddressUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CustomerAddressUpdateManyWithWhereWithoutUserInput | Prisma.CustomerAddressUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CustomerAddressScalarWhereInput | Prisma.CustomerAddressScalarWhereInput[];
};
export type CustomerAddressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CustomerAddressCreateWithoutUserInput, Prisma.CustomerAddressUncheckedCreateWithoutUserInput> | Prisma.CustomerAddressCreateWithoutUserInput[] | Prisma.CustomerAddressUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CustomerAddressCreateOrConnectWithoutUserInput | Prisma.CustomerAddressCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CustomerAddressUpsertWithWhereUniqueWithoutUserInput | Prisma.CustomerAddressUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CustomerAddressCreateManyUserInputEnvelope;
    set?: Prisma.CustomerAddressWhereUniqueInput | Prisma.CustomerAddressWhereUniqueInput[];
    disconnect?: Prisma.CustomerAddressWhereUniqueInput | Prisma.CustomerAddressWhereUniqueInput[];
    delete?: Prisma.CustomerAddressWhereUniqueInput | Prisma.CustomerAddressWhereUniqueInput[];
    connect?: Prisma.CustomerAddressWhereUniqueInput | Prisma.CustomerAddressWhereUniqueInput[];
    update?: Prisma.CustomerAddressUpdateWithWhereUniqueWithoutUserInput | Prisma.CustomerAddressUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CustomerAddressUpdateManyWithWhereWithoutUserInput | Prisma.CustomerAddressUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CustomerAddressScalarWhereInput | Prisma.CustomerAddressScalarWhereInput[];
};
export type CustomerAddressCreateWithoutUserInput = {
    id?: string;
    type: string;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    phone?: string | null;
    createdAt?: Date | string;
};
export type CustomerAddressUncheckedCreateWithoutUserInput = {
    id?: string;
    type: string;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    phone?: string | null;
    createdAt?: Date | string;
};
export type CustomerAddressCreateOrConnectWithoutUserInput = {
    where: Prisma.CustomerAddressWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomerAddressCreateWithoutUserInput, Prisma.CustomerAddressUncheckedCreateWithoutUserInput>;
};
export type CustomerAddressCreateManyUserInputEnvelope = {
    data: Prisma.CustomerAddressCreateManyUserInput | Prisma.CustomerAddressCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CustomerAddressUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CustomerAddressWhereUniqueInput;
    update: Prisma.XOR<Prisma.CustomerAddressUpdateWithoutUserInput, Prisma.CustomerAddressUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CustomerAddressCreateWithoutUserInput, Prisma.CustomerAddressUncheckedCreateWithoutUserInput>;
};
export type CustomerAddressUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CustomerAddressWhereUniqueInput;
    data: Prisma.XOR<Prisma.CustomerAddressUpdateWithoutUserInput, Prisma.CustomerAddressUncheckedUpdateWithoutUserInput>;
};
export type CustomerAddressUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CustomerAddressScalarWhereInput;
    data: Prisma.XOR<Prisma.CustomerAddressUpdateManyMutationInput, Prisma.CustomerAddressUncheckedUpdateManyWithoutUserInput>;
};
export type CustomerAddressScalarWhereInput = {
    AND?: Prisma.CustomerAddressScalarWhereInput | Prisma.CustomerAddressScalarWhereInput[];
    OR?: Prisma.CustomerAddressScalarWhereInput[];
    NOT?: Prisma.CustomerAddressScalarWhereInput | Prisma.CustomerAddressScalarWhereInput[];
    id?: Prisma.StringFilter<"CustomerAddress"> | string;
    userId?: Prisma.StringFilter<"CustomerAddress"> | string;
    type?: Prisma.StringFilter<"CustomerAddress"> | string;
    street1?: Prisma.StringFilter<"CustomerAddress"> | string;
    street2?: Prisma.StringNullableFilter<"CustomerAddress"> | string | null;
    city?: Prisma.StringFilter<"CustomerAddress"> | string;
    state?: Prisma.StringFilter<"CustomerAddress"> | string;
    zipCode?: Prisma.StringFilter<"CustomerAddress"> | string;
    country?: Prisma.StringFilter<"CustomerAddress"> | string;
    phone?: Prisma.StringNullableFilter<"CustomerAddress"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CustomerAddress"> | Date | string;
};
export type CustomerAddressCreateManyUserInput = {
    id?: string;
    type: string;
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    phone?: string | null;
    createdAt?: Date | string;
};
export type CustomerAddressUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerAddressUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerAddressUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    street1?: Prisma.StringFieldUpdateOperationsInput | string;
    street2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerAddressSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    street1?: boolean;
    street2?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    country?: boolean;
    phone?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["customerAddress"]>;
export type CustomerAddressSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    street1?: boolean;
    street2?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    country?: boolean;
    phone?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["customerAddress"]>;
export type CustomerAddressSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    street1?: boolean;
    street2?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    country?: boolean;
    phone?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["customerAddress"]>;
export type CustomerAddressSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    street1?: boolean;
    street2?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    country?: boolean;
    phone?: boolean;
    createdAt?: boolean;
};
export type CustomerAddressOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "street1" | "street2" | "city" | "state" | "zipCode" | "country" | "phone" | "createdAt", ExtArgs["result"]["customerAddress"]>;
export type CustomerAddressInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CustomerAddressIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CustomerAddressIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CustomerAddressPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CustomerAddress";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: string;
        street1: string;
        street2: string | null;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["customerAddress"]>;
    composites: {};
};
export type CustomerAddressGetPayload<S extends boolean | null | undefined | CustomerAddressDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload, S>;
export type CustomerAddressCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CustomerAddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CustomerAddressCountAggregateInputType | true;
};
export interface CustomerAddressDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CustomerAddress'];
        meta: {
            name: 'CustomerAddress';
        };
    };
    findUnique<T extends CustomerAddressFindUniqueArgs>(args: Prisma.SelectSubset<T, CustomerAddressFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CustomerAddressClient<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CustomerAddressFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CustomerAddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CustomerAddressClient<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CustomerAddressFindFirstArgs>(args?: Prisma.SelectSubset<T, CustomerAddressFindFirstArgs<ExtArgs>>): Prisma.Prisma__CustomerAddressClient<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CustomerAddressFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CustomerAddressFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CustomerAddressClient<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CustomerAddressFindManyArgs>(args?: Prisma.SelectSubset<T, CustomerAddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CustomerAddressCreateArgs>(args: Prisma.SelectSubset<T, CustomerAddressCreateArgs<ExtArgs>>): Prisma.Prisma__CustomerAddressClient<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CustomerAddressCreateManyArgs>(args?: Prisma.SelectSubset<T, CustomerAddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CustomerAddressCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CustomerAddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CustomerAddressDeleteArgs>(args: Prisma.SelectSubset<T, CustomerAddressDeleteArgs<ExtArgs>>): Prisma.Prisma__CustomerAddressClient<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CustomerAddressUpdateArgs>(args: Prisma.SelectSubset<T, CustomerAddressUpdateArgs<ExtArgs>>): Prisma.Prisma__CustomerAddressClient<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CustomerAddressDeleteManyArgs>(args?: Prisma.SelectSubset<T, CustomerAddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CustomerAddressUpdateManyArgs>(args: Prisma.SelectSubset<T, CustomerAddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CustomerAddressUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CustomerAddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CustomerAddressUpsertArgs>(args: Prisma.SelectSubset<T, CustomerAddressUpsertArgs<ExtArgs>>): Prisma.Prisma__CustomerAddressClient<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CustomerAddressCountArgs>(args?: Prisma.Subset<T, CustomerAddressCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CustomerAddressCountAggregateOutputType> : number>;
    aggregate<T extends CustomerAddressAggregateArgs>(args: Prisma.Subset<T, CustomerAddressAggregateArgs>): Prisma.PrismaPromise<GetCustomerAddressAggregateType<T>>;
    groupBy<T extends CustomerAddressGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CustomerAddressGroupByArgs['orderBy'];
    } : {
        orderBy?: CustomerAddressGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CustomerAddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CustomerAddressFieldRefs;
}
export interface Prisma__CustomerAddressClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CustomerAddressFieldRefs {
    readonly id: Prisma.FieldRef<"CustomerAddress", 'String'>;
    readonly userId: Prisma.FieldRef<"CustomerAddress", 'String'>;
    readonly type: Prisma.FieldRef<"CustomerAddress", 'String'>;
    readonly street1: Prisma.FieldRef<"CustomerAddress", 'String'>;
    readonly street2: Prisma.FieldRef<"CustomerAddress", 'String'>;
    readonly city: Prisma.FieldRef<"CustomerAddress", 'String'>;
    readonly state: Prisma.FieldRef<"CustomerAddress", 'String'>;
    readonly zipCode: Prisma.FieldRef<"CustomerAddress", 'String'>;
    readonly country: Prisma.FieldRef<"CustomerAddress", 'String'>;
    readonly phone: Prisma.FieldRef<"CustomerAddress", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CustomerAddress", 'DateTime'>;
}
export type CustomerAddressFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelect<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    include?: Prisma.CustomerAddressInclude<ExtArgs> | null;
    where: Prisma.CustomerAddressWhereUniqueInput;
};
export type CustomerAddressFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelect<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    include?: Prisma.CustomerAddressInclude<ExtArgs> | null;
    where: Prisma.CustomerAddressWhereUniqueInput;
};
export type CustomerAddressFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelect<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    include?: Prisma.CustomerAddressInclude<ExtArgs> | null;
    where?: Prisma.CustomerAddressWhereInput;
    orderBy?: Prisma.CustomerAddressOrderByWithRelationInput | Prisma.CustomerAddressOrderByWithRelationInput[];
    cursor?: Prisma.CustomerAddressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomerAddressScalarFieldEnum | Prisma.CustomerAddressScalarFieldEnum[];
};
export type CustomerAddressFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelect<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    include?: Prisma.CustomerAddressInclude<ExtArgs> | null;
    where?: Prisma.CustomerAddressWhereInput;
    orderBy?: Prisma.CustomerAddressOrderByWithRelationInput | Prisma.CustomerAddressOrderByWithRelationInput[];
    cursor?: Prisma.CustomerAddressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomerAddressScalarFieldEnum | Prisma.CustomerAddressScalarFieldEnum[];
};
export type CustomerAddressFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelect<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    include?: Prisma.CustomerAddressInclude<ExtArgs> | null;
    where?: Prisma.CustomerAddressWhereInput;
    orderBy?: Prisma.CustomerAddressOrderByWithRelationInput | Prisma.CustomerAddressOrderByWithRelationInput[];
    cursor?: Prisma.CustomerAddressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomerAddressScalarFieldEnum | Prisma.CustomerAddressScalarFieldEnum[];
};
export type CustomerAddressCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelect<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    include?: Prisma.CustomerAddressInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomerAddressCreateInput, Prisma.CustomerAddressUncheckedCreateInput>;
};
export type CustomerAddressCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CustomerAddressCreateManyInput | Prisma.CustomerAddressCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CustomerAddressCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    data: Prisma.CustomerAddressCreateManyInput | Prisma.CustomerAddressCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CustomerAddressIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CustomerAddressUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelect<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    include?: Prisma.CustomerAddressInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomerAddressUpdateInput, Prisma.CustomerAddressUncheckedUpdateInput>;
    where: Prisma.CustomerAddressWhereUniqueInput;
};
export type CustomerAddressUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CustomerAddressUpdateManyMutationInput, Prisma.CustomerAddressUncheckedUpdateManyInput>;
    where?: Prisma.CustomerAddressWhereInput;
    limit?: number;
};
export type CustomerAddressUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomerAddressUpdateManyMutationInput, Prisma.CustomerAddressUncheckedUpdateManyInput>;
    where?: Prisma.CustomerAddressWhereInput;
    limit?: number;
    include?: Prisma.CustomerAddressIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CustomerAddressUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelect<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    include?: Prisma.CustomerAddressInclude<ExtArgs> | null;
    where: Prisma.CustomerAddressWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomerAddressCreateInput, Prisma.CustomerAddressUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CustomerAddressUpdateInput, Prisma.CustomerAddressUncheckedUpdateInput>;
};
export type CustomerAddressDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelect<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    include?: Prisma.CustomerAddressInclude<ExtArgs> | null;
    where: Prisma.CustomerAddressWhereUniqueInput;
};
export type CustomerAddressDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerAddressWhereInput;
    limit?: number;
};
export type CustomerAddressDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerAddressSelect<ExtArgs> | null;
    omit?: Prisma.CustomerAddressOmit<ExtArgs> | null;
    include?: Prisma.CustomerAddressInclude<ExtArgs> | null;
};
