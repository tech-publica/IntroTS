"use strict";
/*
 * LESSON 2
 * Functions, parameters, and return types
 */
console.log("--- Lesson 2: functions ---");
// A function can receive typed parameters and return a typed value.
function createWelcomeMessage(name) {
    return `Welcome, ${name}!`;
}
const lessonTwoWelcome = createWelcomeMessage("Ada");
console.log(lessonTwoWelcome);
// TypeScript can infer a function's return type.
function addPoints(currentPoints, newPoints) {
    return currentPoints + newPoints;
}
const lessonTwoTotal = addPoints(10, 5);
console.log("Total points:", lessonTwoTotal);
// `void` describes a function that does not return a useful value.
function printLessonMessage(message) {
    console.log(message);
}
printLessonMessage("Functions can make code reusable.");
// A default parameter supplies a value when an argument is omitted.
function createBadge(name, level = 1) {
    return `${name} — level ${level}`;
}
console.log(createBadge("Grace"));
console.log(createBadge("Linus", 3));
// A question mark makes a parameter optional.
function describeStudent(name, nickname) {
    if (nickname === undefined) {
        return name;
    }
    return `${name} (${nickname})`;
}
console.log(describeStudent("Margaret"));
console.log(describeStudent("Margaret", "Maggie"));
/*
 * Type errors
 *
 * Uncomment one line at a time and run `tsc`.
 */
// createWelcomeMessage(42);
// addPoints(10, "5");
// createWelcomeMessage();
// createBadge("Ada", 1, "extra");
//# sourceMappingURL=lesson-02.js.map