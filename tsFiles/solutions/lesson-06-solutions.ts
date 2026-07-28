/*
 * LESSON 6 SOLUTIONS
 */

type SolutionLoadingResult = {
  status: "loading";
};

type SolutionSuccessResult = {
  status: "success";
  data: string[];
};

type SolutionErrorResult = {
  status: "error";
  message: string;
};

type SolutionApiResult =
  | SolutionLoadingResult
  | SolutionSuccessResult
  | SolutionErrorResult;

function solutionAssertNever(value: never): never {
  throw new Error(`Unexpected result: ${JSON.stringify(value)}`);
}

function solutionDescribeResult(result: SolutionApiResult): string {
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

function solutionFormatId(id: string | number): string {
  if (typeof id === "number") {
    return `ID-${id}`;
  }

  return id.toUpperCase();
}

type SolutionUser = {
  id: number;
  username: string;
};

function solutionIsUser(value: unknown): value is SolutionUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "username" in value &&
    typeof value.username === "string"
  );
}

type SolutionEntity = {
  readonly id: number;
};

type SolutionTimestamp = {
  createdAt: Date;
};

type SolutionStoredEntity = SolutionEntity & SolutionTimestamp;

const solutionStoredEntity: SolutionStoredEntity = {
  id: 1,
  createdAt: new Date(),
};

const solutionResults: SolutionApiResult[] = [
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
