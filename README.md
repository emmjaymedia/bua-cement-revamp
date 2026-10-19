# BUA Cement Revamp

Responsive BUA Cement corporate website redesign built with React, TypeScript and a Next.js App Router-compatible Vinext runtime.

## Features

- Responsive shared navigation and corporate page layouts
- Homepage carousel and interactive globe-to-Nigeria location explorer
- About, history timeline, leadership and company profile pages
- Operations, products, Edo and Sokoto plant pages with videos and galleries
- Investor reports, presentations, policies and shareholder resources
- News search/filtering, media galleries, careers and contact pages
- Source-dated NGX end-of-day share quote

## Local setup

Requires Node.js 22.13 or newer and pnpm 11.

```sh
corepack enable
pnpm install
pnpm dev
```

```sh
pnpm exec tsc --noEmit
node scripts/check-corporate-routes.mjs
pnpm build
```

`pnpm start` runs the built Cloudflare Worker locally using Wrangler. The current deployment uses Vinext and Cloudflare Workers; this is not a plain Vercel Next.js deployment.

## Project structure

- `app/` — homepage, About page, corporate routes and API handlers
- `components/` — shared navigation, page sections, timelines, galleries and forms
- `lib/corporate/` — source-backed corporate content and image associations
- `lib/plants.ts` — Edo and Sokoto plant presentation data
- `public/images/` — local brand photography and product images
- `.openai/asset-provenance.md` — content and asset provenance

## Backend integration

The existing .NET backend is a later integration phase. Enquiry and newsletter forms currently open clearly labelled email drafts; they do not claim successful server submissions. Corporate documents retain their original download URLs. Archived vacancies are labelled closed. Market quotes use the existing source-dated end-of-day feed and must not be described as real-time trading data.

## Source snapshot

Exported from the reviewed Sites project source commit `5266a1fb1fa75a0820a75dfa26cdd8d2b46fbc4f`. The source includes the removal of the Keep exploring section from both plant pages.

BUA Cement branding, photography and corporate material belong to their respective rights holders. This repository contains an independent redesign preview; no open-source licence is granted for third-party brand assets.
