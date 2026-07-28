# Lesson 10: Asynchronous TypeScript and HTTP requests

Asynchronous programs can continue working while waiting for operations such as
network requests. In this lesson, you will use TypeScript with promises,
`async`/`await`, and the browser Fetch API.

The examples use two public teaching APIs:

- [SWAPI](https://swapi.dev/documentation) provides Star Wars data through
  unauthenticated GET requests.
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/guide/) simulates REST
  operations, including POST requests.

JSONPlaceholder does not permanently store created resources. Its POST response
is useful for learning request and response handling, but reloading or fetching
the resource later will not retrieve your submitted data.

## What you will learn

By the end of this lesson, you should be able to:

- explain what `Promise<T>` represents;
- consume promises with `.then`, `.catch`, and `.finally`;
- declare and call `async` functions;
- pause within an async function using `await`;
- perform GET and POST requests with `fetch`;
- check HTTP response status;
- treat external JSON as `unknown`;
- validate API responses with type guards;
- handle caught values safely;
- run independent requests in parallel with `Promise.all`;
- represent request state with a generic discriminated union;
- cancel a request with `AbortController`.

## 1. Prepare the project

Run `tsc --watch`, open `lesson-10.html` through a local web server, and select
the browser's Console tab.

This lesson requires an internet connection. Public APIs can occasionally be
slow, unavailable, or rate limited. A network failure is a valid outcome that
your code must handle.

The demonstration is organized into:

```text
tsFiles/lesson-10/
├── api.ts          # GET and POST request functions
├── index.ts        # Promise consumption and application flow
├── types.ts        # API and request-state types
└── validators.ts   # Runtime validation
```

## 2. Promises

A `Promise<T>` represents an asynchronous operation that will either:

- fulfill with a value of type `T`; or
- reject with a reason.

```ts
const personPromise: Promise<SwapiPerson> =
  getSwapiPerson(1);
```

Creating a promise does not immediately provide a `SwapiPerson`. Code must wait
for it to settle.

## 3. Promise chains

Consume a promise with chained methods:

```ts
personPromise
  .then((person) => {
    console.log(person.name);
  })
  .catch((error: unknown) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Request settled");
  });
```

- `.then` runs when the promise fulfills.
- `.catch` runs when the chain rejects.
- `.finally` runs after either outcome and receives no result.

Each chaining method returns another promise. Returning a value or promise from
`.then` passes it to the next stage.

## 4. `async` functions

Mark a function `async` when it uses `await` or should always return a promise:

```ts
async function loadPerson(): Promise<SwapiPerson> {
  return getSwapiPerson(1);
}
```

An async function always returns a promise. Returning a plain `SwapiPerson`
fulfills the `Promise<SwapiPerson>`; throwing rejects it.

Write the complete return type for public async functions. It documents the
contract and catches accidental return values.

## 5. `await`

`await` pauses the current async function until a promise settles:

```ts
const person = await getSwapiPerson(1);
console.log(person.name);
```

It does not block the entire browser. Other tasks can continue while the
function waits.

If the promise rejects, `await` throws. Use `try`/`catch` when the current
function can handle or translate that failure.

## 6. GET requests with SWAPI

SWAPI exposes people at URLs such as:

```text
https://swapi.dev/api/people/1/
```

Perform a GET request:

```ts
const response = await fetch(
  "https://swapi.dev/api/people/1/",
  { method: "GET" },
);
```

GET is the default method, so the options object can be omitted. It is written
in the demonstration to make the HTTP operation explicit.

`fetch` fulfills when an HTTP response arrives—even for statuses such as 404 or
500. Check `response.ok`:

```ts
if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
```

Network-level failures reject the fetch promise.

## 7. Parse and validate external JSON

Type annotations do not change API responses. External data can be missing
properties or contain unexpected types.

Treat parsed JSON as `unknown`:

```ts
const data: unknown = await response.json();
```

Validate it before returning a typed result:

```ts
if (!isSwapiPerson(data)) {
  throw new Error("Unexpected person data");
}

return data;
```

Writing this is unsafe:

```ts
const person = (await response.json()) as SwapiPerson;
```

The assertion suppresses checking without validating the runtime value.

## 8. POST requests with JSONPlaceholder

POST commonly sends a new resource representation:

```ts
const response = await fetch(
  "https://jsonplaceholder.typicode.com/posts",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  },
);
```

- `method` selects POST.
- `Content-Type` tells the server that the body contains JSON.
- `JSON.stringify` converts the object into request text.

The input type omits the server-generated ID:

```ts
type CreatePostInput = Omit<Post, "id">;
```

The validated response includes an ID. JSONPlaceholder simulates creation but
does not persist it.

## 9. Catch errors as `unknown`

JavaScript permits any value to be thrown, so strict TypeScript treats a caught
value as `unknown`:

```ts
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
```

Narrow before accessing `.message`. More advanced custom error design will be
covered in a later lesson.

## 10. Sequential and parallel requests

These independent requests run sequentially:

```ts
const first = await getSwapiPerson(1);
const second = await getSwapiPerson(5);
```

The second starts only after the first finishes.

Run independent requests together:

```ts
const [first, second] = await Promise.all([
  getSwapiPerson(1),
  getSwapiPerson(5),
]);
```

`Promise.all` preserves the result types and fulfills when every input fulfills.
It rejects when any input rejects. Use it only when operations are independent
and all results are required.

## 11. Request-state unions

Represent UI or application state with a generic discriminated union:

```ts
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
```

Only successful state contains data, and only error state contains an error
message. A `switch` on `status` safely narrows each case.

## 12. Cancellation

Create an `AbortController` and pass its signal to `fetch`:

```ts
const controller = new AbortController();

fetch(url, {
  signal: controller.signal,
});

controller.abort();
```

Aborting rejects the promise, normally with an abort-related error. Cancellation
is useful when a user leaves a page, changes a search quickly, or explicitly
stops an operation.

The demonstration request functions accept an optional `AbortSignal`, allowing
the caller to control cancellation.

## 13. Avoid floating promises

Calling an async function creates a promise:

```ts
runLesson();
```

When deliberately starting an async operation without awaiting its result,
write:

```ts
void runLesson();
```

This communicates that the promise is intentionally not awaited. The async
function must handle its own rejection, as `runLesson` does with `try`/`catch`.

## 14. Complete the exercises

Open `tsFiles/exercises/lesson-10-exercises.ts`.

You will:

1. validate a SWAPI planet;
2. perform a typed GET request;
3. validate a JSONPlaceholder todo;
4. perform a typed POST request;
5. execute both requests using `Promise.all`.

The starter functions deliberately reject until implemented. Uncomment
`void exerciseRunRequests()` only after completing the request functions.

Run the compiled exercise in the browser or with:

```sh
node jsFiles/exercises/lesson-10-exercises.js
```

Open `tsFiles/solutions/lesson-10-solutions.ts` after completing the tasks.

## Check your understanding

1. What does `Promise<Person>` guarantee?
2. Does `fetch` reject automatically for an HTTP 404?
3. Why should parsed JSON begin as `unknown`?
4. What runtime work does an interface perform?
5. What does an `async` function always return?
6. How do sequential requests differ from `Promise.all`?
7. Why is a catch variable `unknown`?
8. What must a JSON POST request usually include?
9. Does JSONPlaceholder permanently store a created post?
10. How does `AbortController` reach a fetch request?
