"use client";

/**
 * src/components/ui/Toast.tsx
 *
 * Backs the "copied!" confirmations for CopyPhone/CopyAddress and the
 * share-fallback message when the native Web Share API isn't
 * available. Colocated as a single self-contained UI primitive
 * (context + provider + hook + renderer in one file) rather than
 * split across components/hooks/types — toast state is pure UI
 * ephemera, not business logic, so it doesn't belong in src/hooks
 * alongside things like useRecentlyViewed which persist real data.
 *
 * ToastProvider is mounted once in the root layout (Phase 4).
 */

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ToastVariant = "success" | "info" | "warning";

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 3000;

const variantIcon: Record<ToastVariant, ReactNode> = {
  success: <CheckCircle2 size={18} className="text-whatsapp" aria-hidden="true" />,
  info: <Info size={18} className="text-ink/70" aria-hidden="true" />,
  warning: <AlertTriangle size={18} className="text-saffron" aria-hidden="true" />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            aria-live="polite"
            aria-atomic="true"
            className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6"
          >
            {toasts.map((t) => (
              <div
                key={t.id}
                className={cn(
                  "pointer-events-auto flex items-center gap-2 rounded-full border border-ink/10 bg-base px-4 py-2 text-sm text-ink shadow-lg animate-fade-in"
                )}
              >
                {variantIcon[t.variant]}
                {t.message}
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider (see root layout).");
  }
  return ctx;
}
