/**
 * src/lib/products/get-by-slug.ts
 */

import { getAllProducts } from "./get-all";
import type { Product } from "@/types/product";

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((product) => product.slug === slug);
}
