"use client";

/**
 * src/components/layout/MobileNav.tsx
 *
 * Full-screen mobile navigation — behaves like navigating to a new page.
 *
 * Critical implementation notes:
 *  - The container uses INLINE STYLES for all positioning and background
 *    properties so they cannot be silently dropped by Tailwind's purging
 *    or overridden by theme CSS variables. `bg-base` was the previous bug
 *    (not a defined Tailwind color → transparent panel). Never use a
 *    Tailwind class for the background of this container.
 *  - No backdrop, no blur, no overlay, no opacity layer.
 *    The previous page is 100% invisible when this menu is open.
 *  - Portal-mounted onto document.body so it is never trapped inside the
 *    header's stacking context (which creates a new compositing layer
 *    via `backdrop-blur`).
 *
 * Layout (top → bottom):
 *   1. Fixed top bar: [✕ close] | [store name] | [🔍 search]
 *   2. Scrollable nav links: Home, Products, Festivals, Gallery, About, FAQ, Contact
 *   3. Pinned bottom section: WhatsApp, Call, Address, Hours, Social (if configured)
 *
 * CSS variables used (defined in theme.config.ts → injected via layout.tsx):
 *   --color-saffron : 232 147 74
 *   --color-ink     : 58 42 30
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, Search, MessageCircle, Phone, MapPin, Clock } from "lucide-react";
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
       * ─── FULL-SCREEN PANEL ───────────────────────────────────────────
       *
       * ALL critical layout/background properties use inline styles to
       * guarantee they are applied regardless of Tailwind purging or CSS
       * variable resolution. The background MUST be solid — see bug note
       * above. Do not move any of these to a Tailwind class.
       *
       * The panel itself is the only element (no separate backdrop div).
       * `inset-0` on a fixed element already covers 100vw × 100dvh.
       */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100dvh",
          backgroundColor: "#ffffff",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          overflowY: "hidden", // outer container doesn't scroll; inner nav area does
        }}
      >
        {/* ── TOP BAR ───────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderBottom: "1px solid rgba(58, 42, 30, 0.1)",
            padding: "12px 16px",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Close (✕) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "#3A2A1E",
              flexShrink: 0,
            }}
          >
            <X size={24} aria-hidden="true" />
          </button>

          {/* Store name — centred */}
          <Link
            href="/"
            onClick={onClose}
            aria-label={businessConfig.name}
            style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(14px, 3.5vw, 17px)",
              fontWeight: 600,
              color: "#3A2A1E",
              textDecoration: "none",
              textAlign: "center",
              lineHeight: 1.25,
              flex: 1,
              padding: "0 8px",
            }}
          >
            {businessConfig.name}
          </Link>

          {/* Search (🔍) */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search products"
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "#3A2A1E",
              flexShrink: 0,
            }}
          >
            <Search size={22} aria-hidden="true" />
          </button>
        </div>

        {/* ── NAVIGATION LINKS ──────────────────────────────────────── */}
        <nav
          aria-label="Mobile Navigation"
          style={{
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "8px 0",
            backgroundColor: "#ffffff",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "0 20px",
            }}
          >
            {navigationConfig.main.map((item) => (
              <li
                key={item.href}
                style={{ borderBottom: "1px solid rgba(58, 42, 30, 0.08)" }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: 56,
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#111111",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── BOTTOM SECTION ────────────────────────────────────────── */}
        <div
          style={{
            flexShrink: 0,
            borderTop: "1px solid rgba(58, 42, 30, 0.1)",
            backgroundColor: "#f7f1e6",
            padding: "20px 20px 28px",
          }}
        >
          {/* CTA Buttons */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
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
          <div
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 12,
              color: "rgba(58, 42, 30, 0.6)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <MapPin
                size={13}
                style={{ marginTop: 1, flexShrink: 0, color: "rgb(232 147 74)" }}
              />
              <span>
                {contactConfig.address.line1},{" "}
                {contactConfig.address.locality},{" "}
                {contactConfig.address.city}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Clock
                size={13}
                style={{ flexShrink: 0, color: "rgb(232 147 74)" }}
              />
              <span>Open daily 9:00 AM – 10:30 PM</span>
            </div>
          </div>

          {/* Social links — only when configured */}
          {navigationConfig.socialLinks.length > 0 && (
            <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
              {navigationConfig.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  style={{
                    fontSize: 13,
                    textTransform: "capitalize",
                    color: "rgba(58, 42, 30, 0.5)",
                    textDecoration: "none",
                  }}
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── SEARCH MODAL ─────────────────────────────────────────────── */}
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
