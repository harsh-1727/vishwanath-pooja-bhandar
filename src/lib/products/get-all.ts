/**
 * src/lib/products/get-all.ts
 *
 * The ONLY place in the entire app that reads validated product data
 * into memory — every other data-access function in this folder
 * calls getAllProducts() and filters/sorts in memory rather than
 * re-reading or re-validating the JSON. Validation runs once (Zod is
 * not free at 32-and-growing-toward-1000 products) and the result is
 * memoized at module scope for the lifetime of the server process —
 * safe because data/products.json is static build input, not
 * per-request data.
 */

import { validateProductDatabase } from "@/data/schema";
import type { Product } from "@/types/product";

let cache: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (cache) return cache;
  const db = validateProductDatabase();
  cache = db.products;
  return cache;
}
