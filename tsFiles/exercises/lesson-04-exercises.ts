/*
 * LESSON 4 EXERCISES
 *
 * Complete this small library model. Run `tsc` after every task.
 */

// 1. Make `id` readonly and add a `getLoanPeriod(): number` method.
interface ExerciseLibraryItemContract {
  id: number;
  title: string;
}

// 2. Make this class abstract and implement ExerciseLibraryItemContract.
class ExerciseLibraryItem {
  // 3. Make this counter private and static.
  static itemCount = 0;

  // 4. Convert `id` and `title` into constructor parameter properties.
  //    `id` should be public and readonly.
  public id: number;
  public title: string;

  // 5. Change this to a TypeScript private field.
  protected _isAvailable = true;

  // 6. Change this to a JavaScript private field using `#`.
  private inventoryCode: string;

  public constructor(id: number, title: string, inventoryCode: string) {
    this.id = id;
    this.title = title;
    this.inventoryCode = inventoryCode;
    ExerciseLibraryItem.itemCount += 1;
  }

  // 7. Convert these methods into a getter and setter named `isAvailable`.
  public getAvailability(): boolean {
    return this._isAvailable;
  }

  public setAvailability(value: boolean): void {
    this._isAvailable = value;
  }

  // 8. Make this method static and return the item count.
  public getItemCount(): number {
    return ExerciseLibraryItem.itemCount;
  }

  protected matchesInventoryCode(code: string): boolean {
    return this.inventoryCode === code;
  }

  // 9. Make this an abstract method.
  public getLoanPeriod(): number {
    return 0;
  }
}

// 10. Extend ExerciseLibraryItem and implement a 21-day loan period.
//     Convert `author` into a public constructor parameter property.
class ExerciseBook extends ExerciseLibraryItem {
  public author: string;

  public constructor(
    id: number,
    title: string,
    inventoryCode: string,
    author: string,
  ) {
    super(id, title, inventoryCode);
    this.author = author;
  }

  public override getLoanPeriod(): number {
    return 0;
  }
}

const exerciseBook = new ExerciseBook(
  1,
  "The TypeScript Handbook",
  "BOOK-001",
  "The TypeScript Team",
);

console.log("--- Lesson 4 exercises ---");
console.log(exerciseBook.title, exerciseBook.author);
console.log("Loan period:", exerciseBook.getLoanPeriod());

/*
 * After completing the refactoring, update these lines to use your getter,
 * setter, and static member:
 */

console.log("Available:", exerciseBook.getAvailability());
exerciseBook.setAvailability(false);
console.log("Items:", exerciseBook.getItemCount());

/*
 * Bonus
 *
 * Add a Magazine subclass with an `issueNumber` parameter property and a
 * seven-day loan period.
 */
