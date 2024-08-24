export interface MeliSearchResponse {
  results: MeliItem[];
}

export interface MeliItem {
  id: string;
  title: string;
  currency_id: string;
  price: number;
  thumbnail: string;
  condition: string;
  shipping: {
    free_shipping: boolean;
  };
}

export interface MeliItemResponse {
  id: string;
  title: string;
  currency_id: string;
  price: number;
  pictures: Array<{ url: string }>;
  thumbnail: string;
  condition: string;
  shipping: {
    free_shipping: boolean;
  };
  sold_quantity: number;
}

export interface MeliItemDescriptionResponse {
  plain_text: string;
}
