import type { Metadata } from "next";
import Image from "next/image";
import { businessConfig } from "@/config";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";
import { Button } from "@/components/ui";
import { MessageCircle, Store, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery | Vishwanath Pooja Bhandar — Puja Samagri Photos",
  description:
    "See our puja samagri collection, festival decorations, brass & copper puja items, and Indian religious ceremony setups. Vishwanath Pooja Bhandar, West Patel Nagar, New Delhi.",
};

interface GalleryItem {
  type: "image" | "placeholder";
  src?: string;
  alt: string;
  title: string;
  titleHindi: string;
  category: string;
  span?: "tall" | "wide" | "normal";
}

const galleryItems: GalleryItem[] = [
  {
    type: "image",
    src: "/images/gallery/sindoor-container.png",
    alt: "Traditional sindoor and chandan containers in our shop",
    title: "Sindoor & Chandan",
    titleHindi: "सिंदूर और चंदन",
    category: "Products",
  },
  {
    type: "image",
    src: "/images/festivals/diwali.webp",
    alt: "Diwali — rows of lit clay diyas with rangoli and marigold flowers",
    title: "Diwali Diyas",
    titleHindi: "दीपावली के दीये",
    category: "Festival",
  },
  {
    type: "image",
    src: "/images/gallery/store-products.png",
    alt: "Store shelves filled with authentic puja samagri",
    title: "Puja Items Display",
    titleHindi: "पूजा सामग्री संग्रह",
    category: "Store",
  },
  {
    type: "image",
    src: "/images/festivals/navratri.webp",
    alt: "Navratri Durga Puja — Goddess Durga idol decorated with marigold garlands",
    title: "Navratri Durga Puja",
    titleHindi: "नवरात्रि दुर्गा पूजा",
    category: "Festival",
  },
  {
    type: "image",
    src: "/images/gallery/store-malas.png",
    alt: "Beautifully decorated garlands and malas hanging in our store",
    title: "Garland & Mala Display",
    titleHindi: "पूजा फूल माला संग्रह",
    category: "Store",
  },
  {
    type: "image",
    src: "/images/festivals/ganesh.webp",
    alt: "Lord Ganesha idol beautifully decorated with flowers and modak",
    title: "Ganesh Chaturthi",
    titleHindi: "गणेश चतुर्थी",
    category: "Festival",
  },
  {
    type: "image",
    src: "/images/gallery/store-dhoop-shelf.png",
    alt: "Shelves stacked with various brands of dhoop and agarbatti",
    title: "Dhoop & Agarbatti Shelves",
    titleHindi: "धूप व अगरबत्ती रैक",
    category: "Products",
  },
  {
    type: "image",
    src: "/images/gallery/decorative-garlands.png",
    alt: "Fresh and decorative marigold garlands for puja decoration",
    title: "Phool Haar (Garlands)",
    titleHindi: "फूल माला सजावट",
    category: "Decoration",
  },
  {
    type: "image",
    src: "/images/festivals/holi.webp",
    alt: "Holi festival — colorful gulal powder in bowls, natural herbal colors",
    title: "Holi — Rang Utsav",
    titleHindi: "होली — रंगोत्सव",
    category: "Festival",
  },
  {
    type: "image",
    src: "/images/festivals/janmashtami.webp",
    alt: "Janmashtami — Laddu Gopal Krishna idol in jhoola decorated with flowers",
    title: "Janmashtami Jhoola",
    titleHindi: "जन्माष्टमी — लड्डू गोपाल",
    category: "Festival",
  },
  {
    type: "image",
    src: "/images/festivals/shivratri.webp",
    alt: "Maha Shivratri — Shivling with belpatra and milk abhishek",
    title: "Maha Shivratri Puja",
    titleHindi: "महाशिवरात्रि अभिषेक",
    category: "Festival",
  },
  {
    type: "image",
    src: "/images/gallery/murti-shelf.png",
    alt: "Traditional brass and clay deities of gods on shelves",
    title: "Lord Murti Collection",
    titleHindi: "भगवान मूर्ति संग्रह",
    category: "Products",
  },
  {
    type: "image",
    src: "/images/gallery/store-moli-display.jpeg",
    alt: "Display of red and yellow moli (kalawa) sacred threads in our shop",
    title: "Moli & Kalawa Threads",
    titleHindi: "मौली और कलावा कंगन",
    category: "Store",
  },
  {
    type: "image",
    src: "/images/gallery/thakur-ji-kit.png",
    alt: "Gokulroop Thakur Ji Puja Kit box display in our store",
    title: "Thakur Ji Kit",
    titleHindi: "ठाकुर जी किट",
    category: "Products",
  },
  {
    type: "image",
    src: "/images/gallery/pitambari-powder.png",
    alt: "Pitambari shining powder for cleaning brass and copper puja items",
    title: "Pitambari Shining Powder",
    titleHindi: "पीतांबरी शाइनिंग पाउडर",
    category: "Products",
  }
];

const CATEGORY_COLORS: Record<string, string> = {
  Festival: "bg-saffron/10 text-saffron",
  "Puja Setup": "bg-gold/10 text-gold",
  Products: "bg-maroon/10 text-maroon",
  Decoration: "bg-pink-500/10 text-pink-600",
  Store: "bg-ink/10 text-ink/60",
  Team: "bg-ink/10 text-ink/60",
};

export default function GalleryPage() {
  return (
    <main>
      {/* Header */}
      <div className="bg-maroon py-12 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Gallery</h1>
        <p className="mt-2 font-devanagari text-lg text-saffron">
          पूजा सामग्री और त्योहारों की झलकियाँ
        </p>
        <p className="mt-3 text-cream/70 text-sm max-w-lg mx-auto">
          Authentic Indian puja setups, festival celebrations, and traditional samagri from
          Vishwanath Pooja Bhandar, West Patel Nagar, New Delhi.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-8 py-12">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 space-y-5">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid overflow-hidden rounded-card border border-ink/8 bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {item.type === "image" && item.src ? (
                <>
                  <div className="relative w-full overflow-hidden" style={{ minHeight: 200 }}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={450}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${
                        CATEGORY_COLORS[item.category] ?? "bg-ink/10 text-ink/60"
                      }`}
                    >
                      {item.category}
                    </span>
                    <h3 className="mt-2 font-display text-sm font-bold text-ink">{item.title}</h3>
                    <p className="font-devanagari text-xs text-ink/50">{item.titleHindi}</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-10 min-h-[220px] bg-cream/30 border border-dashed border-gold/30">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                    {item.category === "Team" ? (
                      <User size={28} className="text-gold" />
                    ) : (
                      <Store size={28} className="text-gold" />
                    )}
                  </div>
                  <h3 className="font-display text-sm font-bold text-ink">{item.title}</h3>
                  <p className="font-devanagari text-xs text-ink/50 mt-0.5">{item.titleHindi}</p>
                  <span className="mt-3 inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold uppercase">
                    Photo Coming Soon
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-card bg-maroon p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            पूजा सामग्री की जानकारी चाहिए?
          </h2>
          <p className="mt-3 text-cream/70 text-sm max-w-lg mx-auto">
            WhatsApp करें — हम आपको हमारी दुकान की ताज़ी तस्वीरें और पूरी जानकारी भेजेंगे।
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              href={buildWhatsAppLink(
                `नमस्ते ${businessConfig.name} जी, क्या आप मुझे दुकान की पूजा सामग्री की तस्वीरें और जानकारी भेज सकते हैं?`
              )}
              external
              target="_blank"
              variant="whatsapp"
              iconStart={<MessageCircle size={18} />}
            >
              WhatsApp पर संपर्क करें
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
