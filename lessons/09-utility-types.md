# Lesson 9: Utility types and advanced object typing

TypeScript can derive new types from existing ones. This avoids duplicating
object shapes for creation forms, updates, previews, snapshots, and lookup
tables.

## What you will learn

By the end of this lesson, you should be able to:

- derive object types with `Partial`, `Required`, `Readonly`, `Pick`, and
  `Omit`;
- create keyed object types with `Record`;
- obtain property names with `keyof`;
- extract property types with indexed access;
- capture a value's type with `typeof`;
- write a basic mapped type;
- add and remove property modifiers in mapped types;
- preserve literal information with `as const`;
- validate a value's shape with `satisfies`;
- choose one authoritative type instead of duplicating definitions.

## 1. Prepare the project

Run `tsc --watch`, open `lesson-09.html` through your local web server, and
select the browser's Console tab.

The demonstration is in `tsFiles/lesson-09.ts`. This file contains `export {}`
so TypeScript treats it as a module without exporting a public value.

## 2. Start from one authoritative type

Suppose the application stores this product:

```ts
interface Product {
  readonly id: number;
  name: string;
  price: number;
  category: ProductCategory;
  description?: string;
}
```

Creation, update, preview, and API types should usually be derived from this
shape rather than copied manually. If `Product` later changes, derived types
change with it.

## 3. `Omit<T, Keys>`

`Omit` removes selected properties:

```ts
type CreateProductInput = Omit<Product, "id">;
```

The database or application can generate the ID, so callers should not provide
it when creating a product.

Remove several keys with a literal union:

```ts
type PublicProduct = Omit<Product, "description" | "internalCode">;
```

The selected keys must belong to `keyof Product`.

## 4. `Pick<T, Keys>`

`Pick` keeps only selected properties:

```ts
type ProductPreview = Pick<Product, "id" | "name" | "price">;
```

Use it when a view or operation needs a small, explicit subset. `Pick` and
`Omit` can often express the same result; choose the one that communicates the
intent and remains stable as the source type evolves.

## 5. `Partial<T>`

`Partial` makes every property optional:

```ts
type ProductUpdate = Partial<Product>;
```

An update should not normally allow the ID to change, so compose utilities:

```ts
type ProductUpdate = Partial<Omit<Product, "id">>;
```

`Partial` does not recursively modify nested objects. It affects only the
top-level properties.

## 6. `Required<T>`

`Required` removes optional markers:

```ts
type CompleteProduct = Required<Product>;
```

`description` is now required. This can represent a later processing stage
where optional input has already been completed or validated.

Like `Partial`, `Required` is shallow.

## 7. `Readonly<T>`

`Readonly` prevents reassignment through that type:

```ts
type ProductSnapshot = Readonly<Product>;
```

Every top-level property becomes read-only. This is a compile-time restriction;
it does not call `Object.freeze` and is not deeply recursive.

## 8. `Record<Keys, Value>`

`Record` describes an object with a known key set and one value type:

```ts
type ProductCategory = "accessories" | "computers" | "displays";

const labels: Record<ProductCategory, string> = {
  accessories: "Accessories",
  computers: "Computers",
  displays: "Displays",
};
```

TypeScript reports missing and unexpected keys. This is safer than a broad
`Record<string, string>` when the valid keys are known.

## 9. `keyof`

`keyof` produces a union of an object's property names:

```ts
type ProductKey = keyof Product;
// "id" | "name" | "price" | "category" | "description"
```

Use it when a value must be one of the valid keys:

```ts
function printProperty(product: Product, key: ProductKey): void {
  console.log(product[key]);
}
```

This prevents calls such as `printProperty(product, "unknown")`.

## 10. Indexed access types

Use brackets in a type position to extract a property's type:

```ts
type ProductPrice = Product["price"]; // number
```

Several properties can be selected with a union:

```ts
type ProductText = Product["name" | "description"];
// string | undefined
```

In generic code, `T[Key]` preserves the relationship between a selected key and
its value type.

## 11. `typeof` in a type position

In runtime code, `typeof value` returns a string such as `"number"`. In a type
position, it captures the TypeScript type of an existing declaration:

```ts
const defaults = {
  currency: "EUR",
  itemsPerPage: 20,
};

type Preferences = typeof defaults;
```

This is useful when the value should be the source of truth. Avoid creating
circular designs where a value depends on a type that was itself derived from
that value.

## 12. Mapped types

A mapped type iterates over the keys of another type:

```ts
type Nullable<T> = {
  [Key in keyof T]: T[Key] | null;
};
```

For each key, it keeps the original property type and adds `null`.

The built-in utilities are largely implemented with mapped types. For example,
a simplified `Partial` resembles:

```ts
type Optional<T> = {
  [Key in keyof T]?: T[Key];
};
```

## 13. Mapping modifiers

Mapped types can add or remove `readonly` and `?`:

```ts
type MutableRequired<T> = {
  -readonly [Key in keyof T]-?: T[Key];
};
```

- `-readonly` removes the read-only modifier.
- `-?` removes the optional modifier.
- `+readonly` and `+?` add them; the plus sign is normally omitted.

Use custom mapped types when they express a recurring domain transformation,
not merely to demonstrate clever syntax.

## 14. `as const`

Normal inference often widens literal values:

```ts
const states = ["idle", "loading", "success"];
// string[]
```

`as const` preserves the narrowest literal types and makes the structure
read-only:

```ts
const states = ["idle", "loading", "success"] as const;
```

Derive a union of its elements:

```ts
type State = (typeof states)[number];
// "idle" | "loading" | "success"
```

The `[number]` indexed access means “the type of an element at a numeric index.”

## 15. `satisfies`

The `satisfies` operator checks that a value conforms to a type without replacing
the value's more specific inferred structure:

```ts
const labels = {
  accessories: "Accessories",
  computers: "Computers",
  displays: "Displays",
} satisfies Record<ProductCategory, string>;
```

Unlike a type assertion, `satisfies` checks compatibility. Unlike a direct
annotation, it generally preserves more information about the original value.

Combine it with `as const` when you want both narrow literal values and shape
validation:

```ts
const labels = {
  accessories: "Accessories",
  computers: "Computers",
  displays: "Displays",
} as const satisfies Record<ProductCategory, string>;
```

## 16. Compose utilities

Utility types become powerful when composed:

```ts
type ProductUpdate =
  Partial<Omit<Product, "id" | "category">>;
```

Read transformations from the inside outward:

1. Start with `Product`.
2. Remove `id` and `category`.
3. Make the remaining properties optional.

If a composed type becomes difficult to understand, give intermediate concepts
descriptive names.

## 17. Complete the exercises

Open `tsFiles/exercises/lesson-09-exercises.ts`. The starting code deliberately
duplicates several course types. Replace them with derived types while keeping
the program compiling.

Run `tsc` after each task. Compare the behavior before and after refactoring:
the JavaScript should behave the same because these transformations exist only
for type checking.

Open `tsFiles/solutions/lesson-09-solutions.ts` after completing all tasks.

## Check your understanding

1. How do `Pick` and `Omit` differ?
2. Why is `Partial<Omit<Product, "id">>` useful for updates?
3. Are `Partial`, `Required`, and `Readonly` recursive?
4. What does `Record<Category, string>` guarantee?
5. What union does `keyof Product` create?
6. What does `Product["price"]` produce?
7. How does `typeof` behave in a type position?
8. What operation does a mapped type perform?
9. What information does `as const` preserve?
10. How does `satisfies` differ from `as Product`?
