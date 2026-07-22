/**
 * config/festival.config.ts
 *
 * Source: cross-referenced against PRODUCT_DATABASE.json categories
 * (Festival Kits, Vrat & Katha Kits, Devta Vishesh Kits, etc.) built
 * during the planning phase. `relatedCategorySlugs` values must match
 * the `categorySlug` field added to data/products.json in Phase 2/6 —
 * kept in sync manually for now; Phase 6 adds a validation script
 * that fails the build if a festival references a category that
 * doesn't exist in the product data.
 *
 * IMPORTANT: no exact dates are hardcoded here. Most of these
 * festivals follow the Hindu lunar calendar and shift every year —
 * inventing "Navratri 2026 is on [date]" without verifying it against
 * a real calendar would violate the no-fabrication rule
 * (PROJECT_RULES.md rule 1). The FestivalCalendar component (Phase 10)
 * must source the current year's actual date from a verified calendar
 * data file that gets updated annually — this config only supplies
 * the stable, non-date facts.
 */

import type { FestivalConfig } from "./types";

export const festivalConfig: FestivalConfig[] = [
  {
    slug: "navratri",
    nameHindi: "नवरात्रि",
    nameEnglish: "Navratri",
    typicalMonths: [9, 10],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription:
      "A nine-night festival honoring Goddess Durga, marked with daily puja.",
  },
  {
    slug: "diwali",
    nameHindi: "दिवाली",
    nameEnglish: "Diwali",
    typicalMonths: [10, 11],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription:
      "The festival of lights, centered on Lakshmi Puja, alongside Dhanteras and Govardhan Puja.",
  },
  {
    slug: "ganesh-chaturthi",
    nameHindi: "गणेश चतुर्थी",
    nameEnglish: "Ganesh Chaturthi",
    typicalMonths: [8, 9],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription: "A festival celebrating the birth of Lord Ganesh.",
  },
  {
    slug: "karva-chauth",
    nameHindi: "करवा चौथ",
    nameEnglish: "Karva Chauth",
    typicalMonths: [10, 11],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription:
      "A fasting festival observed by married women for their husbands' wellbeing.",
  },
  {
    slug: "rakshabandhan",
    nameHindi: "रक्षाबंधन",
    nameEnglish: "Raksha Bandhan",
    typicalMonths: [8],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription:
      "A festival celebrating the bond between brothers and sisters.",
  },
  {
    slug: "mahashivratri",
    nameHindi: "महाशिवरात्रि",
    nameEnglish: "Mahashivratri",
    typicalMonths: [2, 3],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription: "A night dedicated to the worship of Lord Shiva.",
  },
  {
    slug: "holi",
    nameHindi: "होली",
    nameEnglish: "Holi",
    typicalMonths: [3],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription: "The festival of colors, beginning with Holika Dahan.",
  },
  {
    slug: "hariyali-teej",
    nameHindi: "हरियाली तीज",
    nameEnglish: "Hariyali Teej",
    typicalMonths: [7, 8],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription:
      "A monsoon festival honoring Goddess Parvati, observed mainly by women.",
  },
  {
    slug: "nag-panchami",
    nameHindi: "नाग पंचमी",
    nameEnglish: "Nag Panchami",
    typicalMonths: [7, 8],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription: "A day dedicated to the worship of snake deities.",
  },
  {
    slug: "janmashtami",
    nameHindi: "जन्माष्टमी",
    nameEnglish: "Krishna Janmashtami",
    typicalMonths: [8, 9],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription: "A festival celebrating the birth of Lord Krishna.",
  },
  {
    slug: "makar-sankranti",
    nameHindi: "संक्रांति",
    nameEnglish: "Makar Sankranti",
    typicalMonths: [1],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription:
      "A harvest festival marking the sun's transition into Capricorn.",
  },
  {
    slug: "tulsi-vivah",
    nameHindi: "तुलसी विवाह",
    nameEnglish: "Tulsi Vivah",
    typicalMonths: [11],
    requiresAnnualDateConfirmation: true,
    relatedCategorySlugs: ["festival-kits"],
    shortDescription:
      "A ceremony marking the ritual marriage of the Tulsi plant.",
  },
];
