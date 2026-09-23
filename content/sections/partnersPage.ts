/**
 * /partners — every section's copy as the code ships it: the fallback for the
 * CMS "Partners page" document and what the seed script loads into it. The
 * three tracks are the "Partner track" documents; the Partner Portal URLs
 * come from the site settings.
 */
import type { PartnersPage } from "@/content/cms/docs/partnersPage";
import { portalFeatures, programDocuments, tiers, tiersNote, whyPartner } from "@/content/partners";

export const partnersPage: PartnersPage = {
  seoTitle: "Partners",
  seoDescription:
    "Three ways to partner with BlueWhale Stack — License Service Provider, System Implementation Partner, or Strategic (country) Partner. Apply and run your business through the Partner Portal at partners.bluewhalestack.com.",
  hero: {
    registerLabel: "Become a partner",
    loginLabel: "Partner login",
    portalLabel: "Portal:",
  },
  why: {
    heading: {
      eyebrow: "Why partner",
      title: "A platform built to grow your business",
      description: "Hyperscaler-neutral, multi-edition, and backed by a portal that runs the commercial side for you.",
    },
    items: whyPartner.map((w) => ({ ...w })),
  },
  tracks: {
    heading: {
      eyebrow: "Three ways to partner",
      title: "Pick the track that matches how you work",
      description: "Resell licenses, deliver implementations, or operate a territory — each track has its own agreement, enablement and portal access.",
    },
    trackLabel: "Track",
    idealForLabel: "Ideal for —",
    applyLead: "Apply for the",
    applyTrail: "track",
  },
  journey: {
    heading: {
      eyebrow: "The journey",
      title: "From application to launch",
      description: "Every track runs through the Partner Portal, but the enablement steps differ. Pick a track to see its path.",
    },
  },
  guides: {
    heading: {
      eyebrow: "Program guides",
      title: "Download the full program guide for your track",
      description: "Each PDF covers the commercial model, benefits and onboarding journey — the LSP guide also includes the full margin-tier table.",
    },
    documents: programDocuments.map((d) => ({ ...d })),
    downloadLabel: "Download PDF",
    note: "Margin and commitment figures in the LSP guide are illustrative — final terms are confirmed in your signed Partner Agreement.",
  },
  portal: {
    heading: {
      eyebrow: "Partner Portal",
      title: "Run your reselling business in one place",
      description: "Deal registration, two-sided invoicing, margins, payments and provisioning — live at partners.bluewhalestack.com.",
    },
    openLabel: "Open the portal",
    features: portalFeatures.map((x) => ({ ...x })),
  },
  tiers: {
    kicker: "LSP margin tiers",
    body: "Tiers apply to License Service Providers and grow with committed volume. Strategic Partners operate above Platinum under a bespoke territory agreement.",
    items: tiers.map((t) => ({ ...t, perks: [...t.perks] })),
    marginLabel: "Margin",
    commitmentLabel: "Commitment",
    note: tiersNote,
  },
  bottom: {
    registerLabel: "Become a partner",
    loginLabel: "Partner login",
  },
};
