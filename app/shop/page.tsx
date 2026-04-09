import type { Metadata } from "next";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { products } from "@/data/products";
import { getPreferredCurrency } from "@/lib/currency-server";
import { createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Shop Laser Products",
  description:
    "Browse the APEX LASER GROUP product catalog for laser lights, laser igniters, and industrial laser machines with SSR product listing pages.",
  path: "/shop",
  keywords: ["shop laser products", "laser product listing", "laser catalog"],
});

export default async function ShopPage() {
  const currency = await getPreferredCurrency();

  return (
    <div className="container-shell py-6 md:py-10">
      <section className="surface fade-up rounded-[28px] p-6 md:p-8">
        <Badge>Shop</Badge>
        <h1 className="section-title mt-4">APEX LASER GROUP product catalog</h1>
        <p className="section-copy mt-4 max-w-3xl">
          Browse laser lights, laser igniters, and machine models with clear descriptions,
          visible pricing, and a professional order-request flow.
        </p>
        <p className="mt-3 text-sm leading-7 text-neutral-700">
          Prices are currently displayed in <span className="font-semibold text-neutral-900">{currency}</span> based on your detected region. Shipping costs are not included and final order details are confirmed by our team after submission.
        </p>
      </section>

      <section className="fade-up fade-up-delay-1 mt-8 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} currency={currency} />
        ))}
      </section>
    </div>
  );
}
