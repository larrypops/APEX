import { formatPrice } from "@/lib/pricing";
import type { CurrencyCode } from "@/lib/currency";

type PriceBlockProps = {
  currentPrice: number;
  oldPrice?: number | null;
  currency: CurrencyCode;
};

export function PriceBlock({ currentPrice, oldPrice, currency }: PriceBlockProps) {
  return (
    <div className="rounded-[28px] border border-[rgba(110,156,206,0.2)] bg-[linear-gradient(135deg,#081628_0%,#0d2340_48%,#112c53_100%)] p-5 text-white shadow-[0_28px_60px_rgba(8,18,33,0.24)] md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
        Official Catalog Price
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        {oldPrice ? (
          <span className="text-lg text-sky-100/70 line-through">
            {formatPrice(oldPrice, currency)}
          </span>
        ) : null}
        <span className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
          {formatPrice(currentPrice, currency)}
        </span>
      </div>
      <p className="mt-3 text-sm leading-7 text-sky-100/90">
        Geo-priced in {currency}. Shipping, delivery planning, and final order confirmation are reviewed by our team after submission.
      </p>
    </div>
  );
}
