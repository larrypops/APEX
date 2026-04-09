import { cookies } from "next/headers";
import { CURRENCY_COOKIE, type CurrencyCode } from "@/lib/currency";

export async function getPreferredCurrency(): Promise<CurrencyCode> {
  const store = await cookies();
  const value = store.get(CURRENCY_COOKIE)?.value;
  return value === "EUR" ? "EUR" : "USD";
}
