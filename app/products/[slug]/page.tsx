import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductOrderPanel } from "@/components/products/ProductOrderPanel";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import {
  ContactIcon,
  EyeIcon,
  FacebookIcon,
  LinkedInIcon,
  PinterestIcon,
  ShieldCheckIcon,
  TelegramIcon,
  TruckIcon,
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
      keywords: [
        product.name,
        `${product.name} price`,
        `${product.name} specifications`,
        `${product.category} supplier`,
        `${product.category} manufacturer`,
        `${product.category} wholesale`,
        `APEX LASER GROUP ${product.category}`,
        `Model ${product.model}`,
      ],
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
  const liveViewers =
    9 + ((Number(product.model.replace(/\D/g, "")) || product.reviewCount + 3) % 13);
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
                  <div className="flex flex-wrap items-end gap-3 border-t border-[var(--border)] pt-3">
                    {pricing.oldPrice ? (
                      <span className="text-lg text-neutral-400 line-through">
                        {pricing.oldPriceFormatted}
                      </span>
                    ) : null}
                    <span className="text-4xl font-semibold tracking-tight text-neutral-950">
                      {pricing.currentPriceFormatted}
                    </span>
                  </div>
                </div>
              </div>

              <ProductOrderPanel
                productSlug={product.slug}
                currentPrice={pricing.currentPrice}
                currency={pricing.currency}
              />

              <div className="grid gap-2">
                {[
                  {
                    title: "Delivery",
                    copy: "Shipping confirmed after order review.",
                    icon: TruckIcon,
                  },
                  {
                    title: "Confirmation",
                    copy: "We confirm stock and payment preference.",
                    icon: ShieldCheckIcon,
                  },
                  {
                    title: "Support",
                    copy: "Fast help for product and order questions.",
                    icon: ContactIcon,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-[16px] border border-[var(--border)] bg-white px-4 py-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
                      <p className="text-sm text-neutral-700">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[18px] border border-[var(--border)] bg-white p-4">
                <p className="text-sm font-semibold text-neutral-900">Preferred payment methods</p>
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

              <div className="rounded-[18px] border border-[var(--border)] bg-white p-4">
                <div className="flex items-center gap-3 text-neutral-900">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                    <EyeIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{liveViewers} people are viewing this product</p>
                    <p className="text-sm text-neutral-600">Live product interest indicator</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] border border-[var(--border)] bg-white p-4">
                <p className="text-sm font-semibold text-neutral-900">Share</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-neutral-700">
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
        </section>

        <section className="fade-up fade-up-delay-1 mt-8">
          <div className="surface rounded-[24px] p-5 md:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
              Description
            </p>
            <div className="prose-copy mt-4 max-w-none">
              <p>{product.fullDescription || product.shortDescription}</p>
              {product.specs.length > 0 ? (
                <ul>
                  {product.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
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
