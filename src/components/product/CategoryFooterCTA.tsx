"use client";

import Link from "next/link";
import { Search, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";
import { trackWhatsAppClick } from "@/lib/analytics";

/**
 * A professional CTA card shown at the bottom of every category page.
 * Encourages users to search or contact the store for additional items.
 */
export function CategoryFooterCTA() {
  return (
    <div className="mt-12 rounded-2xl border border-saffron/20 bg-gradient-to-br from-cream/60 via-white to-saffron/5 p-6 sm:p-8 shadow-sm">
      <h3 className="font-display text-xl text-ink sm:text-2xl">
        Need More Products?
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base">
        We stock many more products than shown here.
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-ink/70">
        <li className="flex items-start gap-2">
          <span className="mt-0.5 text-saffron">•</span>
          <span>Search across our full product catalogue</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5 text-saffron">•</span>
          <span>Ask us on WhatsApp for any specific item</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5 text-saffron">•</span>
          <span>We can arrange additional items on request</span>
        </li>
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-lg bg-saffron px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-saffron/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
        >
          <Search size={16} aria-hidden="true" />
          Search Products
        </Link>
        <a
          href={buildWhatsAppLink(
            "Hi, I'm looking for some specific puja items. Can you help?"
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick({ button_location: "products_bottom_cta" })}
          className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-whatsapp/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/40"
        >
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp Us
        </a>
      </div>
    </div>
  );
}
