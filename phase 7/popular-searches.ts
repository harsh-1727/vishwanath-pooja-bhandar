/**
 * src/lib/search/popular-searches.ts
 *
 * NOT derived from real search analytics — this is a brand-new site
 * with no query history yet (same honesty constraint as
 * get-complementary.ts's "Frequently Bought Together" — see
 * PROJECT_RULES.md rule 1). This is an editorially curated list of
 * major festivals/occasions that correspond to real products in the
 * catalog (verified against data/products.json so every term here
 * actually returns results — a "popular search" that dead-ends would
 * be worse than not showing one).
 *
 * Once real analytics exist (a future phase), this should be replaced
 * by an actual top-queries computation. The `string[]` export shape
 * is intentionally trivial so that swap is a drop-in replacement.
 */

export const curatedPopularSearches: string[] = [
  "Navratri",
  "Diwali",
  "Ganesh Chaturthi",
  "Satyanarayan",
  "Griha Pravesh",
  "Karva Chauth",
];
