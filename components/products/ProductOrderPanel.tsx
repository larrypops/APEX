"use client";

import { useMemo, useState } from "react";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { Button } from "@/components/ui/Button";
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

  return (
    <div className="space-y-5 rounded-[28px] border border-[rgba(110,156,206,0.18)] bg-[linear-gradient(180deg,rgba(235,246,255,0.98)_0%,rgba(255,255,255,0.98)_100%)] p-5 shadow-[0_24px_60px_rgba(8,18,33,0.1)] md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
            Order Request
          </p>
          <p className="mt-2 text-sm leading-7 text-neutral-800">
            Complete your order details and our team will contact you to confirm pricing,
            availability, and your preferred payment method.
          </p>
        </div>
        <div className="rounded-[22px] border border-[rgba(110,156,206,0.18)] bg-[#071628] px-4 py-3 text-right text-white shadow-[0_16px_30px_rgba(8,18,33,0.18)]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-sky-200">Subtotal</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {formatPrice(currentPrice * quantity, currency)}
          </p>
        </div>
      </div>

      <QuantitySelector value={quantity} onChange={setQuantity} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href={orderHref} className="flex-1 justify-center" trailingIcon>
          <span className="inline-flex items-center gap-2">
            <CartIcon className="h-4 w-4" />
            <span>Proceed to Order</span>
          </span>
        </Button>
        <Button href="/contact-us" variant="secondary" className="flex-1 justify-center">
          <span className="inline-flex items-center gap-2">
            <ContactIcon className="h-4 w-4" />
            <span>Request Info</span>
          </span>
        </Button>
      </div>

      <p className="text-sm leading-7 text-neutral-800">
        Ordering <span className="font-semibold text-neutral-900">{productName}</span> does not
        trigger online payment. We use your request to prepare the order, confirm availability,
        and review the final details with you directly. Shipping costs are not included in the
        displayed subtotal.
      </p>
    </div>
  );
}
