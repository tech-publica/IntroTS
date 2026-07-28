/*
 * LESSON 8 EXERCISES
 *
 * Complete the numbered module tasks, then run this entry point.
 */

// 4. Import ExerciseBook, ExerciseLibrary, and exerciseFormatBook.
import { ExerciseBook } from "./models/Book.js";
import { ExerciseLibrary } from "./services/Library.js";
import { exerciseFormatBook } from "./utilities/formatBook.js";

const exerciseLibrary = new ExerciseLibrary();

exerciseLibrary.add(
  new ExerciseBook(
    "978-1-00-000001-0",
    "Learning TypeScript",
    "A. Developer",
  ),
);

exerciseLibrary.getAll().forEach((book) => {
  console.log(exerciseFormatBook(book));
});

/*
 * 5. Add a models/index.ts barrel file that re-exports ExerciseBook and
 *    ExerciseBookData. Change this file to import ExerciseBook from the barrel.
 *
 * 6. Rename the exerciseFormatBook import to formatBook using `as`, then update
 *    its call.
 */
