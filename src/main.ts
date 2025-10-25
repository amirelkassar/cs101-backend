import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonTransports } from './logger/winston.config';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { AllExceptionsFilter } from './logger/all-exceptions.filter';
import { LoggerService } from './logger/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ transports: winstonTransports }),
  });

  const loggerService = app.get(LoggerService);

  app.useGlobalInterceptors(new LoggingInterceptor(loggerService));
  app.useGlobalFilters(new AllExceptionsFilter(loggerService));
  app.enableCors({ origin: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('CS101 API')
    .setDescription('API documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);
}
bootstrap();
