"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/store/CartContext";
import { Plus, Minus, ShoppingBag, Send, X, Trash2 } from "lucide-react";
import { formatPriceInr } from "@/lib/utils/format-price";
import { businessConfig, contactConfig } from "@/config";

export function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (!name || !phone || !address) {
      alert("Please fill in all details for delivery.");
      return;
    }

    let message = `*New Order from ${businessConfig.name}*\n\n`;
    message += `*Customer Details:*\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\n`;
    message += `*Order Items:*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.nameEnglish} - ${item.quantity} x ${formatPriceInr(item.product.priceInr)}\n`;
    });

    message += `\n*Grand Total: ${formatPriceInr(totalPrice)}*\n\n`;
    message += `Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    // WhatsApp URL fallback to config if env missing
    const phoneNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || contactConfig.phone.replace(/\s+/g, "");
    
    // Clear cart after redirecting to WhatsApp
    window.open(`https://wa.me/${phoneNum}?text=${encodedMessage}`, "_blank");
    clearCart();
    closeCart();
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm transition-opacity" onClick={closeCart} />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between px-4 py-4 border-b border-ink/10 bg-cream">
          <h2 className="text-xl font-display font-bold flex items-center gap-2 text-ink">
            <ShoppingBag size={20} className="text-saffron" />
            Your Cart
          </h2>
          <button onClick={closeCart} className="p-2 rounded-full hover:bg-ink/5 text-ink/70">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-saffron/5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-ink/50 space-y-4">
              <ShoppingBag size={48} className="text-ink/20" />
              <p className="font-devanagari">आपकी कार्ट खाली है।</p>
              <button onClick={closeCart} className="text-sm text-maroon font-bold hover:underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 bg-white rounded-lg border border-ink/5 shadow-sm">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-cream shrink-0 border border-ink/10">
                    <Image
                      src={item.product.images.paths[0] || "/images/placeholder.webp"}
                      alt={item.product.nameEnglish}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-ink truncate">{item.product.nameEnglish}</h3>
                    <p className="text-xs text-ink/50 font-devanagari truncate">{item.product.nameHindi}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-saffron">{formatPriceInr(item.product.priceInr)}</span>
                      <div className="flex items-center gap-3 bg-cream rounded-full px-2 py-1 border border-ink/5">
                        <button onClick={() => updateQuantity(item.product.id, -1)} className="text-ink/60 hover:text-maroon">
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)} className="text-ink/60 hover:text-green-600">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="self-start p-1 text-ink/40 hover:text-maroon">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <div className="mt-8 p-4 bg-white rounded-xl border border-saffron/20 shadow-sm space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-ink/50 mb-4">Delivery Details</h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-ink/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron/50"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-ink/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron/50"
                />
                <textarea
                  placeholder="Complete Delivery Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-ink/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron/50 resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink/10 bg-white p-4 space-y-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Grand Total</span>
              <span className="text-maroon">{formatPriceInr(totalPrice)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-xl font-bold transition-colors shadow-sm"
            >
              <Send size={18} />
              Place Order on WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
