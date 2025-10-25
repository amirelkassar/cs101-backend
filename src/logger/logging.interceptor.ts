import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    const start = Date.now();

    void this.logger.info(`Incoming ${method} ${url}`, { method, url });

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;
          void this.logger.info(`Completed ${method} ${url} in ${duration}ms`, { method, url, duration });
        },
        error: (err) => {
          const duration = Date.now() - start;
          void this.logger.error(`Error ${method} ${url} after ${duration}ms: ${err?.message}`);
        },
      }),
    );
  }
}