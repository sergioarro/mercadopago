import { Item } from '../entities/item.entity';

export interface ItemService {
  searchItems(query: string): Promise<Item[]>;
  getItemById(id: string): Promise<Item | null>;
}
