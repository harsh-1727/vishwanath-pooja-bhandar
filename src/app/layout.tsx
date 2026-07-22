import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import {
  Header,
  Footer,
  FloatingWhatsApp,
  FloatingCall,
  ScrollProgress,
} from "@/components/layout";
import { FloatingSearchButton } from "@/components/search/FloatingSearchButton";
import { CartDrawer, FloatingCartButton } from "@/components/cart";
import { seoConfig, siteConfig } from "@/config";
import { buildThemeCssVariables } from "@/lib/utils/theme-vars";

/**
 * Font loading via next/font/google: self-hosted at build time (no
 * runtime request to Google's CDN — see PROJECT_MASTER.md §13
 * Performance Strategy), automatically subsetted, served with
 * font-display: swap.
 *
 * These three calls MUST stay static/literal — Next.js's font loader
 * is analyzed at build time via a compiler plugin and cannot accept a
 * dynamic font name read from theme.config.ts at runtime. To change
 * fonts for a different business vertical: edit these three imports
 * AND theme.config.ts's `fonts` block (kept there as the
 * human-readable reference other code/docs point to).
 */
const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const devanagariFont = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: seoConfig.titleTemplate,
    default: seoConfig.defaultTitle,
  },
  description: seoConfig.defaultDescription,
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${devanagariFont.variable}`}
    >
      <head>
        {/* Color tokens generated from theme.config.ts at request time —
            see src/lib/utils/theme-vars.ts for why this isn't a static
            CSS file. Content is fully server-controlled config, never
            user input, so this is safe. */}
        <style dangerouslySetInnerHTML={{ __html: buildThemeCssVariables() }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <ScrollProgress />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingSearchButton />
          <FloatingCartButton />
          <CartDrawer />
          <FloatingWhatsApp />
          <FloatingCall />
        </Providers>
      </body>
    </html>
  );
}
