/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ItemDomainService } from './item-domain.service';
import { ITEM_REPOSITORY } from '@/shared/constants';
import { ItemService } from '@/domain/interfaces/item.service.interface';
import { Item } from '../entities/item.entity';

describe('ItemDomainService', () => {
  let service: ItemDomainService;
  let itemService: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemDomainService,
        {
          provide: ITEM_REPOSITORY,
          useValue: {
            getItemById: jest.fn(),
            searchItems: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItemDomainService>(ItemDomainService);
    itemService = module.get<ItemService>(ITEM_REPOSITORY);
  });

  describe('getItemById', () => {
    it('should return an item when found', async () => {
      const itemId = 'MLA123';
      const item = new Item(
        itemId,
        'Test Item',
        { currency: 'ARS', amount: 100, decimals: 0 },
        'http://image.jpg',
        'new',
        true,
      );

      jest.spyOn(itemService, 'getItemById').mockResolvedValue(item);

      const result = await service.getItemById(itemId);

      expect(result).toBe(item);
      expect(itemService.getItemById).toHaveBeenCalledWith(itemId);
    });

    it('should return null when item is not found', async () => {
      const itemId = 'MLA123';

      jest.spyOn(itemService, 'getItemById').mockResolvedValue(null);

      const result = await service.getItemById(itemId);

      expect(result).toBeNull();
      expect(itemService.getItemById).toHaveBeenCalledWith(itemId);
    });
  });

  describe('searchItems', () => {
    it('should return items and categories', async () => {
      const query = 'Samsung';
      const limit = 2;
      const items = [
        new Item(
          'MLA1',
          'Item 1',
          { currency: 'ARS', amount: 100, decimals: 0 },
          'http://image1.jpg',
          'new',
          true,
        ),
        new Item(
          'MLA2',
          'Item 2',
          { currency: 'ARS', amount: 200, decimals: 0 },
          'http://image2.jpg',
          'new',
          false,
        ),
      ];
      const categories = ['Electronics', 'Phones'];

      jest.spyOn(itemService, 'searchItems').mockResolvedValue({
        items,
        categories,
      });

      const result = await service.searchItems(query, limit);

      expect(result.items).toEqual(items);
      expect(result.categories).toEqual(categories);
      expect(itemService.searchItems).toHaveBeenCalledWith(query, limit);
    });
  });
});
