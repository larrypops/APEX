import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type HomeHeroShowcaseProps = {
  products: Product[];
};

export function HomeHeroShowcase({ products }: HomeHeroShowcaseProps) {
  const loopProducts = [...products, ...products];

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[rgba(112,198,255,0.18)] bg-[linear-gradient(160deg,rgba(6,18,37,0.96)_0%,rgba(10,28,56,0.92)_52%,rgba(15,46,92,0.9)_100%)] p-3 shadow-[0_26px_80px_rgba(3,10,26,0.42)] md:p-4">
      <div className="hero-marquee">
        <div className="hero-marquee-track">
          {loopProducts.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              href={`/products/${product.slug}`}
              className="group relative w-[280px] shrink-0 overflow-hidden rounded-[24px] border border-[rgba(121,203,255,0.14)] bg-white/6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(133,226,255,0.42)] md:w-[360px]"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={800}
                height={800}
                sizes="(max-width: 768px) 280px, 360px"
                className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(3,10,26,0.78)_100%)] p-4 md:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                  Model {product.model}
                </p>
                <h3 className="mt-2 line-clamp-2 text-base font-semibold text-white md:text-lg">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
