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
  return (
    <div className="surface rounded-[28px] p-4 md:p-6">
      <div className="grid gap-4">
        <details open className="rounded-[24px] border border-[var(--border)] bg-white p-5">
          <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.16em] text-neutral-900">
            Description
          </summary>
          <div className="prose-copy pt-5">
            <p>{fullDescription}</p>
            <ul>
              {specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>
        </details>

        <details className="rounded-[24px] border border-[var(--border)] bg-white p-5">
          <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.16em] text-neutral-900">
            Reviews ({reviewCount})
          </summary>
          <div className="pt-5">
            <ReviewList reviews={reviews} productName={productName} />
          </div>
        </details>
      </div>
    </div>
  );
}
