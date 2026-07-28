"use strict";
/*
 * LESSON 7 SOLUTIONS
 */
function solutionFirst(items) {
    return items[0];
}
class SolutionStore {
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
function solutionReadProperty(object, key) {
    return object[key];
}
function solutionLast(items) {
    return items[items.length - 1];
}
const solutionStringBox = {
    value: "TypeScript",
};
const solutionBookStore = new SolutionStore();
solutionBookStore.add({
    id: 1,
    title: "Learning TypeScript",
    pages: 250,
});
const solutionBookRecord = solutionBookStore.findById(1);
const solutionResponse = {
    data: [...solutionBookStore.getAll()],
    success: true,
};
console.log("--- Lesson 7 solutions ---");
console.log(solutionStringBox);
console.log(solutionFirst([10, 20, 30]));
console.log(solutionBookRecord);
console.log(solutionResponse);
console.log(solutionReadProperty(solutionResponse.data[0], "title"));
console.log(solutionLast(["first", "last"]));
//# sourceMappingURL=lesson-07-solutions.js.map