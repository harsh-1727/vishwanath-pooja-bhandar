"use client";

/**
 * src/components/search/SearchDropdown.tsx
 */

import Link from "next/link";
import { Skeleton, EmptyState } from "@/components/ui";
import { RecentSearches } from "./RecentSearches";
import { PopularSearches } from "./PopularSearches";
import { formatPriceInr } from "@/lib/utils/format-price";
import { SEARCH_MIN_QUERY_LENGTH } from "@/config";
import type { SearchResultItem } from "@/types/search";

interface SearchDropdownProps {
  query: string;
  results: SearchResultItem[];
  loading: boolean;
  recentSearches: string[];
  onSelectQuery: (term: string) => void;
  onClearRecent: () => void;
}

export function SearchDropdown({
  query,
  results,
  loading,
  recentSearches,
  onSelectQuery,
  onClearRecent,
}: SearchDropdownProps) {
  const showResults = query.trim().length >= SEARCH_MIN_QUERY_LENGTH;

  return (
    <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-96 overflow-y-auto rounded-card border border-ink/10 bg-base p-3 shadow-lg animate-fade-in">
      {showResults ? (
        loading ? (
          <div className="space-y-2 p-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : results.length > 0 ? (
          <ul>
            {results.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/products/${item.categorySlug}/${item.slug}`}
                  className="flex items-center justify-between gap-3 rounded-md px-2 py-2 hover:bg-cream"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-ink">
                      {item.nameEnglish}
                    </span>
                    <span className="block truncate font-devanagari text-xs text-ink/50">
                      {item.nameHindi}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-medium text-ink/70">
                    {formatPriceInr(item.priceInr)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No matches found"
            description="Try a different word, or message us on WhatsApp and we'll help you find it."
            className="border-none py-6"
          />
        )
      ) : (
        <div className="space-y-4">
          <RecentSearches
            searches={recentSearches}
            onSelect={onSelectQuery}
            onClear={onClearRecent}
          />
          <PopularSearches onSelect={onSelectQuery} />
        </div>
      )}
    </div>
  );
}
