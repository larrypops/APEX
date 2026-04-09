"use client";

import { useState } from "react";

type QuantitySelectorProps = {
  value?: number;
  onChange?: (value: number) => void;
};

export function QuantitySelector({ value, onChange }: QuantitySelectorProps) {
  const [internalQuantity, setInternalQuantity] = useState(1);
  const quantity = value ?? internalQuantity;

  function updateQuantity(nextValue: number) {
    if (onChange) {
      onChange(nextValue);
      return;
    }
    setInternalQuantity(nextValue);
  }

  return (
    <div>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-700">
        Quantity
      </p>
      <div className="inline-flex items-center overflow-hidden rounded-[14px] border border-[var(--border)] bg-white">
        <button
          type="button"
          onClick={() => updateQuantity(Math.max(1, quantity - 1))}
          className="flex h-11 w-11 items-center justify-center border-r border-[var(--border)] text-lg text-neutral-800 transition hover:bg-neutral-50"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="min-w-14 px-3 text-center text-base font-semibold text-neutral-950">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => updateQuantity(quantity + 1)}
          className="flex h-11 w-11 items-center justify-center border-l border-[var(--border)] text-lg text-neutral-800 transition hover:bg-neutral-50"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
