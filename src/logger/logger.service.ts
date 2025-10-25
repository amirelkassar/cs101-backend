import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LoggerService {
  constructor(private readonly prisma: PrismaService) {}

  private async write(level: string, message: string, context?: Prisma.InputJsonValue): Promise<void> {
    try {
      await this.prisma.log.create({ data: { level, message, context: context ?? undefined } });
    } catch (err: any) {
      const code = err?.code ?? 'UNKNOWN';
      // Fallback: avoid crashing when Mongo is not a replica set (P2031)
      console.warn(`[logger-db-fallback] ${level}: ${message} (code=${code})`);
    }
  }

  async info(message: string, context?: Prisma.InputJsonValue): Promise<void> {
    await this.write('info', message, context);
  }

  async error(message: string, context?: Prisma.InputJsonValue): Promise<void> {
    await this.write('error', message, context);
  }

  async warn(message: string, context?: Prisma.InputJsonValue): Promise<void> {
    await this.write('warn', message, context);
  }

  async debug(message: string, context?: Prisma.InputJsonValue): Promise<void> {
    await this.write('debug', message, context);
  }
}