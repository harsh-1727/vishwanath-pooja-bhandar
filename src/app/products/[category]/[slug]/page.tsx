import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts, getAllProducts } from "@/lib/products";
import ProductClientPage from "@/components/product/ProductClientPage";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/config";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const all = getAllProducts();
  return all.map(p => ({
    category: p.categorySlug,
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const ogUrl = `${siteConfig.url}/products/${product.categorySlug}/${product.slug}`;
  const imgRelative = product.images.paths[0] || "/images/products/kit.webp";
  const ogImageUrl = imgRelative.startsWith("/")
    ? `${siteConfig.url}${imgRelative}`
    : `${siteConfig.url}/${imgRelative}`;

  return {
    title: `${product.nameEnglish} (${product.nameHindi})`,
    description: product.metaDescription,
    alternates: {
      canonical: ogUrl,
    },
    openGraph: {
      title: product.seoTitle,
      description: product.metaDescription,
      url: ogUrl,
      images: [
        {
          url: ogImageUrl,
          width: 800,
          height: 800,
          alt: product.nameEnglish,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle,
      description: product.metaDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { category, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 3);
  const allProducts = getAllProducts();

  const imgRelative = product.images.paths[0] || "/images/products/kit.webp";
  const productImageUrl = imgRelative.startsWith("/")
    ? `${siteConfig.url}${imgRelative}`
    : `${siteConfig.url}/${imgRelative}`;

  // JSON-LD Product Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.nameEnglish,
    "image": [productImageUrl],
    "description": product.description,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Vishwanath Pooja Bhandar"
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteConfig.url}/products/${category}/${slug}`,
      "priceCurrency": "INR",
      "price": product.priceInr,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Store",
        "name": "Vishwanath Pooja Bhandar"
      }
    }
  };

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${siteConfig.url}/products`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.replace(/-/g, " "),
        "item": `${siteConfig.url}/products/${category}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.nameEnglish,
        "item": `${siteConfig.url}/products/${category}/${slug}`
      }
    ]
  };

  return (
    <>
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-cream/20 border-b border-ink/5 py-4">
        {/* Breadcrumb layout */}
        <nav className="mx-auto max-w-content px-4 text-xs font-semibold text-ink/40 sm:px-6">
          <ul className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-ink">Home</Link>
            </li>
            <ChevronRight size={12} aria-hidden="true" />
            <li>
              <Link href="/products" className="hover:text-ink">Products</Link>
            </li>
            <ChevronRight size={12} aria-hidden="true" />
            <li>
              <Link href={`/products/${category}`} className="hover:text-ink capitalize">
                {category.replace(/-/g, " ")}
              </Link>
            </li>
            <ChevronRight size={12} aria-hidden="true" />
            <li className="text-ink truncate max-w-[200px]" aria-current="page">
              {product.nameEnglish}
            </li>
          </ul>
        </nav>
      </div>

      <ProductClientPage product={product} related={related} allProducts={allProducts} />
    </>
  );
}