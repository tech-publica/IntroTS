import type { ProductCategory } from "../types/ProductCategory.js";

export interface ProductData {
  readonly id: number;
  name: string;
  price: number;
  category: ProductCategory;
}

export class Product implements ProductData {
  public constructor(
    public readonly id: number,
    public name: string,
    public price: number,
    public category: ProductCategory,
  ) {}

  public applyDiscount(percentage: number): void {
    this.price -= this.price * (percentage / 100);
  }
}
