import { formatPrice } from "@/lib/pricing";
import type { CurrencyCode } from "@/lib/currency";

type PriceBlockProps = {
  currentPrice: number;
  oldPrice?: number | null;
  currency: CurrencyCode;
};

export function PriceBlock({ currentPrice, oldPrice, currency }: PriceBlockProps) {
  return (
    <div className="rounded-[24px] border border-[var(--border)] bg-white p-5">
      <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">Price</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {oldPrice ? (
          <span className="text-xl text-neutral-400 line-through">
            {formatPrice(oldPrice, currency)}
          </span>
        ) : null}
        <span className="text-4xl font-semibold tracking-tight text-[var(--accent-strong)]">
          {formatPrice(currentPrice, currency)}
        </span>
      </div>
    </div>
  );
}
