# Lesson 8: Modules and project organization

Modules let a program split responsibilities across files without placing every
declaration in the global scope. A module explicitly exports what other files
may use and imports its dependencies.

## What you will learn

By the end of this lesson, you should be able to:

- explain module scope and global scope;
- create named and default exports;
- import runtime values and types;
- rename an import with `as`;
- re-export members through a barrel file;
- organize models, services, utilities, types, and entry points;
- load an ES module in the browser;
- explain why local imports use `.js` extensions;
- recognize common module-design problems.

## 1. Prepare the project

Run:

```sh
tsc --watch
```

Open `lesson-08.html` through a local web server and select the browser's
Console tab. Do not open the HTML page directly from the filesystem: browser
modules are designed to be served over HTTP.

The entry point is `tsFiles/lesson-08/index.ts`. It imports code from the other
files in the lesson.

## 2. Global scripts and modules

A TypeScript file without a top-level `import` or `export` is normally treated
as a script. Its declarations share the global scope with other script files.
Two scripts declaring the same class name can therefore conflict.

A file containing a top-level import or export is a module:

```ts
export class Product {}
```

Module declarations stay inside that module unless explicitly exported. Two
different modules can declare the same local name without conflict.

Modules also make dependencies visible. If a file uses `Product`, its import
shows where `Product` comes from.

## 3. Named exports

A module may provide multiple named exports:

```ts
export class Product {}

export function createProduct(): Product {
  return new Product();
}
```

You can also export declarations together:

```ts
class Product {}
function createProduct(): Product {
  return new Product();
}

export { Product, createProduct };
```

Import named exports with braces:

```ts
import { Product, createProduct } from "./Product.js";
```

The imported names must match the exported names unless you use an alias.
Named exports are generally easier to rename, search for, and import
consistently, so this course prefers them for most declarations.

## 4. Default exports

A module can have one default export:

```ts
const config = {
  currency: "EUR",
};

export default config;
```

Import a default export without braces:

```ts
import config from "./config.js";
```

The importing file chooses the local name. This flexibility can lead to
inconsistent names across a project, so use default exports deliberately.
They are often reasonable for a module whose primary purpose is one value.

## 5. Import types separately

Interfaces and type aliases are removed during compilation. Mark imports used
only for type checking with `import type`:

```ts
import type { ProductData } from "./models/Product.js";
```

This communicates that no runtime value is needed and guarantees that the
import is removed from the emitted JavaScript.

Classes can be imported as types or runtime values. Use a normal import when
constructing an instance with `new` or using `instanceof`; use `import type`
when the class appears only in annotations.

## 6. Rename imports

Use `as` to choose a different local name:

```ts
import {
  formatPrice as formatEuro,
} from "./utilities/formatPrice.js";
```

This does not rename the original export. It only changes the name in the
importing module. Aliases help resolve local conflicts or make a specialized
usage clearer, but excessive renaming can make a codebase harder to search.

## 7. Re-export through a barrel

A barrel file collects exports from related modules:

```ts
// models/index.ts
export { Product } from "./Product.js";
export type { ProductData } from "./Product.js";
```

Consumers can import from the folder's public entry point:

```ts
import { Product } from "./models/index.js";
```

Barrels can provide a clean public API. Avoid using them merely to hide a
confusing directory structure, and watch for circular dependencies in large
projects.

## 8. Why imports end in `.js`

This TypeScript source import deliberately uses `.js`:

```ts
import { Product } from "./models/Product.js";
```

The compiler resolves it to `Product.ts` while checking the source. It preserves
the `.js` path in the emitted file:

```js
import { Product } from "./models/Product.js";
```

That is necessary because the browser executes the generated JavaScript and
requests real `.js` files. The `moduleResolution: "Bundler"` setting in
`tsconfig.json` supports this source-development workflow.

## 9. Browser module entry points

The browser page loads only the entry point:

```html
<script type="module" src="jsFiles/lesson-08/index.js"></script>
```

The browser reads its imports and loads the remaining module graph. Module
scripts:

- require `type="module"`;
- use module scope;
- are deferred automatically;
- must normally be served over HTTP;
- follow strict mode automatically.

Do not add a separate script element for every imported module.

## 10. Organize by responsibility

Lesson 8 uses this structure:

```text
tsFiles/lesson-08/
├── config.ts
├── index.ts
├── models/
│   ├── Product.ts
│   └── index.ts
├── services/
│   └── ProductRepository.ts
├── types/
│   └── ProductCategory.ts
└── utilities/
    └── formatPrice.ts
```

- A **model** represents domain data and behavior.
- A **service** coordinates operations or manages models.
- A **utility** performs a small reusable operation.
- A **types** module contains shared type-only declarations.
- An **entry point** assembles and starts the application.

These are conventions, not TypeScript requirements. Organize around clear
responsibilities rather than creating a folder for every possible category.

## 11. Follow the dependency graph

Read the demonstration in this order:

1. `types/ProductCategory.ts`
2. `models/Product.ts`
3. `models/index.ts`
4. `services/ProductRepository.ts`
5. `utilities/formatPrice.ts`
6. `config.ts`
7. `index.ts`

For each file, identify what it exports and what it imports. Then inspect the
matching files in `jsFiles/lesson-08/` and note which type-only declarations
and imports disappeared.

The dependency direction is:

```text
index
├── config
├── models barrel ── Product ── ProductCategory
├── ProductRepository ── Product
└── formatPrice
```

## 12. Avoid circular dependencies

A circular dependency occurs when module A depends on module B while B also
depends, directly or indirectly, on A.

Some cycles work, while others produce partially initialized values or runtime
errors. Prefer a clear dependency direction:

- domain models should not import the application entry point;
- utilities should usually depend on few or no project modules;
- shared contracts can move to a lower-level module;
- barrel files should not import from modules that import the barrel.

## 13. Complete the exercises

Open `tsFiles/exercises/lesson-08/`. The exercise is a small library divided
into model, service, utility, and entry-point modules.

Follow the numbered tasks in:

1. `models/Book.ts`
2. `services/Library.ts`
3. `utilities/formatBook.ts`
4. `index.ts`

Run `tsc` after every change. To execute the compiled exercise entry point from
the terminal, run:

```sh
node jsFiles/exercises/lesson-08/index.js
```

Compare your structure with `tsFiles/solutions/lesson-08/` only after completing
the tasks.

## Check your understanding

1. What makes a TypeScript file a module?
2. How does module scope prevent naming conflicts?
3. How do named and default imports differ?
4. When should you use `import type`?
5. Why do local imports in this project end in `.js`?
6. Why does the browser page load only `index.js`?
7. What does a barrel file provide?
8. Does an interface appear in the emitted module?
9. Why can circular dependencies be dangerous?
10. What responsibility does each Lesson 8 folder have?
