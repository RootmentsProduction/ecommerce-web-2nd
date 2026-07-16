import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EmailOtpModel = runtime.Types.Result.DefaultSelection<Prisma.$EmailOtpPayload>;
export type AggregateEmailOtp = {
    _count: EmailOtpCountAggregateOutputType | null;
    _avg: EmailOtpAvgAggregateOutputType | null;
    _sum: EmailOtpSumAggregateOutputType | null;
    _min: EmailOtpMinAggregateOutputType | null;
    _max: EmailOtpMaxAggregateOutputType | null;
};
export type EmailOtpAvgAggregateOutputType = {
    attempts: number | null;
};
export type EmailOtpSumAggregateOutputType = {
    attempts: number | null;
};
export type EmailOtpMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    otpHash: string | null;
    purpose: $Enums.OtpPurpose | null;
    expiresAt: Date | null;
    attempts: number | null;
    createdAt: Date | null;
};
export type EmailOtpMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    otpHash: string | null;
    purpose: $Enums.OtpPurpose | null;
    expiresAt: Date | null;
    attempts: number | null;
    createdAt: Date | null;
};
export type EmailOtpCountAggregateOutputType = {
    id: number;
    userId: number;
    otpHash: number;
    purpose: number;
    expiresAt: number;
    attempts: number;
    createdAt: number;
    _all: number;
};
export type EmailOtpAvgAggregateInputType = {
    attempts?: true;
};
export type EmailOtpSumAggregateInputType = {
    attempts?: true;
};
export type EmailOtpMinAggregateInputType = {
    id?: true;
    userId?: true;
    otpHash?: true;
    purpose?: true;
    expiresAt?: true;
    attempts?: true;
    createdAt?: true;
};
export type EmailOtpMaxAggregateInputType = {
    id?: true;
    userId?: true;
    otpHash?: true;
    purpose?: true;
    expiresAt?: true;
    attempts?: true;
    createdAt?: true;
};
export type EmailOtpCountAggregateInputType = {
    id?: true;
    userId?: true;
    otpHash?: true;
    purpose?: true;
    expiresAt?: true;
    attempts?: true;
    createdAt?: true;
    _all?: true;
};
export type EmailOtpAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailOtpWhereInput;
    orderBy?: Prisma.EmailOtpOrderByWithRelationInput | Prisma.EmailOtpOrderByWithRelationInput[];
    cursor?: Prisma.EmailOtpWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EmailOtpCountAggregateInputType;
    _avg?: EmailOtpAvgAggregateInputType;
    _sum?: EmailOtpSumAggregateInputType;
    _min?: EmailOtpMinAggregateInputType;
    _max?: EmailOtpMaxAggregateInputType;
};
export type GetEmailOtpAggregateType<T extends EmailOtpAggregateArgs> = {
    [P in keyof T & keyof AggregateEmailOtp]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEmailOtp[P]> : Prisma.GetScalarType<T[P], AggregateEmailOtp[P]>;
};
export type EmailOtpGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailOtpWhereInput;
    orderBy?: Prisma.EmailOtpOrderByWithAggregationInput | Prisma.EmailOtpOrderByWithAggregationInput[];
    by: Prisma.EmailOtpScalarFieldEnum[] | Prisma.EmailOtpScalarFieldEnum;
    having?: Prisma.EmailOtpScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EmailOtpCountAggregateInputType | true;
    _avg?: EmailOtpAvgAggregateInputType;
    _sum?: EmailOtpSumAggregateInputType;
    _min?: EmailOtpMinAggregateInputType;
    _max?: EmailOtpMaxAggregateInputType;
};
export type EmailOtpGroupByOutputType = {
    id: string;
    userId: string;
    otpHash: string;
    purpose: $Enums.OtpPurpose;
    expiresAt: Date;
    attempts: number;
    createdAt: Date;
    _count: EmailOtpCountAggregateOutputType | null;
    _avg: EmailOtpAvgAggregateOutputType | null;
    _sum: EmailOtpSumAggregateOutputType | null;
    _min: EmailOtpMinAggregateOutputType | null;
    _max: EmailOtpMaxAggregateOutputType | null;
};
export type GetEmailOtpGroupByPayload<T extends EmailOtpGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EmailOtpGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EmailOtpGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EmailOtpGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EmailOtpGroupByOutputType[P]>;
}>>;
export type EmailOtpWhereInput = {
    AND?: Prisma.EmailOtpWhereInput | Prisma.EmailOtpWhereInput[];
    OR?: Prisma.EmailOtpWhereInput[];
    NOT?: Prisma.EmailOtpWhereInput | Prisma.EmailOtpWhereInput[];
    id?: Prisma.StringFilter<"EmailOtp"> | string;
    userId?: Prisma.StringFilter<"EmailOtp"> | string;
    otpHash?: Prisma.StringFilter<"EmailOtp"> | string;
    purpose?: Prisma.EnumOtpPurposeFilter<"EmailOtp"> | $Enums.OtpPurpose;
    expiresAt?: Prisma.DateTimeFilter<"EmailOtp"> | Date | string;
    attempts?: Prisma.IntFilter<"EmailOtp"> | number;
    createdAt?: Prisma.DateTimeFilter<"EmailOtp"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type EmailOtpOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otpHash?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type EmailOtpWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.EmailOtpWhereInput | Prisma.EmailOtpWhereInput[];
    OR?: Prisma.EmailOtpWhereInput[];
    NOT?: Prisma.EmailOtpWhereInput | Prisma.EmailOtpWhereInput[];
    userId?: Prisma.StringFilter<"EmailOtp"> | string;
    otpHash?: Prisma.StringFilter<"EmailOtp"> | string;
    purpose?: Prisma.EnumOtpPurposeFilter<"EmailOtp"> | $Enums.OtpPurpose;
    expiresAt?: Prisma.DateTimeFilter<"EmailOtp"> | Date | string;
    attempts?: Prisma.IntFilter<"EmailOtp"> | number;
    createdAt?: Prisma.DateTimeFilter<"EmailOtp"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type EmailOtpOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otpHash?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.EmailOtpCountOrderByAggregateInput;
    _avg?: Prisma.EmailOtpAvgOrderByAggregateInput;
    _max?: Prisma.EmailOtpMaxOrderByAggregateInput;
    _min?: Prisma.EmailOtpMinOrderByAggregateInput;
    _sum?: Prisma.EmailOtpSumOrderByAggregateInput;
};
export type EmailOtpScalarWhereWithAggregatesInput = {
    AND?: Prisma.EmailOtpScalarWhereWithAggregatesInput | Prisma.EmailOtpScalarWhereWithAggregatesInput[];
    OR?: Prisma.EmailOtpScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EmailOtpScalarWhereWithAggregatesInput | Prisma.EmailOtpScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EmailOtp"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"EmailOtp"> | string;
    otpHash?: Prisma.StringWithAggregatesFilter<"EmailOtp"> | string;
    purpose?: Prisma.EnumOtpPurposeWithAggregatesFilter<"EmailOtp"> | $Enums.OtpPurpose;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"EmailOtp"> | Date | string;
    attempts?: Prisma.IntWithAggregatesFilter<"EmailOtp"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EmailOtp"> | Date | string;
};
export type EmailOtpCreateInput = {
    id?: string;
    otpHash: string;
    purpose: $Enums.OtpPurpose;
    expiresAt: Date | string;
    attempts?: number;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutOtpsInput;
};
export type EmailOtpUncheckedCreateInput = {
    id?: string;
    userId: string;
    otpHash: string;
    purpose: $Enums.OtpPurpose;
    expiresAt: Date | string;
    attempts?: number;
    createdAt?: Date | string;
};
export type EmailOtpUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutOtpsNestedInput;
};
export type EmailOtpUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOtpCreateManyInput = {
    id?: string;
    userId: string;
    otpHash: string;
    purpose: $Enums.OtpPurpose;
    expiresAt: Date | string;
    attempts?: number;
    createdAt?: Date | string;
};
export type EmailOtpUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOtpUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOtpListRelationFilter = {
    every?: Prisma.EmailOtpWhereInput;
    some?: Prisma.EmailOtpWhereInput;
    none?: Prisma.EmailOtpWhereInput;
};
export type EmailOtpOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EmailOtpCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otpHash?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailOtpAvgOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type EmailOtpMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otpHash?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailOtpMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otpHash?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailOtpSumOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type EmailOtpCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EmailOtpCreateWithoutUserInput, Prisma.EmailOtpUncheckedCreateWithoutUserInput> | Prisma.EmailOtpCreateWithoutUserInput[] | Prisma.EmailOtpUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailOtpCreateOrConnectWithoutUserInput | Prisma.EmailOtpCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EmailOtpCreateManyUserInputEnvelope;
    connect?: Prisma.EmailOtpWhereUniqueInput | Prisma.EmailOtpWhereUniqueInput[];
};
export type EmailOtpUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EmailOtpCreateWithoutUserInput, Prisma.EmailOtpUncheckedCreateWithoutUserInput> | Prisma.EmailOtpCreateWithoutUserInput[] | Prisma.EmailOtpUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailOtpCreateOrConnectWithoutUserInput | Prisma.EmailOtpCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EmailOtpCreateManyUserInputEnvelope;
    connect?: Prisma.EmailOtpWhereUniqueInput | Prisma.EmailOtpWhereUniqueInput[];
};
export type EmailOtpUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EmailOtpCreateWithoutUserInput, Prisma.EmailOtpUncheckedCreateWithoutUserInput> | Prisma.EmailOtpCreateWithoutUserInput[] | Prisma.EmailOtpUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailOtpCreateOrConnectWithoutUserInput | Prisma.EmailOtpCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EmailOtpUpsertWithWhereUniqueWithoutUserInput | Prisma.EmailOtpUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EmailOtpCreateManyUserInputEnvelope;
    set?: Prisma.EmailOtpWhereUniqueInput | Prisma.EmailOtpWhereUniqueInput[];
    disconnect?: Prisma.EmailOtpWhereUniqueInput | Prisma.EmailOtpWhereUniqueInput[];
    delete?: Prisma.EmailOtpWhereUniqueInput | Prisma.EmailOtpWhereUniqueInput[];
    connect?: Prisma.EmailOtpWhereUniqueInput | Prisma.EmailOtpWhereUniqueInput[];
    update?: Prisma.EmailOtpUpdateWithWhereUniqueWithoutUserInput | Prisma.EmailOtpUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EmailOtpUpdateManyWithWhereWithoutUserInput | Prisma.EmailOtpUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EmailOtpScalarWhereInput | Prisma.EmailOtpScalarWhereInput[];
};
export type EmailOtpUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EmailOtpCreateWithoutUserInput, Prisma.EmailOtpUncheckedCreateWithoutUserInput> | Prisma.EmailOtpCreateWithoutUserInput[] | Prisma.EmailOtpUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailOtpCreateOrConnectWithoutUserInput | Prisma.EmailOtpCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EmailOtpUpsertWithWhereUniqueWithoutUserInput | Prisma.EmailOtpUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EmailOtpCreateManyUserInputEnvelope;
    set?: Prisma.EmailOtpWhereUniqueInput | Prisma.EmailOtpWhereUniqueInput[];
    disconnect?: Prisma.EmailOtpWhereUniqueInput | Prisma.EmailOtpWhereUniqueInput[];
    delete?: Prisma.EmailOtpWhereUniqueInput | Prisma.EmailOtpWhereUniqueInput[];
    connect?: Prisma.EmailOtpWhereUniqueInput | Prisma.EmailOtpWhereUniqueInput[];
    update?: Prisma.EmailOtpUpdateWithWhereUniqueWithoutUserInput | Prisma.EmailOtpUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EmailOtpUpdateManyWithWhereWithoutUserInput | Prisma.EmailOtpUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EmailOtpScalarWhereInput | Prisma.EmailOtpScalarWhereInput[];
};
export type EnumOtpPurposeFieldUpdateOperationsInput = {
    set?: $Enums.OtpPurpose;
};
export type EmailOtpCreateWithoutUserInput = {
    id?: string;
    otpHash: string;
    purpose: $Enums.OtpPurpose;
    expiresAt: Date | string;
    attempts?: number;
    createdAt?: Date | string;
};
export type EmailOtpUncheckedCreateWithoutUserInput = {
    id?: string;
    otpHash: string;
    purpose: $Enums.OtpPurpose;
    expiresAt: Date | string;
    attempts?: number;
    createdAt?: Date | string;
};
export type EmailOtpCreateOrConnectWithoutUserInput = {
    where: Prisma.EmailOtpWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailOtpCreateWithoutUserInput, Prisma.EmailOtpUncheckedCreateWithoutUserInput>;
};
export type EmailOtpCreateManyUserInputEnvelope = {
    data: Prisma.EmailOtpCreateManyUserInput | Prisma.EmailOtpCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type EmailOtpUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.EmailOtpWhereUniqueInput;
    update: Prisma.XOR<Prisma.EmailOtpUpdateWithoutUserInput, Prisma.EmailOtpUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.EmailOtpCreateWithoutUserInput, Prisma.EmailOtpUncheckedCreateWithoutUserInput>;
};
export type EmailOtpUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.EmailOtpWhereUniqueInput;
    data: Prisma.XOR<Prisma.EmailOtpUpdateWithoutUserInput, Prisma.EmailOtpUncheckedUpdateWithoutUserInput>;
};
export type EmailOtpUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.EmailOtpScalarWhereInput;
    data: Prisma.XOR<Prisma.EmailOtpUpdateManyMutationInput, Prisma.EmailOtpUncheckedUpdateManyWithoutUserInput>;
};
export type EmailOtpScalarWhereInput = {
    AND?: Prisma.EmailOtpScalarWhereInput | Prisma.EmailOtpScalarWhereInput[];
    OR?: Prisma.EmailOtpScalarWhereInput[];
    NOT?: Prisma.EmailOtpScalarWhereInput | Prisma.EmailOtpScalarWhereInput[];
    id?: Prisma.StringFilter<"EmailOtp"> | string;
    userId?: Prisma.StringFilter<"EmailOtp"> | string;
    otpHash?: Prisma.StringFilter<"EmailOtp"> | string;
    purpose?: Prisma.EnumOtpPurposeFilter<"EmailOtp"> | $Enums.OtpPurpose;
    expiresAt?: Prisma.DateTimeFilter<"EmailOtp"> | Date | string;
    attempts?: Prisma.IntFilter<"EmailOtp"> | number;
    createdAt?: Prisma.DateTimeFilter<"EmailOtp"> | Date | string;
};
export type EmailOtpCreateManyUserInput = {
    id?: string;
    otpHash: string;
    purpose: $Enums.OtpPurpose;
    expiresAt: Date | string;
    attempts?: number;
    createdAt?: Date | string;
};
export type EmailOtpUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOtpUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOtpUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOtpSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    otpHash?: boolean;
    purpose?: boolean;
    expiresAt?: boolean;
    attempts?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailOtp"]>;
export type EmailOtpSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    otpHash?: boolean;
    purpose?: boolean;
    expiresAt?: boolean;
    attempts?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailOtp"]>;
export type EmailOtpSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    otpHash?: boolean;
    purpose?: boolean;
    expiresAt?: boolean;
    attempts?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailOtp"]>;
export type EmailOtpSelectScalar = {
    id?: boolean;
    userId?: boolean;
    otpHash?: boolean;
    purpose?: boolean;
    expiresAt?: boolean;
    attempts?: boolean;
    createdAt?: boolean;
};
export type EmailOtpOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "otpHash" | "purpose" | "expiresAt" | "attempts" | "createdAt", ExtArgs["result"]["emailOtp"]>;
export type EmailOtpInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type EmailOtpIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type EmailOtpIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $EmailOtpPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EmailOtp";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        otpHash: string;
        purpose: $Enums.OtpPurpose;
        expiresAt: Date;
        attempts: number;
        createdAt: Date;
    }, ExtArgs["result"]["emailOtp"]>;
    composites: {};
};
export type EmailOtpGetPayload<S extends boolean | null | undefined | EmailOtpDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload, S>;
export type EmailOtpCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EmailOtpFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EmailOtpCountAggregateInputType | true;
};
export interface EmailOtpDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EmailOtp'];
        meta: {
            name: 'EmailOtp';
        };
    };
    findUnique<T extends EmailOtpFindUniqueArgs>(args: Prisma.SelectSubset<T, EmailOtpFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EmailOtpClient<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EmailOtpFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EmailOtpFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailOtpClient<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EmailOtpFindFirstArgs>(args?: Prisma.SelectSubset<T, EmailOtpFindFirstArgs<ExtArgs>>): Prisma.Prisma__EmailOtpClient<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EmailOtpFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EmailOtpFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailOtpClient<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EmailOtpFindManyArgs>(args?: Prisma.SelectSubset<T, EmailOtpFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EmailOtpCreateArgs>(args: Prisma.SelectSubset<T, EmailOtpCreateArgs<ExtArgs>>): Prisma.Prisma__EmailOtpClient<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EmailOtpCreateManyArgs>(args?: Prisma.SelectSubset<T, EmailOtpCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EmailOtpCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EmailOtpCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EmailOtpDeleteArgs>(args: Prisma.SelectSubset<T, EmailOtpDeleteArgs<ExtArgs>>): Prisma.Prisma__EmailOtpClient<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EmailOtpUpdateArgs>(args: Prisma.SelectSubset<T, EmailOtpUpdateArgs<ExtArgs>>): Prisma.Prisma__EmailOtpClient<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EmailOtpDeleteManyArgs>(args?: Prisma.SelectSubset<T, EmailOtpDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EmailOtpUpdateManyArgs>(args: Prisma.SelectSubset<T, EmailOtpUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EmailOtpUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EmailOtpUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EmailOtpUpsertArgs>(args: Prisma.SelectSubset<T, EmailOtpUpsertArgs<ExtArgs>>): Prisma.Prisma__EmailOtpClient<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EmailOtpCountArgs>(args?: Prisma.Subset<T, EmailOtpCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EmailOtpCountAggregateOutputType> : number>;
    aggregate<T extends EmailOtpAggregateArgs>(args: Prisma.Subset<T, EmailOtpAggregateArgs>): Prisma.PrismaPromise<GetEmailOtpAggregateType<T>>;
    groupBy<T extends EmailOtpGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EmailOtpGroupByArgs['orderBy'];
    } : {
        orderBy?: EmailOtpGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EmailOtpGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailOtpGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EmailOtpFieldRefs;
}
export interface Prisma__EmailOtpClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EmailOtpFieldRefs {
    readonly id: Prisma.FieldRef<"EmailOtp", 'String'>;
    readonly userId: Prisma.FieldRef<"EmailOtp", 'String'>;
    readonly otpHash: Prisma.FieldRef<"EmailOtp", 'String'>;
    readonly purpose: Prisma.FieldRef<"EmailOtp", 'OtpPurpose'>;
    readonly expiresAt: Prisma.FieldRef<"EmailOtp", 'DateTime'>;
    readonly attempts: Prisma.FieldRef<"EmailOtp", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"EmailOtp", 'DateTime'>;
}
export type EmailOtpFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelect<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    include?: Prisma.EmailOtpInclude<ExtArgs> | null;
    where: Prisma.EmailOtpWhereUniqueInput;
};
export type EmailOtpFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelect<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    include?: Prisma.EmailOtpInclude<ExtArgs> | null;
    where: Prisma.EmailOtpWhereUniqueInput;
};
export type EmailOtpFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelect<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    include?: Prisma.EmailOtpInclude<ExtArgs> | null;
    where?: Prisma.EmailOtpWhereInput;
    orderBy?: Prisma.EmailOtpOrderByWithRelationInput | Prisma.EmailOtpOrderByWithRelationInput[];
    cursor?: Prisma.EmailOtpWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailOtpScalarFieldEnum | Prisma.EmailOtpScalarFieldEnum[];
};
export type EmailOtpFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelect<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    include?: Prisma.EmailOtpInclude<ExtArgs> | null;
    where?: Prisma.EmailOtpWhereInput;
    orderBy?: Prisma.EmailOtpOrderByWithRelationInput | Prisma.EmailOtpOrderByWithRelationInput[];
    cursor?: Prisma.EmailOtpWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailOtpScalarFieldEnum | Prisma.EmailOtpScalarFieldEnum[];
};
export type EmailOtpFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelect<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    include?: Prisma.EmailOtpInclude<ExtArgs> | null;
    where?: Prisma.EmailOtpWhereInput;
    orderBy?: Prisma.EmailOtpOrderByWithRelationInput | Prisma.EmailOtpOrderByWithRelationInput[];
    cursor?: Prisma.EmailOtpWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailOtpScalarFieldEnum | Prisma.EmailOtpScalarFieldEnum[];
};
export type EmailOtpCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelect<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    include?: Prisma.EmailOtpInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailOtpCreateInput, Prisma.EmailOtpUncheckedCreateInput>;
};
export type EmailOtpCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EmailOtpCreateManyInput | Prisma.EmailOtpCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EmailOtpCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    data: Prisma.EmailOtpCreateManyInput | Prisma.EmailOtpCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.EmailOtpIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type EmailOtpUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelect<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    include?: Prisma.EmailOtpInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailOtpUpdateInput, Prisma.EmailOtpUncheckedUpdateInput>;
    where: Prisma.EmailOtpWhereUniqueInput;
};
export type EmailOtpUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EmailOtpUpdateManyMutationInput, Prisma.EmailOtpUncheckedUpdateManyInput>;
    where?: Prisma.EmailOtpWhereInput;
    limit?: number;
};
export type EmailOtpUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailOtpUpdateManyMutationInput, Prisma.EmailOtpUncheckedUpdateManyInput>;
    where?: Prisma.EmailOtpWhereInput;
    limit?: number;
    include?: Prisma.EmailOtpIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type EmailOtpUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelect<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    include?: Prisma.EmailOtpInclude<ExtArgs> | null;
    where: Prisma.EmailOtpWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailOtpCreateInput, Prisma.EmailOtpUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EmailOtpUpdateInput, Prisma.EmailOtpUncheckedUpdateInput>;
};
export type EmailOtpDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelect<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    include?: Prisma.EmailOtpInclude<ExtArgs> | null;
    where: Prisma.EmailOtpWhereUniqueInput;
};
export type EmailOtpDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailOtpWhereInput;
    limit?: number;
};
export type EmailOtpDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailOtpSelect<ExtArgs> | null;
    omit?: Prisma.EmailOtpOmit<ExtArgs> | null;
    include?: Prisma.EmailOtpInclude<ExtArgs> | null;
};
