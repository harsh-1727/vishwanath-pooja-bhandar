/**
 * src/lib/utils/theme-vars.ts
 *
 * Generates the :root CSS custom properties for color tokens directly
 * from config/theme.config.ts, so that file remains the single source
 * of truth for brand color — no hex/rgb values are duplicated into a
 * static CSS file that could silently drift out of sync. Injected
 * once via a <style> tag in the root layout (src/app/layout.tsx).
 *
 * Fonts are deliberately NOT generated here. Next.js's next/font
 * loaders require statically-analyzable calls at their import site —
 * they cannot be driven by a runtime string pulled from config. Font
 * wiring therefore lives directly in layout.tsx as literal imports.
 * To change fonts for a different business vertical: edit both
 * theme.config.ts (kept as the human-readable reference/docs) AND the
 * three next/font import calls in layout.tsx — see the comment there.
 */

import { themeConfig } from "@/config";

export function buildThemeCssVariables(): string {
  const declarations = Object.entries(themeConfig.colors)
    .map(([name, token]) => `--color-${name}: ${token.rgb};`)
    .join(" ");

  return `:root { ${declarations} }`;
}
