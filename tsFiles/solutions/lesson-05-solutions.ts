/*
 * LESSON 5 SOLUTIONS
 */

class SolutionProduct {
  public constructor(
    public readonly productId: number,
    public productName: string,
    public price: number,
  ) {}
}

const solutionProducts: SolutionProduct[] = [
  new SolutionProduct(1, "Keyboard", 25),
  new SolutionProduct(2, "Monitor", 120),
  new SolutionProduct(3, "Mouse", 15),
  new SolutionProduct(4, "Headphones", 60),
];

solutionProducts.push(new SolutionProduct(5, "Webcam", 45));

function solutionFindProductById(
  items: readonly SolutionProduct[],
  productId: number,
): SolutionProduct | undefined {
  return items.find(
    (product) => product.productId === productId,
  );
}

function solutionAffordableProducts(
  items: readonly SolutionProduct[],
): SolutionProduct[] {
  return items.filter((product) => product.price <= 50);
}

function solutionProductNames(
  items: readonly SolutionProduct[],
): string[] {
  return items.map((product) => product.productName);
}

function solutionHasExpensiveProduct(
  items: readonly SolutionProduct[],
): boolean {
  return items.some((product) => product.price >= 100);
}

function solutionPricesAreValid(
  items: readonly SolutionProduct[],
): boolean {
  return items.every((product) => product.price >= 0);
}

function solutionTotalPrice(
  items: readonly SolutionProduct[],
): number {
  return items.reduce(
    (total, product) => total + product.price,
    0,
  );
}

function solutionAveragePrice(
  items: readonly SolutionProduct[],
): number {
  if (items.length === 0) {
    return 0;
  }

  return solutionTotalPrice(items) / items.length;
}

function solutionSortByPrice(
  items: readonly SolutionProduct[],
): SolutionProduct[] {
  return [...items].sort(
    (first, second) => second.price - first.price,
  );
}

function solutionAffordableProductNames(
  items: readonly SolutionProduct[],
): string[] {
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
console.log(
  "Affordable names:",
  solutionAffordableProductNames(solutionProducts),
);
