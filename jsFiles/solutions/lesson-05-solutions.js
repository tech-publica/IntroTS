"use strict";
/*
 * LESSON 5 SOLUTIONS
 */
class SolutionProduct {
    productId;
    productName;
    price;
    constructor(productId, productName, price) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
    }
}
const solutionProducts = [
    new SolutionProduct(1, "Keyboard", 25),
    new SolutionProduct(2, "Monitor", 120),
    new SolutionProduct(3, "Mouse", 15),
    new SolutionProduct(4, "Headphones", 60),
];
solutionProducts.push(new SolutionProduct(5, "Webcam", 45));
function solutionFindProductById(items, productId) {
    return items.find((product) => product.productId === productId);
}
function solutionAffordableProducts(items) {
    return items.filter((product) => product.price <= 50);
}
function solutionProductNames(items) {
    return items.map((product) => product.productName);
}
function solutionHasExpensiveProduct(items) {
    return items.some((product) => product.price >= 100);
}
function solutionPricesAreValid(items) {
    return items.every((product) => product.price >= 0);
}
function solutionTotalPrice(items) {
    return items.reduce((total, product) => total + product.price, 0);
}
function solutionAveragePrice(items) {
    if (items.length === 0) {
        return 0;
    }
    return solutionTotalPrice(items) / items.length;
}
function solutionSortByPrice(items) {
    return [...items].sort((first, second) => second.price - first.price);
}
function solutionAffordableProductNames(items) {
    return items
        .filter((product) => product.price <= 50)
        .map((product) => product.productName);
}
console.log("--- Lesson 5 solutions ---");
console.log("Found:", solutionFindProductById(solutionProducts, 2));
console.log("Affordable:", solutionAffordableProducts(solutionProducts));
console.log("Names:", solutionProductNames(solutionProducts));
console.log("Expensive:", solutionHasExpensiveProduct(solutionProducts));
console.log("Valid:", solutionPricesAreValid(solutionProducts));
console.log("Total:", solutionTotalPrice(solutionProducts));
console.log("Average:", solutionAveragePrice(solutionProducts));
console.log("Sorted:", solutionSortByPrice(solutionProducts));
console.log("Affordable names:", solutionAffordableProductNames(solutionProducts));
//# sourceMappingURL=lesson-05-solutions.js.map