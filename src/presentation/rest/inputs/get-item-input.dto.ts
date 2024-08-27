import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetItemInput {
  @ApiProperty({
    description: 'The ID of the item to retrieve',
    example: 'MLA1809751984',
  })
  @IsString()
  id: string;
}
