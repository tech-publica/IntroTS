"use strict";
/*
 * LESSON 4 SOLUTIONS
 */
class SolutionLibraryItem {
    id;
    title;
    static itemCount = 0;
    _isAvailable = true;
    #inventoryCode;
    constructor(id, title, inventoryCode) {
        this.id = id;
        this.title = title;
        this.#inventoryCode = inventoryCode;
        SolutionLibraryItem.itemCount += 1;
    }
    get isAvailable() {
        return this._isAvailable;
    }
    set isAvailable(value) {
        this._isAvailable = value;
    }
    static get totalItems() {
        return SolutionLibraryItem.itemCount;
    }
    matchesInventoryCode(code) {
        return this.#inventoryCode === code;
    }
}
class SolutionBook extends SolutionLibraryItem {
    author;
    constructor(id, title, inventoryCode, author) {
        super(id, title, inventoryCode);
        this.author = author;
    }
    getLoanPeriod() {
        return 21;
    }
}
class SolutionMagazine extends SolutionLibraryItem {
    issueNumber;
    constructor(id, title, inventoryCode, issueNumber) {
        super(id, title, inventoryCode);
        this.issueNumber = issueNumber;
    }
    getLoanPeriod() {
        return 7;
    }
}
const solutionBook = new SolutionBook(1, "The TypeScript Handbook", "BOOK-001", "The TypeScript Team");
const solutionMagazine = new SolutionMagazine(2, "TypeScript Monthly", "MAG-002", 12);
console.log("--- Lesson 4 solutions ---");
console.log(solutionBook.title, solutionBook.author);
console.log("Loan period:", solutionBook.getLoanPeriod());
console.log("Available:", solutionBook.isAvailable);
solutionBook.isAvailable = false;
console.log("Available:", solutionBook.isAvailable);
console.log(solutionMagazine.title, solutionMagazine.issueNumber);
console.log("Items:", SolutionLibraryItem.totalItems);
//# sourceMappingURL=lesson-04-solutions.js.map