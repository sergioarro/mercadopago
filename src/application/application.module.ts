import { Module } from '@nestjs/common';
import { HealthUseCase } from './use-cases/health.use-case';

@Module({
  exports: [HealthUseCase],
  providers: [HealthUseCase],
})
export class ApplicationModule {}
