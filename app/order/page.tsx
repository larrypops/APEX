import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderRequestForm } from "@/components/order/OrderRequestForm";
import { OrderSummary } from "@/components/order/OrderSummary";
import { getProductBySlug } from "@/data/products";
import { getPreferredCurrency } from "@/lib/currency-server";
import { createMetadata } from "@/lib/site";

type PageProps = {
  searchParams: Promise<{ product?: string; quantity?: string }>;
};

export const metadata: Metadata = {
  ...createMetadata({
    title: "Place Your Order",
    description:
      "Complete your order details with APEX LASER GROUP. Submit your product request, delivery information, and preferred payment method for confirmation.",
    path: "/order",
    keywords: ["order form", "place your order", "checkout request", "laser equipment inquiry"],
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default async function OrderPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const slug = params.product;
  const quantity = Math.max(1, Number(params.quantity || "1") || 1);

  if (!slug) {
    notFound();
  }

  const product = getProductBySlug(slug);
  const currency = await getPreferredCurrency();

  if (!product) {
    notFound();
  }

  return (
    <div className="container-shell py-6 md:py-10">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="fade-up">
          <OrderRequestForm product={product} quantity={quantity} currency={currency} />
        </div>
        <div className="fade-up fade-up-delay-1">
          <OrderSummary product={product} quantity={quantity} currency={currency} />
        </div>
      </div>
    </div>
  );
}
