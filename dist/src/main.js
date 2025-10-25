"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const nest_winston_1 = require("nest-winston");
const winston_config_1 = require("./logger/winston.config");
const logging_interceptor_1 = require("./logger/logging.interceptor");
const logger_service_1 = require("./logger/logger.service");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("./interceptors/all-exceptions.filter");
const response_transform_interceptor_1 = require("./interceptors/response-transform.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger({ transports: winston_config_1.winstonTransports }),
    });
    const loggerService = app.get(logger_service_1.LoggerService);
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(loggerService));
    app.useGlobalInterceptors(new response_transform_interceptor_1.ResponseTransformInterceptor());
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(loggerService));
    app.enableCors({ origin: true });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('CS101 API')
        .setDescription('API documentation')
        .setVersion('1.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = Number(process.env.PORT) || 3001;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map