/**
 * config/feature.config.ts
 *
 * Every premium feature from PROJECT_MASTER.md §10, as an explicit
 * on/off switch. This is the mechanism that keeps puja-specific
 * features (Find My Puja Kit, deity-based search, Festival Calendar)
 * from leaking into a future Jewellery Shop or Medical Store build —
 * that build's feature.config.ts simply sets those to false rather
 * than the codebase needing `if (vertical === 'puja-samagri')` checks
 * scattered through components.
 *
 * All true for this build, since every listed feature was explicitly
 * requested for Vishwanath Pooja Bhandar.
 */

import type { FeatureFlags } from "./types";

export const featureConfig: FeatureFlags = {
  smartSearch: true,
  findMyPujaKit: true,
  festivalCalendar: true,
  needMultipleItems: true,
  compareKits: true,
  relatedProducts: true,
  frequentlyBoughtTogether: true,
  recentlyViewed: true,
  whatsInsideKit: true,
  shortPujaGuide: true,
  stickyWhatsapp: true,
  stickyCall: true,
  floatingSearch: true,
  scrollProgress: true,
  shareProduct: true,
  copyPhone: true,
  copyAddress: true,
  gallery: true,
  faq: true,
};
