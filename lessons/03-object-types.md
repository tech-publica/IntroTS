# Lesson 3: Object types

Objects group related values under named properties. TypeScript can describe
the required, optional, and read-only properties that form an object's shape.

## What you will learn

By the end of this lesson, you should be able to:

- create an object and access its properties;
- recognize an inferred object shape;
- describe an object with an explicit type;
- create reusable object types with `type`;
- use object types in function parameters and return values;
- declare optional and read-only properties;
- understand missing, incorrect, and excess property errors.

## 1. Prepare the project

Open a terminal in the project directory and start the compiler:

```sh
tsc --watch
```

Keep the terminal running. Open `lesson-03.html` through your local web server,
then open the browser console.

The demonstration code is in `tsFiles/lesson-03.ts`.

## 2. Create an object

An object stores related values as properties:

```ts
const student = {
  name: "Ada",
  score: 18,
  isActive: true,
};
```

Access a property with a dot followed by its name:

```ts
console.log(student.name);
console.log(student.score);
```

Hover over `student` in your editor. TypeScript inferred an object shape with a
`string`, a `number`, and a `boolean` property.

Trying to access a property that is not part of that shape produces an error:

```ts
student.email;
```

## 3. Describe an object shape

You can write an object type directly:

```ts
const course: {
  title: string;
  durationHours: number;
  isOpen: boolean;
} = {
  title: "Introduction to TypeScript",
  durationHours: 12,
  isOpen: true,
};
```

Every required property must be present and must contain the expected type.
Writing large object types repeatedly is inconvenient, so TypeScript provides
type aliases.

## 4. Create a type alias

The `type` keyword gives a reusable name to a type:

```ts
type Student = {
  id: number;
  name: string;
  score: number;
  isActive: boolean;
};
```

You can now use `Student` as an annotation:

```ts
const student: Student = {
  id: 1,
  name: "Grace",
  score: 20,
  isActive: true,
};
```

Type aliases exist for type checking. Like annotations, they do not appear in
the generated JavaScript.

## 5. Pass objects to functions

Instead of passing several separate values, a function can accept one typed
object:

```ts
function createStudentSummary(student: Student): string {
  return `${student.name}: ${student.score} points`;
}
```

The function can safely access the properties defined by `Student`. The caller
must provide an object with the required shape.

## 6. Return objects from functions

An explicit return type checks the shape of a returned object:

```ts
function createStudent(id: number, name: string): Student {
  return {
    id,
    name,
    score: 0,
    isActive: true,
  };
}
```

The shorter `id,` and `name,` syntax is called property shorthand. It is
equivalent to writing `id: id` and `name: name`.

Remove one property from the returned object, save the file, and inspect the
compiler error. Restore it before continuing.

## 7. Optional properties

Add `?` after a property name when that property does not have to exist:

```ts
type Student = {
  name: string;
  nickname?: string;
};
```

Both objects satisfy this type:

```ts
const first: Student = { name: "Ada" };
const second: Student = { name: "Margaret", nickname: "Maggie" };
```

When reading `nickname`, its value might be `undefined`. Check for that case
before treating it as a definite `string`.

## 8. Read-only properties

Use `readonly` when a property should not be reassigned after the object is
created:

```ts
type Student = {
  readonly id: number;
  name: string;
};
```

This is valid:

```ts
student.name = "A new name";
```

This produces a compiler error:

```ts
student.id = 10;
```

`readonly` is a TypeScript check; it does not freeze the object at runtime.

## 9. `const` and object properties

Declaring an object with `const` prevents reassignment of the variable:

```ts
const student = { name: "Ada", score: 18 };
```

The properties can still change:

```ts
student.score = 20;
```

However, assigning an entirely different object to `student` is not allowed.
Use `readonly` when a specific property must not be reassigned.

## 10. Investigate object errors

Near the bottom of `tsFiles/lesson-03.ts`, you will find commented examples.
Before uncommenting each one, decide whether it contains:

- an assignment to a read-only property;
- a property value with the wrong type;
- missing required properties;
- an unexpected property in an object literal.

Uncomment one example at a time, save the file, and compare the compiler message
with your prediction. Restore the comments before continuing.

## 11. Complete the exercises

Open `tsFiles/exercises/lesson-03-exercises.ts`. You will define a reusable
course type, create course objects, and pass them to functions.

Run `tsc` after each task. Attempt the bonus before opening
`tsFiles/solutions/lesson-03-solutions.ts`.

## Check your understanding

Consider this type and object:

```ts
type Book = {
  readonly isbn: string;
  title: string;
  subtitle?: string;
  pages: number;
};

const book: Book = {
  isbn: "978-0-00-000000-0",
  title: "Learning TypeScript",
  pages: 250,
};
```

Make sure you can answer these questions:

1. Which properties are required?
2. Which property is optional?
3. Which property cannot be reassigned?
4. Is `book.title = "New title"` valid?
5. Is `book.pages = "250"` valid?
6. Does the `Book` type exist in the generated JavaScript?

If any answer is unclear, revisit the relevant section before moving on.
