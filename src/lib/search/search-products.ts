/**
 * src/lib/search/search-products.ts
 *
 * Scores every product against a (possibly multi-word) query by
 * taking, per query token, the BEST score across all of the product's
 * matchable fields (English name, Hindi name, search keywords) and
 * each individual word within those fields — then averages across
 * tokens. This means a two-word query like "diwali kit" still finds
 * a product that only strongly matches "diwali", rather than
 * requiring every token to match something.
 *
 * SCALING NOTE: this is an O(products × tokens × fields × words)
 * brute-force scan — fine at 32 products, still fine at a few hundred,
 * but if the catalog grows toward the 1000-product ceiling mentioned
 * in the project brief and search latency becomes noticeable, the
 * next step is a precomputed inverted index (token → product ids)
 * rather than rescoring every product on every keystroke. Not built
 * now because it would be premature complexity for today's 32 items —
 * flagged here so it's a deliberate future decision, not a surprise.
 */

import { getAllProducts } from "@/lib/products";
import type { Product } from "@/types/product";
import { tokenize } from "./tokenize";
import { fuzzyScore } from "./fuzzy-match";
import { SEARCH_MIN_QUERY_LENGTH } from "@/config";

export interface SearchResult {
  product: Product;
  score: number;
}

function matchableFields(product: Product): string[] {
  return [product.nameEnglish, product.nameHindi, ...product.searchKeywords];
}

function scoreProduct(product: Product, queryTokens: string[]): number {
  const fields = matchableFields(product);
  let total = 0;

  for (const token of queryTokens) {
    let best = 0;
    for (const field of fields) {
      best = Math.max(best, fuzzyScore(token, field));
      for (const fieldWord of field.split(" ")) {
        best = Math.max(best, fuzzyScore(token, fieldWord));
      }
    }
    total += best;
  }

  return queryTokens.length > 0 ? total / queryTokens.length : 0;
}

export function searchProducts(query: string, limit = 8): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0 || query.trim().length < SEARCH_MIN_QUERY_LENGTH) {
    return [];
  }

  return getAllProducts()
    .map((product) => ({ product, score: scoreProduct(product, tokens) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
