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
      <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-4">
        <Image
          src={activeImage}
          alt={name}
          width={960}
          height={960}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-square w-full rounded-[22px] object-cover"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-[18px] border bg-white p-2 transition ${
              index === activeIndex
                ? "border-[var(--accent)] ring-2 ring-[rgba(207,63,35,0.18)]"
                : "border-[var(--border)]"
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
