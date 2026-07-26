# Lesson 2: Functions

Functions group instructions into reusable pieces of code. In TypeScript, types
describe the values a function accepts and the value it returns.

## What you will learn

By the end of this lesson, you should be able to:

- declare and call a function;
- add types to function parameters;
- use inferred and explicit return types;
- recognize a function that returns `void`;
- use default and optional parameters;
- understand errors caused by invalid function arguments.

## 1. Prepare the project

Open a terminal in the project directory and start the compiler:

```sh
tsc --watch
```

Keep the terminal running. Open `lesson-02.html` through your local web server,
then open the browser console.

The demonstration code is in `tsFiles/lesson-02.ts`.

## 2. Declare and call a function

A function declaration has a name, parameters, and a body:

```ts
function createWelcomeMessage(name: string): string {
  return `Welcome, ${name}!`;
}
```

Call the function by writing its name followed by parentheses:

```ts
const message = createWelcomeMessage("Ada");
```

In this example:

- `name` is a parameter;
- `"Ada"` is an argument;
- `name: string` requires the argument to be text;
- the final `: string` describes the returned value.

Try changing `"Ada"` to `42`, save the file, and inspect the compiler error.
Restore the valid argument before continuing.

## 3. Multiple parameters

Separate multiple parameters with commas:

```ts
function addPoints(currentPoints: number, newPoints: number): number {
  return currentPoints + newPoints;
}

const total = addPoints(10, 5);
```

Arguments are matched to parameters by position. The first argument belongs to
`currentPoints`, and the second belongs to `newPoints`.

Unless a parameter is optional or has a default value, a call must supply one
argument for every parameter.

## 4. Return types and inference

TypeScript can infer a return type from the returned expression:

```ts
function addPoints(currentPoints: number, newPoints: number) {
  return currentPoints + newPoints;
}
```

Hover over `addPoints` in your editor. TypeScript should show that it returns a
`number`.

An explicit return type documents your intention and makes TypeScript check
that every returned value matches it:

```ts
function createTitle(title: string): string {
  return title.toUpperCase();
}
```

Both styles are valid. Use an explicit return type when it makes the function's
contract clearer.

## 5. Functions that return `void`

Some functions perform an action without returning a useful value:

```ts
function printMessage(message: string): void {
  console.log(message);
}
```

The `void` return type communicates that callers should not expect a result
from the function.

## 6. Default parameters

A default parameter supplies a value when the caller omits that argument:

```ts
function createBadge(name: string, level: number = 1): string {
  return `${name} — level ${level}`;
}

createBadge("Grace");    // uses level 1
createBadge("Linus", 3); // uses level 3
```

A required parameter should normally come before a parameter with a default.

## 7. Optional parameters

Add `?` after a parameter's name to make it optional:

```ts
function describeStudent(name: string, nickname?: string): string {
  if (nickname === undefined) {
    return name;
  }

  return `${name} (${nickname})`;
}
```

Both calls are valid:

```ts
describeStudent("Margaret");
describeStudent("Margaret", "Maggie");
```

Inside the function, an optional parameter might be `undefined`. Check for that
case before using it as a definite `string`.

## 8. Investigate compiler errors

Near the bottom of `tsFiles/lesson-02.ts`, you will find several commented
function calls. Before uncommenting them, predict whether each call has:

- an argument with the wrong type;
- a missing required argument;
- too many arguments.

Uncomment one call at a time, save the file, and compare the compiler message
with your prediction. Comment the call again before testing the next one.

## 9. Complete the exercises

Open `tsFiles/exercises/lesson-02-exercises.ts` and complete the numbered tasks.
Run `tsc` after every change and resolve all errors before continuing.

Try the bonus student-report function after the main exercises. Open
`tsFiles/solutions/lesson-02-solutions.ts` only after attempting the work
yourself.

## Check your understanding

Consider this function:

```ts
function formatScore(name: string, score: number = 0): string {
  return `${name}: ${score}`;
}
```

Make sure you can answer these questions:

1. Which parameters does the function declare?
2. Which parameter has a default value?
3. What is the function's return type?
4. Is `formatScore("Ada")` valid?
5. Is `formatScore("Ada", "ten")` valid?
6. What is the difference between a parameter and an argument?

If any answer is unclear, revisit the relevant section before moving on.
