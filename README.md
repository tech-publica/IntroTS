# Introduction to TypeScript

This repository contains examples and exercises for an introductory TypeScript
course. We will add material one lesson at a time.

## Prerequisites

- A recent version of [Node.js](https://nodejs.org/)
- A code editor, such as Visual Studio Code
- A modern web browser

## Install TypeScript

Install the compiler globally so that the `tsc` command is available:

```sh
npm install --global typescript
```

Confirm that the installation worked:

```sh
tsc --version
```

## Compile and run the project

Compile the TypeScript source:

```sh
tsc
```

The compiler reads files from `tsFiles/` and writes JavaScript and source maps
to `jsFiles/`.

During a lesson, watch for changes and compile automatically:

```sh
tsc --watch
```

Serve the project with a local web server, then open `index.html`. For example,
you can use the **Live Server** extension in Visual Studio Code. Open the
browser developer tools to see console output and any errors.

## Project structure

```text
.
├── index.html       # Opens Lesson 1 in the browser
├── lesson-02.html   # Opens Lesson 2 in the browser
├── lesson-03.html   # Opens Lesson 3 in the browser
├── lesson-04.html   # Opens Lesson 4 in the browser
├── lesson-05.html   # Opens Lesson 5 in the browser
├── lesson-06.html   # Opens Lesson 6 in the browser
├── lesson-07.html   # Opens Lesson 7 in the browser
├── lesson-08.html   # Opens Lesson 8 in the browser
├── lesson-09.html   # Opens Lesson 9 in the browser
├── lesson-10.html   # Opens Lesson 10 in the browser
├── lesson-11.html   # Opens the Lesson 11 demonstration
├── lesson-11-exercise.html
├── lesson-11-solution.html
├── lessons/         # Student lesson manuals
├── tsconfig.json    # TypeScript compiler configuration
├── tsFiles/         # Examples, exercises, and solutions
└── jsFiles/         # Generated JavaScript: do not edit by hand
```

## Useful commands

```sh
tsc              # Compile the project
tsc --watch      # Compile whenever a source file changes
tsc --noEmit     # Check types without generating JavaScript
```

The project uses TypeScript's strict mode. Type errors are part of the learning
process: read the compiler message, find the relevant line, and decide what the
types should be before changing the code.

## Lessons

1. [Variables and basic types](lessons/01-variables-and-types.md)
2. [Functions](lessons/02-functions.md)
3. [Object types](lessons/03-object-types.md)
4. [Interfaces and classes](lessons/04-interfaces-and-classes.md)
5. [Arrays and array methods](lessons/05-arrays.md)
6. [Unions and narrowing](lessons/06-unions-and-narrowing.md)
7. [Generics](lessons/07-generics.md)
8. [Modules and project organization](lessons/08-modules.md)
9. [Utility types and advanced object typing](lessons/09-utility-types.md)
10. [Asynchronous TypeScript and HTTP requests](lessons/10-async-and-fetch.md)
11. [DOM manipulation and browser events](lessons/11-dom-manipulation.md)

Lesson 1 covers `const`, `let`, `string`, `number`, `boolean`, type inference,
explicit annotations, and basic compiler errors.

Read the lesson manual and open these files when directed:

1. `tsFiles/lesson-01.ts`
2. `tsFiles/exercises/lesson-01-exercises.ts`
3. `tsFiles/solutions/lesson-01-solutions.ts`

Lesson 2 covers function declarations, parameters, arguments, return types,
`void`, default parameters, and optional parameters.

1. `tsFiles/lesson-02.ts`
2. `tsFiles/exercises/lesson-02-exercises.ts`
3. `tsFiles/solutions/lesson-02-solutions.ts`

Lesson 3 covers object shapes, type aliases, typed object parameters and return
values, optional properties, and read-only properties.

1. `tsFiles/lesson-03.ts`
2. `tsFiles/exercises/lesson-03-exercises.ts`
3. `tsFiles/solutions/lesson-03-solutions.ts`

Lesson 4 provides a comprehensive introduction to interfaces and classes,
including inheritance, abstract classes, constructor parameter properties,
access modifiers, static members, getters, setters, and private fields.

1. `tsFiles/lesson-04.ts`
2. `tsFiles/exercises/lesson-04-exercises.ts`
3. `tsFiles/solutions/lesson-04-solutions.ts`

Lesson 5 covers typed arrays, iteration, arrow-function callbacks, mutation,
searching, testing, transforming, filtering, reducing, sorting, and read-only
array parameters.

1. `tsFiles/lesson-05.ts`
2. `tsFiles/exercises/lesson-05-exercises.ts`
3. `tsFiles/solutions/lesson-05-solutions.ts`

Lesson 6 covers unions, literal types, narrowing, discriminated unions,
exhaustive checks, custom type guards, intersections, `unknown`, and assertions.

1. `tsFiles/lesson-06.ts`
2. `tsFiles/exercises/lesson-06-exercises.ts`
3. `tsFiles/solutions/lesson-06-solutions.ts`

Lesson 7 covers generic functions, interfaces and classes, type inference,
constraints, `keyof`, indexed access types, and generic defaults.

1. `tsFiles/lesson-07.ts`
2. `tsFiles/exercises/lesson-07-exercises.ts`
3. `tsFiles/solutions/lesson-07-solutions.ts`

Lesson 8 covers module scope, named and default exports, type-only imports,
aliases, barrel files, direct browser modules, and multi-file organization.

1. `tsFiles/lesson-08/index.ts`
2. `tsFiles/exercises/lesson-08/index.ts`
3. `tsFiles/solutions/lesson-08/index.ts`

Lesson 9 covers `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`,
`keyof`, indexed access, `typeof`, mapped types, `as const`, and `satisfies`.

1. `tsFiles/lesson-09.ts`
2. `tsFiles/exercises/lesson-09-exercises.ts`
3. `tsFiles/solutions/lesson-09-solutions.ts`

Lesson 10 covers promises, `async`/`await`, safe error handling, SWAPI GET
requests, JSONPlaceholder POST requests, runtime response validation,
`Promise.all`, request-state unions, and cancellation.

1. `tsFiles/lesson-10/index.ts`
2. `tsFiles/exercises/lesson-10-exercises.ts`
3. `tsFiles/solutions/lesson-10-solutions.ts`

Lesson 11 covers safe element selection, element creation and rendering,
forms, typed events, event targets, delegation, data attributes, DOM security,
accessibility, and connecting application state to the page.

1. `tsFiles/lesson-11/index.ts`
2. `tsFiles/exercises/lesson-11-exercises.ts`
3. `tsFiles/solutions/lesson-11-solutions.ts`
