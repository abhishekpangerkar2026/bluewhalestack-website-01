# Image manifest (AI-generated / licensed)

The site is **content- and diagram-first** — most visuals are code-based
(architecture diagrams, the 3D globe, the product mockup, icons) and need **no
image files**. The only photographic slots are the **customer stories** on the
homepage. Until a real asset is supplied, each slot renders an on-brand
placeholder automatically, so the site is always shippable.

## How to add a customer-story image
1. Generate or license the image (Midjourney, DALL·E, Firefly, stock, etc.).
2. Save it to **`public/customers/<filename>`** (JPG or WebP, ~1600×1000, 16:10).
3. In [`content/customers.ts`](../content/customers.ts), set `image:
   "/customers/<filename>"` on that story. The placeholder is replaced
   automatically and the photo is shown with rounded corners + soft shadow.
4. Rebuild: `docker compose up --build -d`.

**Aspect ratio:** 16:10. Keep the subject centered; no text in the image.

## Customer-story slots

| Story (`slug`) | Suggested filename | Prompt |
|---|---|---|
| `national-digital-authority` | `government.jpg` | Photorealistic modern government digital operations center, diverse officials reviewing dashboards on large screens, secure control room, blue and deep navy tones, professional, cinematic lighting, no text |
| `gulf-telecom-group` | `telco.jpg` | Photorealistic telecom network operations center, engineers at curved desks facing a wall of network maps and graphs, glowing blue tones, futuristic, cinematic wide shot, no text |
| `meridian-financial` | `enterprise.jpg` | Photorealistic diverse enterprise finance and IT team collaborating in a modern glass office, reviewing cloud cost dashboards on monitors, bright professional, subtle blue brand tones, cinematic, no text |

> The prompt subject also lives inline on each story as `imageAlt` in
> `content/customers.ts`, so it stays next to the content and doubles as the
> `alt` text once a real image is dropped in.

## Optional: social share image (OpenGraph)
For richer link previews, add `public/og.png` (1200×630, brand background +
logo + tagline) and reference it in `app/layout.tsx` `openGraph.images` /
`twitter.images`. Without it, link unfurls fall back to text metadata (already
configured).

## Brand styling note
Code-based visuals (diagrams, globe, mockup) are the primary imagery and are
fully on-brand by construction. Photographs are used sparingly, only where a
human moment adds credibility (customer stories).
