import type { Metadata } from "next";
import Link from "next/link";
import { HomeHeroShowcase } from "@/components/home/HomeHeroShowcase";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
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

const catalogProducts = products;
const heroProducts = products.slice(0, 6);

const promoSections = [
  {
    title: "Product Applications",
    copy:
      "Explore compact laser units, high-output igniters, and industrial systems selected for demonstrations, workshop integration, production support, and project-specific sourcing.",
    items: ["Compact Laser Units", "High-Power Igniters", "Workshop Solutions", "Industrial Systems"],
  },
  {
    title: "Why Buyers Choose APEX",
    copy:
      "We present laser equipment with clear specifications, visible pricing, and a direct order-request process designed for faster qualification and smoother customer communication.",
    items: ["Clear Specifications", "Responsive Support", "International Supply", "Fast Order Requests"],
  },
];

const trustStats = [
  { label: "Order Requests", value: "124", note: "Customers requesting compact units, igniters, and machine configurations" },
  { label: "Repeat Buyers", value: "37", note: "Returning clients upgrading to higher-output models and repeat supply orders" },
  { label: "New Inquiries", value: "58", note: "Fresh demand from distributors, workshops, and industrial buyers" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "YouTube", href: "#", icon: YouTubeIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "Telegram", href: "#", icon: TelegramIcon },
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
      itemListElement: catalogProducts.map((product, index) => ({
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
      <div className="container-shell flex flex-col gap-8 py-4 md:py-8">
        <section className="surface fade-up rounded-[24px] p-3 md:p-5 lg:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-center lg:gap-8">
            <div className="space-y-4">
              <HomeHeroShowcase products={heroProducts} />
              <div className="rounded-2xl border border-[#ecd98d] bg-[#fff8cf] px-4 py-3 text-center text-sm font-semibold text-[#5f4700] lg:text-left">
                Warning: Minors are prohibited from purchasing!
              </div>
            </div>
            <div className="space-y-3 px-1 pb-1 text-center lg:px-0 lg:text-left">
              <p className="text-sm font-semibold text-[var(--accent-strong)]">
                Welcome to inquire!
              </p>
              <h1 className="text-[2.4rem] font-bold uppercase leading-none tracking-[-0.05em] text-neutral-950 sm:text-5xl lg:text-[4.5rem]">
                LASER PRODUCT
              </h1>
              <p className="text-sm font-medium text-neutral-700 sm:text-base">
                All Prices Are in US Dollars
              </p>
            </div>
          </div>
        </section>

        <section className="fade-up fade-up-delay-1 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                Product Catalog
              </p>
              <h2 className="section-title mt-2">All APEX LASER GROUP products</h2>
            </div>
            <Link href="/shop" className="text-sm font-semibold text-neutral-800 underline-offset-4 hover:underline">
              Open catalog page
            </Link>
          </div>
          <div className="overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--border)]">
            <div className="grid grid-cols-2 gap-px lg:grid-cols-3">
            {catalogProducts.map((product) => (
              <ProductCard key={product.id} product={product} currency={currency} />
            ))}
            </div>
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
              <p className="mt-4 max-w-xl text-base leading-8 text-neutral-700">{section.copy}</p>
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
            <p className="max-w-2xl text-sm leading-7 text-neutral-700">
              A quick overview of buyer activity and customer interest across the APEX LASER GROUP
              catalog.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {trustStats.map((item) => (
              <article
                key={item.label}
                className="rounded-[24px] border border-[var(--border)] bg-white p-5"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-neutral-700">{item.label}</p>
                <p className="mt-5 text-4xl font-semibold tracking-tight text-neutral-950">
                  {item.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-neutral-700">{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fade-up">
          <div className="surface rounded-[28px] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Contact + Social
            </p>
            <h2 className="section-title mt-2">We are here to assist you</h2>
            <p className="mt-4 text-base leading-8 text-neutral-700">
              Keep the social-contact-footer rhythm of the source site while making each channel
              cleaner and easier to scan.
            </p>
            <div className="mt-6 space-y-4 rounded-[22px] border border-[var(--border)] bg-white p-5">
              <p className="text-sm text-neutral-700">Address</p>
              <p className="font-medium text-neutral-900">
                30 N Gould St Num 39904 Sheridan, WY 82801
              </p>
              <p className="text-sm text-neutral-700">Hours</p>
              <p className="font-medium text-neutral-900">00:00 - 24:00</p>
              <p className="text-sm text-neutral-700">Phone</p>
              <p className="font-medium text-neutral-900">+86-15305304222 / +1(329)228-8566</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-900 hover:text-neutral-950"
                >
                  <span className="inline-flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
