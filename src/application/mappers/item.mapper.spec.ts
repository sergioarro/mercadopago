import { Item } from '@/domain/entities/item.entity';
import { AuthorDto } from '@/presentation/rest/dtos/author.dto';
import { GetItemResponseDto } from '@/presentation/rest/dtos/get-item-response.dto';
import { ConfigType } from '@nestjs/config';
import authorConfig from '../config/author.config';
import { ItemResponseMapper } from '@/application/mappers/item.mapper';

describe('ItemResponseMapper', () => {
  let mapper: ItemResponseMapper;
  let mockAuthorConfig: ConfigType<typeof authorConfig>;

  beforeEach(() => {
    mockAuthorConfig = {
      name: 'Test',
      lastname: 'User',
    };
    mapper = new ItemResponseMapper(mockAuthorConfig);
  });

  it('should map an Item entity to GetItemResponseDto correctly', () => {
    const item: Item = {
      id: '123',
      title: 'Test Item',
      price: {
        currency: 'USD',
        amount: 1000,
        decimals: 2,
      },
      picture: 'http://example.com/image.jpg',
      condition: 'new',
      freeShipping: true,
      soldQuantity: 10,
      description: 'A test item',
    };

    const result: GetItemResponseDto = mapper.toDto(item);

    const expectedAuthor = new AuthorDto('Test', 'User');
    const expectedItemDto = {
      id: '123',
      title: 'Test Item',
      price: {
        currency: 'USD',
        amount: 1000,
        decimals: 2,
      },
      picture: 'http://example.com/image.jpg',
      condition: 'new',
      freeShipping: true,
      soldQuantity: 10,
      description: 'A test item',
    };

    expect(result.author).toEqual(expectedAuthor);
    expect(result.item).toEqual(expectedItemDto);
  });
});
