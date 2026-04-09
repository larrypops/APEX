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
    <div className="space-y-4 rounded-[24px] border border-[var(--border)] bg-[var(--accent-soft)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Order Request
          </p>
          <p className="mt-2 text-sm leading-7 text-neutral-700">
            Complete your order details and our team will contact you to confirm pricing,
            availability, and your preferred payment method.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Subtotal</p>
          <p className="mt-1 text-lg font-semibold text-[var(--accent-strong)]">
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

      <p className="text-sm leading-7 text-neutral-600">
        Ordering <span className="font-semibold text-neutral-900">{productName}</span> does not
        trigger online payment. We use your request to prepare the order, confirm availability,
        and review the final details with you directly. Shipping costs are not included in the
        displayed subtotal.
      </p>
    </div>
  );
}
