import { Module } from '@nestjs/common';
import { HealthUseCase } from './use-cases/health.use-case';
import { DomainModule } from '@/domain/domain.module';
import { GetItemUseCase } from '@/application/use-cases/get-item.use-case';
import { ItemResponseMapper } from '@/application/mappers/item.mapper';

@Module({
  exports: [HealthUseCase, GetItemUseCase, ItemResponseMapper],
  providers: [HealthUseCase, GetItemUseCase, ItemResponseMapper],
  imports: [DomainModule],
})
export class ApplicationModule {}
