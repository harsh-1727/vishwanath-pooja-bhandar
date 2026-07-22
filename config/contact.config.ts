/**
 * config/contact.config.ts
 *
 * Source: owner-confirmed project brief.
 *
 * ASSUMPTION FLAGGED: the owner gave a single daily hours range
 * (9:00 AM – 10:30 PM) with no per-day breakdown. We apply it to all
 * seven days rather than guessing at a weekly closing day, since
 * nothing in any source material mentions one. `WeeklyHours` is
 * structured per-day from day one specifically so that if the owner
 * later says "closed Sundays" or "shorter hours on Mondays," it's a
 * one-line edit here — not a data-model change.
 */

import type { ContactConfig, WeeklyHours } from "./types";

const dailyHours = { open: "09:00", close: "22:30" } as const;

const hours: WeeklyHours = {
  monday: dailyHours,
  tuesday: dailyHours,
  wednesday: dailyHours,
  thursday: dailyHours,
  friday: dailyHours,
  saturday: dailyHours,
  sunday: dailyHours,
};

export const contactConfig: ContactConfig = {
  address: {
    line1: "679, Baba Farid Puri",
    locality: "West Patel Nagar",
    city: "New Delhi",
    region: "Delhi",
    postalCode: null, // not provided — confirm with owner (OWNER_GUIDE.md Q2)
    country: "India",
    geo: null, // no coordinates yet — MapEmbed falls back to address + directions link
  },
  phone: "+91 99900 44346",
  whatsapp: "+91 99900 44346",
  email: null, // not provided
  hours,
  mapEmbedUrl: null, // "Google Maps: Not available yet" — architecture ready, see MapEmbed component (Phase 11)
  googleBusinessProfileUrl: null, // pending OWNER_GUIDE.md Q8
};
