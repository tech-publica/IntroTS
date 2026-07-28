"use strict";
/*
 * LESSON 6 SOLUTIONS
 */
function solutionAssertNever(value) {
    throw new Error(`Unexpected result: ${JSON.stringify(value)}`);
}
function solutionDescribeResult(result) {
    switch (result.status) {
        case "loading":
            return "Request is loading.";
        case "success":
            return `Received ${result.data.length} items.`;
        case "error":
            return `Request failed: ${result.message}`;
        default:
            return solutionAssertNever(result);
    }
}
function solutionFormatId(id) {
    if (typeof id === "number") {
        return `ID-${id}`;
    }
    return id.toUpperCase();
}
function solutionIsUser(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    return ("id" in value &&
        typeof value.id === "number" &&
        "username" in value &&
        typeof value.username === "string");
}
const solutionStoredEntity = {
    id: 1,
    createdAt: new Date(),
};
const solutionResults = [
    { status: "loading" },
    { status: "success", data: ["keyboard", "mouse"] },
    { status: "error", message: "Network unavailable" },
];
console.log("--- Lesson 6 solutions ---");
solutionResults.forEach((result) => {
    console.log(solutionDescribeResult(result));
});
console.log(solutionFormatId(25));
console.log(solutionStoredEntity);
//# sourceMappingURL=lesson-06-solutions.js.map