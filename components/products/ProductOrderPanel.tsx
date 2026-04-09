"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { ContactIcon, CartIcon } from "@/components/ui/Icons";
import type { CurrencyCode } from "@/lib/currency";
import { formatPrice } from "@/lib/pricing";

type ProductOrderPanelProps = {
  productName: string;
  productSlug: string;
  currentPrice: number;
  currency: CurrencyCode;
};

export function ProductOrderPanel({
  productName,
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
    <div className="space-y-5 rounded-[20px] border border-[var(--border)] bg-white p-5 md:p-6">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
            Order Request
          </p>
          <p className="mt-2 text-sm leading-7 text-neutral-800">
            Complete your order details and our team will contact you to confirm pricing,
            availability, and your preferred payment method.
          </p>
        </div>
        <div className="rounded-[16px] border border-[var(--border)] bg-[#fbfbfc] px-4 py-3 text-left sm:text-right">
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Subtotal</p>
          <p className="mt-1 text-lg font-semibold text-neutral-950">
            {formatPrice(currentPrice * quantity, currency)}
          </p>
        </div>
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

      <div className="rounded-[16px] border border-[var(--border)] bg-[#fbfbfc] px-4 py-3 text-sm leading-7 text-neutral-700">
        Ordering <span className="font-semibold text-neutral-900">{productName}</span> does not
        trigger online payment. We use your request to prepare the order, confirm availability,
        and review delivery and payment preferences with you directly.
      </div>
    </div>
  );
}
