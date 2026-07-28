"use strict";
/*
 * LESSON 5
 * Arrays and useful array methods
 */
console.log("--- Lesson 5: arrays ---");
class Product {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
// TypeScript infers string[] from these initial values.
const lessonTopics = ["types", "functions", "objects", "classes"];
// Array types can use Type[] or Array<Type>.
const lessonPrices = [25, 120, 15, 60];
const products = [
    new Product(1, "Keyboard", 25),
    new Product(2, "Monitor", 120),
    new Product(3, "Mouse", 15),
    new Product(4, "Headphones", 60),
];
console.log("First topic:", lessonTopics[0]);
console.log("Number of products:", products.length);
// `for...of` visits every element.
for (const product of products) {
    console.log(`${product.name}: €${product.price}`);
}
// These methods mutate the array on which they are called.
const topicQueue = ["functions", "objects"];
// push adds one or more elements to the end and returns the new length.
topicQueue.push("classes");
// unshift adds one or more elements to the beginning and returns the new length.
topicQueue.unshift("types");
// pop removes and returns the last element, or undefined if the array is empty.
const lastTopic = topicQueue.pop();
// shift removes and returns the first element, or undefined if the array is empty.
const firstTopic = topicQueue.shift();
console.log("Removed topics:", firstTopic, lastTopic);
console.log("Remaining queue:", topicQueue);
const editableTopics = ["types", "functions", "classes"];
// splice mutates an array by removing, replacing, or inserting elements.
editableTopics.splice(2, 0, "objects");
console.log("After splice:", editableTopics);
// slice returns a shallow copy of a selected part without changing the source.
const firstTwoTopics = lessonTopics.slice(0, 2);
// concat returns a new array containing the source and the supplied values.
const extendedTopics = lessonTopics.concat("arrays");
// Spread is syntax rather than a method; here it creates a shallow array copy.
const copiedTopics = [...lessonTopics];
console.log(firstTwoTopics, extendedTopics, copiedTopics);
// includes returns true when the array contains the supplied value.
console.log("Includes arrays:", lessonTopics.includes("arrays"));
// indexOf returns a value's first index, or -1 when the value is absent.
console.log("Index of objects:", lessonTopics.indexOf("objects"));
// find returns the first matching element, or undefined when none matches.
const foundProduct = products.find((product) => product.id === 2);
if (foundProduct !== undefined) {
    console.log("Found:", foundProduct.name);
}
// findIndex returns the first matching index, or -1 when none matches.
const foundIndex = products.findIndex((product) => product.price < 20);
console.log("First price below €20 is at index:", foundIndex);
// some returns true when at least one element satisfies the callback.
const hasExpensiveProduct = products.some((product) => product.price >= 100);
// every returns true only when every element satisfies the callback.
const allPricesAreValid = products.every((product) => product.price >= 0);
console.log("Has an expensive product:", hasExpensiveProduct);
console.log("All prices are valid:", allPricesAreValid);
// map transforms every element and returns the results in a new array.
const productNames = products.map((product) => product.name);
console.log("Names:", productNames);
// filter returns a new array containing only elements that pass the test.
const affordableProducts = products.filter((product) => product.price <= 50);
console.log("Affordable products:", affordableProducts);
// forEach performs an action for every element and returns no useful value.
products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
});
// reduce combines all elements into one accumulated result.
const totalPrice = products.reduce((total, product) => total + product.price, 0);
const averagePrice = products.length === 0 ? 0 : totalPrice / products.length;
console.log("Average price:", averagePrice);
// sort orders an array in place; copy first to preserve the original order.
const productsByPrice = [...products].sort((first, second) => second.price - first.price);
console.log("Sorted copy:", productsByPrice);
console.log("Original order:", products);
// A readonly array can be read but not mutated through this reference.
function printProductNames(items) {
    items.forEach((product) => console.log(product.name));
    // items.push(new Product(5, "Webcam", 45));
}
printProductNames(products);
/*
 * Type errors
 *
 * Uncomment one example at a time and run `tsc`.
 */
// lessonPrices.push("free");
// products.push({ id: 5, name: "Webcam" });
// foundProduct.price = 100;
//# sourceMappingURL=lesson-05.js.map