import type { Product } from "../models/Product.js";

export class ProductCatalog {
  #products: Product[];

  public constructor(initialProducts: readonly Product[] = []) {
    this.#products = [...initialProducts];
  }

  public add(product: Product): void {
    this.#products.push(product);
  }

  public remove(id: string): boolean {
    const index = this.#products.findIndex(
      (product) => product.id === id,
    );

    if (index === -1) {
      return false;
    }

    this.#products.splice(index, 1);
    return true;
  }

  public search(query: string): readonly Product[] {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === "") {
      return this.getAll();
    }

    return this.#products.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.includes(normalizedQuery)
      );
    });
  }

  public getAll(): readonly Product[] {
    return [...this.#products];
  }
}
