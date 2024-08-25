import { Inject, Injectable } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { ITEM_REPOSITORY } from '@/shared/constants';
import { ItemService } from '@/domain/interfaces/item.service.interface';

@Injectable()
export class ItemDomainService {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly ItemService: ItemService,
  ) {}

  async getItemById(id: string): Promise<Item | null> {
    return this.ItemService.getItemById(id);
  }

  async searchItems(
    query: string,
    limit: number,
  ): Promise<{ items: Item[]; categories: string[] }> {
    return this.ItemService.searchItems(query, limit);
  }
}
