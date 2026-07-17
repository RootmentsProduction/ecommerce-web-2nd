import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RefreshSessionModel = runtime.Types.Result.DefaultSelection<Prisma.$RefreshSessionPayload>;
export type AggregateRefreshSession = {
    _count: RefreshSessionCountAggregateOutputType | null;
    _min: RefreshSessionMinAggregateOutputType | null;
    _max: RefreshSessionMaxAggregateOutputType | null;
};
export type RefreshSessionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    userAgent: string | null;
    ipAddress: string | null;
    createdAt: Date | null;
};
export type RefreshSessionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    userAgent: string | null;
    ipAddress: string | null;
    createdAt: Date | null;
};
export type RefreshSessionCountAggregateOutputType = {
    id: number;
    userId: number;
    tokenHash: number;
    expiresAt: number;
    userAgent: number;
    ipAddress: number;
    createdAt: number;
    _all: number;
};
export type RefreshSessionMinAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    userAgent?: true;
    ipAddress?: true;
    createdAt?: true;
};
export type RefreshSessionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    userAgent?: true;
    ipAddress?: true;
    createdAt?: true;
};
export type RefreshSessionCountAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    userAgent?: true;
    ipAddress?: true;
    createdAt?: true;
    _all?: true;
};
export type RefreshSessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshSessionWhereInput;
    orderBy?: Prisma.RefreshSessionOrderByWithRelationInput | Prisma.RefreshSessionOrderByWithRelationInput[];
    cursor?: Prisma.RefreshSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RefreshSessionCountAggregateInputType;
    _min?: RefreshSessionMinAggregateInputType;
    _max?: RefreshSessionMaxAggregateInputType;
};
export type GetRefreshSessionAggregateType<T extends RefreshSessionAggregateArgs> = {
    [P in keyof T & keyof AggregateRefreshSession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRefreshSession[P]> : Prisma.GetScalarType<T[P], AggregateRefreshSession[P]>;
};
export type RefreshSessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshSessionWhereInput;
    orderBy?: Prisma.RefreshSessionOrderByWithAggregationInput | Prisma.RefreshSessionOrderByWithAggregationInput[];
    by: Prisma.RefreshSessionScalarFieldEnum[] | Prisma.RefreshSessionScalarFieldEnum;
    having?: Prisma.RefreshSessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RefreshSessionCountAggregateInputType | true;
    _min?: RefreshSessionMinAggregateInputType;
    _max?: RefreshSessionMaxAggregateInputType;
};
export type RefreshSessionGroupByOutputType = {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    userAgent: string | null;
    ipAddress: string | null;
    createdAt: Date;
    _count: RefreshSessionCountAggregateOutputType | null;
    _min: RefreshSessionMinAggregateOutputType | null;
    _max: RefreshSessionMaxAggregateOutputType | null;
};
export type GetRefreshSessionGroupByPayload<T extends RefreshSessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RefreshSessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RefreshSessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RefreshSessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RefreshSessionGroupByOutputType[P]>;
}>>;
export type RefreshSessionWhereInput = {
    AND?: Prisma.RefreshSessionWhereInput | Prisma.RefreshSessionWhereInput[];
    OR?: Prisma.RefreshSessionWhereInput[];
    NOT?: Prisma.RefreshSessionWhereInput | Prisma.RefreshSessionWhereInput[];
    id?: Prisma.StringFilter<"RefreshSession"> | string;
    userId?: Prisma.StringFilter<"RefreshSession"> | string;
    tokenHash?: Prisma.StringFilter<"RefreshSession"> | string;
    expiresAt?: Prisma.DateTimeFilter<"RefreshSession"> | Date | string;
    userAgent?: Prisma.StringNullableFilter<"RefreshSession"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"RefreshSession"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"RefreshSession"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RefreshSessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type RefreshSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tokenHash?: string;
    AND?: Prisma.RefreshSessionWhereInput | Prisma.RefreshSessionWhereInput[];
    OR?: Prisma.RefreshSessionWhereInput[];
    NOT?: Prisma.RefreshSessionWhereInput | Prisma.RefreshSessionWhereInput[];
    userId?: Prisma.StringFilter<"RefreshSession"> | string;
    expiresAt?: Prisma.DateTimeFilter<"RefreshSession"> | Date | string;
    userAgent?: Prisma.StringNullableFilter<"RefreshSession"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"RefreshSession"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"RefreshSession"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "tokenHash">;
export type RefreshSessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RefreshSessionCountOrderByAggregateInput;
    _max?: Prisma.RefreshSessionMaxOrderByAggregateInput;
    _min?: Prisma.RefreshSessionMinOrderByAggregateInput;
};
export type RefreshSessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.RefreshSessionScalarWhereWithAggregatesInput | Prisma.RefreshSessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.RefreshSessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RefreshSessionScalarWhereWithAggregatesInput | Prisma.RefreshSessionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RefreshSession"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RefreshSession"> | string;
    tokenHash?: Prisma.StringWithAggregatesFilter<"RefreshSession"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"RefreshSession"> | Date | string;
    userAgent?: Prisma.StringNullableWithAggregatesFilter<"RefreshSession"> | string | null;
    ipAddress?: Prisma.StringNullableWithAggregatesFilter<"RefreshSession"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RefreshSession"> | Date | string;
};
export type RefreshSessionCreateInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    userAgent?: string | null;
    ipAddress?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSessionsInput;
};
export type RefreshSessionUncheckedCreateInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date | string;
    userAgent?: string | null;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type RefreshSessionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput;
};
export type RefreshSessionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefreshSessionCreateManyInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date | string;
    userAgent?: string | null;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type RefreshSessionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefreshSessionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefreshSessionListRelationFilter = {
    every?: Prisma.RefreshSessionWhereInput;
    some?: Prisma.RefreshSessionWhereInput;
    none?: Prisma.RefreshSessionWhereInput;
};
export type RefreshSessionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RefreshSessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RefreshSessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RefreshSessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RefreshSessionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RefreshSessionCreateWithoutUserInput, Prisma.RefreshSessionUncheckedCreateWithoutUserInput> | Prisma.RefreshSessionCreateWithoutUserInput[] | Prisma.RefreshSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RefreshSessionCreateOrConnectWithoutUserInput | Prisma.RefreshSessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RefreshSessionCreateManyUserInputEnvelope;
    connect?: Prisma.RefreshSessionWhereUniqueInput | Prisma.RefreshSessionWhereUniqueInput[];
};
export type RefreshSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RefreshSessionCreateWithoutUserInput, Prisma.RefreshSessionUncheckedCreateWithoutUserInput> | Prisma.RefreshSessionCreateWithoutUserInput[] | Prisma.RefreshSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RefreshSessionCreateOrConnectWithoutUserInput | Prisma.RefreshSessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RefreshSessionCreateManyUserInputEnvelope;
    connect?: Prisma.RefreshSessionWhereUniqueInput | Prisma.RefreshSessionWhereUniqueInput[];
};
export type RefreshSessionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RefreshSessionCreateWithoutUserInput, Prisma.RefreshSessionUncheckedCreateWithoutUserInput> | Prisma.RefreshSessionCreateWithoutUserInput[] | Prisma.RefreshSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RefreshSessionCreateOrConnectWithoutUserInput | Prisma.RefreshSessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RefreshSessionUpsertWithWhereUniqueWithoutUserInput | Prisma.RefreshSessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RefreshSessionCreateManyUserInputEnvelope;
    set?: Prisma.RefreshSessionWhereUniqueInput | Prisma.RefreshSessionWhereUniqueInput[];
    disconnect?: Prisma.RefreshSessionWhereUniqueInput | Prisma.RefreshSessionWhereUniqueInput[];
    delete?: Prisma.RefreshSessionWhereUniqueInput | Prisma.RefreshSessionWhereUniqueInput[];
    connect?: Prisma.RefreshSessionWhereUniqueInput | Prisma.RefreshSessionWhereUniqueInput[];
    update?: Prisma.RefreshSessionUpdateWithWhereUniqueWithoutUserInput | Prisma.RefreshSessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RefreshSessionUpdateManyWithWhereWithoutUserInput | Prisma.RefreshSessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RefreshSessionScalarWhereInput | Prisma.RefreshSessionScalarWhereInput[];
};
export type RefreshSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RefreshSessionCreateWithoutUserInput, Prisma.RefreshSessionUncheckedCreateWithoutUserInput> | Prisma.RefreshSessionCreateWithoutUserInput[] | Prisma.RefreshSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RefreshSessionCreateOrConnectWithoutUserInput | Prisma.RefreshSessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RefreshSessionUpsertWithWhereUniqueWithoutUserInput | Prisma.RefreshSessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RefreshSessionCreateManyUserInputEnvelope;
    set?: Prisma.RefreshSessionWhereUniqueInput | Prisma.RefreshSessionWhereUniqueInput[];
    disconnect?: Prisma.RefreshSessionWhereUniqueInput | Prisma.RefreshSessionWhereUniqueInput[];
    delete?: Prisma.RefreshSessionWhereUniqueInput | Prisma.RefreshSessionWhereUniqueInput[];
    connect?: Prisma.RefreshSessionWhereUniqueInput | Prisma.RefreshSessionWhereUniqueInput[];
    update?: Prisma.RefreshSessionUpdateWithWhereUniqueWithoutUserInput | Prisma.RefreshSessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RefreshSessionUpdateManyWithWhereWithoutUserInput | Prisma.RefreshSessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RefreshSessionScalarWhereInput | Prisma.RefreshSessionScalarWhereInput[];
};
export type RefreshSessionCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    userAgent?: string | null;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type RefreshSessionUncheckedCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    userAgent?: string | null;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type RefreshSessionCreateOrConnectWithoutUserInput = {
    where: Prisma.RefreshSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefreshSessionCreateWithoutUserInput, Prisma.RefreshSessionUncheckedCreateWithoutUserInput>;
};
export type RefreshSessionCreateManyUserInputEnvelope = {
    data: Prisma.RefreshSessionCreateManyUserInput | Prisma.RefreshSessionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type RefreshSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RefreshSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.RefreshSessionUpdateWithoutUserInput, Prisma.RefreshSessionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RefreshSessionCreateWithoutUserInput, Prisma.RefreshSessionUncheckedCreateWithoutUserInput>;
};
export type RefreshSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RefreshSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.RefreshSessionUpdateWithoutUserInput, Prisma.RefreshSessionUncheckedUpdateWithoutUserInput>;
};
export type RefreshSessionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RefreshSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.RefreshSessionUpdateManyMutationInput, Prisma.RefreshSessionUncheckedUpdateManyWithoutUserInput>;
};
export type RefreshSessionScalarWhereInput = {
    AND?: Prisma.RefreshSessionScalarWhereInput | Prisma.RefreshSessionScalarWhereInput[];
    OR?: Prisma.RefreshSessionScalarWhereInput[];
    NOT?: Prisma.RefreshSessionScalarWhereInput | Prisma.RefreshSessionScalarWhereInput[];
    id?: Prisma.StringFilter<"RefreshSession"> | string;
    userId?: Prisma.StringFilter<"RefreshSession"> | string;
    tokenHash?: Prisma.StringFilter<"RefreshSession"> | string;
    expiresAt?: Prisma.DateTimeFilter<"RefreshSession"> | Date | string;
    userAgent?: Prisma.StringNullableFilter<"RefreshSession"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"RefreshSession"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"RefreshSession"> | Date | string;
};
export type RefreshSessionCreateManyUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    userAgent?: string | null;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type RefreshSessionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefreshSessionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefreshSessionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefreshSessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    userAgent?: boolean;
    ipAddress?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["refreshSession"]>;
export type RefreshSessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    userAgent?: boolean;
    ipAddress?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["refreshSession"]>;
export type RefreshSessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    userAgent?: boolean;
    ipAddress?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["refreshSession"]>;
export type RefreshSessionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    userAgent?: boolean;
    ipAddress?: boolean;
    createdAt?: boolean;
};
export type RefreshSessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "tokenHash" | "expiresAt" | "userAgent" | "ipAddress" | "createdAt", ExtArgs["result"]["refreshSession"]>;
export type RefreshSessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RefreshSessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RefreshSessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RefreshSessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RefreshSession";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        tokenHash: string;
        expiresAt: Date;
        userAgent: string | null;
        ipAddress: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["refreshSession"]>;
    composites: {};
};
export type RefreshSessionGetPayload<S extends boolean | null | undefined | RefreshSessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload, S>;
export type RefreshSessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RefreshSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RefreshSessionCountAggregateInputType | true;
};
export interface RefreshSessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RefreshSession'];
        meta: {
            name: 'RefreshSession';
        };
    };
    findUnique<T extends RefreshSessionFindUniqueArgs>(args: Prisma.SelectSubset<T, RefreshSessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RefreshSessionClient<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RefreshSessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RefreshSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RefreshSessionClient<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RefreshSessionFindFirstArgs>(args?: Prisma.SelectSubset<T, RefreshSessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__RefreshSessionClient<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RefreshSessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RefreshSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RefreshSessionClient<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RefreshSessionFindManyArgs>(args?: Prisma.SelectSubset<T, RefreshSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RefreshSessionCreateArgs>(args: Prisma.SelectSubset<T, RefreshSessionCreateArgs<ExtArgs>>): Prisma.Prisma__RefreshSessionClient<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RefreshSessionCreateManyArgs>(args?: Prisma.SelectSubset<T, RefreshSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RefreshSessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RefreshSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RefreshSessionDeleteArgs>(args: Prisma.SelectSubset<T, RefreshSessionDeleteArgs<ExtArgs>>): Prisma.Prisma__RefreshSessionClient<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RefreshSessionUpdateArgs>(args: Prisma.SelectSubset<T, RefreshSessionUpdateArgs<ExtArgs>>): Prisma.Prisma__RefreshSessionClient<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RefreshSessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, RefreshSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RefreshSessionUpdateManyArgs>(args: Prisma.SelectSubset<T, RefreshSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RefreshSessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RefreshSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RefreshSessionUpsertArgs>(args: Prisma.SelectSubset<T, RefreshSessionUpsertArgs<ExtArgs>>): Prisma.Prisma__RefreshSessionClient<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RefreshSessionCountArgs>(args?: Prisma.Subset<T, RefreshSessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RefreshSessionCountAggregateOutputType> : number>;
    aggregate<T extends RefreshSessionAggregateArgs>(args: Prisma.Subset<T, RefreshSessionAggregateArgs>): Prisma.PrismaPromise<GetRefreshSessionAggregateType<T>>;
    groupBy<T extends RefreshSessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RefreshSessionGroupByArgs['orderBy'];
    } : {
        orderBy?: RefreshSessionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RefreshSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RefreshSessionFieldRefs;
}
export interface Prisma__RefreshSessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RefreshSessionFieldRefs {
    readonly id: Prisma.FieldRef<"RefreshSession", 'String'>;
    readonly userId: Prisma.FieldRef<"RefreshSession", 'String'>;
    readonly tokenHash: Prisma.FieldRef<"RefreshSession", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"RefreshSession", 'DateTime'>;
    readonly userAgent: Prisma.FieldRef<"RefreshSession", 'String'>;
    readonly ipAddress: Prisma.FieldRef<"RefreshSession", 'String'>;
    readonly createdAt: Prisma.FieldRef<"RefreshSession", 'DateTime'>;
}
export type RefreshSessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelect<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    include?: Prisma.RefreshSessionInclude<ExtArgs> | null;
    where: Prisma.RefreshSessionWhereUniqueInput;
};
export type RefreshSessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelect<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    include?: Prisma.RefreshSessionInclude<ExtArgs> | null;
    where: Prisma.RefreshSessionWhereUniqueInput;
};
export type RefreshSessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelect<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    include?: Prisma.RefreshSessionInclude<ExtArgs> | null;
    where?: Prisma.RefreshSessionWhereInput;
    orderBy?: Prisma.RefreshSessionOrderByWithRelationInput | Prisma.RefreshSessionOrderByWithRelationInput[];
    cursor?: Prisma.RefreshSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefreshSessionScalarFieldEnum | Prisma.RefreshSessionScalarFieldEnum[];
};
export type RefreshSessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelect<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    include?: Prisma.RefreshSessionInclude<ExtArgs> | null;
    where?: Prisma.RefreshSessionWhereInput;
    orderBy?: Prisma.RefreshSessionOrderByWithRelationInput | Prisma.RefreshSessionOrderByWithRelationInput[];
    cursor?: Prisma.RefreshSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefreshSessionScalarFieldEnum | Prisma.RefreshSessionScalarFieldEnum[];
};
export type RefreshSessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelect<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    include?: Prisma.RefreshSessionInclude<ExtArgs> | null;
    where?: Prisma.RefreshSessionWhereInput;
    orderBy?: Prisma.RefreshSessionOrderByWithRelationInput | Prisma.RefreshSessionOrderByWithRelationInput[];
    cursor?: Prisma.RefreshSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefreshSessionScalarFieldEnum | Prisma.RefreshSessionScalarFieldEnum[];
};
export type RefreshSessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelect<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    include?: Prisma.RefreshSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefreshSessionCreateInput, Prisma.RefreshSessionUncheckedCreateInput>;
};
export type RefreshSessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RefreshSessionCreateManyInput | Prisma.RefreshSessionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RefreshSessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    data: Prisma.RefreshSessionCreateManyInput | Prisma.RefreshSessionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RefreshSessionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RefreshSessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelect<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    include?: Prisma.RefreshSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefreshSessionUpdateInput, Prisma.RefreshSessionUncheckedUpdateInput>;
    where: Prisma.RefreshSessionWhereUniqueInput;
};
export type RefreshSessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RefreshSessionUpdateManyMutationInput, Prisma.RefreshSessionUncheckedUpdateManyInput>;
    where?: Prisma.RefreshSessionWhereInput;
    limit?: number;
};
export type RefreshSessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefreshSessionUpdateManyMutationInput, Prisma.RefreshSessionUncheckedUpdateManyInput>;
    where?: Prisma.RefreshSessionWhereInput;
    limit?: number;
    include?: Prisma.RefreshSessionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RefreshSessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelect<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    include?: Prisma.RefreshSessionInclude<ExtArgs> | null;
    where: Prisma.RefreshSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefreshSessionCreateInput, Prisma.RefreshSessionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RefreshSessionUpdateInput, Prisma.RefreshSessionUncheckedUpdateInput>;
};
export type RefreshSessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelect<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    include?: Prisma.RefreshSessionInclude<ExtArgs> | null;
    where: Prisma.RefreshSessionWhereUniqueInput;
};
export type RefreshSessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshSessionWhereInput;
    limit?: number;
};
export type RefreshSessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelect<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    include?: Prisma.RefreshSessionInclude<ExtArgs> | null;
};
