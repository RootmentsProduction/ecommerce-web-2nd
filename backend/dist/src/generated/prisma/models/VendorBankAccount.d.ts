import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VendorBankAccountModel = runtime.Types.Result.DefaultSelection<Prisma.$VendorBankAccountPayload>;
export type AggregateVendorBankAccount = {
    _count: VendorBankAccountCountAggregateOutputType | null;
    _min: VendorBankAccountMinAggregateOutputType | null;
    _max: VendorBankAccountMaxAggregateOutputType | null;
};
export type VendorBankAccountMinAggregateOutputType = {
    id: string | null;
    vendorId: string | null;
    accountHolderName: string | null;
    bankName: string | null;
    accountNumber: string | null;
    ifscCode: string | null;
};
export type VendorBankAccountMaxAggregateOutputType = {
    id: string | null;
    vendorId: string | null;
    accountHolderName: string | null;
    bankName: string | null;
    accountNumber: string | null;
    ifscCode: string | null;
};
export type VendorBankAccountCountAggregateOutputType = {
    id: number;
    vendorId: number;
    accountHolderName: number;
    bankName: number;
    accountNumber: number;
    ifscCode: number;
    _all: number;
};
export type VendorBankAccountMinAggregateInputType = {
    id?: true;
    vendorId?: true;
    accountHolderName?: true;
    bankName?: true;
    accountNumber?: true;
    ifscCode?: true;
};
export type VendorBankAccountMaxAggregateInputType = {
    id?: true;
    vendorId?: true;
    accountHolderName?: true;
    bankName?: true;
    accountNumber?: true;
    ifscCode?: true;
};
export type VendorBankAccountCountAggregateInputType = {
    id?: true;
    vendorId?: true;
    accountHolderName?: true;
    bankName?: true;
    accountNumber?: true;
    ifscCode?: true;
    _all?: true;
};
export type VendorBankAccountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorBankAccountWhereInput;
    orderBy?: Prisma.VendorBankAccountOrderByWithRelationInput | Prisma.VendorBankAccountOrderByWithRelationInput[];
    cursor?: Prisma.VendorBankAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VendorBankAccountCountAggregateInputType;
    _min?: VendorBankAccountMinAggregateInputType;
    _max?: VendorBankAccountMaxAggregateInputType;
};
export type GetVendorBankAccountAggregateType<T extends VendorBankAccountAggregateArgs> = {
    [P in keyof T & keyof AggregateVendorBankAccount]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVendorBankAccount[P]> : Prisma.GetScalarType<T[P], AggregateVendorBankAccount[P]>;
};
export type VendorBankAccountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorBankAccountWhereInput;
    orderBy?: Prisma.VendorBankAccountOrderByWithAggregationInput | Prisma.VendorBankAccountOrderByWithAggregationInput[];
    by: Prisma.VendorBankAccountScalarFieldEnum[] | Prisma.VendorBankAccountScalarFieldEnum;
    having?: Prisma.VendorBankAccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VendorBankAccountCountAggregateInputType | true;
    _min?: VendorBankAccountMinAggregateInputType;
    _max?: VendorBankAccountMaxAggregateInputType;
};
export type VendorBankAccountGroupByOutputType = {
    id: string;
    vendorId: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    _count: VendorBankAccountCountAggregateOutputType | null;
    _min: VendorBankAccountMinAggregateOutputType | null;
    _max: VendorBankAccountMaxAggregateOutputType | null;
};
export type GetVendorBankAccountGroupByPayload<T extends VendorBankAccountGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VendorBankAccountGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VendorBankAccountGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VendorBankAccountGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VendorBankAccountGroupByOutputType[P]>;
}>>;
export type VendorBankAccountWhereInput = {
    AND?: Prisma.VendorBankAccountWhereInput | Prisma.VendorBankAccountWhereInput[];
    OR?: Prisma.VendorBankAccountWhereInput[];
    NOT?: Prisma.VendorBankAccountWhereInput | Prisma.VendorBankAccountWhereInput[];
    id?: Prisma.StringFilter<"VendorBankAccount"> | string;
    vendorId?: Prisma.StringFilter<"VendorBankAccount"> | string;
    accountHolderName?: Prisma.StringFilter<"VendorBankAccount"> | string;
    bankName?: Prisma.StringFilter<"VendorBankAccount"> | string;
    accountNumber?: Prisma.StringFilter<"VendorBankAccount"> | string;
    ifscCode?: Prisma.StringFilter<"VendorBankAccount"> | string;
    vendor?: Prisma.XOR<Prisma.VendorScalarRelationFilter, Prisma.VendorWhereInput>;
};
export type VendorBankAccountOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    accountHolderName?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    ifscCode?: Prisma.SortOrder;
    vendor?: Prisma.VendorOrderByWithRelationInput;
};
export type VendorBankAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VendorBankAccountWhereInput | Prisma.VendorBankAccountWhereInput[];
    OR?: Prisma.VendorBankAccountWhereInput[];
    NOT?: Prisma.VendorBankAccountWhereInput | Prisma.VendorBankAccountWhereInput[];
    vendorId?: Prisma.StringFilter<"VendorBankAccount"> | string;
    accountHolderName?: Prisma.StringFilter<"VendorBankAccount"> | string;
    bankName?: Prisma.StringFilter<"VendorBankAccount"> | string;
    accountNumber?: Prisma.StringFilter<"VendorBankAccount"> | string;
    ifscCode?: Prisma.StringFilter<"VendorBankAccount"> | string;
    vendor?: Prisma.XOR<Prisma.VendorScalarRelationFilter, Prisma.VendorWhereInput>;
}, "id">;
export type VendorBankAccountOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    accountHolderName?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    ifscCode?: Prisma.SortOrder;
    _count?: Prisma.VendorBankAccountCountOrderByAggregateInput;
    _max?: Prisma.VendorBankAccountMaxOrderByAggregateInput;
    _min?: Prisma.VendorBankAccountMinOrderByAggregateInput;
};
export type VendorBankAccountScalarWhereWithAggregatesInput = {
    AND?: Prisma.VendorBankAccountScalarWhereWithAggregatesInput | Prisma.VendorBankAccountScalarWhereWithAggregatesInput[];
    OR?: Prisma.VendorBankAccountScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VendorBankAccountScalarWhereWithAggregatesInput | Prisma.VendorBankAccountScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"VendorBankAccount"> | string;
    vendorId?: Prisma.StringWithAggregatesFilter<"VendorBankAccount"> | string;
    accountHolderName?: Prisma.StringWithAggregatesFilter<"VendorBankAccount"> | string;
    bankName?: Prisma.StringWithAggregatesFilter<"VendorBankAccount"> | string;
    accountNumber?: Prisma.StringWithAggregatesFilter<"VendorBankAccount"> | string;
    ifscCode?: Prisma.StringWithAggregatesFilter<"VendorBankAccount"> | string;
};
export type VendorBankAccountCreateInput = {
    id?: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    vendor: Prisma.VendorCreateNestedOneWithoutBankAccountsInput;
};
export type VendorBankAccountUncheckedCreateInput = {
    id?: string;
    vendorId: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
};
export type VendorBankAccountUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    ifscCode?: Prisma.StringFieldUpdateOperationsInput | string;
    vendor?: Prisma.VendorUpdateOneRequiredWithoutBankAccountsNestedInput;
};
export type VendorBankAccountUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vendorId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    ifscCode?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VendorBankAccountCreateManyInput = {
    id?: string;
    vendorId: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
};
export type VendorBankAccountUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    ifscCode?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VendorBankAccountUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vendorId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    ifscCode?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VendorBankAccountListRelationFilter = {
    every?: Prisma.VendorBankAccountWhereInput;
    some?: Prisma.VendorBankAccountWhereInput;
    none?: Prisma.VendorBankAccountWhereInput;
};
export type VendorBankAccountOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VendorBankAccountCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    accountHolderName?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    ifscCode?: Prisma.SortOrder;
};
export type VendorBankAccountMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    accountHolderName?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    ifscCode?: Prisma.SortOrder;
};
export type VendorBankAccountMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    accountHolderName?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    ifscCode?: Prisma.SortOrder;
};
export type VendorBankAccountCreateNestedManyWithoutVendorInput = {
    create?: Prisma.XOR<Prisma.VendorBankAccountCreateWithoutVendorInput, Prisma.VendorBankAccountUncheckedCreateWithoutVendorInput> | Prisma.VendorBankAccountCreateWithoutVendorInput[] | Prisma.VendorBankAccountUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorBankAccountCreateOrConnectWithoutVendorInput | Prisma.VendorBankAccountCreateOrConnectWithoutVendorInput[];
    createMany?: Prisma.VendorBankAccountCreateManyVendorInputEnvelope;
    connect?: Prisma.VendorBankAccountWhereUniqueInput | Prisma.VendorBankAccountWhereUniqueInput[];
};
export type VendorBankAccountUncheckedCreateNestedManyWithoutVendorInput = {
    create?: Prisma.XOR<Prisma.VendorBankAccountCreateWithoutVendorInput, Prisma.VendorBankAccountUncheckedCreateWithoutVendorInput> | Prisma.VendorBankAccountCreateWithoutVendorInput[] | Prisma.VendorBankAccountUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorBankAccountCreateOrConnectWithoutVendorInput | Prisma.VendorBankAccountCreateOrConnectWithoutVendorInput[];
    createMany?: Prisma.VendorBankAccountCreateManyVendorInputEnvelope;
    connect?: Prisma.VendorBankAccountWhereUniqueInput | Prisma.VendorBankAccountWhereUniqueInput[];
};
export type VendorBankAccountUpdateManyWithoutVendorNestedInput = {
    create?: Prisma.XOR<Prisma.VendorBankAccountCreateWithoutVendorInput, Prisma.VendorBankAccountUncheckedCreateWithoutVendorInput> | Prisma.VendorBankAccountCreateWithoutVendorInput[] | Prisma.VendorBankAccountUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorBankAccountCreateOrConnectWithoutVendorInput | Prisma.VendorBankAccountCreateOrConnectWithoutVendorInput[];
    upsert?: Prisma.VendorBankAccountUpsertWithWhereUniqueWithoutVendorInput | Prisma.VendorBankAccountUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: Prisma.VendorBankAccountCreateManyVendorInputEnvelope;
    set?: Prisma.VendorBankAccountWhereUniqueInput | Prisma.VendorBankAccountWhereUniqueInput[];
    disconnect?: Prisma.VendorBankAccountWhereUniqueInput | Prisma.VendorBankAccountWhereUniqueInput[];
    delete?: Prisma.VendorBankAccountWhereUniqueInput | Prisma.VendorBankAccountWhereUniqueInput[];
    connect?: Prisma.VendorBankAccountWhereUniqueInput | Prisma.VendorBankAccountWhereUniqueInput[];
    update?: Prisma.VendorBankAccountUpdateWithWhereUniqueWithoutVendorInput | Prisma.VendorBankAccountUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?: Prisma.VendorBankAccountUpdateManyWithWhereWithoutVendorInput | Prisma.VendorBankAccountUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: Prisma.VendorBankAccountScalarWhereInput | Prisma.VendorBankAccountScalarWhereInput[];
};
export type VendorBankAccountUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: Prisma.XOR<Prisma.VendorBankAccountCreateWithoutVendorInput, Prisma.VendorBankAccountUncheckedCreateWithoutVendorInput> | Prisma.VendorBankAccountCreateWithoutVendorInput[] | Prisma.VendorBankAccountUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorBankAccountCreateOrConnectWithoutVendorInput | Prisma.VendorBankAccountCreateOrConnectWithoutVendorInput[];
    upsert?: Prisma.VendorBankAccountUpsertWithWhereUniqueWithoutVendorInput | Prisma.VendorBankAccountUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: Prisma.VendorBankAccountCreateManyVendorInputEnvelope;
    set?: Prisma.VendorBankAccountWhereUniqueInput | Prisma.VendorBankAccountWhereUniqueInput[];
    disconnect?: Prisma.VendorBankAccountWhereUniqueInput | Prisma.VendorBankAccountWhereUniqueInput[];
    delete?: Prisma.VendorBankAccountWhereUniqueInput | Prisma.VendorBankAccountWhereUniqueInput[];
    connect?: Prisma.VendorBankAccountWhereUniqueInput | Prisma.VendorBankAccountWhereUniqueInput[];
    update?: Prisma.VendorBankAccountUpdateWithWhereUniqueWithoutVendorInput | Prisma.VendorBankAccountUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?: Prisma.VendorBankAccountUpdateManyWithWhereWithoutVendorInput | Prisma.VendorBankAccountUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: Prisma.VendorBankAccountScalarWhereInput | Prisma.VendorBankAccountScalarWhereInput[];
};
export type VendorBankAccountCreateWithoutVendorInput = {
    id?: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
};
export type VendorBankAccountUncheckedCreateWithoutVendorInput = {
    id?: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
};
export type VendorBankAccountCreateOrConnectWithoutVendorInput = {
    where: Prisma.VendorBankAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorBankAccountCreateWithoutVendorInput, Prisma.VendorBankAccountUncheckedCreateWithoutVendorInput>;
};
export type VendorBankAccountCreateManyVendorInputEnvelope = {
    data: Prisma.VendorBankAccountCreateManyVendorInput | Prisma.VendorBankAccountCreateManyVendorInput[];
    skipDuplicates?: boolean;
};
export type VendorBankAccountUpsertWithWhereUniqueWithoutVendorInput = {
    where: Prisma.VendorBankAccountWhereUniqueInput;
    update: Prisma.XOR<Prisma.VendorBankAccountUpdateWithoutVendorInput, Prisma.VendorBankAccountUncheckedUpdateWithoutVendorInput>;
    create: Prisma.XOR<Prisma.VendorBankAccountCreateWithoutVendorInput, Prisma.VendorBankAccountUncheckedCreateWithoutVendorInput>;
};
export type VendorBankAccountUpdateWithWhereUniqueWithoutVendorInput = {
    where: Prisma.VendorBankAccountWhereUniqueInput;
    data: Prisma.XOR<Prisma.VendorBankAccountUpdateWithoutVendorInput, Prisma.VendorBankAccountUncheckedUpdateWithoutVendorInput>;
};
export type VendorBankAccountUpdateManyWithWhereWithoutVendorInput = {
    where: Prisma.VendorBankAccountScalarWhereInput;
    data: Prisma.XOR<Prisma.VendorBankAccountUpdateManyMutationInput, Prisma.VendorBankAccountUncheckedUpdateManyWithoutVendorInput>;
};
export type VendorBankAccountScalarWhereInput = {
    AND?: Prisma.VendorBankAccountScalarWhereInput | Prisma.VendorBankAccountScalarWhereInput[];
    OR?: Prisma.VendorBankAccountScalarWhereInput[];
    NOT?: Prisma.VendorBankAccountScalarWhereInput | Prisma.VendorBankAccountScalarWhereInput[];
    id?: Prisma.StringFilter<"VendorBankAccount"> | string;
    vendorId?: Prisma.StringFilter<"VendorBankAccount"> | string;
    accountHolderName?: Prisma.StringFilter<"VendorBankAccount"> | string;
    bankName?: Prisma.StringFilter<"VendorBankAccount"> | string;
    accountNumber?: Prisma.StringFilter<"VendorBankAccount"> | string;
    ifscCode?: Prisma.StringFilter<"VendorBankAccount"> | string;
};
export type VendorBankAccountCreateManyVendorInput = {
    id?: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
};
export type VendorBankAccountUpdateWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    ifscCode?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VendorBankAccountUncheckedUpdateWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    ifscCode?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VendorBankAccountUncheckedUpdateManyWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    ifscCode?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VendorBankAccountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vendorId?: boolean;
    accountHolderName?: boolean;
    bankName?: boolean;
    accountNumber?: boolean;
    ifscCode?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorBankAccount"]>;
export type VendorBankAccountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vendorId?: boolean;
    accountHolderName?: boolean;
    bankName?: boolean;
    accountNumber?: boolean;
    ifscCode?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorBankAccount"]>;
export type VendorBankAccountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vendorId?: boolean;
    accountHolderName?: boolean;
    bankName?: boolean;
    accountNumber?: boolean;
    ifscCode?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorBankAccount"]>;
export type VendorBankAccountSelectScalar = {
    id?: boolean;
    vendorId?: boolean;
    accountHolderName?: boolean;
    bankName?: boolean;
    accountNumber?: boolean;
    ifscCode?: boolean;
};
export type VendorBankAccountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "vendorId" | "accountHolderName" | "bankName" | "accountNumber" | "ifscCode", ExtArgs["result"]["vendorBankAccount"]>;
export type VendorBankAccountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
};
export type VendorBankAccountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
};
export type VendorBankAccountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
};
export type $VendorBankAccountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VendorBankAccount";
    objects: {
        vendor: Prisma.$VendorPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        vendorId: string;
        accountHolderName: string;
        bankName: string;
        accountNumber: string;
        ifscCode: string;
    }, ExtArgs["result"]["vendorBankAccount"]>;
    composites: {};
};
export type VendorBankAccountGetPayload<S extends boolean | null | undefined | VendorBankAccountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload, S>;
export type VendorBankAccountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VendorBankAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VendorBankAccountCountAggregateInputType | true;
};
export interface VendorBankAccountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VendorBankAccount'];
        meta: {
            name: 'VendorBankAccount';
        };
    };
    findUnique<T extends VendorBankAccountFindUniqueArgs>(args: Prisma.SelectSubset<T, VendorBankAccountFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VendorBankAccountClient<runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VendorBankAccountFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VendorBankAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorBankAccountClient<runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VendorBankAccountFindFirstArgs>(args?: Prisma.SelectSubset<T, VendorBankAccountFindFirstArgs<ExtArgs>>): Prisma.Prisma__VendorBankAccountClient<runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VendorBankAccountFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VendorBankAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorBankAccountClient<runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VendorBankAccountFindManyArgs>(args?: Prisma.SelectSubset<T, VendorBankAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VendorBankAccountCreateArgs>(args: Prisma.SelectSubset<T, VendorBankAccountCreateArgs<ExtArgs>>): Prisma.Prisma__VendorBankAccountClient<runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VendorBankAccountCreateManyArgs>(args?: Prisma.SelectSubset<T, VendorBankAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VendorBankAccountCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VendorBankAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VendorBankAccountDeleteArgs>(args: Prisma.SelectSubset<T, VendorBankAccountDeleteArgs<ExtArgs>>): Prisma.Prisma__VendorBankAccountClient<runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VendorBankAccountUpdateArgs>(args: Prisma.SelectSubset<T, VendorBankAccountUpdateArgs<ExtArgs>>): Prisma.Prisma__VendorBankAccountClient<runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VendorBankAccountDeleteManyArgs>(args?: Prisma.SelectSubset<T, VendorBankAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VendorBankAccountUpdateManyArgs>(args: Prisma.SelectSubset<T, VendorBankAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VendorBankAccountUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VendorBankAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VendorBankAccountUpsertArgs>(args: Prisma.SelectSubset<T, VendorBankAccountUpsertArgs<ExtArgs>>): Prisma.Prisma__VendorBankAccountClient<runtime.Types.Result.GetResult<Prisma.$VendorBankAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VendorBankAccountCountArgs>(args?: Prisma.Subset<T, VendorBankAccountCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VendorBankAccountCountAggregateOutputType> : number>;
    aggregate<T extends VendorBankAccountAggregateArgs>(args: Prisma.Subset<T, VendorBankAccountAggregateArgs>): Prisma.PrismaPromise<GetVendorBankAccountAggregateType<T>>;
    groupBy<T extends VendorBankAccountGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VendorBankAccountGroupByArgs['orderBy'];
    } : {
        orderBy?: VendorBankAccountGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VendorBankAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorBankAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VendorBankAccountFieldRefs;
}
export interface Prisma__VendorBankAccountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    vendor<T extends Prisma.VendorDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VendorDefaultArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VendorBankAccountFieldRefs {
    readonly id: Prisma.FieldRef<"VendorBankAccount", 'String'>;
    readonly vendorId: Prisma.FieldRef<"VendorBankAccount", 'String'>;
    readonly accountHolderName: Prisma.FieldRef<"VendorBankAccount", 'String'>;
    readonly bankName: Prisma.FieldRef<"VendorBankAccount", 'String'>;
    readonly accountNumber: Prisma.FieldRef<"VendorBankAccount", 'String'>;
    readonly ifscCode: Prisma.FieldRef<"VendorBankAccount", 'String'>;
}
export type VendorBankAccountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelect<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    include?: Prisma.VendorBankAccountInclude<ExtArgs> | null;
    where: Prisma.VendorBankAccountWhereUniqueInput;
};
export type VendorBankAccountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelect<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    include?: Prisma.VendorBankAccountInclude<ExtArgs> | null;
    where: Prisma.VendorBankAccountWhereUniqueInput;
};
export type VendorBankAccountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelect<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    include?: Prisma.VendorBankAccountInclude<ExtArgs> | null;
    where?: Prisma.VendorBankAccountWhereInput;
    orderBy?: Prisma.VendorBankAccountOrderByWithRelationInput | Prisma.VendorBankAccountOrderByWithRelationInput[];
    cursor?: Prisma.VendorBankAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorBankAccountScalarFieldEnum | Prisma.VendorBankAccountScalarFieldEnum[];
};
export type VendorBankAccountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelect<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    include?: Prisma.VendorBankAccountInclude<ExtArgs> | null;
    where?: Prisma.VendorBankAccountWhereInput;
    orderBy?: Prisma.VendorBankAccountOrderByWithRelationInput | Prisma.VendorBankAccountOrderByWithRelationInput[];
    cursor?: Prisma.VendorBankAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorBankAccountScalarFieldEnum | Prisma.VendorBankAccountScalarFieldEnum[];
};
export type VendorBankAccountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelect<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    include?: Prisma.VendorBankAccountInclude<ExtArgs> | null;
    where?: Prisma.VendorBankAccountWhereInput;
    orderBy?: Prisma.VendorBankAccountOrderByWithRelationInput | Prisma.VendorBankAccountOrderByWithRelationInput[];
    cursor?: Prisma.VendorBankAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorBankAccountScalarFieldEnum | Prisma.VendorBankAccountScalarFieldEnum[];
};
export type VendorBankAccountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelect<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    include?: Prisma.VendorBankAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorBankAccountCreateInput, Prisma.VendorBankAccountUncheckedCreateInput>;
};
export type VendorBankAccountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VendorBankAccountCreateManyInput | Prisma.VendorBankAccountCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VendorBankAccountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    data: Prisma.VendorBankAccountCreateManyInput | Prisma.VendorBankAccountCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.VendorBankAccountIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type VendorBankAccountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelect<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    include?: Prisma.VendorBankAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorBankAccountUpdateInput, Prisma.VendorBankAccountUncheckedUpdateInput>;
    where: Prisma.VendorBankAccountWhereUniqueInput;
};
export type VendorBankAccountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VendorBankAccountUpdateManyMutationInput, Prisma.VendorBankAccountUncheckedUpdateManyInput>;
    where?: Prisma.VendorBankAccountWhereInput;
    limit?: number;
};
export type VendorBankAccountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorBankAccountUpdateManyMutationInput, Prisma.VendorBankAccountUncheckedUpdateManyInput>;
    where?: Prisma.VendorBankAccountWhereInput;
    limit?: number;
    include?: Prisma.VendorBankAccountIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type VendorBankAccountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelect<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    include?: Prisma.VendorBankAccountInclude<ExtArgs> | null;
    where: Prisma.VendorBankAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorBankAccountCreateInput, Prisma.VendorBankAccountUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VendorBankAccountUpdateInput, Prisma.VendorBankAccountUncheckedUpdateInput>;
};
export type VendorBankAccountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelect<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    include?: Prisma.VendorBankAccountInclude<ExtArgs> | null;
    where: Prisma.VendorBankAccountWhereUniqueInput;
};
export type VendorBankAccountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorBankAccountWhereInput;
    limit?: number;
};
export type VendorBankAccountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorBankAccountSelect<ExtArgs> | null;
    omit?: Prisma.VendorBankAccountOmit<ExtArgs> | null;
    include?: Prisma.VendorBankAccountInclude<ExtArgs> | null;
};
