/**
 * src/components/home/CategoryGrid.tsx
 *
 * Renders taxonomy from config/categories.config.ts with a
 * "✓ All Essential Items Available" badge on every category card.
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
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui";
import { categoriesConfig } from "@/config";

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
                <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-gold">
                  <CheckCircle2 size={10} aria-hidden="true" className="text-whatsapp" />
                  All Essential Items Available
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
