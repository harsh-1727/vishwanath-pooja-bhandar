import type { Metadata } from "next";
import { Search as SearchIcon, MessageCircle } from "lucide-react";
import {
  Hero,
  CategoryGrid,
  FestivalStrip,
  FeaturedProducts,
  PanchangStrip,
  AboutTeaser,
  TrustStrip,
  ContactBlock,
  DiwaliKitShowcase,
  DiwaliOfferPopup,
} from "@/components/home";
import { Card, Button } from "@/components/ui";
import { businessConfig } from "@/config";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";

export const metadata: Metadata = {
  description: businessConfig.description,
};

/**
 * Homepage section order (updated for Diwali promotion):
 *
 *  Hero → TrustStrip → Panchang → DiwaliKitShowcase (immediately after
 *  Panchang for festive prominence) → CategoryGrid → FeaturedProducts →
 *  FestivalStrip → FindMyKitBanner → AboutTeaser → ContactBlock
 *
 *  DiwaliOfferPopup is a client-side portal that auto-shows after 1.8s
 *  and lives outside the normal document flow.
 */
function FindMyKitBanner() {
  return (
    <section className="mx-auto max-w-content px-4 sm:px-6">
      <Card className="flex flex-col items-start gap-4 bg-saffron/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron/15 text-saffron">
            <SearchIcon size={18} aria-hidden="true" />
          </div>
          <div>
            <p className="font-display text-lg text-ink">
              Not sure which kit you need?
            </p>
            <p className="mt-1 text-sm text-ink/60">
              Tell us the occasion and we&apos;ll help you find the right one.
            </p>
          </div>
        </div>
        <Button
          href={buildWhatsAppLink(
            `Hi ${businessConfig.name}, I'm not sure which puja kit I need. Can you help?`
          )}
          external
          target="_blank"
          variant="whatsapp"
          size="sm"
          iconStart={<MessageCircle size={16} aria-hidden="true" />}
          className="shrink-0"
        >
          Ask on WhatsApp
        </Button>
      </Card>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Festive popup — auto-shows after 1.8 s; portal-rendered */}
      <DiwaliOfferPopup />

      <Hero />
      <TrustStrip />
      <PanchangStrip />

      {/* Diwali kits immediately after Panchang for festive prominence */}
      <DiwaliKitShowcase />

      <CategoryGrid />
      <FeaturedProducts />
      <FestivalStrip />
      <FindMyKitBanner />
      <AboutTeaser />
      <ContactBlock />
    </>
  );
}
