import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/data/products";
import type { CurrencyCode } from "@/lib/currency";
import { getProductPricing } from "@/lib/currency";

type HomeHeroShowcaseProps = {
  products: Product[];
  currency: CurrencyCode;
};

export function HomeHeroShowcase({ products, currency }: HomeHeroShowcaseProps) {
  const loopProducts = [...products, ...products];

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[rgba(112,198,255,0.18)] bg-[linear-gradient(160deg,rgba(6,18,37,0.96)_0%,rgba(10,28,56,0.92)_52%,rgba(15,46,92,0.9)_100%)] p-4 shadow-[0_26px_80px_rgba(3,10,26,0.42)]">
      <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(123,217,255,0.9),transparent)]" />
      <div className="absolute -right-20 top-6 h-40 w-40 rounded-full bg-[rgba(75,180,255,0.2)] blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-[rgba(25,124,245,0.22)] blur-3xl" />

      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#90dfff]">
            Featured Selection
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
            Explore popular APEX models
          </h2>
        </div>
        <Badge variant="warning">Tap any product</Badge>
      </div>

      <div className="hero-marquee">
        <div className="hero-marquee-track">
          {loopProducts.map((product, index) => {
            const pricing = getProductPricing(product, currency);

            return (
              <Link
                key={`${product.id}-${index}`}
                href={`/products/${product.slug}`}
                className="group relative w-[220px] shrink-0 overflow-hidden rounded-[24px] border border-[rgba(121,203,255,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] p-3 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[rgba(133,226,255,0.42)]"
              >
                <div className="relative overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.06)_100%)] p-2">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={640}
                    height={640}
                    sizes="220px"
                    className="aspect-square w-full rounded-[14px] object-cover transition duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a5e8ff]">
                    Model {product.model}
                  </p>
                  <h3 className="line-clamp-2 text-sm font-semibold leading-6 text-white">
                    {product.name}
                  </h3>
                  <p className="text-base font-semibold text-[#8ee2ff]">
                    {pricing.currentPriceFormatted}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
