export type ProductCategory =
  | "accessories"
  | "computers"
  | "displays";

export class Product {
  public constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public category: ProductCategory,
  ) {}
}
