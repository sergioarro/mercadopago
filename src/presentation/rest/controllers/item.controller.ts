import { GetItemUseCase } from '@/application/use-cases/get-item.use-case';
import { ItemResponseDto } from '@/presentation/rest/dtos/item-response-success.dto';
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('items')
@ApiTags('Items')
export class ItemController {
  constructor(private readonly getItemUseCase: GetItemUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get item details by ID' })
  @ApiOkResponse({
    description: 'The item details are successfully retrieved.',
    type: ItemResponseDto,
  })
  async getItem(@Param('id') id: string): Promise<ItemResponseDto> {
    const itemDto = await this.getItemUseCase.execute(id);

    if (!itemDto) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return itemDto;
  }
}
