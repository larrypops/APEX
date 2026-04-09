import { cookies } from "next/headers";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/pricing";

export type CurrencyCode = "USD" | "EUR";

export const CURRENCY_COOKIE = "apex_currency";

const EUROPE_COUNTRIES = new Set([
  "AL","AD","AM","AT","AZ","BA","BE","BG","BY","CH","CY","CZ","DE","DK","EE","ES","FI","FO","FR","GB","GE","GI","GR","HR","HU","IE","IS","IT","KZ","LI","LT","LU","LV","MC","MD","ME","MK","MT","NL","NO","PL","PT","RO","RS","SE","SI","SK","SM","TR","UA","VA","XK"
]);

const AMERICAS_COUNTRIES = new Set([
  "AG","AI","AR","AW","BB","BL","BM","BO","BQ","BR","BS","BZ","CA","CL","CO","CR","CU","CW","DM","DO","EC","FK","GD","GF","GL","GP","GT","GY","HN","HT","JM","KN","KY","LC","MF","MQ","MS","MX","NI","PA","PE","PM","PR","PY","SR","SV","SX","TC","TT","US","UY","VC","VE","VG","VI"
]);

export function currencyFromCountry(country?: string | null): CurrencyCode {
  const normalized = country?.toUpperCase();
  if (!normalized) return "USD";
  if (EUROPE_COUNTRIES.has(normalized)) return "EUR";
  if (AMERICAS_COUNTRIES.has(normalized)) return "USD";
  return "USD";
}

export async function getPreferredCurrency(): Promise<CurrencyCode> {
  const store = await cookies();
  const value = store.get(CURRENCY_COOKIE)?.value;
  return value === "EUR" ? "EUR" : "USD";
}

export function getProductPricing(product: Product, currency: CurrencyCode) {
  const currentPrice = currency === "EUR" ? product.priceEUR : product.priceUSD;
  const oldPrice = currency === "EUR" ? product.oldPriceEUR : product.oldPriceUSD;

  return {
    currency,
    currentPrice,
    oldPrice: oldPrice ?? null,
    currentPriceFormatted: formatPrice(currentPrice, currency),
    oldPriceFormatted: oldPrice ? formatPrice(oldPrice, currency) : null,
  };
}
