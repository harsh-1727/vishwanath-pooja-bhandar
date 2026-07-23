import type { NextConfig } from "next";

/**
 * Security headers applied globally.
 * Kept here (in addition to middleware.ts) because these are static,
 * cacheable headers best set at the framework/CDN edge layer rather
 * than re-computed per-request in middleware. middleware.ts is reserved
 * for logic that genuinely needs to run per-request (e.g. future rate
 * limiting on /api/contact).
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // CSP intentionally allows only what's actually used: self-hosted
    // assets, the WhatsApp deep link (navigation, not a script/frame),
    // and Google Maps embed (added to frame-src only once a real map
    // is configured in contact.config.ts — see MapEmbed component).
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-src 'self' https://www.google.com",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Real product photography is not yet supplied (see PROJECT_RULES.md).
    // No remote domains are whitelisted yet — every image today is a
    // locally-hosted placeholder/decorative asset under /public/images.
    // Add the real photo CDN/domain here once the owner supplies photos.
    remotePatterns: [],
  },

  
  typescript: {
    ignoreBuildErrors: false,
  },

  async headers() {
    return process.env.NODE_ENV === "production"
      ? [
          {
            source: "/:path*",
            headers: securityHeaders,
          },
        ]
      : [];
  },


  typedRoutes: true,

};

export default nextConfig;
