// 1. Export this interface and class with named exports.
interface ExerciseBookData {
  readonly isbn: string;
  title: string;
  author: string;
}

class ExerciseBook implements ExerciseBookData {
  public constructor(
    public readonly isbn: string,
    public title: string,
    public author: string,
  ) {}
}

export { ExerciseBook };
export type { ExerciseBookData };
