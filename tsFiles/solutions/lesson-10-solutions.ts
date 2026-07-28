/*
 * LESSON 10 SOLUTIONS
 */

export {};

interface SolutionSwapiPlanet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  residents: string[];
}

interface SolutionTodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

type SolutionCreateTodoInput = Omit<SolutionTodo, "id">;

function solutionIsRecord(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function solutionIsStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  );
}

function solutionIsPlanet(
  value: unknown,
): value is SolutionSwapiPlanet {
  if (!solutionIsRecord(value)) {
    return false;
  }

  return (
    typeof value.name === "string" &&
    typeof value.climate === "string" &&
    typeof value.terrain === "string" &&
    typeof value.population === "string" &&
    solutionIsStringArray(value.residents)
  );
}

async function solutionGetPlanet(
  id: number,
): Promise<SolutionSwapiPlanet> {
  const response = await fetch(
    `https://swapi.dev/api/planets/${id}/`,
  );

  if (!response.ok) {
    throw new Error(`Planet request failed: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!solutionIsPlanet(data)) {
    throw new Error("Invalid planet data.");
  }

  return data;
}

function solutionIsTodo(value: unknown): value is SolutionTodo {
  if (!solutionIsRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "number" &&
    typeof value.userId === "number" &&
    typeof value.title === "string" &&
    typeof value.completed === "boolean"
  );
}

async function solutionCreateTodo(
  input: SolutionCreateTodoInput,
): Promise<SolutionTodo> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    throw new Error(`Todo request failed: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!solutionIsTodo(data)) {
    throw new Error("Invalid todo data.");
  }

  return data;
}

async function solutionRunRequests(): Promise<void> {
  try {
    const [planet, todo] = await Promise.all([
      solutionGetPlanet(1),
      solutionCreateTodo({
        userId: 1,
        title: "Complete the TypeScript lesson",
        completed: false,
      }),
    ]);

    console.log("--- Lesson 10 solutions ---");
    console.log("Planet:", planet.name, planet.climate);
    console.log("Simulated todo:", todo);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);
    console.error(message);
  }
}

void solutionRunRequests();
