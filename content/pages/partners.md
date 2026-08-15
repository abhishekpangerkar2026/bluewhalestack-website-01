# Partners — `/partners` 🟢 built

**Purpose:** Recruit three partner tracks — License Service Provider,
System Implementation Partner, and Strategic (country) Partner.

## Sections (current build)
1. Hero — "Grow together. Win together."
2. Why partner — 3 reasons (Revenue Growth · Differentiated Portfolio ·
   Enablement & Training).
3. Partner tracks (`#tracks`) — alternating detail + code-rendered visual,
   one per track:
   - **License Service Provider (LSP)** — resells licenses, owns the
     commercial relationship, two-sided invoicing via the Partner Portal.
   - **System Implementation Partner** — delivers and supports the platform
     for end customers (discovery, migration, config, integration).
   - **Strategic Partner** — official, country-specific partner; procures
     licenses in advance/volume and operates the territory under an
     exclusive or preferred agreement.
4. Partner journey (`#journey`) — tabbed onboarding timeline, one path per
   track (apply → certify/agree → enable → launch → grow).
5. Partner Portal (`#portal`) — feature grid (deal registration, invoicing,
   customer mgmt, margins, payments, provisioning) + LSP margin tiers
   (Registered/Silver/Gold/Platinum — Strategic Partners sit above Platinum
   via bespoke agreement).
6. CTA — Become a partner / Partner login (both external, to
   partner.bluewhalestack.com).

## Components
- `components/sections/PartnerTracks.tsx` — the 3-track showcase.
- `components/sections/PartnerJourney.tsx` — tabbed journey (client component).
- `components/diagrams/PartnerTrackVisual.tsx` — per-track code-rendered
  diagram (LSP flow, implementation lifecycle, strategic territory panel).

## Copy source: `content/partners.ts` (`tracks`, `portalFeatures`, `tiers`, `whyPartner`).
