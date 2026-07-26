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
