/*
 * LESSON 9 SOLUTIONS
 */

export {};

type SolutionCategory = "book" | "video" | "workshop";

interface SolutionCourse {
  readonly id: number;
  title: string;
  price: number;
  category: SolutionCategory;
  description?: string;
}

type SolutionCreateCourseInput = Omit<SolutionCourse, "id">;

type SolutionUpdateCourseInput = Partial<
  Omit<SolutionCourse, "id">
>;

type SolutionCourseCard = Pick<
  SolutionCourse,
  "id" | "title" | "price"
>;

type SolutionCompleteCourse = Required<SolutionCourse>;
type SolutionCourseSnapshot = Readonly<SolutionCourse>;

const solutionCategoryLabels: Record<SolutionCategory, string> = {
  book: "Book",
  video: "Video course",
  workshop: "Workshop",
};

type SolutionCourseKey = keyof SolutionCourse;
type SolutionCoursePrice = SolutionCourse["price"];

type SolutionNullable<T> = {
  [Key in keyof T]: T[Key] | null;
};

const solutionDeliveryMethods = [
  "download",
  "stream",
  "in-person",
] as const;

type SolutionDeliveryMethod =
  (typeof solutionDeliveryMethods)[number];

const solutionTaxRates = {
  book: 0.04,
  video: 0.22,
  workshop: 0.22,
} satisfies Record<SolutionCategory, number>;

function solutionCreateCourse(
  id: number,
  input: SolutionCreateCourseInput,
): SolutionCourse {
  return { id, ...input };
}

function solutionUpdateCourse(
  course: SolutionCourse,
  update: SolutionUpdateCourseInput,
): SolutionCourse {
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

const solutionCard: SolutionCourseCard = {
  id: solutionUpdatedCourse.id,
  title: solutionUpdatedCourse.title,
  price: solutionUpdatedCourse.price,
};

const solutionCompleteCourse: SolutionCompleteCourse = {
  ...solutionUpdatedCourse,
  description: "A complete TypeScript course.",
};

const solutionSnapshot: SolutionCourseSnapshot =
  solutionCompleteCourse;

const solutionNullableCourse: SolutionNullable<SolutionCourse> = {
  id: null,
  title: null,
  price: null,
  category: null,
  description: null,
};

const solutionKey: SolutionCourseKey = "title";
const solutionPrice: SolutionCoursePrice = 35;
const solutionMethod: SolutionDeliveryMethod = "stream";

console.log("--- Lesson 9 solutions ---");
console.log(solutionUpdatedCourse);
console.log(solutionCard);
console.log(solutionSnapshot);
console.log(solutionNullableCourse);
console.log(
  solutionCategoryLabels,
  solutionTaxRates,
  solutionKey,
  solutionPrice,
  solutionMethod,
);
