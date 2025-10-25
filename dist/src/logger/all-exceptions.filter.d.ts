import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { LoggerService } from './logger.service';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: LoggerService);
    catch(exception: unknown, host: ArgumentsHost): void;
}
