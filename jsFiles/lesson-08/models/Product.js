export class Product {
    id;
    name;
    price;
    category;
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }
    applyDiscount(percentage) {
        this.price -= this.price * (percentage / 100);
    }
}
//# sourceMappingURL=Product.js.map