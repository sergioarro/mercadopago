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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetItemInput } from '@/presentation/rest/inputs/get-item-input.dto';
import { SearchItemsInput } from '@/presentation/rest/inputs/search-items-input.dto';

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
  async getItem(@Param() params: GetItemInput): Promise<ItemResponseDto> {
    const itemDto = await this.getItemUseCase.execute(params.id);

    if (!itemDto) {
      throw new NotFoundException(`Item with ID ${params.id} not found`);
    }

    return itemDto;
  }

  @Get()
  @ApiOperation({ summary: 'Search items by query' })
  @ApiOkResponse({
    description: 'The search results are successfully retrieved.',
    type: SearchResponseDto,
  })
  async searchItems(
    @Query() query: SearchItemsInput,
  ): Promise<SearchResponseDto> {
    return this.searchItemsUseCase.execute(query.q, query.limit || 4);
  }
}
