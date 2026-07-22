"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { festivalConfig, businessConfig } from "@/config";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";
import { Button } from "@/components/ui";
import { MessageCircle, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

function monthRangeLabel(months: number[]): string {
  const labels = months
    .map((m) => MONTH_NAMES[m - 1])
    .filter((label): label is NonNullable<typeof label> => Boolean(label));
  if (labels.length === 0) return "";
  if (labels.length === 1) return `Usually ${labels[0]}`;
  return `Usually ${labels[0]}\u2013${labels[labels.length - 1]}`;
}

interface CelebrationSlide {
  image: string;
  caption: string;
  subcaption: string;
}

const celebrationSlides: CelebrationSlide[] = [
  {
    image: "/images/festivals/diwali.webp",
    caption: "Lighting Diyas at Home",
    subcaption: "Bringing warmth, light, and auspicious energy into the household.",
  },
  {
    image: "/images/festivals/karwa-chauth.png",
    caption: "Karwa Chauth Celebrations",
    subcaption: "Beautifully handcrafted thali, chalni, and clay diya for the sacred ritual.",
  },
  {
    image: "/images/gallery/decorative-garlands.png",
    caption: "Grand Altar and Temple Decoration",
    subcaption: "Adorning deity platforms with fresh garlands, flowers, and holy colors.",
  },
  {
    image: "/images/gallery/store-malas.png",
    caption: "Festive Joy & Traditional Malas",
    subcaption: "Authentic religious garlands and puja threads from our wholesale store.",
  },
];

export default function FestivalsPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % celebrationSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + celebrationSlides.length) % celebrationSlides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % celebrationSlides.length);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Full-width Top Slider */}
      <section 
        className="relative h-[300px] w-full overflow-hidden bg-maroon sm:h-[400px] md:h-[450px]"
        aria-label="Festival Celebrations Gallery"
      >
        <div className="relative h-full w-full">
          {celebrationSlides.map((slide, index) => {
            const isActive = index === current;
            return (
              <div
                key={index}
                className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.caption}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/40 to-black/30" />
                
                {/* Content */}
                <div className="absolute bottom-10 left-0 right-0 z-20 text-center text-white px-4">
                  <h2 className="font-display text-2xl font-bold tracking-wide text-gold sm:text-3xl md:text-4xl drop-shadow-md">
                    {slide.caption}
                  </h2>
                  <p className="mt-2 text-sm text-cream/90 max-w-xl mx-auto drop-shadow-sm sm:text-base">
                    {slide.subcaption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 focus-visible:outline-none"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 focus-visible:outline-none"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron uppercase">
            <Calendar size={12} />
            Hindu Lunar Calendar
          </span>
          <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Festival Calendar &amp; Puja Kits
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
            Find the essential puja samagri for every major Hindu festival. 
            All festival kits are completely hand-assembled at our store in West Patel Nagar with the purest, highest-quality ingredients.
          </p>
          <p className="mt-2 text-xs text-ink/40 italic">
            Note: Dates shift annually with the lunar calendar. Contact us on WhatsApp for exact confirmed dates for the current year.
          </p>
        </div>

        {/* Festival Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {festivalConfig.map((festival) => (
            <div
              key={festival.slug}
              className="group flex flex-col justify-between rounded-card border border-ink/10 bg-base p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {monthRangeLabel(festival.typicalMonths)}
                </p>
                <h2 className="mt-2 font-display text-2xl text-ink group-hover:text-saffron transition-colors duration-200">
                  {festival.nameEnglish}
                </h2>
                <p className="mt-0.5 font-devanagari text-base text-ink/40">
                  {festival.nameHindi}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {festival.shortDescription}
                </p>
              </div>
              <div className="mt-6 border-t border-ink/5 pt-4">
                <Link
                  href={`/products/festival-kits`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-saffron hover:underline focus-visible:outline-none"
                >
                  Shop Festival Samagri &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Banner */}
        <div className="mt-16 rounded-card border border-gold/30 bg-cream p-8 text-center max-w-4xl mx-auto shadow-sm">
          <h2 className="font-display text-2xl text-ink">
            Looking for Samagri for another Festival?
          </h2>
          <p className="mt-3 text-sm text-ink/60 max-w-xl mx-auto">
            We supply custom puja kits and loose samagri for any traditional ritual, vrat, or festival. Get in touch for customized guidance.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              href={buildWhatsAppLink(
                `Hi ${businessConfig.name}, I need samagri for an upcoming festival not listed in the calendar. Can you help?`
              )}
              external
              target="_blank"
              variant="whatsapp"
              iconStart={<MessageCircle size={18} aria-hidden="true" />}
            >
              Ask on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
