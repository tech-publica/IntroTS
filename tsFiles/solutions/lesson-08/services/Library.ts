import type { SolutionBook } from "../models/Book.js";

export class SolutionLibrary {
  #books: SolutionBook[] = [];

  public add(book: SolutionBook): void {
    this.#books.push(book);
  }

  public findByIsbn(isbn: string): SolutionBook | undefined {
    return this.#books.find((book) => book.isbn === isbn);
  }

  public getAll(): readonly SolutionBook[] {
    return [...this.#books];
  }
}
