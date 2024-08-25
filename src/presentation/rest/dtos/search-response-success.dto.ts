import { ApiProperty } from '@nestjs/swagger';

class PriceDto {
  @ApiProperty({ example: 'CLP' })
  currency: string;

  @ApiProperty({ example: 100 })
  amount: number;

  @ApiProperty({ example: 99 })
  decimals: number;

  constructor(currency: string, amount: number, decimals: number) {
    this.currency = currency;
    this.amount = amount;
    this.decimals = decimals;
  }
}

class ItemResponseDto {
  @ApiProperty({ example: 'MLA123456' })
  id: string;

  @ApiProperty({ example: 'Example Item' })
  title: string;

  @ApiProperty({ type: PriceDto })
  price: PriceDto;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  picture: string;

  @ApiProperty({ example: 'new' })
  condition: string;

  @ApiProperty({ example: true })
  freeShipping: boolean;

  constructor(
    id: string,
    title: string,
    price: PriceDto,
    picture: string,
    condition: string,
    freeShipping: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.freeShipping = freeShipping;
  }
}

class SearchResponseDto {
  @ApiProperty({
    example: ['category1', 'category2', 'category3'],
  })
  categories: string[];

  @ApiProperty({ type: [ItemResponseDto] })
  items: ItemResponseDto[];

  constructor(categories: string[], items: ItemResponseDto[]) {
    this.categories = categories;
    this.items = items;
  }
}

// prettier-ignore
export { 
  PriceDto, 
  ItemResponseDto, 
  SearchResponseDto 
};
