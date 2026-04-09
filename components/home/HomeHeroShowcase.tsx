import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type HomeHeroShowcaseProps = {
  products: Product[];
};

export function HomeHeroShowcase({ products }: HomeHeroShowcaseProps) {
  const scrollingProducts = [...products, ...products];

  return (
    <div className="overflow-hidden rounded-[28px] border border-[rgba(123,173,225,0.16)] bg-[linear-gradient(180deg,#eef8ff_0%,#ffffff_100%)] p-3 shadow-[0_24px_60px_rgba(9,24,49,0.12)] md:p-4">
      <div className="hero-marquee">
        <div className="hero-marquee-track">
          {scrollingProducts.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              href={`/products/${product.slug}`}
              className="group relative block w-[250px] shrink-0 overflow-hidden rounded-[24px] border border-white/70 bg-[#edf7ff] shadow-[0_18px_36px_rgba(9,24,49,0.12)] sm:w-[290px] lg:w-[320px]"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={900}
                height={1100}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 320px"
                className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                priority={index < products.length}
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(7,17,32,0)_0%,rgba(7,17,32,0.82)_100%)] p-4 md:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-200 md:text-xs">
                  Model {product.model}
                </p>
                <h2 className="mt-2 text-base font-semibold text-white md:text-lg">
                  {product.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
