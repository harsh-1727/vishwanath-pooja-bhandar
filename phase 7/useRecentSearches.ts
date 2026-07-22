"use client";

/**
 * src/hooks/useRecentSearches.ts
 *
 * localStorage-backed search history. No login system (see
 * PROJECT_RULES.md rule 3), so this is purely client-side and
 * per-device — capped at LIST_LIMITS.recentSearches, most-recent-first,
 * de-duplicated case-insensitively. Fails silently (feature just
 * degrades to "no history") if localStorage is unavailable, e.g.
 * private browsing — never throws and breaks the search UI over it.
 */

import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS, LIST_LIMITS } from "@/config";

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.recentSearches);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setRecentSearches(
            parsed.filter((item): item is string => typeof item === "string")
          );
        }
      }
    } catch {
      // localStorage unavailable — degrade to empty history, don't crash.
    }
  }, []);

  const addSearch = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const deduped = prev.filter(
        (q) => q.toLowerCase() !== trimmed.toLowerCase()
      );
      const next = [trimmed, ...deduped].slice(0, LIST_LIMITS.recentSearches);
      try {
        window.localStorage.setItem(
          STORAGE_KEYS.recentSearches,
          JSON.stringify(next)
        );
      } catch {
        // ignore write failures (quota exceeded, private browsing, etc.)
      }
      return next;
    });
  }, []);

  const clearSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      window.localStorage.removeItem(STORAGE_KEYS.recentSearches);
    } catch {
      // ignore
    }
  }, []);

  return { recentSearches, addSearch, clearSearches };
}
