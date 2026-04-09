import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import type { CurrencyCode } from "@/lib/currency";

type RelatedProductsProps = {
  currentSlug: string;
  relatedSlugs: string[];
  currency: CurrencyCode;
};

export function RelatedProducts({ currentSlug, relatedSlugs, currency }: RelatedProductsProps) {
  const related = products.filter(
    (product) => product.slug !== currentSlug && relatedSlugs.includes(product.slug),
  );

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
          Related Products
        </p>
        <h2 className="section-title mt-2">Continue exploring similar models</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-5">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} currency={currency} />
        ))}
      </div>
    </div>
  );
}
