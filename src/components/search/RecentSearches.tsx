"use client";

/**
 * src/components/search/RecentSearches.tsx
 */

import { Clock } from "lucide-react";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (term: string) => void;
  onClear?: () => void;
}

export function RecentSearches({
  searches,
  onSelect,
  onClear,
}: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between px-2">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink/40">
          <Clock size={12} aria-hidden="true" /> Recent
        </p>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-ink/40 hover:text-ink/70"
          >
            Clear
          </button>
        )}
      </div>
      <ul>
        {searches.map((term) => (
          <li key={term}>
            <button
              type="button"
              onClick={() => onSelect(term)}
              className="w-full rounded-md px-2 py-1.5 text-left text-sm text-ink/80 hover:bg-cream"
            >
              {term}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
