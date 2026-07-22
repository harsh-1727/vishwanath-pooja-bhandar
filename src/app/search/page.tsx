import type { Metadata } from "next";
import { MessageCircle, SearchX } from "lucide-react";
import { searchProducts } from "@/lib/search";
import { ProductCard } from "@/components/product";
import { EmptyState, Button } from "@/components/ui";
import { businessConfig } from "@/config";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";

interface SearchPageProps {
  // Next.js 15: searchParams is a Promise and must be awaited — this
  // changed from Next.js 14's plain object, easy to miss if working
  // from older examples/training data.
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}"` : "Search",
    // Search result pages are near-duplicate content of the category/
    // product pages they surface — no unique value for a crawler to
    // index, so they're explicitly excluded while still being
    // followable (so links within results still get crawled).
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const results = q ? searchProducts(q, 24) : [];

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <h1 className="font-display text-2xl text-ink sm:text-3xl">
        {q ? `Results for "${q}"` : "Search"}
      </h1>
      {q && (
        <p className="mt-1 text-sm text-ink/60">
          {results.length} {results.length === 1 ? "match" : "matches"} found
        </p>
      )}

      {results.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ product }) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            icon={<SearchX size={32} aria-hidden="true" />}
            title="No matches found"
            description={
              q
                ? `We couldn't find anything for "${q}". Try a different word, or ask us directly — we probably still have it.`
                : "Type a search term to get started."
            }
            action={
              q ? (
                <Button
                  href={buildWhatsAppLink(
                    `Hi ${businessConfig.name}, I searched for "${q}" but couldn't find it. Do you have this?`
                  )}
                  external
                  target="_blank"
                  variant="whatsapp"
                  iconStart={<MessageCircle size={16} aria-hidden="true" />}
                >
                  Ask on WhatsApp
                </Button>
              ) : undefined
            }
          />
        </div>
      )}
    </div>
  );
}
