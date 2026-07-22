/**
 * config/theme.config.ts
 *
 * Source: BRAND_GUIDELINES.md color palette and typography spec.
 * `rgb` triplets are consumed by globals.css (Phase 4) to set CSS
 * custom properties that tailwind.config.ts references via the
 * `rgb(var(--x) / <alpha-value>)` pattern — this is what lets Tailwind
 * utilities like `bg-saffron/50` work with real opacity control.
 *
 * To reuse this template for another vertical, replace every value in
 * this file. Nothing elsewhere in the codebase should contain a raw
 * hex color — that's a code-review red flag per PROJECT_RULES.md.
 */

import type { ThemeConfig } from "./types";

export const themeConfig: ThemeConfig = {
  colors: {
    surface: { hex: "#FFFFFF", rgb: "255 255 255" },
    cream: { hex: "#F7F1E6", rgb: "247 241 230" },
    saffron: { hex: "#E8934A", rgb: "232 147 74" },
    gold: { hex: "#C9A24B", rgb: "201 162 75" },
    ink: { hex: "#3A2A1E", rgb: "58 42 30" },
    // Functional only — reserved for WhatsApp CTA, never decorative use.
    whatsapp: { hex: "#25D366", rgb: "37 211 102" },
  },
  fonts: {
    // Heritage-warm serif for headings — see BRAND_GUIDELINES.md Typography.
    display: "Fraunces",
    // Clean, fast-loading sans for body/UI text.
    body: "Inter",
    // Real, indexable Devanagari web font — never rendered as an image.
    devanagari: "Noto Sans Devanagari",
  },
};
