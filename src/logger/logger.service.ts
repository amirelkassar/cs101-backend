import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// Define local enum-like union so we don't depend on Prisma types
type LogLevel = 'INFO' | 'WARN' | 'ERROR';

@Injectable()
export class LoggerService {
  constructor(private readonly prisma: PrismaService) {}

  private async write(level: LogLevel, message: string, context?: unknown): Promise<void> {
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
      await this.prisma.log.create({ data: { level: level as any, message, context: (context as any) ?? undefined } });
    } catch (err: any) {
      const code = err?.code ?? 'UNKNOWN';
      const msg = err?.message ?? 'Unspecified error';
      // Fallback: avoid crashing when Mongo is not a replica set (P2031)
      console.warn(`[logger-db-fallback] ${level}: ${message} (code=${code}) - ${msg}`);
    }
  }

  async info(message: string, context?: unknown): Promise<void> {
    await this.write('INFO', message, context);
  }

  async error(message: string, context?: unknown): Promise<void> {
    await this.write('ERROR', message, context);
  }

  async warn(message: string, context?: unknown): Promise<void> {
    await this.write('WARN', message, context);
  }

  async debug(message: string, context?: unknown): Promise<void> {
    // Debug is not persisted (enum doesn't include DEBUG); log to console only
    const ctxStr = typeof context !== 'undefined' ? ` ${JSON.stringify(context)}` : '';
    console.debug(`[DEBUG] ${message}${ctxStr}`);
  }
}