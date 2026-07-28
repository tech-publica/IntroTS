export function formatPrice(price, currency = "EUR") {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
    }).format(price);
}
//# sourceMappingURL=formatPrice.js.map