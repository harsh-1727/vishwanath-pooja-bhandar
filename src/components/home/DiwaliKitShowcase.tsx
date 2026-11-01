"use client";

/**
 * src/components/home/DiwaliKitShowcase.tsx
 *
 * Diwali Poojan Kit video carousel section.
 * Displays one video at a time with prev/next controls, dot indicators,
 * poster images, and a per-kit WhatsApp enquiry link.
 *
 * The 20% OFF discount registration is now handled by DiwaliOfferPopup
 * (a separate popup component rendered at the page level).
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";

const videos = [
  {
    id: "51-items",
    title: "Diwali Poojan Kit",
    subtitle: "51 Items",
    src: "/videos/diwali-51-items.mp4",
    poster: "/images/kits/diwali-51-poster.jpg",
  },
  {
    id: "25-items",
    title: "Diwali Poojan Kit",
    subtitle: "25 Items",
    src: "/videos/diwali-25-items.mp4",
    poster: "/images/kits/diwali-25-poster.jpg",
  },
];

function DiwaliVideoCarousel() {
  const [active, setActive] = useState(0);
  const current = videos[active];

  const previous = () =>
    setActive((v) => (v - 1 + videos.length) % videos.length);
  const next = () => setActive((v) => (v + 1) % videos.length);

  if (!current) return null;

  return (
    <div className="relative mx-auto max-w-sm">
      {/* Video card */}
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-lg">
        {/* Video wrapper: portrait aspect */}
        <div className="relative aspect-[9/16] bg-ink">
          <video
            key={current.id}
            className="h-full w-full object-contain"
            controls
            playsInline
            preload="metadata"
            poster={current.poster}
          >
            <source src={current.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Item-count badge */}
          <span className="absolute left-3 top-3 rounded-full bg-maroon px-3 py-1 text-xs font-bold text-white shadow">
            {current.subtitle}
          </span>
        </div>

        {/* Card footer */}
        <div className="flex items-center justify-between gap-3 p-4">
          <div>
            <h3 className="font-display text-lg font-bold text-ink">
              {current.title}
            </h3>
            <p className="text-sm text-ink/55">
              {active + 1} of {videos.length} videos
            </p>
          </div>
          <a
            href={buildWhatsAppLink(
              `Namaste, I am interested in the Diwali Poojan Kit with ${current.subtitle}. Please share details.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-whatsapp px-3 py-2 text-xs font-bold text-white transition hover:bg-whatsapp/90"
          >
            <MessageCircle size={15} aria-hidden="true" /> Enquire
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={previous}
          aria-label="Previous Diwali kit video"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-saffron hover:text-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose video">
          {videos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              role="tab"
              onClick={() => setActive(index)}
              aria-label={`Show ${video.subtitle} video`}
              aria-selected={active === index}
              className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40 ${
                active === index ? "w-7 bg-saffron" : "w-2.5 bg-ink/20"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next Diwali kit video"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-saffron hover:text-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export function DiwaliKitShowcase() {
  return (
    <section className="bg-cream/35 py-14" aria-labelledby="diwali-kits-heading">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">
            Festival Collection
          </p>
          <h2
            id="diwali-kits-heading"
            className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl"
          >
            Diwali Poojan Kits
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            See our 51-item and 25-item Diwali kit options — everything you
            need for a complete puja.
          </p>
        </div>

        <DiwaliVideoCarousel />
      </div>
    </section>
  );
}
