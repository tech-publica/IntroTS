/*
 * LESSON 7 EXERCISES
 *
 * Build reusable generic containers and utilities.
 */

// 1. Make this interface generic so value has type T.
interface ExerciseBox {
  value: string;
}

// 2. Make this function generic and return the first item or undefined.
function exerciseFirst(items: readonly string[]): string | undefined {
  return items[0];
}

// 3. Make this response interface generic so data can have any chosen type.
interface ExerciseResponse {
  data: string;
  success: boolean;
}

interface ExerciseIdentifiable {
  readonly id: number;
}

// 4. Make this class generic. Constrain T so every item has a numeric id.
//    Replace ExerciseIdentifiable with T throughout the class.
class ExerciseStore {
  private items: ExerciseIdentifiable[] = [];

  public add(item: ExerciseIdentifiable): void {
    this.items.push(item);
  }

  public findById(id: number): ExerciseIdentifiable | undefined {
    return this.items.find((item) => item.id === id);
  }

  public getAll(): readonly ExerciseIdentifiable[] {
    return [...this.items];
  }
}

type ExerciseBookRecord = {
  readonly id: number;
  title: string;
  pages: number;
};

// 5. Make this function generic. Constrain key to keyof the object and return
//    the precise property type.
function exerciseReadProperty(
  object: ExerciseBookRecord,
  key: keyof ExerciseBookRecord,
): ExerciseBookRecord[keyof ExerciseBookRecord] {
  return object[key];
}

const exerciseBookRecord: ExerciseBookRecord = {
  id: 1,
  title: "Learning TypeScript",
  pages: 250,
};

console.log("--- Lesson 7 exercises ---");
console.log(exerciseFirst(["one", "two"]));
console.log(exerciseReadProperty(exerciseBookRecord, "title"));

/*
 * Bonus
 *
 * Write a generic function named exerciseLast that returns the last element
 * of a readonly array, or undefined when the array is empty.
 */
