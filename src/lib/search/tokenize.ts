/**
 * src/lib/search/tokenize.ts
 *
 * Normalizes text for matching: lowercase, trim, collapse whitespace,
 * strip common punctuation. Deliberately does NOT strip or transliterate
 * Devanagari characters — Hindi queries need to match Hindi product
 * names as real, unmodified text (see PROJECT_MASTER.md §4 Language).
 */

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?()'"]/g, "")
    .replace(/\s+/g, " ");
}

export function tokenize(text: string): string[] {
  return normalizeText(text).split(" ").filter(Boolean);
}
