"use client";

/**
 * src/components/ui/Carousel.tsx
 *
 * Powers RelatedProducts, FrequentlyBoughtTogether, and Gallery strips.
 * Deliberately built on native CSS scroll-snap + scrollBy rather than
 * an external carousel library — this is a JS-bundle-size decision
 * (PROJECT_MASTER.md §13): a horizontal scroller with two buttons
 * doesn't need a 20kb dependency. Touch/trackpad swipe works for free
 * via native scrolling; the buttons are the keyboard/mouse affordance.
 */

import { useRef } from "react";
import type * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  /** Accessible label for the carousel region, e.g. "Related products". */
  label: string;
}

export function Carousel({ children, className, label }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8 * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className={cn("relative", className)} role="region" aria-label={label}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between sm:flex">
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          aria-label={`Scroll ${label} left`}
          className="pointer-events-auto -translate-x-1/2 rounded-full border border-ink/10 bg-base p-2 text-ink shadow-md hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          aria-label={`Scroll ${label} right`}
          className="pointer-events-auto translate-x-1/2 rounded-full border border-ink/10 bg-base p-2 text-ink shadow-md hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/** Wrap each carousel child in this so scroll-snap alignment is consistent everywhere it's used. */
export function CarouselItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("shrink-0 snap-start", className)}>{children}</div>
  );
}
