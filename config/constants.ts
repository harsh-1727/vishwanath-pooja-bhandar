/**
 * config/constants.ts
 *
 * App-wide constants that are NOT business data (that's business.config.ts
 * etc.) and NOT per-vertical feature toggles (that's feature.config.ts).
 * This file is genuinely generic engineering config — safe to leave
 * untouched when reusing the template for a different business.
 */

/** localStorage keys used by client-side hooks (no login system — see PROJECT_RULES.md rule 3). */
export const STORAGE_KEYS = {
  recentlyViewed: "vpb_recently_viewed",
  recentSearches: "vpb_recent_searches",
  compareList: "vpb_compare_list",
} as const;

/** Caps for client-side lists so localStorage never grows unbounded. */
export const LIST_LIMITS = {
  recentlyViewed: 12,
  recentSearches: 8,
  compareMax: 4,
  relatedProducts: 4,
  frequentlyBoughtTogether: 3,
} as const;

/** ISR revalidation window (seconds) for product/festival pages — content changes rarely. */
export const REVALIDATE_SECONDS = 3600;

/** Debounce delay for the smart search input, tuned for typo-tolerant fuzzy matching without feeling laggy. */
export const SEARCH_DEBOUNCE_MS = 200;

/** Minimum characters before search fires, to avoid noisy single-letter fuzzy matches. */
export const SEARCH_MIN_QUERY_LENGTH = 2;

/** Contact form constraints, enforced both client-side and in the Zod schema (src/lib/validation). */
export const CONTACT_FORM_LIMITS = {
  nameMax: 80,
  messageMax: 1000,
  phoneMin: 10,
} as const;

/** WhatsApp deep-link base — number is injected from contact.config.ts, never hardcoded per-use. */
export const WHATSAPP_API_BASE = "https://wa.me/";
