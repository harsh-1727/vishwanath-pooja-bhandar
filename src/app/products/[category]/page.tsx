import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductsByCategory, getAllCategorySlugs } from "@/lib/products";
import { ProductCard, CategoryFooterCTA } from "@/components/product";
import { categoriesConfig, festivalConfig } from "@/config";
import { X, CheckCircle2, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ festival?: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ category: slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const { festival } = (await searchParams) || {};
  const config = categoriesConfig.find((c) => c.slug === category);
  if (!config) return {};

  const activeFestival = festival
    ? festivalConfig.find((f) => f.slug === festival)
    : null;
  const title = activeFestival
    ? `${activeFestival.nameEnglish} Puja Samagri & Kits`
    : config.nameEnglish;

  const description = activeFestival
    ? `Buy authentic ${activeFestival.nameEnglish} (${activeFestival.nameHindi}) puja samagri and kits from Vishwanath Pooja Bhandar.`
    : config.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${category}`,
    },
    openGraph: {
      title,
      description,
      url: `/products/${category}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const { festival } = (await searchParams) || {};
  const config = categoriesConfig.find((c) => c.slug === category);
  if (!config) notFound();

  const activeFestival = festival
    ? festivalConfig.find((f) => f.slug === festival)
    : null;
  const allCategoryProducts = getProductsByCategory(category);

  // Filter products by festival if query param is present
  const products = festival
    ? allCategoryProducts.filter((p) => p.festivalSlug === festival)
    : allCategoryProducts;

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl text-ink sm:text-4xl">
          {activeFestival
            ? `${config.nameEnglish} — ${activeFestival.nameEnglish}`
            : config.nameEnglish}
        </h1>
        <p className="font-devanagari text-base text-ink/50">
          {activeFestival
            ? `${config.nameHindi} — ${activeFestival.nameHindi}`
            : config.nameHindi}
        </p>
      </div>

      <p className="mt-3 max-w-2xl text-sm text-ink/60 sm:text-base">
        {activeFestival
          ? `Authentic puja samagri and kits specifically prepared for ${activeFestival.nameEnglish} (${activeFestival.nameHindi}). ${activeFestival.shortDescription}`
          : config.description}
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
              href={`/products/${category}`}
              className="ml-1 text-ink/60 hover:text-ink"
              title="Clear festival filter"
            >
              <X size={14} aria-hidden="true" />
            </Link>
          </span>
          <Link
            href={`/products/${category}`}
            className="text-xs font-semibold text-saffron hover:underline"
          >
            Clear filter (show all {config.nameEnglish})
          </Link>
        </div>
      )}

      {/* Product Image Disclaimer */}
      <div className="mt-4 max-w-2xl rounded-r-md border-l-2 border-saffron/30 bg-cream/10 p-3 text-[11px] leading-relaxed text-ink/50">
        <p>
          <strong>Disclaimer:</strong> Product image is for reference only.
          Actual product, packaging, brand, colour, or appearance may vary based
          on availability.
        </p>
        <p className="mt-1 font-devanagari">
          <strong>अस्वीकरण:</strong> उत्पाद की तस्वीर केवल संदर्भ के लिए है।
          उपलब्धता के अनुसार वास्तविक उत्पाद, पैकेजिंग, ब्रांड, रंग या स्वरूप
          अलग हो सकता है।
        </p>
      </div>

      <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
        <CheckCircle2 size={14} aria-hidden="true" className="text-whatsapp" />
        All Essential Items Available
      </p>

      {products.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-saffron/30 bg-cream/20 px-4 py-6 text-center">
          <div className="text-3xl select-none" role="img" aria-label="package">
            📦
          </div>

          <p className="mt-2 font-devanagari text-base font-semibold text-ink sm:text-lg">
            अभी इस श्रेणी के उत्पाद वेबसाइट पर उपलब्ध नहीं हैं।
          </p>
          <p className="mt-0.5 text-xs text-ink/60 sm:text-sm">
            Products in this category will be available on the website soon.
          </p>

          <p className="mt-3 font-devanagari text-sm font-medium text-ink/80">
            हमारे स्टोर में इस श्रेणी के कई अन्य उत्पाद उपलब्ध हैं।
          </p>
          <p className="mt-0.5 text-xs text-ink/60">
            Many more items are available in our physical store.
          </p>

          <a
            href={buildWhatsAppLink(
              `Hi! I am looking for ${activeFestival ? activeFestival.nameEnglish : config.nameEnglish} items. Do you have them in store?`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-whatsapp px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-whatsapp/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/40"
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp Us
          </a>
        </div>
      )}

      {/* Also Available in Store — minimal spacing immediately below compact empty state or grid */}
      {config.alsoAvailable && config.alsoAvailable.length > 0 && (
        <div className="mt-5 rounded-xl border border-ink/10 bg-cream/30 p-5 sm:p-6">
          <h3 className="font-display text-lg text-ink">
            Also Available in Store
          </h3>
          <p className="mt-1 text-xs text-ink/50">
            These items are available at our West Patel Nagar shop. Contact us for details.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {config.alsoAvailable.map((item) => (
              <span
                key={item}
                className="rounded-full border border-saffron/20 bg-white px-3 py-1 text-xs font-medium text-ink/70"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category Footer CTA — always at bottom, future products appear above */}
      <CategoryFooterCTA />
    </div>
  );
}
