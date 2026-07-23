"use client";



import { useCart } from "@/lib/store/CartContext";
import { ShoppingBag } from "lucide-react";
import { formatPriceInr } from "@/lib/utils/format-price";

export function FloatingCartButton() {
  const { totalItems, totalPrice, openCart } = useCart();

  // Hide on certain paths if needed, though usually cart floats everywhere.
  if (totalItems === 0) return null;

  return (
    <button
      onClick={openCart}
      className="floating-fab fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-40 flex items-center gap-3 rounded-full bg-saffron px-5 py-3 text-white shadow-xl hover:bg-maroon hover:-translate-y-1 transition-all duration-300 ring-4 ring-white"
    >
      <div className="relative">
        <ShoppingBag size={20} />
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-saffron shadow-sm">
          {totalItems}
        </span>
      </div>
      <div className="flex flex-col items-start border-l border-white/20 pl-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
          View Cart
        </span>
        <span className="text-sm font-bold leading-none">
          {formatPriceInr(totalPrice)}
        </span>
      </div>
    </button>
  );
}
