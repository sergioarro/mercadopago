import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authorConfig from '../config/author.config';
import { Item } from '@/domain/entities/item.entity';
import { ItemResponseDto } from '@/presentation/rest/dtos/item-response-success.dto';
import { AuthorDto } from '@/presentation/rest/dtos/author.dto';
import { GetItemResponseDto } from '@/presentation/rest/dtos/get-item-response.dto';

@Injectable()
export class ItemResponseMapper {
  constructor(
    @Inject(authorConfig.KEY)
    private readonly authorConfiguration: ConfigType<typeof authorConfig>,
  ) {}

  toDto(item: Item): GetItemResponseDto {
    const author = new AuthorDto(
      this.authorConfiguration.name,
      this.authorConfiguration.lastname,
    );

    const itemDto = new ItemResponseDto(
      item.id,
      item.title,
      {
        currency: item.price.currency,
        amount: item.price.amount,
        decimals: item.price.decimals,
      },
      item.picture,
      item.condition,
      item.freeShipping,
      item.soldQuantity,
      item.description,
    );

    return new GetItemResponseDto(author, itemDto);
  }
}
