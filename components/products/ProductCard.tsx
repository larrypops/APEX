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
    <article className="group h-full bg-white">
      <Link href={`/products/${product.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden border-b border-[#eceff3] bg-[#fafbfc] p-2 sm:p-2.5">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={640}
            height={640}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            className="aspect-square w-full object-contain p-1.5 transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5 px-2.5 pb-3 pt-2.5 sm:px-3 sm:pb-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
            {product.category}
          </p>
          <h3 className="min-h-[2.8rem] text-sm font-semibold leading-5 tracking-tight text-neutral-950 sm:min-h-[3rem]">
            {product.name}
          </h3>
          <div className="flex flex-wrap items-center gap-1 text-xs text-neutral-600 sm:text-sm">
            <span className="font-semibold tracking-[0.12em] text-[var(--gold)]">
              {"★".repeat(Math.round(product.rating))}
            </span>
            <span className="font-medium text-neutral-800">{product.rating.toFixed(1)}</span>
            <span className="text-neutral-500">({product.reviewCount})</span>
          </div>
          <div className="mt-auto flex flex-wrap items-end gap-x-2 gap-y-1 pt-1 text-sm">
            {pricing.oldPrice ? (
              <span className="text-xs text-neutral-400 line-through decoration-neutral-400 sm:text-sm">
                {formatPrice(pricing.oldPrice, pricing.currency)}
              </span>
            ) : null}
            <span className="text-base font-semibold tracking-tight text-[var(--accent-strong)] sm:text-lg">
              {formatPrice(pricing.currentPrice, pricing.currency)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
