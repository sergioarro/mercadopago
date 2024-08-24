import { ApiProperty } from '@nestjs/swagger';

export class PriceDto {
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

export class ItemResponseDto {
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

  @ApiProperty({ example: 100, description: 'Quantity sold' })
  soldQuantity?: number;

  @ApiProperty({
    example: 'This is a great item',
    description: 'Item description',
  })
  description?: string;

  constructor(
    id: string,
    title: string,
    price: PriceDto,
    picture: string,
    condition: string,
    freeShipping: boolean,
    soldQuantity?: number,
    description?: string,
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.freeShipping = freeShipping;
    this.soldQuantity = soldQuantity;
    this.description = description;
  }
}
