"use strict";
/*
 * LESSON 6 EXERCISES
 *
 * Model and safely handle the states of an API request.
 */
// 2. Handle every status and return a suitable message.
function exerciseDescribeResult(result) {
    return "Request is loading.";
}
// 3. Accept string or number IDs. Format numbers as "ID-<number>" and
//    uppercase string IDs. Use typeof to narrow the value.
function exerciseFormatId(id) {
    return String(id);
}
// 4. Turn this into a custom type guard returning `value is ExerciseUser`.
//    Check that value is a non-null object with numeric id and string username.
function exerciseIsUser(value) {
    return value !== undefined;
}
const exerciseResult = {
    status: "loading",
};
const exerciseUnknownUser = {
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
//# sourceMappingURL=lesson-06-exercises.js.map