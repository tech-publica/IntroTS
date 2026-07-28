/*
 * LESSON 10 SOLUTIONS
 */
function solutionIsRecord(value) {
    return typeof value === "object" && value !== null;
}
function solutionIsStringArray(value) {
    return (Array.isArray(value) &&
        value.every((item) => typeof item === "string"));
}
function solutionIsPlanet(value) {
    if (!solutionIsRecord(value)) {
        return false;
    }
    return (typeof value.name === "string" &&
        typeof value.climate === "string" &&
        typeof value.terrain === "string" &&
        typeof value.population === "string" &&
        solutionIsStringArray(value.residents));
}
async function solutionGetPlanet(id) {
    const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
    if (!response.ok) {
        throw new Error(`Planet request failed: ${response.status}`);
    }
    const data = await response.json();
    if (!solutionIsPlanet(data)) {
        throw new Error("Invalid planet data.");
    }
    return data;
}
function solutionIsTodo(value) {
    if (!solutionIsRecord(value)) {
        return false;
    }
    return (typeof value.id === "number" &&
        typeof value.userId === "number" &&
        typeof value.title === "string" &&
        typeof value.completed === "boolean");
}
async function solutionCreateTodo(input) {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });
    if (!response.ok) {
        throw new Error(`Todo request failed: ${response.status}`);
    }
    const data = await response.json();
    if (!solutionIsTodo(data)) {
        throw new Error("Invalid todo data.");
    }
    return data;
}
async function solutionRunRequests() {
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
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(message);
    }
}
void solutionRunRequests();
export {};
//# sourceMappingURL=lesson-10-solutions.js.map