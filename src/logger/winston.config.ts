import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';

export const winstonTransports = [
  new transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      nestWinstonModuleUtilities.format.nestLike('CS101-API', {
        prettyPrint: true,
      }),
    ),
  }),
];