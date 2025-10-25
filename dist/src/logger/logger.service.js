"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LoggerService = class LoggerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async write(level, message, context) {
        try {
            await this.prisma.log.create({ data: { level, message, context: context ?? undefined } });
        }
        catch (err) {
            const code = err?.code ?? 'UNKNOWN';
            console.warn(`[logger-db-fallback] ${level}: ${message} (code=${code})`);
        }
    }
    async info(message, context) {
        await this.write('info', message, context);
    }
    async error(message, context) {
        await this.write('error', message, context);
    }
    async warn(message, context) {
        await this.write('warn', message, context);
    }
    async debug(message, context) {
        await this.write('debug', message, context);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LoggerService);
//# sourceMappingURL=logger.service.js.map