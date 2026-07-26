"use strict";
/*
 * LESSON 2 SOLUTIONS
 *
 * Wording can vary. These are example implementations.
 */
function solutionGreeting(name) {
    return `Hello, ${name}!`;
}
function solutionTotal(firstScore, secondScore) {
    return firstScore + secondScore;
}
function solutionAnnouncement(message) {
    console.log(message);
}
function solutionStudentLabel(name, course = "TypeScript") {
    return `${name} — ${course}`;
}
function solutionDisplayName(name, nickname) {
    if (nickname === undefined) {
        return name;
    }
    return `${name} (${nickname})`;
}
function solutionStudentReport(name, score, passingScore) {
    const result = score >= passingScore ? "passed" : "did not pass";
    return `${name} scored ${score} and ${result}.`;
}
console.log("--- Lesson 2 solutions ---");
console.log(solutionGreeting("Ada"));
console.log(solutionTotal(12, 8));
solutionAnnouncement("Solution complete");
console.log(solutionStudentLabel("Grace"));
console.log(solutionDisplayName("Margaret", "Maggie"));
console.log(solutionStudentReport("Linus", 18, 15));
//# sourceMappingURL=lesson-02-solutions.js.map