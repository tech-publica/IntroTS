/*
 * LESSON 6
 * Unions, literal types, and narrowing
 */

console.log("--- Lesson 6: unions and narrowing ---");

// A union allows more than one type.
function formatIdentifier(identifier: string | number): string {
  // typeof narrows the union inside each branch.
  if (typeof identifier === "number") {
    return `ID-${identifier.toString().padStart(4, "0")}`;
  }

  return identifier.toUpperCase();
}

console.log(formatIdentifier(42));
console.log(formatIdentifier("order-a7"));

// Literal types restrict a value to specific choices.
type OrderStatus = "pending" | "paid" | "cancelled";
const currentOrderStatus: OrderStatus = "paid";
console.log("Current status:", currentOrderStatus);

type PendingOrder = {
  status: "pending";
  orderId: number;
  createdAt: Date;
};

type PaidOrder = {
  status: "paid";
  orderId: number;
  paidAt: Date;
  transactionId: string;
};

type CancelledOrder = {
  status: "cancelled";
  orderId: number;
  reason: string;
};

// A discriminated union shares a property with a different literal in each case.
type ShopOrder = PendingOrder | PaidOrder | CancelledOrder;

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

function describeOrder(order: ShopOrder): string {
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

const paidOrder: ShopOrder = {
  status: "paid",
  orderId: 101,
  paidAt: new Date("2026-07-27"),
  transactionId: "TX-9001",
};

console.log(describeOrder(paidOrder));

type EmailContact = {
  email: string;
};

type PhoneContact = {
  phone: string;
};

// The `in` operator narrows according to the presence of a property.
function contactCustomer(contact: EmailContact | PhoneContact): string {
  if ("email" in contact) {
    return `Emailing ${contact.email}`;
  }

  return `Calling ${contact.phone}`;
}

console.log(contactCustomer({ email: "customer@example.com" }));

class DownloadDelivery {
  public constructor(public downloadUrl: string) {}
}

class ParcelDelivery {
  public constructor(public trackingCode: string) {}
}

// instanceof narrows values created by classes.
function trackDelivery(
  delivery: DownloadDelivery | ParcelDelivery,
): string {
  if (delivery instanceof DownloadDelivery) {
    return `Download: ${delivery.downloadUrl}`;
  }

  return `Tracking: ${delivery.trackingCode}`;
}

console.log(trackDelivery(new ParcelDelivery("PKG-123")));

type ValidatedProduct = {
  id: number;
  name: string;
};

// A custom type guard narrows unknown data after runtime checks.
function isValidatedProduct(value: unknown): value is ValidatedProduct {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string"
  );
}

const parsedValue: unknown = JSON.parse('{"id":7,"name":"Webcam"}');

if (isValidatedProduct(parsedValue)) {
  console.log("Validated product:", parsedValue.name);
}

type Timestamped = {
  createdAt: Date;
};

type NamedEntity = {
  name: string;
};

// An intersection requires all members from both types.
type TimestampedEntity = Timestamped & NamedEntity;

const auditEntry: TimestampedEntity = {
  name: "Inventory import",
  createdAt: new Date(),
};

console.log(auditEntry.name, auditEntry.createdAt.toISOString());

// A type assertion tells TypeScript to trust us; it performs no validation.
const unverifiedValue: unknown = { id: 8, name: "Microphone" };
const assertedProduct = unverifiedValue as ValidatedProduct;
console.log("Asserted product:", assertedProduct.name);

/*
 * Type errors
 *
 * Uncomment one example at a time and run `tsc`.
 */

// const invalidStatus: OrderStatus = "shipped";
// console.log(parsedValue.name);
// describeOrder({ status: "paid", orderId: 5, paidAt: new Date() });
