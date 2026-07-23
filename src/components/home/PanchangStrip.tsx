"use client";

import { useEffect, useState } from "react";
import { getDailyPanchang, type PanchangData } from "@/lib/panchang";
import { Moon } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export function PanchangStrip() {
  const [panchang, setPanchang] = useState<PanchangData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = getDailyPanchang();
      console.log("[PanchangStrip] getDailyPanchang returned:", JSON.stringify(data, null, 2));
      setPanchang(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[PanchangStrip] getDailyPanchang CRASHED:", msg, err);
      setError(msg);
    }
    try {
      setProducts(getAllProducts());
    } catch (err) {
      console.error("[PanchangStrip] getAllProducts CRASHED:", err);
    }
  }, []);

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-8">
          <div className="max-w-5xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-6 text-red-800 text-sm">
            <p className="font-bold mb-2">Panchang Error:</p>
            <pre className="whitespace-pre-wrap text-xs">{error}</pre>
          </div>
        </div>
      </section>
    );
  }

  if (!panchang) {
    return (
      <section className="py-12 bg-white flex justify-center">
        <div className="animate-pulse h-32 w-full max-w-4xl bg-saffron/10 rounded-xl" />
      </section>
    );
  }

  return (
    <section className="py-12 bg-white relative">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-8">
        
        {/* Panchang Box */}
        <div className="max-w-5xl mx-auto bg-[#FFFDF7] border border-saffron/30 rounded-2xl p-6 shadow-sm">
          
          <div className="border-b border-saffron/20 pb-4 mb-5">
            <h2 className="text-maroon font-bold text-lg sm:text-xl flex items-center gap-2">
              <span className="text-xl">🪔</span> 
              आज — {panchang.dayOfWeek || "N/A"}, {panchang.date || "N/A"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            
            {/* Tithi */}
            <div className="bg-white border border-saffron/20 rounded-xl p-4 flex-1 min-w-[140px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-xs text-ink/50 font-medium mb-1">तिथि</p>
              <p className="font-bold text-ink text-sm sm:text-base">{panchang.tithi || "—"}</p>
            </div>

            {/* Nakshatra */}
            <div className="bg-white border border-saffron/20 rounded-xl p-4 flex-1 min-w-[140px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-xs text-ink/50 font-medium mb-1">नक्षत्र</p>
              <p className="font-bold text-ink text-sm sm:text-base">{panchang.nakshatra || "—"}</p>
            </div>

            {/* Yoga */}
            <div className="bg-white border border-saffron/20 rounded-xl p-4 flex-1 min-w-[140px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-xs text-ink/50 font-medium mb-1">योग</p>
              <p className="font-bold text-ink text-sm sm:text-base">{panchang.yoga || "—"}</p>
            </div>

            {/* Sunrise */}
            <div className="bg-white border border-saffron/20 rounded-xl p-4 flex-1 min-w-[140px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-xs text-ink/50 font-medium mb-1 flex items-center gap-1">
                <span className="text-saffron">🌅</span> सूर्योदय
              </p>
              <p className="font-bold text-ink text-sm sm:text-base">{panchang.sunrise || "—"}</p>
            </div>

            {/* Sunset */}
            <div className="bg-white border border-saffron/20 rounded-xl p-4 flex-1 min-w-[140px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-xs text-ink/50 font-medium mb-1 flex items-center gap-1">
                <span className="text-orange-600">🌆</span> सूर्यास्त
              </p>
              <p className="font-bold text-ink text-sm sm:text-base">{panchang.sunset || "—"}</p>
            </div>

            {/* Rahu Kaal */}
            <div className="bg-white border border-saffron/20 rounded-xl p-4 flex-1 min-w-[170px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-xs text-ink/50 font-medium mb-1 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500 inline-block"></span> राहु काल
              </p>
              <p className="font-bold text-ink text-sm sm:text-base">{panchang.rahuKaal || "—"}</p>
            </div>

            {/* Moon Sign */}
            <div className="bg-white border border-saffron/20 rounded-xl p-4 flex-1 min-w-[170px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-xs text-ink/50 font-medium mb-1 flex items-center gap-1">
                <span className="text-yellow-500">🌙</span> चंद्र राशि
              </p>
              <p className="font-bold text-ink text-sm sm:text-base">{panchang.moonSign || "—"}</p>
            </div>

            {/* Abhijit Muhurat */}
            {panchang.abhijitMuhurat && (
              <div className="bg-white border border-saffron/20 rounded-xl p-4 flex-1 min-w-[170px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <p className="text-xs text-ink/50 font-medium mb-1 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span> अभिजित मुहूर्त
                </p>
                <p className="font-bold text-ink text-sm sm:text-base">{panchang.abhijitMuhurat}</p>
              </div>
            )}

          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link 
              href="/products/festival-kits"
              className="inline-flex items-center justify-center bg-maroon text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-maroon/90 transition-colors shadow-sm"
            >
              पूरा पंचांग देखें &rarr;
            </Link>
            
            {panchang.specialOccasion && (
              <div className="bg-maroon/5 border border-maroon/10 text-maroon font-bold px-4 py-2 rounded-lg text-sm">
                विशेष: {panchang.specialOccasion}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Festivals Section */}
        {panchang.upcomingFestivals && panchang.upcomingFestivals.length > 0 && (
          <div className="mt-16 max-w-5xl mx-auto pt-10 border-t border-ink/5">
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl font-bold text-ink">Upcoming Hindu Festivals</h3>
              <p className="mt-2 text-sm text-ink/60">Prepare for the next auspicious occasions</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {panchang.upcomingFestivals.map((fest, idx) => {
                const matchedProduct = products.find(p => p.nameEnglish.toLowerCase().includes(fest.name.toLowerCase()) && p.categorySlug.includes("kit"));
                
                return (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gold/20 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                    <div className="w-full flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-saffron uppercase tracking-widest bg-saffron/10 px-3 py-1 rounded-full">
                        {new Date(fest.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <Moon size={16} className="text-saffron/40" />
                    </div>
                    <p className="font-display text-xl font-bold text-ink mb-2">{fest.name}</p>
                    
                    {matchedProduct ? (
                      <Link href={`/products/${matchedProduct.categorySlug}/${matchedProduct.slug}`} className="mt-auto pt-4 group flex flex-col items-center w-full">
                        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-saffron/20 relative shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={matchedProduct.images.paths[0]} alt={fest.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <span className="text-sm font-bold text-whatsapp group-hover:underline flex items-center gap-1">
                          View Puja Kit &rarr;
                        </span>
                      </Link>
                    ) : (
                      <Link href="/products/festival-kits" className="mt-auto pt-6 text-sm font-bold text-saffron hover:underline flex items-center gap-1">
                        Recommended Puja Samagri &rarr;
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
