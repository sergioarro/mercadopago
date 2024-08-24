import { Inject, Injectable, Logger } from '@nestjs/common';
import { ItemService } from '../../domain/interfaces/item.repository';
import { ITEM_REPOSITORY } from '@/shared/constants';
import { ItemResponseDto } from '@/presentation/rest/dtos/item-response-success.dto';
import { ItemResponseMapper } from '@/application/mappers/item.mapper';

@Injectable()
export class GetItemUseCase {
  private readonly logger = new Logger(GetItemUseCase.name);

  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly ItemService: ItemService,
    private readonly itemResponseMapper: ItemResponseMapper,
  ) {}

  async execute(id: string): Promise<ItemResponseDto | null> {
    this.logger.log(`Executing GetItemUseCase with ID: ${id}`);
    try {
      const item = await this.ItemService.getItemById(id);
      if (!item) {
        return null;
      }
      this.logger.debug(`Retrieved item: ${JSON.stringify(item)}`);
      return this.itemResponseMapper.toDto(item);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error in GetItemUseCase: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(`Unknown error in GetItemUseCase: ${String(error)}`);
      }
      throw error;
    }
  }
}
