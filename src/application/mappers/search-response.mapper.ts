import { Injectable } from '@nestjs/common';
import { Item } from '@/domain/entities/item.entity';
import {
  SearchResponseDto,
  ItemResponseDto,
  PriceDto,
} from '@/presentation/rest/dtos/search-response-success.dto';

@Injectable()
export class SearchResponseMapper {
  toDto(items: Item[]): SearchResponseDto {
    const categories: string[] = [];
    const itemDtos = items.slice(0, 4).map((item: Item) => {
      return new ItemResponseDto(
        item.id,
        item.title,
        new PriceDto(
          item.price.currency,
          item.price.amount,
          item.price.decimals,
        ),
        item.picture,
        item.condition,
        item.freeShipping,
      );
    });

    return new SearchResponseDto(categories, itemDtos);
  }
}
