/**
 * src/components/ui/Button.tsx
 *
 * The single most important component in this codebase: this project's
 * entire conversion model is "get the person to WhatsApp or Call," so
 * every CTA on the site funnels through here. No hooks/state used, so
 * this stays a plain shared component — no "use client" needed; it
 * works inside both Server and Client Component trees.
 *
 * Renders as a real <button> OR a real <a> (never a <div onClick>,
 * for keyboard/screen-reader correctness) depending on whether `href`
 * is passed — covers both in-app navigation (Next Link) and external
 * deep links (wa.me, tel:) from one component.
 */

import { forwardRef } from "react";
import type * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const variantStyles = {
  primary:
    "bg-saffron text-white hover:bg-saffron/90 focus-visible:ring-saffron/50",
  secondary:
    "bg-ink text-white hover:bg-ink/90 focus-visible:ring-ink/40",
  outline:
    "border border-gold/60 text-ink bg-transparent hover:bg-gold/10 focus-visible:ring-gold/40",
  ghost: "bg-transparent text-ink hover:bg-ink/5 focus-visible:ring-ink/30",
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp/90 focus-visible:ring-whatsapp/50",
} as const;

const sizeStyles = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-base gap-2",
  lg: "h-13 px-7 text-lg gap-2.5",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  /** Icon rendered before the label — pass a lucide-react icon element. */
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  fullWidth?: boolean;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
    /** Set for external deep links (wa.me, tel:) — skips Next Link's client-side routing. */
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-body font-medium " +
  "transition-colors duration-150 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "select-none";

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    iconStart,
    iconEnd,
    fullWidth = false,
    ...rest
  } = props;

  const classes = cn(
    baseClasses,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  if ("href" in props && props.href) {
    const { href, external, ...anchorRest } =
      rest as Omit<ButtonAsLink, keyof BaseProps>;

    if (external) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          rel={anchorRest.target === "_blank" ? "noopener noreferrer" : undefined}
          {...anchorRest}
        >
          {iconStart}
          {children}
          {iconEnd}
        </a>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...(anchorRest as Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "ref">)}
      >
        {iconStart}
        {children}
        {iconEnd}
      </Link>
    );
  }

  const buttonRest = rest as Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof BaseProps
  >;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={buttonRest.type ?? "button"}
      className={classes}
      {...buttonRest}
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
});
