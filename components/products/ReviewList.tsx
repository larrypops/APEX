import type { Review } from "@/data/products";

type ReviewListProps = {
  reviews: Review[];
  productName: string;
};

export function ReviewList({ reviews, productName }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-[18px] border border-[var(--border)] bg-white p-4 text-sm leading-7 text-neutral-700">
        No review samples are available yet for {productName}. You can still request details and
        confirmation from our team before placing an order.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-700">
        {reviews.length} visible review samples for {productName}
      </p>
      <div className="space-y-4">
        {reviews.map((review) => (
          <article
            key={`${review.author}-${review.date}`}
            className="rounded-[18px] border border-[var(--border)] bg-white p-4 md:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-neutral-950">{review.author}</h3>
                <p className="text-sm text-neutral-700">{review.date}</p>
              </div>
              <p className="text-sm font-semibold text-[var(--gold)]">
                {"★".repeat(review.rating)}
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-neutral-700">{review.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
