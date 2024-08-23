import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerFactoryParams } from './infrastructure/logger/pino-logger-params.provider';
import { ApplicationModule } from './application/application.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    PresentationModule,
    ApplicationModule,
    LoggerModule.forRootAsync(loggerFactoryParams),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
