/*
 * LESSON 10 EXERCISES
 *
 * Complete a SWAPI GET and a JSONPlaceholder POST.
 */

export {};

interface ExerciseSwapiPlanet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  residents: string[];
}

interface ExerciseTodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

type ExerciseCreateTodoInput = Omit<ExerciseTodo, "id">;

function exerciseIsRecord(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// 1. Validate every required planet property.
function exerciseIsPlanet(
  value: unknown,
): value is ExerciseSwapiPlanet {
  return exerciseIsRecord(value);
}

// 2. Fetch https://swapi.dev/api/planets/<id>/ with GET.
//    Check response.ok, parse as unknown, validate, and return the planet.
async function exerciseGetPlanet(
  id: number,
): Promise<ExerciseSwapiPlanet> {
  return Promise.reject(
    new Error(`Implement exerciseGetPlanet for planet ${id}.`),
  );
}

// 3. Validate every required todo property.
function exerciseIsTodo(value: unknown): value is ExerciseTodo {
  return exerciseIsRecord(value);
}

// 4. POST input to https://jsonplaceholder.typicode.com/todos.
//    Send JSON headers/body, check response.ok, validate, and return the result.
async function exerciseCreateTodo(
  input: ExerciseCreateTodoInput,
): Promise<ExerciseTodo> {
  return Promise.reject(
    new Error(`Implement exerciseCreateTodo for ${input.title}.`),
  );
}

// 5. Call both functions in parallel with Promise.all.
async function exerciseRunRequests(): Promise<void> {
  console.log(
    "Implement this function after completing the request functions.",
  );
}

// Uncomment after completing the exercises:
// void exerciseRunRequests();

// Keep these declarations in use while the starter is incomplete.
void exerciseIsPlanet;
void exerciseGetPlanet;
void exerciseIsTodo;
void exerciseCreateTodo;
