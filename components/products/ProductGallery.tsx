"use client";

import { useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  name: string;
  images: string[];
};

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[32px] border border-[rgba(110,156,206,0.2)] bg-[linear-gradient(180deg,#edf7ff_0%,#ffffff_100%)] p-4 shadow-[0_30px_70px_rgba(8,18,33,0.12)] md:p-5">
        <Image
          src={activeImage}
          alt={name}
          width={960}
          height={960}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-square w-full rounded-[26px] object-cover"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-[20px] border bg-white/95 p-2 transition ${
              index === activeIndex
                ? "border-[var(--accent)] shadow-[0_18px_36px_rgba(10,94,215,0.18)] ring-2 ring-[rgba(21,152,255,0.18)]"
                : "border-[var(--border)] hover:border-[rgba(21,152,255,0.3)]"
            }`}
          >
            <Image
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
              width={240}
              height={240}
              sizes="120px"
              className="aspect-square w-full rounded-[12px] object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
