"use strict";
/*
 * LESSON 7
 * Generics, constraints, and keyof
 */
console.log("--- Lesson 7: generics ---");
// T is a type parameter. The result has the same type as the argument.
function identity(value) {
    return value;
}
const genericText = identity("TypeScript");
const genericNumber = identity(42);
console.log(genericText, genericNumber);
// TypeScript infers T from the array passed to the function.
function firstElement(items) {
    return items[0];
}
console.log(firstElement(["keyboard", "mouse"]));
console.log(firstElement([10, 20, 30]));
// Generic functions can use multiple type parameters.
function createPair(first, second) {
    return [first, second];
}
const productAndQuantity = createPair("Keyboard", 2);
console.log(productAndQuantity);
const productNamesResponse = {
    data: ["Keyboard", "Mouse"],
    success: true,
};
console.log(productNamesResponse.data);
// A constraint requires TEntity to provide an id.
class Repository {
    #items = [];
    add(item) {
        this.#items.push(item);
    }
    findById(id) {
        return this.#items.find((item) => item.id === id);
    }
    getAll() {
        return [...this.#items];
    }
}
const productRepository = new Repository();
productRepository.add({ id: 1, name: "Keyboard", price: 25 });
productRepository.add({ id: 2, name: "Monitor", price: 120 });
console.log(productRepository.findById(2));
console.log(productRepository.getAll());
// keyof creates a union of an object's property names.
function getProperty(object, key) {
    return object[key];
}
const repositoryProduct = {
    id: 3,
    name: "Webcam",
    price: 45,
};
const repositoryProductName = getProperty(repositoryProduct, "name");
const repositoryProductPrice = getProperty(repositoryProduct, "price");
console.log(repositoryProductName, repositoryProductPrice);
const defaultPage = {
    items: ["one", "two"],
    pageNumber: 1,
};
const productPage = {
    items: [repositoryProduct],
    pageNumber: 1,
};
console.log(defaultPage, productPage);
/*
 * Type errors
 *
 * Uncomment one example at a time and run `tsc`.
 */
// productRepository.add({ name: "Mouse", price: 15 });
// getProperty(repositoryProduct, "stock");
// const invalidResponse: DataResponse<number> = { data: "42", success: true };
//# sourceMappingURL=lesson-07.js.map