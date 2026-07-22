/**
 * src/components/layout/FloatingCall.tsx
 *
 * Mobile-priority per PROJECT_MASTER.md — shown alongside WhatsApp on
 * mobile where a tel: link actually places a call. Hidden at `sm:`
 * breakpoints and above, since desktop visitors can't tap-to-dial and
 * a second floating button there is just visual noise; desktop users
 * still reach the phone number via the Header, Footer, and Contact
 * page. Server Component — no interactivity required.
 */

import { Phone } from "lucide-react";
import { buildTelLink } from "@/lib/utils/contact-links";

export function FloatingCall() {
  return (
    <a
      href={buildTelLink()}
      aria-label="Call us"
      className="fixed bottom-5 right-[4.75rem] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-saffron text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/50 focus-visible:ring-offset-2 sm:hidden"
    >
      <Phone size={24} aria-hidden="true" />
    </a>
  );
}
