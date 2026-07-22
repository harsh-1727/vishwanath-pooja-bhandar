import type { Metadata } from "next";
import { businessConfig, contactConfig } from "@/config";
import { buildWhatsAppLink, buildTelLink } from "@/lib/utils/contact-links";
import { formatWeeklyHours } from "@/lib/utils/format-hours";
import { Button } from "@/components/ui";
import { MessageCircle, MapPin, Phone, Clock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Vishwanath Pooja Bhandar, West Patel Nagar Delhi",
  description:
    "40+ years of serving Delhi's families with authentic, pure pooja samagri. Family-run store in West Patel Nagar, New Delhi. Complete puja kits, loose samagri, brass & copper items.",
};

const WHY_CHOOSE = [
  {
    icon: "🪔",
    title: "40+ साल का भरोसा",
    subtitle: "40+ Years of Trust",
    body: "Established in the 1980s, Vishwanath Pooja Bhandar has been a beloved name in West Patel Nagar for four generations. Thousands of families from Delhi NCR, Haryana, and UP have trusted us for every major festival and daily pooja.",
  },
  {
    icon: "🌸",
    title: "शुद्ध सामग्री",
    subtitle: "100% Pure Samagri",
    body: "We source directly from trusted suppliers in Vrindavan, Haridwar, Mathura, and Ujjain. Every item — from bhimsaini kapoor to pure cow ghee batti — is verified for purity before stocking. No adulterants. No shortcuts.",
  },
  {
    icon: "🎁",
    title: "सम्पूर्ण पूजा किट",
    subtitle: "Complete Puja Kits",
    body: "Our ready-made festival kits include every single item needed for the complete vidhi — nothing missing. Navratri, Diwali, Satyanarayan Katha, Ganesh Puja, Grih Pravesh, Mundan, Janamdin — we have a kit for every occasion.",
  },
  {
    icon: "📖",
    title: "विशेषज्ञ मार्गदर्शन",
    subtitle: "Expert Guidance",
    body: "Not sure what samagri you need? Our knowledgeable staff will guide you step-by-step based on your specific puja vidhi, deity, and regional tradition. We have helped customers from all communities — Punjabi, Gujarati, Marwari, South Indian.",
  },
  {
    icon: "🏠",
    title: "परिवारिक व्यवसाय",
    subtitle: "Family-Run Business",
    body: "We are not a corporate store. We are a family. The same family that served your grandparents serves you today. We remember your preferences, respect your traditions, and treat every customer with personal care.",
  },
  {
    icon: "📱",
    title: "WhatsApp से आर्डर",
    subtitle: "Easy WhatsApp Orders",
    body: "Can't visit the store? No problem. Message us on WhatsApp with your puja date, deity, and occasion. We will pack the complete samagri and arrange for delivery or pickup. Festival orders accepted in advance.",
  },
];

const ITEMS_WE_STOCK = [
  { category: "पूजा सामग्री", items: "कपूर • रोली • कुमकुम • सिंदूर • हल्दी • मोली • जनेऊ • गंगाजल • पंचामृत" },
  { category: "धूप-दीप", items: "अगरबत्ती • धूपबत्ती • लोबान • गुग्गुल • सांभरानी • देशी घी की बाती" },
  { category: "पूजा किट", items: "नवरात्रि किट • दीपावली किट • सत्यनारायण किट • गणेश पूजा किट • गृह प्रवेश किट" },
  { category: "धातु के सामान", items: "पीतल के दीये • तांबे का कलश • घंटी • थाली • पंचपात्र • आरती की थाली" },
  { category: "हवन सामग्री", items: "हवन कुंड • हवन सामग्री • समिधा • आम की लकड़ी • सूखे मेवे • घी" },
  { category: "माला और फूल", items: "रुद्राक्ष माला • तुलसी माला • चंदन माला • गेंदे के फूल • कमल" },
];

export default function AboutPage() {
  const addressQuery = encodeURIComponent(
    businessConfig.name + ", " + contactConfig.address.line1 + ", " + contactConfig.address.locality + ", " + contactConfig.address.city
  );
  const directionsHref = "https://www.google.com/maps/search/?api=1&query=" + addressQuery;

  return (
    <main className="bg-cream min-h-screen">

      {/* HERO BANNER */}
      <section className="bg-maroon py-16 sm:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-8 text-center">
          <p className="inline-block rounded-sm bg-saffron px-4 py-1 text-xs font-bold text-white uppercase tracking-widest mb-6">
            Since 1980s • West Patel Nagar, New Delhi
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            विश्वनाथ पूजा भंडार
          </h1>
          <p className="mt-2 font-devanagari text-xl text-saffron">
            West Patel Nagar, New Delhi की प्रतिष्ठित पूजा सामग्री की दुकान
          </p>
          <p className="mt-6 text-cream/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            For over <strong>40 years</strong>, we have been the most trusted name for authentic, pure, and complete
            pooja samagri in Delhi. Every family. Every festival. Every tradition.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <span className="text-saffron font-bold uppercase text-xs tracking-widest">हमारी कहानी</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-ink font-bold">Our Story</h2>
            <div className="mt-6 space-y-5">
              <p className="text-ink/90 text-sm sm:text-base leading-relaxed">
                Vishwanath Pooja Bhandar was founded with a simple dream — to provide Delhi&apos;s households with the purest, most authentic pooja samagri at honest prices. What started as a small shop in West Patel Nagar grew into a landmark that generations of families have come to rely upon.
              </p>
              <div className="bg-saffron/5 p-5 rounded-xl border border-saffron/20 font-devanagari text-lg text-maroon font-semibold leading-relaxed shadow-sm">
                &ldquo;हमारे यहाँ शादी ब्याह, पूजा पाठ, भात, कुआँ पूजन, माईला, चाक, लगन पत्रिका, बत्तीसी, गणेश जी का पाना, मुहुर्त, एवम् सभी भगवानों के वस्त्र होलसेल रेट पर मिलते है। कान्हा जी का सभी वस्त्र, साथ श्रृंगार उपलब्ध है।&rdquo;
              </div>
              <p className="text-ink/90 text-sm sm:text-base leading-relaxed">
                Over four decades, we have served countless families. We know every deity&apos;s preferences, every festival&apos;s samagri list, and every community&apos;s unique traditions. We still source directly from trusted suppliers and greet every customer by name.
              </p>
            </div>
          </div>

          {/* Our Values Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "40+", desc: "Years Serving Delhi" },
              { label: "100%", desc: "Pure & Authentic" },
              { label: "500+", desc: "Samagri Items" },
              { label: "50+", desc: "Festival Kits" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-card border border-gold/20 bg-white p-6 text-center shadow-sm"
              >
                <p className="font-display text-4xl font-bold text-saffron">{stat.label}</p>
                <p className="mt-1 text-xs font-semibold text-ink/60 uppercase tracking-wide">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-cream/50 py-16 border-t border-ink/5">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-saffron font-bold uppercase text-xs tracking-widest">हमें क्यों चुनें</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-ink font-bold">Why Choose Us</h2>
            <p className="mt-3 text-ink/60 max-w-xl mx-auto text-sm sm:text-base">
              Because your puja deserves the best — the purest ingredients, the complete samagri, and the guidance of 40 years of experience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.title}
                className="rounded-card border border-ink/8 bg-cream/40 p-6 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-3 font-devanagari text-lg font-bold text-ink">{item.title}</h3>
                <p className="text-xs text-saffron font-semibold uppercase tracking-wide">{item.subtitle}</p>
                <p className="mt-3 text-sm text-ink leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE STOCK */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-8 py-16">
        <div className="text-center mb-10">
          <span className="text-saffron font-bold uppercase text-xs tracking-widest">हमारी दुकान में</span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl text-ink font-bold">What We Stock</h2>
          <p className="mt-3 text-ink/60 text-sm max-w-lg mx-auto">
            A comprehensive range of puja samagri for every deity, every festival, every occasion.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS_WE_STOCK.map((group) => (
            <div
              key={group.category}
              className="rounded-card border border-gold/20 bg-white p-5 shadow-sm"
            >
              <h3 className="font-devanagari text-base font-bold text-ink border-b border-saffron/20 pb-2 mb-3">
                {group.category}
              </h3>
              <p className="font-devanagari text-xs text-ink/60 leading-relaxed">{group.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VISIT US */}
      <section className="bg-maroon py-14">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-6">आज ही मिलें</h2>
              <dl className="space-y-5">
                <div className="flex gap-4 items-start">
                  <MapPin className="text-saffron shrink-0 mt-1" size={20} />
                  <div>
                    <dt className="text-xs font-bold text-saffron uppercase tracking-wide mb-1">Address / पता</dt>
                    <dd className="text-cream/80 text-sm">
                      {contactConfig.address.line1}, {contactConfig.address.locality},{" "}
                      {contactConfig.address.city}, {contactConfig.address.region}
                    </dd>
                    <a
                      href={directionsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-semibold text-saffron hover:underline"
                    >
                      Google Maps पर देखें →
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Clock className="text-saffron shrink-0 mt-1" size={20} />
                  <div>
                    <dt className="text-xs font-bold text-saffron uppercase tracking-wide mb-1">Opening Hours</dt>
                    <dd className="text-cream/80 text-sm">{formatWeeklyHours(contactConfig.hours)}</dd>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Phone className="text-saffron shrink-0 mt-1" size={20} />
                  <div>
                    <dt className="text-xs font-bold text-saffron uppercase tracking-wide mb-1">Phone / फ़ोन</dt>
                    <dd>
                      <a href={buildTelLink()} className="text-cream/80 text-sm hover:text-white">
                        {contactConfig.phone}
                      </a>
                    </dd>
                  </div>
                </div>
                {contactConfig.email && (
                  <div className="flex gap-4 items-start">
                    <Mail className="text-saffron shrink-0 mt-1" size={20} />
                    <div>
                      <dt className="text-xs font-bold text-saffron uppercase tracking-wide mb-1">Email</dt>
                      <dd>
                        <a href={`mailto:${contactConfig.email}`} className="text-cream/80 text-sm hover:text-white">
                          {contactConfig.email}
                        </a>
                      </dd>
                    </div>
                  </div>
                )}
              </dl>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-cream/70 text-sm leading-relaxed">
                Visit us personally at our West Patel Nagar store — or message us on WhatsApp for orders,
                queries, and custom puja kit requests. Festival season orders should be placed 3-5 days in advance.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  href={buildWhatsAppLink(
                    `नमस्ते ${businessConfig.name} जी, मुझे पूजा सामग्री के बारे में जानकारी चाहिए।`
                  )}
                  external
                  target="_blank"
                  variant="whatsapp"
                  iconStart={<MessageCircle size={18} />}
                >
                  WhatsApp पर संपर्क करें
                </Button>
                <Button href={buildTelLink()} external variant="outline">
                  अभी कॉल करें
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
