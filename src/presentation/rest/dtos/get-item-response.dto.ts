import { ApiProperty } from '@nestjs/swagger';
import { ItemResponseDto } from './item-response-success.dto';
import { AuthorDto } from './author.dto';

export class GetItemResponseDto {
  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;

  @ApiProperty({ type: ItemResponseDto })
  item: ItemResponseDto;

  constructor(author: AuthorDto, item: ItemResponseDto) {
    this.author = author;
    this.item = item;
  }
}
