import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/shop", "/contact-us"].map((path) => ({
    url: absoluteUrl(path || "/"),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productPages = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages];
}
