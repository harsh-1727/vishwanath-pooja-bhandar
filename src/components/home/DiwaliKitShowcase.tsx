"use client";

import { useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, PlayCircle, Tag } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";

const videos = [
  {
    id: "51-items",
    title: "Diwali Poojan Kit",
    subtitle: "51 Items",
    src: "/videos/diwali-51-items.mp4",
    poster: "/images/kits/diwali-51-poster.jpg",
  },
  {
    id: "25-items",
    title: "Diwali Poojan Kit",
    subtitle: "25 Items",
    src: "/videos/diwali-25-items.mp4",
    poster: "/images/kits/diwali-25-poster.jpg",
  },
];

function DiwaliVideoCarousel() {
  const [active, setActive] = useState(0);
  const current = videos[active];

  const previous = () => setActive((value) => (value - 1 + videos.length) % videos.length);
  const next = () => setActive((value) => (value + 1) % videos.length);

  if (!current) return null;

  return (
    <div className="relative mx-auto max-w-sm">
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-lg">
        <div className="relative aspect-[9/16] bg-ink">
          <video
            key={current.id}
            className="h-full w-full object-contain"
            controls
            playsInline
            preload="metadata"
            poster={current.poster}
          >
            <source src={current.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <span className="absolute left-3 top-3 rounded-full bg-maroon px-3 py-1 text-xs font-bold text-white shadow">
            {current.subtitle}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 p-4">
          <div>
            <h3 className="font-display text-lg font-bold text-ink">{current.title}</h3>
            <p className="text-sm text-ink/55">{active + 1} of {videos.length} videos</p>
          </div>
          <a
            href={buildWhatsAppLink(`Namaste, I am interested in the Diwali Poojan Kit with ${current.subtitle}. Please share details.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-whatsapp px-3 py-2 text-xs font-bold text-white hover:bg-whatsapp/90"
          >
            <MessageCircle size={15} aria-hidden="true" /> Enquire
          </a>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button type="button" onClick={previous} aria-label="Previous Diwali kit video" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-ink hover:border-saffron hover:text-saffron">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2" aria-label="Choose video">
          {videos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${video.subtitle} video`}
              aria-current={active === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all ${active === index ? "w-7 bg-saffron" : "w-2.5 bg-ink/20"}`}
            />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Next Diwali kit video" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-ink hover:border-saffron hover:text-saffron">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function DiscountRegistration() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [consent, setConsent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = [
      "Namaste Vishwanath Pooja Bhandar 🙏",
      "",
      "I would like to register my details for the 20% discount offer.",
      `Name: ${name.trim()}`,
      `Mobile: +91 ${phone.trim()}`,
      `Interested in: ${interest.trim() || "Not specified"}`,
      "",
      "I understand the offer is valid on purchases above ₹1,000 and can be redeemed once per mobile number, subject to store confirmation.",
      "Please confirm my offer eligibility.",
    ].join("\n");

    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="diwali-offer" className="bg-gradient-to-br from-maroon to-[#6d241e] py-14 text-white">
      <div className="mx-auto grid max-w-screen-xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
            <Tag size={14} /> CUSTOMER SPECIAL
          </span>
          <p className="mt-5 font-devanagari text-sm font-semibold text-[#f7d99b]">आपके लिए विशेष छूट</p>
          <h2 className="mt-1 font-display text-4xl font-bold sm:text-5xl">20% OFF</h2>
          <p className="mt-3 max-w-md text-lg font-semibold text-white">On purchases above ₹1,000</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
            Share your details on WhatsApp to request your offer. Valid once per mobile number; the shop will confirm eligibility and redemption.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-white/65">
            <PlayCircle size={16} /> Watch the Diwali kits and register for the offer.
          </div>
        </div>

        <form onSubmit={submit} className="rounded-2xl bg-white p-5 text-ink shadow-2xl sm:p-7">
          <h3 className="font-display text-2xl font-bold">Claim your 20% discount</h3>
          <p className="mt-1 text-sm text-ink/55">Your details will open in a WhatsApp message to our shop.</p>

          <label htmlFor="offer-name" className="mt-5 block text-sm font-semibold">Your name</label>
          <input
            id="offer-name"
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
            className="mt-1.5 h-12 w-full rounded-xl border border-ink/15 px-4 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/15"
          />

          <label htmlFor="offer-phone" className="mt-4 block text-sm font-semibold">Mobile number</label>
          <div className="mt-1.5 flex h-12 overflow-hidden rounded-xl border border-ink/15 focus-within:border-saffron focus-within:ring-2 focus-within:ring-saffron/15">
            <span className="flex items-center border-r border-ink/10 bg-cream/60 px-3 text-sm font-semibold text-ink/65">+91</span>
            <input
              id="offer-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              minLength={10}
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              title="Enter a valid 10-digit Indian mobile number"
              value={phone}
              onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10-digit mobile number"
              className="min-w-0 flex-1 px-3 text-sm outline-none"
            />
          </div>

          <label htmlFor="offer-interest" className="mt-4 block text-sm font-semibold">Interested in (optional)</label>
          <input
            id="offer-interest"
            name="interest"
            maxLength={100}
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
            placeholder="e.g. Diwali kit, puja samagri"
            className="mt-1.5 h-12 w-full rounded-xl border border-ink/15 px-4 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/15"
          />

          <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-ink/65">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#25a65a]"
            />
            I agree to share these details with Vishwanath Pooja Bhandar via WhatsApp for this offer.
          </label>

          <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-bold text-white transition hover:bg-whatsapp/90">
            <MessageCircle size={18} aria-hidden="true" /> Continue to WhatsApp
          </button>
          <p className="mt-3 text-center text-[11px] leading-4 text-ink/45">
            Offer valid on purchases strictly above ₹1,000. One redemption per mobile number. WhatsApp opens with your message; tap Send to submit it.
          </p>
        </form>
      </div>
    </section>
  );
}

export function DiwaliKitShowcase() {
  return (
    <>
      <section className="bg-cream/35 py-14">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">Festival collection</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">Diwali Poojan Kits</h2>
            <p className="mt-2 text-sm text-ink/60">See our 51-item and 25-item kit options.</p>
          </div>
          <DiwaliVideoCarousel />
        </div>
      </section>
      <DiscountRegistration />
    </>
  );
}
