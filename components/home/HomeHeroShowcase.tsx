import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type HomeHeroShowcaseProps = {
  product: Product;
};

export function HomeHeroShowcase({ product }: HomeHeroShowcaseProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-[28px] border border-[rgba(123,173,225,0.16)] bg-white shadow-[0_24px_60px_rgba(9,24,49,0.12)]"
    >
      <div className="relative bg-[linear-gradient(180deg,#eef8ff_0%,#ffffff_100%)] p-3 md:p-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={900}
          height={1100}
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="aspect-[4/5] w-full rounded-[22px] object-cover transition duration-300 group-hover:scale-[1.02]"
          priority
        />
        <div className="absolute inset-x-5 bottom-5 rounded-[22px] bg-[linear-gradient(180deg,rgba(7,17,32,0.04)_0%,rgba(7,17,32,0.82)_100%)] p-4 md:inset-x-6 md:bottom-6 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
            Model {product.model}
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white md:text-2xl">{product.name}</h2>
          <p className="mt-2 text-sm text-white/90">View product details</p>
        </div>
      </div>
    </Link>
  );
}
