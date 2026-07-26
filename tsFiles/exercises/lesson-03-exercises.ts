/*
 * LESSON 3 EXERCISES
 *
 * Model a course with an object type, then use it with functions.
 */

// 1. Review the type of each property.
//    Make `code` readonly and `description` optional.
type ExerciseCourse = {
  code: string;
  title: string;
  durationHours: number;
  isOpen: boolean;
  description: string;
};

// 2. Update this object so that it satisfies `ExerciseCourse`.
const exerciseCourse: ExerciseCourse = {
  code: "TS101",
  title: "Introduction to TypeScript",
  durationHours: 12,
  isOpen: true,
  description: "Learn the foundations of TypeScript.",
};

// 3. Return a sentence containing the course title and duration.
function exerciseCourseSummary(course: ExerciseCourse): string {
  return "Replace this with the course summary";
}

// 4. Return a new `ExerciseCourse`.
//    Use `code` and `title`, and choose sensible defaults for the other fields.
function exerciseCreateCourse(
  code: string,
  title: string,
): ExerciseCourse {
  return exerciseCourse;
}

// 5. Create a second course by calling `exerciseCreateCourse`.
const exerciseSecondCourse = exerciseCreateCourse(
  "JS101",
  "Introduction to JavaScript",
);

console.log("--- Lesson 3 exercises ---");
console.log(exerciseCourseSummary(exerciseCourse));
console.log(exerciseCourseSummary(exerciseSecondCourse));

/*
 * 6. After completing the tasks, predict why each example is invalid.
 *    Uncomment one at a time and run `tsc`.
 */

// exerciseCourse.code = "NEW101";
// exerciseCourse.durationHours = "twelve";

// const exerciseIncompleteCourse: ExerciseCourse = {
//   code: "WEB101",
//   title: "Web Fundamentals",
// };

// exerciseCourseSummary({
//   code: "CSS101",
//   title: "CSS",
//   durationHours: 8,
//   isOpen: true,
//   teacher: "Ada",
// });

/*
 * Bonus
 *
 * Write a function that receives an `ExerciseCourse` and returns a new course
 * with the same values but the opposite `isOpen` value.
 */
