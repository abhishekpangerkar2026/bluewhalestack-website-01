/**
 * Trust Center content — certifications, security posture, and compliance.
 * All certifications listed below are held and current.
 */

export type Certification = {
  id: string;
  name: string;
  fullName: string;
  category: CertCategory;
  scope: string;
  description: string;
  /** Body issuing or auditing the certification */
  issuedBy: string;
  /** Renewal / audit cycle */
  cycle: string;
};

export type CertCategory =
  | "information-security"
  | "privacy"
  | "cloud-security"
  | "business-continuity"
  | "compliance";

export const certCategories: Record<CertCategory, { label: string; description: string }> = {
  "information-security": {
    label: "Information Security",
    description: "Standards governing how we protect data and manage security risks.",
  },
  privacy: {
    label: "Privacy",
    description: "Frameworks governing personal data handling, consent, and individual rights.",
  },
  "cloud-security": {
    label: "Cloud Security",
    description: "Cloud-specific controls and third-party attestations.",
  },
  "business-continuity": {
    label: "Business Continuity",
    description: "Resilience and recovery standards ensuring service availability.",
  },
  compliance: {
    label: "Regulatory Compliance",
    description: "Legal and regulatory frameworks applicable to our markets.",
  },
};

export const certifications: Certification[] = [
  {
    id: "iso-27001",
    name: "ISO 27001",
    fullName: "ISO/IEC 27001:2022",
    category: "information-security",
    scope: "Information Security Management System (ISMS) covering the BlueWhale Stack platform and supporting infrastructure",
    description:
      "The globally recognised standard for information security management. Independently audited and certified — demonstrating end-to-end controls across people, processes, and technology.",
    issuedBy: "Accredited third-party certification body",
    cycle: "Annual surveillance audit, 3-year recertification",
  },
  {
    id: "iso-27017",
    name: "ISO 27017",
    fullName: "ISO/IEC 27017:2015",
    category: "cloud-security",
    scope: "Cloud service controls across the BlueWhale Stack SaaS and BYOC delivery models",
    description:
      "Cloud-specific extension to ISO 27001 — defines additional controls for cloud service providers and their customers. Covers shared responsibilities, virtual machine hardening, and cloud-specific threat management.",
    issuedBy: "Accredited third-party certification body",
    cycle: "Annual surveillance audit",
  },
  {
    id: "iso-27018",
    name: "ISO 27018",
    fullName: "ISO/IEC 27018:2019",
    category: "privacy",
    scope: "Personally Identifiable Information (PII) processed within the BlueWhale Stack platform",
    description:
      "The international standard for protecting personal data in public cloud services. Establishes commonly accepted control objectives, controls, and guidelines for processing PII in the cloud.",
    issuedBy: "Accredited third-party certification body",
    cycle: "Annual surveillance audit",
  },
  {
    id: "iso-27701",
    name: "ISO 27701",
    fullName: "ISO/IEC 27701:2019",
    category: "privacy",
    scope: "Privacy Information Management System (PIMS) extension to our certified ISMS",
    description:
      "Privacy extension to ISO 27001 — specifies requirements and guidance for establishing, implementing, and continually improving a Privacy Information Management System. Demonstrates accountability under GDPR and DPDP Act.",
    issuedBy: "Accredited third-party certification body",
    cycle: "Annual surveillance audit, aligned to ISO 27001 cycle",
  },
  {
    id: "iso-22301",
    name: "ISO 22301",
    fullName: "ISO 22301:2019",
    category: "business-continuity",
    scope: "Business Continuity Management System (BCMS) for the BlueWhale Stack platform and operations",
    description:
      "The international standard for Business Continuity Management. Certifies our ability to continue critical operations, protect people, and recover from disruption — backed by tested plans, defined RTOs, and regular drills.",
    issuedBy: "Accredited third-party certification body",
    cycle: "Annual surveillance audit, 3-year recertification",
  },
  {
    id: "csa-star",
    name: "CSA STAR Level 2",
    fullName: "CSA Security Trust Assurance and Risk (STAR) Level 2",
    category: "cloud-security",
    scope: "Cloud security controls mapped to the Cloud Controls Matrix (CCM) v4",
    description:
      "The Cloud Security Alliance STAR Level 2 certification — the highest third-party assessed tier of CSA STAR. Confirms our cloud controls are independently evaluated against the CCM, providing customers with rigorous, cloud-native security assurance.",
    issuedBy: "CSA accredited third-party auditor",
    cycle: "Annual assessment",
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    fullName: "AICPA SOC 2 Type II",
    category: "information-security",
    scope: "Security, Availability, Confidentiality, and Processing Integrity TSCs across the BlueWhale Stack production environment",
    description:
      "Independent auditor report covering how we design and operate controls over a sustained audit period (minimum 6 months). Provides point-in-time assurance that controls were consistently effective — not just designed well.",
    issuedBy: "Licensed CPA firm (AICPA auditing standards)",
    cycle: "Annual audit period",
  },
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "EU General Data Protection Regulation (2016/679)",
    category: "compliance",
    scope: "Processing of EU/EEA personal data across the BlueWhale Stack platform and Data Processing Agreements",
    description:
      "BlueWhale Stack is GDPR-ready as both a Data Processor and Data Controller where applicable. Our ISO 27701 certification, DPA templates, data residency options (Frankfurt region), and Privacy Policy underpin GDPR obligations.",
    issuedBy: "Regulatory — EU/EEA",
    cycle: "Ongoing — continuous compliance programme",
  },
  {
    id: "dpdp",
    name: "India DPDP Act 2023",
    fullName: "Digital Personal Data Protection Act 2023 (India)",
    category: "compliance",
    scope: "Processing of Indian citizens' personal data; Significant Data Fiduciary readiness",
    description:
      "BlueWhale Stack is compliant with India's DPDP Act 2023, covering consent frameworks, data localisation (Mumbai region), Data Fiduciary obligations, and breach notification procedures. Built-in controls support SDF readiness requirements.",
    issuedBy: "Regulatory — Government of India",
    cycle: "Ongoing — continuous compliance programme",
  },
];

export const trustPillars = [
  {
    icon: "ShieldCheck",
    title: "Third-party audited",
    body: "Every ISO and SOC 2 certification is independently audited — not self-assessed. Audit reports available to enterprise customers under NDA.",
  },
  {
    icon: "Globe",
    title: "Data residency",
    body: "Choose where your data lives: Singapore, Mumbai, Frankfurt, or Los Angeles. Sovereign and air-gapped options available for regulated workloads.",
  },
  {
    icon: "Lock",
    title: "Encryption at rest & in transit",
    body: "AES-256 at rest, TLS 1.3 in transit. Customer-managed keys available on Enterprise Plus and Sovereign editions.",
  },
  {
    icon: "Eye",
    title: "Transparency & reporting",
    body: "Annual Transparency Report, SOC 2 summary reports, and a shared-responsibility matrix available for every deployment model.",
  },
];

export const trustFaq = [
  {
    q: "How do I access the full SOC 2 Type II report?",
    a: "The full report is available to Enterprise and Sovereign customers under NDA. Contact your account team or email security@bluewhalestack.com to request a copy.",
  },
  {
    q: "Which certifications apply to the Sovereign / air-gapped edition?",
    a: "All certifications apply to the Sovereign edition. Air-gapped deployments additionally support in-region AI inference and can be scoped for additional local regulatory requirements.",
  },
  {
    q: "Do you offer a Data Processing Agreement (DPA)?",
    a: "Yes — our standard DPA is available for all paid editions. It covers GDPR Article 28, India DPDP Act requirements, and sub-processor disclosure. Request it at legal@bluewhalestack.com.",
  },
  {
    q: "How do you handle security incidents?",
    a: "We follow ISO 27001 incident management procedures with defined classification, escalation, and notification timelines. Enterprise customers receive direct notification within 72 hours for confirmed personal data incidents.",
  },
  {
    q: "What sub-processors do you use?",
    a: "Our current sub-processor list is maintained and updated on this page. We notify customers of material changes 30 days in advance (per our DPA terms).",
  },
];
