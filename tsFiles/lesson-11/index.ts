/*
 * LESSON 11
 * DOM manipulation and browser events
 */

import { ProductCatalog } from "./catalog/ProductCatalog.js";
import { requireElement } from "./dom/requireElement.js";
import {
  Product,
  type ProductCategory,
} from "./models/Product.js";

console.log("--- Lesson 11: DOM manipulation ---");

const productForm = requireElement(
  "#product-form",
  HTMLFormElement,
);
const nameInput = requireElement(
  "#product-name",
  HTMLInputElement,
);
const priceInput = requireElement(
  "#product-price",
  HTMLInputElement,
);
const categorySelect = requireElement(
  "#product-category",
  HTMLSelectElement,
);
const filterInput = requireElement(
  "#product-filter",
  HTMLInputElement,
);
const productList = requireElement(
  "#product-list",
  HTMLUListElement,
);
const emptyMessage = requireElement(
  "#empty-message",
  HTMLParagraphElement,
);
const productCount = requireElement(
  "#product-count",
  HTMLOutputElement,
);
const formMessage = requireElement(
  "#form-message",
  HTMLParagraphElement,
);
const clearButton = requireElement(
  "#clear-filter",
  HTMLButtonElement,
);

const catalog = new ProductCatalog([
  new Product("product-1", "Keyboard", 25, "accessories"),
  new Product("product-2", "Monitor", 120, "displays"),
  new Product("product-3", "Laptop", 900, "computers"),
]);

function isProductCategory(
  value: string,
): value is ProductCategory {
  return (
    value === "accessories" ||
    value === "computers" ||
    value === "displays"
  );
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function createProductListItem(
  product: Product,
): HTMLLIElement {
  const item = document.createElement("li");
  item.classList.add("product-card");
  item.dataset.productId = product.id;

  const heading = document.createElement("h3");
  heading.textContent = product.name;

  const details = document.createElement("p");
  details.textContent =
    `${formatPrice(product.price)} · ${product.category}`;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.dataset.action = "delete";
  deleteButton.setAttribute(
    "aria-label",
    `Delete ${product.name}`,
  );

  item.append(heading, details, deleteButton);
  return item;
}

function renderProducts(products: readonly Product[]): void {
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    fragment.append(createProductListItem(product));
  });

  productList.replaceChildren(fragment);
  productCount.value = String(products.length);
  emptyMessage.hidden = products.length > 0;
}

function renderCurrentFilter(): void {
  renderProducts(catalog.search(filterInput.value));
}

function showFormMessage(
  message: string,
  kind: "success" | "error",
): void {
  formMessage.textContent = message;
  formMessage.classList.toggle("error-message", kind === "error");
  formMessage.classList.toggle(
    "success-message",
    kind === "success",
  );
}

productForm.addEventListener(
  "submit",
  (event: SubmitEvent): void => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const price = priceInput.valueAsNumber;
    const category = categorySelect.value;

    if (
      name === "" ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !isProductCategory(category)
    ) {
      showFormMessage(
        "Enter a name, a positive price, and a category.",
        "error",
      );
      return;
    }

    catalog.add(
      new Product(
        crypto.randomUUID(),
        name,
        price,
        category,
      ),
    );

    productForm.reset();
    showFormMessage(`${name} was added.`, "success");
    nameInput.focus();
    renderCurrentFilter();
  },
);

filterInput.addEventListener(
  "input",
  (_event: Event): void => {
    renderCurrentFilter();
  },
);

clearButton.addEventListener(
  "click",
  (_event: MouseEvent): void => {
    filterInput.value = "";
    filterInput.focus();
    renderCurrentFilter();
  },
);

// One delegated listener handles delete buttons created during rendering.
productList.addEventListener(
  "click",
  (event: MouseEvent): void => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const button = event.target.closest<HTMLButtonElement>(
      'button[data-action="delete"]',
    );

    if (button === null || !productList.contains(button)) {
      return;
    }

    const item = button.closest<HTMLLIElement>(
      "[data-product-id]",
    );
    const productId = item?.dataset.productId;

    if (productId === undefined) {
      return;
    }

    catalog.remove(productId);
    renderCurrentFilter();
  },
);

renderCurrentFilter();
