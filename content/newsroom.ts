import type { CmsImage } from "@/content/cmsTypes";

/** Newsroom announcements — the fallback when the CMS has no posts yet. */
export interface Announcement {
  date: string;
  category: string;
  title: string;
  body: string;
  badge: string;
  href?: string;
  cmsImage?: CmsImage;
}

export const announcements: Announcement[] = [
  {
    date: "June 2026",
    category: "Product",
    title: "Whale AI reaches 50+ use cases across the platform",
    body: "The Whale AI layer now covers 50+ production use cases spanning FinOps, security, ITSM, migration and observability — available in Spark, Tide and Abyss tiers from Standard edition up.",
    badge: "Product launch",
  },
  {
    date: "May 2026",
    category: "Certification",
    title: "BlueWhale Stack achieves ISO 27001:2022 and completes SOC 2 Type II readiness",
    body: "ISO 27001:2022 is now certified, alongside a SOC 2 Type II readiness assessment against the AICPA Trust Services Criteria. Signed certificates are downloadable from the Trust Center.",
    badge: "Trust & compliance",
  },
  {
    date: "April 2026",
    category: "Product",
    title: "WhaleForge IaC enters public beta",
    body: "WhaleForge — the declarative YAML-to-Terraform engine — is now in public beta with support for AWS, Azure and GCP, plus live HLD/LLD/TOGAF architecture diagrams.",
    badge: "Beta",
  },
  {
    date: "March 2026",
    category: "Platform",
    title: "Landing Zone Builder ships for AWS Control Tower & Azure CLZ",
    body: "The visual Landing Zone Builder generates multi-account baseline HCL for AWS Control Tower, Azure Cloud Landing Zone and GCP foundations — no Terraform expertise required.",
    badge: "Product launch",
  },
  {
    date: "February 2026",
    category: "Platform",
    title: "Oracle Cloud, Alibaba Cloud and Huawei Cloud connectors live",
    body: "The Cloud Connectors module now covers all six major public clouds — AWS, Azure, GCP, Oracle Cloud, Alibaba Cloud and Huawei Cloud — plus private, virtualization, hybrid and edge estates via the Edge Agent.",
    badge: "Product launch",
  },
  {
    date: "January 2026",
    category: "Platform",
    title: "Government Edition: sovereign & air-gapped deployment GA",
    body: "The Government Edition with full air-gapped, in-region sovereign deployment is generally available. Supports DPDP, GDPR and NCA-ECC compliance with no outbound connectivity required.",
    badge: "GA",
  },
];

/** "June 2026" → "2026-06-01" for the CMS date field. */
export function announcementDate(a: Announcement): string {
  const d = new Date(`${a.date} 1`);
  return Number.isNaN(d.getTime()) ? "2026-01-01" : d.toISOString().slice(0, 10);
}

/** "2026-06-01" → "June 2026" for display. */
export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}
