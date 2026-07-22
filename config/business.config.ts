/**
 * config/business.config.ts
 *
 * THE ONLY file that should say "Vishwanath Pooja Bhandar" outside of
 * generated content. Every component reads the name from here — never
 * hardcode it inline. This is what makes the template reusable: swap
 * this file's values for a Jewellery Shop and the entire site rebrands.
 *
 * Source: owner-confirmed project brief (see PROJECT_MASTER.md revision
 * log). The earlier name discrepancy flagged during planning
 * ("Banke Bihari..." in the raw rate-list Excel header) is resolved —
 * the owner has explicitly confirmed "Vishwanath Pooja Bhandar" as
 * correct.
 */

import type { BusinessConfig } from "./types";

export const businessConfig: BusinessConfig = {
  name: "Vishwanath Pooja Bhandar",
  type: "Traditional Family-Owned Puja Samagri Shop",
  vertical: "puja-samagri",
  tagline: "Everything for your puja, trusted for 40+ years.",
  description:
    "Vishwanath Pooja Bhandar is a family-owned puja samagri shop in West Patel Nagar, New Delhi, serving the local community for over 40 years with complete puja kits, individual samagri, festival kits, and puja accessories.",
  yearsInBusiness: "40+ Years",
  hasLogo: false,
  logoPath: null,
};
