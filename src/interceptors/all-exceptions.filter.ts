import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException ? (exception.getResponse() as any)?.message ?? exception.message : 'Internal server error';

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