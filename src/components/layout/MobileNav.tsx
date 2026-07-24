"use client";

/**
 * src/components/layout/MobileNav.tsx
 *
 * Full-screen slide-in mobile menu.
 *
 * Design:
 *  - Covers 100vw × 100dvh with a solid cream/white background.
 *    The page behind is never visible — no backdrop, no blur.
 *  - Slides in from the right edge (translateX 100% → 0) in 280 ms.
 *  - Top bar: close button | logo text | search icon
 *  - Body: plain text nav links with generous tap targets (min 48px)
 *  - Footer: WhatsApp + Call CTAs, then address and store hours
 *
 * Portal:
 *  Rendered via ReactDOM.createPortal onto document.body so it is
 *  never trapped inside the header's stacking context, which creates
 *  a new compositing layer via `backdrop-blur`.
 *
 * z-index:
 *  z-[200]  – the full-screen panel (only element; no separate backdrop)
 *
 * Scroll lock:
 *  Both `overflow: hidden` on body and the `data-drawer-open` attribute
 *  are set (globals.css hides all `.floating-fab` elements via that attr).
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  X,
  Search,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { Modal } from "@/components/ui";
import { SearchBar } from "@/components/search/SearchBar";
import { Button } from "@/components/ui";
import { navigationConfig, businessConfig, contactConfig } from "@/config";
import { buildWhatsAppLink, buildTelLink } from "@/lib/utils/contact-links";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Lock / unlock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-drawer-open", "true");
    } else {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-drawer-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-drawer-open");
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <>
      {/*
       * Full-screen panel — covers 100% of the viewport.
       * `bg-base` (solid white/cream from theme) + `inset-0` ensures
       * the page behind is completely hidden.
       * `animate-mobile-menu-in` slides the panel from right → center.
       */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className="fixed inset-0 z-[200] flex flex-col bg-base animate-mobile-menu-in"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* ── Top Bar ─────────────────────────────────────────────── */}
        <div className="flex shrink-0 items-center justify-between border-b border-ink/10 px-4 py-3.5">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink/70 hover:bg-ink/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
          >
            <X size={24} aria-hidden="true" />
          </button>

          {/* Store name — centred */}
          <Link
            href="/"
            onClick={onClose}
            aria-label={businessConfig.name}
            className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg"
          >
            {businessConfig.name}
          </Link>

          {/* Search icon */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search products"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink/70 hover:bg-ink/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
          >
            <Search size={22} aria-hidden="true" />
          </button>
        </div>

        {/* ── Navigation Links ─────────────────────────────────────── */}
        <nav
          aria-label="Mobile Navigation"
          className="flex-1 overflow-y-auto px-5 py-4"
        >
          <ul className="flex flex-col divide-y divide-ink/10">
            {navigationConfig.main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-[52px] items-center font-body text-[17px] font-medium text-ink transition-colors duration-150 hover:text-saffron focus-visible:outline-none focus-visible:text-saffron"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Bottom Section ────────────────────────────────────────── */}
        <div className="shrink-0 border-t border-ink/10 bg-surface px-5 pb-6 pt-5">
          {/* CTA Buttons */}
          <div className="flex flex-col gap-2.5">
            <Button
              href={buildWhatsAppLink(
                `Hi ${businessConfig.name}, I'd like to ask about a puja kit.`
              )}
              external
              target="_blank"
              variant="whatsapp"
              fullWidth
              iconStart={<MessageCircle size={18} aria-hidden="true" />}
            >
              WhatsApp Us
            </Button>
            <Button
              href={buildTelLink()}
              external
              variant="outline"
              fullWidth
              iconStart={<Phone size={18} aria-hidden="true" />}
            >
              Call Store Now
            </Button>
          </div>

          {/* Address + Hours */}
          <div className="mt-4 flex flex-col gap-1.5 text-xs text-ink/60">
            <div className="flex items-start gap-2">
              <MapPin size={13} className="mt-0.5 shrink-0 text-saffron" />
              <span>
                {contactConfig.address.line1},{" "}
                {contactConfig.address.locality},{" "}
                {contactConfig.address.city}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={13} className="shrink-0 text-saffron" />
              <span>Open daily 9:00 AM – 10:30 PM</span>
            </div>
          </div>

          {/* Social links — rendered only when configured */}
          {navigationConfig.socialLinks.length > 0 && (
            <div className="mt-4 flex gap-4">
              {navigationConfig.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="text-sm capitalize text-ink/50 hover:text-saffron focus-visible:outline-none"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Search Modal (triggered from top bar icon) ─────────────── */}
      <Modal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        title="Search"
      >
        <SearchBar
          autoFocus
          onNavigate={() => {
            setSearchOpen(false);
            onClose();
          }}
        />
      </Modal>
    </>,
    document.body
  );
}
