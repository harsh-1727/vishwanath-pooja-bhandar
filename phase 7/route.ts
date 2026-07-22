/**
 * src/app/api/search/route.ts
 *
 * Server-side search endpoint. Exists specifically so SearchBar's
 * live-typing dropdown never ships the full product catalog to the
 * client — only the (small) set of matched results per keystroke,
 * which is what actually keeps this scalable toward the 1000-product
 * ceiling mentioned in the project brief. The /search results page
 * calls searchProducts() directly server-side instead (see that
 * page's comment) since it doesn't need a client round-trip.
 */

import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/search";
import type { SearchApiResponse } from "@/types/search";

export async function GET(request: Request): Promise<NextResponse<SearchApiResponse>> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  const results = searchProducts(query, 8).map(({ product, score }) => ({
    id: product.id,
    slug: product.slug,
    categorySlug: product.categorySlug,
    nameEnglish: product.nameEnglish,
    nameHindi: product.nameHindi,
    priceInr: product.priceInr,
    score,
  }));

  return NextResponse.json({ query, results });
}
