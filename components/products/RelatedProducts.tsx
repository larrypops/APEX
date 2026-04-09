import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";

type RelatedProductsProps = {
  currentSlug: string;
  relatedSlugs: string[];
};

export function RelatedProducts({ currentSlug, relatedSlugs }: RelatedProductsProps) {
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
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
