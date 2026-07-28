/*
 * LESSON 9
 * Utility types and advanced object typing
 */
console.log("--- Lesson 9: utility types ---");
const newProductInput = {
    name: "Keyboard",
    price: 25,
    category: "accessories",
};
const productUpdate = {
    price: 22.5,
};
const preview = {
    id: 1,
    name: "Keyboard",
    price: 25,
};
const completeProduct = {
    id: 2,
    name: "Monitor",
    price: 120,
    category: "displays",
    description: "A 27-inch display.",
};
const snapshot = {
    id: 3,
    name: "Laptop",
    price: 900,
    category: "computers",
};
// Record creates an object type with known keys and one value type.
const categoryLabels = {
    accessories: "Accessories",
    computers: "Computers",
    displays: "Displays",
};
console.log(categoryLabels[completeProduct.category]);
function printProductProperty(product, key) {
    console.log(`${String(key)}:`, product[key]);
}
printProductProperty(completeProduct, "name");
const discountedPrice = 99;
console.log("Discounted price:", discountedPrice);
// typeof captures the type of an existing value.
const defaultPreferences = {
    currency: "EUR",
    showDescriptions: true,
    itemsPerPage: 20,
};
const userPreferences = {
    currency: "USD",
    showDescriptions: false,
    itemsPerPage: 10,
};
console.log(userPreferences);
const emptyPreview = {
    id: null,
    name: null,
    price: null,
};
console.log(emptyPreview);
const editableProduct = {
    id: 4,
    name: "Mouse",
    price: 15,
    category: "accessories",
    description: "A wireless mouse.",
};
editableProduct.id = 40;
console.log(editableProduct);
// as const keeps the narrowest literal types and adds readonly.
const requestStates = ["idle", "loading", "success", "error"];
const currentRequestState = "loading";
console.log("Request state:", currentRequestState);
// satisfies checks a shape without replacing the value's inferred structure.
const preciseCategoryLabels = {
    accessories: "Accessories",
    computers: "Computers",
    displays: "Displays",
};
console.log(preciseCategoryLabels.accessories);
function createCatalogProduct(id, input) {
    return { id, ...input };
}
function updateCatalogProduct(product, update) {
    return { ...product, ...update };
}
const createdProduct = createCatalogProduct(5, newProductInput);
console.log(updateCatalogProduct(createdProduct, productUpdate));
export {};
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
//# sourceMappingURL=lesson-09.js.map