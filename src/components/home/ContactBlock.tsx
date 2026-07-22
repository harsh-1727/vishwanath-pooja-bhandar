/**
 * src/components/home/ContactBlock.tsx
 *
 * contactConfig.mapEmbedUrl is null (no Google Maps listing shared
 * yet — see OWNER_GUIDE.md Q8), so this renders an address +
 * "Get Directions" search-URL fallback instead of an empty iframe.
 * The full dedicated MapEmbed component with proper architecture for
 * swapping in a real embed lands in Phase 11 (Contact) — this block
 * only needs a lightweight version for the homepage.
 */

import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { businessConfig, contactConfig } from "@/config";
import { formatWeeklyHours } from "@/lib/utils/format-hours";
import { buildWhatsAppLink, buildTelLink } from "@/lib/utils/contact-links";

export function ContactBlock() {
  const { address } = contactConfig;
  const fullAddress = `${address.line1}, ${address.locality}, ${address.city}`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${businessConfig.name}, ${fullAddress}`
  )}`;

  return (
    <section className="mx-auto max-w-content px-4 py-14 sm:px-6">
      <div className="grid gap-8 rounded-card border border-ink/10 bg-cream p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Visit or Message Us
          </h2>
          <p className="mt-2 text-sm text-ink/60 sm:text-base">
            Walk in, call, or message us on WhatsApp — whatever&apos;s
            easiest for you.
          </p>

          <dl className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <dt className="sr-only">Address</dt>
                <dd className="text-sm text-ink/80">{fullAddress}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <dt className="sr-only">Hours</dt>
                <dd className="text-sm text-ink/80">
                  {formatWeeklyHours(contactConfig.hours)}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <dt className="sr-only">Phone</dt>
                <dd className="text-sm text-ink/80">{contactConfig.phone}</dd>
              </div>
            </div>
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              href={buildWhatsAppLink(
                `Hi ${businessConfig.name}, I'd like to ask about a puja kit.`
              )}
              external
              target="_blank"
              variant="whatsapp"
              iconStart={<MessageCircle size={18} aria-hidden="true" />}
            >
              WhatsApp Us
            </Button>
            <Button href={buildTelLink()} external variant="outline">
              Call Now
            </Button>
          </div>
        </div>

        {/* Map embed pending — see contact.config.ts mapEmbedUrl and
            OWNER_GUIDE.md Q8. "Get Directions" gives full functional
            value in the meantime without a broken/empty iframe. */}
        <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-ink/15 bg-base p-8 text-center">
          <MapPin size={28} className="text-gold" aria-hidden="true" />
          <p className="mt-3 text-sm text-ink/60">
            Map preview will appear here once available.
          </p>
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-sm font-medium text-saffron hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40 rounded-sm"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
