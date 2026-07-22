/**
 * data/schema.ts
 *
 * Validates data/products.json against the same shape src/types/product.ts
 * describes, but at RUNTIME — TypeScript types alone only check code that
 * reads the JSON, not the JSON file's actual contents. A future edit
 * (product #1000, or a manual typo in a price field) that breaks this
 * schema fails the build loudly via `npm run validate-data` and the
 * data-access layer's startup check, instead of shipping a broken
 * product page silently.
 *
 * Run directly: `npm run validate-data`
 * Also imported by src/lib/products/index.ts to validate on first read.
 */

import { z } from "zod";
import productsJson from "./products.json";

const whatsInsideSchema = z.object({
  status: z.enum(["pending", "documented"]),
  items: z.array(z.string()),
});

const productImagesSchema = z.object({
  status: z.enum(["placeholder", "real"]),
  paths: z.array(z.string()),
});

export const productSchema = z.object({
  id: z.string().min(1),
  sno: z.number().int().positive(),
  slug: z.string().min(1),
  categorySlug: z.string().min(1),
  nameHindi: z.string().min(1),
  nameEnglish: z.string().min(1),
  details: z.string(),
  priceInr: z.number().nonnegative(),
  priceType: z.enum(["fixed", "enquiry"]),
  shippingNote: z.string().nullable(),
  searchKeywords: z.array(z.string()),
  seoTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  description: z.string().min(1),
  whatsInside: whatsInsideSchema,
  images: productImagesSchema,
  featured: z.boolean(),
  dataStatus: z.string(),
  benefits: z.array(z.string()).optional(),
  usage: z.array(z.string()).optional(),
  specifications: z.record(z.string()).optional(),
});

export const productDatabaseSchema = z.object({
  schemaVersion: z.number(),
  _meta: z.object({
    source: z.string(),
    totalProducts: z.number(),
    openQuestions: z.string(),
  }),
  products: z
    .array(productSchema)
    .min(1)
    .superRefine((products, ctx) => {
      const seenSlugs = new Set<string>();
      const seenIds = new Set<string>();
      for (const [index, product] of products.entries()) {
        if (seenSlugs.has(product.slug)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Duplicate product slug "${product.slug}" at index ${index}`,
            path: [index, "slug"],
          });
        }
        seenSlugs.add(product.slug);

        if (seenIds.has(product.id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Duplicate product id "${product.id}" at index ${index}`,
            path: [index, "id"],
          });
        }
        seenIds.add(product.id);
      }
    }),
});

export type ValidatedProductDatabase = z.infer<typeof productDatabaseSchema>;

export function validateProductDatabase(): ValidatedProductDatabase {
  const result = productDatabaseSchema.safeParse(productsJson);
  if (!result.success) {
    console.error("\u274c data/products.json failed validation:\n");
    for (const issue of result.error.issues) {
      console.error(`  \u2022 [${issue.path.join(".")}] ${issue.message}`);
    }
    throw new Error(
      "data/products.json is invalid — see errors above. The build must not proceed with unvalidated product data."
    );
  }
  return result.data;
}

// Allows `npm run validate-data` (tsx data/schema.ts) to run this as a
// standalone check outside of the Next.js build/data-access layer.
// ESM-safe entry-point check (this project uses "module": "esnext" —
// the CommonJS `require.main === module` pattern doesn't exist here).
const isRunDirectly =
  process.argv[1] !== undefined &&
  import.meta.url === new URL(process.argv[1], "file:").href;

if (isRunDirectly) {
  const validated = validateProductDatabase();
  console.log(
    `\u2705 data/products.json is valid — ${validated.products.length} products.`
  );
}
