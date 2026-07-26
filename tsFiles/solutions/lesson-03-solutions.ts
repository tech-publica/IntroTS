/*
 * LESSON 3 SOLUTIONS
 *
 * Values and wording can vary. These are example answers.
 */

type SolutionCourse = {
  readonly code: string;
  title: string;
  durationHours: number;
  isOpen: boolean;
  description?: string;
};

const solutionCourse: SolutionCourse = {
  code: "TS101",
  title: "Introduction to TypeScript",
  durationHours: 12,
  isOpen: true,
  description: "Learn the foundations of TypeScript.",
};

function solutionCourseSummary(course: SolutionCourse): string {
  return `${course.title} lasts ${course.durationHours} hours.`;
}

function solutionCreateCourse(
  code: string,
  title: string,
): SolutionCourse {
  return {
    code,
    title,
    durationHours: 10,
    isOpen: true,
  };
}

const solutionSecondCourse = solutionCreateCourse(
  "JS101",
  "Introduction to JavaScript",
);

function solutionToggleCourse(course: SolutionCourse): SolutionCourse {
  return {
    code: course.code,
    title: course.title,
    durationHours: course.durationHours,
    isOpen: !course.isOpen,
    description: course.description,
  };
}

console.log("--- Lesson 3 solutions ---");
console.log(solutionCourseSummary(solutionCourse));
console.log(solutionCourseSummary(solutionSecondCourse));
console.log(solutionToggleCourse(solutionCourse));
