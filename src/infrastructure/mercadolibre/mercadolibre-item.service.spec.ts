import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { MercadoLibreItemService } from './mercadolibre-item.service';
import { ItemMapper } from './mappers/item.mapper';
import {
  MeliSearchResponse,
  MeliItemResponse,
  MeliItemDescriptionResponse,
} from './mercadolibre-item.types';
import { Item } from '@/domain/entities/item.entity';
import { AxiosResponse, AxiosHeaders } from 'axios';

describe('MercadoLibreItemService', () => {
  let service: MercadoLibreItemService;
  let httpService: HttpService;
  let itemMapper: ItemMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MercadoLibreItemService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest
              .fn()
              .mockReturnValue('https://api.mercadolibre.com'),
          },
        },
        {
          provide: ItemMapper,
          useValue: {
            toDomain: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MercadoLibreItemService>(MercadoLibreItemService);
    httpService = module.get<HttpService>(HttpService);
    itemMapper = module.get<ItemMapper>(ItemMapper);
  });

  describe('searchItems', () => {
    it('should return items and categories', async () => {
      const query = 'Samsung';
      const limit = 2;

      const meliResponse: AxiosResponse<MeliSearchResponse> = {
        data: {
          results: [
            {
              id: 'MLA1',
              title: 'Item 1',
              price: 100,
              currency_id: 'ARS',
              thumbnail: 'http://image1.jpg',
              condition: 'new',
              shipping: {
                free_shipping: true,
              },
              sold_quantity: 5,
            },
          ],
          available_filters: [],
          filters: [], // Propiedad agregada
        },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(), // Se usa AxiosHeaders en lugar de {}
        config: { headers: new AxiosHeaders() }, // Se usa AxiosHeaders en lugar de {}
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(meliResponse));
      jest.spyOn(itemMapper, 'toDomain').mockImplementation((itemData) => {
        return new Item(
          itemData.id,
          itemData.title,
          {
            currency: itemData.currency_id,
            amount: Math.floor(itemData.price),
            decimals: Math.round((itemData.price % 1) * 100),
          },
          itemData.thumbnail,
          itemData.condition,
          itemData.shipping.free_shipping,
        );
      });

      const result = await service.searchItems(query, limit);

      expect(result.items).toHaveLength(1);
      expect(result.categories).toEqual([]);
    });

    it('should return empty categories if no category filter is found', async () => {
      const query = 'Samsung';
      const limit = 2;

      const meliResponse: AxiosResponse<MeliSearchResponse> = {
        data: {
          results: [
            {
              id: 'MLA1',
              title: 'Item 1',
              price: 100,
              currency_id: 'ARS',
              thumbnail: 'http://image1.jpg',
              condition: 'new',
              shipping: {
                free_shipping: true,
              },
              sold_quantity: 3,
            },
          ],
          available_filters: [],
          filters: [], // Propiedad agregada
        },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(), // Se usa AxiosHeaders en lugar de {}
        config: { headers: new AxiosHeaders() }, // Se usa AxiosHeaders en lugar de {}
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(meliResponse));
      jest.spyOn(itemMapper, 'toDomain').mockImplementation((itemData) => {
        return new Item(
          itemData.id,
          itemData.title,
          {
            currency: itemData.currency_id,
            amount: Math.floor(itemData.price),
            decimals: Math.round((itemData.price % 1) * 100),
          },
          itemData.thumbnail,
          itemData.condition,
          itemData.shipping.free_shipping,
        );
      });

      const result = await service.searchItems(query, limit);

      expect(result.items).toHaveLength(1);
      expect(result.categories).toEqual([]);
    });

    it('should handle errors when fetching items', async () => {
      const query = 'Samsung';
      const limit = 2;

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(
          of({ data: null } as unknown as AxiosResponse<MeliSearchResponse>),
        );

      await expect(service.searchItems(query, limit)).rejects.toThrow();
    });

    it('should throw an error if response data is null', async () => {
      const query = 'Samsung';
      const limit = 2;

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(
          of({ data: null } as unknown as AxiosResponse<MeliSearchResponse>),
        );

      await expect(service.searchItems(query, limit)).rejects.toThrow(
        'No results found in the response',
      );
    });

    it('should return empty items if no results are found', async () => {
      const query = 'Nonexistent Item';
      const limit = 2;

      const meliResponse: AxiosResponse<MeliSearchResponse> = {
        data: {
          results: [],
          available_filters: [],
          filters: [],
        },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(),
        config: { headers: new AxiosHeaders() },
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(meliResponse));

      const result = await service.searchItems(query, limit);

      expect(result.items).toHaveLength(0);
      expect(result.categories).toEqual([]);
    });

    it('should return categories if category filter is found', async () => {
      const query = 'Samsung';
      const limit = 2;

      const meliResponse: AxiosResponse<MeliSearchResponse> = {
        data: {
          results: [
            {
              id: 'MLA1',
              title: 'Item 1',
              price: 100,
              currency_id: 'ARS',
              thumbnail: 'http://image1.jpg',
              condition: 'new',
              shipping: {
                free_shipping: true,
              },
              sold_quantity: 3,
            },
          ],
          available_filters: [
            {
              id: 'category',
              name: 'Categorías',
              type: 'text',
              values: [
                { id: 'MLA123', name: 'Electrónica', results: 10 },
                { id: 'MLA124', name: 'Celulares', results: 5 },
              ],
            },
          ],
          filters: [],
        },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(),
        config: { headers: new AxiosHeaders() },
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(meliResponse));

      const result = await service.searchItems(query, limit);

      expect(result.items).toHaveLength(1);
      expect(result.categories).toEqual(['Electrónica', 'Celulares']);
    });
  });

  describe('getItemById', () => {
    it('should return item with description', async () => {
      const id = 'MLA123';

      const meliItemResponse: AxiosResponse<MeliItemResponse> = {
        data: {
          id: 'MLA123',
          title: 'Test Item',
          price: 100,
          currency_id: 'ARS',
          thumbnail: 'http://image.jpg',
          condition: 'new',
          shipping: { free_shipping: true },
          sold_quantity: 10, // Incluimos sold_quantity en la respuesta
          pictures: [], // Agregamos pictures para cumplir con la interfaz
        },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(),
        config: { headers: new AxiosHeaders() },
      };

      const meliItemDescriptionResponse: AxiosResponse<MeliItemDescriptionResponse> =
        {
          data: {
            plain_text: 'Test description',
          },
          status: 200,
          statusText: 'OK',
          headers: new AxiosHeaders(),
          config: { headers: new AxiosHeaders() },
        };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of(meliItemResponse))
        .mockReturnValueOnce(of(meliItemDescriptionResponse));

      jest.spyOn(itemMapper, 'toDomain').mockImplementation((itemData) => {
        const item = new Item(
          itemData.id,
          itemData.title,
          {
            currency: itemData.currency_id,
            amount: Math.floor(itemData.price),
            decimals: Math.round((itemData.price % 1) * 100),
          },
          itemData.thumbnail,
          itemData.condition,
          itemData.shipping.free_shipping,
        );
        item.description = 'Test description';
        item.soldQuantity = itemData.sold_quantity;
        return item;
      });

      const result = await service.getItemById(id);

      expect(result).toBeDefined();
      expect(result?.id).toBe('MLA123');
      expect(result?.description).toBe('Test description');
      expect(result?.soldQuantity).toBe(10);
    });

    it('should handle errors when fetching item by ID', async () => {
      const id = 'MLA123';

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(
          of({ data: null } as unknown as AxiosResponse<MeliItemResponse>),
        );

      await expect(service.getItemById(id)).rejects.toThrow();
    });
  });
});
