# Lesson 7: Generics

Generics let code preserve relationships between types while remaining reusable.
Instead of replacing a type with `any`, generic code receives a type as a
parameter and carries that information through its result.

## What you will learn

By the end of this lesson, you should be able to:

- declare and call generic functions;
- understand generic inference;
- use multiple type parameters;
- create generic interfaces and classes;
- restrict generic types with constraints;
- use `keyof` and indexed access types;
- provide a default generic type;
- decide when a generic is useful.

## 1. Prepare the project

Run `tsc --watch`, open `lesson-07.html` through your local web server, and
select the browser's Console tab. The demonstration is in
`tsFiles/lesson-07.ts`.

## 2. Why generics?

Consider a function that returns its argument. Using `any` loses information:

```ts
function unsafeIdentity(value: any): any {
  return value;
}
```

A generic preserves the relationship between input and output:

```ts
function identity<T>(value: T): T {
  return value;
}
```

`T` is a type parameter. It represents a type selected for one call:

```ts
const text = identity("TypeScript"); // string
const count = identity(42);          // number
```

## 3. Inference and explicit type arguments

TypeScript usually infers a generic type from the arguments:

```ts
identity("TypeScript");
```

You can provide the type explicitly when needed:

```ts
identity<number>(42);
```

Prefer inference when it communicates the same result clearly.

## 4. Generic array utilities

A generic function can operate on arrays without losing their element type:

```ts
function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}
```

Calling it with `string[]` produces `string | undefined`; calling it with
`Product[]` produces `Product | undefined`.

The possible `undefined` accurately represents an empty array.

## 5. Multiple type parameters

Use more than one type parameter when several independent types must be
preserved:

```ts
function pair<TFirst, TSecond>(
  first: TFirst,
  second: TSecond,
): [TFirst, TSecond] {
  return [first, second];
}
```

`pair("Keyboard", 2)` returns `[string, number]`. Descriptive parameter names
are often clearer than `T` and `U` when several generics are involved.

## 6. Generic interfaces

A generic interface describes a reusable structure:

```ts
interface DataResponse<TData> {
  data: TData;
  success: boolean;
  message?: string;
}
```

The surrounding structure stays consistent while its payload changes:

```ts
const names: DataResponse<string[]> = {
  data: ["Keyboard", "Mouse"],
  success: true,
};
```

## 7. Generic constraints

Unconstrained `T` has no known properties. A constraint declares a minimum
requirement:

```ts
interface Identifiable {
  readonly id: number;
}

function findById<T extends Identifiable>(
  items: readonly T[],
  id: number,
): T | undefined {
  return items.find((item) => item.id === id);
}
```

The function works with any object type containing a numeric `id` and preserves
the complete element type in its result.

## 8. Generic classes

Classes can store and operate on a selected type:

```ts
class Repository<T extends Identifiable> {
  private items: T[] = [];

  public add(item: T): void {
    this.items.push(item);
  }

  public findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}
```

Creating `new Repository<Product>()` gives every method knowledge of `Product`.
The constraint guarantees that `findById` can access `id`.

## 9. `keyof`

For an object type, `keyof` creates a union of its property names:

```ts
type ProductKey = keyof Product;
// "id" | "name" | "price"
```

Use a key constraint to prevent invalid property names:

```ts
function getProperty<TObject, TKey extends keyof TObject>(
  object: TObject,
  key: TKey,
): TObject[TKey] {
  return object[key];
}
```

`TObject[TKey]` is an indexed access type. It represents the type stored at that
specific key. Reading `"name"` returns `string`; reading `"price"` returns
`number`.

## 10. Generic defaults

A generic parameter can have a default:

```ts
interface Page<TItem = string> {
  items: TItem[];
  pageNumber: number;
}
```

`Page` uses `string`, while `Page<Product>` explicitly uses `Product`.
Defaults are helpful when one type is overwhelmingly common but alternatives
remain valid.

## 11. When to use a generic

A useful generic expresses a relationship:

- input element type to output element type;
- stored type to retrieved type;
- object type and one of its keys;
- payload type inside a reusable wrapper.

Avoid adding a generic used in only one location:

```ts
function logValue<T>(value: T): void {
  console.log(value);
}
```

Here, `unknown` may communicate the requirement more honestly because the
function does not preserve or use the selected type.

## 12. Complete the exercises

Open `tsFiles/exercises/lesson-07-exercises.ts`. You will convert fixed
structures into a generic box, response, array utility, store, and safe property
reader.

Run `tsc` after each change. Attempt the generic `last` bonus before opening
`tsFiles/solutions/lesson-07-solutions.ts`.

## Check your understanding

1. What information does `identity<T>` preserve that `any` loses?
2. When can TypeScript infer a generic type argument?
3. Why does a generic `first` function return `T | undefined`?
4. What does `T extends Identifiable` require?
5. Why does a repository class benefit from being generic?
6. What union does `keyof Product` produce?
7. What does `TObject[TKey]` represent?
8. When is a generic default useful?
9. What relationship does each generic in your code express?
