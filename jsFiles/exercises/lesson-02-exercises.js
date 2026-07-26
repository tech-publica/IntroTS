"use strict";
/*
 * LESSON 2 EXERCISES
 *
 * Complete each function and run `tsc` after every change.
 */
// 1. Return a greeting that includes `name`.
function exerciseGreeting(name) {
    return "Replace this with a greeting";
}
// 2. Return the sum of `firstScore` and `secondScore`.
//    Remove the explicit return type and inspect the inferred type in your editor.
function exerciseTotal(firstScore, secondScore) {
    return 0;
}
// 3. Print `message` to the console. This function should return `void`.
function exerciseAnnouncement(message) {
    // Add your code here.
}
// 4. Make `course` default to "TypeScript".
function exerciseStudentLabel(name, course) {
    return `${name} — ${course}`;
}
// 5. Make `nickname` optional. If it is provided, include it in parentheses.
//    Otherwise, return only the student's name.
function exerciseDisplayName(name, nickname) {
    return name;
}
console.log("--- Lesson 2 exercises ---");
console.log(exerciseGreeting("Ada"));
console.log(exerciseTotal(12, 8));
exerciseAnnouncement("Exercise in progress");
console.log(exerciseStudentLabel("Grace", "TypeScript"));
console.log(exerciseDisplayName("Margaret", "Maggie"));
/*
 * 6. After completing the functions, predict which calls below are invalid.
 *    Uncomment them one at a time and use the compiler to check your answers.
 */
// exerciseGreeting();
// exerciseTotal(10, "5");
// exerciseAnnouncement(100);
// exerciseStudentLabel("Grace");
// exerciseDisplayName("Margaret");
/*
 * Bonus: Student report
 *
 * Write a function named `exerciseStudentReport` that receives a name, score,
 * and passing score. It should return a sentence containing the student's name,
 * score, and whether the student passed.
 */
//# sourceMappingURL=lesson-02-exercises.js.map