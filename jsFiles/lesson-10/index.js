/*
 * LESSON 10
 * Asynchronous TypeScript and HTTP requests
 */
import { createJsonPlaceholderPost, getSwapiPerson, } from "./api.js";
console.log("--- Lesson 10: asynchronous TypeScript ---");
function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}
// A Promise<T> represents a T value that may become available later.
const personPromise = getSwapiPerson(1);
// then handles fulfillment, catch handles rejection, and finally always runs.
personPromise
    .then((person) => {
    console.log(`Promise chain result: ${person.name}`);
})
    .catch((error) => {
    console.error(getErrorMessage(error));
})
    .finally(() => {
    console.log("The promise chain has settled.");
});
let peopleState = {
    status: "idle",
};
async function runLesson() {
    peopleState = { status: "loading" };
    console.log("People state:", peopleState.status);
    try {
        // Promise.all starts both GET requests together and preserves result types.
        const people = await Promise.all([
            getSwapiPerson(1),
            getSwapiPerson(5),
        ]);
        peopleState = {
            status: "success",
            data: people,
        };
        people.forEach((person) => {
            console.log(`${person.name}: ${person.height} cm, ${person.films.length} films`);
        });
        const createdPost = await createJsonPlaceholderPost({
            userId: 1,
            title: "Learning asynchronous TypeScript",
            body: "Promises and fetch preserve useful type information.",
        });
        console.log("Simulated created post:", createdPost);
    }
    catch (error) {
        peopleState = {
            status: "error",
            message: getErrorMessage(error),
        };
        console.error("Lesson request failed:", peopleState.message);
    }
}
void runLesson();
// AbortController can cancel a fetch through its signal.
const unusedControllerExample = new AbortController();
console.log("Cancellation signal initially aborted:", unusedControllerExample.signal.aborted);
//# sourceMappingURL=index.js.map