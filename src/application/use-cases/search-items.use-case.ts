import { Inject, Injectable, Logger } from '@nestjs/common';
import { ITEM_REPOSITORY } from '@/shared/constants';
import { SearchResponseDto } from '@/presentation/rest/dtos/search-response-success.dto';
import { SearchResponseMapper } from '@/application/mappers/search-response.mapper';
import { ItemService } from '@/domain/interfaces/item.service.interface';

@Injectable()
export class SearchItemsUseCase {
  private readonly logger = new Logger(SearchItemsUseCase.name);

  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly itemService: ItemService,
    private readonly searchResponseMapper: SearchResponseMapper,
  ) {}

  async execute(query: string, limit: number): Promise<SearchResponseDto> {
    this.logger.log(
      `Executing SearchItemsUseCase with query: ${query} and limit: ${limit}`,
    );
    try {
      const response = await this.itemService.searchItems(query, limit);
      this.logger.debug(`Search results: ${JSON.stringify(response)}`);
      return this.searchResponseMapper.toDto(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error in SearchItemsUseCase: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(
          `Unknown error in SearchItemsUseCase: ${String(error)}`,
        );
      }
      throw error;
    }
  }
}
