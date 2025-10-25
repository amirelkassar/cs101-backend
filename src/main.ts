import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonTransports } from './logger/winston.config';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { LoggerService } from './logger/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './interceptors/all-exceptions.filter';
import { ResponseTransformInterceptor } from './interceptors/response-transform.interceptor';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ transports: winstonTransports }),
  });

  const loggerService = app.get(LoggerService);

  app.useGlobalInterceptors(new LoggingInterceptor(loggerService));
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(loggerService));
  
  // Global Zod validation pipe for clearer, fluent validation
  app.useGlobalPipes(new ZodValidationPipe());

  app.enableCors({ origin: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('CS101 API')
    .setDescription('API documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = Number(process.env.PORT) || 3001;

  // On Vercel serverless, do not call listen(); just init the app.
  if (process.env.VERCEL) {
    await app.init();
    return;
  }

  await app.listen(port);
}
bootstrap();
