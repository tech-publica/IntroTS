"use strict";
/*
 * LESSON 7 EXERCISES
 *
 * Build reusable generic containers and utilities.
 */
// 2. Make this function generic and return the first item or undefined.
function exerciseFirst(items) {
    return items[0];
}
// 4. Make this class generic. Constrain T so every item has a numeric id.
//    Replace ExerciseIdentifiable with T throughout the class.
class ExerciseStore {
    items = [];
    add(item) {
        this.items.push(item);
    }
    findById(id) {
        return this.items.find((item) => item.id === id);
    }
    getAll() {
        return [...this.items];
    }
}
// 5. Make this function generic. Constrain key to keyof the object and return
//    the precise property type.
function exerciseReadProperty(object, key) {
    return object[key];
}
const exerciseBookRecord = {
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
//# sourceMappingURL=lesson-07-exercises.js.map