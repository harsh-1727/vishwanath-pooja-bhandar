/**
 * src/components/ui/Skeleton.tsx
 *
 * Loading placeholder used wherever content streams in after the
 * initial paint — e.g. Smart Search results, Recently Viewed (which
 * reads from localStorage and can't render on the server). Prevents
 * layout shift (protects CLS — see PROJECT_MASTER.md Core Web Vitals
 * targets) by reserving the same footprint as the real content.
 *
 * No "use client" needed — it's static markup, safe in Server or
 * Client Component trees either way.
 */

import type * as React from "react";
import { cn } from "@/lib/utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "circle";
}

export function Skeleton({
  variant = "text",
  className,
  ...rest
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-ink/10",
        variant === "text" && "h-4 w-full rounded",
        variant === "card" && "h-48 w-full rounded-card",
        variant === "circle" && "h-10 w-10 rounded-full",
        className
      )}
      {...rest}
    />
  );
}

/** Convenience preset matching ProductCard's dimensions — used for search/loading grids. */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-card border border-ink/10 p-4">
      <Skeleton variant="card" className="mb-3 h-40" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}
