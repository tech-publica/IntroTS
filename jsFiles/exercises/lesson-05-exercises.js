"use strict";
/*
 * LESSON 5 EXERCISES
 *
 * Use array methods to manage a product inventory.
 */
class ExerciseProduct {
    productId;
    productName;
    price;
    constructor(productId, productName, price) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
    }
}
const exerciseProducts = [
    new ExerciseProduct(1, "Keyboard", 25),
    new ExerciseProduct(2, "Monitor", 120),
    new ExerciseProduct(3, "Mouse", 15),
    new ExerciseProduct(4, "Headphones", 60),
];
// 1. Use push to add a fifth product.
// 2. Use find to return the product with the supplied ID.
function exerciseFindProductById(items, productId) {
    return undefined;
}
// 3. Use filter to return products costing 50 or less.
function exerciseAffordableProducts(items) {
    return [];
}
// 4. Use map to return only the product names.
function exerciseProductNames(items) {
    return [];
}
// 5. Use some to check whether at least one product costs 100 or more.
function exerciseHasExpensiveProduct(items) {
    return false;
}
// 6. Use every to check whether every price is zero or greater.
function exercisePricesAreValid(items) {
    return false;
}
// 7. Use reduce to calculate the total of all prices.
function exerciseTotalPrice(items) {
    return 0;
}
// 8. Calculate the average. Return 0 when the array is empty.
function exerciseAveragePrice(items) {
    return 0;
}
// 9. Return a new array sorted from highest price to lowest.
//    Do not change the original array.
function exerciseSortByPrice(items) {
    return [];
}
console.log("--- Lesson 5 exercises ---");
console.log("Found:", exerciseFindProductById(exerciseProducts, 2));
console.log("Affordable:", exerciseAffordableProducts(exerciseProducts));
console.log("Names:", exerciseProductNames(exerciseProducts));
console.log("Expensive:", exerciseHasExpensiveProduct(exerciseProducts));
console.log("Valid:", exercisePricesAreValid(exerciseProducts));
console.log("Total:", exerciseTotalPrice(exerciseProducts));
console.log("Average:", exerciseAveragePrice(exerciseProducts));
console.log("Sorted:", exerciseSortByPrice(exerciseProducts));
/*
 * Bonus
 *
 * Use filter and map together to return the names of affordable products.
 */
//# sourceMappingURL=lesson-05-exercises.js.map