"use client";

/**
 * src/components/layout/FloatingCall.tsx
 *
 * Mobile-priority floating call button with event tracking for analytics.
 */

import { Phone } from "lucide-react";
import { buildTelLink } from "@/lib/utils/contact-links";
import { trackPhoneCall } from "@/lib/analytics";

export function FloatingCall() {
  return (
    <a
      href={buildTelLink()}
      aria-label="Call us"
      onClick={() => trackPhoneCall({ button_location: "floating" })}
      className="floating-fab fixed bottom-5 right-[4.75rem] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-saffron text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/50 focus-visible:ring-offset-2 sm:hidden"
    >
      <Phone size={24} aria-hidden="true" />
    </a>
  );
}
