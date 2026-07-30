import type { MetadataRoute } from "next";
import { siteConfig, categoriesConfig } from "@/config";
import { getAllProducts, getCategoryCounts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (siteConfig.url || "https://vishwanathpoojabhandar.com").replace(/\/+$/, "");
  const lastModified = new Date();

  // Static routes
  const staticRoutes = ["", "/about", "/contact", "/faq", "/gallery", "/festivals", "/products"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Category routes — only include categories that have products
  const counts = getCategoryCounts();
  const categoryRoutes = categoriesConfig
    .filter((cat) => (counts[cat.slug] ?? 0) > 0)
    .map((cat) => ({
      url: `${baseUrl}/products/${cat.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  // Product routes
  const products = getAllProducts();
  const productRoutes = products.map((prod) => ({
    url: `${baseUrl}/products/${prod.categorySlug}/${prod.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
