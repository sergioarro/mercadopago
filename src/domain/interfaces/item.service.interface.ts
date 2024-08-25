import { Item } from '../entities/item.entity';

export interface ItemService {
  searchItems(query: string, limit: number): Promise<Item[]>;
  getItemById(id: string): Promise<Item | null>;
}
