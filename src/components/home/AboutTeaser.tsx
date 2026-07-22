/**
 * src/components/home/AboutTeaser.tsx
 *
 * Links to /about, which doesn't exist as a route yet — that page
 * isn't scheduled until a later phase (see roadmap gap noted at
 * Phase 5 completion). The link intentionally stays in place now
 * rather than being removed, since nav already points here from
 * Phase 4's Header; this is expected, sequenced, temporary 404, not
 * an oversight.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessConfig } from "@/config";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-content px-4 py-14 sm:px-6">
      <div className="rounded-card bg-ink px-6 py-10 text-surface text-base sm:px-12 sm:py-14">
        <p className="text-xs font-medium uppercase tracking-wide text-gold">
          Our Story
        </p>
        <h2 className="mt-2 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">
          {businessConfig.description}
        </h2>
        <Link
          href="/about"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-saffron hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/50 rounded-sm"
        >
          Read our story
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
