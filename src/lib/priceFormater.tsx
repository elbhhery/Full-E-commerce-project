export function PriceFormater(price: string | number) {
  return Number(price).toFixed(1);
}
