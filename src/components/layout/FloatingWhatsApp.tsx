"use client";

/**
 * src/components/layout/FloatingWhatsApp.tsx
 *
 * Persistent on every page per PROJECT_MASTER.md's feature list.
 * Anchor to a wa.me deep link with click event tracking for Google Analytics.
 */

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";
import { businessConfig } from "@/config";
import { trackWhatsAppClick } from "@/lib/analytics";

export function FloatingWhatsApp() {
  const href = buildWhatsAppLink(
    `Hi ${businessConfig.name}, I'd like to ask about a puja kit.`
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => trackWhatsAppClick({ button_location: "floating" })}
      className="floating-fab fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/50 focus-visible:ring-offset-2"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
