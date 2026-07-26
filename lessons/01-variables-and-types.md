# Lesson 1: Variables and basic types

In this lesson, you will learn how TypeScript represents simple values and how
the compiler detects assignments that do not match their expected types.

## What you will learn

By the end of the lesson, you should be able to:

- explain the relationship between TypeScript and JavaScript;
- compile TypeScript with `tsc`;
- choose between `const` and `let`;
- use the `string`, `number`, and `boolean` types;
- recognize inferred and explicitly annotated types;
- understand a basic TypeScript compiler error.

## 1. Start the compiler

Open a terminal in the project directory and run:

```sh
tsc --watch
```

The compiler will now watch the files in `tsFiles/`. Whenever you save a
TypeScript file, it will generate the corresponding JavaScript in `jsFiles/`.
Keep this terminal running during the lesson.

Open `index.html` using a local web server, such as the Live Server extension
for Visual Studio Code. Open your browser's developer tools and select the
Console tab.

## 2. TypeScript and JavaScript

Browsers execute JavaScript, not TypeScript. TypeScript checks your `.ts` files
and then produces `.js` files that the browser can run:

```text
TypeScript source (.ts) → TypeScript compiler → JavaScript output (.js)
```

Open these two files side by side:

- `tsFiles/lesson-01.ts`
- `jsFiles/lesson-01.js`

Notice that the generated JavaScript does not contain type annotations.
TypeScript uses them while checking the program and removes them during
compilation. Do not edit files inside `jsFiles/`; edit their TypeScript sources.

## 3. `const` and `let`

Use `const` when you will not assign a new value to a variable:

```ts
const courseName = "Introduction to TypeScript";
```

Use `let` when the variable must receive a new value later:

```ts
let completedExercises = 0;
completedExercises = 1;
```

Prefer `const` by default. Change it to `let` only when reassignment is part of
the program.

Try adding this line to `tsFiles/lesson-01.ts`:

```ts
courseName = "Another course";
```

Save the file and read the compiler error. Then remove the line.

## 4. Primitive types

This lesson uses three primitive types:

| Type | Example | Represents |
| --- | --- | --- |
| `string` | `"Ada"` | Text |
| `number` | `20` | Integer and decimal numbers |
| `boolean` | `true` | Either `true` or `false` |

TypeScript uses lowercase names for these types.

## 5. Type inference

TypeScript can often determine a variable's type from its initial value:

```ts
const studentName = "Ada";
let studentAge = 20;
let isEnrolled = true;
```

Hover over each variable in your editor. You should see that TypeScript inferred
their types without explicit annotations.

After `studentAge` has been inferred as a `number`, assigning text to it is an
error:

```ts
studentAge = "twenty";
```

Uncomment the matching line near the bottom of `tsFiles/lesson-01.ts`, save the
file, and inspect the error. Comment it again before continuing.

## 6. Explicit type annotations

You can state a variable's expected type after its name:

```ts
let classroom: string = "Room A";
let lessonNumber: number = 1;
let lessonFinished: boolean = false;
```

The general form is:

```text
variableName: type
```

Annotations are useful when they communicate an intention that TypeScript
cannot infer clearly. When the initial value already makes the type obvious,
inference is often sufficient.

## 7. Read compiler errors

Uncomment one incorrect assignment at a time near the bottom of
`tsFiles/lesson-01.ts`. For each error:

1. Save the file.
2. Find the filename and line number in the terminal.
3. Identify the value's type.
4. Identify the type expected by the variable.
5. Comment the line again and confirm that compilation succeeds.

A compiler error is information, not a failure. Read what TypeScript expected
and what it actually received before changing the code.

## 8. Complete the exercises

Open `tsFiles/exercises/lesson-01-exercises.ts` and complete each numbered
task. Run `tsc` after every change.

Try all tasks before opening
`tsFiles/solutions/lesson-01-solutions.ts`. Your chosen values can differ from
the example solution as long as their types and assignments are correct.

## Check your understanding

Consider this code:

```ts
const topic = "TypeScript";
let lesson = 1;
let complete: boolean = false;
```

Make sure you can answer these questions:

1. Which types did TypeScript infer?
2. Which type was explicitly annotated?
3. Which variables may be assigned a new value?
4. Why would `lesson = "one"` cause an error?
5. Does the emitted JavaScript retain `: boolean`?

If any answer is unclear, revisit the relevant section before moving to the
next lesson.
