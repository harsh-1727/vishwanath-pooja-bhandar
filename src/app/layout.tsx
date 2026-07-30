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
import { Analytics } from "@/components/shared";
import { seoConfig, siteConfig, businessConfig, contactConfig } from "@/config";
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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": businessConfig.name,
  "description": businessConfig.description,
  "url": siteConfig.url,
  "telephone": contactConfig.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": contactConfig.address.line1,
    "addressLocality": contactConfig.address.locality,
    "addressRegion": contactConfig.address.region,
    "postalCode": contactConfig.address.postalCode || "",
    "addressCountry": contactConfig.address.country,
  },
  "priceRange": "₹",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: seoConfig.titleTemplate,
    default: seoConfig.defaultTitle,
  },
  description: seoConfig.defaultDescription,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: businessConfig.name,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [
      {
        url: seoConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: businessConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [seoConfig.defaultOgImage],
  },
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
        <style dangerouslySetInnerHTML={{ __html: buildThemeCssVariables() }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
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
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
