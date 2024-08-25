import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchItemsInput {
  @ApiProperty({
    description: 'Query string to search items',
    example: 'laptop',
  })
  @IsString()
  q: string;

  @ApiProperty({
    description: 'Limit the number of items returned',
    example: 4,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 4;
}
