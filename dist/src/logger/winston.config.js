"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonTransports = void 0;
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
exports.winstonTransports = [
    new winston_1.transports.Console({
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.colorize(), nest_winston_1.utilities.format.nestLike('CS101-API', {
            prettyPrint: true,
        })),
    }),
];
//# sourceMappingURL=winston.config.js.map