/**
 * src/lib/utils/cn.ts
 *
 * Standard clsx + tailwind-merge combinator. Every component in
 * components/ui uses this instead of template-string class
 * concatenation, so conditional classes never produce duplicate/
 * conflicting Tailwind utilities (e.g. "px-2 px-4" silently keeping
 * the wrong one) — tailwind-merge resolves those deterministically.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
