/*
 * LESSON 7 SOLUTIONS
 */

interface SolutionBox<T> {
  value: T;
}

function solutionFirst<T>(items: readonly T[]): T | undefined {
  return items[0];
}

interface SolutionResponse<TData> {
  data: TData;
  success: boolean;
}

interface SolutionIdentifiable {
  readonly id: number;
}

class SolutionStore<T extends SolutionIdentifiable> {
  private items: T[] = [];

  public add(item: T): void {
    this.items.push(item);
  }

  public findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  public getAll(): readonly T[] {
    return [...this.items];
  }
}

type SolutionBookRecord = {
  readonly id: number;
  title: string;
  pages: number;
};

function solutionReadProperty<TObject, TKey extends keyof TObject>(
  object: TObject,
  key: TKey,
): TObject[TKey] {
  return object[key];
}

function solutionLast<T>(items: readonly T[]): T | undefined {
  return items[items.length - 1];
}

const solutionStringBox: SolutionBox<string> = {
  value: "TypeScript",
};

const solutionBookStore = new SolutionStore<SolutionBookRecord>();
solutionBookStore.add({
  id: 1,
  title: "Learning TypeScript",
  pages: 250,
});

const solutionBookRecord = solutionBookStore.findById(1);
const solutionResponse: SolutionResponse<SolutionBookRecord[]> = {
  data: [...solutionBookStore.getAll()],
  success: true,
};

console.log("--- Lesson 7 solutions ---");
console.log(solutionStringBox);
console.log(solutionFirst([10, 20, 30]));
console.log(solutionBookRecord);
console.log(solutionResponse);
console.log(
  solutionReadProperty(solutionResponse.data[0], "title"),
);
console.log(solutionLast(["first", "last"]));
