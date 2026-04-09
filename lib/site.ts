import type { Metadata } from "next";

export const siteConfig = {
  name: "APEX LASER GROUP",
  legalName: "APEX LASER GROUP",
  domain: "https://apexlasergroup.com",
  locale: "en_US",
  titleTemplate: "%s | APEX LASER GROUP",
  defaultTitle: "APEX LASER GROUP",
  defaultDescription:
    "APEX LASER GROUP enterprise laser catalog with SSR-first product pages, JSON-driven product management, and inquiry-focused conversion flows.",
  defaultKeywords: [
    "APEX LASER GROUP",
    "laser equipment",
    "laser machine",
    "laser igniter",
    "laser light",
    "industrial laser products",
    "OEM laser supplier",
    "laser equipment catalog",
  ],
  ogImage: "/images/products/hero-catalog.svg",
  contact: {
    phone: "+1(329)228-8566",
    whatsapp: "https://wa.me/237XXXXXXXXX",
    address: "30 N Gould St Num 39904 Sheridan, WY 82801",
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.domain).toString();
}

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
} = {}): Metadata {
  const resolvedTitle = title ?? siteConfig.defaultTitle;
  const resolvedDescription = description ?? siteConfig.defaultDescription;
  const url = absoluteUrl(path);
  const image = absoluteUrl(siteConfig.ogImage);

  return {
    metadataBase: new URL(siteConfig.domain),
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: [...siteConfig.defaultKeywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 540,
          alt: `${siteConfig.name} catalog preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image],
    },
    category: "technology",
  };
}
