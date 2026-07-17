import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole, UserStatus } from '../generated/prisma/client.js';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    createUser(data: {
        email: string;
        passwordHash: string;
        firstName?: string;
        lastName?: string;
        role?: UserRole;
        status?: UserStatus;
    }): Promise<User>;
    updateUserStatus(id: string, status: UserStatus): Promise<User>;
    updatePasswordHash(id: string, passwordHash: string): Promise<User>;
}
