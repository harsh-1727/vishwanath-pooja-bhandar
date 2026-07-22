/**
 * config/types.ts
 *
 * Shared type contracts for every file in config/. This is what makes
 * config/ safe to hand to a non-framework-expert (or to "future me"
 * building a Sweet Shop site): every config file is checked against
 * an explicit interface, so a missing or mistyped field fails
 * `npm run typecheck` immediately instead of surfacing as a blank
 * section in production.
 *
 * Nothing in this file is business-specific. It never needs to change
 * when reusing the template for a different vertical.
 */

// ─────────────────────────────────────────────────────────────────
// Business
// ─────────────────────────────────────────────────────────────────

export type BusinessVertical =
  | "puja-samagri"
  | "jewellery"
  | "sweets"
  | "gifts"
  | "medical"
  | "flowers"
  | "books"
  | "clothing"
  | "furniture";

export interface BusinessConfig {
  /** Legal/display name of the business. Shown in header, footer, metadata. */
  name: string;
  /** Short category label, e.g. "Traditional Family-Owned Puja Samagri Shop" */
  type: string;
  /** Which reusable vertical this instance is configured for. Drives feature.config.ts gating. */
  vertical: BusinessVertical;
  /** One-line tagline used in hero and meta description fallback. */
  tagline: string;
  /** 2-3 sentence description used in About teaser and SEO fallback. */
  description: string;
  /**
   * How long the business has operated, as stated by the owner.
   * Kept as a free-text string ("40+ Years") rather than a computed
   * founding year, because we were only given an approximate figure —
   * inventing an exact founding year would violate the project's
   * no-fabrication rule (see PROJECT_RULES.md rule 1).
   */
  yearsInBusiness: string;
  /** True until the owner supplies a logo asset. Drives <Logo /> fallback rendering. */
  hasLogo: boolean;
  /** Path under /public once a real logo exists. Null while hasLogo is false. */
  logoPath: string | null;
}

// ─────────────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────────────

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface DayHours {
  open: string; // 24hr "HH:mm"
  close: string; // 24hr "HH:mm"
  closed?: false;
}

export interface DayClosed {
  closed: true;
}

export type DaySchedule = DayHours | DayClosed;

export type WeeklyHours = Record<DayOfWeek, DaySchedule>;

export interface Address {
  line1: string;
  locality: string;
  city: string;
  region: string;
  postalCode: string | null;
  country: string;
  /** Set once the owner provides coordinates or a Maps listing to geocode. */
  geo: { lat: number; lng: number } | null;
}

export interface ContactConfig {
  address: Address;
  phone: string;
  whatsapp: string;
  email: string | null;
  hours: WeeklyHours;
  /**
   * Full Google Maps embed URL. Null until the owner shares a listing
   * (see OWNER_GUIDE.md Q8). MapEmbed renders an address + "Get
   * Directions" link fallback whenever this is null — never a broken
   * iframe.
   */
  mapEmbedUrl: string | null;
  googleBusinessProfileUrl: string | null;
}

// ─────────────────────────────────────────────────────────────────
// Theme
// ─────────────────────────────────────────────────────────────────

export interface ColorToken {
  /** Human-readable hex, for docs/design handoff. */
  hex: string;
  /** "R G B" space-separated triplet, consumed by globals.css as a CSS var for Tailwind's <alpha-value> pattern. */
  rgb: string;
}

export interface ThemeConfig {
  colors: {
    surface: ColorToken;
    cream: ColorToken;
    saffron: ColorToken;
    gold: ColorToken;
    ink: ColorToken;
    whatsapp: ColorToken;
  };
  fonts: {
    display: string;
    body: string;
    devanagari: string;
  };
}

// ─────────────────────────────────────────────────────────────────
// Site / SEO
// ─────────────────────────────────────────────────────────────────

export interface SiteConfig {
  url: string;
  locale: string;
  defaultLocale: string;
  supportedLocales: string[];
}

export interface SeoConfig {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  twitterHandle: string | null;
}

// ─────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "youtube"
  | "twitter";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface NavigationConfig {
  main: NavItem[];
  footer: NavItem[];
  /**
   * Empty until the owner has real profiles (see OWNER_GUIDE.md).
   * The footer component simply omits the social section when this
   * array is empty — no dead/placeholder icons ever render.
   */
  socialLinks: SocialLink[];
}

// ─────────────────────────────────────────────────────────────────
// Festivals
// ─────────────────────────────────────────────────────────────────

export interface FestivalConfig {
  slug: string;
  nameHindi: string;
  nameEnglish: string;
  /** Approximate month(s) the festival typically falls in — for calendar ordering, not exact scheduling. */
  typicalMonths: number[];
  /**
   * Most Hindu festival dates follow the lunar calendar and shift
   * every year. We deliberately do NOT hardcode a specific date here
   * — inventing one would violate the no-fabrication rule. Instead
   * this flag signals that Phase 10's FestivalCalendar component must
   * pull the current year's confirmed date from an external source or
   * an annually-updated data file, never guess it.
   */
  requiresAnnualDateConfirmation: true;
  /** Product category slugs (from data/products.json) relevant to this festival. */
  relatedCategorySlugs: string[];
  shortDescription: string;
}

// ─────────────────────────────────────────────────────────────────
// Categories (taxonomy — distinct from product catalog)
// ─────────────────────────────────────────────────────────────────

export interface CategoryConfig {
  slug: string;
  nameEnglish: string;
  nameHindi: string;
  description: string;
  /** Lucide icon name — mapped explicitly in CategoryGrid, not dynamic lookup. */
  icon: string;
}

// ─────────────────────────────────────────────────────────────────
// Feature flags
// ─────────────────────────────────────────────────────────────────

export interface FeatureFlags {
  smartSearch: boolean;
  findMyPujaKit: boolean;
  festivalCalendar: boolean;
  needMultipleItems: boolean;
  compareKits: boolean;
  relatedProducts: boolean;
  frequentlyBoughtTogether: boolean;
  recentlyViewed: boolean;
  whatsInsideKit: boolean;
  shortPujaGuide: boolean;
  stickyWhatsapp: boolean;
  stickyCall: boolean;
  floatingSearch: boolean;
  scrollProgress: boolean;
  shareProduct: boolean;
  copyPhone: boolean;
  copyAddress: boolean;
  gallery: boolean;
  faq: boolean;
}
