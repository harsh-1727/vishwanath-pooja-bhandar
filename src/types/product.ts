/**
 * src/types/product.ts
 *
 * The runtime contract for every entry in data/products.json.
 * data/schema.ts (Zod) validates the raw JSON against an equivalent
 * shape at build time — if the two ever drift, that's the bug to fix,
 * not a reason to bypass one of them.
 */

export type PriceType = "fixed" | "enquiry";

export interface WhatsInside {
  status: "pending" | "documented";
  items: string[];
}

export interface ProductImages {
  status: "placeholder" | "real";
  paths: string[];
}

/**
 * Free-text provenance flag carried over from the original product
 * database extraction — kept as a string rather than an enum because
 * new nuanced states may appear as data gets completed (e.g.
 * "price_verified_photos_pending") and this field is documentation,
 * not something the UI branches on. UI branching uses whatsInside.status
 * and images.status instead, which ARE typed enums.
 */
export type DataStatus = string;

export interface Product {
  id: string;
  sno: number;
  slug: string;
  categorySlug: string;
  nameHindi: string;
  nameEnglish: string;
  details: string;
  priceInr: number;
  priceType: PriceType;
  shippingNote: string | null;
  searchKeywords: string[];
  seoTitle: string;
  metaDescription: string;
  description: string;
  whatsInside: WhatsInside;
  images: ProductImages;
  featured: boolean;
  dataStatus: DataStatus;
  benefits?: string[] | undefined;
  usage?: string[] | undefined;
  specifications?: Record<string, string> | undefined;
}

export interface ProductDatabaseMeta {
  source: string;
  totalProducts: number;
  openQuestions: string;
}

export interface ProductDatabase {
  schemaVersion: number;
  _meta: ProductDatabaseMeta;
  products: Product[];
}
