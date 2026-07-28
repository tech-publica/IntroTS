// 3. Import ExerciseBook as a type and use it instead of this object type.
type ExerciseBookLike = {
  title: string;
  author: string;
};

export function exerciseFormatBook(book: ExerciseBookLike): string {
  return `${book.title} by ${book.author}`;
}
