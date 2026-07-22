/**
 * config/seo.config.ts
 *
 * Default metadata values consumed by src/lib/seo/metadata builders
 * (Phase 13). Per-page metadata (product, festival pages) overrides
 * these — this file is only the sitewide fallback, so no page ever
 * ships with empty <title>/<meta description> even before Phase 13's
 * per-page builders are wired in.
 */

import type { SeoConfig } from "./types";
import { businessConfig } from "./business.config";

export const seoConfig: SeoConfig = {
  titleTemplate: `%s | ${businessConfig.name}`,
  defaultTitle: `${businessConfig.name} — ${businessConfig.type}, West Patel Nagar, Delhi`,
  defaultDescription: businessConfig.description,
  defaultOgImage: "/images/og-default.jpg", // decorative artwork only — see BRAND_GUIDELINES.md Imagery Guidelines
  // No social profiles confirmed yet (see navigation.config.ts socialLinks) — null until one exists.
  twitterHandle: null,
};
