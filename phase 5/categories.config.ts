/**
 * config/categories.config.ts
 *
 * NOT part of the original 9-file config list from the project brief
 * — added deliberately in Phase 5 because the Homepage's CategoryGrid
 * needs a taxonomy to render, and this is genuinely config-shaped
 * data (small, stable, business-defined), unlike the 32-and-growing
 * product catalog in data/products.json.
 *
 * Source: the 6 categories verified during the planning phase's
 * product-database extraction (see PRODUCT_DATABASE.json _meta).
 * Deliberately does NOT include item counts — a count is a fact about
 * the product catalog, not the taxonomy, and hardcoding "32 kits"
 * here would silently go stale the moment the catalog changes.
 * CategoryGrid renders without counts until Phase 6's data-access
 * layer can compute them live from data/products.json.
 */

import type { CategoryConfig } from "./types";

export const categoriesConfig: CategoryConfig[] = [
  {
    slug: "festival-kits",
    nameEnglish: "Festival Kits",
    nameHindi: "त्योहार पूजन सामग्री",
    description:
      "Complete samagri for Navratri, Diwali, Holi, and every major festival through the year.",
    icon: "PartyPopper",
  },
  {
    slug: "vrat-katha-kits",
    nameEnglish: "Vrat & Katha Kits",
    nameHindi: "व्रत एवं कथा सामग्री",
    description:
      "Everything needed for weekly vrat, Purnima, Pradosh, and katha observances.",
    icon: "BookOpen",
  },
  {
    slug: "devta-vishesh-kits",
    nameEnglish: "Devta Vishesh Kits",
    nameHindi: "देवता विशेष पूजन सामग्री",
    description:
      "Dedicated kits for Hanuman, Satyanarayan, Sai Baba, and other specific deity worship.",
    icon: "Sparkles",
  },
  {
    slug: "griha-pravesh-vastu-kits",
    nameEnglish: "Griha Pravesh & Vastu Kits",
    nameHindi: "गृह प्रवेश एवं वास्तु सामग्री",
    description:
      "Samagri for new home, new shop, and new vehicle puja rituals.",
    icon: "Home",
  },
  {
    slug: "samskara-kits",
    nameEnglish: "Samskara Kits",
    nameHindi: "संस्कार पूजन सामग्री",
    description: "Life-ceremony kits, including Mundan puja samagri.",
    icon: "Scissors",
  },
  {
    slug: "graha-shanti-dosh-nivaran-kits",
    nameEnglish: "Graha Shanti & Dosh Nivaran Kits",
    nameHindi: "ग्रह शांति एवं दोष निवारण सामग्री",
    description:
      "Kits for planetary peace rituals, including Kaal Sarp Dosh and Mahamrityunjay path.",
    icon: "Moon",
  },
];
