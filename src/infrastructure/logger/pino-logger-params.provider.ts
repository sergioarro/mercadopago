import { ConfigService } from '@nestjs/config';
import type { LoggerModuleAsyncParams, Params } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';
import type { IncomingMessage } from 'http';
import type { Options as PinoHttpOptions } from 'pino-http';

const SLET_HEADERS = {
  CORRELATION_ID: 'x-slet-correlation-id',
} as const;

export const loggerFactoryParams: LoggerModuleAsyncParams = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService): Params => {
    const pinoHttpOptions: PinoHttpOptions = {
      autoLogging: {
        ignore: (req: IncomingMessage) => {
          return req.url === '/health';
        },
      },
      customProps: (req) => ({
        correlationId: req.id,
      }),
      genReqId: (req: IncomingMessage): string => {
        const correlationId = req.headers[SLET_HEADERS.CORRELATION_ID] as
          | string
          | undefined;
        return correlationId || uuidv4();
      },
      level: configService.get<string>('LOG_LEVEL', 'info'),
      redact: ['req.headers.authorization'],
      transport:
        configService.get<string>('NODE_ENV') === 'development'
          ? {
              options: {
                colorize: true,
                ignore: 'pid,hostname',
                singleLine: false,
                translateTime: true,
              },
              target: 'pino-pretty',
            }
          : undefined,
    };

    return { pinoHttp: pinoHttpOptions };
  },
};
