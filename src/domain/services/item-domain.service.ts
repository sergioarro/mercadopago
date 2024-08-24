import { Inject, Injectable } from '@nestjs/common';
import { ItemService } from '../interfaces/item.repository';
import { Item } from '../entities/item.entity';
import { ITEM_REPOSITORY } from '@/shared/constants';

@Injectable()
export class ItemDomainService {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly ItemService: ItemService,
  ) {}

  async getItemById(id: string): Promise<Item | null> {
    return this.ItemService.getItemById(id);
  }

  async searchItems(query: string): Promise<Item[]> {
    return this.ItemService.searchItems(query);
  }
}
