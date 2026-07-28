export class ProductRepository {
    #products = [];
    add(product) {
        this.#products.push(product);
    }
    findById(id) {
        return this.#products.find((product) => product.id === id);
    }
    getAll() {
        return [...this.#products];
    }
}
//# sourceMappingURL=ProductRepository.js.map