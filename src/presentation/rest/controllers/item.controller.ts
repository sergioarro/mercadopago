import { GetItemUseCase } from '@/application/use-cases/get-item.use-case';
import { SearchItemsUseCase } from '@/application/use-cases/search-items.use-case';
import { ItemResponseDto } from '@/presentation/rest/dtos/item-response-success.dto';
import { SearchResponseDto } from '@/presentation/rest/dtos/search-response-success.dto';
import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('items')
@ApiTags('Items')
export class ItemController {
  constructor(
    private readonly getItemUseCase: GetItemUseCase,
    private readonly searchItemsUseCase: SearchItemsUseCase,
  ) {}

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

  @Get()
  @ApiOperation({ summary: 'Search items by query' })
  @ApiOkResponse({
    description: 'The search results are successfully retrieved.',
    type: SearchResponseDto,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit the number of items returned. Defaults to 4.',
    example: 4,
  })
  async searchItems(
    @Query('q') query: string,
    @Query('limit') limit = 4,
  ): Promise<SearchResponseDto> {
    return this.searchItemsUseCase.execute(query, limit);
  }
}
