import type { Product } from "../models/Product.js";

export class ProductRepository {
  #products: Product[] = [];

  public add(product: Product): void {
    this.#products.push(product);
  }

  public findById(id: number): Product | undefined {
    return this.#products.find((product) => product.id === id);
  }

  public getAll(): readonly Product[] {
    return [...this.#products];
  }
}
