import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const resp = exception.getResponse();
      const body = typeof resp === 'string' ? { message: resp } : (resp as any);
      const message = body?.message ?? exception.message;
      const errors = body?.errors ?? body?.issues ?? null;

      void this.logger.error(`Exception on ${request?.method} ${request?.url}: ${message}` , {
        exception: body,
        request: { method: request?.method, url: request?.url },
      });

      return response.status(status).json({
        statusCode: status,
        message,
        errors,
        data: null,
      });
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'Internal server error';

    const errors = exception instanceof Error
      ? { name: exception.name, message: exception.message, stack: exception.stack }
      : { value: String(exception) };

    void this.logger.error(`Exception on ${request?.method} ${request?.url}: ${message}`, {
      exception: errors,
      request: { method: request?.method, url: request?.url },
    });

    response.status(status).json({
      statusCode: status,
      message,
      errors,
      data: null,
    });
  }
}