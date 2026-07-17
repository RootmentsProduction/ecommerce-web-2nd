import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    firstName: string | null;
    lastName: string | null;
    role: $Enums.UserRole | null;
    status: $Enums.UserStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    firstName: string | null;
    lastName: string | null;
    role: $Enums.UserRole | null;
    status: $Enums.UserStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    passwordHash: number;
    firstName: number;
    lastName: number;
    role: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    firstName?: true;
    lastName?: true;
    role?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    firstName?: true;
    lastName?: true;
    role?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    firstName?: true;
    lastName?: true;
    role?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string | null;
    lastName: string | null;
    role: $Enums.UserRole;
    status: $Enums.UserStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    firstName?: Prisma.StringNullableFilter<"User"> | string | null;
    lastName?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFilter<"User"> | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    otps?: Prisma.EmailOtpListRelationFilter;
    sessions?: Prisma.RefreshSessionListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    addresses?: Prisma.CustomerAddressListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    firstName?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastName?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    otps?: Prisma.EmailOtpOrderByRelationAggregateInput;
    sessions?: Prisma.RefreshSessionOrderByRelationAggregateInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
    addresses?: Prisma.CustomerAddressOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    passwordHash?: Prisma.StringFilter<"User"> | string;
    firstName?: Prisma.StringNullableFilter<"User"> | string | null;
    lastName?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFilter<"User"> | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    otps?: Prisma.EmailOtpListRelationFilter;
    sessions?: Prisma.RefreshSessionListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    addresses?: Prisma.CustomerAddressListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    firstName?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastName?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    firstName?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    lastName?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
    status?: Prisma.EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    otps?: Prisma.EmailOtpCreateNestedManyWithoutUserInput;
    sessions?: Prisma.RefreshSessionCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutCustomerInput;
    addresses?: Prisma.CustomerAddressCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    otps?: Prisma.EmailOtpUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.RefreshSessionUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutCustomerInput;
    addresses?: Prisma.CustomerAddressUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    otps?: Prisma.EmailOtpUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.RefreshSessionUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutCustomerNestedInput;
    addresses?: Prisma.CustomerAddressUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    otps?: Prisma.EmailOtpUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.RefreshSessionUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutCustomerNestedInput;
    addresses?: Prisma.CustomerAddressUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
};
export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus;
};
export type UserCreateNestedOneWithoutOtpsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOtpsInput, Prisma.UserUncheckedCreateWithoutOtpsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOtpsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOtpsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOtpsInput, Prisma.UserUncheckedCreateWithoutOtpsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOtpsInput;
    upsert?: Prisma.UserUpsertWithoutOtpsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOtpsInput, Prisma.UserUpdateWithoutOtpsInput>, Prisma.UserUncheckedUpdateWithoutOtpsInput>;
};
export type UserCreateNestedOneWithoutSessionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSessionsInput;
    upsert?: Prisma.UserUpsertWithoutSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput, Prisma.UserUpdateWithoutSessionsInput>, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
};
export type UserCreateNestedOneWithoutAddressesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAddressesInput, Prisma.UserUncheckedCreateWithoutAddressesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAddressesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAddressesInput, Prisma.UserUncheckedCreateWithoutAddressesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAddressesInput;
    upsert?: Prisma.UserUpsertWithoutAddressesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAddressesInput, Prisma.UserUpdateWithoutAddressesInput>, Prisma.UserUncheckedUpdateWithoutAddressesInput>;
};
export type UserCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.UserUpsertWithoutOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOrdersInput, Prisma.UserUpdateWithoutOrdersInput>, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
};
export type UserCreateWithoutOtpsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: Prisma.RefreshSessionCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutCustomerInput;
    addresses?: Prisma.CustomerAddressCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutOtpsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: Prisma.RefreshSessionUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutCustomerInput;
    addresses?: Prisma.CustomerAddressUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutOtpsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOtpsInput, Prisma.UserUncheckedCreateWithoutOtpsInput>;
};
export type UserUpsertWithoutOtpsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOtpsInput, Prisma.UserUncheckedUpdateWithoutOtpsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOtpsInput, Prisma.UserUncheckedCreateWithoutOtpsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOtpsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOtpsInput, Prisma.UserUncheckedUpdateWithoutOtpsInput>;
};
export type UserUpdateWithoutOtpsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: Prisma.RefreshSessionUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutCustomerNestedInput;
    addresses?: Prisma.CustomerAddressUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutOtpsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: Prisma.RefreshSessionUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutCustomerNestedInput;
    addresses?: Prisma.CustomerAddressUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    otps?: Prisma.EmailOtpCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutCustomerInput;
    addresses?: Prisma.CustomerAddressCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    otps?: Prisma.EmailOtpUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutCustomerInput;
    addresses?: Prisma.CustomerAddressUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutSessionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
};
export type UserUpsertWithoutSessionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSessionsInput, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSessionsInput, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
};
export type UserUpdateWithoutSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    otps?: Prisma.EmailOtpUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutCustomerNestedInput;
    addresses?: Prisma.CustomerAddressUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    otps?: Prisma.EmailOtpUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutCustomerNestedInput;
    addresses?: Prisma.CustomerAddressUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutAddressesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    otps?: Prisma.EmailOtpCreateNestedManyWithoutUserInput;
    sessions?: Prisma.RefreshSessionCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutCustomerInput;
};
export type UserUncheckedCreateWithoutAddressesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    otps?: Prisma.EmailOtpUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.RefreshSessionUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutCustomerInput;
};
export type UserCreateOrConnectWithoutAddressesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAddressesInput, Prisma.UserUncheckedCreateWithoutAddressesInput>;
};
export type UserUpsertWithoutAddressesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAddressesInput, Prisma.UserUncheckedUpdateWithoutAddressesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAddressesInput, Prisma.UserUncheckedCreateWithoutAddressesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAddressesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAddressesInput, Prisma.UserUncheckedUpdateWithoutAddressesInput>;
};
export type UserUpdateWithoutAddressesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    otps?: Prisma.EmailOtpUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.RefreshSessionUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutCustomerNestedInput;
};
export type UserUncheckedUpdateWithoutAddressesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    otps?: Prisma.EmailOtpUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.RefreshSessionUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutCustomerNestedInput;
};
export type UserCreateWithoutOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    otps?: Prisma.EmailOtpCreateNestedManyWithoutUserInput;
    sessions?: Prisma.RefreshSessionCreateNestedManyWithoutUserInput;
    addresses?: Prisma.CustomerAddressCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    otps?: Prisma.EmailOtpUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.RefreshSessionUncheckedCreateNestedManyWithoutUserInput;
    addresses?: Prisma.CustomerAddressUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
};
export type UserUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOrdersInput, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOrdersInput, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
};
export type UserUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    otps?: Prisma.EmailOtpUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.RefreshSessionUpdateManyWithoutUserNestedInput;
    addresses?: Prisma.CustomerAddressUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    otps?: Prisma.EmailOtpUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.RefreshSessionUncheckedUpdateManyWithoutUserNestedInput;
    addresses?: Prisma.CustomerAddressUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCountOutputType = {
    otps: number;
    sessions: number;
    orders: number;
    addresses: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    otps?: boolean | UserCountOutputTypeCountOtpsArgs;
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    orders?: boolean | UserCountOutputTypeCountOrdersArgs;
    addresses?: boolean | UserCountOutputTypeCountAddressesArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountOtpsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailOtpWhereInput;
};
export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshSessionWhereInput;
};
export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
export type UserCountOutputTypeCountAddressesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerAddressWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    role?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    otps?: boolean | Prisma.User$otpsArgs<ExtArgs>;
    sessions?: boolean | Prisma.User$sessionsArgs<ExtArgs>;
    orders?: boolean | Prisma.User$ordersArgs<ExtArgs>;
    addresses?: boolean | Prisma.User$addressesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    role?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    role?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    role?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "passwordHash" | "firstName" | "lastName" | "role" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    otps?: boolean | Prisma.User$otpsArgs<ExtArgs>;
    sessions?: boolean | Prisma.User$sessionsArgs<ExtArgs>;
    orders?: boolean | Prisma.User$ordersArgs<ExtArgs>;
    addresses?: boolean | Prisma.User$addressesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        otps: Prisma.$EmailOtpPayload<ExtArgs>[];
        sessions: Prisma.$RefreshSessionPayload<ExtArgs>[];
        orders: Prisma.$OrderPayload<ExtArgs>[];
        addresses: Prisma.$CustomerAddressPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        passwordHash: string;
        firstName: string | null;
        lastName: string | null;
        role: $Enums.UserRole;
        status: $Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    otps<T extends Prisma.User$otpsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$otpsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailOtpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sessions<T extends Prisma.User$sessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.User$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    addresses<T extends Prisma.User$addressesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly firstName: Prisma.FieldRef<"User", 'String'>;
    readonly lastName: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'UserRole'>;
    readonly status: Prisma.FieldRef<"User", 'UserStatus'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$otpsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$sessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderSelect<ExtArgs> | null;
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
export type User$addressesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
