/**
 * config/site.config.ts
 *
 * Base site identity. Production base URL is ALWAYS https://vishwanathpoojabhandar.com.
 * NEXT_PUBLIC_SITE_URL can override this if explicitly set in environment.
 */
import type { SiteConfig } from "./types";

const DEFAULT_URL = "https://vishwanathpoojabhandar.com";
const envUrl = process.env["NEXT_PUBLIC_SITE_URL"]?.trim();
const rawUrl = envUrl && envUrl.length > 0 ? envUrl : DEFAULT_URL;
const sanitizedUrl = rawUrl.replace(/\/+$/, "");

export const siteConfig: SiteConfig = {
  url: sanitizedUrl.startsWith("http") ? sanitizedUrl : `https://${sanitizedUrl}`,
  locale: "en-IN",
  defaultLocale: "en-IN",
  supportedLocales: ["en-IN"],
};
