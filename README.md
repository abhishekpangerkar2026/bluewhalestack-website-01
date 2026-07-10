# BlueWhale Stack — Website

A greenfield, modern-enterprise marketing site for BlueWhale Stack, built with
**Next.js 15 (App Router) + TypeScript + Tailwind CSS v4**. Content is
self-contained and typed (CMS-ready via a single seam), so it runs entirely
locally with no external services.

## Quick start

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build (also type-checks)
npm start          # serve the production build
```

Requires Node 18+ (developed on Node 24).

## Run with Docker (local)

The app ships a multi-stage `Dockerfile` (Next.js `standalone` output, ~285 MB)
and a `docker-compose.yml`.

```bash
docker compose up --build -d      # build + run → http://localhost:3000
docker compose logs -f            # tail logs
docker compose ps                 # status (should be "healthy")
docker compose down               # stop & remove the container
```

The container runs the production build as a non-root user on port 3000.
Rebuild after code changes with `docker compose up --build -d`.

## Structure

```
app/                 Routes (App Router)
  page.tsx           Home (fully built)
  editions/          overview + [slug] detail (5 editions)
  modules/           overview + [slug] detail (17 modules)
  industries/        overview + [slug] detail (8 industries)
  solutions/         overview + [slug] detail (6 solutions)
  platform, pricing, about, resources, docs, partners,
  careers, contact, legal/*   (polished stubs — full build next pass)
  sitemap.ts, robots.ts, not-found.tsx
components/
  ui/                Button, Card, Badge, Stat, Container, Icon, Placeholder, SectionHeading
  sections/          Hero, CTASection, PageStub
  layout/            Header, Footer, ChatWidget, Logo
content/             ← typed content (single source of truth)
  company.ts editions.ts modules.ts industries.ts solutions.ts home.ts
  pages/*.md         per-page content documents (the "documents")
lib/
  content.ts         CMS-ready content access layer
  utils.ts           cn() class merge
design/diagrams.md   architecture-diagram specs (for code-based SVGs later)
```

## Design system
Brand blue `#002da1`, cyan accent, Inter + Plus Jakarta Sans, defined as Tailwind
v4 `@theme` tokens in `app/globals.css`. Mostly light surfaces with selective
dark hero/CTA sections.

## Content & the CMS seam
Components never import content files directly for collections — they call
`lib/content.ts` (`getEditions()`, `getModule()`, …). To move to a headless CMS
later, swap those function bodies to fetch from the CMS and keep the return
types; no component changes.

## Status (Pass 1)
✅ Foundation, design system, content layer, layout, Home, and all
data-driven overview + detail pages (editions/modules/industries/solutions).
🟡 Platform, About, Pricing, Resources, Docs, Partners, Careers, Contact, Legal
are polished stubs. Imagery & architecture diagrams are placeholders — see
`design/diagrams.md`. Forms are not yet wired (Pass 2).
