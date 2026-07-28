export function requireElement(selector, constructor) {
    const element = document.querySelector(selector);
    if (!(element instanceof constructor)) {
        throw new Error(`Expected ${selector} to be a ${constructor.name}.`);
    }
    return element;
}
//# sourceMappingURL=requireElement.js.map