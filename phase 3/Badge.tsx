/**
 * src/components/ui/Badge.tsx
 *
 * Small status/label chip. Used for things like "Free Shipping",
 * category tags, and — importantly — honest data-status flags like
 * "Details Pending" on products whose "What's Inside" content hasn't
 * been supplied yet (see PRODUCT_DATABASE.json status field). Having
 * a dedicated `pending` variant makes it easy to visually distinguish
 * real information from acknowledged gaps, sitewide, consistently.
 */

import type * as React from "react";
import { cn } from "@/lib/utils/cn";

const variantStyles = {
  neutral: "bg-cream text-ink border-ink/10",
  saffron: "bg-saffron/10 text-saffron border-saffron/20",
  gold: "bg-gold/10 text-ink border-gold/30",
  success: "bg-whatsapp/10 text-whatsapp border-whatsapp/20",
  pending: "bg-ink/5 text-ink/60 border-ink/10 italic",
} as const;

export type BadgeVariant = keyof typeof variantStyles;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "neutral",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
