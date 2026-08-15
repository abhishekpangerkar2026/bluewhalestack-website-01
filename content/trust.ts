/**
 * Trust Center content — certifications, security posture, and compliance.
 *
 * Certificate facts (number, dates, issuer) are transcribed from the signed
 * certificates in /certificates. Keep them in sync if a certificate is
 * renewed or reissued — the PDF filename must match `id` (e.g. `iso-27001.pdf`).
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
  /** Certificate / registration number as printed on the certificate */
  certNumber?: string;
  /** Date the current certificate was issued */
  issueDate?: string;
  /** Surveillance / expiry / next-review date */
  validUntil?: string;
  /** Label for `validUntil` — defaults to "Valid until" */
  validLabel?: string;
  /** Full recertification date, when the certificate has a fixed cycle */
  recertificationDate?: string;
  /** Pill shown on the card — defaults to "Certified" */
  statusLabel?: string;
  /** Pill color — defaults to "success" */
  statusTone?: "success" | "neutral" | "warning";
  /** Whether a signed PDF exists at /certificates/{id}.pdf for gated download */
  downloadable?: boolean;
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
    scope:
      "ISMS covering the design, development, hosting, operation, maintenance, and support of BlueWhale Stack and BlueWhale Fincore — including multi-cloud management, provisioning, migration, ITSM, observability, FinOps, identity, Whale AI, invoicing, API integrations, access control, incident management, backup, and customer data protection.",
    description:
      "The globally recognised standard for information security management. Independently audited and certified — demonstrating end-to-end controls across people, processes, and technology.",
    issuedBy: "LMS Assessments Limited (EGAC / IAF accredited)",
    cycle: "Annual surveillance audit · 3-year recertification",
    certNumber: "AE260625009",
    issueDate: "25 Jun 2026",
    validUntil: "24 Jun 2027",
    recertificationDate: "24 Jun 2029",
    downloadable: true,
  },
  {
    id: "iso-27017",
    name: "ISO 27017",
    fullName: "ISO/IEC 27017:2015",
    category: "cloud-security",
    scope:
      "Cloud security controls across BlueWhale Stack and BlueWhale Fincore — multi-cloud management, cloud inventory, provisioning and landing zones, migration, ITSM, observability, identity, FinOps, secure cloud operations, shared-responsibility controls, and customer data protection across public cloud, hybrid cloud, and on-premises.",
    description:
      "Cloud-specific extension to ISO 27001 — defines additional controls for cloud service providers and their customers. Covers shared responsibilities, virtual machine hardening, and cloud-specific threat management.",
    issuedBy: "SNS Certification Inc. (IACGS accredited)",
    cycle: "Annual surveillance audit · 3-year recertification",
    certNumber: "2026784001",
    issueDate: "18 Jun 2026",
    validUntil: "18 Jun 2027",
    recertificationDate: "18 Jun 2029",
    downloadable: true,
  },
  {
    id: "iso-27018",
    name: "ISO 27018",
    fullName: "ISO/IEC 27018:2019",
    category: "privacy",
    scope:
      "Protection of PII in public cloud environments across BlueWhale Stack and BlueWhale Fincore — collection, processing, storage, transmission, retention, and deletion of customer and end-user personal data through multi-cloud management, identity, invoicing, and API integrations.",
    description:
      "The international standard for protecting personal data in public cloud services. Establishes commonly accepted control objectives, controls, and guidelines for processing PII in the cloud.",
    issuedBy: "SNS Certification Inc. (IACGS accredited)",
    cycle: "Annual surveillance audit · 3-year recertification",
    certNumber: "2026086002",
    issueDate: "17 Jun 2026",
    validUntil: "16 Jun 2027",
    recertificationDate: "16 Jun 2029",
    downloadable: true,
  },
  {
    id: "iso-27701",
    name: "ISO 27701",
    fullName: "ISO/IEC 27701:2019",
    category: "privacy",
    scope:
      "Privacy Information Management System extension to our certified ISMS — privacy governance, processing of PII through multi-cloud management, identity, invoicing, and API integrations, consent management, data subject rights, retention, deletion, breach response, and third-party processing controls.",
    description:
      "Privacy extension to ISO 27001 — specifies requirements and guidance for establishing, implementing, and continually improving a Privacy Information Management System. Demonstrates accountability under GDPR and DPDP Act.",
    issuedBy: "Staunchly Management and System Services Limited (EGAC accredited)",
    cycle: "Annual surveillance audit · 3-year recertification, aligned to ISO 27001 cycle",
    certNumber: "AE63241V",
    issueDate: "25 Jun 2026",
    validUntil: "24 Jun 2027",
    recertificationDate: "24 Jun 2029",
    downloadable: true,
  },
  {
    id: "iso-22301",
    name: "ISO 22301",
    fullName: "ISO 22301:2019",
    category: "business-continuity",
    scope:
      "Business Continuity Management System for the design, development, hosting, operation, maintenance, and support of BlueWhale Stack and BlueWhale Fincore — multi-cloud operations, provisioning, migration, ITSM, observability, security, FinOps, identity, invoicing, risk assessment, disaster recovery, backup, incident response, and crisis communication.",
    description:
      "The international standard for Business Continuity Management. Certifies our ability to continue critical operations, protect people, and recover from disruption — backed by tested plans, defined RTOs, and regular drills.",
    issuedBy: "AMERICO Quality Standards Registech Pvt. Ltd. (UAF accredited)",
    cycle: "Annual surveillance audit · 3-year recertification",
    certNumber: "AMER501473",
    issueDate: "23 Jun 2026",
    validUntil: "22 Jun 2027",
    recertificationDate: "22 Jun 2029",
    downloadable: true,
  },
  {
    id: "csa-star",
    name: "CSA STAR Level 1",
    fullName: "CSA Security, Trust, Assurance and Risk (STAR) — Level 1 Self-Assessment",
    category: "cloud-security",
    scope:
      "Cloud security self-assessment across BlueWhale Stack and BlueWhale Fincore — multi-cloud management, cloud inventory, provisioning and landing zones, migration, ITSM, observability, identity, FinOps, Whale AI, data protection, logging and monitoring, incident response, and business continuity.",
    description:
      "A CSA STAR Level 1 self-assessment against the Cloud Security Alliance's Cloud Controls Matrix (CCM), using the Consensus Assessments Initiative Questionnaire (CAIQ). Level 1 is self-declared rather than third-party audited — it gives customers structured visibility into our cloud control posture against the CCM.",
    issuedBy: "Self-assessed; declaration registered by SNS Certification Inc.",
    cycle: "Self-assessment, reviewed annually against the CSA CCM/CAIQ",
    certNumber: "2026086003",
    issueDate: "17 Jun 2026",
    validUntil: "16 Jun 2027",
    validLabel: "Review due",
    statusLabel: "Self-assessed",
    statusTone: "neutral",
    downloadable: true,
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    fullName: "SOC 2 Type II — Readiness Assessment",
    category: "information-security",
    scope:
      "Readiness review of policies, control design, access control, change management, incident response, vendor management, backup, business continuity, and risk management for BlueWhale Stack and BlueWhale Fincore — covering system availability, confidentiality, processing integrity, and privacy controls.",
    description:
      "A structured readiness assessment of our control environment against the AICPA Trust Services Criteria — Security, Availability, Processing Integrity, Confidentiality, and Privacy — based on document review, management interviews, and sample evidence. This confirms control-design readiness; it is not a CPA-issued SOC 2 Type I or Type II audit report or opinion.",
    issuedBy: "SNS Certification Inc. — readiness assessment, not a CPA audit opinion",
    cycle: "Readiness assessment; annual reassessment recommended",
    certNumber: "2026086005",
    issueDate: "17 Jun 2026",
    validUntil: "16 Jun 2027",
    validLabel: "Next review",
    statusLabel: "Readiness assessment",
    statusTone: "warning",
    downloadable: true,
  },
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "EU General Data Protection Regulation (2016/679)",
    category: "compliance",
    scope:
      "Processing of personal data across BlueWhale Stack and BlueWhale Fincore — multi-cloud management, cloud operations, identity, invoicing, API integrations, data subject rights, lawful processing, consent management, privacy notices, data processing agreements, breach response, retention, deletion, and sub-processor controls.",
    description:
      "BlueWhale Stack is GDPR-ready as both a Data Processor and Data Controller where applicable. Independently assessed technical and organisational measures, DPA templates, data residency options (Frankfurt region), and our Privacy Policy underpin GDPR obligations.",
    issuedBy: "SNS Certification Inc. (IACGS accredited)",
    cycle: "Annual assessment · 3-year re-certification",
    certNumber: "2026086004",
    issueDate: "17 Jun 2026",
    validUntil: "16 Jun 2027",
    recertificationDate: "16 Jun 2029",
    downloadable: true,
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
    title: "Independently verified",
    body: "Our ISO certifications are independently audited by accredited third-party bodies. CSA STAR is at Level 1 self-assessment and SOC 2 at readiness-assessment stage — full reports available to enterprise customers under NDA.",
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
    body: "Annual Transparency Report, compliance summary reports, and a shared-responsibility matrix available for every deployment model.",
  },
];

export const trustFaq = [
  {
    q: "What's the status of your SOC 2 Type II audit?",
    a: "We've completed a SOC 2 Type II readiness assessment against the AICPA Trust Services Criteria, confirming our control design is audit-ready. The readiness assessment report is available to Enterprise and Sovereign customers under NDA — email security@bluewhalestack.com to request it.",
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
