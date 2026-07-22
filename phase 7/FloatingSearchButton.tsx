"use client";

/**
 * src/components/search/FloatingSearchButton.tsx
 *
 * Fills feature.config.ts's `floatingSearch` flag, which Phase 4
 * (Layout) couldn't build yet — the Search System it depends on
 * didn't exist until this phase. Opens SearchBar inside the shared
 * Modal primitive rather than a bespoke overlay.
 *
 * Positioning is deliberately different on mobile vs. desktop: on
 * mobile, FloatingCall already occupies the slot next to FloatingWhatsApp
 * (see FloatingCall.tsx, hidden at sm: and above), so Search stacks
 * ABOVE WhatsApp there. On desktop, Call is hidden, freeing that
 * horizontal slot for Search instead. Getting this wrong would mean
 * two floating buttons overlapping at one breakpoint or the other —
 * worth stating explicitly since it's not obvious from either file
 * alone.
 */

import { useState } from "react";
import { Search } from "lucide-react";
import { Modal } from "@/components/ui";
import { SearchBar } from "./SearchBar";
import { featureConfig } from "@/config";

export function FloatingSearchButton() {
  const [open, setOpen] = useState(false);

  if (!featureConfig.floatingSearch) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search products"
        className="fixed bottom-[4.75rem] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-ink/10 bg-base text-ink shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40 focus-visible:ring-offset-2 sm:bottom-5 sm:right-[4.75rem]"
      >
        <Search size={22} aria-hidden="true" />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Search">
        <SearchBar autoFocus onNavigate={() => setOpen(false)} />
      </Modal>
    </>
  );
}
