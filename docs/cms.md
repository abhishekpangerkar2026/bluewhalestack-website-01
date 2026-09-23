# Editing the website — the CMS (Sanity)

Every page of the website is edited in a Sanity Studio — a form-based editing
screen, no code — or directly on the page in the Studio's "Edit on the
website" tab. Publishing a change makes it live on the site within seconds
(no redeploy).

- **Editing screen:** https://bluewhalestack.sanity.studio (sign in with the
  Google or email account that was invited)
- **Invite editors:** https://www.sanity.io/manage → the project → Members →
  Invite (role *Editor* can edit and publish; *Viewer* can only read)

## Editing directly on the website ("Edit on the website" tab)

The Studio's first tab shows the live website. Click any headline, paragraph,
label, button, list item or photo on any page — the matching field opens
beside it, the page updates as you type, and **Publish** makes it live. Use
the page's own navigation inside the frame to move to another page; the
document list on the left follows you. Unpublished edits are only visible in
this preview (and to anyone who opens the site while in preview mode — the
"Preview · exit" badge at the bottom-left leaves it).

**Changing a picture or adding a video:** click the photograph on the page
(hero photos, product cards, team portraits, newsroom images, the capability
family tiles, the platform architecture picture). The *Photograph* field opens
beside the page — **Upload** a new file or **Select** one already in the media
library, drag the hotspot, then Publish. The *Hero video* fields sit directly
under the photograph in the same form; upload an MP4/WebM or paste a direct
link and the video plays in place of the photo. Built-in photos are clickable
too, so a page that has never had an editor image still opens its upload
field.

Still code (not clickable): the animated architecture diagrams, the console
mock-ups, the capability-family illustrations, the certificate PDFs and the
contact form's field labels.

## What you can edit

| In the Studio sidebar | What it changes on the site |
|---|---|
| **Site settings** | Company name and tagline, email addresses, phone lines, social links, offices, SaaS regions, the compliance badges, the Partner Portal links, the whole header menu (every column and link), the utility links, the "Log in" and "Book a demo" buttons, the footer (tagline, newsletter copy, link columns, legal links, copyright) and the section navigation strips on inner pages |
| **Pages → Home page** | The landing page end to end: hero, story band, proof cards, differentiators, product portfolio, plus the architecture, console, families, spotlight, editions, prototype, global-infrastructure and closing sections |
| **Pages → (every other page)** | One document per page — Platform, Products, Editions, Modules, Industries, Solutions, Customers, Case studies, Fabric, Pricing, Resources, Docs, About, Leadership, Partners, Careers, Newsroom, Contact, Trust Center, Whale AI, WhaleForge — holding every section's kicker, title, description, cards, tables, FAQ, buttons and closing call to action, and the page's search title/description |
| **Page heroes** | The headline, description, photograph or video at the top of each page — one document per page path (`/platform`, `/trust`, `/pricing` …) |
| **Editions** | Everything on the four edition pages and their cards: pricing, inclusions, fit, FAQ, photo |
| **Capability families** | The nine families' names, one-liners, icons and tile pictures (platform, modules and home pages) |
| **Modules** | The 14 module pages: summary, facts, capabilities, how it works, FAQ, status badge, photo |
| **Industries / Solutions** | The sector and solution pages, including the KPI strip, regimes, use cases, FAQ, photo. Add a new one and its page appears automatically (`/industries/<slug>`) |
| **Customer stories & case studies** | The four case studies and every place they are summarised |
| **Newsroom** | Announcements on `/newsroom` — add a post, pick a date and badge, publish |
| **Leadership & team** | Names, roles, bios, photographs, LinkedIn links on `/about/leadership`, `/about` and `/careers` |
| **Careers — open roles** | The job list on `/careers` — add, edit, reorder or remove a role; an optional apply link per role |
| **Partner tracks** | The three partner tracks: name, tagline, description, benefits and the five-step journey |
| **Trust Center — certifications** | Every certification and assessment: names, scope, issuing body, certificate number, dates, status pill, entity, verification link, the document pack |
| **Legal pages** | The Privacy Policy and Terms of Use: title, intro, "last updated", and every section's paragraphs and bullet lists |
| **Documentation guides** | The six developer guides under `/docs`: sections with paragraphs, sub-headings, callouts, code blocks, steps, lists and card grids; their order sets the previous/next links |
| **Official collateral** | The PDFs offered on `/resources` — upload a new PDF, give it a title and blurb |

**The resource library** (the 29 datasheets, briefs, whitepapers and case
studies under `/resources/<slug>`) is *assembled* from the content above — an
edition's datasheet is built from the edition document, an industry brief from
the industry document, the trust summary from the certifications, the company
profile from the About page and the team. Edit the source and the reading page
follows. The downloadable PDFs are printed from those pages by a developer
(`scripts/build-docs.mjs`), so ask for a PDF refresh after a round of edits.

## The website builder (drag-and-drop pages) — /builder

For page-builder style editing — like a website builder — the site has its
own editor at **https://bluewhalestack-website-production-6507.up.railway.app/builder**.

- **First visit:** the setup screen creates the first account (it becomes
  the administrator). Then **Team** adds colleagues with a temporary
  password; everyone changes their own password there.
- **Pages:** create a new page at any address (for example `/webinars`), or
  **Take over** one of the existing pages — it opens pre-filled with the
  page's current sections as blocks. Publishing a taken-over page replaces
  the coded page at that address; **Unpublish** hands it back; **Duplicate**
  copies a page.
- **The editor:** drag blocks from the left (page sections, pictures and
  video, layout, BlueWhale specials, live catalog blocks) onto the canvas,
  reorder by dragging, click any text to type on the page, use the panel on
  the right for pictures, video, links and options. Preview per device with
  the phone / tablet / laptop / desktop switch. Drafts autosave; **Publish**
  makes the page live within seconds.
- **Pictures and video:** every picture/video field lets you upload, pick
  from the library, or paste a link. Videos can autoplay muted or show
  controls; YouTube and Vimeo links go in the *Embed* block.
- **Live catalog blocks** (editions, modules, industries, solutions, customer
  stories, team, open roles, certifications, collateral, newsroom, resource
  library) always show what the CMS holds — edit those items in the Studio.
- **Storage:** with the CMS write token (`SANITY_API_WRITE_TOKEN` on the
  server) pages, uploads and accounts are stored in the CMS (uploads on its
  CDN). Without it the builder still works but keeps everything on the
  server's disk, which is wiped on the next deployment — the dashboard shows
  a warning in that case.

Developers: `lib/builder/` (store, auth, actions, blocks, config, import,
render), `app/(builder)/` (screens), `middleware.ts` (sign-in gate),
`app/(site)/[...slug]` (new addresses), `builtPage()` in every coded page
(the takeover hook). `scripts/builder-smoke.mjs` and
`scripts/builder-takeover.mjs` exercise the flow in a real browser.

## Photographs and video

- Every hero has a **Photograph** field: click it, upload a JPEG/PNG/WebP
  (1536 px wide or larger works best), then drag the **hotspot** so the
  important part stays in view when the picture is cropped on phones. Fill in
  the alt text.
- To reuse a photograph already on the site, click the field and choose
  **Select** → the media library lists everything uploaded so far.
- **Video:** the same hero can play a video instead — upload an MP4/WebM
  (muted, no sound track needed, ideally under ~8 MB), or paste a direct
  `.mp4` link in *Hero video — external URL* (e.g. from Cloudinary). The
  photograph becomes the poster frame while the video loads.

## Publishing

Edit → the green **Publish** button. Drafts are private until published; a
published change is on the live site within about ten seconds. Use
**Unpublish** to take a document off the site and **History** (clock icon) to
restore an earlier version. A field left empty falls back to the built-in
text, so nothing can go blank by accident; a list emptied on purpose renders
empty.

## For developers

- **One spec, three consumers.** `content/cms/spec.ts` is a small
  description language for documents (`defineDoc`, `defineObject`, `f.str`,
  `f.arr`, …). `content/cms/docs/*.ts` describe every page document and
  collection; `content/sections/*.ts` hold the typed fallback content
  (type-checked against the spec via `InferDoc`), which is also what the seed
  script loads. The Studio compiles its schema from the same specs
  (`studio/schemaTypes/fromSpec.ts`), and `lib/cms-page.ts` generates the
  GROQ projection, merges the CMS row over the fallback and resolves images.
  Adding a field to a spec therefore adds it to the Studio, the seed, the
  query and the TypeScript type at once. How to convert a page:
  `docs/cms-page-recipe.md`.
- `lib/content.ts` — every getter asks the CMS first and falls back to the
  typed files under `content/` when the CMS is unset, empty or unreachable.
  Set `NEXT_PUBLIC_SANITY_PROJECT_ID` (+ `NEXT_PUBLIC_SANITY_DATASET`) to turn
  it on; they are build arguments in the Dockerfile.
- `app/api/revalidate/route.ts` — the publish webhook. In sanity.io/manage →
  API → Webhooks: URL `https://<site>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`,
  trigger on create/update/delete, projection `{_type}`.
- `studio/` — the Studio workspace (own `package.json`). `npm run dev` for a
  local studio, `npm run deploy` to publish it to `*.sanity.studio`
  (needs `SANITY_STUDIO_PROJECT_ID`, and either `sanity login` or a
  `SANITY_AUTH_TOKEN`). `npx sanity schema validate` checks the compiled
  schema.
- `scripts/sanity/seed.ts` — fills the dataset from the typed content and
  uploads the photographs, team photos and PDFs. Re-runnable (deterministic
  ids); needs `SANITY_API_WRITE_TOKEN` in the shell, never on the host.
  `SEED_DRY_RUN=out.json npx tsx scripts/sanity/seed.ts` writes the documents
  to a file instead — a structural check without a token.
- `scripts/text-snapshot.mjs` — snapshots the visible text of every route from
  a running build and diffs two snapshots; used to prove a content refactor
  changed no words.
- Hand-written schemas that predate the spec live in
  `studio/schemaTypes/{pages,catalog,objects}.ts`; queries for them in
  `lib/cms-queries.ts`.
