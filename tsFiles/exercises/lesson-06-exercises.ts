/*
 * LESSON 6 EXERCISES
 *
 * Model and safely handle the states of an API request.
 */

type ExerciseLoadingResult = {
  status: "loading";
};

type ExerciseSuccessResult = {
  status: "success";
  data: string[];
};

type ExerciseErrorResult = {
  status: "error";
  message: string;
};

// 1. Create a union containing all three result types.
type ExerciseApiResult = ExerciseLoadingResult;

// 2. Handle every status and return a suitable message.
function exerciseDescribeResult(result: ExerciseApiResult): string {
  return "Request is loading.";
}

// 3. Accept string or number IDs. Format numbers as "ID-<number>" and
//    uppercase string IDs. Use typeof to narrow the value.
function exerciseFormatId(id: string | number): string {
  return String(id);
}

type ExerciseUser = {
  id: number;
  username: string;
};

// 4. Turn this into a custom type guard returning `value is ExerciseUser`.
//    Check that value is a non-null object with numeric id and string username.
function exerciseIsUser(value: unknown): boolean {
  return value !== undefined;
}

// 5. Create an intersection of these two types.
type ExerciseEntity = {
  readonly id: number;
};

type ExerciseTimestamp = {
  createdAt: Date;
};

type ExerciseStoredEntity = ExerciseEntity;

const exerciseResult: ExerciseApiResult = {
  status: "loading",
};

const exerciseUnknownUser: unknown = {
  id: 1,
  username: "ada",
};

console.log("--- Lesson 6 exercises ---");
console.log(exerciseDescribeResult(exerciseResult));
console.log(exerciseFormatId(25));

if (exerciseIsUser(exerciseUnknownUser)) {
  // After task 4, TypeScript should allow access to username here.
  // console.log(exerciseUnknownUser.username);
}

/*
 * Bonus
 *
 * Add an exhaustive `assertNever` function and use it in the default branch
 * of exerciseDescribeResult.
 */
