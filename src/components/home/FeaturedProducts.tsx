/**
 * src/components/home/FeaturedProducts.tsx
 *
 * Shows a curated selection of featured products with real images.
 * Pujahome-style product showcase on the homepage.
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getAllProducts } from "@/lib/products";

export function FeaturedProducts() {
  const featured = getAllProducts()
    .filter((p) => p.featured)
    .slice(0, 8);

  if (featured.length === 0) return null;

  return (
    <section className="py-14 bg-cream/40">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-saffron uppercase tracking-widest">हमारे उत्पाद</p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl text-ink font-bold">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-ink/60">
              Handpicked puja samagri trusted by thousands of families
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-saffron hover:underline"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => {
            const img = product.images.paths[0] ?? null;
            return (
              <Link
                key={product.id}
                href={`/products/${product.categorySlug}/${product.slug}`}
                className="group rounded-card overflow-hidden bg-white border border-ink/8 shadow-sm hover:shadow-md transition-all"
              >
                {/* Image */}
                <div
                  className="relative w-full bg-cream overflow-hidden"
                  style={{ paddingTop: "80%" }}
                >
                  {img ? (
                    <Image
                      src={img}
                      alt={product.nameEnglish}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-saffron/5">
                      <span className="text-3xl opacity-30">🪔</span>
                    </div>
                  )}
                  {/* Kit badge */}
                  {product.categorySlug.includes("kit") && (
                    <span className="absolute top-2 left-2 bg-saffron text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                      KIT
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-bold text-saffron">
                    ₹{product.priceInr}
                  </p>
                  <h3 className="mt-0.5 text-xs sm:text-sm font-semibold text-ink line-clamp-2 leading-tight">
                    {product.nameEnglish}
                  </h3>
                  <p className="font-devanagari text-[10px] text-ink/40 mt-0.5 line-clamp-1">
                    {product.nameHindi}
                  </p>
                  {product.shippingNote && (
                    <span className="mt-2 inline-block bg-green-50 text-green-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                      {product.shippingNote}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile view all */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-saffron hover:underline"
          >
            View all products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
