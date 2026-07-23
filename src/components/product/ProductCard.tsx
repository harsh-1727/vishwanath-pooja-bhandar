"use client";

/**
 * src/components/product/ProductCard.tsx
 *
 * Renders a large card for Kits, and a compact Blinkit-style row for regular Samagri.
 * Integrates with the CartContext to manage quantities seamlessly.
 */

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPriceInr } from "@/lib/utils/format-price";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "@/lib/store/CartContext";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";
import { useToast } from "@/components/ui/Toast";



interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images.paths.length > 0 ? product.images.paths[0] ?? null : null;
  const isKit = product.categorySlug.includes("kit");
  const { items, addItem, updateQuantity } = useCart();
  const { toast } = useToast();
  
  const askMessage = `Namaste 🙏\n\nI want to ask about this product:\n\nProduct: ${product.nameEnglish}\nPrice: ${formatPriceInr(product.priceInr)}\n\nIs this product currently available?`;
  const askWhatsappUrl = buildWhatsAppLink(askMessage);
  
  const cartItem = items.find(i => i.product.id === product.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast("Added to cart ✓");
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, -1);
  };

  // --- COMPACT LAYOUT FOR REGULAR SAMAGRI (Blinkit Style) ---
  if (!isKit) {
    return (
      <Link
        href={`/products/${product.categorySlug}/${product.slug}`}
        className="flex items-center gap-4 bg-white border border-ink/5 p-3 rounded-xl shadow-sm hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40 group relative overflow-hidden"
      >
        {/* Left: Square Image */}
        <div className="relative w-20 h-20 shrink-0 bg-cream rounded-lg overflow-hidden border border-ink/5 flex items-center justify-center">
          {product.images.status === "placeholder" || !firstImage ? (
            <div className="w-full h-full bg-gradient-to-br from-cream to-saffron/10 flex flex-col items-center justify-center text-center p-1 border border-saffron/10 rounded-lg">
              <span className="text-xl">🪔</span>
              <span className="text-[8px] font-devanagari text-saffron/80 font-bold mt-0.5">ॐ शुद्धता ॐ</span>
            </div>
          ) : (
             <Image
             src={firstImage}
             alt={product.nameEnglish}
             fill
             className="object-contain p-1 transition-transform duration-500 group-hover:scale-110"
             sizes="80px"
           />
          )}
        </div>

        {/* Center: Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="text-sm font-bold text-ink truncate leading-tight group-hover:text-saffron transition-colors">
            {product.nameEnglish}
          </h3>
          <p className="text-[11px] font-devanagari text-ink/50 truncate mt-0.5">
            {product.nameHindi}
          </p>
          <div className="text-[11px] text-ink/40 mt-1">{product.details}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-display font-bold text-maroon">
              {formatPriceInr(product.priceInr)}
            </span>
            <span className="text-ink/20 text-xs">|</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(askWhatsappUrl, "_blank");
              }}
              className="text-[10px] text-whatsapp hover:underline font-bold flex items-center gap-0.5 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
            >
              Ask
            </button>
          </div>
        </div>

        {/* Right: Add/Quantity Button */}
        <div className="shrink-0 flex items-center justify-center w-20">
          {qtyInCart > 0 ? (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div className="flex items-center justify-between bg-saffron/10 border border-saffron/30 rounded-lg w-full overflow-hidden shadow-sm" onClick={e => e.preventDefault()}>
              <button onClick={handleDecrement} className="p-2 hover:bg-maroon/10 text-maroon transition-colors focus:outline-none">
                <Minus size={14} />
              </button>
              <span className="text-sm font-bold text-maroon">{qtyInCart}</span>
              <button onClick={handleIncrement} className="p-2 hover:bg-saffron/20 text-saffron transition-colors focus:outline-none">
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAdd}
              className="bg-cream hover:bg-saffron/10 text-saffron border border-saffron/30 hover:border-saffron px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm w-full focus:outline-none"
            >
              Add
            </button>
          )}
        </div>
      </Link>
    );
  }

  // --- LARGE LAYOUT FOR PREMIUM KITS ---
  return (
    <Link
      href={`/products/${product.categorySlug}/${product.slug}`}
      className="bg-white border border-ink/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40 flex flex-col h-full group"
    >
      {/* Image Banner */}
      <div className="relative w-full overflow-hidden bg-cream" style={{ paddingTop: "70%" }}>
        {product.images.status === "placeholder" || !firstImage ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-cream to-saffron/10 text-saffron/40 p-4 border border-saffron/15">
            <span className="text-4xl">🪔</span>
            <span className="mt-1 text-xs font-devanagari text-saffron font-bold">Vishwanath Pooja Bhandar</span>
            <span className="text-[10px] text-ink/40 font-medium mt-0.5">फ़ोटो जल्द आएगी (Image Coming Soon)</span>
          </div>
        ) : (
          <Image
            src={firstImage}
            alt={product.nameEnglish}
            fill
            className="object-contain p-3 transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <span className="absolute top-3 left-3 rounded bg-maroon/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-white shadow-sm uppercase tracking-widest border border-white/20">
          Premium Kit
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 bg-gradient-to-b from-white to-saffron/5">
        <h3 className="font-display text-base font-bold text-ink leading-snug group-hover:text-maroon transition-colors line-clamp-2">
          {product.nameEnglish}
        </h3>
        <p className="mt-1 font-devanagari text-xs text-ink/60">
          {product.nameHindi}
        </p>
        
        <p className="mt-2 text-xs text-ink/50 bg-white/50 inline-block px-2 py-0.5 rounded border border-ink/5 self-start">
          {product.details}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Wholesale Price</span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold text-maroon">
                {formatPriceInr(product.priceInr)}
              </span>
              <span className="text-ink/20 text-xs">|</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(askWhatsappUrl, "_blank");
                }}
                className="text-[10px] text-whatsapp hover:underline font-bold cursor-pointer bg-transparent border-none p-0 focus:outline-none"
              >
                Ask
              </button>
            </div>
          </div>
          
          <div className="w-24">
            {qtyInCart > 0 ? (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
              <div className="flex items-center justify-between bg-white border border-maroon/30 rounded-xl w-full overflow-hidden shadow-sm h-10" onClick={e => e.preventDefault()}>
                <button onClick={handleDecrement} className="w-8 h-full flex justify-center items-center hover:bg-maroon/5 text-maroon transition-colors">
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold text-maroon">{qtyInCart}</span>
                <button onClick={handleIncrement} className="w-8 h-full flex justify-center items-center hover:bg-maroon/5 text-maroon transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAdd}
                className="bg-saffron hover:bg-maroon text-white h-10 w-full rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-sm focus:outline-none flex items-center justify-center gap-1"
              >
                <ShoppingBag size={14} />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
