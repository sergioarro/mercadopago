import { Module } from '@nestjs/common';
import { HealthUseCase } from './use-cases/health.use-case';
import { DomainModule } from '@/domain/domain.module';
import { GetItemUseCase } from '@/application/use-cases/get-item.use-case';
import { ItemResponseMapper } from '@/application/mappers/item.mapper';
import { SearchItemsUseCase } from '@/application/use-cases/search-items.use-case';
import { SearchResponseMapper } from '@/application/mappers/search-response.mapper';
import authorConfig from '@/application/config/author.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports: [HealthUseCase, GetItemUseCase, SearchItemsUseCase],
  providers: [
    HealthUseCase,
    GetItemUseCase,
    ItemResponseMapper,
    SearchItemsUseCase,
    SearchResponseMapper,
  ],
  imports: [DomainModule, ConfigModule.forFeature(authorConfig)],
})
export class ApplicationModule {}
