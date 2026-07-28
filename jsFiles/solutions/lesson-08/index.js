import { SolutionBook } from "./models/index.js";
import { SolutionLibrary } from "./services/Library.js";
import { solutionFormatBook as formatBook, } from "./utilities/formatBook.js";
const solutionLibrary = new SolutionLibrary();
solutionLibrary.add(new SolutionBook("978-1-00-000001-0", "Learning TypeScript", "A. Developer"));
console.log("--- Lesson 8 solutions ---");
solutionLibrary.getAll().forEach((book) => {
    console.log(formatBook(book));
});
//# sourceMappingURL=index.js.map