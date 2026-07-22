import type { Metadata } from "next";
import Link from "next/link";
import { categoriesConfig, businessConfig } from "@/config";
import { getAllProducts } from "@/lib/products";
import { ProductCard, ProductsSearchWrapper } from "@/components/product";
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

export const metadata: Metadata = {
  title: "All Products",
  description: `Browse all puja kits and samagri at ${businessConfig.name}. Festival kits, vrat kits, devta vishesh kits, griha pravesh kits, and more.`,
};

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

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const featured = allProducts.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        All Puja Kits &amp; Samagri
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-ink/60 sm:text-base">
        Browse by occasion or category below. Every kit is complete and
        ready-to-use — assembled by our team of 40+ years.
      </p>

      {/* Product Image Disclaimer */}
      <div className="mt-4 max-w-2xl rounded-r-md border-l-2 border-saffron/30 bg-cream/10 p-3 text-[11px] leading-relaxed text-ink/50">
        <p><strong>Disclaimer:</strong> Product image is for reference only. Actual product, packaging, brand, colour, or appearance may vary based on availability.</p>
        <p className="mt-1 font-devanagari"><strong>अस्वीकरण:</strong> उत्पाद की तस्वीर केवल संदर्भ के लिए है। उपलब्धता के अनुसार वास्तविक उत्पाद, पैकेजिंग, ब्रांड, रंग या स्वरूप अलग हो सकता है।</p>
      </div>

      <ProductsSearchWrapper allProducts={allProducts}>
        {/* Category grid */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">Shop by Category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesConfig.map((category) => {
            const Icon = ICONS[category.icon] ?? Sparkles;
            const count = allProducts.filter(
              (p) => p.categorySlug === category.slug
            ).length;
            return (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="group flex items-start gap-4 rounded-card border border-ink/10 bg-base p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-saffron/10 text-saffron">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-base text-ink group-hover:text-saffron">
                    {category.nameEnglish}
                  </p>
                  <p className="mt-0.5 font-devanagari text-sm text-ink/50">
                    {category.nameHindi}
                  </p>
                  {count > 0 && (
                    <p className="mt-1 text-xs font-medium text-gold">
                      {count} {count === 1 ? "item" : "items"}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl text-ink">Featured Products &amp; Kits</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
      </ProductsSearchWrapper>
    </div>
  );
}
