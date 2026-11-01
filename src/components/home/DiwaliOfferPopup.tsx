"use client";

/**
 * src/components/home/DiwaliOfferPopup.tsx
 *
 * Premium Diwali 20% OFF promotional popup for Vishwanath Pooja Bhandar.
 *
 * Behaviour:
 *  - Auto-shows on homepage load after a short delay.
 *  - Visitor can close with the X button → popup hides, page stays.
 *  - A floating "Diwali Offer – 20% OFF" badge lets them reopen anytime.
 *  - Clicking "Claim Your 20% OFF" reveals the registration form inside
 *    the popup (no redirect, no new window until WhatsApp submit).
 *  - On submission, builds a WhatsApp pre-filled message and opens it;
 *    customer must manually tap Send in WhatsApp.
 *
 * Limitations (honest):
 *  - One-time-per-mobile enforcement is NOT technically implemented here.
 *  - The shop must manually verify eligibility and maintain their own log.
 */

import { useState, useEffect, useRef, useId, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { X, MessageCircle, Tag, Flame, ChevronDown } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";

/* ─── auto-show delay ──────────────────────────────────────────── */
const SHOW_DELAY_MS = 1800;

/* ─── Registration form ─────────────────────────────────────────── */
function RegistrationForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [consent, setConsent] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  function validatePhone(value: string): string {
    if (value.length === 0) return "Mobile number is required.";
    if (value.length < 10) return "Enter a valid 10-digit mobile number.";
    if (!/^[6-9]/.test(value)) return "Mobile number must start with 6, 7, 8 or 9.";
    return "";
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digits);
    if (phoneError) setPhoneError(validatePhone(digits));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const error = validatePhone(phone);
    if (error) {
      setPhoneError(error);
      return;
    }

    const message = [
      "Namaste Vishwanath Pooja Bhandar 🙏",
      "",
      "I would like to register my details for the Diwali 20% discount offer.",
      `Name: ${name.trim()}`,
      `Mobile: +91 ${phone.trim()}`,
      `Interested in: ${interest.trim() || "Not specified"}`,
      "",
      "I understand the offer is valid on purchases above ₹1,000 and can be redeemed once per mobile number, subject to store confirmation.",
      "Please confirm my offer eligibility.",
    ].join("\n");

    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="popup-offer-name" className="block text-sm font-semibold text-ink">
          Your full name <span className="text-maroon">*</span>
        </label>
        <input
          id="popup-offer-name"
          name="name"
          autoComplete="name"
          required
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="mt-1.5 h-11 w-full rounded-xl border border-ink/15 px-4 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/15"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="popup-offer-phone" className="block text-sm font-semibold text-ink">
          Mobile number <span className="text-maroon">*</span>
        </label>
        <div
          className={`mt-1.5 flex h-11 overflow-hidden rounded-xl border transition ${
            phoneError
              ? "border-red-400 ring-2 ring-red-100"
              : "border-ink/15 focus-within:border-saffron focus-within:ring-2 focus-within:ring-saffron/15"
          }`}
        >
          <span className="flex items-center border-r border-ink/10 bg-cream/60 px-3 text-sm font-semibold text-ink/65">
            +91
          </span>
          <input
            id="popup-offer-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required
            minLength={10}
            maxLength={10}
            value={phone}
            onChange={handlePhoneChange}
            onBlur={() => setPhoneError(validatePhone(phone))}
            placeholder="10-digit mobile number"
            className="min-w-0 flex-1 px-3 text-sm outline-none"
          />
        </div>
        {phoneError && (
          <p className="mt-1 text-xs text-red-500">{phoneError}</p>
        )}
      </div>

      {/* Interest (optional) */}
      <div>
        <label htmlFor="popup-offer-interest" className="block text-sm font-semibold text-ink">
          Interested in{" "}
          <span className="text-xs font-normal text-ink/50">(optional)</span>
        </label>
        <input
          id="popup-offer-interest"
          name="interest"
          maxLength={100}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="e.g. Diwali Poojan Kit, puja samagri"
          className="mt-1.5 h-11 w-full rounded-xl border border-ink/15 px-4 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/15"
        />
      </div>

      {/* Consent */}
      <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-ink/65">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#25a65a]"
        />
        I agree to share these details with Vishwanath Pooja Bhandar via WhatsApp
        for this promotional offer.
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={!consent}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-bold text-white transition hover:bg-whatsapp/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <MessageCircle size={18} aria-hidden="true" />
        Continue to WhatsApp
      </button>

      <p className="text-center text-[11px] leading-4 text-ink/45">
        Offer valid strictly above ₹1,000. One redemption per mobile number,
        subject to shop verification. WhatsApp opens with your message — tap
        Send to submit.
      </p>
    </form>
  );
}

/* ─── Main Popup ─────────────────────────────────────────────────── */
export function DiwaliOfferPopup() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Mount guard for SSR / portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-show after SHOW_DELAY_MS on first mount unless already dismissed
  useEffect(() => {
    if (!mounted) return;
    try {
      if (sessionStorage.getItem("vpb_diwali_offer_dismissed")) return;
    } catch {
      // ignore if sessionStorage is unavailable
    }
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [mounted]);

  // Focus close button when popup opens; return focus to badge on close
  useEffect(() => {
    if (!open) return undefined;

    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.setAttribute("data-drawer-open", "true");
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = prev;
      document.body.removeAttribute("data-drawer-open");
      badgeRef.current?.focus();
    };
  }, [open]);

  // Keyboard: Escape closes
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClose() {
    try {
      sessionStorage.setItem("vpb_diwali_offer_dismissed", "1");
    } catch {
      // ignore
    }
    setOpen(false);
    setShowForm(false);
  }

  function handleSuccess() {
    setSubmitted(true);
  }

  if (!mounted) return null;

  return (
    <>
      {/* ── Floating Offer Badge (always visible after first close) ── */}
      <button
        ref={badgeRef}
        type="button"
        onClick={() => {
          setOpen(true);
          setShowForm(false);
          setSubmitted(false);
        }}
        aria-label="Reopen Diwali 20% OFF offer"
        className={`
          floating-fab fixed bottom-24 right-4 z-50
          flex items-center gap-2 rounded-full
          bg-gradient-to-r from-maroon to-[#b5451b]
          px-4 py-2.5 text-xs font-bold text-white shadow-lg
          ring-2 ring-white/30
          transition-all duration-300 hover:scale-105 hover:shadow-xl
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron
          sm:bottom-8 sm:right-6
          ${open ? "pointer-events-none opacity-0 scale-90" : "opacity-100 scale-100"}
        `}
      >
        <Flame size={14} aria-hidden="true" className="text-[#ffd700]" />
        Diwali Offer – 20% OFF
      </button>

      {/* ── Portal: Overlay + Modal ─────────────────────────────── */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
              aria-hidden="true"
              onClick={handleClose}
            />

            {/* Modal panel */}
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="
                relative z-10 w-full max-w-md
                max-h-[92dvh] overflow-y-auto
                rounded-2xl shadow-2xl
                bg-white
                animate-fade-in
              "
            >
              {/* ── Festive Header ──────────────────────────────── */}
              <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-maroon via-[#9e2a1a] to-[#5c1710] px-6 pb-8 pt-6 text-white">
                {/* Decorative circles */}
                <span className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
                <span className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/5" />

                {/* Close button */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleClose}
                  aria-label="Close offer popup"
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white/80 transition hover:bg-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <X size={16} aria-hidden="true" />
                </button>

                {/* Badge pill */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ffd700]/40 bg-[#ffd700]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#ffd700]">
                  <Tag size={11} aria-hidden="true" /> Vishwanath Pooja Bhandar
                </span>

                {/* Headline */}
                <h2 id={titleId} className="mt-3 font-display text-2xl font-bold uppercase tracking-wider text-[#ffd79b] sm:text-3xl">
                  DIWALI SPECIAL OFFER
                </h2>
                <p className="mt-1 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  GET FLAT 20% OFF
                </p>
                <p className="mt-2 text-sm font-semibold text-white/95 sm:text-base">
                  On purchases above ₹1,000
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Celebrate this Diwali with authentic poojan samagri and kits from Vishwanath
                  Pooja Bhandar — serving devotees for 40+ years in West Patel Nagar, Delhi.
                </p>

                {/* Decorative diya emoji strip */}
                <p className="mt-4 text-base tracking-widest opacity-40">
                  🪔 🪔 🪔 🪔 🪔
                </p>
              </div>

              {/* ── Body ────────────────────────────────────────── */}
              <div className="px-6 pb-6">
                {submitted ? (
                  /* ── Success state ── */
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                      <MessageCircle size={28} className="text-whatsapp" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink">
                      Message opened in WhatsApp!
                    </h3>
                    <p className="mt-2 text-sm text-ink/60">
                      Please tap <strong>Send</strong> in WhatsApp to complete your
                      registration. Our team will confirm your offer eligibility shortly.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-ink/15 px-6 text-sm font-semibold text-ink transition hover:bg-ink/5"
                    >
                      Continue shopping
                    </button>
                  </div>
                ) : !showForm ? (
                  /* ── Offer teaser ── */
                  <div className="py-5">
                    <ul className="space-y-2 text-sm text-ink/75">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-saffron">✓</span>
                        Flat <strong className="text-ink">20% discount</strong> on total purchases above ₹1,000
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-saffron">✓</span>
                        Valid on <strong className="text-ink">all Diwali Poojan Kits</strong> and puja samagri
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-saffron">✓</span>
                        One redemption per mobile number
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-saffron">✓</span>
                        Shop confirms eligibility — no automatic coupon
                      </li>
                    </ul>

                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-maroon to-[#b5451b] px-5 text-sm font-bold text-white shadow-md transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/60"
                    >
                      Claim Your 20% OFF
                      <ChevronDown size={16} aria-hidden="true" />
                    </button>

                    <p className="mt-3 text-center text-[11px] text-ink/40">
                      No coupon generated. Register via WhatsApp — shop verifies manually.
                    </p>
                  </div>
                ) : (
                  /* ── Registration form ── */
                  <div className="pt-1">
                    <h3 className="mt-4 font-display text-lg font-bold text-ink">
                      Register for the Offer
                    </h3>
                    <p className="mt-0.5 text-sm text-ink/55">
                      Your details will open in WhatsApp — tap Send to submit.
                    </p>
                    <RegistrationForm onSuccess={handleSuccess} />
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
