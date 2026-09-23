/**
 * /docs (and the labels shared by every /docs/<slug> guide page) as the code
 * ships them: the fallback for the CMS "Docs page" document and what the
 * seed script loads into it. The guides themselves are a collection
 * (getDocPages()).
 */
import type { DocsPage } from "@/content/cms/docs/docsPage";
import { docCards } from "@/content/docs";

export const docsPage: DocsPage = {
  seoTitle: "Docs",
  seoDescription:
    "Technical documentation, API reference, quick-start guides and integration tutorials for BlueWhale Stack.",
  hero: {
    kicker: "Documentation",
    title: "Connect an account, federate your IdP, call the API.",
    description:
      "Six guides written for the engineer doing the work: the exact IAM role, app registration or service account each cloud needs, the Edge Agent's outbound-only path on port 443, SSO and SCIM setup, the service catalog, and the REST API with webhooks and events.",
    jumpLabel: "Jump to",
    // Only destinations that actually exist as routes.
    quickLinks: [
      { label: "Quick start", href: "/docs/quick-start" },
      { label: "API reference", href: "/docs/api-reference" },
      { label: "Cloud integration", href: "/docs/cloud-integration" },
      { label: "Security & compliance", href: "/trust" },
      { label: "Support", href: "/contact" },
    ],
    panelKicker: "From setup to your first integration",
    panelLinks: [
      { index: "01", href: "/docs/quick-start", title: "Connect your first account", description: "Set up SaaS and run your first discovery." },
      { index: "02", href: "/docs/identity-access", title: "Bring your identity provider", description: "Configure federation, SSO and access." },
      { index: "03", href: "/docs/api-reference", title: "Build with the API", description: "Authentication, resources and webhooks." },
    ],
  },
  guides: {
    heading: {
      eyebrow: "Guides",
      title: "Start here",
      description: "The reference set most teams open first — from a platform overview to the full REST API.",
    },
    cards: docCards.map((d) => ({ slug: d.slug, title: d.title, body: d.body, tags: [...d.tags], icon: d.icon })),
    cardLink: "Read guide",
  },
  api: {
    heading: {
      eyebrow: "Developer reference",
      title: "Looking for the API?",
      description: "Full REST reference with OAuth2, webhooks, and Python & Go SDKs.",
    },
    primary: { label: "Open the API reference", href: "/docs/api-reference" },
    secondary: { label: "Request SDK access", href: "/contact" },
  },
  detail: {
    breadcrumb: "Docs",
    onThisPage: "On this page",
    previous: "Previous",
    next: "Next",
    helpTitle: "Have a question or hit a blocker?",
    helpBody: "Our support team and account engineers are here to help.",
    helpCta: { label: "Contact support", href: "/contact" },
  },
};
