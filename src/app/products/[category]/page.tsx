import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByCategory, getAllCategorySlugs } from "@/lib/products";
import { ProductCard } from "@/components/product";
import { categoriesConfig } from "@/config";
import { EmptyState } from "@/components/ui";
import { PackageX } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const config = categoriesConfig.find((c) => c.slug === category);
  if (!config) return {};
  return {
    title: config.nameEnglish,
    description: config.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const config = categoriesConfig.find((c) => c.slug === category);
  if (!config) notFound();

  const products = getProductsByCategory(category);

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        {config.nameEnglish}
      </h1>
      <p className="mt-1 font-devanagari text-base text-ink/50">
        {config.nameHindi}
      </p>
      <p className="mt-3 max-w-2xl text-sm text-ink/60 sm:text-base">
        {config.description}
      </p>
      
      {/* Product Image Disclaimer */}
      <div className="mt-4 max-w-2xl rounded-r-md border-l-2 border-saffron/30 bg-cream/10 p-3 text-[11px] leading-relaxed text-ink/50">
        <p><strong>Disclaimer:</strong> Product image is for reference only. Actual product, packaging, brand, colour, or appearance may vary based on availability.</p>
        <p className="mt-1 font-devanagari"><strong>अस्वीकरण:</strong> उत्पाद की तस्वीर केवल संदर्भ के लिए है। उपलब्धता के अनुसार वास्तविक उत्पाद, पैकेजिंग, ब्रांड, रंग या स्वरूप अलग हो सकता है।</p>
      </div>

      <p className="mt-4 text-sm font-medium text-gold">
        {products.length} {products.length === 1 ? "item" : "items"} available
      </p>

      {products.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            icon={<PackageX size={32} aria-hidden="true" />}
            title="No items in this category yet"
            description="Check back soon or ask us on WhatsApp — we may have what you need."
          />
        </div>
      )}
    </div>
  );
}
