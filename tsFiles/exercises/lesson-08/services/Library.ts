// 2. Import ExerciseBook as a type from ../models/Book.js.
import type { ExerciseBook } from "../models/Book.js";

export class ExerciseLibrary {
  #books: ExerciseBook[] = [];

  public add(book: ExerciseBook): void {
    this.#books.push(book);
  }

  public findByIsbn(isbn: string): ExerciseBook | undefined {
    return this.#books.find((book) => book.isbn === isbn);
  }

  public getAll(): readonly ExerciseBook[] {
    return [...this.#books];
  }
}
