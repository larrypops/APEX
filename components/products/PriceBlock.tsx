import { formatPrice } from "@/lib/pricing";
import type { CurrencyCode } from "@/lib/currency";

type PriceBlockProps = {
  currentPrice: number;
  oldPrice?: number | null;
  currency: CurrencyCode;
};

export function PriceBlock({ currentPrice, oldPrice, currency }: PriceBlockProps) {
  return (
    <div className="rounded-[20px] border border-[var(--border)] bg-[#fbfbfc] p-5 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-600">
        Official Catalog Price
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        {oldPrice ? (
          <span className="text-lg text-neutral-400 line-through">
            {formatPrice(oldPrice, currency)}
          </span>
        ) : null}
        <span className="text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
          {formatPrice(currentPrice, currency)}
        </span>
      </div>
      <p className="mt-3 text-sm leading-7 text-neutral-700">
        Geo-priced in {currency}. Shipping, delivery planning, and final order confirmation are reviewed by our team after submission.
      </p>
    </div>
  );
}
