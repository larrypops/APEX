"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { proxiedImageSrc } from "@/lib/images";

type HomeHeroShowcaseProps = {
  products: Product[];
};

export function HomeHeroShowcase({ products }: HomeHeroShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex] ?? products[0];

  useEffect(() => {
    if (products.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [products.length]);

  if (!activeProduct) {
    return null;
  }

  return (
    <div className="space-y-3">
      <Link
        href={`/products/${activeProduct.slug}`}
        className="group block overflow-hidden rounded-[20px] border border-[#edf1f5] bg-[#f8f9fb]"
      >
        <Image
          src={proxiedImageSrc(activeProduct.images[0])}
          alt={activeProduct.name}
          width={900}
          height={1100}
          sizes="(max-width: 768px) calc(100vw - 0.75rem), (max-width: 1200px) 62vw, 760px"
          className="aspect-[4/5] w-full bg-[#f8f9fb] object-contain p-3 transition duration-300 group-hover:scale-[1.015] sm:p-4 md:aspect-[6/5] lg:aspect-[5/4]"
          priority
        />
      </Link>

      {products.length > 1 ? (
        <div className="flex items-center justify-center gap-2.5">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition ${
                index === activeIndex
                  ? "w-7 bg-[var(--accent-strong)]"
                  : "w-2.5 bg-[#cfd8e3]"
              }`}
              aria-label={`Show ${product.name}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
