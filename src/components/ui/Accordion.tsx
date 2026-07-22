"use client";

/**
 * src/components/ui/Accordion.tsx
 *
 * Powers the FAQ page (Phase 11) and the "What's Inside Kit" expandable
 * section on product pages (Phase 9). Native <button> triggers with
 * aria-expanded/aria-controls rather than a div+onClick — keyboard and
 * screen-reader support come for free from real semantics instead of
 * hand-rolled ARIA gymnastics.
 */

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  /** When false (default), only one item is open at a time. */
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn("divide-y divide-ink/10", className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const panelId = `accordion-panel-${item.id}`;
        const triggerId = `accordion-trigger-${item.id}`;

        return (
          <div key={item.id} className="py-2">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 py-3 text-left font-body text-base font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/40 rounded-sm"
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-ink/50 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="pb-4 pr-8 text-sm leading-relaxed text-ink/70"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
