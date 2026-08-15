import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/sections/LegalDoc";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing your access to and use of the BlueWhale Stack website and services.",
};

const sections: LegalSection[] = [
  {
    heading: "Acceptance of terms",
    body: [
      `These Terms of Use ("Terms") govern your access to and use of the ${company.name} website and any related content, products, and services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, please do not use the Services.`,
    ],
  },
  {
    heading: "Use of the website",
    body: [
      "You may use the Services only for lawful purposes and in accordance with these Terms. You agree not to:",
      [
        "Use the Services in any way that violates applicable laws or regulations.",
        "Attempt to gain unauthorised access to any part of the Services, systems, or networks.",
        "Interfere with or disrupt the integrity or performance of the Services.",
        "Reproduce, duplicate, copy, or resell any part of the Services except as expressly permitted.",
      ],
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      `All content on this website — including text, graphics, logos, diagrams, and software — is the property of ${company.name} or its licensors and is protected by intellectual property laws. "BlueWhale Stack" and associated marks are trademarks of ${company.name}. No rights are granted except as expressly set out in these Terms.`,
    ],
  },
  {
    heading: "Product information and demos",
    body: [
      "Information about our products, editions, and capabilities is provided for general informational purposes. Product features, availability, and specifications may change. Any forward-looking statements, design targets, or illustrative metrics do not constitute a binding commitment. Use of the platform itself is governed by a separate written agreement.",
      "Statements about our security, privacy, and compliance posture — including certifications, audit status, and data handling practices — are governed by our Trust Center (bluewhalestack.com/trust) and Privacy Policy, which take precedence over any general marketing statement elsewhere on this website.",
    ],
  },
  {
    heading: "Third-party links",
    body: [
      "The Services may contain links to third-party websites or services that we do not control. We are not responsible for the content, policies, or practices of any third-party sites. Accessing them is at your own risk.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      'The Services are provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or secure.',
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      `To the maximum extent permitted by law, ${company.name} and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising out of or related to your use of the Services.`,
    ],
  },
  {
    heading: "Indemnification",
    body: [
      `You agree to indemnify and hold harmless ${company.name}, its affiliates, and their respective officers, directors, and employees from any claims, liabilities, damages, and expenses arising from your use of the Services or violation of these Terms.`,
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These Terms are governed by and construed in accordance with applicable law in the jurisdiction of our principal place of business, without regard to conflict-of-law principles. Any disputes will be subject to the exclusive jurisdiction of the competent courts there.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may revise these Terms from time to time. The updated version will be posted on this page with a revised “Last updated” date. Your continued use of the Services after changes take effect constitutes acceptance of the revised Terms.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `Questions about these Terms can be sent to ${company.emails.contact}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Use"
      intro="The terms governing your access to and use of the BlueWhale Stack website and services."
      lastUpdated="12 July 2026"
      sections={sections}
    />
  );
}
