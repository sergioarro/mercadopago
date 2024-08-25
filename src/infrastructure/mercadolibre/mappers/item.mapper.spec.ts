import { ItemMapper } from './item.mapper';
import { Item } from '@/domain/entities/item.entity';
import { MeliItem } from '@/infrastructure/mercadolibre/mercadolibre-item.types';

describe('ItemMapper', () => {
  let mapper: ItemMapper;

  beforeEach(() => {
    mapper = new ItemMapper();
  });

  it('should map MeliItem to Item correctly', () => {
    const meliItem: MeliItem = {
      id: 'MLA123456',
      title: 'Test Item',
      price: 1500.75,
      currency_id: 'ARS',
      thumbnail: 'http://example.com/image.jpg',
      condition: 'new',
      shipping: {
        free_shipping: true,
      },
      sold_quantity: 5,
    };

    const expectedItem: Item = new Item(
      'MLA123456',
      'Test Item',
      {
        currency: 'ARS',
        amount: 1500,
        decimals: 75,
      },
      'http://example.com/image.jpg',
      'new',
      true,
    );

    const result = mapper.toDomain(meliItem);

    expect(result).toEqual(expectedItem);
  });

  it('should handle price with no decimals correctly', () => {
    const meliItem: MeliItem = {
      id: 'MLA123457',
      title: 'Test Item 2',
      price: 2000,
      currency_id: 'ARS',
      thumbnail: 'http://example.com/image2.jpg',
      condition: 'used',
      shipping: {
        free_shipping: false,
      },
      sold_quantity: 2,
    };

    const expectedItem: Item = new Item(
      'MLA123457',
      'Test Item 2',
      {
        currency: 'ARS',
        amount: 2000,
        decimals: 0,
      },
      'http://example.com/image2.jpg',
      'used',
      false,
    );

    const result = mapper.toDomain(meliItem);

    expect(result).toEqual(expectedItem);
  });
});
