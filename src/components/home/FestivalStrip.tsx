"use client";
/**
 * src/components/home/FestivalStrip.tsx
 *
 * Festival calendar strip with actual Indian festival images.
 */

import Link from "next/link";
import Image from "next/image";
import { festivalConfig } from "@/config";
import { ArrowRight } from "lucide-react";

const FESTIVAL_IMAGES: Record<string, string> = {
  diwali: "/images/festivals/diwali.webp",
  navratri: "/images/festivals/navratri.webp",
  "ganesh-chaturthi": "/images/festivals/ganesh.webp",
  holi: "/images/festivals/holi.webp",
  janmashtami: "/images/festivals/janmashtami.webp",
  mahashivratri: "/images/festivals/mahashivratri.png",
  "karva-chauth": "/images/festivals/karwa-chauth.png",
  rakshabandhan: "/images/festivals/rakshabandhan.png",
  "hariyali-teej": "/images/festivals/hariyali-teej.png",
};

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

export function FestivalStrip() {
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-saffron uppercase tracking-widest">त्योहार</p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl text-ink font-bold">
              Festival Calendar
            </h2>
            <p className="mt-1 text-sm text-ink/60">
              Get ready ahead of time — samagri for every major Hindu festival.
            </p>
          </div>
          <Link
            href="/festivals"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-saffron hover:underline"
          >
            All festivals <ArrowRight size={14} />
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
          {festivalConfig.slice(0, 8).map((festival) => {
            const img = FESTIVAL_IMAGES[festival.slug] ?? "/images/festivals/generic-fest.webp";
            return (
              <Link
                key={festival.slug}
                href={`/products/festival-kits?festival=${festival.slug}`}
                className="group shrink-0 w-48 sm:w-auto rounded-card overflow-hidden border border-ink/8 bg-white shadow-sm hover:shadow-md transition-all"
              >
                {/* Festival image */}
                <div className="relative w-full overflow-hidden" style={{ paddingTop: "65%" }}>
                  <Image
                    src={img}
                    alt={festival.nameEnglish}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 192px, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Festival name on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-devanagari text-xs text-white/90">{festival.nameHindi}</p>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-3">
                  <p className="text-xs font-semibold text-saffron">
                    {monthRangeLabel(festival.typicalMonths)}
                  </p>
                  <h3 className="mt-0.5 font-display text-sm font-bold text-ink">
                    {festival.nameEnglish}
                  </h3>
                  <p className="mt-1 text-xs text-ink/60 line-clamp-2 leading-relaxed">
                    {festival.shortDescription}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/festivals"
            className="inline-flex items-center gap-1 text-sm font-medium text-saffron hover:underline"
          >
            All festivals <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
