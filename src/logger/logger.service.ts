import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, $Enums } from '@prisma/client';

@Injectable()
export class LoggerService {
  constructor(private readonly prisma: PrismaService) {}

  private async write(level: $Enums.LogLevel, message: string, context?: Prisma.InputJsonValue): Promise<void> {
    // Always log to console
    const ctxStr = typeof context !== 'undefined' ? ` ${JSON.stringify(context)}` : '';
    switch (level) {
      case 'ERROR':
        console.error(`[${level}] ${message}${ctxStr}`);
        break;
      case 'WARN':
        console.warn(`[${level}] ${message}${ctxStr}`);
        break;
      default:
        console.log(`[${level}] ${message}${ctxStr}`);
    }

    try {
      await this.prisma.log.create({ data: { level, message, context: context ?? undefined } });
    } catch (err: any) {
      const code = err?.code ?? 'UNKNOWN';
      const msg = err?.message ?? 'Unspecified error';
      // Fallback: avoid crashing when Mongo is not a replica set (P2031)
      console.warn(`[logger-db-fallback] ${level}: ${message} (code=${code}) - ${msg}`);
    }
  }

  async info(message: string, context?: Prisma.InputJsonValue): Promise<void> {
    await this.write('INFO' as $Enums.LogLevel, message, context);
  }

  async error(message: string, context?: Prisma.InputJsonValue): Promise<void> {
    await this.write('ERROR' as $Enums.LogLevel, message, context);
  }

  async warn(message: string, context?: Prisma.InputJsonValue): Promise<void> {
    await this.write('WARN' as $Enums.LogLevel, message, context);
  }

  async debug(message: string, context?: Prisma.InputJsonValue): Promise<void> {
    // Debug is not persisted (enum doesn't include DEBUG); log to console only
    const ctxStr = typeof context !== 'undefined' ? ` ${JSON.stringify(context)}` : '';
    console.debug(`[DEBUG] ${message}${ctxStr}`);
  }
}