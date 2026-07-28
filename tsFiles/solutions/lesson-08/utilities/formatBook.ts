import type { SolutionBook } from "../models/Book.js";

export function solutionFormatBook(book: SolutionBook): string {
  return `${book.title} by ${book.author}`;
}
