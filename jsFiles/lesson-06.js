"use strict";
/*
 * LESSON 6
 * Unions, literal types, and narrowing
 */
console.log("--- Lesson 6: unions and narrowing ---");
// A union allows more than one type.
function formatIdentifier(identifier) {
    // typeof narrows the union inside each branch.
    if (typeof identifier === "number") {
        return `ID-${identifier.toString().padStart(4, "0")}`;
    }
    return identifier.toUpperCase();
}
console.log(formatIdentifier(42));
console.log(formatIdentifier("order-a7"));
const currentOrderStatus = "paid";
console.log("Current status:", currentOrderStatus);
function assertNever(value) {
    throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}
function describeOrder(order) {
    switch (order.status) {
        case "pending":
            return `Order ${order.orderId} was created at ${order.createdAt.toISOString()}.`;
        case "paid":
            return `Order ${order.orderId} was paid with transaction ${order.transactionId}.`;
        case "cancelled":
            return `Order ${order.orderId} was cancelled: ${order.reason}.`;
        default:
            return assertNever(order);
    }
}
const paidOrder = {
    status: "paid",
    orderId: 101,
    paidAt: new Date("2026-07-27"),
    transactionId: "TX-9001",
};
console.log(describeOrder(paidOrder));
// The `in` operator narrows according to the presence of a property.
function contactCustomer(contact) {
    if ("email" in contact) {
        return `Emailing ${contact.email}`;
    }
    return `Calling ${contact.phone}`;
}
console.log(contactCustomer({ email: "customer@example.com" }));
class DownloadDelivery {
    downloadUrl;
    constructor(downloadUrl) {
        this.downloadUrl = downloadUrl;
    }
}
class ParcelDelivery {
    trackingCode;
    constructor(trackingCode) {
        this.trackingCode = trackingCode;
    }
}
// instanceof narrows values created by classes.
function trackDelivery(delivery) {
    if (delivery instanceof DownloadDelivery) {
        return `Download: ${delivery.downloadUrl}`;
    }
    return `Tracking: ${delivery.trackingCode}`;
}
console.log(trackDelivery(new ParcelDelivery("PKG-123")));
// A custom type guard narrows unknown data after runtime checks.
function isValidatedProduct(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    return ("id" in value &&
        typeof value.id === "number" &&
        "name" in value &&
        typeof value.name === "string");
}
const parsedValue = JSON.parse('{"id":7,"name":"Webcam"}');
if (isValidatedProduct(parsedValue)) {
    console.log("Validated product:", parsedValue.name);
}
const auditEntry = {
    name: "Inventory import",
    createdAt: new Date(),
};
console.log(auditEntry.name, auditEntry.createdAt.toISOString());
// A type assertion tells TypeScript to trust us; it performs no validation.
const unverifiedValue = { id: 8, name: "Microphone" };
const assertedProduct = unverifiedValue;
console.log("Asserted product:", assertedProduct.name);
/*
 * Type errors
 *
 * Uncomment one example at a time and run `tsc`.
 */
// const invalidStatus: OrderStatus = "shipped";
// console.log(parsedValue.name);
// describeOrder({ status: "paid", orderId: 5, paidAt: new Date() });
//# sourceMappingURL=lesson-06.js.map