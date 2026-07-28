/*
 * LESSON 9 EXERCISES
 *
 * Replace duplicated object types with derived utility types.
 */

export {};

type ExerciseCategory = "book" | "video" | "workshop";

interface ExerciseCourse {
  readonly id: number;
  title: string;
  price: number;
  category: ExerciseCategory;
  description?: string;
}

// 1. Replace this duplicated type with Omit<ExerciseCourse, "id">.
type ExerciseCreateCourseInput = {
  title: string;
  price: number;
  category: ExerciseCategory;
  description?: string;
};

// 2. Derive this type using Partial and Omit. The id must not be updateable.
type ExerciseUpdateCourseInput = {
  title?: string;
  price?: number;
  category?: ExerciseCategory;
  description?: string;
};

// 3. Replace this type with Pick containing id, title, and price.
type ExerciseCourseCard = {
  readonly id: number;
  title: string;
  price: number;
};

// 4. Use Required so description is mandatory.
type ExerciseCompleteCourse = ExerciseCourse;

// 5. Use Readonly so no course property can be reassigned.
type ExerciseCourseSnapshot = ExerciseCourse;

// 6. Replace this object annotation with Record<ExerciseCategory, string>.
const exerciseCategoryLabels: {
  book: string;
  video: string;
  workshop: string;
} = {
  book: "Book",
  video: "Video course",
  workshop: "Workshop",
};

// 7. Create a union of ExerciseCourse's property keys using keyof.
type ExerciseCourseKey = string;

// 8. Use indexed access to obtain the type of ExerciseCourse["price"].
type ExerciseCoursePrice = number;

// 9. Turn this into a generic mapped type that makes every property nullable.
type ExerciseNullable<T> = T;

// 10. Add `as const` and derive ExerciseDeliveryMethod from the array.
const exerciseDeliveryMethods = ["download", "stream", "in-person"];
type ExerciseDeliveryMethod = string;

// 11. Add `satisfies Record<ExerciseCategory, number>` to this value.
const exerciseTaxRates = {
  book: 0.04,
  video: 0.22,
  workshop: 0.22,
};

function exerciseCreateCourse(
  id: number,
  input: ExerciseCreateCourseInput,
): ExerciseCourse {
  return { id, ...input };
}

function exerciseUpdateCourse(
  course: ExerciseCourse,
  update: ExerciseUpdateCourseInput,
): ExerciseCourse {
  return { ...course, ...update };
}

const exerciseCourse = exerciseCreateCourse(1, {
  title: "TypeScript Fundamentals",
  price: 40,
  category: "video",
});

const exerciseUpdatedCourse = exerciseUpdateCourse(exerciseCourse, {
  price: 35,
});

console.log("--- Lesson 9 exercises ---");
console.log(exerciseUpdatedCourse);
console.log(exerciseCategoryLabels[exerciseUpdatedCourse.category]);

// Use these types after completing the tasks:
const exercisePrice: ExerciseCoursePrice = 35;
const exerciseKey: ExerciseCourseKey = "title";
const exerciseMethod: ExerciseDeliveryMethod = "stream";
const exerciseNullableCourse: ExerciseNullable<ExerciseCourse> = exerciseCourse;

console.log(
  exercisePrice,
  exerciseKey,
  exerciseMethod,
  exerciseNullableCourse,
  exerciseTaxRates,
);
