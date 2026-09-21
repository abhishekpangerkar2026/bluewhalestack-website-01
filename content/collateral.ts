/**
 * The official collateral kit (September 2026) — the finished PDFs the
 * company hands to prospects, served as-is from public/collateral/.
 * Only documents cleared for public distribution are listed: no partner
 * enablement, target lists, proposals to named prospects or internal
 * playbooks, and nothing that names third-party datacenter operators.
 */

export interface CollateralDoc {
  title: string;
  kind: "Overview" | "Company" | "Datasheet" | "Whitepaper";
  file: string;
  blurb: string;
  size: string;
}

export const collateral: CollateralDoc[] = [
  {
    title: "Product Overview — with the 3D product architecture view",
    kind: "Overview",
    file: "bluewhale-stack-product-overview.pdf",
    blurb: "What the platform is, the six-layer architecture, the nine capability families, four editions and the 90-day prototype — six pages.",
    size: "3.0 MB",
  },
  {
    title: "Company Profile",
    kind: "Company",
    file: "bluewhale-stack-company-profile.pdf",
    blurb: "Who BlueWhale Stack is: the journey from 2018 consultancy to 2026 platform company, leadership, offerings, editions, success stories and certifications.",
    size: "5.2 MB",
  },
  {
    title: "Mastering Multi-Cloud: One Control Plane for the Modern Digital Estate",
    kind: "Whitepaper",
    file: "whitepaper-mastering-multi-cloud.pdf",
    blurb: "Why the multi-cloud operating problem resists the tools most organizations already own, and why the answer is architectural — ten pages.",
    size: "0.5 MB",
  },
  { title: "Standard Edition datasheet", kind: "Datasheet", file: "datasheet-standard-edition.pdf", blurb: "Governance from day one for a single estate — scope, inclusions, deployment and published pricing.", size: "0.4 MB" },
  { title: "Enterprise Edition datasheet", kind: "Datasheet", file: "datasheet-enterprise-edition.pdf", blurb: "The complete platform across every estate — all nine families, Whale AI including offline, Cloud Audit & Evidence.", size: "0.4 MB" },
  { title: "Telco & Datacenter Edition datasheet", kind: "Datasheet", file: "datasheet-telco-datacenter-edition.pdf", blurb: "From capacity provider to cloud provider — tenancy, white-label portals, per-tenant metering into your BSS.", size: "0.4 MB" },
  { title: "Government Edition datasheet", kind: "Datasheet", file: "datasheet-government-edition.pdf", blurb: "Sovereignty demonstrated, not asserted — air-gapped classes, segregation, state-audit evidence.", size: "0.4 MB" },
  { title: "Enterprise Edition for BFSI · India datasheet", kind: "Datasheet", file: "datasheet-enterprise-bfsi-india.pdf", blurb: "The Enterprise Edition mapped to Indian banking supervision — RBI, CERT-In, SEBI and DPDP.", size: "0.4 MB" },
  { title: "Standard Edition whitepaper", kind: "Whitepaper", file: "whitepaper-standard-edition.pdf", blurb: "The business and technical case for governed multi-cloud in a growing organization.", size: "0.4 MB" },
  { title: "Enterprise Edition whitepaper", kind: "Whitepaper", file: "whitepaper-enterprise-edition.pdf", blurb: "Audit-ready multi-cloud with CFO-grade cost control — the case for the complete platform.", size: "0.4 MB" },
  { title: "Telco & Datacenter Edition whitepaper", kind: "Whitepaper", file: "whitepaper-telco-datacenter-edition.pdf", blurb: "Turning infrastructure into sellable, governed cloud services — the operator business, productised.", size: "0.4 MB" },
  { title: "Government Edition whitepaper", kind: "Whitepaper", file: "whitepaper-government-edition.pdf", blurb: "Sovereign digital infrastructure for ministries, agencies and national programmes.", size: "0.4 MB" },
  { title: "Enterprise Edition for BFSI · India whitepaper", kind: "Whitepaper", file: "whitepaper-enterprise-bfsi-india.pdf", blurb: "Supervisory evidence on demand for Indian banks and NBFCs — the regulatory map and the platform controls that answer it.", size: "0.4 MB" },
];

export const collateralHref = (d: CollateralDoc) => `/collateral/${d.file}`;
