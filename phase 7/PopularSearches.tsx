/**
 * src/components/search/PopularSearches.tsx
 *
 * Renders config from lib/search/popular-searches.ts — see that
 * file's header comment for why this is curated, not analytics-driven.
 * No hooks/state used, so no "use client" needed on its own.
 */

import { TrendingUp } from "lucide-react";
import { curatedPopularSearches } from "@/lib/search";

interface PopularSearchesProps {
  onSelect: (term: string) => void;
}

export function PopularSearches({ onSelect }: PopularSearchesProps) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 px-2 text-xs font-medium uppercase tracking-wide text-ink/40">
        <TrendingUp size={12} aria-hidden="true" /> Popular
      </p>
      <div className="flex flex-wrap gap-2 px-2">
        {curatedPopularSearches.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onSelect(term)}
            className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/70 hover:border-saffron/40 hover:text-ink"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
