/**
 * config/index.ts
 *
 * Barrel export so app code writes:
 *   import { businessConfig, contactConfig } from "@/config";
 * instead of reaching into individual files. Keeps import statements
 * short and makes it obvious at a glance which config domains a
 * component depends on.
 */

export * from "./types";
export { businessConfig } from "./business.config";
export { contactConfig } from "./contact.config";
export { themeConfig } from "./theme.config";
export { siteConfig } from "./site.config";
export { seoConfig } from "./seo.config";
export { navigationConfig } from "./navigation.config";
export { festivalConfig } from "./festival.config";
export { featureConfig } from "./feature.config";
export { categoriesConfig } from "./categories.config";
export { festivalDatesConfig } from "./festivalDates.config";
export { analyticsConfig } from "./analytics.config";
export * from "./constants";
