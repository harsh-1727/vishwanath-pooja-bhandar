# PROJECT RULES — For Any AI or Developer Continuing This Project
Client: [Shop Name TBC] Pooja Bhandar, Patel Nagar, New Delhi

Read this file first, before touching code or content. It exists so the project doesn't lose integrity across sessions or contributors.

---

## Non-Negotiable Rules

1. **Never invent facts.** No fake reviews, no fake ratings, no fake awards/certifications, no fake press mentions, no fake shop or product photography presented as real. If a fact is missing, mark it as `PENDING OWNER CONFIRMATION` — do not fill the gap with a plausible-sounding guess.
2. **Every price and product fact must trace to a source.** The current source of truth is `PRODUCT_DATABASE.json`, itself derived from `Vishwanath_Pujan_Samagri_Rate_List.xlsx` and cross-checked against the owner's handwritten notebook pages. Do not add, remove, or reprice a kit without an updated source document.
3. **This is not an e-commerce site.** No cart, checkout, payment gateway, or login should ever be added unless the owner explicitly changes this requirement in writing. Every "buy" action routes to WhatsApp or Call — nothing else.
4. **Decorative AI-generated artwork is allowed; fabricated documentary content is not.** A stylized illustrated diya motif = fine. An AI-generated image implied to be "our shop" or "our products" = not fine, ever.
5. **Resolve the shop-name discrepancy before any brand asset, domain, or copy is finalized.** ("Vishwanath Pooja Bhandar" per brief vs. "Banke Bihari Pujan Samagri Store" per the Excel source file header.) Treat this as a hard blocker for logo, domain registration, and schema/GBP setup.
6. **Bilingual content must be real text, not images.** Hindi product names are rendered as actual Devanagari text (for accessibility and SEO), never as an image or transliteration-only substitute.
7. **Do not publish "What's Inside Kit" content until the owner supplies item-by-item lists.** This was not present in any source material provided. Placeholder/pending state only.
8. **Keep the tone accordingly:** warm, respectful, factual — never devotionally exaggerated, never discount-shouty, never using fake urgency/scarcity patterns.

---

## Tech Stack Decisions (locked unless owner/team changes course)

- **Framework:** Next.js, App Router, static generation (SSG/ISR) for content pages
- **Styling:** Tailwind CSS (utility-first, matches the "reusable for future businesses" requirement well — themeable via CSS variables per the palette in BRAND_GUIDELINES.md)
- **Hosting:** Vercel or equivalent edge CDN (India-fast delivery is a hard requirement)
- **Content source:** `PRODUCT_DATABASE.json` as the single source of truth for the product catalog until/unless a lightweight CMS is introduced
- **No user auth, no database of personal/customer data** — keeps security surface minimal by design (see PROJECT_MASTER.md §15)
- **Fonts:** self-hosted, subsetted (Latin + Devanagari) — no third-party font CDN round-trip

## Folder/Data Conventions (for whoever writes code next)

- Product slugs, categories, and IDs in `PRODUCT_DATABASE.json` are the canonical identifiers — route generation (`/products/[category]/[slug]`) should read directly from this file, not a hand-maintained duplicate.
- Any new kit added later must include all the same fields as existing entries (see JSON schema in the file) — including explicit `status` field so incomplete entries (missing photos/contents) stay flagged in the UI rather than silently publishing gaps.

## Handoff Discipline

Every time this project is picked up by a new AI session or contributor:
1. Re-read this file and `OWNER_GUIDE.md`'s open-questions list first.
2. Check whether any previously "pending" item has since been resolved — update the relevant file(s) rather than leaving stale flags.
3. Do not silently drop or "clean up" a flagged uncertainty without owner confirmation — that's how fake information enters a real client project.
