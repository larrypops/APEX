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
        <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-[rgba(123,173,225,0.16)] bg-white/90 px-4 py-2 text-sm text-neutral-700 shadow-[0_12px_30px_rgba(8,18,33,0.08)]">
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

        <section className="surface fade-up rounded-[32px] p-4 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <ProductGallery name={product.name} images={product.images} />

            <div className="space-y-6 lg:space-y-7">
              <div className="rounded-[30px] border border-[rgba(110,156,206,0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,250,255,0.96)_100%)] p-5 shadow-[0_24px_60px_rgba(8,18,33,0.1)] md:p-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge>{product.category}</Badge>
                    <span className="rounded-full border border-[rgba(110,156,206,0.18)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-700">
                      Model {product.model}
                    </span>
                  </div>
                  <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
                    {product.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-800">
                    <span className="inline-flex items-center rounded-full bg-[rgba(245,184,61,0.12)] px-3 py-1 font-semibold text-[var(--gold)]">
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

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  {
                    title: "Project Matching",
                    copy: "Our team helps align power range, application use, and delivery scope before the order is confirmed.",
                  },
                  {
                    title: "Lead Time Review",
                    copy: "Availability and shipping timelines are verified after your request based on destination and order volume.",
                  },
                  {
                    title: "Business Support",
                    copy: "We assist distributors, workshops, and industrial buyers with product guidance and order coordination.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[26px] border border-[rgba(110,156,206,0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f5faff_100%)] p-5 shadow-[0_20px_40px_rgba(8,18,33,0.08)]"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-neutral-800">{item.copy}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[30px] border border-[rgba(110,156,206,0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f5faff_100%)] p-5 shadow-[0_20px_40px_rgba(8,18,33,0.08)] md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-900">
                      Preferred Payment Options
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-neutral-800">
                      Payment is not processed online. Your preferred method is collected during the order request and confirmed by our team afterwards.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-700">
                    <span className="font-semibold text-neutral-900">Share:</span>
                    {[
                      { label: "Facebook", icon: FacebookIcon },
                      { label: "X", icon: XIcon },
                      { label: "Pinterest", icon: PinterestIcon },
                      { label: "LinkedIn", icon: LinkedInIcon },
                      { label: "Telegram", icon: TelegramIcon },
                    ].map((item) => (
                      <span
                        key={item.label}
                        className="rounded-full border border-[var(--border)] bg-white px-3 py-2 text-neutral-800"
                      >
                        <span className="inline-flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Visa", logo: "/images/payments/visa.svg" },
                    { label: "Mastercard", logo: "/images/payments/mastercard.svg" },
                    { label: "PayPal", logo: "/images/payments/paypal.svg" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[22px] border border-[rgba(110,156,206,0.16)] bg-white p-4 shadow-[0_16px_30px_rgba(8,18,33,0.06)]"
                    >
                      <div className="flex h-14 items-center justify-center rounded-[18px] border border-[rgba(120,162,200,0.14)] bg-[linear-gradient(180deg,#ffffff_0%,#eef7ff_100%)] px-3">
                        <Image
                          src={item.logo}
                          alt={`${item.label} logo`}
                          width={88}
                          height={40}
                          className="h-auto w-auto"
                        />
                      </div>
                      <p className="mt-3 text-center text-sm font-semibold text-neutral-900">
                        {item.label}
                      </p>
                    </div>
                  ))}
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
