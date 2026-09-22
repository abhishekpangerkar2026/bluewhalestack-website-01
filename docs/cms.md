# Editing the website — the CMS (Sanity)

The website's text, photographs, videos, editions, modules, industries,
solutions, case studies, team, newsroom posts and downloadable PDFs are
edited in a Sanity Studio — a form-based editing screen, no code. Publishing
a change makes it live on the site within seconds (no redeploy).

- **Editing screen:** https://bluewhalestack.sanity.studio (sign in with the
  Google or email account that was invited)
- **Invite editors:** https://www.sanity.io/manage → the project → Members →
  Invite (role *Editor* can edit and publish; *Viewer* can only read)

## Editing directly on the website ("Edit on the website" tab)

The Studio's first tab shows the live website. Click any headline,
paragraph, label or photo on the page — the matching field opens beside it,
the page updates as you type, and **Publish** makes it live. Use the page's
own navigation inside the frame to move to another page; the document
list on the left follows you. Unpublished edits are only visible in this
preview (and to anyone who opens the site while in preview mode — the
"Preview · exit" badge at the bottom-left leaves it).

**Changing a picture or adding a video:** click the photograph on the page
(hero photos, product cards, team portraits, newsroom images). The
*Photograph* field opens beside the page — **Upload** a new file or
**Select** one already in the media library, drag the hotspot, then Publish.
The *Hero video* fields sit directly under the photograph in the same form;
upload an MP4/WebM or paste a direct link and the video plays in place of
the photo. Built-in photos are clickable too, so a page that has never had
an editor image still opens its upload field.

Not clickable on the page: things that are still code (navigation, diagrams,
the generated document pages, the capability-family illustrations) — open
the document in the *Content* tab for those.

## What you can edit

| In the Studio sidebar | What it changes on the site |
|---|---|
| **Home page** | The landing hero (headline, description, buttons, the four numbers, the hero photograph or a video), the story band, the proof cards, the six differentiators, the product portfolio |
| **Page heroes** | The headline, description, photograph or video at the top of every other page — one document per page path (`/platform`, `/trust`, `/pricing` …) |
| **Editions** | Everything on the four edition pages and their cards: pricing, inclusions, fit, FAQ, photo |
| **Modules** | The 14 module pages: summary, facts, capabilities, how it works, FAQ, status badge, photo |
| **Industries / Solutions** | The sector and solution pages, including the KPI strip, regimes, use cases, FAQ, photo. Add a new one and its page appears automatically (`/industries/<slug>`) |
| **Customer stories** | The four case studies and every place they are summarised |
| **Newsroom** | Announcements on `/newsroom` — add a post, pick a date and badge, publish |
| **Leadership & team** | Names, roles, bios, photographs, LinkedIn links on `/about/leadership` and `/careers` |
| **Official collateral** | The PDFs offered on `/resources` — upload a new PDF, give it a title and blurb |

Anything not listed (navigation, the architecture diagrams, the 28 generated
document pages, legal pages, the contact form) is still edited in code.

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
restore an earlier version.

## For developers

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
  `SANITY_AUTH_TOKEN`).
- `scripts/sanity/seed.ts` — one-off migration that fills the dataset from the
  typed files and uploads the photographs, team photos and PDFs. Re-runnable;
  needs `SANITY_API_WRITE_TOKEN` in the shell, never on the host.
- Schemas live in `studio/schemaTypes/`; queries in `lib/cms-queries.ts`.
