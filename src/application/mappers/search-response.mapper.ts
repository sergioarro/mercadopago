import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authorConfig from '../config/author.config';
import { Item } from '@/domain/entities/item.entity';
import { AuthorDto } from '@/presentation/rest/dtos/author.dto';
import {
  ItemResponseDto,
  PriceDto,
} from '@/presentation/rest/dtos/item-response-success.dto';
import { SearchResponseDto } from '@/presentation/rest/dtos/search-response-success.dto';

@Injectable()
export class SearchResponseMapper {
  constructor(
    @Inject(authorConfig.KEY)
    private readonly authorConfiguration: ConfigType<typeof authorConfig>,
  ) {}

  toDto(items: Item[], categories: string[]): SearchResponseDto {
    const author = new AuthorDto(
      this.authorConfiguration.name,
      this.authorConfiguration.lastname,
    );

    const itemDtos = items.map((item: Item) => {
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
        item.soldQuantity,
        item.description,
      );
    });

    return new SearchResponseDto(author, categories, itemDtos);
  }
}
