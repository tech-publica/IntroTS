/*
 * LESSON 9
 * Utility types and advanced object typing
 */

export {};

console.log("--- Lesson 9: utility types ---");

type CatalogCategory = "accessories" | "computers" | "displays";

interface CatalogProduct {
  readonly id: number;
  name: string;
  price: number;
  category: CatalogCategory;
  description?: string;
}

// Omit creates a type without selected properties.
type CreateProductInput = Omit<CatalogProduct, "id">;

const newProductInput: CreateProductInput = {
  name: "Keyboard",
  price: 25,
  category: "accessories",
};

// Partial makes every property optional.
type UpdateProductInput = Partial<Omit<CatalogProduct, "id">>;

const productUpdate: UpdateProductInput = {
  price: 22.5,
};

// Pick creates a type containing only selected properties.
type ProductPreview = Pick<CatalogProduct, "id" | "name" | "price">;

const preview: ProductPreview = {
  id: 1,
  name: "Keyboard",
  price: 25,
};

// Required makes every property required.
type CompleteProduct = Required<CatalogProduct>;

const completeProduct: CompleteProduct = {
  id: 2,
  name: "Monitor",
  price: 120,
  category: "displays",
  description: "A 27-inch display.",
};

// Readonly makes every property read-only.
type ProductSnapshot = Readonly<CatalogProduct>;

const snapshot: ProductSnapshot = {
  id: 3,
  name: "Laptop",
  price: 900,
  category: "computers",
};

// Record creates an object type with known keys and one value type.
const categoryLabels: Record<CatalogCategory, string> = {
  accessories: "Accessories",
  computers: "Computers",
  displays: "Displays",
};

console.log(categoryLabels[completeProduct.category]);

// keyof creates a union of all property keys.
type CatalogProductKey = keyof CatalogProduct;

function printProductProperty(
  product: CatalogProduct,
  key: CatalogProductKey,
): void {
  console.log(`${String(key)}:`, product[key]);
}

printProductProperty(completeProduct, "name");

// Indexed access extracts the type stored at a property.
type ProductPrice = CatalogProduct["price"];
const discountedPrice: ProductPrice = 99;
console.log("Discounted price:", discountedPrice);

// typeof captures the type of an existing value.
const defaultPreferences = {
  currency: "EUR",
  showDescriptions: true,
  itemsPerPage: 20,
};

type Preferences = typeof defaultPreferences;

const userPreferences: Preferences = {
  currency: "USD",
  showDescriptions: false,
  itemsPerPage: 10,
};

console.log(userPreferences);

// A mapped type transforms every property in another type.
type Nullable<T> = {
  [Key in keyof T]: T[Key] | null;
};

type NullablePreview = Nullable<ProductPreview>;

const emptyPreview: NullablePreview = {
  id: null,
  name: null,
  price: null,
};

console.log(emptyPreview);

// Mapping modifiers can remove readonly and optional markers.
type MutableRequired<T> = {
  -readonly [Key in keyof T]-?: T[Key];
};

type EditableCompleteProduct = MutableRequired<CatalogProduct>;

const editableProduct: EditableCompleteProduct = {
  id: 4,
  name: "Mouse",
  price: 15,
  category: "accessories",
  description: "A wireless mouse.",
};

editableProduct.id = 40;
console.log(editableProduct);

// as const keeps the narrowest literal types and adds readonly.
const requestStates = ["idle", "loading", "success", "error"] as const;
type RequestState = (typeof requestStates)[number];

const currentRequestState: RequestState = "loading";
console.log("Request state:", currentRequestState);

// satisfies checks a shape without replacing the value's inferred structure.
const preciseCategoryLabels = {
  accessories: "Accessories",
  computers: "Computers",
  displays: "Displays",
} as const satisfies Record<CatalogCategory, string>;

console.log(preciseCategoryLabels.accessories);

function createCatalogProduct(
  id: number,
  input: CreateProductInput,
): CatalogProduct {
  return { id, ...input };
}

function updateCatalogProduct(
  product: CatalogProduct,
  update: UpdateProductInput,
): CatalogProduct {
  return { ...product, ...update };
}

const createdProduct = createCatalogProduct(5, newProductInput);
console.log(updateCatalogProduct(createdProduct, productUpdate));

/*
 * Type errors
 *
 * Uncomment one example at a time and run `tsc`.
 */

// snapshot.price = 800;
// const invalidPreview: ProductPreview = { id: 1, name: "Keyboard" };
// const invalidState: RequestState = "waiting";
// const incompleteLabels: Record<CatalogCategory, string> = {
//   accessories: "Accessories",
//   computers: "Computers",
// };
