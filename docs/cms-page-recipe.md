# Making a page fully editable — the recipe

Every page section is edited in the Studio through one **page document** per
route. The page keeps its design; only the words move into a typed content
object that the CMS can override. Three files per page, all driven by one
spec (see `content/cms/spec.ts`):

| File | What it is |
|---|---|
| `content/cms/docs/<name>Page.ts` | the **spec** — `defineDoc("<name>Page", "…", { fields }, { singleton: true, groups, locations })`. Plain data, no imports except `../spec` and `../objects`. The Studio schema, the seed script and the GROQ projection are all generated from it. |
| `content/sections/<name>Page.ts` | the **fallback content** — `export const <name>Page: <Name>Page = { … }`, typed by `InferDoc<typeof spec>`. Built from the existing `content/*.ts` modules (import and map them; never edit the originals) plus the literals that were inline in the page. Must not import components. |
| `app/<route>/page.tsx` | reads `const c = await getPageDoc(<name>PageSpec, <name>Page)` and renders **exactly the same JSX** with every literal replaced by `c.…`. |

Reference implementation: `content/cms/docs/platformPage.ts`,
`content/sections/platformPage.ts`, `app/platform/page.tsx`.

## Rules

1. **Rendered output must not change.** Same JSX structure, classes,
   animations, order, links. A text snapshot of every route is diffed before
   and after; only the source of the words changes. Keep `metadata` text
   identical — move it into `seoTitle` / `seoDescription` fields and export
   `generateMetadata()` (see the platform page).
2. **The hero stays as it is.** `CmsPhotoHero` already has its own "Page hero"
   document for the headline/description/photo — leave `eyebrow`, `title`,
   `description` and `photo` literal in the page. Only the things *around* the
   hero (button labels and notes, the tagline, the stats strip under it, the
   "on this page" links) move into `c.hero`.
3. **Field names matter.** Values used as keys, lookups, hrefs or code must use
   one of these field names (they are excluded from click-to-edit encoding):
   `slug, current, icon, tone, route, href, url, src, status, category, badge,
   kind, group, edition, editions, modules, story, architectureId, photo, date,
   value, linkedin, id, key, type, code, lang, iso, city, industry, sector,
   scene, access, trackSlug, department, variant, statusTone, verifyUrl, login,
   register, portal, email, number, twitter, accentColor, topGrad, pdf, file,
   intent, entity, tags, focus`. Everything else is treated as display text.
   Numbers → `f.num`, booleans → `f.bool`, string lists → `f.strings`.
4. **Objects in arrays must be named** (`defineObject`). Object names are
   global across the whole Studio — prefix new ones with the page
   (`aboutMilestone`, `fabricMarket`), and reuse the shared ones from
   `content/cms/objects.ts` whenever the shape fits: `fact {value,label}`,
   `qa {q,a}`, `titledBody {title,body}`, `iconItem {icon,title,body,cost?}`,
   `iconLink {icon,title,body,href}`, `cta {label,href}`, `ctaPath
   {label,href,note?}`, `sectionHeading {eyebrow?,title,description?}`,
   `closingCta`, `labelValue`, `link`, `step {title,body,when?,icon?}`,
   `namedBody {name,body}`, `stringList {heading,items[]}`, `tableRow {cells[]}`.
5. **Section headings**: `heading: f.obj("Heading", sectionHeading.fields)` in
   the spec, `<SectionHeading {...c.section.heading} />` in the page
   (`inverse` can still be passed after the spread).
   **Closing band**: `closing: f.obj("Closing call to action",
   closingCta.fields)` → `<ClosingCTA {...c.closing} />`.
6. **Split JSX titles** (`Four editions. <span className="text-accent">One
   architecture.</span>`) into `title` + `titleAccent` fields and rebuild the
   markup in the page. Two-line titles with `<br/>` → two fields.
7. **Groups**: give the doc `groups: [{ name: "hero", title: "Hero & SEO",
   default: true }, { name: "sections", title: "Sections" }]` and put
   `{ group: "…" }` on every top-level field. Give every doc `locations:
   [{ title: "<Page name>", href: "<route>" }]`.
8. **Shared data** comes from getters, not page docs: `getSiteSettings()`
   (offices, emails, phones, social, partnerPortal, regions, compliance chips),
   `getFamilies()`, `getEditions()`, `getModules()`, `getCertifications()`,
   `getJobs()`, `getPartnerTracks()`, `getLegalPage(slug)`, `getDocPages()`,
   `getTeam()`, `getCustomerStories()`, `getCollateral()` — all in
   `lib/content.ts`. Client components (`"use client"`) must receive such
   data through props from the server page instead of importing content.
9. **Images**: only add `f.image(...)` where an editor would plausibly swap a
   picture (an override slot); render it with `editAttr(image.sanity)` and
   `imageUrl(src, w)` like the platform architecture figure.
10. Do not edit `lib/content.ts`, `lib/cms*.ts`, `content/cms/spec.ts`,
    `content/cms/objects.ts`, the original `content/*.ts` modules, or another
    page's files. Do not run `next build` or start servers.
11. Verify with `npx tsc --noEmit` — only errors in your own files matter
    (other pages may be mid-refactor).

## Naming

Spec export `xPageSpec`, type `XPage`, content export `xPage`, document name
`"xPage"` — e.g. `aboutPageSpec` / `AboutPage` / `aboutPage` / `"aboutPage"`.
