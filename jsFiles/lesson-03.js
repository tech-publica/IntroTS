"use strict";
/*
 * LESSON 3
 * Object types and type aliases
 */
console.log("--- Lesson 3: object types ---");
// TypeScript infers an object's shape from its properties.
const firstStudent = {
    name: "Ada",
    score: 18,
    isActive: true,
};
console.log(firstStudent.name, firstStudent.score, firstStudent.isActive);
const secondStudent = {
    id: 1,
    name: "Grace",
    score: 20,
    isActive: true,
};
const thirdStudent = {
    id: 2,
    name: "Margaret",
    score: 19,
    isActive: true,
    nickname: "Maggie",
};
// A function can receive a complete object as one parameter.
function createStudentSummary(student) {
    const displayName = student.nickname === undefined
        ? student.name
        : `${student.name} (${student.nickname})`;
    return `${displayName}: ${student.score} points`;
}
console.log(createStudentSummary(secondStudent));
console.log(createStudentSummary(thirdStudent));
// A function can also return an object with a declared shape.
function createStudent(id, name) {
    return {
        id,
        name,
        score: 0,
        isActive: true,
    };
}
const newStudent = createStudent(3, "Linus");
console.log(createStudentSummary(newStudent));
// `const` prevents reassignment, but object properties can still change.
secondStudent.score = 21;
console.log("Updated score:", secondStudent.score);
/*
 * Type errors
 *
 * Uncomment one example at a time and run `tsc`.
 */
// secondStudent.id = 10;
// secondStudent.score = "twenty";
// const incompleteStudent: Student = {
//   id: 4,
//   name: "Alan",
// };
// createStudentSummary({
//   id: 5,
//   name: "Barbara",
//   score: 17,
//   isActive: true,
//   favouriteColour: "blue",
// });
//# sourceMappingURL=lesson-03.js.map