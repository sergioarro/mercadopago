import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { Item } from '@/domain/entities/item.entity';
import {
  MeliSearchResponse,
  MeliItemResponse,
  MeliItemDescriptionResponse,
  MeliCategoryFilter,
} from './mercadolibre-item.types';
import { ItemMapper } from '@/infrastructure/mercadolibre/mappers/item.mapper';
import { ItemService } from '@/domain/interfaces/item.service.interface';

@Injectable()
export class MercadoLibreItemService implements ItemService {
  private readonly API_BASE_URL: string;
  private readonly logger = new Logger(MercadoLibreItemService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly itemMapper: ItemMapper,
  ) {
    this.API_BASE_URL = this.configService.getOrThrow<string>('API_URL_MELI');
  }

  async searchItems(
    query: string,
    limit: number,
  ): Promise<{ items: Item[]; categories: string[] }> {
    const url = `${this.API_BASE_URL}/sites/MLA/search?q=${encodeURIComponent(query)}&limit=${limit}`;

    this.logger.debug(
      `Requesting search items with query: ${query} and limit: ${limit}`,
    );

    try {
      const response = await firstValueFrom(
        this.httpService.get<MeliSearchResponse>(url),
      );
      this.logger.debug(
        `Received search results: ${JSON.stringify(response.data)}`,
      );

      const items = response.data.results.map((itemData) =>
        this.itemMapper.toDomain(itemData),
      );

      const categoryFilter = response.data.available_filters?.find(
        (filter: MeliCategoryFilter) => filter.id === 'category',
      );

      this.logger.debug(
        `Category Filter Found: ${JSON.stringify(categoryFilter)}`,
      );

      const categories = categoryFilter
        ? categoryFilter.values.map((value) => value.name)
        : [];

      return { items, categories };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to fetch search items: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(`Failed to fetch search items: ${String(error)}`);
      }
      throw error;
    }
  }

  async getItemById(id: string): Promise<Item | null> {
    const itemUrl = `${this.API_BASE_URL}/items/${id}`;
    const descriptionUrl = `${itemUrl}/description`;
    this.logger.debug(`Requesting item details for ID: ${id}`);

    try {
      const [itemResponse, descriptionResponse] = await Promise.all([
        firstValueFrom(this.httpService.get<MeliItemResponse>(itemUrl)),
        firstValueFrom(
          this.httpService.get<MeliItemDescriptionResponse>(descriptionUrl),
        ),
      ]);

      const itemData = itemResponse.data;
      const descriptionData = descriptionResponse.data;

      this.logger.debug(`Received item data: ${JSON.stringify(itemData)}`);
      this.logger.debug(
        `Received description data: ${JSON.stringify(descriptionData)}`,
      );

      const item = this.itemMapper.toDomain(itemData);
      item.description = descriptionData.plain_text;
      item.soldQuantity = itemData.sold_quantity;

      return item;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Failed to fetch item by ID: ${id}`, error.stack);
      } else {
        this.logger.error(
          `Failed to fetch item by ID: ${id}, unknown error: ${String(error)}`,
        );
      }
      throw error;
    }
  }
}
