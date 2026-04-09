import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CURRENCY_COOKIE, currencyFromCountry } from "@/lib/currency";

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country");
  const currency = currencyFromCountry(country);
  const response = NextResponse.next();

  if (request.cookies.get(CURRENCY_COOKIE)?.value !== currency) {
    response.cookies.set(CURRENCY_COOKIE, currency, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
