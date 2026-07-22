"use client";

/**
 * src/components/search/SearchBar.tsx
 *
 * Debounces input (SEARCH_DEBOUNCE_MS), fetches from /api/search once
 * the query clears SEARCH_MIN_QUERY_LENGTH, and shows a dropdown of
 * live results / recent searches / curated popular searches depending
 * on state. Click-outside-to-close is handled explicitly — without it,
 * the dropdown would stay open after the person clicks anywhere else
 * on the page, which is a common and easy-to-miss bug in hand-rolled
 * search components.
 */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { SearchDropdown } from "./SearchDropdown";
import { useRecentSearches } from "@/hooks";
import { SEARCH_DEBOUNCE_MS, SEARCH_MIN_QUERY_LENGTH } from "@/config";
import { cn } from "@/lib/utils/cn";
import type { SearchApiResponse, SearchResultItem } from "@/types/search";

interface SearchBarProps {
  autoFocus?: boolean;
  /** Called after a successful navigation — used by FloatingSearchButton to close its wrapping Modal. */
  onNavigate?: () => void;
  className?: string;
}

export function SearchBar({ autoFocus = false, onNavigate, className }: SearchBarProps) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { recentSearches, addSearch, clearSearches } = useRecentSearches();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < SEARCH_MIN_QUERY_LENGTH) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json() as Promise<SearchApiResponse>)
        .then((data) => setResults(data.results))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToSearchPage(finalQuery: string) {
    const trimmed = finalQuery.trim();
    if (!trimmed) return;
    addSearch(trimmed);
    setOpen(false);
    onNavigate?.();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div ref={wrapperRef} className={cn("relative w-full", className)}>
      <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-base px-4 py-2.5 focus-within:border-saffron/50 focus-within:ring-2 focus-within:ring-saffron/30">
        <Search size={18} className="shrink-0 text-ink/40" aria-hidden="true" />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter") goToSearchPage(query);
            if (event.key === "Escape") setOpen(false);
          }}
          placeholder="Search puja kits, festivals, deities..."
          aria-label="Search products"
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
        {loading && (
          <Loader2
            size={16}
            className="shrink-0 animate-spin text-ink/30"
            aria-hidden="true"
          />
        )}
        {query && !loading && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            aria-label="Clear search"
            className="shrink-0 text-ink/40 hover:text-ink"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {open && (
        <SearchDropdown
          query={query}
          results={results}
          loading={loading}
          recentSearches={recentSearches}
          onSelectQuery={goToSearchPage}
          onClearRecent={clearSearches}
        />
      )}
    </div>
  );
}
