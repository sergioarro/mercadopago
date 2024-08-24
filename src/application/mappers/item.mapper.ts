import { Injectable } from '@nestjs/common';
import { Item } from '@/domain/entities/item.entity';
import { ItemResponseDto } from '@/presentation/rest/dtos/item-response-success.dto';

@Injectable()
export class ItemResponseMapper {
  toDto(item: Item): ItemResponseDto {
    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.price.currency,
        amount: item.price.amount,
        decimals: item.price.decimals,
      },
      picture: item.picture,
      condition: item.condition,
      freeShipping: item.freeShipping,
      soldQuantity: item.soldQuantity,
      description: item.description,
    };
  }
}
