import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MercadoLibreItemService } from './mercadolibre-item.service';
import { ItemMapper } from '@/infrastructure/mercadolibre/mappers/item.mapper';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [MercadoLibreItemService, ItemMapper],
  exports: [MercadoLibreItemService, ItemMapper],
})
export class MercadoLibreModule {}
