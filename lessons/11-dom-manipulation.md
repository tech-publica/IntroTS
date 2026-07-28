# Lesson 11: DOM manipulation and browser events

The Document Object Model (DOM) represents an HTML document as objects that
JavaScript and TypeScript can inspect and change. TypeScript's DOM library
describes browser APIs, element classes, and event types.

## What you will learn

By the end of this lesson, you should be able to:

- select elements and handle missing results safely;
- distinguish broad and element-specific DOM types;
- create, update, insert, replace, and remove elements;
- use `textContent`, attributes, properties, classes, and `dataset`;
- read typed form controls and validate their values;
- handle submit, input, change, click, and keyboard-related events;
- distinguish `event.target` from `event.currentTarget`;
- narrow `EventTarget` values with `instanceof`;
- use event delegation for dynamic content;
- render collections efficiently with `DocumentFragment`;
- avoid unsafe HTML injection;
- create accessible dynamic interfaces.

## 1. Prepare the project

Run:

```sh
tsc --watch
```

Open `lesson-11.html` through a local web server. Unlike earlier console-only
lessons, this page contains an interactive product catalogue.

The implementation is organized as:

```text
tsFiles/lesson-11/
├── catalog/
│   └── ProductCatalog.ts
├── dom/
│   └── requireElement.ts
├── models/
│   └── Product.ts
└── index.ts
```

Keep the browser console open so DOM errors remain visible.

## 2. The DOM type hierarchy

Important DOM types form a hierarchy:

```text
EventTarget
└── Node
    ├── Text
    └── Element
        └── HTMLElement
            ├── HTMLInputElement
            ├── HTMLButtonElement
            ├── HTMLFormElement
            ├── HTMLSelectElement
            └── HTMLUListElement
```

Broader types expose only members common to every value at that level.
`Element` has methods such as `closest`, while `HTMLInputElement` additionally
has `value`, `checked`, and `valueAsNumber`.

Use the most specific type that is actually guaranteed by the page.

## 3. Select one element

`querySelector` returns the first matching element or `null`:

```ts
const heading = document.querySelector("h1");
// Element | null
```

The selector may not match, so TypeScript requires a null check:

```ts
if (heading !== null) {
  heading.textContent = "New heading";
}
```

Optional chaining is useful for a nonessential update:

```ts
document.querySelector(".notice")?.classList.add("visible");
```

Do not use optional chaining when a missing element means the application is
incorrect. Failing clearly is easier to debug.

## 4. Generic selectors

`querySelector` accepts a generic type:

```ts
const input =
  document.querySelector<HTMLInputElement>("#product-name");
```

The result is `HTMLInputElement | null`, but the generic is a statement made by
the programmer. It does not check the element at runtime. This compiles even if
`#product-name` is accidentally a `<div>`.

Use a generic selector when you control the HTML and the assumption is clear.
Use a runtime check for required application elements.

## 5. Select and validate required elements

Lesson 11 provides:

```ts
function requireElement<TElement extends Element>(
  selector: string,
  constructor: { new (): TElement },
): TElement {
  const element = document.querySelector(selector);

  if (!(element instanceof constructor)) {
    throw new Error(`Invalid element: ${selector}`);
  }

  return element;
}
```

Call it with a DOM constructor:

```ts
const form = requireElement("#product-form", HTMLFormElement);
const input = requireElement("#product-name", HTMLInputElement);
```

The function checks both presence and runtime element class. Its result is
non-null and correctly narrowed.

## 6. Select multiple elements

`querySelectorAll` returns a static `NodeListOf<Element>`:

```ts
const buttons =
  document.querySelectorAll<HTMLButtonElement>("button");

buttons.forEach((button) => {
  button.disabled = false;
});
```

A static list does not automatically gain elements created later. Query again
or use event delegation when content changes dynamically.

Some older DOM APIs return live `HTMLCollection` objects. Live collections
change as the DOM changes, which can make mutation during iteration surprising.
Convert collections when array methods are needed:

```ts
const children = Array.from(element.children);
```

## 7. Create elements

`document.createElement` infers the correct element class from the tag:

```ts
const button = document.createElement("button");
// HTMLButtonElement

button.type = "button";
button.textContent = "Delete";
```

Build a subtree before inserting it:

```ts
const item = document.createElement("li");
const heading = document.createElement("h3");
const details = document.createElement("p");

item.append(heading, details, button);
```

Useful insertion methods include:

- `append` and `prepend`;
- `before` and `after`;
- `replaceWith`;
- `replaceChildren`;
- `remove`.

These methods accept nodes, and several also accept strings that become text
nodes.

## 8. `textContent` and `innerHTML`

Prefer `textContent` for ordinary text:

```ts
heading.textContent = product.name;
```

The browser treats the value as text, even if it contains characters such as
`<` or `>`.

`innerHTML` parses a string as HTML:

```ts
container.innerHTML = userInput;
```

Never insert untrusted content this way. It can introduce cross-site scripting
(XSS). TypeScript types do not sanitize HTML.

Create elements and assign `textContent`. Use `innerHTML` only with trusted,
carefully controlled markup or an appropriate sanitization strategy.

## 9. Properties and attributes

DOM elements have JavaScript properties and HTML attributes:

```ts
button.type = "button";
button.disabled = true;
button.setAttribute("aria-label", "Delete Keyboard");
```

Prefer a typed property when one exists. Use `setAttribute` for generic and
ARIA attributes.

Attribute values are strings. Boolean properties such as `disabled`, `checked`,
and `hidden` are usually clearer through their properties:

```ts
message.hidden = products.length > 0;
checkbox.checked = task.completed;
```

## 10. CSS classes

Use `classList` instead of editing the whole class string:

```ts
item.classList.add("product-card");
item.classList.remove("selected");
item.classList.toggle("completed", task.completed);
item.classList.contains("active");
```

The second argument to `toggle` explicitly adds or removes the class according
to a boolean. This is useful when rendering application state.

Avoid placing extensive presentation rules in `element.style`. CSS classes keep
visual design in stylesheets and state changes in TypeScript.

## 11. Data attributes

HTML `data-*` attributes store small strings associated with elements:

```ts
item.dataset.productId = product.id;
deleteButton.dataset.action = "delete";
```

They appear in HTML as:

```html
<li data-product-id="product-1">
```

Reading a dataset property produces `string | undefined`:

```ts
const id = item.dataset.productId;
```

Dataset values are always strings. Parse and validate them when the application
expects a number, date, boolean, or controlled literal.

Do not use the DOM as the primary data store. Lesson 11 keeps products in
`ProductCatalog` and stores only IDs/actions in the markup.

## 12. Render collections

Rendering means turning application data into DOM nodes:

```ts
function createItem(product: Product): HTMLLIElement {
  const item = document.createElement("li");
  item.textContent = product.name;
  return item;
}
```

Keep node creation separate from collection rendering. This makes each function
smaller and easier to test.

Lesson 11 builds a `DocumentFragment`:

```ts
const fragment = document.createDocumentFragment();

products.forEach((product) => {
  fragment.append(createItem(product));
});

list.replaceChildren(fragment);
```

A fragment groups nodes before insertion. `replaceChildren` removes previous
children and inserts the new content in one clear operation.

For small teaching applications, rerendering the collection is simple and
reliable. Larger interfaces may update individual nodes to preserve focus,
selection, animations, or performance.

## 13. Forms and submit events

Listen for the form's `submit` event, not only a button click. Submit also
supports keyboard activation and other valid form behaviors:

```ts
form.addEventListener(
  "submit",
  (event: SubmitEvent): void => {
    event.preventDefault();
  },
);
```

`preventDefault` stops the browser's normal form navigation.

Read values through specific controls:

```ts
const name = nameInput.value.trim();
const price = priceInput.valueAsNumber;
```

`value` is always a string. A number input's `valueAsNumber` produces a number
or `NaN`, so validate it:

```ts
if (!Number.isFinite(price) || price <= 0) {
  return;
}
```

After success:

```ts
form.reset();
nameInput.focus();
```

HTML validation attributes improve user experience, but important rules should
also be checked in TypeScript and on any real server.

## 14. Event types

Common event types include:

| Event type | Typical use |
| --- | --- |
| `Event` | General change or lifecycle event |
| `MouseEvent` | Click and pointer-button information |
| `InputEvent` | Text/input changes |
| `SubmitEvent` | Form submission |
| `KeyboardEvent` | Key identity and modifiers |
| `FocusEvent` | Focus and blur transitions |

DOM overloads often infer the event type from the element and event name.
Explicit annotations can be educational and useful when extracting handlers:

```ts
function handleClick(event: MouseEvent): void {
  console.log(event.clientX, event.clientY);
}

button.addEventListener("click", handleClick);
```

## 15. `target` and `currentTarget`

`event.target` is the deepest element that initiated the event. It is typed as
`EventTarget | null` because many kinds of event targets exist.

`event.currentTarget` is the element whose listener is currently running. Its
base DOM type is also broad, and it becomes `null` after event dispatch.

Narrow before using element methods:

```ts
if (event.target instanceof HTMLButtonElement) {
  console.log(event.target.dataset.action);
}
```

Do not silence the problem with an unchecked assertion:

```ts
const button = event.target as HTMLButtonElement;
```

The actual target may be an icon or text-containing child inside the button.

## 16. Event delegation

Rendered elements may not exist when the application starts. Instead of adding
a listener to every delete button, attach one listener to their stable parent:

```ts
list.addEventListener("click", (event: MouseEvent) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const button = event.target.closest<HTMLButtonElement>(
    'button[data-action="delete"]',
  );
});
```

The event bubbles from the clicked descendant to the list. `closest` also
handles a click on an element inside the button.

Check that the result belongs to the intended container:

```ts
if (button === null || !list.contains(button)) {
  return;
}
```

Delegation works well for repeated dynamic items and centralizes interaction
logic.

## 17. Input and change events

The `input` event fires as a text-like value changes:

```ts
filterInput.addEventListener("input", () => {
  render(catalog.search(filterInput.value));
});
```

The `change` event is useful when a control's committed value changes, including
checkboxes and selects.

When delegating checkbox changes:

```ts
if (event.target instanceof HTMLInputElement) {
  console.log(event.target.checked);
}
```

Use `.checked` for checkboxes, not `.value`.

## 18. DOM readiness and module scripts

Lesson 11 loads its entry point with:

```html
<script type="module" src="jsFiles/lesson-11/index.js"></script>
```

Module scripts are deferred automatically, so parsing completes before they
execute. The elements are available without a `DOMContentLoaded` listener.

For a classic script in `<head>` without `defer`, code may run before the body
exists. Prefer module scripts or `defer` for application entry points.

## 19. Accessibility for dynamic interfaces

Typed DOM code can still create an inaccessible interface. Lesson 11 uses:

- semantic forms, labels, headings, lists, and buttons;
- `type="button"` for buttons that must not submit forms;
- descriptive `aria-label` values on delete buttons;
- `aria-live="polite"` for form feedback;
- `.hidden` for an empty-state message;
- focus restoration after adding or clearing.

Prefer native elements over recreating them with generic `<div>` elements.
Native controls include keyboard and accessibility behavior automatically.

When rerendering, consider whether the focused element is removed. A production
application may need to move focus deliberately after deletion.

## 20. Connecting async data to the DOM

Lesson 10's request-state union can drive rendering:

```ts
type RequestState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
```

A renderer can switch on state:

```ts
function renderState(state: RequestState<Product[]>): void {
  switch (state.status) {
    case "loading":
      status.textContent = "Loading…";
      break;
    case "success":
      renderProducts(state.data);
      break;
    case "error":
      status.textContent = state.message;
      break;
  }
}
```

Keep fetching, state management, and rendering in separate functions. This
prevents one event handler from becoming responsible for the whole application.

## 21. Complete the exercise

Open:

- `lesson-11-exercise.html`
- `tsFiles/exercises/lesson-11-exercises.ts`

Build a typed task list that can:

1. add tasks through form submission;
2. render task elements safely;
3. show the task count and empty state;
4. delete tasks through event delegation;
5. mark tasks complete through delegated checkbox changes.

Run `tsc` after each step and test mouse and keyboard interaction in the
browser. The complete implementation is available through
`lesson-11-solution.html` and
`tsFiles/solutions/lesson-11-solutions.ts`.

## Check your understanding

1. Why does `querySelector` include `null` in its result?
2. Does `querySelector<HTMLInputElement>` verify the element at runtime?
3. When is `requireElement` preferable to optional chaining?
4. Why is `textContent` safer for external text than `innerHTML`?
5. What type does `dataset.productId` return?
6. How do `append` and `replaceChildren` differ?
7. Why should form logic listen for `submit`?
8. What does `valueAsNumber` return for invalid input?
9. How do `target` and `currentTarget` differ?
10. Why must `EventTarget` be narrowed?
11. What problem does event delegation solve?
12. Why keep application data outside the DOM?
13. What does a `DocumentFragment` provide?
14. Why does the module entry point not need `DOMContentLoaded`?
15. Which accessibility features does the demonstration include?
