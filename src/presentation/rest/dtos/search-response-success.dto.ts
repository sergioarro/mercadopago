import { ApiProperty } from '@nestjs/swagger';
import { ItemResponseDto } from './item-response-success.dto';
import { AuthorDto } from './author.dto';

export class SearchResponseDto {
  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;

  @ApiProperty({
    example: ['category1', 'category2', 'category3'],
  })
  categories: string[];

  @ApiProperty({ type: [ItemResponseDto] })
  items: ItemResponseDto[];

  constructor(
    author: AuthorDto,
    categories: string[],
    items: ItemResponseDto[],
  ) {
    this.author = author;
    this.categories = categories;
    this.items = items;
  }
}
