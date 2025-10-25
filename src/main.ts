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
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Create a single Express instance for both Nest adapter and Vercel export
const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), {
    logger: WinstonModule.createLogger({ transports: winstonTransports }),
  });

  const loggerService = app.get(LoggerService);

  // 🌐 Global middleware
  app.useGlobalInterceptors(new LoggingInterceptor(loggerService));
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(loggerService));
  app.useGlobalPipes(new ZodValidationPipe());
  app.enableCors({ origin: true });

  // 📘 Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CS101 API')
    .setDescription('API documentation')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // Default route: redirect to Swagger docs
  expressApp.get('/', (_req, res) => res.redirect('/docs'));

  await app.init();

  // 🟢 Local dev mode (run the server)
  if (!process.env.VERCEL) {
    const port = Number(process.env.PORT) || 3001;
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
  }
}

bootstrap();

// 🧩 Export Express server for Vercel
export default expressApp;
