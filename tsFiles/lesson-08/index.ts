/*
 * LESSON 8
 * Modules and project organization
 */

// Named imports use braces.
import { Product } from "./models/index.js";
import { ProductRepository } from "./services/ProductRepository.js";

// `import type` is erased because ProductData is used only as a type.
import type { ProductData } from "./models/index.js";

// `as` gives a local name to an imported member.
import { formatPrice as formatEuro } from "./utilities/formatPrice.js";

// A default import does not use braces, and its local name is chosen here.
import config from "./config.js";

console.log("--- Lesson 8: modules ---");

const repository = new ProductRepository();

const initialProducts: ProductData[] = [
  {
    id: 1,
    name: "Keyboard",
    price: 25,
    category: "accessories",
  },
  {
    id: 2,
    name: "Monitor",
    price: 120,
    category: "displays",
  },
];

initialProducts.forEach((data) => {
  repository.add(
    new Product(
      data.id,
      data.name,
      data.price,
      data.category,
    ),
  );
});

repository.getAll().forEach((product) => {
  console.log(
    `${product.name}: ${formatEuro(product.price, config.currency)}`,
  );
});

const monitor = repository.findById(2);

if (monitor !== undefined) {
  monitor.applyDiscount(10);
  console.log(
    `Discounted monitor: ${formatEuro(monitor.price, config.currency)}`,
  );
}
