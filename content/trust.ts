/**
 * Trust Center content — certifications, security posture, and compliance.
 *
 * Certificate facts (entity, number, dates, issuer, scope) are transcribed
 * verbatim from the signed certificates in /certificates and the audit
 * deliverables pack (Final_Deliverables_26_06_2026). Keep them in sync if a
 * certificate is renewed or reissued — the PDF filename must match `id`
 * (e.g. `iso-27001.pdf`).
 *
 * Mandatory framing (from the certification bodies' own sharing rules):
 *  - SOC 2: "readiness-level alignment … not a CPA attestation report or
 *    SOC 2 Type II assurance opinion".
 *  - CSA STAR Level 1: a self-assessment declaration, not a Level 2 audit.
 *  - GDPR: a compliance assessment, not supervisory-authority approval or a
 *    legal opinion.
 */

export type Certification = {
  id: string;
  name: string;
  fullName: string;
  category: CertCategory;
  /** Certified scope — verbatim from the certificate */
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
  /** Legal entity named on the certificate / assessment record */
  entity?: string;
  /** Certification body's public register where the certificate can be verified */
  verifyUrl?: string;
  /** Audit history transcribed from the Stage 1 / Stage 2 reports and surveillance plans */
  audit?: {
    stage1?: string;
    stage2?: string;
    mode?: string;
    findings?: string;
    nextSurveillance?: string;
  };
  /** Management-system document pack — what exists, and how it can be shared */
  documents?: { title: string; access: DocAccess }[];
};

/** public = shareable on request without NDA · contract = with a signed DPA/contract · nda = under NDA only */
export type DocAccess = "public" | "contract" | "nda";

export const docAccessLabel: Record<DocAccess, string> = {
  public: "On request",
  contract: "Under contract",
  nda: "Under NDA",
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

/** Legal entities as printed on the certificates */
export const certifiedEntities = {
  uae: "BlueWhale Stack Consulting and Technologies FZE LLC — BC-892084, 26th Floor, Amber Gem Tower, Ajman, UAE",
  india:
    "BlueWhale Consulting and Technologies Private Limited — Kalyan West, Thane, Maharashtra, India (CIN U74999MH2018PTC306172)",
} as const;

export const certifications: Certification[] = [
  {
    id: "iso-27001",
    name: "ISO 27001",
    fullName: "ISO/IEC 27001:2022",
    category: "information-security",
    scope:
      "Information Security Management System covering the design, development, hosting, operation, maintenance, and support of BlueWhale Stack and BlueWhale Fincore platforms, including AI-native multi-cloud management, provisioning and operation of public cloud, hybrid cloud and on-premises infrastructure, inventory and discovery, migration, ITSM, observability, security and compliance, FinOps, identity and administration, Whale AI, invoicing platform services, API integrations, information security governance, access control, incident management, backup, business continuity, and customer data protection. Statement of Applicability v1.0, 5 Jan 2026.",
    description:
      "The globally recognised standard for information security management. Independently audited and certified — demonstrating end-to-end controls across people, processes, and technology.",
    issuedBy: "LMS Assessments Limited, UK — EGAC accredited (ISMS CAB #012312), IAF MLA member",
    cycle: "Annual surveillance audit · 3-year recertification",
    certNumber: "AE260625009",
    issueDate: "25 Jun 2026",
    validUntil: "24 Jun 2027",
    validLabel: "Surveillance due",
    recertificationDate: "24 Jun 2029",
    entity: certifiedEntities.uae,
    verifyUrl: "https://www.lmscert.uk",
    downloadable: true,
    audit: {
      stage1: "May 2026",
      stage2: "10 Jun 2026",
      findings: "No nonconformities or observations raised at Stage 1 or Stage 2",
      nextSurveillance:
        "Year 1 surveillance June 2027 · Year 2 surveillance June 2028 · recertification June 2029. Sites in scope: Ajman (UAE) and Pune (India).",
    },
    documents: [
      { title: "Information security policy summary", access: "public" },
      { title: "ISMS scope statement", access: "public" },
      { title: "ISMS Manual and 17 management-system procedures", access: "nda" },
      { title: "Information security policy set (19 policies)", access: "nda" },
      { title: "Statement of Applicability v1.0", access: "nda" },
      { title: "Stage 1 and Stage 2 audit reports", access: "nda" },
      { title: "3-year surveillance audit programme", access: "nda" },
    ],
  },
  {
    id: "iso-27017",
    name: "ISO 27017",
    fullName: "ISO/IEC 27017:2015",
    category: "cloud-security",
    scope:
      "Cloud security controls covering the design, development, hosting, operation, maintenance, and support of BlueWhale Stack and BlueWhale Fincore platforms, including AI-native multi-cloud management, cloud resources and inventory, provisioning and landing zones, migration, security and compliance, ITSM and observability, identity and administration, FinOps, secure cloud operations, shared responsibility controls, and protection of customer data across public cloud, hybrid cloud and on-premises environments.",
    description:
      "Cloud-specific extension to ISO 27001 — defines additional controls for cloud service providers and their customers. Covers shared responsibilities, virtual machine hardening, and cloud-specific threat management.",
    issuedBy: "SNS Certification Inc., San Francisco — IACGS accredited (No. 24840011)",
    cycle: "3-year certificate · annual surveillance assessment",
    certNumber: "2026784001",
    issueDate: "18 Jun 2026",
    validUntil: "18 Jun 2027",
    validLabel: "Surveillance due",
    recertificationDate: "18 Jun 2029",
    entity: certifiedEntities.uae,
    verifyUrl: "https://www.snscert.com",
    downloadable: true,
    audit: {
      nextSurveillance:
        "Annual surveillance due 18 June 2027; recertification 18 June 2029. Deployment models in scope: SaaS, BYOC and sovereign / on-premises.",
    },
    documents: [
      { title: "Shared-responsibility matrix (SaaS · BYOC · Sovereign)", access: "public" },
      { title: "Cloud Security Controls Manual", access: "nda" },
    ],
  },
  {
    id: "iso-27018",
    name: "ISO 27018",
    fullName: "ISO/IEC 27018:2019",
    category: "privacy",
    scope:
      "Protection of personally identifiable information in public cloud environments covering the design, development, hosting, operation, maintenance, and support of BlueWhale Stack and BlueWhale Fincore platforms, including processing of customer and end-user personal data through multi-cloud management, cloud operations, identity and administration, invoicing platform services, API integrations, collection, processing, storage, transmission, retention, deletion, and protection of personally identifiable information.",
    description:
      "The international standard for protecting personal data in public cloud services. Establishes commonly accepted control objectives, controls, and guidelines for processing PII in the cloud.",
    issuedBy: "SNS Certification Inc., San Francisco — IACGS accredited (No. 24840011)",
    cycle: "3-year certificate · annual surveillance assessment",
    certNumber: "2026086002",
    issueDate: "17 Jun 2026",
    validUntil: "16 Jun 2027",
    validLabel: "Surveillance due",
    recertificationDate: "16 Jun 2029",
    entity: certifiedEntities.uae,
    verifyUrl: "https://www.snscert.com",
    downloadable: true,
    audit: {
      nextSurveillance:
        "Annual surveillance due 16 June 2027; recertification 16 June 2029. BlueWhale acts as PII processor for customer platform data; roles are fixed in each customer DPA.",
    },
    documents: [
      { title: "Sub-processor list (30-day change notice)", access: "public" },
      { title: "Retention and deletion commitments", access: "public" },
      { title: "PII Protection Manual", access: "nda" },
    ],
  },
  {
    id: "iso-27701",
    name: "ISO 27701",
    fullName: "ISO/IEC 27701:2019",
    category: "privacy",
    scope:
      "Privacy Information Management System covering the design, development, hosting, operation, maintenance, and support of BlueWhale Stack and BlueWhale Fincore platforms, including privacy governance, processing of personally identifiable information through multi-cloud management, cloud operations, identity and administration, invoicing platform services, API integrations, consent management, data subject rights, retention, deletion, breach response, and third-party processing controls. No clause excluded; controller (Annex A) and processor (Annex B) control sets both audited.",
    description:
      "Privacy extension to ISO 27001 — specifies requirements and guidance for establishing, implementing, and continually improving a Privacy Information Management System. Demonstrates accountability under GDPR and the DPDP Act.",
    issuedBy: "Staunchly Management and System Services Limited, UK — EGAC accredited (MSCB CAB #011804)",
    cycle: "Annual surveillance audit · 3-year recertification",
    certNumber: "AE63241V",
    issueDate: "25 Jun 2026",
    validUntil: "24 Jun 2027",
    validLabel: "Surveillance due",
    recertificationDate: "24 Jun 2029",
    entity: certifiedEntities.uae,
    verifyUrl: "https://www.staunchlyservices.com",
    downloadable: true,
    audit: {
      stage1: "17 Jun 2026",
      stage2: "17 Jun 2026",
      mode: "Remote audit (video, screen sharing, controlled document exchange)",
      findings: "0 major · 0 minor nonconformities · 4 opportunities for improvement",
      nextSurveillance:
        "1st surveillance by June 2027 · 2nd surveillance by June 2028 · re-assessment June 2029. Sites: Ajman (UAE), Pune (India) and remote evidence review.",
    },
    documents: [
      { title: "PIMS scope and applicability statement", access: "public" },
      { title: "Technical and Organisational Measures statement", access: "public" },
      { title: "Sub-processor and transfer register", access: "public" },
      { title: "Records of processing (ROPA) summary", access: "public" },
      { title: "Data Processing Agreement (DPA) template", access: "contract" },
      { title: "PIMS Manual", access: "nda" },
      { title: "DPIA and privacy-by-design template", access: "nda" },
      { title: "PIMS risk register and treatment plan", access: "nda" },
      { title: "Stage 1 and Stage 2 remote audit reports", access: "nda" },
    ],
  },
  {
    id: "iso-22301",
    name: "ISO 22301",
    fullName: "ISO 22301:2019",
    category: "business-continuity",
    scope:
      "Business Continuity Management System for the design, development, hosting, operation, maintenance, and support of BlueWhale Stack and BlueWhale Fincore platforms, including continuity of AI-native multi-cloud management, public cloud, hybrid cloud and on-premises operations, inventory and discovery, provisioning, migration, ITSM, observability, security and compliance, FinOps, identity and administration, invoicing platform services, business continuity planning, risk assessment, disaster recovery, backup management, incident response, service continuity, and crisis communication.",
    description:
      "The international standard for Business Continuity Management. Certifies our ability to continue critical operations, protect people, and recover from disruption — backed by documented plans, defined RTOs/RPOs, and a yearly exercise programme.",
    issuedBy: "AMERICO Quality Standards Registech Pvt. Ltd. — UAF accredited (CM-MS-7807)",
    cycle: "Annual surveillance audit · 3-year recertification",
    certNumber: "AMER501473",
    issueDate: "23 Jun 2026",
    validUntil: "22 Jun 2027",
    validLabel: "Surveillance due",
    recertificationDate: "22 Jun 2029",
    entity: certifiedEntities.uae,
    verifyUrl: "https://www.americocert.com",
    downloadable: true,
    audit: {
      nextSurveillance:
        "Annual surveillance due 22 June 2027; recertification 22 June 2029. First-cycle certificate (revision R0). BCMS document pack v1.0 effective 13 June 2026.",
    },
    documents: [
      { title: "Business continuity policy and objectives summary", access: "public" },
      { title: "BCMS scope statement", access: "public" },
      { title: "BCMS Manual", access: "nda" },
      { title: "Business impact analysis and critical activities register", access: "nda" },
      { title: "Business continuity risk assessment and treatment plan", access: "nda" },
      { title: "Business continuity strategy and solutions plan", access: "nda" },
      { title: "Incident response and crisis management procedure", access: "nda" },
      { title: "IT disaster recovery plan", access: "nda" },
      { title: "Backup and restore procedure and record", access: "nda" },
      { title: "Business continuity communication plan", access: "nda" },
      { title: "Supplier and dependency continuity register", access: "nda" },
      { title: "Platform business continuity plans", access: "nda" },
      { title: "Exercise, testing and review programme", access: "nda" },
    ],
  },
  {
    id: "csa-star",
    name: "CSA STAR Level 1",
    fullName: "CSA Security, Trust, Assurance and Risk (STAR) — Level 1 Self-Assessment",
    category: "cloud-security",
    scope:
      "Cloud security self-assessment covering the design, development, hosting, operation, maintenance, and support of BlueWhale Stack and BlueWhale Fincore platforms, including AI-native multi-cloud management, cloud resources and inventory, provisioning and landing zones, migration, security and compliance, ITSM and observability, identity and administration, FinOps, Whale AI, data protection, logging and monitoring, incident response, business continuity, and compliance controls across public cloud, hybrid cloud and on-premises environments.",
    description:
      "A CSA STAR Level 1 self-assessment against the Cloud Security Alliance's Cloud Controls Matrix (CCM), using the Consensus Assessments Initiative Questionnaire (CAIQ). Level 1 is a self-assessment declaration, not a Level 2 third-party certification audit — SNS Certification Inc. reviewed the self-assessment package remotely in two stages and issued a compliance certificate for the declaration.",
    issuedBy: "SNS Certification Inc., San Francisco — IACGS accredited (No. 24840011); review certificate for a management self-assessment declaration",
    cycle: "Self-assessment declaration · annual review",
    certNumber: "2026086003",
    issueDate: "17 Jun 2026",
    validUntil: "16 Jun 2027",
    validLabel: "Review due",
    statusLabel: "Self-assessed",
    statusTone: "neutral",
    entity: certifiedEntities.uae,
    verifyUrl: "https://www.snscert.com",
    downloadable: true,
    audit: {
      stage1: "17 Jun 2026 (remote document review)",
      stage2: "17 Jun 2026 (remote evidence and declaration review)",
      mode: "Self-assessment declared 12 June 2026; two-stage remote review",
      findings: "0 major · 0 minor nonconformities · 3 observations, none blocking",
      nextSurveillance:
        "CCM domains reviewed: GRC, A&A, AIS, CCC, TVM, IAM, CEK, DSP, IVS, IPY, LOG, SEF, BCR, STA, HRS, UEM — all accepted. Next review due 16 June 2027.",
    },
    documents: [
      { title: "Shared-responsibility matrix (SaaS · BYOC · Sovereign)", access: "public" },
      { title: "Completed CAIQ / CCM self-assessment response", access: "nda" },
      { title: "CCM domain review summary", access: "nda" },
      { title: "Stage 1 and Stage 2 remote review records", access: "nda" },
    ],
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    fullName: "SOC 2 Type II Trust Services Criteria — Readiness Assessment",
    category: "information-security",
    scope:
      "Readiness review of documented policies, procedures, control design, information security practices, access control, change management, incident response, vendor management, backup, business continuity, risk management, and related governance controls for the design, development, hosting, operation, maintenance, monitoring, and support of BlueWhale Stack and BlueWhale Fincore platforms, covering AI-native multi-cloud management, inventory and discovery, provisioning, migration, ITSM, observability, security and compliance, FinOps, identity and administration, invoicing platform services, customer data protection, system availability, confidentiality, processing integrity, and privacy controls.",
    description:
      "A readiness assessment against the AICPA Trust Services Criteria — Security, Availability, Processing Integrity, Confidentiality, and Privacy. It confirms readiness-level alignment with selected SOC 2 control areas based on documents, management representations, interviews and sample evidence. It is not a CPA attestation report or a SOC 2 Type I or Type II assurance opinion; a formal Type II report requires an independent CPA examination over an observation period.",
    issuedBy: "SNS Certification Inc., San Francisco — readiness assessment, not a CPA audit opinion",
    cycle: "Readiness assessment · next review recommended within 12 months",
    certNumber: "2026086005",
    issueDate: "17 Jun 2026",
    validUntil: "16 Jun 2027",
    validLabel: "Next review",
    statusLabel: "Readiness assessment",
    statusTone: "warning",
    entity: certifiedEntities.india,
    verifyUrl: "https://www.snscert.com",
    downloadable: true,
    audit: {
      stage1: "17 Jun 2026 (single-day remote readiness assessment)",
      mode: "Remote — video interviews, secure document exchange, screen sharing; independent technical review before issue",
      findings: "0 major · 0 minor readiness blockers · 3 improvement actions (evidence retention for a future CPA observation period)",
      nextSurveillance:
        "28 Trust Services Criteria reviewed (CC1–CC9, A1, PI1, C1, P1–P6) — all recorded as conforming at readiness level. Next review recommended by 16 June 2027.",
    },
    documents: [
      { title: "System description and scope", access: "nda" },
      { title: "TSC control matrix", access: "nda" },
      { title: "SOC 2 TSC control manual", access: "nda" },
      { title: "SNS readiness assessment report", access: "nda" },
      { title: "Findings, CAPA and closure report", access: "nda" },
      { title: "Client sharing and limitations statement", access: "nda" },
    ],
  },
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "EU General Data Protection Regulation (2016/679) — Compliance Assessment",
    category: "compliance",
    scope:
      "Data protection and privacy compliance covering the design, development, hosting, operation, maintenance, and support of BlueWhale Stack and BlueWhale Fincore platforms, including processing of personal data through multi-cloud management, cloud operations, identity and administration, invoicing platform services, API integrations, data subject rights, lawful processing, consent management, privacy notices, data processing agreements, breach response, retention, deletion, and vendor/sub-processor controls.",
    description:
      "An independent compliance assessment confirming that BlueWhale Stack has implemented appropriate technical and organisational measures in alignment with GDPR, as Data Processor for customer platform data and Data Controller for its own business processing. It is a compliance assessment — not an Article 42 certification, supervisory-authority approval, or legal opinion. DPA templates, data residency options (Frankfurt region), and our Privacy Policy underpin GDPR obligations.",
    issuedBy: "SNS Certification Inc., San Francisco — IACGS accredited (No. 24840011)",
    cycle: "3-year certificate · annual surveillance assessment",
    certNumber: "2026086004",
    issueDate: "17 Jun 2026",
    validUntil: "16 Jun 2027",
    validLabel: "Surveillance due",
    recertificationDate: "16 Jun 2029",
    entity: certifiedEntities.uae,
    verifyUrl: "https://www.snscert.com",
    downloadable: true,
    audit: {
      stage1: "17 Jun 2026",
      stage2: "17 Jun 2026",
      mode: "Remote audit — document review, management interviews, screen sharing, evidence sampling",
      findings: "0 major · 0 minor nonconformities · 3 opportunities for improvement, closed without corrective action",
      nextSurveillance:
        "All 15 checklist areas rated conforming (governance, ROPA, lawful basis, transparency, consent, data subject rights, privacy by design, security, breach, retention, sub-processors, transfers, training, monitoring). Surveillance due 16 June 2027; recertification 16 June 2029.",
    },
    documents: [
      { title: "Privacy notice", access: "public" },
      { title: "Sub-processor and international transfer register", access: "public" },
      { title: "Technical and Organisational Measures statement", access: "public" },
      { title: "Records of processing (ROPA) summary", access: "public" },
      { title: "Privacy awareness training summary", access: "public" },
      { title: "Data Processing Agreement (DPA) template", access: "contract" },
      { title: "Data retention and deletion schedule", access: "nda" },
      { title: "Personal data breach response procedure", access: "nda" },
      { title: "DPIA and privacy-by-design procedure", access: "nda" },
      { title: "Stage 1 and Stage 2 remote audit reports", access: "nda" },
    ],
  },
  {
    id: "dpdp",
    name: "India DPDP Act 2023",
    fullName: "Digital Personal Data Protection Act 2023 (India)",
    category: "compliance",
    scope: "Processing of Indian citizens' personal data; Significant Data Fiduciary readiness",
    description:
      "BlueWhale Stack's privacy programme is aligned to India's DPDP Act 2023, covering consent frameworks, data localisation (Mumbai region), Data Fiduciary obligations, and breach notification procedures. DPDP was assessed as an applicable privacy regime within our ISO 27701 certification; built-in controls support SDF readiness requirements.",
    issuedBy: "Regulatory — Government of India",
    cycle: "Ongoing — continuous compliance programme",
    statusLabel: "Compliant",
    statusTone: "neutral",
  },
];

export const trustPillars = [
  {
    icon: "ShieldCheck",
    title: "Independently verified",
    body: "Our five ISO certifications are audited by accredited third-party bodies and can be verified on each body's public register. CSA STAR is a Level 1 self-assessment and SOC 2 a readiness assessment — full audit packs are available to enterprise customers under NDA.",
  },
  {
    icon: "Globe",
    title: "Data residency",
    body: "Choose where your data lives: Singapore, Mumbai, Frankfurt, or Los Angeles. Sovereign and air-gapped options available for regulated workloads.",
  },
  {
    icon: "Lock",
    title: "Encryption at rest & in transit",
    body: "AES-256 at rest, TLS 1.3 in transit. Customer-managed keys available on Enterprise, Telco & Datacenter and Government editions.",
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
    a: "We've completed a SOC 2 Type II readiness assessment against the AICPA Trust Services Criteria, confirming readiness-level alignment of our control design across all five criteria with no readiness blockers. It is not a CPA attestation report or Type II assurance opinion — a formal Type II report requires an independent CPA examination over an observation period, which is our next step. The readiness assessment pack is available to Enterprise and Government customers under NDA — email security@bluewhalestack.com to request it.",
  },
  {
    q: "Which legal entity holds the certificates?",
    a: "The five ISO certificates, the CSA STAR Level 1 review certificate and the GDPR compliance certificate are issued to BlueWhale Stack Consulting and Technologies FZE LLC (Ajman, UAE), with our Pune, India engineering location included in the audited scope. The SOC 2 readiness assessment is issued to BlueWhale Consulting and Technologies Private Limited, our Indian company. All certificates cover the same BlueWhale Stack and BlueWhale Fincore platforms.",
  },
  {
    q: "Can I verify a certificate independently?",
    a: "Yes. Every certificate carries the issuing body's verification QR code, and each body maintains a public register — LMS Assessments (ISO 27001), Staunchly (ISO 27701), AMERICO (ISO 22301) and SNS Certification (ISO 27017, ISO 27018, CSA STAR, SOC 2 readiness, GDPR). Use the certificate numbers shown on this page.",
  },
  {
    q: "Which certifications apply to the Government (sovereign / air-gapped) edition?",
    a: "All certifications apply to the Government edition. Air-gapped deployments additionally support in-region AI inference and can be scoped for additional local regulatory requirements.",
  },
  {
    q: "Do you offer a Data Processing Agreement (DPA)?",
    a: "Yes — our standard DPA is available for all paid editions. It covers GDPR Article 28, India DPDP Act requirements, and sub-processor disclosure with a 30-day change-notice process. Request it at legal@bluewhalestack.com.",
  },
  {
    q: "How do you handle security incidents?",
    a: "We follow ISO 27001 incident management procedures with defined classification, escalation, and notification timelines. Customers receive notification within 72 hours for confirmed personal data incidents, in line with our DPA and GDPR obligations.",
  },
  {
    q: "What sub-processors do you use?",
    a: "Our current sub-processor list is provided with the Data Processing Agreement and on request from legal@bluewhalestack.com. We notify customers of material changes 30 days in advance (per our DPA terms).",
  },
];
