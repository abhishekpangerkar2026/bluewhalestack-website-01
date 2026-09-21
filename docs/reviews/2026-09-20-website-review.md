# BlueWhale Stack website review and redesign brief

Reviewed 20 September 2026. Target: https://bluewhalestack-website-production-6507.up.railway.app/. Working assumption: the main commercial goal is qualified enterprise demo enquiries.

**Recommendation: redesign the experience around a clear product story, credible evidence and a simple next step.** The website has substantial technical content, a useful control-plane proposition and unusually specific deployment information. Its main weakness is how much it presents at once. Repeated illustrations and overlapping catalogues add length without helping a buyer understand or evaluate the product.

**Scope and evidence.** This review combines live HTTP checks, examination of the page templates and content, and visual inspection of representative original image assets. All 92 discovered page routes returned HTTP 200. All 126 checked image/PDF URLs responded successfully using HEAD or a GET fallback. Eleven Next.js image URLs rejected HEAD but returned valid images with GET; these are not broken images. Every checked page had one server-rendered H1 and a description. No missing fragment targets were found among the checked internal page links.

The browser connection was unavailable. Rendered desktop/mobile layouts, keyboard interactions, dark-mode appearance, visual contrast and real performance timings therefore remain unverified. Accessibility and performance findings below are based on source inspection. No forms were submitted, no notifications were sent, and no application or deployment settings were changed. Case-study outcomes, certifications and product capabilities were not independently authenticated. The accompanying live-checks JSON records the crawl scope.

**What deserves keeping.** Keep the blue/navy identity, “Every cloud. One control plane.” headline, specific integration coverage, public starting prices, deployment options, useful technical documentation, and the offer of a practical session with an engineer. The About story and leadership profiles can help distinguish the company from anonymous software vendors. Module-level maturity labels and illustrative-screen disclosures are good foundations; apply them consistently.

**The most important design and content findings:**

| Area | Observed issue | Redesign recommendation |
|---|---|---|
| Positioning | The hero leads with “Digital Experience Platform · 54 capabilities · 9 families · 4 editions”; About describes a Cloud Management Platform. Visitors must decode the catalogue before understanding the category. | Use one category and a short benefit statement. Move counts and product taxonomy into the platform catalogue. |
| Homepage hierarchy | Approximately 2,600 words of server-rendered main content and 12 H2 section headings. The problem, promise, motion, differentiators and other blocks repeatedly explain the same unified-platform idea. | Give the homepage about seven focused sections. Move detailed architecture, full edition comparisons, the Fabric initiative and extended stories to destination pages. |
| Navigation | Products, families, modules, editions, solutions and industries create overlapping ways to discover similar information. | Use Platform, Solutions, Customers, Resources and Pricing as the main buyer navigation. Give Company, Partners and Login a quieter utility position. Keep the detailed catalogue one level deeper. |
| Product evidence | Homepage console tabs are code-built illustrative mockups. Module pages disclose sample data; the homepage does not carry the same disclosure. | Use sanitized real product captures for primary evidence. Clearly label any illustrative interface. Show complete tasks rather than an unexplained dashboard. |
| Conversion | Calls to action include “See it on your estate,” “Book a demo,” “Book a working session,” discovery workshops and prototypes. The first session is described as requiring a connected cloud account. | Make “Book a demo” the consistent primary action. Offer a sample-data demo first and an optional technical session on the visitor’s environment later. Explain what the visitor will receive. |
| Contact form | Nine visible data fields plus consent, including industry and edition choices before qualification. Some submitted context is omitted from the notification. | Start with name, work email and company, plus optional context and required consent. Capture edition/industry later or make their purpose clear. Preserve referral context automatically. |
| Proof | All featured stories are anonymous, several outcomes are broad labels, and source comments describe authored quotes rather than supplied customer testimony. | Keep confidentiality where needed, but use approved evidence with scope, timeframe and measurement context. Present company-authored summaries as summaries. |
| Pricing | The page advertises 1-, 3- or 5-year terms while also offering a two-year discount. The worked example mentions twelve modules while the main catalogue describes fourteen. | Resolve commercial facts in one source of truth and show a simple comparison before the detailed feature matrix. |

Sources: `content/home.ts`, `content/company.ts`, `content/about.ts`, `app/page.tsx`, `components/sections/ProductShowcase.tsx`, `app/modules/[slug]/page.tsx`, `components/forms/ContactForm.tsx`, `app/pricing/page.tsx:75`, `app/pricing/page.tsx:224`, `content/editions.ts`.

**The imagery needs a new role.** Increasing resolution will not solve the main problem. The estate and platform assets are already 2000 × 2000 pixels. Their weakness is art direction: pale floating platforms, small clouds and servers, blue cables, glossy reflections and large empty areas. The estate and platform pictures are almost interchangeable. Repeated labels embedded in the pictures compete with the actual page copy and become hard to read when the pictures are reduced.

| Current image type | Assessment | Replacement |
|---|---|---|
| Homepage and platform 3D scene | The toy-like infrastructure model makes the offering feel conceptual. It shows connections but little of what an operator actually does. | A large real interface capture with two or three short HTML annotations explaining inventory, cost or audit work. |
| Module and industry variants | Similar boards and objects with different labels provide little visual differentiation. | A distinct workflow or relevant product screen for each priority use case. Reuse a coherent diagram style, not the same scene. |
| Customer banners | The BFSI example is a flat skyline and rising line, with no customer-specific evidence. Its alt text describes teams reviewing dashboards, which the asset does not depict. | An outcome-led case-study card, approved photography where available, and accurate alt text. Avoid invented customer premises or people. |
| Architecture posters | Useful technical detail, but the banking poster contains seven layers and multiple fine-print side panels. | A simple inline diagram with a handful of readable stages. Keep the detailed poster, existing text transcription and download as deeper material. |
| Homepage motion strip | Loops illustrate the same concepts again. The text discusses scene rendering, five-second loops and MP4/WebM downloads. | One short product-task demonstration. Move media-pack information into Resources. |
| Leadership portraits | A useful human element that supports the company story. | Consistent crops, background treatment and lighting across approved portraits. |

Inspected assets include `public/product-3d/scenes/estate.webp`, `platform.webp`, `industry-bfsi-800.webp`, `whale-ai-800.webp`, `architecture-800.webp`, `public/customers/bfsi-banner.png` and `public/industry-architecture/bfsi-1200.webp`. Scene loading is implemented in `components/scenes/ProductScene.tsx`; motion-strip copy is in `components/sections/MotionStrip.tsx`.

**Credibility fixes should accompany the design.** The source comment at `content/customers.ts:6` says quotations were written “in the voice of the outcome described,” and `components/sections/CustomerStories.tsx` presents them as quotations attributed to customer job titles. That is not equivalent to an approved testimonial. Replace them with unquoted case summaries unless approved verbatim quotations are available. This finding concerns the presentation of quotes; it does not establish that the underlying engagements are fictional.

Availability also needs a consistent explanation. `content/company.ts:105` describes 54 capabilities as shipped, while `content/moduleDetails.ts:299` and `:338` state that parts of the Whalenomics backend are in progress, and `:345` and `:383` state that migration execution hooks are in progress. Some pages already explain this well. Carry the same Available / Beta / Preview / Planned distinctions into headline claims, comparisons and pricing. Verify outcome numbers, deployment claims and certification evidence with the relevant owner before using them prominently.

**Recommended visual direction.** Use a predominantly white or warm-white canvas, navy headings and a restrained blue accent. Establish a clear type scale and consistent spacing. Give real product interfaces enough area to be read. Use a small family of diagrams with live text, simple lines and a clear hierarchy. Alternate a few purposeful section formats instead of repeating icon cards. Use motion only where it explains a change or task. Start with one excellent visual theme; add a second theme only when every component and image has been checked in it.

Suggested hero copy:

> **Every cloud. One control plane.**
>
> Manage cloud and on-premises infrastructure, control spend, and maintain audit evidence from one platform.
>
> **Book a demo** · Explore the platform

This is draft positioning, subject to confirming which capabilities are available today. The supporting visual should show the real platform performing a relevant task.

Suggested homepage sequence:

1. **Clear value proposition and product interface.** Category, headline, short description and one main CTA.
2. **Supported environments.** A compact integration row, explicitly described as compatibility rather than customer endorsement.
3. **Three buyer outcomes.** Understand the estate, control spend, and govern access/evidence; map each to currently available capabilities.
4. **How it works.** Three readable steps with a small diagram and a link to deeper technical detail.
5. **Customer evidence.** One strong approved case study with a contextualized result and a link to the full account.
6. **Deployment and trust.** A compact explanation of where it runs, current certification/assessment status and supporting documents.
7. **Demo invitation.** Short form or clear route to booking, with the session scope and response expectations.

**Page-specific redesign priorities:**

| Page group | Direction |
|---|---|
| Platform | Reduce the approximately 3,160-word overview to a scannable story. Lead with an interface and simple architecture, then outcomes, integrations, deployment and proof. Put deep specifics behind clear links. |
| Modules | Keep the useful maturity labels and FAQs. Standardize each page around user problem, actual workflow, available features, integrations and next step. Explain brand names in plain language. |
| Solutions and industries | Separate the job to be done from the sector context. A solution page explains the workflow; an industry page explains its constraints, evidence and relevant example. Reduce duplicated copy. |
| Editions and pricing | Present who each edition serves, what is available, included limits and the next step. Keep the full matrix available without making it the first reading task. |
| Whale AI and WhaleForge | Show input → grounded output → user action. WhaleForge’s YAML-to-Terraform example is a more concrete product explanation than the decorative scenes. Keep beta/availability labels prominent. |
| Fabric | Give the initiative its own narrative and clear preview status. Use a compact relevant link from the main site so it does not compete with the established platform story. |
| Customers and case studies | Make one clear index leading to detailed stories. Remove duplicated overviews where they add no value. Use approved quotes or attributed summaries, realistic metrics and useful diagrams. |
| Trust | Preserve the distinction between certification, self-assessment and readiness. Provide concise status summaries with optional deep documentation; the current main content is approximately 3,200 words. |
| Resources and docs | Keep ungated educational material. Prioritize getting-started guidance and allow filtering/search where useful. Remove prose about the mechanics of website/PDF production. |
| About, leadership and careers | Emphasize actual people, delivery experience and the path from consultancy to product. Validate current openings and employment claims before publication. |
| Contact and partners | Shorten initial forms, explain the next step, preserve referral context and make all delivery/error states accurate. |

**Functional work to include in the redesign:**

| Priority | Finding and evidence | Required outcome |
|---|---|---|
| High | All 92 checked live pages declare `https://www.bluewhalestack.com` as their canonical URL. `app/layout.tsx:52` supplies the shared homepage canonical. | Each indexable page needs its own intended canonical URL. Confirm the production-domain plan before rollout. |
| High | Contact success is returned even when email delivery fails. The fallback log contains reference/email, not the full lead. The UI ignores the delivery result. `app/api/contact/route.ts:60–71`; `components/forms/ContactForm.tsx:46–69`. | Persist the complete request durably before confirming receipt; retry notifications and give useful failure states. This is a code-level loss risk, not evidence that current production email is failing. |
| High | Normal forward keyboard navigation moves through all top-level menu links before the panels. Each new focus changes the open panel. `components/layout/Header.tsx:103–143`. | Make every menu reachable and operable by keyboard, with predictable focus and dismissal behavior. Verify in a browser. |
| Medium | Document modals lack dialog semantics, focus management, Escape dismissal and viewport-constrained scrolling. `PartnerDocuments.tsx`; `CertificateVault.tsx`. | Use accessible dialogs that work on short screens and with an onscreen keyboard. |
| Medium | The document UI promises an emailed copy, but the notification code addresses the configured lead recipient. Client unlock state can outlast the one-hour server cookie. | Implement the promised visitor email or correct the copy; recover gracefully when download authorization expires. |
| Medium | Desktop and mobile hero-art instances can both mount WebGL despite one being CSS-hidden. Live rendering runs continuously; offscreen visibility is not used to pause it. | Mount only necessary scenes, pause offscreen work and measure the benefit. No performance score or load-time claim was established here. |
| Medium | Video loops lack pause/reduced-motion handling; the marquee explicitly continues under reduced motion. | Provide motion controls and static alternatives. |
| Medium | Chat responses contain plain-text URLs; its fixed-height panel can exceed short viewports. | Make suggested actions clickable and size the panel to available space. |
| Low | Thirteen checked routes were absent from the sitemap, including Trust, product, leadership, legal and documentation-detail routes. | Include intended indexable routes from the same content definitions used to create pages. |

The public `www` homepage responds with a different title and a much smaller initial HTML shell than the reviewed Railway v2 site. App and partner portal homepages also respond successfully. This review does not assume that the Railway v2 domain already serves the public `www` site; verify domain routing as part of launch planning.

**Suggested order of work.** First establish approved product claims, case-study evidence and the primary conversion path. Correct lead handling and canonical metadata. Next design the homepage, one product/solution page and the mobile navigation together so the visual system works beyond a single hero. Then apply the system across the page families, replace repeated art with approved product evidence, and verify forms, downloads and responsive behavior before deploying.

Acceptance should include rendered checks at phone, tablet and desktop widths; keyboard-only navigation and forms; reduced-motion behavior; readable image annotations; accurate maturity/pricing labels; verified form delivery with a durable record; correct canonical/sitemap URLs; and measured loading/responsiveness on a representative mobile connection. None of those browser-dependent checks should be treated as passed by this source/HTTP audit.
