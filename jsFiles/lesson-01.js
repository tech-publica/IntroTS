"use strict";
/*
 * LESSON 1
 * Variables, primitive types, inference, and annotations
 */
console.log("--- Lesson 1: variables and basic types ---");
// Use `const` when the variable will not be assigned a new value.
const courseName = "Introduction to TypeScript";
// Use `let` when the variable needs to change.
let completedExercises = 0;
completedExercises = 1;
console.log(courseName);
console.log("Completed exercises:", completedExercises);
// TypeScript infers a type from the initial value.
const studentName = "Ada"; // inferred as string
let studentAge = 20; // inferred as number
let isEnrolled = true; // inferred as boolean
console.log(studentName, studentAge, isEnrolled);
// We can also write the type explicitly with a type annotation.
let classroom = "Room A";
let lessonNumber = 1;
let lessonFinished = false;
classroom = "Room B";
lessonNumber = 2;
lessonFinished = true;
console.log(classroom, lessonNumber, lessonFinished);
/*
 * Type errors
 *
 * Uncomment one line at a time, save the file, and run `tsc`.
 * Read the compiler error before commenting the line again.
 */
// studentAge = "twenty";
// lessonNumber = "two";
// isEnrolled = 1;
/*
 * TypeScript checks types while compiling. The emitted JavaScript does not
 * contain annotations: browsers still execute JavaScript, not TypeScript.
 */
//# sourceMappingURL=lesson-01.js.map