"use client";

/**
 * src/components/layout/Header.tsx
 *
 * "use client" is required here (owns mobileOpen state for the menu
 * toggle) — but Logo, nav links, and the desktop CTAs are all cheap,
 * mostly-static markup, so the client cost is limited to one small
 * piece of state plus the Modal it opens (MobileNav), not the whole
 * header tree.
 */

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, MessageCircle } from "lucide-react";
import { Logo } from "@/components/shared";
import { Button } from "@/components/ui";
import { MobileNav } from "./MobileNav";
import { navigationConfig, businessConfig } from "@/config";
import { buildWhatsAppLink, buildTelLink } from "@/lib/utils/contact-links";
import { trackWhatsAppClick, trackPhoneCall } from "@/lib/analytics";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-base/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-3 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navigationConfig.main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm font-body text-sm font-medium text-ink/80 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            href={buildWhatsAppLink(
              `Hi ${businessConfig.name}, I'd like to ask about a puja kit.`
            )}
            external
            target="_blank"
            variant="whatsapp"
            size="sm"
            onClick={() => trackWhatsAppClick({ button_location: "header" })}
            iconStart={<MessageCircle size={16} aria-hidden="true" />}
          >
            WhatsApp
          </Button>
          <Button
            href={buildTelLink()}
            external
            variant="outline"
            size="sm"
            onClick={() => trackPhoneCall({ button_location: "header" })}
            iconStart={<Phone size={16} aria-hidden="true" />}
          >
            Call
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="rounded-md p-2 text-ink hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40 lg:hidden"
        >
          <Menu size={24} aria-hidden="true" />
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
