import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/sections/LegalDoc";
import { company, offices, regions } from "@/content/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BlueWhale Stack collects, uses, shares, and protects personal data, and the rights available to you under GDPR, India's DPDP Act, and Singapore's PDPA.",
};

const sections: LegalSection[] = [
  {
    heading: "Introduction",
    body: [
      `${company.name} ("BlueWhale Stack", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard personal data when you visit our website, request a demo, or use our products and services.`,
      "This policy is designed to be consistent with the EU General Data Protection Regulation (GDPR), India's Digital Personal Data Protection Act, 2023 (DPDP Act), and Singapore's Personal Data Protection Act (PDPA), among other applicable laws.",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "We collect personal data that you provide directly and data collected automatically when you interact with our website:",
      [
        "Contact and business details you submit through forms — name, work email, phone number, company, job title, and country.",
        "Communications you send us, including demo requests, support enquiries, and newsletter subscriptions.",
        "Technical data collected automatically — IP address, browser type, device information, and pages visited.",
        "Usage data and cookies used to operate and improve the website (see the Cookies section).",
      ],
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use personal data for the following purposes:",
      [
        "To respond to demo requests, sales enquiries, and support questions.",
        "To provide, operate, maintain, and improve our products and website.",
        "To send service communications and, where you have opted in, marketing updates.",
        "To ensure security, prevent fraud or abuse, and comply with legal obligations.",
      ],
      "Where required by law, we rely on a lawful basis for each processing activity — including your consent, performance of a contract, our legitimate interests, or compliance with a legal obligation.",
    ],
  },
  {
    heading: "How we share information",
    body: [
      "We do not sell your personal data. We may share it with:",
      [
        "Service providers and sub-processors who help us operate our business (for example, hosting, email delivery, and CRM providers) under appropriate contractual safeguards.",
        "Professional advisers, auditors, and authorities where required by law or to protect our rights.",
        "A successor entity in connection with a merger, acquisition, or sale of assets.",
      ],
    ],
  },
  {
    heading: "International data transfers",
    body: [
      `We operate from offices in India, the UAE and the United States and may process data in multiple jurisdictions. Customer data can be hosted in a region of your choosing — ${regions.map((r) => r.city).join(", ")} — including sovereign and air-gapped options for regulated workloads. Where personal data is transferred across borders, we apply appropriate safeguards such as standard contractual clauses or equivalent mechanisms required under applicable law. A Data Processing Agreement (DPA) covering GDPR Article 28 and India's DPDP Act is available for paid editions — request it at legal@bluewhalestack.com.`,
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. When data is no longer required, we securely delete or anonymise it.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Subject to applicable law, you may have the right to:",
      [
        "Access, correct, or update your personal data.",
        "Request erasure of your personal data.",
        "Object to or restrict certain processing, and withdraw consent at any time.",
        "Request portability of data you have provided to us.",
        "Lodge a complaint with a supervisory or data protection authority.",
      ],
      `To exercise any of these rights, contact us at ${company.emails.contact}. We will respond within the timeframes required by applicable law.`,
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Our website uses cookies and similar technologies to operate the site, remember preferences, and understand usage. You can control cookies through your browser settings; disabling some cookies may affect site functionality.",
    ],
  },
  {
    heading: "Data security",
    body: [
      "We maintain administrative, technical, and physical safeguards designed to protect personal data against unauthorised access, loss, or misuse, including AES-256 encryption at rest and TLS 1.3 in transit. Our information security and privacy management systems are independently certified to ISO/IEC 27001:2022, ISO/IEC 27017:2015, ISO/IEC 27018:2019, ISO/IEC 27701:2019, and ISO 22301:2019, and independently assessed against the GDPR. We also hold a CSA STAR Level 1 self-assessment and have completed a SOC 2 Type II readiness assessment against the AICPA Trust Services Criteria — this is not yet a CPA-issued Type II audit opinion.",
      "Signed certificates, our full compliance posture, and instructions for requesting audit reports are available at our Trust Center (bluewhalestack.com/trust). No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. We will post the updated version on this page and revise the “Last updated” date above. Material changes will be communicated where required by law.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `If you have questions about this Privacy Policy or our data practices, contact us at ${company.emails.contact}.`,
      `${company.name} — ${offices.map((o) => `${o.entity} (${o.label}): ${o.address}`).join(" · ")}`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      intro="How BlueWhale Stack collects, uses, shares, and protects your personal data — and the rights available to you."
      lastUpdated="12 July 2026"
      sections={sections}
    />
  );
}
