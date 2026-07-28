/*
 * LESSON 9 EXERCISES
 *
 * Replace duplicated object types with derived utility types.
 */
// 6. Replace this object annotation with Record<ExerciseCategory, string>.
const exerciseCategoryLabels = {
    book: "Book",
    video: "Video course",
    workshop: "Workshop",
};
// 10. Add `as const` and derive ExerciseDeliveryMethod from the array.
const exerciseDeliveryMethods = ["download", "stream", "in-person"];
// 11. Add `satisfies Record<ExerciseCategory, number>` to this value.
const exerciseTaxRates = {
    book: 0.04,
    video: 0.22,
    workshop: 0.22,
};
function exerciseCreateCourse(id, input) {
    return { id, ...input };
}
function exerciseUpdateCourse(course, update) {
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
const exercisePrice = 35;
const exerciseKey = "title";
const exerciseMethod = "stream";
const exerciseNullableCourse = exerciseCourse;
console.log(exercisePrice, exerciseKey, exerciseMethod, exerciseNullableCourse, exerciseTaxRates);
export {};
//# sourceMappingURL=lesson-09-exercises.js.map