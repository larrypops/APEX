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
    <div className="surface rounded-[32px] p-4 md:p-6">
      <div className="grid gap-4">
        <details open className="rounded-[28px] border border-[rgba(110,156,206,0.18)] bg-[linear-gradient(180deg,#ffffff_0%,#f5faff_100%)] p-5 shadow-[0_20px_40px_rgba(8,18,33,0.08)]">
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

        <details className="rounded-[28px] border border-[rgba(110,156,206,0.18)] bg-[linear-gradient(180deg,#ffffff_0%,#f5faff_100%)] p-5 shadow-[0_20px_40px_rgba(8,18,33,0.08)]">
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
