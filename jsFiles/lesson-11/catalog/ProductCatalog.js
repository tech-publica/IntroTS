export class ProductCatalog {
    #products;
    constructor(initialProducts = []) {
        this.#products = [...initialProducts];
    }
    add(product) {
        this.#products.push(product);
    }
    remove(id) {
        const index = this.#products.findIndex((product) => product.id === id);
        if (index === -1) {
            return false;
        }
        this.#products.splice(index, 1);
        return true;
    }
    search(query) {
        const normalizedQuery = query.trim().toLowerCase();
        if (normalizedQuery === "") {
            return this.getAll();
        }
        return this.#products.filter((product) => {
            return (product.name.toLowerCase().includes(normalizedQuery) ||
                product.category.includes(normalizedQuery));
        });
    }
    getAll() {
        return [...this.#products];
    }
}
//# sourceMappingURL=ProductCatalog.js.map