# Lesson 5: Arrays and array methods

Arrays store ordered collections of values. TypeScript checks the element type,
while JavaScript's array methods let you add, remove, search, test, transform,
filter, combine, and sort those values.

## What you will learn

By the end of this lesson, you should be able to:

- declare arrays of primitives, objects, and class instances;
- read elements and iterate with `for...of`;
- write arrow-function callbacks;
- distinguish mutating and non-mutating operations;
- add and remove elements;
- search arrays with `includes`, `indexOf`, `find`, and `findIndex`;
- test arrays with `some` and `every`;
- use `forEach`, `map`, `filter`, and `reduce`;
- sort a copied array without changing the original;
- accept arrays through read-only function parameters.

## 1. Prepare the project

Start the compiler:

```sh
tsc --watch
```

Open `lesson-05.html` through your local web server and select the browser's
Console tab. The demonstration code is in `tsFiles/lesson-05.ts`.

## 2. Declare arrays

TypeScript can infer an array's element type:

```ts
const topics = ["types", "functions", "classes"];
```

Hover over `topics`. Its inferred type is `string[]`.

You can write an array type explicitly in two equivalent forms:

```ts
const prices: number[] = [25, 120, 15];
const names: Array<string> = ["Keyboard", "Monitor", "Mouse"];
```

The `Type[]` form is more common. `Array<Type>` can be easier to read when the
element type is long or nested.

Arrays can contain class instances:

```ts
const products: Product[] = [
  new Product(1, "Keyboard", 25),
  new Product(2, "Monitor", 120),
];
```

TypeScript prevents adding a value that does not match the element type.

## 3. Read and iterate

Array indexes start at zero:

```ts
console.log(topics[0]);
console.log(topics.length);
```

Use `for...of` when you want to visit every value:

```ts
for (const product of products) {
  console.log(product.name);
}
```

An index can be outside the array. JavaScript then returns `undefined`, so avoid
assuming that an arbitrary index definitely exists.

## 4. Arrow functions and callbacks

Many array methods receive a callback: a function that the method calls for
each relevant element.

A function expression can be written with arrow syntax:

```ts
const double = (value: number): number => {
  return value * 2;
};
```

For a single expression, omit the braces and `return`:

```ts
const double = (value: number): number => value * 2;
```

Inside an array method, TypeScript infers the callback parameter from the
array's element type:

```ts
products.map((product) => product.name);
```

Here, TypeScript knows that `product` is a `Product`.

## 5. Mutating and non-mutating operations

A mutating method changes the original array. A non-mutating method returns a
new value without changing the source.

This distinction matters when other code still depends on the original order
or contents.

| Mutates the array | Produces a new value |
| --- | --- |
| `push`, `pop` | `slice` |
| `unshift`, `shift` | `concat` |
| `splice` | spread syntax |
| `sort` | `map`, `filter` |

Always check whether a method mutates before using it on shared data.

## 6. Add and remove elements

```ts
const queue = ["functions", "objects"];

queue.push("classes");   // add to the end
queue.unshift("types");  // add to the beginning
queue.pop();             // remove and return the last element
queue.shift();           // remove and return the first element
```

`pop` and `shift` return `undefined` when the array is empty.

`splice` can delete, replace, or insert elements:

```ts
const topics = ["types", "functions", "classes"];
topics.splice(2, 0, "objects");
```

The first argument is the starting index. The second is the number of elements
to delete. Remaining arguments are inserted at that position.

## 7. Copy and combine arrays

`slice` copies part or all of an array:

```ts
const firstTwo = topics.slice(0, 2);
const copy = topics.slice();
```

`concat` combines values without modifying the original:

```ts
const extended = topics.concat("arrays");
```

Spread syntax is a concise way to make a shallow copy or combine arrays:

```ts
const copy = [...topics];
const combined = [...topics, ...moreTopics];
```

The array itself is new, but contained objects are still shared references.

## 8. Search arrays

Use `includes` to test whether a primitive value exists:

```ts
topics.includes("arrays");
```

Use `indexOf` to find its index. It returns `-1` when no match exists:

```ts
topics.indexOf("objects");
```

Use `find` when matching requires a condition:

```ts
const found = products.find((product) => product.id === 2);
```

`find` returns the first matching element or `undefined`. Check the result
before accessing its properties:

```ts
if (found !== undefined) {
  console.log(found.name);
}
```

`findIndex` returns the matching index or `-1`.

## 9. Test elements with `some` and `every`

`some` returns `true` when at least one element matches:

```ts
const hasExpensiveProduct = products.some(
  (product) => product.price >= 100,
);
```

`every` returns `true` only when all elements match:

```ts
const allPricesAreValid = products.every(
  (product) => product.price >= 0,
);
```

Both methods return booleans and stop as soon as the final answer is known.

## 10. Visit with `forEach`

`forEach` performs an action for every element:

```ts
products.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name}`);
});
```

Use `forEach` for side effects such as logging. It returns `void`; use `map`
when you need a transformed array.

## 11. Transform with `map`

`map` calls the callback for every element and collects each returned value:

```ts
const names = products.map((product) => product.name);
```

If `products` is `Product[]`, this expression produces `string[]`. The
original array is unchanged.

## 12. Select with `filter`

`filter` returns a new array containing only elements whose callback returned
`true`:

```ts
const affordable = products.filter((product) => product.price <= 50);
```

The original array is unchanged. The result can contain zero, one, or many
elements.

## 13. Accumulate with `reduce`

`reduce` combines an array into one result:

```ts
const total = products.reduce(
  (runningTotal, product) => runningTotal + product.price,
  0,
);
```

The callback receives the accumulated value and the current element. The final
argument, `0`, is the initial accumulated value.

Use a clear initial value. It improves inference and allows empty arrays to be
handled safely.

## 14. Sort carefully

`sort` changes the original array. Its comparison callback should return:

- a negative number when the first value should come first;
- a positive number when the second value should come first;
- zero when their order is equivalent.

Copy before sorting when the original order must remain unchanged:

```ts
const highestFirst = [...products].sort(
  (first, second) => second.price - first.price,
);
```

Do not sort numbers without a comparison callback. JavaScript otherwise
compares their string representations.

## 15. Read-only array parameters

A function that only reads an array should communicate that intention:

```ts
function printNames(products: readonly Product[]): void {
  products.forEach((product) => console.log(product.name));
}
```

The function cannot call mutating methods such as `push` through this reference.
The objects inside the array are not automatically read-only.

## 16. Complete the exercises

Open `tsFiles/exercises/lesson-05-exercises.ts`. You will use array methods to
manage a product inventory.

Complete one function at a time and run `tsc` after every change. Check your
results in the console, attempt the bonus, and only then open
`tsFiles/solutions/lesson-05-solutions.ts`.

## Method selection guide

Ask what result you need:

| Need | Choose |
| --- | --- |
| Perform an action for every item | `forEach` |
| Transform every item | `map` |
| Keep matching items | `filter` |
| Find one matching item | `find` |
| Find a matching position | `findIndex` |
| Check whether any item matches | `some` |
| Check whether all items match | `every` |
| Combine items into one result | `reduce` |
| Create an ordered array | copy, then `sort` |

## Check your understanding

Make sure you can answer these questions:

1. What is the difference between `Product[]` and `Array<Product>`?
2. Which methods in this lesson mutate the original array?
3. Why can `find` return `undefined`?
4. When should you use `map` instead of `forEach`?
5. How do `some` and `every` differ?
6. What does the initial value passed to `reduce` do?
7. Why should you copy an array before sorting it?
8. Does `readonly Product[]` make each product object read-only?

Revisit any section you cannot explain confidently.
