/**
 * config/site.config.ts
 *
 * Environment-aware site identity. NEXT_PUBLIC_SITE_URL is read from
 * .env.local (see .env.example); this file supplies the fallback used
 * in local dev so the build never breaks on a missing env var.
 */

import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  url: process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3000",
  locale: "en-IN",
  defaultLocale: "en-IN",
  // Hindi is supported as content (product names, search), not as a
  // separate routed locale — see PROJECT_MASTER.md §4 Language.
  // This array exists for forward-compatibility if full i18n routing
  // is ever needed for a future template reuse case.
  supportedLocales: ["en-IN"],
};
