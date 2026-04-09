import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductDetailsTabs } from "@/components/products/ProductDetailsTabs";
import { ProductOrderPanel } from "@/components/products/ProductOrderPanel";
import { PriceBlock } from "@/components/products/PriceBlock";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import {
  FacebookIcon,
  LinkedInIcon,
  PinterestIcon,
  TelegramIcon,
  XIcon,
} from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { getProductBySlug, products } from "@/data/products";
import { getProductPricing } from "@/lib/currency";
import { getPreferredCurrency } from "@/lib/currency-server";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    ...createMetadata({
      title: product.name,
      description: product.shortDescription,
      path: `/products/${product.slug}`,
      keywords: [product.name, product.category, `${product.category} supplier`],
    }),
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: absoluteUrl(`/products/${product.slug}`),
      title: `${product.name} | ${siteConfig.name}`,
      description: product.shortDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: product.images[0],
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const currency = await getPreferredCurrency();

  if (!product) {
    notFound();
  }
  const pricing = getProductPricing(product, currency);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: pricing.currency,
      price: pricing.currentPrice,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-shell py-6 md:py-10">
        <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-[14px] border border-[var(--border)] bg-white px-4 py-2 text-sm text-neutral-700">
          <Link href="/" className="hover:text-neutral-950">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-neutral-950">
            Shop
          </Link>
          <span>/</span>
          <span className="text-neutral-900">{product.name}</span>
        </div>

        <section className="surface fade-up rounded-[26px] p-4 md:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
            <ProductGallery name={product.name} images={product.images} />

            <div className="space-y-5">
              <div className="rounded-[22px] border border-[var(--border)] bg-white p-5 md:p-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge>{product.category}</Badge>
                    <span className="rounded-full border border-[var(--border)] bg-[#fbfbfc] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-700">
                      Model {product.model}
                    </span>
                  </div>
                  <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
                    {product.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-800">
                    <span className="inline-flex items-center rounded-full bg-[rgba(245,184,61,0.14)] px-3 py-1 font-semibold text-[var(--gold)]">
                      {"★".repeat(Math.round(product.rating))}
                    </span>
                    <span>{product.rating.toFixed(2)} out of 5</span>
                    <span>({product.reviewCount} reviews)</span>
                  </div>
                  <p className="max-w-2xl text-base leading-8 text-neutral-800">
                    {product.shortDescription}
                  </p>
                  <p className="text-sm leading-7 text-neutral-700">
                    Prices are displayed in <span className="font-semibold text-neutral-900">{pricing.currency}</span> based on your detected region. Shipping costs are not included and final order details are confirmed by our team before processing.
                  </p>
                </div>
              </div>

              <PriceBlock
                currentPrice={pricing.currentPrice}
                oldPrice={pricing.oldPrice}
                currency={pricing.currency}
              />

              <ProductOrderPanel
                productName={product.name}
                productSlug={product.slug}
                currentPrice={pricing.currentPrice}
                currency={pricing.currency}
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[18px] border border-[var(--border)] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                    Delivery Information
                  </p>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    Delivery timing and shipping scope are confirmed after your order request based on destination, quantity, and stock review.
                  </p>
                </div>
                <div className="rounded-[18px] border border-[var(--border)] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                    Order Confirmation
                  </p>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    We review the selected product, quantity, pricing, and preferred payment method before confirming the order with you directly.
                  </p>
                </div>
                <div className="rounded-[18px] border border-[var(--border)] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                    Support
                  </p>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    Our team assists with product questions, project matching, delivery planning, and business inquiries before and after submission.
                  </p>
                </div>
                <div className="rounded-[18px] border border-[var(--border)] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                    Preferred Payment Methods
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {[
                      { label: "Visa", logo: "/images/payments/visa.svg" },
                      { label: "Mastercard", logo: "/images/payments/mastercard.svg" },
                      { label: "PayPal", logo: "/images/payments/paypal.svg" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex h-12 items-center justify-center rounded-[12px] border border-[var(--border)] bg-[#fbfbfc] px-3"
                      >
                        <Image
                          src={item.logo}
                          alt={`${item.label} logo`}
                          width={76}
                          height={34}
                          className="h-auto w-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] border border-[var(--border)] bg-white p-4 md:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-neutral-900">Share this product</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-700">
                    {[
                      { label: "Facebook", icon: FacebookIcon },
                      { label: "X", icon: XIcon },
                      { label: "Pinterest", icon: PinterestIcon },
                      { label: "LinkedIn", icon: LinkedInIcon },
                      { label: "Telegram", icon: TelegramIcon },
                    ].map((item) => (
                      <span
                        key={item.label}
                        className="rounded-full border border-[var(--border)] bg-[#fbfbfc] px-3 py-2 text-neutral-800"
                      >
                        <span className="inline-flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="fade-up fade-up-delay-1 mt-8">
          <ProductDetailsTabs
            fullDescription={product.fullDescription}
            specs={product.specs}
            reviews={product.reviews}
            reviewCount={product.reviewCount}
            productName={product.name}
          />
        </section>

        <section className="fade-up fade-up-delay-2 mt-8">
          <RelatedProducts
            currentSlug={product.slug}
            relatedSlugs={product.relatedProductSlugs}
            currency={pricing.currency}
          />
        </section>
      </div>
    </>
  );
}
