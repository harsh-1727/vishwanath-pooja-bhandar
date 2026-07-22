/**
 * src/lib/products/get-category-slugs.ts
 *
 * Used by Phase 8's category page generateStaticParams. Reads from
 * categories.config.ts (the taxonomy) rather than deriving slugs from
 * the product list, so a category with zero products today still
 * gets a valid (empty-state) page instead of silently not existing.
 */

import { categoriesConfig } from "@/config";

export function getAllCategorySlugs(): string[] {
  return categoriesConfig.map((category) => category.slug);
}
