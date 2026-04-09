"use client";

import { useState } from "react";
import Image from "next/image";
import { proxiedImageSrc } from "@/lib/images";

type ProductGalleryProps = {
  name: string;
  images: string[];
};

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-white p-3 md:p-4">
        <Image
          src={proxiedImageSrc(activeImage)}
          alt={name}
          width={960}
          height={960}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-square w-full bg-white object-contain"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-[14px] border bg-white p-1.5 transition ${
              index === activeIndex
                ? "border-[var(--accent)] ring-1 ring-[rgba(17,117,209,0.18)]"
                : "border-[var(--border)] hover:border-[rgba(17,117,209,0.24)]"
            }`}
          >
            <Image
              src={proxiedImageSrc(image)}
              alt={`${name} thumbnail ${index + 1}`}
              width={240}
              height={240}
              sizes="120px"
              className="aspect-square w-full rounded-[10px] bg-white object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
