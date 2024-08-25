import { Item } from '../entities/item.entity';

export interface ItemService {
  searchItems(
    query: string,
    limit: number,
  ): Promise<{ items: Item[]; categories: string[] }>;
  getItemById(id: string): Promise<Item | null>;
}
