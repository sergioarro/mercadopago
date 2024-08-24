import { Injectable } from '@nestjs/common';
import { Item } from '@/domain/entities/item.entity';
import { MeliItem } from '@/infrastructure/mercadolibre/mercadolibre-item.types';

@Injectable()
export class ItemMapper {
  toDomain(itemData: MeliItem): Item {
    return new Item(
      itemData.id,
      itemData.title,
      {
        currency: itemData.currency_id,
        amount: Math.floor(itemData.price),
        decimals: Math.round((itemData.price % 1) * 100),
      },
      itemData.thumbnail,
      itemData.condition,
      itemData.shipping.free_shipping,
    );
  }
}
