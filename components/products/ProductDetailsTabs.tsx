"use client";

import { useState } from "react";
import type { Review } from "@/data/products";
import { ReviewList } from "@/components/products/ReviewList";

type ProductDetailsTabsProps = {
  fullDescription: string;
  specs: string[];
  reviews: Review[];
  reviewCount: number;
  productName: string;
};

export function ProductDetailsTabs({
  fullDescription,
  specs,
  reviews,
  reviewCount,
  productName,
}: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "info" | "reviews">("description");

  const tabs = [
    { key: "description", label: "Description" },
    { key: "info", label: "Additional Information" },
    { key: "reviews", label: `Reviews (${reviewCount})` },
  ] as const;

  return (
    <div className="surface rounded-[24px] p-4 md:p-6">
      <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-[12px] px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.key
                ? "bg-neutral-950 text-white"
                : "border border-[var(--border)] bg-white text-neutral-700 hover:text-neutral-950"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-5">
        {activeTab === "description" ? (
          fullDescription ? (
            <div className="prose-copy max-w-none">
              <p>{fullDescription}</p>
            </div>
          ) : (
            <p className="text-sm leading-7 text-neutral-700">
              Product description details will be confirmed during order review.
            </p>
          )
        ) : null}

        {activeTab === "info" ? (
          specs.length > 0 ? (
            <div className="grid gap-px overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--border)]">
              {specs.map((spec) => (
                <div key={spec} className="bg-white px-4 py-3 text-sm text-neutral-800">
                  {spec}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-7 text-neutral-700">
              Additional product information will be confirmed during the order review process.
            </p>
          )
        ) : null}

        {activeTab === "reviews" ? (
          <ReviewList reviews={reviews} productName={productName} />
        ) : null}
      </div>
    </div>
  );
}
