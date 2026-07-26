/*
 * LESSON 4 SOLUTIONS
 */

interface SolutionLibraryItemContract {
  readonly id: number;
  title: string;
  getLoanPeriod(): number;
}

abstract class SolutionLibraryItem
  implements SolutionLibraryItemContract
{
  private static itemCount = 0;
  private _isAvailable = true;
  #inventoryCode: string;

  protected constructor(
    public readonly id: number,
    public title: string,
    inventoryCode: string,
  ) {
    this.#inventoryCode = inventoryCode;
    SolutionLibraryItem.itemCount += 1;
  }

  public get isAvailable(): boolean {
    return this._isAvailable;
  }

  public set isAvailable(value: boolean) {
    this._isAvailable = value;
  }

  public static get totalItems(): number {
    return SolutionLibraryItem.itemCount;
  }

  protected matchesInventoryCode(code: string): boolean {
    return this.#inventoryCode === code;
  }

  public abstract getLoanPeriod(): number;
}

class SolutionBook extends SolutionLibraryItem {
  public constructor(
    id: number,
    title: string,
    inventoryCode: string,
    public author: string,
  ) {
    super(id, title, inventoryCode);
  }

  public override getLoanPeriod(): number {
    return 21;
  }
}

class SolutionMagazine extends SolutionLibraryItem {
  public constructor(
    id: number,
    title: string,
    inventoryCode: string,
    public issueNumber: number,
  ) {
    super(id, title, inventoryCode);
  }

  public override getLoanPeriod(): number {
    return 7;
  }
}

const solutionBook = new SolutionBook(
  1,
  "The TypeScript Handbook",
  "BOOK-001",
  "The TypeScript Team",
);

const solutionMagazine = new SolutionMagazine(
  2,
  "TypeScript Monthly",
  "MAG-002",
  12,
);

console.log("--- Lesson 4 solutions ---");
console.log(solutionBook.title, solutionBook.author);
console.log("Loan period:", solutionBook.getLoanPeriod());
console.log("Available:", solutionBook.isAvailable);
solutionBook.isAvailable = false;
console.log("Available:", solutionBook.isAvailable);
console.log(solutionMagazine.title, solutionMagazine.issueNumber);
console.log("Items:", SolutionLibraryItem.totalItems);
