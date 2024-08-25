import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { GetItemUseCase } from '@/application/use-cases/get-item.use-case';
import { SearchItemsUseCase } from '@/application/use-cases/search-items.use-case';
import { NotFoundException } from '@nestjs/common';
import { GetItemResponseDto } from '@/presentation/rest/dtos/get-item-response.dto';
import { SearchResponseDto } from '@/presentation/rest/dtos/search-response-success.dto';
import { ItemResponseDto } from '@/presentation/rest/dtos/item-response-success.dto';
import { AuthorDto } from '@/presentation/rest/dtos/author.dto';

describe('ItemController', () => {
  let controller: ItemController;
  let getItemUseCase: GetItemUseCase;
  let searchItemsUseCase: SearchItemsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: GetItemUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: SearchItemsUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);
    getItemUseCase = module.get<GetItemUseCase>(GetItemUseCase);
    searchItemsUseCase = module.get<SearchItemsUseCase>(SearchItemsUseCase);
  });

  describe('getItem', () => {
    it('should return item details when item is found', async () => {
      const itemId = 'MLA123';
      const itemResponse = new GetItemResponseDto(
        new AuthorDto('John', 'Doe'),
        new ItemResponseDto(
          'MLA123',
          'Test Item',
          { currency: 'ARS', amount: 100, decimals: 0 },
          'http://image.jpg',
          'new',
          true,
          10,
          'Test description',
        ),
      );

      jest.spyOn(getItemUseCase, 'execute').mockResolvedValue(itemResponse);

      const result = await controller.getItem({ id: itemId });

      expect(result).toBe(itemResponse);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(getItemUseCase.execute).toHaveBeenCalledWith(itemId);
    });

    it('should throw NotFoundException when item is not found', async () => {
      const itemId = 'MLA123';

      jest.spyOn(getItemUseCase, 'execute').mockResolvedValue(null);

      await expect(controller.getItem({ id: itemId })).rejects.toThrow(
        NotFoundException,
      );
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(getItemUseCase.execute).toHaveBeenCalledWith(itemId);
    });
  });

  describe('searchItems', () => {
    it('should return search results with specified limit', async () => {
      const query = 'Samsung';
      const limit = 2;
      const searchResponse = new SearchResponseDto(
        new AuthorDto('John', 'Doe'),
        ['Electronics', 'Phones'],
        [
          new ItemResponseDto(
            'MLA1',
            'Item 1',
            { currency: 'ARS', amount: 100, decimals: 0 },
            'http://image1.jpg',
            'new',
            true,
            5,
            'Item 1 description',
          ),
          new ItemResponseDto(
            'MLA2',
            'Item 2',
            { currency: 'ARS', amount: 200, decimals: 0 },
            'http://image2.jpg',
            'new',
            false,
            3,
            'Item 2 description',
          ),
        ],
      );

      jest
        .spyOn(searchItemsUseCase, 'execute')
        .mockResolvedValue(searchResponse);

      const result = await controller.searchItems({ q: query, limit });

      expect(result).toBe(searchResponse);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(searchItemsUseCase.execute).toHaveBeenCalledWith(query, limit);
    });

    it('should return search results with default limit when not specified', async () => {
      const query = 'Samsung';
      const defaultLimit = 4;
      const searchResponse = new SearchResponseDto(
        new AuthorDto('John', 'Doe'),
        ['Electronics', 'Phones'],
        [
          new ItemResponseDto(
            'MLA1',
            'Item 1',
            { currency: 'ARS', amount: 100, decimals: 0 },
            'http://image1.jpg',
            'new',
            true,
            5,
            'Item 1 description',
          ),
          new ItemResponseDto(
            'MLA2',
            'Item 2',
            { currency: 'ARS', amount: 200, decimals: 0 },
            'http://image2.jpg',
            'new',
            false,
            3,
            'Item 2 description',
          ),
        ],
      );

      jest
        .spyOn(searchItemsUseCase, 'execute')
        .mockResolvedValue(searchResponse);

      const result = await controller.searchItems({ q: query });

      expect(result).toBe(searchResponse);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(searchItemsUseCase.execute).toHaveBeenCalledWith(
        query,
        defaultLimit,
      );
    });
  });
});
