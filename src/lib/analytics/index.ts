/**
 * src/lib/analytics/index.ts
 *
 * Centralized, privacy-safe analytics tracking module for GA4 and Clarity.
 * All custom events and conversion tracking flow through here.
 */

import { analyticsConfig } from "@/config";

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

/** Determines if debug mode is active (via ?ga_debug=true URL param or dev mode) */
export function isDebugMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("ga_debug") === "true" || analyticsConfig.debugMode;
  } catch {
    return false;
  }
}

/** Generic privacy-safe event sender for GA4 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const cleanParams: Record<string, string | number | boolean> = {};

  if (isDebugMode()) {
    cleanParams["debug_mode"] = true;
  }

  if (eventParams) {
    for (const [key, value] of Object.entries(eventParams)) {
      if (value !== undefined && value !== null && value !== "") {
        cleanParams[key] = value;
      }
    }
  }

  try {
    window.gtag("event", eventName, cleanParams);
  } catch (error) {
    if (isDebugMode()) {
      console.error("[Analytics] Error tracking event:", eventName, error);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Type-Safe Event Helper Interfaces & Functions
// ─────────────────────────────────────────────────────────────────────────────

export interface WhatsAppClickParams {
  button_location:
    | "floating"
    | "homepage_cta"
    | "product_page"
    | "contact_page"
    | "products_bottom_cta"
    | "header"
    | "mobile_nav"
    | "category_page"
    | string;
  page_path?: string;
  page_title?: string;
  product_name?: string;
  product_slug?: string;
  category_name?: string;
}

export function trackWhatsAppClick(params: WhatsAppClickParams): void {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  const currentTitle = typeof document !== "undefined" ? document.title : "";

  trackEvent("whatsapp_click", {
    button_location: params.button_location,
    page_path: params.page_path ?? currentPath,
    page_title: params.page_title ?? currentTitle,
    ...(params.product_name && { product_name: params.product_name }),
    ...(params.product_slug && { product_slug: params.product_slug }),
    ...(params.category_name && { category_name: params.category_name }),
  });
}

export interface PhoneCallClickParams {
  button_location:
    | "floating"
    | "contact_page"
    | "header"
    | "mobile_nav"
    | string;
  page_path?: string;
}

export function trackPhoneCall(params: PhoneCallClickParams): void {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  trackEvent("phone_call_click", {
    button_location: params.button_location,
    page_path: params.page_path ?? currentPath,
  });
}

export interface ProductViewParams {
  product_name: string;
  product_slug: string;
  category: string;
}

export function trackProductView(params: ProductViewParams): void {
  trackEvent("view_product", {
    product_name: params.product_name,
    product_slug: params.product_slug,
    category: params.category,
  });
}

export interface CategoryViewParams {
  category_name: string;
}

export function trackCategoryView(params: CategoryViewParams): void {
  trackEvent("category_view", {
    category_name: params.category_name,
  });
}

export interface SearchParams {
  search_term: string;
}

export function trackSearch(params: SearchParams): void {
  const trimmed = params.search_term.trim();
  if (!trimmed) return;
  trackEvent("search", {
    search_term: trimmed,
  });
}
