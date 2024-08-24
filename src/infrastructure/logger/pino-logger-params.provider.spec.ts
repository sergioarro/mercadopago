import type { ConfigService } from '@nestjs/config';
import type { Params } from 'nestjs-pino';
import type { Options } from 'pino-http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { loggerFactoryParams } from './pino-logger-params.provider';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('random-id'),
}));

describe('pino-logger-params.provider', () => {
  let configServiceMock: jest.Mocked<ConfigService>;

  beforeEach(() => {
    configServiceMock = {
      get: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>;
  });

  it('should generate correlation ID from request headers', () => {
    const correlationId = '12345';
    const req = {
      headers: {
        'x-slet-correlation-id': correlationId,
      },
    };

    const params = loggerFactoryParams.useFactory(configServiceMock) as Params;
    const generatedId = (params.pinoHttp as Options)?.genReqId?.(
      req as unknown as IncomingMessage,
      {} as ServerResponse,
    );

    expect(generatedId).toBe(correlationId);
  });

  it('should generate random correlation ID if header is not present', () => {
    const req = {
      headers: {},
    };

    const params = loggerFactoryParams.useFactory(configServiceMock) as Params;
    const generatedId = (params.pinoHttp as Options)?.genReqId?.(
      req as IncomingMessage,
      {} as ServerResponse,
    );

    expect(generatedId).toBe('random-id');
  });

  it('should add correlation ID to custom properties', () => {
    const req = {
      id: '12345',
    };

    const params = loggerFactoryParams.useFactory(configServiceMock) as Params;
    const customProps = (params.pinoHttp as Options)?.customProps?.(
      req as IncomingMessage,
      {} as ServerResponse,
    ) as {
      correlationId: string;
    };

    expect(customProps.correlationId).toBe(req.id);
  });

  it('should return pino-pretty transport options in development environment', () => {
    configServiceMock.get.mockReturnValue('development');

    const params = loggerFactoryParams.useFactory(configServiceMock) as Params;

    expect((params.pinoHttp as Options).transport).toEqual({
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        singleLine: false,
        translateTime: true,
      },
      target: 'pino-pretty',
    });
  });

  it('should not return pino-pretty transport options in non-development environment', () => {
    configServiceMock.get.mockReturnValue('production');

    const params = loggerFactoryParams.useFactory(configServiceMock) as Params;

    expect((params.pinoHttp as Options).transport).toBeUndefined();
  });

  it('should ignore logging for /health endpoint', () => {
    const req = {
      url: '/health',
    } as IncomingMessage;

    const params = loggerFactoryParams.useFactory(configServiceMock) as Params;
    const autoLogging = (params.pinoHttp as Options).autoLogging;

    expect(typeof autoLogging).toBe('object');
    expect(autoLogging).toHaveProperty('ignore');

    const shouldIgnore = (
      autoLogging as { ignore: (req: IncomingMessage) => boolean }
    ).ignore(req);
    expect(shouldIgnore).toBe(true);
  });

  it('should not ignore logging for other endpoints', () => {
    const req = {
      url: '/other-endpoint',
    } as IncomingMessage;

    const params = loggerFactoryParams.useFactory(configServiceMock) as Params;
    const autoLogging = (params.pinoHttp as Options).autoLogging;

    expect(typeof autoLogging).toBe('object');
    expect(autoLogging).toHaveProperty('ignore');

    const shouldIgnore = (
      autoLogging as { ignore: (req: IncomingMessage) => boolean }
    ).ignore(req);
    expect(shouldIgnore).toBe(false);
  });
});
