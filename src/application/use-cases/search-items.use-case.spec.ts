/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { SearchItemsUseCase } from './search-items.use-case';
import { ItemService } from '@/domain/interfaces/item.service.interface';
import { SearchResponseMapper } from '@/application/mappers/search-response.mapper';
import { SearchResponseDto } from '@/presentation/rest/dtos/search-response-success.dto';
import { Logger } from '@nestjs/common';
import { ITEM_REPOSITORY } from '@/shared/constants';
import { Item } from '@/domain/entities/item.entity';

describe('SearchItemsUseCase', () => {
  let useCase: SearchItemsUseCase;
  let itemService: ItemService;
  let searchResponseMapper: SearchResponseMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchItemsUseCase,
        {
          provide: ITEM_REPOSITORY,
          useValue: {
            searchItems: jest.fn(),
          },
        },
        {
          provide: SearchResponseMapper,
          useValue: {
            toDto: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    useCase = module.get<SearchItemsUseCase>(SearchItemsUseCase);
    itemService = module.get<ItemService>(ITEM_REPOSITORY);
    searchResponseMapper =
      module.get<SearchResponseMapper>(SearchResponseMapper);
  });

  describe('execute', () => {
    it('should return search response DTO', async () => {
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
      const searchResponseDto = new SearchResponseDto(
        { name: 'John', lastname: 'Doe' },
        categories,
        items,
      );

      jest
        .spyOn(itemService, 'searchItems')
        .mockResolvedValue({ items, categories });
      jest
        .spyOn(searchResponseMapper, 'toDto')
        .mockReturnValue(searchResponseDto);

      const result = await useCase.execute(query, limit);

      expect(result).toBe(searchResponseDto);
      expect(itemService.searchItems).toHaveBeenCalledWith(query, limit);
      expect(searchResponseMapper.toDto).toHaveBeenCalledWith(
        items,
        categories,
      );
    });

    it('should log and rethrow errors', async () => {
      const query = 'Samsung';
      const limit = 2;
      const error = new Error('Test error');

      jest.spyOn(itemService, 'searchItems').mockRejectedValue(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      jest.spyOn(searchResponseMapper, 'toDto').mockReturnValue({} as any);
      jest.spyOn(useCase['logger'], 'error').mockImplementation();

      await expect(useCase.execute(query, limit)).rejects.toThrow(error);

      expect(useCase['logger'].error).toHaveBeenCalledWith(
        `Error in SearchItemsUseCase: ${error.message}`,
        error.stack,
      );
    });
  });
});
