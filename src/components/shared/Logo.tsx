/**
 * src/components/shared/Logo.tsx
 *
 * businessConfig.hasLogo is false today (no logo asset supplied yet —
 * see OWNER_GUIDE.md). This renders a clean text wordmark fallback
 * instead of a broken <img>. Once a real logo exists, set
 * `hasLogo: true` and `logoPath` in business.config.ts — this
 * component then renders the image automatically; no other code
 * changes needed anywhere else in the app.
 */

import Image from "next/image";
import Link from "next/link";
import { businessConfig } from "@/config";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  if (businessConfig.hasLogo && businessConfig.logoPath) {
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center", className)}
        aria-label={businessConfig.name}
      >
        <Image
          src={businessConfig.logoPath}
          alt={businessConfig.name}
          width={160}
          height={48}
          priority
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "font-display text-xl font-medium tracking-tight text-ink sm:text-2xl",
        className
      )}
    >
      {businessConfig.name}
    </Link>
  );
}
