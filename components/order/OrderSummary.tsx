import Image from "next/image";
import type { Product } from "@/data/products";
import type { CurrencyCode } from "@/lib/currency";
import { getProductPricing } from "@/lib/currency";
import { proxiedImageSrc } from "@/lib/images";

type OrderSummaryProps = {
  product: Product;
  quantity: number;
  currency: CurrencyCode;
};

export function OrderSummary({ product, quantity, currency }: OrderSummaryProps) {
  const pricing = getProductPricing(product, currency);
  const total = pricing.currentPrice * quantity;

  return (
    <aside className="surface rounded-[28px] p-5 md:sticky md:top-28 md:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-700">
        Order Summary
      </p>

      <div className="mt-5 overflow-hidden rounded-[24px] border border-[var(--border)] bg-white">
        <div className="border-b border-[var(--border)] p-4">
          <Image
            src={proxiedImageSrc(product.images[0])}
            alt={product.name}
            width={800}
            height={800}
            sizes="(max-width: 1024px) 100vw, 30vw"
            className="aspect-square w-full rounded-[18px] object-cover"
          />
        </div>
        <div className="space-y-4 p-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
              {product.name}
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-700">
              Model {product.model}
            </p>
            <p className="mt-2 text-sm leading-7 text-neutral-700">{product.shortDescription}</p>
          </div>

          <div className="grid gap-3 rounded-[20px] border border-[var(--border)] bg-neutral-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">Quantity</span>
              <span className="font-semibold text-neutral-950">{quantity}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">Unit price</span>
              <span className="font-semibold text-neutral-950">
                {pricing.currentPriceFormatted}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 text-sm">
              <span className="text-neutral-700">Total</span>
              <span className="text-lg font-semibold text-[var(--accent-strong)]">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency,
                  maximumFractionDigits: 2,
                }).format(total)}
              </span>
            </div>
          </div>

          <div className="rounded-[20px] border border-[var(--border)] bg-[var(--accent-soft)] p-4 text-sm leading-7 text-neutral-700">
            Shipping costs are not included in the listed total. Delivery timeline and final order
            confirmation will be reviewed by our team after your request is submitted. Minors are
            not allowed to purchase.
          </div>
        </div>
      </div>
    </aside>
  );
}
