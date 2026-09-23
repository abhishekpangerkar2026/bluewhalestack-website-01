/**
 * /trust — every section's copy as the code ships it: the fallback for the
 * CMS "Trust Center page" document and what the seed script loads into it.
 * The certifications themselves are a collection (getCertifications()).
 */
import type { TrustPage } from "@/content/cms/docs/trustPage";
import { trustFaq, trustPillars } from "@/content/trust";

export const trustPage: TrustPage = {
  seoTitle: "Trust Center",
  seoDescription:
    "BlueWhale Stack's security certifications, compliance posture, and privacy programme. ISO 27001, ISO 27017, ISO 27018, ISO 27701, ISO 22301, CSA STAR Level 1, SOC 2 Type II readiness assessment, GDPR, and India DPDP Act 2023.",
  hero: {
    primary: { label: "Download certificates", href: "#certifications" },
    secondary: { label: "Privacy policy", href: "/legal/privacy" },
    tertiary: { label: "Terms of service", href: "/legal/terms" },
  },
  pillars: {
    items: trustPillars.map((p) => ({ ...p })),
  },
  certifications: {
    heading: {
      eyebrow: "Certifications",
      title: "Five ISO certifications, independently audited. Three assessments, stated as such.",
      description:
        "ISO certifications are audited by accredited third-party bodies and carry certificate numbers you can verify. CSA STAR Level 1 is a self-assessment, GDPR is a compliance assessment, and SOC 2 Type II is a readiness assessment — not a CPA-issued audit opinion. Signed certificate PDFs are below; full audit reports and attestation letters are available to Enterprise customers under NDA.",
    },
  },
  matrix: {
    heading: {
      eyebrow: "Deployment models",
      title: "Compliance across every deployment",
      description:
        "All certifications apply to SaaS. BYOC and Sovereign deployments additionally scope in-region data residency and customer-managed key controls.",
    },
    columns: {
      certification: "Certification",
      saas: "SaaS",
      byoc: "BYOC",
      sovereign: "Sovereign",
    },
  },
  faq: {
    heading: {
      eyebrow: "FAQ",
      title: "Common security questions",
    },
    items: trustFaq.map((q) => ({ ...q })),
  },
  cta: {
    title: "Need the full audit package?",
    body: "Signed ISO certificates are downloadable above. SOC 2 readiness reports, underlying audit evidence, and DPA templates are available to Enterprise customers under NDA.",
    primary: { label: "Request documents", href: "/contact" },
    secondary: { label: "Government Edition", href: "/editions/government" },
  },
};
