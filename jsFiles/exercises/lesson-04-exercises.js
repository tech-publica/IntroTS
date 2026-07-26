"use strict";
/*
 * LESSON 4 EXERCISES
 *
 * Complete this small library model. Run `tsc` after every task.
 */
// 2. Make this class abstract and implement ExerciseLibraryItemContract.
class ExerciseLibraryItem {
    // 3. Make this counter private and static.
    static itemCount = 0;
    // 4. Convert `id` and `title` into constructor parameter properties.
    //    `id` should be public and readonly.
    id;
    title;
    // 5. Change this to a TypeScript private field.
    _isAvailable = true;
    // 6. Change this to a JavaScript private field using `#`.
    inventoryCode;
    constructor(id, title, inventoryCode) {
        this.id = id;
        this.title = title;
        this.inventoryCode = inventoryCode;
        ExerciseLibraryItem.itemCount += 1;
    }
    // 7. Convert these methods into a getter and setter named `isAvailable`.
    getAvailability() {
        return this._isAvailable;
    }
    setAvailability(value) {
        this._isAvailable = value;
    }
    // 8. Make this method static and return the item count.
    getItemCount() {
        return ExerciseLibraryItem.itemCount;
    }
    matchesInventoryCode(code) {
        return this.inventoryCode === code;
    }
    // 9. Make this an abstract method.
    getLoanPeriod() {
        return 0;
    }
}
// 10. Extend ExerciseLibraryItem and implement a 21-day loan period.
//     Convert `author` into a public constructor parameter property.
class ExerciseBook extends ExerciseLibraryItem {
    author;
    constructor(id, title, inventoryCode, author) {
        super(id, title, inventoryCode);
        this.author = author;
    }
    getLoanPeriod() {
        return 0;
    }
}
const exerciseBook = new ExerciseBook(1, "The TypeScript Handbook", "BOOK-001", "The TypeScript Team");
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
//# sourceMappingURL=lesson-04-exercises.js.map