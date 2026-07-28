/*
 * LESSON 9 SOLUTIONS
 */
const solutionCategoryLabels = {
    book: "Book",
    video: "Video course",
    workshop: "Workshop",
};
const solutionDeliveryMethods = [
    "download",
    "stream",
    "in-person",
];
const solutionTaxRates = {
    book: 0.04,
    video: 0.22,
    workshop: 0.22,
};
function solutionCreateCourse(id, input) {
    return { id, ...input };
}
function solutionUpdateCourse(course, update) {
    return { ...course, ...update };
}
const solutionCourse = solutionCreateCourse(1, {
    title: "TypeScript Fundamentals",
    price: 40,
    category: "video",
});
const solutionUpdatedCourse = solutionUpdateCourse(solutionCourse, {
    price: 35,
});
const solutionCard = {
    id: solutionUpdatedCourse.id,
    title: solutionUpdatedCourse.title,
    price: solutionUpdatedCourse.price,
};
const solutionCompleteCourse = {
    ...solutionUpdatedCourse,
    description: "A complete TypeScript course.",
};
const solutionSnapshot = solutionCompleteCourse;
const solutionNullableCourse = {
    id: null,
    title: null,
    price: null,
    category: null,
    description: null,
};
const solutionKey = "title";
const solutionPrice = 35;
const solutionMethod = "stream";
console.log("--- Lesson 9 solutions ---");
console.log(solutionUpdatedCourse);
console.log(solutionCard);
console.log(solutionSnapshot);
console.log(solutionNullableCourse);
console.log(solutionCategoryLabels, solutionTaxRates, solutionKey, solutionPrice, solutionMethod);
export {};
//# sourceMappingURL=lesson-09-solutions.js.map