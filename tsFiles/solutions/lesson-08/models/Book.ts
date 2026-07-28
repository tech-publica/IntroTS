export interface SolutionBookData {
  readonly isbn: string;
  title: string;
  author: string;
}

export class SolutionBook implements SolutionBookData {
  public constructor(
    public readonly isbn: string,
    public title: string,
    public author: string,
  ) {}
}
