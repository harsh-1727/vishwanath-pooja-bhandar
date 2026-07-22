/**
 * src/components/ui/Card.tsx
 *
 * Generic surface used by ProductCard, FestivalCard, and any future
 * business's equivalent (JewelleryCard, SweetCard, ...). Deliberately
 * has zero product-domain knowledge — it only knows about padding,
 * radius, shadow, and hover affordance. Domain components compose it.
 */

import type * as React from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds hover elevation + slight lift — use for clickable cards (product/festival), omit for static info cards. */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
} as const;

export function Card({
  className,
  interactive = false,
  padding = "md",
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-ink/10 bg-base shadow-sm",
        paddingStyles[padding],
        interactive &&
          "transition-shadow duration-200 hover:shadow-md focus-within:shadow-md",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-3", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-lg text-ink leading-snug", className)}
      {...rest}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-ink/70 leading-relaxed", className)} {...rest}>
      {children}
    </p>
  );
}

export function CardFooter({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-4 flex items-center gap-2", className)} {...rest}>
      {children}
    </div>
  );
}
