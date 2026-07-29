"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle, ShoppingBag } from "lucide-react";
import { businessConfig } from "@/config";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";

interface SlideData {
  id: string;
  nameEnglish: string;
  nameHindi: string;
  tagline: string;
  image: string;
  accent: string;
  ctaLink: string;
}

const slides: SlideData[] = [
  {
    id: "diwali",
    nameEnglish: "Diwali — Festival of Lights",
    nameHindi: "दीपावली महोत्सव",
    tagline: "सम्पूर्ण लक्ष्मी-गणेश पूजा सामग्री • पीतल के दीये • माला • धूप • अगरबत्ती",
    image: "/images/festivals/diwali.webp",
    accent: "#E8934A",
    ctaLink: "/products/festival-kits?festival=diwali",
  },
  {
    id: "navratri",
    nameEnglish: "Navratri — Nine Divine Nights",
    nameHindi: "नवरात्रि — माँ दुर्गा की आराधना",
    tagline: "दुर्गा पूजा किट • अखंड ज्योति • लाल चुनरी • पंचोपचार सामग्री • व्रत सामग्री",
    image: "/images/festivals/navratri.webp",
    accent: "#C9A24B",
    ctaLink: "/products/festival-kits?festival=navratri",
  },
  {
    id: "ganesh",
    nameEnglish: "Ganesh Chaturthi",
    nameHindi: "गणेश चतुर्थी — गणपति बप्पा मोरया",
    tagline: "मोदक भोग • शुद्ध धूप-दीप • पूजन थाली • केले के पत्ते • पुष्प माला",
    image: "/images/festivals/ganesh.webp",
    accent: "#E8934A",
    ctaLink: "/products/festival-kits?festival=ganesh-chaturthi",
  },
  {
    id: "holi",
    nameEnglish: "Holi — Festival of Colors",
    nameHindi: "होली — रंगों का त्योहार",
    tagline: "हर्बल गुलाल • प्राकृतिक रंग • पिचकारी • पूजा सामग्री • लड्डू प्रसाद",
    image: "/images/festivals/holi.webp",
    accent: "#C9A24B",
    ctaLink: "/products/festival-kits?festival=holi",
  },
  {
    id: "janmashtami",
    nameEnglish: "Janmashtami — Bal Gopal Ji",
    nameHindi: "जन्माष्टमी — श्री कृष्ण जन्मोत्सव",
    tagline: "कृष्ण जन्माष्टमी किट • माखन मिश्री • मोर पंख • झूला सजावट • छप्पन भोग",
    image: "/images/festivals/janmashtami.webp",
    accent: "#E8934A",
    ctaLink: "/products/festival-kits?festival=janmashtami",
  },
  {
    id: "shivratri",
    nameEnglish: "Maha Shivratri",
    nameHindi: "महाशिवरात्रि — हर हर महादेव",
    tagline: "बेलपत्र • गंगाजल • दूध अभिषेक • भस्म • रुद्राक्ष माला • शिव पूजा किट",
    image: "/images/festivals/shivratri.webp",
    accent: "#C9A24B",
    ctaLink: "/products/festival-kits?festival=mahashivratri",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => goTo((current - 1 + slides.length) % slides.length);
  const handleNext = () => goTo((current + 1) % slides.length);

  const whatsappHref = buildWhatsAppLink(
    "नमस्ते, मुझे पूजा सामग्री चाहिए। कृपया मदद करें।"
  );

  return (
    <section
      className="relative w-full overflow-hidden bg-maroon"
      style={{ height: "clamp(400px, 55vw, 620px)" }}
      aria-label="Festival Puja Samagri Showcase"
    >
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.nameEnglish}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Decorative Om */}
            <div
              className="absolute right-8 top-1/2 -translate-y-1/2 text-9xl font-bold select-none hidden lg:block"
              style={{ color: slide.accent, opacity: 0.08 }}
              aria-hidden="true"
            >
              ॐ
            </div>

            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-screen-xl px-6 sm:px-10">
                <div className="max-w-2xl">
                  <span
                    className="inline-block rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ background: slide.accent, color: "#fff" }}
                  >
                    {businessConfig.yearsInBusiness} • West Patel Nagar, Delhi
                  </span>

                  <p
                    className="font-devanagari text-xl sm:text-2xl font-semibold mb-2 drop-shadow"
                    style={{ color: slide.accent }}
                  >
                    {slide.nameHindi}
                  </p>

                  <h1 className="text-white font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg">
                    {slide.nameEnglish}
                  </h1>

                  <p className="mt-4 font-devanagari text-sm sm:text-base text-white/80 leading-relaxed drop-shadow max-w-xl">
                    {slide.tagline}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white uppercase tracking-wide shadow-lg transition-all hover:scale-105 active:scale-95"
                      style={{ background: slide.accent }}
                    >
                      <ShoppingBag size={16} aria-hidden="true" />
                      पूजा किट देखें
                    </Link>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3 text-sm font-bold text-white uppercase tracking-wide shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                      <MessageCircle size={16} aria-hidden="true" />
                      WhatsApp Order
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-7 bg-saffron" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
