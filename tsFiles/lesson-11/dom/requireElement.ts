type ElementConstructor<TElement extends Element> = {
  new (): TElement;
};

export function requireElement<TElement extends Element>(
  selector: string,
  constructor: ElementConstructor<TElement>,
): TElement {
  const element = document.querySelector(selector);

  if (!(element instanceof constructor)) {
    throw new Error(
      `Expected ${selector} to be a ${constructor.name}.`,
    );
  }

  return element;
}
