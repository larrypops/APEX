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
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-700">
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

        <section className="surface fade-up rounded-[28px] p-5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <ProductGallery name={product.name} images={product.images} />

            <div className="space-y-6">
              <div className="space-y-4">
                <Badge>{product.category}</Badge>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-700">
                  Model {product.model}
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-neutral-950">
                  {product.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-700">
                  <span className="font-semibold text-[var(--gold)]">
                    {"★".repeat(Math.round(product.rating))}
                  </span>
                  <span>{product.rating.toFixed(2)} out of 5</span>
                  <span>({product.reviewCount} reviews)</span>
                </div>
              </div>

              <PriceBlock
                currentPrice={pricing.currentPrice}
                oldPrice={pricing.oldPrice}
                currency={pricing.currency}
              />

              <p className="text-base leading-8 text-neutral-700">{product.shortDescription}</p>
              <p className="text-sm leading-7 text-neutral-700">
                Prices are displayed in <span className="font-semibold text-neutral-900">{pricing.currency}</span> based on your detected region. Shipping costs are not included and final order details are confirmed by our team before processing.
              </p>

              <ProductOrderPanel
                productName={product.name}
                productSlug={product.slug}
                currentPrice={pricing.currentPrice}
                currency={pricing.currency}
              />

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Global shipping consultation available",
                  "Enterprise support and configuration guidance",
                  "Availability: confirm lead time before order",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[var(--border)] bg-white p-4 text-sm leading-7 text-neutral-700"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="rounded-[24px] border border-[var(--border)] bg-white p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-700">
                  Preferred Payment Options
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Visa", logo: "/images/payments/visa.svg" },
                    { label: "Mastercard", logo: "/images/payments/mastercard.svg" },
                    { label: "PayPal", logo: "/images/payments/paypal.svg" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[18px] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] p-4"
                    >
                      <div className="flex h-12 items-center justify-center rounded-2xl border border-[rgba(120,162,200,0.14)] bg-white px-3">
                        <Image
                          src={item.logo}
                          alt={`${item.label} logo`}
                          width={72}
                          height={36}
                          className="h-auto w-auto"
                        />
                      </div>
                      <p className="mt-3 text-center text-sm font-semibold text-neutral-800">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  Payment is not processed online. Your preferred method will be collected during
                  the order request and confirmed by our team afterwards.
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
