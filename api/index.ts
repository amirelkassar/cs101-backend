import type { IncomingMessage, ServerResponse } from 'http'
import serverlessExpress from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { WinstonModule } from 'nest-winston';
import { winstonTransports } from '../src/logger/winston.config';
import { LoggingInterceptor } from '../src/logger/logging.interceptor';
import { LoggerService } from '../src/logger/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from '../src/interceptors/all-exceptions.filter';
import { ResponseTransformInterceptor } from '../src/interceptors/response-transform.interceptor';
import { ZodValidationPipe } from 'nestjs-zod';

let cachedHandler: ReturnType<typeof serverlessExpress> | undefined;

async function bootstrapServer() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ transports: winstonTransports }),
  });

  const loggerService = app.get(LoggerService);

  app.useGlobalInterceptors(new LoggingInterceptor(loggerService));
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(loggerService));
  app.useGlobalPipes(new ZodValidationPipe());
  app.enableCors({ origin: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('CS101 API')
    .setDescription('API documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Important: on Vercel, this function is mounted at /api. The incoming
  // request path inside the function will have /api stripped. To serve
  // Swagger UI at https://<host>/api, mount it at '/' here.
  SwaggerModule.setup('/', app, document);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!cachedHandler) {
    cachedHandler = await bootstrapServer();
  }
  return cachedHandler(req, res);
}