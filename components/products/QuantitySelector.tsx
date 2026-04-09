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
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
        Quantity
      </p>
      <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-white p-1">
        <button
          type="button"
          onClick={() => updateQuantity(Math.max(1, quantity - 1))}
          className="h-10 w-10 rounded-full text-lg text-neutral-700 transition hover:bg-neutral-100"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="min-w-12 text-center text-base font-semibold text-neutral-950">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => updateQuantity(quantity + 1)}
          className="h-10 w-10 rounded-full text-lg text-neutral-700 transition hover:bg-neutral-100"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
