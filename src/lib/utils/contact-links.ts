/**
 * src/lib/utils/contact-links.ts
 *
 * Centralizes wa.me and tel: link construction. Every WhatsApp/Call
 * CTA across the site (FloatingWhatsApp, Header, MobileNav, product
 * pages, "Need Multiple Items") calls these instead of hand-building
 * a URL — so the digit-stripping and encoding logic exists in exactly
 * one place, and the WhatsApp number itself is only ever read from
 * contact.config.ts.
 */

import { contactConfig, WHATSAPP_API_BASE } from "@/config";

/**
 * Builds a wa.me deep link with an optional prefilled message.
 * wa.me requires digits only (no "+", spaces, or dashes) in the path.
 */
export function buildWhatsAppLink(message?: string): string {
  const digitsOnly = contactConfig.whatsapp.replace(/\D/g, "");
  const url = new URL(`${WHATSAPP_API_BASE}${digitsOnly}`);
  if (message) {
    url.searchParams.set("text", message);
  }
  return url.toString();
}

/** Builds a tel: link, preserving the leading "+" for the country code. */
export function buildTelLink(): string {
  return `tel:${contactConfig.phone.replace(/[^\d+]/g, "")}`;
}
