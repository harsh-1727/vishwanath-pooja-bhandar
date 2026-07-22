"use client";

/**
 * src/app/providers.tsx
 *
 * Isolates every client-only context provider behind a single
 * "use client" boundary, so the root layout itself can stay a Server
 * Component (smaller initial JS payload, faster first paint) while
 * the whole tree still gets access to things like the Toast system.
 * Future providers (e.g. an analytics context) get added here, not
 * in layout.tsx.
 */

import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui";
import { CartProvider } from "@/lib/store/CartContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  );
}
