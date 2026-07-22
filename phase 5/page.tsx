import type { Metadata } from "next";
import { Search as SearchIcon, MessageCircle } from "lucide-react";
import {
  Hero,
  CategoryGrid,
  FestivalStrip,
  AboutTeaser,
  TrustStrip,
  ContactBlock,
} from "@/components/home";
import { Card, Button } from "@/components/ui";
import { businessConfig } from "@/config";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";

export const metadata: Metadata = {
  description: businessConfig.description,
};

/**
 * Section order follows PROJECT_MASTER.md §5 Page Structure exactly:
 * Hero → Category grid → Festival Calendar strip → Find My Puja Kit
 * entry point → About teaser → Trust section → Map + contact block.
 *
 * The "Find My Puja Kit" entry is inline here rather than its own
 * component file — Phase 5's scope is the homepage shell; the actual
 * guided wizard behind /find-my-puja-kit is a Phase 7 (Search System)
 * feature. This banner is just the promotional entry point PROJECT_
 * MASTER.md's homepage structure calls for, with WhatsApp as a fully
 * working fallback until that route exists.
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
      <Hero />
      <CategoryGrid />
      <FestivalStrip />
      <FindMyKitBanner />
      <AboutTeaser />
      <TrustStrip />
      <ContactBlock />
    </>
  );
}
