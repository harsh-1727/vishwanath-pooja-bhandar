"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Share2, ZoomIn, Info, FileText, Sparkles, ShoppingBag, Plus, Minus, HelpCircle } from "lucide-react";
import { Badge, useToast } from "@/components/ui";
import { formatPriceInr } from "@/lib/utils/format-price";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";
import { businessConfig } from "@/config";
import { trackProductView, trackWhatsAppClick } from "@/lib/analytics";
import type { Product } from "@/types/product";
import { useCart } from "@/lib/store/CartContext";

interface ProductClientPageProps {
  product: Product;
  related: Product[];
  allProducts: Product[];
}

export default function ProductClientPage({ product, related, allProducts }: ProductClientPageProps) {
  const { toast } = useToast();
  const { items, addItem, updateQuantity } = useCart();
  const [activeImage, setActiveImage] = useState(product.images.paths[0] || "/images/products/kit.webp");
  const [activeTab, setActiveTab] = useState<"info" | "benefits" | "usage">("info");
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const cartItem = items.find(i => i.product.id === product.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  // Reset active image when product changes
  useEffect(() => {
    setActiveImage(product.images.paths[0] || "/images/products/kit.webp");
  }, [product.id, product.images.paths]);

  // Recently Viewed Logic
  useEffect(() => {
    try {
      const STORAGE_KEY = "vpb-recently-viewed";
      const raw = localStorage.getItem(STORAGE_KEY);
      let list: string[] = [];
      if (raw) {
        list = JSON.parse(raw);
      }
      
      // Filter out current product and keep last 4 items
      const filtered = list.filter(id => id !== product.id);
      const updated = [product.id, ...filtered].slice(0, 4);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Resolve products list from IDs
      const resolved = updated
        .filter(id => id !== product.id) // Don't show current product in recently viewed
        .map(id => allProducts.find(p => p.id === id))
        .filter((p): p is Product => !!p);
      setRecentlyViewed(resolved);
    } catch {
      // Degrade silently if localStorage unavailable
    }
  }, [product.id, allProducts]);

  // Track Product View event
  useEffect(() => {
    trackProductView({
      product_name: product.nameEnglish,
      product_slug: product.slug,
      category: product.categorySlug,
    });
  }, [product.nameEnglish, product.slug, product.categorySlug]);

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: product.nameEnglish,
        text: product.description,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast("Product link copied to clipboard!", "success");
      });
    }
  };

  const whatsappHref = buildWhatsAppLink(
    `Hi ${businessConfig.name}, I am interested in "${product.nameEnglish}" (${formatPriceInr(product.priceInr)}). Can you guide me on stock availability?`
  );

  const askMessage = `Namaste 🙏\n\nI want to ask about this product:\n\nProduct: ${product.nameEnglish}\nPrice: ${formatPriceInr(product.priceInr)}\n\nIs this product currently available?`;
  const askWhatsappHref = buildWhatsAppLink(askMessage);

  // Gallery images (only the actual product images)
  const galleryImages = product.images.paths.length > 0 ? product.images.paths : ["/images/products/kit.webp"];

  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left Side: Interactive Gallery with Zoom */}
        <div className="flex flex-col gap-4">
          <div className="relative group aspect-square w-full overflow-hidden rounded-card border border-ink/10 bg-cream flex items-center justify-center">
            {/* Hover Zoom Effect */}
            <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-110">
              <Image
                src={activeImage}
                alt={product.nameEnglish}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute right-4 bottom-4 rounded-full bg-black/45 p-2 text-white backdrop-blur-sm pointer-events-none">
              <ZoomIn size={18} />
            </div>
          </div>
          
          {/* Thumbnails list */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                    activeImage === img ? "border-saffron scale-95" : "border-ink/10 hover:border-saffron/40"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.nameEnglish} Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Product Image Disclaimer */}
          <div className="mt-3 rounded-md border-l-2 border-saffron/30 bg-cream/10 p-3 text-[11px] leading-relaxed text-ink/50">
            <p><strong>Disclaimer:</strong> Product image is for reference only. Actual product, packaging, brand, colour, or appearance may vary based on availability.</p>
            <p className="mt-1 font-devanagari"><strong>अस्वीकरण:</strong> उत्पाद की तस्वीर केवल संदर्भ के लिए है। उपलब्धता के अनुसार वास्तविक उत्पाद, पैकेजिंग, ब्रांड, रंग या स्वरूप अलग हो सकता है।</p>
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">
              {product.categorySlug.replace(/-/g, " ")}
            </span>
            <Badge variant="success">In Stock</Badge>
          </div>

          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {product.nameEnglish}
          </h1>
          <p className="mt-1 font-devanagari text-xl font-medium text-ink/50">
            {product.nameHindi}
          </p>

          <div className="mt-4 flex items-baseline gap-4">
            <span className="font-display text-3xl font-bold text-ink">
              {formatPriceInr(product.priceInr)}
            </span>
            {product.shippingNote && (
              <span className="text-sm font-semibold text-whatsapp">
                ✓ {product.shippingNote}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col gap-3">
            {qtyInCart === 0 ? (
              <button
                type="button"
                onClick={() => { addItem(product, 1); toast("Added to cart ✓"); }}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-saffron px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-saffron/90 transition-colors"
              >
                <ShoppingBag size={18} aria-hidden="true" /> Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-between w-full rounded-xl border-2 border-saffron bg-saffron/5 px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, -1)}
                  aria-label="Decrease quantity"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-saffron/10 text-saffron hover:bg-saffron/20 transition-colors"
                >
                  <Minus size={16} aria-hidden="true" />
                </button>
                <span className="font-bold text-ink">{qtyInCart} in cart</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, 1)}
                  aria-label="Increase quantity"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-saffron/10 text-saffron hover:bg-saffron/20 transition-colors"
                >
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  button_location: "product_page",
                  product_name: product.nameEnglish,
                  product_slug: product.slug,
                  category_name: product.categorySlug,
                })
              }
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-whatsapp px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-whatsapp/90 transition-colors"
            >
              <MessageCircle size={18} aria-hidden="true" /> Order on WhatsApp
            </a>

            <div className="flex items-center gap-2">
              <a
                href={askWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    button_location: "product_page",
                    product_name: product.nameEnglish,
                    product_slug: product.slug,
                    category_name: product.categorySlug,
                  })
                }
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-ink/10 bg-cream/30 py-2.5 text-xs font-semibold text-ink/70 hover:bg-cream/60 transition-colors text-center"
              >
                <HelpCircle size={14} aria-hidden="true" /> Ask a Question
              </a>
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share product link"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-ink/10 bg-cream/30 py-2.5 text-xs font-semibold text-ink/70 hover:bg-cream/60 transition-colors text-center"
              >
                <Share2 size={14} aria-hidden="true" /> Share Product
              </button>
            </div>
          </div>

          {/* Tabbed Specifications / Info Section */}
          <div className="mt-10 rounded-card border border-ink/10 bg-base overflow-hidden">
            <div className="flex border-b border-ink/10 bg-cream/35" role="tablist" aria-label="Product Information Tabs">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "info"}
                aria-controls="tab-panel-info"
                id="tab-info"
                onClick={() => setActiveTab("info")}
                className={`flex-1 py-3 text-center text-sm font-semibold border-b-2 transition-all ${
                  activeTab === "info" ? "border-saffron text-saffron bg-base" : "border-transparent text-ink/60 hover:text-ink"
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <Info size={16} aria-hidden="true" />
                  Details
                </span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "benefits"}
                aria-controls="tab-panel-benefits"
                id="tab-benefits"
                onClick={() => setActiveTab("benefits")}
                className={`flex-1 py-3 text-center text-sm font-semibold border-b-2 transition-all ${
                  activeTab === "benefits" ? "border-saffron text-saffron bg-base" : "border-transparent text-ink/60 hover:text-ink"
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <Sparkles size={16} aria-hidden="true" />
                  Benefits
                </span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "usage"}
                aria-controls="tab-panel-usage"
                id="tab-usage"
                onClick={() => setActiveTab("usage")}
                className={`flex-1 py-3 text-center text-sm font-semibold border-b-2 transition-all ${
                  activeTab === "usage" ? "border-saffron text-saffron bg-base" : "border-transparent text-ink/60 hover:text-ink"
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <FileText size={16} aria-hidden="true" />
                  Usage
                </span>
              </button>
            </div>

            <div className="p-5 text-sm leading-relaxed text-ink/70">
              {activeTab === "info" && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  
                  <div className="border-t border-ink/10 pt-4">
                    <h4 className="font-semibold text-ink mb-2">Specifications</h4>
                    <dl className="grid grid-cols-2 gap-y-2 text-xs">
                      {Object.entries(product.specifications || {}).map(([key, val]) => (
                        <div key={key}>
                          <dt className="text-ink/40 uppercase font-semibold">{key}</dt>
                          <dd className="text-ink/80 font-medium mt-0.5">{val}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}

              {activeTab === "benefits" && (
                <ul className="space-y-2">
                  {(product.benefits || []).map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "usage" && (
                <ol className="space-y-2 list-decimal list-inside">
                  {(product.usage || []).map((u, i) => (
                    <li key={i} className="leading-relaxed pl-1">
                      <span>{u}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <section className="mt-16 border-t border-ink/10 pt-10">
          <h2 className="font-display text-2xl font-bold text-ink">Recently Viewed</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewed.map((viewed) => (
              <Link
                key={viewed.id}
                href={`/products/${viewed.categorySlug}/${viewed.slug}`}
                className="group rounded-card border border-ink/10 bg-base p-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-md bg-cream">
                  <Image
                    src={viewed.images.paths[0] || "/images/products/kit.webp"}
                    alt={viewed.nameEnglish}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="mt-3 font-display text-sm font-semibold text-ink line-clamp-1 group-hover:text-saffron">
                  {viewed.nameEnglish}
                </h3>
                <p className="mt-0.5 text-xs text-ink/40 line-clamp-1">{viewed.nameHindi}</p>
                <p className="mt-2 font-display text-sm font-bold text-ink">{formatPriceInr(viewed.priceInr)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-ink/10 pt-10">
          <h2 className="font-display text-2xl font-bold text-ink">More in this Category</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.categorySlug}/${rel.slug}`}
                className="group rounded-card border border-ink/10 bg-base p-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-md bg-cream">
                  <Image
                    src={rel.images.paths[0] || "/images/products/kit.webp"}
                    alt={rel.nameEnglish}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-ink line-clamp-1 group-hover:text-saffron">
                  {rel.nameEnglish}
                </h3>
                <p className="mt-0.5 text-xs text-ink/40 line-clamp-1">{rel.nameHindi}</p>
                <p className="mt-2 font-display text-base font-bold text-ink">{formatPriceInr(rel.priceInr)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}