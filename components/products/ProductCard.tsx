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
    <article className="group h-full overflow-hidden rounded-[22px] border border-[rgba(110,156,206,0.14)] bg-white/95">
      <Link href={`/products/${product.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden bg-[#f5faff] p-3 sm:p-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={640}
            height={640}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            className="aspect-square w-full rounded-[16px] object-cover transition duration-300 group-hover:scale-[1.015]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 px-3 pb-4 pt-3 sm:px-4 sm:pb-5">
          <h3 className="min-h-[3rem] text-sm font-semibold leading-6 tracking-tight text-neutral-950 sm:min-h-[3.4rem] sm:text-base">
            {product.name}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-700">
            <span className="font-semibold tracking-[0.14em] text-[var(--gold)]">
              {"★".repeat(Math.round(product.rating))}
            </span>
            <span className="font-medium text-neutral-800">{product.rating.toFixed(1)}</span>
            <span className="text-neutral-500">({product.reviewCount})</span>
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-1 text-sm">
            {pricing.oldPrice ? (
              <span className="text-neutral-400 line-through decoration-neutral-400">
                {formatPrice(pricing.oldPrice, pricing.currency)}
              </span>
            ) : null}
            <span className="text-lg font-semibold tracking-tight text-[var(--accent-strong)] sm:text-xl">
              {formatPrice(pricing.currentPrice, pricing.currency)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
