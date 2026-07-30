"use client";

/**
 * src/components/product/CategoryAnalyticsTracker.tsx
 *
 * Client tracker component to fire category_view analytics event on mount.
 */

import { useEffect } from "react";
import { trackCategoryView } from "@/lib/analytics";

export function CategoryAnalyticsTracker({ categoryName }: { categoryName: string }) {
  useEffect(() => {
    trackCategoryView({ category_name: categoryName });
  }, [categoryName]);

  return null;
}
