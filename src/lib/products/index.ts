/**
 * src/lib/products/index.ts
 *
 * The sanctioned import path for product data anywhere in the app.
 * eslint.config.mjs's no-restricted-imports rule blocks importing
 * data/products.json directly from components specifically so this
 * file stays the single choke point — see PROJECT_RULES.md rule 2.
 */

export { getAllProducts } from "./get-all";
export { getProductBySlug } from "./get-by-slug";
export { getProductsByCategory, getCategoryCounts } from "./get-by-category";
export { getRelatedProducts } from "./get-related";
export { getComplementaryProducts } from "./get-complementary";
export { getAllCategorySlugs } from "./get-category-slugs";
export { getProductsByFestival } from "./get-by-festival";
