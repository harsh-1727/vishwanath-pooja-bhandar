"use client";

/**
 * src/components/layout/MobileNav.tsx
 *
 * Dedicated mobile navigation slide-over overlay drawer.
 * Rendered via React portal directly onto document.body so it is never
 * trapped inside the header's stacking context (which creates a new
 * compositing layer via `backdrop-blur`). This guarantees the backdrop
 * and drawer always sit above every other element, regardless of any
 * z-index set on ancestor elements.
 *
 * z-index strategy:
 *  z-[200]  – dark backdrop (blocks all underlying interaction)
 *  z-[201]  – drawer panel itself (sits above the backdrop)
 *
 * Body scroll is locked via both `overflow: hidden` and the
 * `data-drawer-open` attribute (consumed by globals.css).
 */

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  X,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Home,
  ShoppingBag,
  Calendar,
  Compass,
  Image as GalleryIcon,
  HelpCircle,
} from "lucide-react";
import { Logo } from "@/components/shared";
import { Button } from "@/components/ui";
import { navigationConfig, businessConfig, contactConfig } from "@/config";
import { buildWhatsAppLink, buildTelLink } from "@/lib/utils/contact-links";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const NAV_ICONS: Record<string, React.ReactNode> = {
  "/": <Home size={18} />,
  "/products": <ShoppingBag size={18} />,
  "/festivals": <Calendar size={18} />,
  "/gallery": <GalleryIcon size={18} />,
  "/about": <Compass size={18} />,
  "/faq": <HelpCircle size={18} />,
  "/contact": <MapPin size={18} />,
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

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

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  // Portal to document.body so it is never clipped by the header's
  // stacking context (backdrop-blur creates a new compositing layer).
  return createPortal(
    <>
      {/* Dark Backdrop — blocks clicks on everything beneath the drawer */}
      <div
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Slide-over Mobile Navigation Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className="fixed inset-y-0 right-0 z-[201] flex w-[85vw] max-w-xs flex-col bg-base shadow-2xl sm:max-w-sm"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-ink/10 bg-cream/50 px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-ink/70 hover:bg-ink/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav aria-label="Mobile Navigation">
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-saffron">
              Navigation
            </p>
            <ul className="flex flex-col gap-1">
              {navigationConfig.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 font-body text-base font-medium text-ink transition-colors hover:bg-saffron/10 hover:text-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
                  >
                    <span className="text-saffron">
                      {NAV_ICONS[item.href] || <Compass size={18} />}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Contact & Info */}
          <div className="mt-6 border-t border-ink/10 pt-6">
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-saffron">
              Store &amp; Orders
            </p>
            <div className="flex flex-col gap-3">
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
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-ink/10 bg-cream/40 px-5 py-4 text-xs text-ink/70">
          <div className="flex items-start gap-2">
            <MapPin size={14} className="mt-0.5 shrink-0 text-saffron" />
            <p>
              {contactConfig.address.line1}, {contactConfig.address.locality},{" "}
              {contactConfig.address.city}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2 text-ink/60">
            <Clock size={14} className="shrink-0 text-saffron" />
            <p>Open Today: 9:00 AM – 9:00 PM</p>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
