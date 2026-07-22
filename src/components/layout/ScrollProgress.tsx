"use client";

/**
 * src/components/layout/ScrollProgress.tsx
 *
 * Thin fixed progress bar reflecting scroll depth on the current page
 * — most useful on long pages (product detail, festival pages). Uses
 * a passive scroll listener throttled via requestAnimationFrame to
 * avoid layout jank. Animation is neutralized automatically under
 * prefers-reduced-motion via the global rule in globals.css.
 */

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-0.5 w-full"
      aria-hidden="true"
    >
      <div
        className="h-full bg-saffron transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
