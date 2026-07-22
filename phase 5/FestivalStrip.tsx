/**
 * src/components/home/FestivalStrip.tsx
 *
 * Deliberately displays "Usually [Month]" rather than a specific date
 * — see config/festival.config.ts's comment on why exact dates aren't
 * hardcoded (most follow the lunar calendar and shift yearly; a wrong
 * hardcoded date is worse than a vague-but-true one). Phase 10's
 * FestivalCalendar component is where real, annually-verified dates
 * get added from a proper source.
 */

import Link from "next/link";
import { Carousel, CarouselItem, Card, CardTitle } from "@/components/ui";
import { festivalConfig } from "@/config";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

function monthRangeLabel(months: number[]): string {
  const labels = months
    .map((m) => MONTH_NAMES[m - 1])
    .filter((label): label is string => Boolean(label));
  if (labels.length === 0) return "";
  if (labels.length === 1) return `Usually ${labels[0]}`;
  return `Usually ${labels[0]}\u2013${labels[labels.length - 1]}`;
}

export function FestivalStrip() {
  return (
    <section className="bg-cream/60 py-14">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Festival Calendar
            </h2>
            <p className="mt-2 text-sm text-ink/60 sm:text-base">
              Get ready ahead of time — samagri for every major festival.
            </p>
          </div>
          <Link
            href="/festivals"
            className="hidden shrink-0 text-sm font-medium text-saffron hover:underline sm:block"
          >
            View all
          </Link>
        </div>

        <Carousel label="Upcoming festivals">
          {festivalConfig.map((festival) => (
            <CarouselItem key={festival.slug} className="w-64">
              <Link href={`/festivals/${festival.slug}`}>
                <Card interactive className="h-full">
                  <p className="text-xs font-medium uppercase tracking-wide text-gold">
                    {monthRangeLabel(festival.typicalMonths)}
                  </p>
                  <CardTitle className="mt-2">{festival.nameEnglish}</CardTitle>
                  <p className="mt-0.5 font-devanagari text-sm text-ink/50">
                    {festival.nameHindi}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {festival.shortDescription}
                  </p>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
