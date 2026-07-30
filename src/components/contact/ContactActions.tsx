"use client";

/**
 * src/components/contact/ContactActions.tsx
 *
 * Interactive WhatsApp and Phone Call CTA buttons for the Contact page
 * with built-in analytics event tracking.
 */

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui";
import { buildWhatsAppLink, buildTelLink } from "@/lib/utils/contact-links";
import { businessConfig } from "@/config";
import { trackWhatsAppClick, trackPhoneCall } from "@/lib/analytics";

export function ContactActions() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button
        href={buildWhatsAppLink(
          `Hi ${businessConfig.name}, I'd like to get in touch.`
        )}
        external
        target="_blank"
        variant="whatsapp"
        onClick={() => trackWhatsAppClick({ button_location: "contact_page" })}
        iconStart={<MessageCircle size={18} aria-hidden="true" />}
      >
        WhatsApp Us
      </Button>
      <Button
        href={buildTelLink()}
        external
        variant="outline"
        onClick={() => trackPhoneCall({ button_location: "contact_page" })}
        iconStart={<Phone size={16} aria-hidden="true" />}
      >
        Call Now
      </Button>
    </div>
  );
}
