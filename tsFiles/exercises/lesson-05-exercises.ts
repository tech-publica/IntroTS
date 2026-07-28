/*
 * LESSON 5 EXERCISES
 *
 * Use array methods to manage a product inventory.
 */

class ExerciseProduct {
  public constructor(
    public readonly productId: number,
    public productName: string,
    public price: number,
  ) {}
}

const exerciseProducts: ExerciseProduct[] = [
  new ExerciseProduct(1, "Keyboard", 25),
  new ExerciseProduct(2, "Monitor", 120),
  new ExerciseProduct(3, "Mouse", 15),
  new ExerciseProduct(4, "Headphones", 60),
];

// 1. Use push to add a fifth product.

// 2. Use find to return the product with the supplied ID.
function exerciseFindProductById(
  items: readonly ExerciseProduct[],
  productId: number,
): ExerciseProduct | undefined {
  return undefined;
}

// 3. Use filter to return products costing 50 or less.
function exerciseAffordableProducts(
  items: readonly ExerciseProduct[],
): ExerciseProduct[] {
  return [];
}

// 4. Use map to return only the product names.
function exerciseProductNames(
  items: readonly ExerciseProduct[],
): string[] {
  return [];
}

// 5. Use some to check whether at least one product costs 100 or more.
function exerciseHasExpensiveProduct(
  items: readonly ExerciseProduct[],
): boolean {
  return false;
}

// 6. Use every to check whether every price is zero or greater.
function exercisePricesAreValid(
  items: readonly ExerciseProduct[],
): boolean {
  return false;
}

// 7. Use reduce to calculate the total of all prices.
function exerciseTotalPrice(
  items: readonly ExerciseProduct[],
): number {
  return 0;
}

// 8. Calculate the average. Return 0 when the array is empty.
function exerciseAveragePrice(
  items: readonly ExerciseProduct[],
): number {
  return 0;
}

// 9. Return a new array sorted from highest price to lowest.
//    Do not change the original array.
function exerciseSortByPrice(
  items: readonly ExerciseProduct[],
): ExerciseProduct[] {
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
