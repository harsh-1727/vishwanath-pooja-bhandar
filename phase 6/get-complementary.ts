/**
 * src/lib/products/get-complementary.ts
 *
 * Backs the feature PROJECT_MASTER.md calls "Frequently Bought
 * Together" — but this is a brand-new website for a shop with zero
 * online transaction history, so there is no real purchase-pattern
 * data to base that claim on. Fabricating one would violate
 * PROJECT_RULES.md rule 1 (never invent facts).
 *
 * This function instead implements a transparent, explainable content
 * heuristic: featured items from OTHER categories than the current
 * product (the theory being someone buying a Diwali kit may also want
 * a Satyanarayan kit, even though we can't claim that's a proven
 * pattern). The UI component consuming this (Phase 9) MUST be labeled
 * something honest like "You May Also Need" — never "Frequently
 * Bought Together", which implies aggregate purchase analytics that
 * don't exist. Flagged explicitly for whoever builds that UI next.
 */

import { getAllProducts } from "./get-all";
import type { Product } from "@/types/product";
import { LIST_LIMITS } from "@/config";

export function getComplementaryProducts(
  product: Product,
  limit: number = LIST_LIMITS.frequentlyBoughtTogether
): Product[] {
  return getAllProducts()
    .filter(
      (p) =>
        p.categorySlug !== product.categorySlug &&
        p.id !== product.id &&
        p.featured
    )
    .slice(0, limit);
}
