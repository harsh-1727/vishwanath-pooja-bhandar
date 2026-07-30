"use client";

/**
 * src/components/search/SearchAnalyticsTracker.tsx
 *
 * Client tracker component to fire search analytics event when query parameter exists.
 */

import { useEffect } from "react";
import { trackSearch } from "@/lib/analytics";

export function SearchAnalyticsTracker({ query }: { query: string }) {
  useEffect(() => {
    if (query && query.trim()) {
      trackSearch({ search_term: query.trim() });
    }
  }, [query]);

  return null;
}
