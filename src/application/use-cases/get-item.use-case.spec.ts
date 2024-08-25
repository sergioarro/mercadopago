/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { GetItemUseCase } from './get-item.use-case';
import { ItemService } from '@/domain/interfaces/item.service.interface';
import { ItemResponseMapper } from '@/application/mappers/item.mapper';
import { ITEM_REPOSITORY } from '@/shared/constants';
import { Item } from '@/domain/entities/item.entity';
import { GetItemResponseDto } from '@/presentation/rest/dtos/get-item-response.dto';

describe('GetItemUseCase', () => {
  let getItemUseCase: GetItemUseCase;
  let itemService: ItemService;
  let itemResponseMapper: ItemResponseMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetItemUseCase,
        {
          provide: ITEM_REPOSITORY,
          useValue: {
            getItemById: jest.fn(),
          },
        },
        {
          provide: ItemResponseMapper,
          useValue: {
            toDto: jest.fn(),
          },
        },
      ],
    }).compile();

    getItemUseCase = module.get<GetItemUseCase>(GetItemUseCase);
    itemService = module.get<ItemService>(ITEM_REPOSITORY);
    itemResponseMapper = module.get<ItemResponseMapper>(ItemResponseMapper);
  });

  describe('execute', () => {
    it('should return GetItemResponseDto when item is found', async () => {
      const id = 'MLA123';
      const item = new Item(
        id,
        'Test Item',
        { currency: 'ARS', amount: 100, decimals: 0 },
        'http://image.jpg',
        'new',
        true,
      );

      const itemResponseDto = new GetItemResponseDto(
        {
          name: 'Author Name',
          lastname: 'Author Lastname',
        },
        {
          id: item.id,
          title: item.title,
          price: {
            currency: item.price.currency,
            amount: item.price.amount,
            decimals: item.price.decimals,
          },
          picture: item.picture,
          condition: item.condition,
          freeShipping: item.freeShipping,
          soldQuantity: item.soldQuantity,
          description: item.description,
        },
      );

      jest.spyOn(itemService, 'getItemById').mockResolvedValue(item);
      jest.spyOn(itemResponseMapper, 'toDto').mockReturnValue(itemResponseDto);

      const result = await getItemUseCase.execute(id);

      expect(result).toBe(itemResponseDto);
      expect(itemService.getItemById).toHaveBeenCalledWith(id);
      expect(itemResponseMapper.toDto).toHaveBeenCalledWith(item);
    });

    it('should return null when item is not found', async () => {
      const id = 'MLA123';

      jest.spyOn(itemService, 'getItemById').mockResolvedValue(null);

      const result = await getItemUseCase.execute(id);

      expect(result).toBeNull();
      expect(itemService.getItemById).toHaveBeenCalledWith(id);
      expect(itemResponseMapper.toDto).not.toHaveBeenCalled();
    });

    it('should log and throw an error when an exception occurs', async () => {
      const id = 'MLA123';
      const errorMessage = 'Something went wrong';

      jest
        .spyOn(itemService, 'getItemById')
        .mockRejectedValue(new Error(errorMessage));

      await expect(getItemUseCase.execute(id)).rejects.toThrow(errorMessage);
      expect(itemService.getItemById).toHaveBeenCalledWith(id);
    });
  });
});
