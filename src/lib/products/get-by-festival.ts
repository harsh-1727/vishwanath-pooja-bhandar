/**
 * src/lib/products/get-by-festival.ts
 */

import { getAllProducts } from "./get-all";
import type { Product } from "@/types/product";

export function getProductsByFestival(festivalSlug: string): Product[] {
  return getAllProducts().filter(
    (product) => product.festivalSlug === festivalSlug
  );
}
