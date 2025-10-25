import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        const statusCode = res?.statusCode ?? 200;

        // Avoid double-wrapping if already formatted
        if (
          data && typeof data === 'object' &&
          'statusCode' in data && ('data' in data || 'errors' in data)
        ) {
          return data;
        }

        return {
          statusCode,
          message: statusCode >= 200 && statusCode < 300 ? 'OK' : 'Processed',
          errors: null,
          data,
        };
      }),
    );
  }
}