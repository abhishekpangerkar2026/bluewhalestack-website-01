/**
 * The legal pages (Privacy Policy, Terms of Use) as the code ships them —
 * the fallback for the CMS "Legal page" documents and the seed source.
 * Company facts are resolved at build time so the seeded text is literal.
 */
import type { LegalPageDoc } from "@/content/cms/docs/collections";
import type { LegalSection } from "@/components/sections/LegalDoc";
import { company, offices, regions } from "@/content/company";

const section = (heading: string, body: Array<string | string[]>): LegalPageDoc["sections"][number] => ({
  heading,
  blocks: body.map((b) => (Array.isArray(b) ? { _type: "legalBullets" as const, items: b } : { _type: "legalParagraph" as const, text: b })),
});

export const legalSectionsFromCms = (sections: LegalPageDoc["sections"]): LegalSection[] =>
  sections.map((s) => ({
    heading: s.heading,
    body: (s.blocks ?? []).map((b) => (b._type === "legalBullets" ? (b.items ?? []) : b.text)),
  }));

export const privacyPage: LegalPageDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  intro: "How BlueWhale Stack collects, uses, shares, and protects your personal data — and the rights available to you.",
  lastUpdated: "12 July 2026",
  seoTitle: "Privacy Policy",
  seoDescription:
    "How BlueWhale Stack collects, uses, shares, and protects personal data, and the rights available to you under GDPR, India's DPDP Act, and Singapore's PDPA.",
  sections: [
    section("Introduction", [
      `${company.name} ("BlueWhale Stack", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard personal data when you visit our website, request a demo, or use our products and services.`,
      "This policy is designed to be consistent with the EU General Data Protection Regulation (GDPR), India's Digital Personal Data Protection Act, 2023 (DPDP Act), and Singapore's Personal Data Protection Act (PDPA), among other applicable laws.",
    ]),
    section("Information we collect", [
      "We collect personal data that you provide directly and data collected automatically when you interact with our website:",
      [
        "Contact and business details you submit through forms — name, work email, phone number, company, job title, and country.",
        "Communications you send us, including demo requests, support enquiries, and newsletter subscriptions.",
        "Technical data collected automatically — IP address, browser type, device information, and pages visited.",
        "Usage data and cookies used to operate and improve the website (see the Cookies section).",
      ],
    ]),
    section("How we use your information", [
      "We use personal data for the following purposes:",
      [
        "To respond to demo requests, sales enquiries, and support questions.",
        "To provide, operate, maintain, and improve our products and website.",
        "To send service communications and, where you have opted in, marketing updates.",
        "To ensure security, prevent fraud or abuse, and comply with legal obligations.",
      ],
      "Where required by law, we rely on a lawful basis for each processing activity — including your consent, performance of a contract, our legitimate interests, or compliance with a legal obligation.",
    ]),
    section("How we share information", [
      "We do not sell your personal data. We may share it with:",
      [
        "Service providers and sub-processors who help us operate our business (for example, hosting, email delivery, and CRM providers) under appropriate contractual safeguards.",
        "Professional advisers, auditors, and authorities where required by law or to protect our rights.",
        "A successor entity in connection with a merger, acquisition, or sale of assets.",
      ],
    ]),
    section("International data transfers", [
      `We operate from offices in India, the UAE and the United States and may process data in multiple jurisdictions. Customer data can be hosted in a region of your choosing — ${regions.map((r) => r.city).join(", ")} — including sovereign and air-gapped options for regulated workloads. Where personal data is transferred across borders, we apply appropriate safeguards such as standard contractual clauses or equivalent mechanisms required under applicable law. A Data Processing Agreement (DPA) covering GDPR Article 28 and India's DPDP Act is available for paid editions — request it at legal@bluewhalestack.com.`,
    ]),
    section("Data retention", [
      "We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. When data is no longer required, we securely delete or anonymise it.",
    ]),
    section("Your rights", [
      "Subject to applicable law, you may have the right to:",
      [
        "Access, correct, or update your personal data.",
        "Request erasure of your personal data.",
        "Object to or restrict certain processing, and withdraw consent at any time.",
        "Request portability of data you have provided to us.",
        "Lodge a complaint with a supervisory or data protection authority.",
      ],
      `To exercise any of these rights, contact us at ${company.emails.contact}. We will respond within the timeframes required by applicable law.`,
    ]),
    section("Cookies", [
      "Our website uses cookies and similar technologies to operate the site, remember preferences, and understand usage. You can control cookies through your browser settings; disabling some cookies may affect site functionality.",
    ]),
    section("Data security", [
      "We maintain administrative, technical, and physical safeguards designed to protect personal data against unauthorised access, loss, or misuse, including AES-256 encryption at rest and TLS 1.3 in transit. Our information security and privacy management systems are independently certified to ISO/IEC 27001:2022, ISO/IEC 27017:2015, ISO/IEC 27018:2019, ISO/IEC 27701:2019, and ISO 22301:2019, and independently assessed against the GDPR. We also hold a CSA STAR Level 1 self-assessment and have completed a SOC 2 Type II readiness assessment against the AICPA Trust Services Criteria — this is not yet a CPA-issued Type II audit opinion.",
      "Signed certificates, our full compliance posture, and instructions for requesting audit reports are available at our Trust Center (bluewhalestack.com/trust). No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ]),
    section("Changes to this policy", [
      "We may update this Privacy Policy from time to time. We will post the updated version on this page and revise the “Last updated” date above. Material changes will be communicated where required by law.",
    ]),
    section("Contact us", [
      `If you have questions about this Privacy Policy or our data practices, contact us at ${company.emails.contact}.`,
      `${company.name} — ${offices.map((o) => `${o.entity} (${o.label}): ${o.address}`).join(" · ")}`,
    ]),
  ],
};

export const termsPage: LegalPageDoc = {
  slug: "terms",
  title: "Terms of Use",
  intro: "The terms governing your access to and use of the BlueWhale Stack website and services.",
  lastUpdated: "12 July 2026",
  seoTitle: "Terms of Use",
  seoDescription: "The terms governing your access to and use of the BlueWhale Stack website and services.",
  sections: [
    section("Acceptance of terms", [
      `These Terms of Use ("Terms") govern your access to and use of the ${company.name} website and any related content, products, and services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, please do not use the Services.`,
    ]),
    section("Use of the website", [
      "You may use the Services only for lawful purposes and in accordance with these Terms. You agree not to:",
      [
        "Use the Services in any way that violates applicable laws or regulations.",
        "Attempt to gain unauthorised access to any part of the Services, systems, or networks.",
        "Interfere with or disrupt the integrity or performance of the Services.",
        "Reproduce, duplicate, copy, or resell any part of the Services except as expressly permitted.",
      ],
    ]),
    section("Intellectual property", [
      `All content on this website — including text, graphics, logos, diagrams, and software — is the property of ${company.name} or its licensors and is protected by intellectual property laws. "BlueWhale Stack" and associated marks are trademarks of ${company.name}. No rights are granted except as expressly set out in these Terms.`,
    ]),
    section("Product information and demos", [
      "Information about our products, editions, and capabilities is provided for general informational purposes. Product features, availability, and specifications may change. Any forward-looking statements, design targets, or illustrative metrics do not constitute a binding commitment. Use of the platform itself is governed by a separate written agreement.",
      "Statements about our security, privacy, and compliance posture — including certifications, audit status, and data handling practices — are governed by our Trust Center (bluewhalestack.com/trust) and Privacy Policy, which take precedence over any general marketing statement elsewhere on this website.",
    ]),
    section("Third-party links", [
      "The Services may contain links to third-party websites or services that we do not control. We are not responsible for the content, policies, or practices of any third-party sites. Accessing them is at your own risk.",
    ]),
    section("Disclaimers", [
      'The Services are provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or secure.',
    ]),
    section("Limitation of liability", [
      `To the maximum extent permitted by law, ${company.name} and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising out of or related to your use of the Services.`,
    ]),
    section("Indemnification", [
      `You agree to indemnify and hold harmless ${company.name}, its affiliates, and their respective officers, directors, and employees from any claims, liabilities, damages, and expenses arising from your use of the Services or violation of these Terms.`,
    ]),
    section("Governing law", [
      "These Terms are governed by and construed in accordance with applicable law in the jurisdiction of our principal place of business, without regard to conflict-of-law principles. Any disputes will be subject to the exclusive jurisdiction of the competent courts there.",
    ]),
    section("Changes to these terms", [
      "We may revise these Terms from time to time. The updated version will be posted on this page with a revised “Last updated” date. Your continued use of the Services after changes take effect constitutes acceptance of the revised Terms.",
    ]),
    section("Contact us", [`Questions about these Terms can be sent to ${company.emails.contact}.`]),
  ],
};

export const legalPages: LegalPageDoc[] = [privacyPage, termsPage];
