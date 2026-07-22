/**
 * src/components/home/Hero.tsx
 *
 * No real shop/product photography exists yet (see OWNER_GUIDE.md),
 * so the hero uses an original decorative SVG motif instead of a
 * stock photo standing in for "the shop" — consistent with
 * PROJECT_RULES.md rule 4 (decorative art is fine; implying it's a
 * real photo is not). The motif is a simple line-art diya, kept
 * restrained per BRAND_GUIDELINES.md's "premium minimal, not busy"
 * direction.
 */

import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { businessConfig } from "@/config";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";

function DecorativeDiya() {
  return (
    <svg
      viewBox="0 0 320 320"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="160"
        cy="160"
        r="150"
        fill="none"
        stroke="rgb(var(--color-gold))"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <path
        d="M90 190 Q160 240 230 190 Q220 230 160 235 Q100 230 90 190 Z"
        fill="rgb(var(--color-saffron))"
        fillOpacity="0.15"
        stroke="rgb(var(--color-gold))"
        strokeWidth="2"
      />
      <path
        d="M160 190 C150 160 155 130 160 110 C165 130 170 160 160 190 Z"
        fill="rgb(var(--color-saffron))"
        fillOpacity="0.55"
      />
      <path
        d="M160 150 C155 130 158 115 160 105 C162 115 165 130 160 150 Z"
        fill="rgb(var(--color-gold))"
      />
    </svg>
  );
}

export function Hero() {
  const whatsappHref = buildWhatsAppLink(
    `Hi ${businessConfig.name}, I'd like to ask about a puja kit.`
  );

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full border border-gold/40 bg-base px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold">
            {businessConfig.yearsInBusiness} in West Patel Nagar, Delhi
          </p>

          <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            {businessConfig.tagline}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
            {businessConfig.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={whatsappHref}
              external
              target="_blank"
              variant="whatsapp"
              size="lg"
              iconStart={<MessageCircle size={20} aria-hidden="true" />}
            >
              Message on WhatsApp
            </Button>
            <Button
              href="/products"
              variant="outline"
              size="lg"
              iconEnd={<ArrowRight size={18} aria-hidden="true" />}
            >
              Browse Puja Kits
            </Button>
          </div>
        </div>

        <div className="mx-auto h-56 w-56 sm:h-72 sm:w-72 lg:ml-auto lg:h-80 lg:w-80">
          <DecorativeDiya />
        </div>
      </div>
    </section>
  );
}
