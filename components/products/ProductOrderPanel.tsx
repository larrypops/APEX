"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { ContactIcon, CartIcon } from "@/components/ui/Icons";
import type { CurrencyCode } from "@/lib/currency";
import { formatPrice } from "@/lib/pricing";

type ProductOrderPanelProps = {
  productSlug: string;
  currentPrice: number;
  currency: CurrencyCode;
};

export function ProductOrderPanel({
  productSlug,
  currentPrice,
  currency,
}: ProductOrderPanelProps) {
  const [quantity, setQuantity] = useState(1);

  const orderHref = useMemo(
    () => `/order?product=${encodeURIComponent(productSlug)}&quantity=${quantity}`,
    [productSlug, quantity],
  );
  const infoHref = useMemo(
    () => `/contact-us?product=${encodeURIComponent(productSlug)}`,
    [productSlug],
  );

  return (
    <div className="space-y-4 rounded-[18px] border border-[var(--border)] bg-white p-4 md:p-5">
      <div className="rounded-[14px] border border-[var(--border)] bg-[#fbfbfc] px-4 py-3">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Total</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">
          {formatPrice(currentPrice * quantity, currency)}
        </p>
      </div>

      <QuantitySelector value={quantity} onChange={setQuantity} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={orderHref}
          className="button-motion inline-flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-[var(--accent-strong)] px-5 py-3 text-sm font-semibold text-white"
        >
          <CartIcon className="h-4 w-4" />
          <span>Order Now</span>
        </Link>
        <Link
          href={infoHref}
          className="button-motion inline-flex flex-1 items-center justify-center gap-2 rounded-[14px] border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-neutral-900"
        >
          <ContactIcon className="h-4 w-4" />
          <span>Request Information</span>
        </Link>
      </div>
    </div>
  );
}
