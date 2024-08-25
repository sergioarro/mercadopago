import { SearchResponseMapper } from './search-response.mapper';
import { Item } from '@/domain/entities/item.entity';
import { AuthorDto } from '@/presentation/rest/dtos/author.dto';
import { ConfigType } from '@nestjs/config';
import authorConfig from '../config/author.config';
import { SearchResponseDto } from '@/presentation/rest/dtos/search-response-success.dto';
import { ItemResponseDto } from '@/presentation/rest/dtos/item-response-success.dto';

describe('SearchResponseMapper', () => {
  let mapper: SearchResponseMapper;
  let mockAuthorConfig: ConfigType<typeof authorConfig>;

  beforeEach(() => {
    mockAuthorConfig = {
      name: 'Test',
      lastname: 'User',
    };
    mapper = new SearchResponseMapper(mockAuthorConfig);
  });

  it('should map an array of Item entities to SearchResponseDto correctly', () => {
    const items: Item[] = [
      {
        id: '123',
        title: 'Test Item 1',
        price: {
          currency: 'USD',
          amount: 1000,
          decimals: 2,
        },
        picture: 'http://example.com/image1.jpg',
        condition: 'new',
        freeShipping: true,
        soldQuantity: 10,
        description: 'A test item 1',
      },
      {
        id: '456',
        title: 'Test Item 2',
        price: {
          currency: 'USD',
          amount: 2000,
          decimals: 2,
        },
        picture: 'http://example.com/image2.jpg',
        condition: 'used',
        freeShipping: false,
        soldQuantity: 5,
        description: 'A test item 2',
      },
    ];

    const categories = ['Category 1', 'Category 2'];

    const result: SearchResponseDto = mapper.toDto(items, categories);

    const expectedAuthor = new AuthorDto('Test', 'User');
    const expectedItemDtos: ItemResponseDto[] = [
      {
        id: '123',
        title: 'Test Item 1',
        price: {
          currency: 'USD',
          amount: 1000,
          decimals: 2,
        },
        picture: 'http://example.com/image1.jpg',
        condition: 'new',
        freeShipping: true,
        soldQuantity: 10,
        description: 'A test item 1',
      },
      {
        id: '456',
        title: 'Test Item 2',
        price: {
          currency: 'USD',
          amount: 2000,
          decimals: 2,
        },
        picture: 'http://example.com/image2.jpg',
        condition: 'used',
        freeShipping: false,
        soldQuantity: 5,
        description: 'A test item 2',
      },
    ];

    expect(result.author).toEqual(expectedAuthor);
    expect(result.categories).toEqual(categories);
    expect(result.items).toEqual(expectedItemDtos);
  });
});
