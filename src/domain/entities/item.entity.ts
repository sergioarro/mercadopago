export class Item {
  constructor(
    public id: string,
    public title: string,
    public price: {
      currency: string;
      amount: number;
      decimals: number;
    },
    public picture: string,
    public condition: string,
    public freeShipping: boolean,
    public description?: string,
    public soldQuantity?: number,
  ) {}
}
