/**
 * config/navigation.config.ts
 *
 * Source: sitemap defined in PROJECT_MASTER.md §4.
 * `socialLinks` is intentionally empty — see OWNER_GUIDE.md ("Social
 * Media: Currently none. Keep the architecture ready but hide social
 * links until configured."). The Footer component checks
 * `socialLinks.length > 0` before rendering that section at all, so
 * no empty/placeholder icons ever ship.
 */

import type { NavigationConfig } from "./types";

export const navigationConfig: NavigationConfig = {
  main: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Festivals", href: "/festivals" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  footer: [
    { label: "About Us", href: "/about" },
    { label: "All Products", href: "/products" },
    { label: "Festival Calendar", href: "/festivals" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  socialLinks: [],
};
