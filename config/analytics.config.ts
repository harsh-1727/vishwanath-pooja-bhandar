import type { AnalyticsConfig } from "./types";

/**
 * config/analytics.config.ts
 *
 * Production analytics configuration.
 * Reads environment variables:
 *   - NEXT_PUBLIC_GA_MEASUREMENT_ID (default fallback: G-RDJRGKDZZF)
 *   - NEXT_PUBLIC_CLARITY_ID
 */
export const analyticsConfig: AnalyticsConfig = {
  gaMeasurementId: process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"] ?? "G-RDJRGKDZZF",
  clarityId: process.env["NEXT_PUBLIC_CLARITY_ID"] ?? "",
  debugMode: process.env.NODE_ENV === "development",
};
