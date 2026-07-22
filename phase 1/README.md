# Vishwanath Pooja Bhandar — Website

Production Next.js 15 site for a 40+ year family-owned puja samagri shop in
Patel Nagar, New Delhi. Built as a **reusable local-business template** —
see [`PROJECT_RULES.md`](./PROJECT_RULES.md) before making changes.

## Before you touch anything

Read these, in order:

1. [`PROJECT_RULES.md`](./PROJECT_RULES.md) — non-negotiable rules (no fake content, no e-commerce, data source of truth)
2. [`PROJECT_MASTER.md`](./PROJECT_MASTER.md) — full architecture, sitemap, design system
3. [`OWNER_GUIDE.md`](./OWNER_GUIDE.md) — open questions still pending from the shop owner

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in only what you have; rest is safe blank
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (fails on lint/type errors — by design) |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run format` / `format:check` | Prettier |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run validate-data` | Validates `data/products.json` against `data/schema.ts` — run this after any product data edit |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end tests (Playwright) |

## Reusing this template for a different business

Only edit files inside `config/` and `data/`. Never edit `src/` to hardcode
a new business's details — that defeats the entire architecture. See
`PROJECT_MASTER.md` → Project Architecture for the full explanation.

## Deployment

Vercel-ready out of the box. See `vercel.json` (added in Phase 18) once
deployment configuration is generated.
