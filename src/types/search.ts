/**
 * src/types/search.ts
 *
 * Shape of /api/search's JSON response. Deliberately a lean subset of
 * the full Product type — the API sends only what a search dropdown
 * needs (name, price, link target), not the entire product record
 * (description, whatsInside, etc.), keeping the payload small as the
 * catalog scales toward 1000 items.
 */

export interface SearchResultItem {
  id: string;
  slug: string;
  categorySlug: string;
  nameEnglish: string;
  nameHindi: string;
  priceInr: number;
  score: number;
}

export interface SearchApiResponse {
  query: string;
  results: SearchResultItem[];
}
