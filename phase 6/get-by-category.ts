/**
 * src/lib/products/get-by-category.ts
 */

import { getAllProducts } from "./get-all";
import type { Product } from "@/types/product";

export function getProductsByCategory(categorySlug: string): Product[] {
  return getAllProducts().filter(
    (product) => product.categorySlug === categorySlug
  );
}

/**
 * Live counts per category, computed from the actual product data.
 * This is what CategoryGrid (Phase 5) uses to show real numbers
 * instead of the hardcoded, driftable counts categories.config.ts
 * deliberately avoided — see that file's header comment.
 */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const product of getAllProducts()) {
    counts[product.categorySlug] = (counts[product.categorySlug] ?? 0) + 1;
  }
  return counts;
}
