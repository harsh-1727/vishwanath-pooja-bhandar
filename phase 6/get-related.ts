/**
 * src/lib/products/get-related.ts
 */

import { getAllProducts } from "./get-all";
import type { Product } from "@/types/product";
import { LIST_LIMITS } from "@/config";

export function getRelatedProducts(
  product: Product,
  limit: number = LIST_LIMITS.relatedProducts
): Product[] {
  return getAllProducts()
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, limit);
}
