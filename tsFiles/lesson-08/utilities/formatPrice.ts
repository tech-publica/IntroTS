export function formatPrice(
  price: number,
  currency: string = "EUR",
): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
  }).format(price);
}
