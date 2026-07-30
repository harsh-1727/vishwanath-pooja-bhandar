"use client";

/**
 * src/components/shared/Analytics.tsx
 *
 * Client-side script loader for Google Analytics 4 and Microsoft Clarity.
 * Built using Next.js 15 App Router recommended `next/script` pattern.
 * Loads asynchronously without blocking rendering or impacting Web Vitals / CLS.
 */

import Script from "next/script";
import { analyticsConfig } from "@/config";

export function Analytics() {
  const gaId = analyticsConfig.gaMeasurementId;
  const clarityId = analyticsConfig.clarityId;
  const isProduction = process.env.NODE_ENV === "production";

  // Check for debug mode via URL parameter during development
  const isDebug =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("ga_debug") === "true";

  // Only load scripts in production or when explicitly debugging
  const shouldLoad = isProduction || isDebug;

  if (!shouldLoad || (!gaId && !clarityId)) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                send_page_view: true,
                cookie_flags: 'SameSite=None;Secure'
                ${isDebug ? ", debug_mode: true" : ""}
              });
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {clarityId && isProduction && (
        <Script id="microsoft-clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  );
}
