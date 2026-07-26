/*
 * LESSON 2 SOLUTIONS
 *
 * Wording can vary. These are example implementations.
 */

function solutionGreeting(name: string): string {
  return `Hello, ${name}!`;
}

function solutionTotal(firstScore: number, secondScore: number) {
  return firstScore + secondScore;
}

function solutionAnnouncement(message: string): void {
  console.log(message);
}

function solutionStudentLabel(
  name: string,
  course: string = "TypeScript",
): string {
  return `${name} — ${course}`;
}

function solutionDisplayName(name: string, nickname?: string): string {
  if (nickname === undefined) {
    return name;
  }

  return `${name} (${nickname})`;
}

function solutionStudentReport(
  name: string,
  score: number,
  passingScore: number,
): string {
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
