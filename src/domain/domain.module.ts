import { Module } from '@nestjs/common';
import { MercadoLibreItemService } from '../infrastructure/mercadolibre/mercadolibre-item.service';
import { ItemDomainService } from './services/item-domain.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ITEM_REPOSITORY } from '@/shared/constants';
import { MercadoLibreModule } from '@/infrastructure/mercadolibre/mercadolibre.module';

@Module({
  imports: [HttpModule, ConfigModule, MercadoLibreModule],
  providers: [
    {
      provide: ITEM_REPOSITORY,
      useClass: MercadoLibreItemService,
    },
    ItemDomainService,
  ],
  exports: [ItemDomainService, ITEM_REPOSITORY],
})
export class DomainModule {}
