# Website content documents

This folder holds one **content document per page** — the exact copy, section
order, and asset needs for each route. These are the human-readable source of
truth; the app renders from the typed data modules in `content/*.ts`.

| Doc | Route | Renders from |
|-----|-------|--------------|
| [home.md](./home.md) | `/` | `content/home.ts` |
| [platform.md](./platform.md) | `/platform` | stub → `content/platform.ts` (Pass 2) |
| [editions.md](./editions.md) | `/editions` + `/editions/[slug]` | `content/editions.ts` |
| [modules.md](./modules.md) | `/modules` + `/modules/[slug]` | `content/modules.ts` |
| [industries.md](./industries.md) | `/industries` + `/industries/[slug]` | `content/industries.ts` |
| [solutions.md](./solutions.md) | `/solutions` + `/solutions/[slug]` | `content/solutions.ts` |
| [about.md](./about.md) | `/about` | stub → `content/about.ts` (Pass 2) |
| [pricing.md](./pricing.md) | `/pricing` | stub → `content/editions.ts` (Pass 2) |
| [resources.md](./resources.md) | `/resources` + `/resources/[slug]` | stub → `content/resources.ts` (Pass 2) |
| [partners.md](./partners.md) | `/partners` | stub → `content/partners.ts` (Pass 2) |
| [careers.md](./careers.md) | `/careers` | stub → `content/careers.ts` (Pass 2) |
| [contact.md](./contact.md) | `/contact` | stub → form route handler (Pass 2) |

**Status legend** — ✅ built this pass · 🟡 stub (polished placeholder, full build next pass).

## Build status snapshot (Pass 1)
- ✅ Home — fully designed & built
- ✅ Editions overview + 5 edition detail pages (data-driven, real content)
- ✅ Modules overview + 17 module detail pages (data-driven)
- ✅ Industries overview + 8 industry detail pages (data-driven)
- ✅ Solutions overview + 6 solution detail pages (data-driven)
- 🟡 Platform, About, Pricing, Resources, Docs, Partners, Careers, Contact, Legal — stubs

All imagery & architecture diagrams are branded placeholders this pass — see
[`design/diagrams.md`](../../design/diagrams.md) for the diagram specs.
