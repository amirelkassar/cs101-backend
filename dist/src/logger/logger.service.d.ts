import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class LoggerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private write;
    info(message: string, context?: Prisma.InputJsonValue): Promise<void>;
    error(message: string, context?: Prisma.InputJsonValue): Promise<void>;
    warn(message: string, context?: Prisma.InputJsonValue): Promise<void>;
    debug(message: string, context?: Prisma.InputJsonValue): Promise<void>;
}
