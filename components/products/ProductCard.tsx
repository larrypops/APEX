import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
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
    <article className="surface surface-soft group overflow-hidden rounded-[28px] border-[rgba(123,173,225,0.14)]">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden border-b border-[var(--border)] bg-[linear-gradient(180deg,#edf8ff_0%,#ffffff_100%)] p-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={640}
            height={640}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="aspect-square w-full rounded-[20px] object-cover transition duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute left-7 top-7">
            <Badge>{product.category}</Badge>
          </div>
        </div>
        <div className="space-y-4 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Model {product.model}
          </p>
          <h3 className="text-lg font-semibold leading-7 tracking-tight text-neutral-950">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 text-sm">
            {pricing.oldPrice ? (
              <span className="text-neutral-400 line-through">
                {formatPrice(pricing.oldPrice, pricing.currency)}
              </span>
            ) : null}
            <span className="text-xl font-semibold text-[var(--accent-strong)]">
              {formatPrice(pricing.currentPrice, pricing.currency)}
            </span>
          </div>
          <p className="text-sm leading-7 text-neutral-600">{product.shortDescription}</p>
        </div>
      </Link>
    </article>
  );
}
