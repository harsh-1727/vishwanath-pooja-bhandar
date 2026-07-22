"use client";

/**
 * src/components/layout/MobileNav.tsx
 *
 * Reuses the accessible Modal primitive (focus trap, Escape-to-close,
 * focus restoration on close) rather than re-implementing dialog
 * semantics for the mobile menu — one correct, tested a11y
 * implementation powering two different UI surfaces.
 */

import Link from "next/link";
import { Modal, Button } from "@/components/ui";
import { navigationConfig, businessConfig } from "@/config";
import { buildWhatsAppLink, buildTelLink } from "@/lib/utils/contact-links";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <Modal open={open} onClose={onClose} title="Menu">
      <nav aria-label="Mobile">
        <ul className="flex flex-col gap-1">
          {navigationConfig.main.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block rounded-md px-3 py-3 font-body text-base text-ink hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-6">
        <Button
          href={buildWhatsAppLink(
            `Hi ${businessConfig.name}, I'd like to ask about a puja kit.`
          )}
          external
          target="_blank"
          variant="whatsapp"
          fullWidth
        >
          Message on WhatsApp
        </Button>
        <Button href={buildTelLink()} external variant="outline" fullWidth>
          Call Now
        </Button>
      </div>
    </Modal>
  );
}
