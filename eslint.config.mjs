import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:jsx-a11y/recommended"
  ),
  {
    rules: {
      // "No any" is a hard project rule (see PROJECT_RULES.md).
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",

      // Accessibility: elevate a11y issues to build-breaking errors
      // rather than warnings, since this project has an explicit
      // WCAG AA commitment.
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/no-autofocus": "warn",

      // Prevent accidental hardcoded business data creeping into
      // components — this is enforced by convention/code review too,
      // but a lint rule catches the easy cases (e.g. raw phone-number
      // strings) early.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["*/data/products.json"],
              message:
                "Import products via the data-access layer in src/lib/products, not the raw JSON file.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "tests/e2e/**",
      "phase 1/**",
      "phase 2/**",
      "phase 3/**",
      "phase 4/**",
      "phase 5/**",
      "phase 6/**",
      "phase 7/**",
    ],
  },
];

export default eslintConfig;
