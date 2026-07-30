import { MessageCircle, Store, Users, CheckCircle2 } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";

/**
 * Premium, full-width CTA section for the bottom of the Products page.
 * Communicates that the store has far more inventory than listed online
 * and drives WhatsApp enquiries for unlisted items and bulk orders.
 */
export function ProductsPageCTA() {
  return (
    <section className="mt-16 mb-4">
      <div className="relative overflow-hidden rounded-2xl border border-saffron/15 bg-gradient-to-br from-maroon via-maroon/95 to-maroon/90 px-6 py-10 sm:px-10 sm:py-14">
        {/* Decorative background elements */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-saffron/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Heading */}
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Can&apos;t find the product you&apos;re looking for?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            We have many more puja products, categories, temple accessories,
            festival items, religious books, flowers &amp; garlands, decorative
            items, griha pravesh samagri, graha shanti items, and custom
            requirements available in our store.
          </p>

          {/* Trust indicators */}
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-saffron/90 sm:text-sm">
              <Store size={16} aria-hidden="true" className="shrink-0" />
              <span>40+ Years of Trust</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-saffron/90 sm:text-sm">
              <CheckCircle2 size={16} aria-hidden="true" className="shrink-0" />
              <span>1000+ Puja Items in Store</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-saffron/90 sm:text-sm">
              <Users size={16} aria-hidden="true" className="shrink-0" />
              <span>Bulk &amp; Wholesale Welcome</span>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="max-w-lg text-sm leading-relaxed text-white/60">
              Share your shopping list or product requirement on WhatsApp and
              we&apos;ll help you find exactly what you need.
            </p>
            <a
              href={buildWhatsAppLink(
                "Hi! I'm looking for some puja items that I couldn't find on the website. Can you help me with my requirement?"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-whatsapp px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-whatsapp/25 transition-all hover:scale-[1.02] hover:bg-whatsapp/90 hover:shadow-xl hover:shadow-whatsapp/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/50 sm:text-base"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Share Your Requirement on WhatsApp
            </a>
          </div>

          {/* Bottom note */}
          <p className="mt-6 text-xs text-white/40">
            Bulk orders • Wholesale enquiries • Custom puja kits • Special
            festival requirements — all welcome
          </p>
        </div>
      </div>
    </section>
  );
}
