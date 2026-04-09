import productsJson from "@/data/products.json";
import type { CurrencyCode } from "@/lib/currency";

export type Review = {
  author: string;
  date: string;
  rating: number;
  content: string;
};

export type Product = {
  id: string;
  model: string;
  slug: string;
  name: string;
  category: string;
  priceUSD: number;
  priceEUR: number;
  oldPriceUSD?: number | null;
  oldPriceEUR?: number | null;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  specs: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  relatedProductSlugs: string[];
  sourceUrl?: string;
};

export const products = productsJson as Product[];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export type ProductDisplayPricing = {
  currency: CurrencyCode;
  currentPrice: number;
  oldPrice: number | null;
};
