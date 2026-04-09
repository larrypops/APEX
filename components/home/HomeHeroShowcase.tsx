"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

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
    <div className="space-y-4">
      <Link
        href={`/products/${activeProduct.slug}`}
        className="group block overflow-hidden rounded-[28px] border border-[rgba(110,156,206,0.16)] bg-white p-3 shadow-[0_18px_36px_rgba(8,18,33,0.08)] md:p-4"
      >
        <Image
          src={activeProduct.images[0]}
          alt={activeProduct.name}
          width={900}
          height={1100}
          sizes="(max-width: 768px) 100vw, 520px"
          className="aspect-[4/5] w-full rounded-[24px] bg-[#eef7ff] object-cover transition duration-300 group-hover:scale-[1.01]"
          priority
        />
      </Link>

      {products.length > 1 ? (
        <div className="flex items-center justify-center gap-2">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition ${
                index === activeIndex
                  ? "w-7 bg-[var(--accent-strong)]"
                  : "w-2.5 bg-[rgba(110,156,206,0.32)]"
              }`}
              aria-label={`Show ${product.name}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
