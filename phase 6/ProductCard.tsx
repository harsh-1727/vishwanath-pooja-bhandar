/**
 * src/components/product/ProductCard.tsx
 *
 * The photo placeholder and "Details on request" badge aren't
 * cosmetic choices — they're the visible expression of PRODUCT_
 * RULES.md rule 1. Real photos and full kit contents are pending from
 * the owner (see OWNER_GUIDE.md); this card says so plainly instead
 * of hiding the gap or faking a photo.
 */

import Link from "next/link";
import { Card, CardTitle, Badge } from "@/components/ui";
import type { Product } from "@/types/product";
import { formatPriceInr } from "@/lib/utils/format-price";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.categorySlug}/${product.slug}`}
      className="rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40"
    >
      <Card interactive className="flex h-full flex-col">
        <div
          className="mb-3 flex h-32 items-center justify-center rounded-md bg-cream text-xs text-ink/40"
          aria-hidden="true"
        >
          Photo coming soon
        </div>

        <CardTitle className="line-clamp-2">{product.nameEnglish}</CardTitle>
        <p className="mt-0.5 font-devanagari text-sm text-ink/50">
          {product.nameHindi}
        </p>
        <p className="mt-1 text-xs text-ink/50">{product.details}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-lg text-ink">
            {formatPriceInr(product.priceInr)}
          </span>
          {product.shippingNote && (
            <Badge variant="success">{product.shippingNote}</Badge>
          )}
        </div>

        {product.whatsInside.status === "pending" && (
          <Badge variant="pending" className="mt-2 self-start">
            Details on request
          </Badge>
        )}
      </Card>
    </Link>
  );
}
