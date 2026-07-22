/**
 * src/components/ui/EmptyState.tsx
 *
 * Used for "no search results," empty Recently Viewed / Compare lists,
 * and similar zero-data states. Exists as a shared component so these
 * moments look intentional and on-brand instead of a bare "No results"
 * string — and so every empty state can offer a next action (e.g.
 * "Message us on WhatsApp") instead of a dead end, which matters a lot
 * for an inquiry-generation site where a dead end is a lost lead.
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-card border border-dashed border-ink/15 px-6 py-12 text-center",
        className
      )}
    >
      {icon && <div className="mb-4 text-ink/30">{icon}</div>}
      <p className="font-display text-lg text-ink">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-ink/60">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
