/**
 * src/components/home/CategoryGrid.tsx
 *
 * Renders taxonomy from config/categories.config.ts, with item counts
 * now computed live from data/products.json via the Phase 6
 * data-access layer (getCategoryCounts) — exactly the enhancement
 * flagged as pending when this component was first built in Phase 5.
 * Counts can never drift out of sync with the catalog because they're
 * derived from it on every render, not stored anywhere.
 */

import Link from "next/link";
import {
  PartyPopper,
  BookOpen,
  Sparkles,
  Home,
  Scissors,
  Moon,
  Flame,
  Award,
  type LucideIcon,
} from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui";
import { categoriesConfig } from "@/config";
import { getCategoryCounts } from "@/lib/products";

/**
 * Explicit icon map rather than a dynamic `Icons[iconName]` lookup —
 * dynamic lucide-react imports by string defeat tree-shaking and
 * would pull the entire icon set into the bundle. This map is the
 * one place that needs a new line when categories.config.ts gains a
 * category with a new icon name.
 */
const ICONS: Record<string, LucideIcon> = {
  PartyPopper,
  BookOpen,
  Sparkles,
  Home,
  Scissors,
  Moon,
  Flame,
  Award,
};

export function CategoryGrid() {
  const counts = getCategoryCounts();

  return (
    <section className="mx-auto max-w-content px-4 py-14 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          Shop by Occasion
        </h2>
        <p className="mt-2 text-sm text-ink/60 sm:text-base">
          Every category is a complete, ready-to-use kit — tell us the
          occasion, we&apos;ll help you get the rest right.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoriesConfig.map((category) => {
          const Icon = ICONS[category.icon] ?? Sparkles;
          const count = counts[category.slug] ?? 0;
          return (
            <Link
              key={category.slug}
              href={`/products/${category.slug}`}
              className="rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
            >
              <Card interactive className="h-full">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-saffron/10 text-saffron">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <CardTitle>{category.nameEnglish}</CardTitle>
                <p className="mt-0.5 font-devanagari text-sm text-ink/50">
                  {category.nameHindi}
                </p>
                <CardDescription className="mt-2">
                  {category.description}
                </CardDescription>
                {count > 0 && (
                  <p className="mt-2 text-xs font-medium text-gold">
                    {count} {count === 1 ? "item" : "items"} available
                  </p>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
