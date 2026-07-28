/*
 * LESSON 10 EXERCISES
 *
 * Complete a SWAPI GET and a JSONPlaceholder POST.
 */
function exerciseIsRecord(value) {
    return typeof value === "object" && value !== null;
}
// 1. Validate every required planet property.
function exerciseIsPlanet(value) {
    return exerciseIsRecord(value);
}
// 2. Fetch https://swapi.dev/api/planets/<id>/ with GET.
//    Check response.ok, parse as unknown, validate, and return the planet.
async function exerciseGetPlanet(id) {
    return Promise.reject(new Error(`Implement exerciseGetPlanet for planet ${id}.`));
}
// 3. Validate every required todo property.
function exerciseIsTodo(value) {
    return exerciseIsRecord(value);
}
// 4. POST input to https://jsonplaceholder.typicode.com/todos.
//    Send JSON headers/body, check response.ok, validate, and return the result.
async function exerciseCreateTodo(input) {
    return Promise.reject(new Error(`Implement exerciseCreateTodo for ${input.title}.`));
}
// 5. Call both functions in parallel with Promise.all.
async function exerciseRunRequests() {
    console.log("Implement this function after completing the request functions.");
}
// Uncomment after completing the exercises:
// void exerciseRunRequests();
// Keep these declarations in use while the starter is incomplete.
void exerciseIsPlanet;
void exerciseGetPlanet;
void exerciseIsTodo;
void exerciseCreateTodo;
export {};
//# sourceMappingURL=lesson-10-exercises.js.map