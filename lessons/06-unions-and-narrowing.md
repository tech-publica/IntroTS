# Lesson 6: Unions and narrowing

Union types let a value have more than one possible type. Narrowing lets
TypeScript determine which possibility is present before you use it.

## What you will learn

By the end of this lesson, you should be able to:

- create union and literal types;
- narrow values with `typeof`, equality, `in`, and `instanceof`;
- model related states with discriminated unions;
- check every union member with `never`;
- write a custom type guard;
- combine types with intersections;
- distinguish `unknown` from `any`;
- understand the risk of type assertions.

## 1. Prepare the project

Run `tsc --watch`, open `lesson-06.html` through your local web server, and
select the browser's Console tab. The demonstration is in
`tsFiles/lesson-06.ts`.

## 2. Union types

The `|` operator allows any of several types:

```ts
function formatId(id: string | number): string {
  if (typeof id === "number") {
    return `ID-${id}`;
  }

  return id.toUpperCase();
}
```

Before the check, only operations valid for both `string` and `number` are
allowed. The `typeof` check narrows `id` to `number` in one branch and `string`
in the other.

Do not use a union merely to avoid deciding what data should look like. Use one
when each member represents a genuinely valid possibility.

## 3. Literal types

A literal type permits one exact value:

```ts
let status: "pending";
status = "pending";
```

Combine literal types into a controlled set of choices:

```ts
type OrderStatus = "pending" | "paid" | "cancelled";
```

This is more precise than `string`: misspellings and unsupported states become
compiler errors.

## 4. Narrow with equality and truthiness

Comparisons can narrow literal unions:

```ts
if (status === "paid") {
  // status is "paid" here
}
```

Truthiness can exclude values such as `undefined`, `null`, `""`, `0`, and
`false`. Be careful when those values are meaningful:

```ts
function printName(name: string | undefined): void {
  if (name !== undefined) {
    console.log(name);
  }
}
```

An explicit comparison is often clearer than a truthiness check.

## 5. Narrow with `in`

The `in` operator checks whether a property exists:

```ts
type EmailContact = { email: string };
type PhoneContact = { phone: string };

function contact(value: EmailContact | PhoneContact): string {
  if ("email" in value) {
    return `Emailing ${value.email}`;
  }

  return `Calling ${value.phone}`;
}
```

TypeScript uses the property check to determine the object type in each branch.

## 6. Narrow with `instanceof`

Use `instanceof` for values created by classes:

```ts
if (delivery instanceof DownloadDelivery) {
  console.log(delivery.downloadUrl);
}
```

This is a runtime check, so the class must exist at runtime. Interfaces and type
aliases cannot be used with `instanceof` because they are removed during
compilation.

## 7. Discriminated unions

A discriminated union gives every member a shared property whose literal value
identifies that member:

```ts
type Result =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };
```

Checking `status` makes the correct properties available:

```ts
function describe(result: Result): string {
  switch (result.status) {
    case "loading":
      return "Loading";
    case "success":
      return `Received ${result.data.length} items`;
    case "error":
      return result.message;
  }
}
```

Each state contains only the data valid for that state. There is no loading
result with an irrelevant error message or success data.

## 8. Exhaustive checks with `never`

After every possible union member has been handled, the remaining value has
type `never`:

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}
```

Use it in a `default` branch:

```ts
default:
  return assertNever(result);
```

If a new union member is added without a corresponding case, `result` will no
longer be `never`, producing a useful compiler error.

## 9. `unknown` and `any`

Both can hold any value, but they behave differently:

- `any` disables type checking for operations involving that value.
- `unknown` requires a check before the value can be used.

Prefer `unknown` for untrusted data such as parsed JSON, caught values, storage,
or external input:

```ts
const value: unknown = JSON.parse(input);

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

## 10. Custom type guards

A function returning `value is Type` is a custom type guard:

```ts
type User = { id: number; username: string };

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "username" in value &&
    typeof value.username === "string"
  );
}
```

When `isUser(value)` returns true, TypeScript narrows `value` to `User`. The
predicate is a promise made by your code, so every required property must
actually be checked.

## 11. Intersection types

The `&` operator combines requirements:

```ts
type Identified = { readonly id: number };
type Timestamped = { createdAt: Date };
type StoredEntity = Identified & Timestamped;
```

A `StoredEntity` must satisfy both component types. Intersections are useful for
combining compatible capabilities; contradictory properties can create an
impossible type.

## 12. Type assertions

A type assertion tells TypeScript to treat a value as a chosen type:

```ts
const product = value as Product;
```

It performs no runtime conversion or validation. If the assertion is wrong,
the program can still fail. Prefer narrowing and type guards; use assertions
only when you have information the compiler cannot express or discover.

## 13. Complete the exercises

Open `tsFiles/exercises/lesson-06-exercises.ts`. You will construct an API-result
union, handle every state, narrow primitive values, validate unknown input, and
create an intersection.

Run `tsc` after each task. Attempt the exhaustive-check bonus before opening
`tsFiles/solutions/lesson-06-solutions.ts`.

## Check your understanding

1. How does `string | number` differ from `any`?
2. Why are literal unions safer than unrestricted strings?
3. What property makes a union discriminated?
4. Why can an interface not be used with `instanceof`?
5. What does `never` reveal in an exhaustive switch?
6. Why is `unknown` safer than `any`?
7. Does a type assertion validate data at runtime?
8. What does an intersection require?
