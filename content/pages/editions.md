# Editions — `/editions` + `/editions/[slug]`  ✅ built

**Purpose:** Help a buyer self-select the right edition and understand exactly
what each includes.

## Overview page (`/editions`)
- Hero "One platform. Five editions."
- 5 edition cards (positioning, deploy, price anchor, link).
- **Modules-by-edition comparison matrix** (rows = all modules, columns = 5
  editions, ✓/– cells) — generated from `editions.ts` `.modules`.

## Detail page (`/editions/[slug]`)
Shared template, one per edition (standard, enterprise, datacenter, government,
telco):
1. Hero — badge, headline, tagline, positioning, "For:" audience, CTAs.
2. Key-specs strip — deployment · AI tier · price.
3. What's included — highlight checklist.
4. Architecture diagram — placeholder per edition (see design/diagrams.md).
5. Modules in this edition — card grid.
6. CTA.

## Copy source: `content/editions.ts` (single source of truth).

## Open items
- Confirm price anchors are OK to publish ($24K / $120K) or switch to
  "contact sales".
- Government/Telco framed as full editions but written as vertical
  configurations — confirm wording is acceptable.
