import type { Metadata } from "next";
import Link from "next/link";
import { categoriesConfig, businessConfig, festivalConfig } from "@/config";
import { getAllProducts } from "@/lib/products";
import { ProductCard, ProductsSearchWrapper } from "@/components/product";
import { EmptyState } from "@/components/ui";
import {
  PartyPopper,
  BookOpen,
  Sparkles,
  Home,
  Scissors,
  Moon,
  Flame,
  Award,
  PackageX,
  X,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "All Products",
  description: `Browse all puja kits and samagri at ${businessConfig.name}. Festival kits, vrat kits, devta vishesh kits, griha pravesh kits, and more.`,
  alternates: {
    canonical: "/products",
  },
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

interface ProductsPageProps {
  searchParams?: Promise<{ festival?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { festival } = (await searchParams) || {};
  const allProducts = getAllProducts();

  const activeFestival = festival
    ? festivalConfig.find((f) => f.slug === festival)
    : null;

  const filteredProducts = festival
    ? allProducts.filter((p) => p.festivalSlug === festival)
    : null;

  const featured = allProducts.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        {activeFestival
          ? `Puja Kits & Samagri — ${activeFestival.nameEnglish}`
          : "All Puja Kits & Samagri"}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-ink/60 sm:text-base">
        {activeFestival
          ? `Authentic puja samagri and kits specifically prepared for ${activeFestival.nameEnglish} (${activeFestival.nameHindi}). ${activeFestival.shortDescription}`
          : "Browse by occasion or category below. Every kit is complete and ready-to-use — assembled by our team of 40+ years."}
      </p>

      {/* Active Filter Tag if filtering by festival */}
      {festival && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ink/60">
            Active Filter:
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron/15 px-3 py-1 text-xs font-bold text-saffron">
            {activeFestival ? activeFestival.nameEnglish : festival}
            <Link
              href="/products"
              className="ml-1 text-ink/60 hover:text-ink"
              title="Clear festival filter"
            >
              <X size={14} aria-hidden="true" />
            </Link>
          </span>
          <Link
            href="/products"
            className="text-xs font-semibold text-saffron hover:underline"
          >
            Clear filter (show all products)
          </Link>
        </div>
      )}

      {/* Product Image Disclaimer */}
      <div className="mt-4 max-w-2xl rounded-r-md border-l-2 border-saffron/30 bg-cream/10 p-3 text-[11px] leading-relaxed text-ink/50">
        <p>
          <strong>Disclaimer:</strong> Product image is for reference only. Actual
          product, packaging, brand, colour, or appearance may vary based on
          availability.
        </p>
        <p className="mt-1 font-devanagari">
          <strong>अस्वीकरण:</strong> उत्पाद की तस्वीर केवल संदर्भ के लिए है।
          उपलब्धता के अनुसार वास्तविक उत्पाद, पैकेजिंग, ब्रांड, रंग या स्वरूप अलग
          हो सकता है।
        </p>
      </div>

      {filteredProducts ? (
        <section className="mt-8 pb-10">
          <p className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
            <CheckCircle2 size={14} aria-hidden="true" className="text-whatsapp" />
            All Essential Items Available for{" "}
            {activeFestival ? activeFestival.nameEnglish : festival}
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState
                icon={<PackageX size={32} aria-hidden="true" />}
                title="Products for this festival will be available soon."
                description={
                  activeFestival
                    ? `We are hand-assembling special kits for ${activeFestival.nameEnglish} (${activeFestival.nameHindi}) at our store. Please contact us on WhatsApp for custom orders.`
                    : "Check back soon or ask us on WhatsApp — we may have what you need."
                }
              />
            </div>
          )}
        </section>
      ) : (
        <ProductsSearchWrapper allProducts={allProducts}>
          {/* Category grid */}
          <section className="mt-12">
            <h2 className="font-display text-2xl text-ink">Shop by Category</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoriesConfig.map((category) => {
                const Icon = ICONS[category.icon] ?? Sparkles;
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
                      <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-gold">
                        <CheckCircle2 size={10} aria-hidden="true" className="text-whatsapp" />
                        All Essential Items Available
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Featured products */}
          {featured.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-2xl text-ink">
                Featured Products &amp; Kits
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </ProductsSearchWrapper>
      )}
    </div>
  );
}
