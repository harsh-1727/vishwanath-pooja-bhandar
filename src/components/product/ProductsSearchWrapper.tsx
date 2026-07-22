"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";
import type { Product } from "@/types/product";

interface ProductsSearchWrapperProps {
  allProducts: Product[];
  children: React.ReactNode;
}

export function ProductsSearchWrapper({ allProducts, children }: ProductsSearchWrapperProps) {
  const [query, setQuery] = useState("");

  const searchResults = React.useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase().replace(/\s+/g, "");
    
    return allProducts.filter((p) => {
      const matchEng = p.nameEnglish.toLowerCase().replace(/\s+/g, "").includes(lowerQuery);
      const matchHin = p.nameHindi.toLowerCase().replace(/\s+/g, "").includes(lowerQuery);
      const matchKey = p.searchKeywords?.some(k => k.toLowerCase().replace(/\s+/g, "").includes(lowerQuery));
      return matchEng || matchHin || matchKey;
    });
  }, [query, allProducts]);

  return (
    <div className="w-full">
      <div className="relative mt-6 max-w-2xl mb-8">
        <input
          type="text"
          placeholder="Search products, kits, samagri (English/Hindi)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-ink/20 bg-white py-3 pl-12 pr-4 text-ink shadow-sm placeholder:text-ink/40 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={20} />
      </div>

      {query.trim() === "" ? (
        children
      ) : (
        <div className="mt-8 pb-10">
          <h2 className="font-display text-2xl text-ink">Search Results for &quot;{query}&quot;</h2>
          {searchResults.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-ink/20 bg-cream/30 p-10 text-center">
              <p className="text-lg font-bold text-ink">No exact matches found</p>
              <p className="mt-2 text-sm text-ink/60 max-w-md">
                We might still have it in stock. We have over 500+ items in our physical store.
              </p>
              <a
                href={buildWhatsAppLink(`Hi, I am looking for "${query}". Do you have it in stock?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-whatsapp/90 transition-colors"
              >
                Can&apos;t find your item? Ask us on WhatsApp
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
