import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { getPreferredCurrency } from "@/lib/currency-server";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Enterprise Laser Equipment Catalog",
  description:
    "Explore APEX LASER GROUP laser lights, laser igniters, and industrial laser machines in a fast SSR enterprise storefront built for SEO and inquiry conversion.",
  path: "/",
  keywords: ["enterprise laser catalog", "laser supplier", "industrial laser equipment"],
});

const featuredProducts = products.slice(0, 8);

const promoSections = [
  {
    title: "Creative Products",
    copy:
      "A curated mix of compact laser lights, high-output igniters, and workshop-ready machines displayed in a simpler, more legible catalog.",
    items: ["Laser Lens", "Signal Beam", "Workshop Picks", "Engraving Essentials"],
  },
  {
    title: "Live Product Highlights",
    copy:
      "The source storefront emphasizes livestream discovery. This rebuild keeps that energy with product-first promotional cards and a clear catalog path.",
    items: ["Daily Deals", "New Drops", "Top Rated", "Fast Inquiry"],
  },
];

const trustStats = [
  { label: "Recent Orders", value: "124", note: "Updated from visible storefront cues" },
  { label: "VIP Renewals", value: "37", note: "Repeat buyers asking for higher wattage models" },
  { label: "New Signups", value: "58", note: "Interest across hobby, demo, and machine categories" },
];

const paymentProofs = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  src: `/images/payment-proofs/proof-${(index % 3) + 1}.svg`,
}));

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "X", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Telegram", href: "#" },
];

export default async function HomePage() {
  const currency = await getPreferredCurrency();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.name,
    description:
      "Enterprise laser equipment catalog for APEX LASER GROUP with static product data and inquiry-led product pages.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Laser Product Collection",
      itemListElement: featuredProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          image: product.images[0],
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: product.priceUSD,
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-shell flex flex-col gap-8 py-6 md:py-10">
        <section className="surface fade-up rounded-[28px] p-4 md:p-6">
          <div className="rounded-[22px] border border-[var(--border)] bg-[linear-gradient(135deg,#fff6ef_0%,#ffffff_44%,#fff5d9_100%)] p-6 md:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge variant="warning">Warning</Badge>
              <p className="text-sm font-medium text-neutral-700">
                Product pages are optimized for direct inquiry, specification review, and project
                matching. Sensitive or restricted product decisions should always be handled through
                compliant enterprise channels.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <Badge>Laser Product</Badge>
                <div className="space-y-4">
                  <h1 className="section-title max-w-3xl">
                    APEX LASER GROUP laser catalog for enterprise buyers and project-based procurement.
                  </h1>
                  <p className="section-copy max-w-2xl">
                    Browse laser lights, laser igniters, and industrial laser machines through a
                    cleaner B2B storefront built for discoverability, specification review, and
                    direct inquiry.
                  </p>
                  <p className="text-sm leading-7 text-neutral-600">
                    Official catalog prices are available in USD and EUR, shipping costs are not
                    included, and minors are not allowed to purchase.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button href="/shop">Browse Catalog</Button>
                  <Button href="/contact-us" variant="secondary">
                    Request Product Info
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Catalog Range", value: "5W to 2000W" },
                    { label: "Visible Pricing", value: "USD / EUR Geo Pricing" },
                    { label: "Actions", value: "Order Request Flow" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-[var(--border)] bg-white/80 p-4"
                    >
                      <p className="text-sm text-neutral-500">{stat.label}</p>
                      <p className="mt-2 text-lg font-semibold text-neutral-950">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-[var(--border)] bg-neutral-950 p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/60">Offline</p>
                  <h2 className="mt-6 text-2xl font-semibold">Facebook Stream</h2>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    Social-facing product content reworked into a calmer, faster, and more
                    search-friendly enterprise presentation.
                  </p>
                </div>
                <div className="rounded-[24px] border border-[var(--border)] bg-[var(--accent)] p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/70">Live</p>
                  <h2 className="mt-6 text-2xl font-semibold">TikTok Highlights</h2>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    Discovery-focused content translated into lightweight SSR sections with clearer
                    hierarchy, stronger copy, and better mobile readability.
                  </p>
                </div>
                <div className="sm:col-span-2 rounded-[24px] border border-[var(--border)] bg-white p-4">
                  <Image
                    src="/images/products/hero-catalog.svg"
                    alt="Laser catalog illustration"
                    width={1200}
                    height={540}
                    className="h-auto w-full rounded-[18px]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="fade-up fade-up-delay-1 space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                Featured Products
              </p>
              <h2 className="section-title mt-2">Featured products from APEX LASER GROUP</h2>
            </div>
            <Link href="/shop" className="text-sm font-semibold text-neutral-800 underline-offset-4 hover:underline">
              View all products
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} currency={currency} />
            ))}
          </div>
        </section>

        <section className="fade-up fade-up-delay-2 grid gap-5 lg:grid-cols-2">
          {promoSections.map((section, index) => (
            <div
              key={section.title}
              className={`surface rounded-[28px] p-6 md:p-8 ${
                index === 0 ? "bg-white/90" : "bg-[#fff9f4]"
              }`}
            >
              <Badge variant={index === 0 ? "default" : "warning"}>{section.title}</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950">
                {section.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-neutral-600">{section.copy}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {section.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[var(--border)] bg-white/85 p-4 text-sm font-medium text-neutral-800"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="surface fade-up rounded-[28px] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                Trust Snapshot
              </p>
              <h2 className="section-title mt-2">Recent orders, renewals, and signups</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-neutral-600">
              This section translates storefront trust signals into cleaner B2B proof points for
              APEX LASER GROUP, with static sample metrics ready to be replaced by real business data.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {trustStats.map((item) => (
              <article
                key={item.label}
                className="rounded-[24px] border border-[var(--border)] bg-white p-5"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">{item.label}</p>
                <p className="mt-5 text-4xl font-semibold tracking-tight text-neutral-950">
                  {item.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fade-up grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface rounded-[28px] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Recent Payments
            </p>
            <h2 className="section-title mt-2">Payment proof gallery</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600">
              A responsive grid ready for replacing with real approved assets later.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {paymentProofs.map((proof) => (
                <div
                  key={proof.id}
                  className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-white"
                >
                  <Image
                    src={proof.src}
                    alt={`Payment proof placeholder ${proof.id}`}
                    width={400}
                    height={300}
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="surface rounded-[28px] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Contact + Social
            </p>
            <h2 className="section-title mt-2">We are here to assist you</h2>
            <p className="mt-4 text-base leading-8 text-neutral-600">
              Keep the social-contact-footer rhythm of the source site while making each channel
              cleaner and easier to scan.
            </p>
            <div className="mt-6 space-y-4 rounded-[22px] border border-[var(--border)] bg-white p-5">
              <p className="text-sm text-neutral-500">Address</p>
              <p className="font-medium text-neutral-900">
                30 N Gould St Num 39904 Sheridan, WY 82801
              </p>
              <p className="text-sm text-neutral-500">Hours</p>
              <p className="font-medium text-neutral-900">00:00 - 24:00</p>
              <p className="text-sm text-neutral-500">Phone</p>
              <p className="font-medium text-neutral-900">+86-15305304222 / +1(329)228-8566</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-950"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
