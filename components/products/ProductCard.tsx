import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import type { CurrencyCode } from "@/lib/currency";
import { getProductPricing } from "@/lib/currency";
import { formatPrice } from "@/lib/pricing";

type ProductCardProps = {
  product: Product;
  currency: CurrencyCode;
};

export function ProductCard({ product, currency }: ProductCardProps) {
  const pricing = getProductPricing(product, currency);

  return (
    <article className="surface surface-soft group overflow-hidden rounded-[30px] border-[rgba(123,173,225,0.14)] bg-[linear-gradient(180deg,rgba(248,252,255,0.98)_0%,rgba(238,246,253,0.95)_100%)]">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden border-b border-[var(--border)] bg-[linear-gradient(180deg,#eef8ff_0%,#ffffff_100%)] p-3 md:p-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={640}
            height={640}
            sizes="(max-width: 768px) 50vw, 50vw"
            className="aspect-square w-full rounded-[22px] object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="space-y-3 p-4 md:p-5">
          <h3 className="min-h-[3.5rem] text-base font-semibold leading-7 tracking-tight text-neutral-950 md:text-lg">
            {product.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-800">
            <span className="font-semibold tracking-[0.16em] text-[var(--gold)]">
              {"★".repeat(Math.round(product.rating))}
            </span>
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-neutral-600">({product.reviewCount})</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {pricing.oldPrice ? (
              <span className="text-neutral-500 line-through decoration-neutral-400">
                {formatPrice(pricing.oldPrice, pricing.currency)}
              </span>
            ) : null}
            <span className="text-xl font-semibold tracking-tight text-[var(--accent-strong)] md:text-2xl">
              {formatPrice(pricing.currentPrice, pricing.currency)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
