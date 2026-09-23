/**
 * /contact — every variant's copy as the code ships it: the fallback for the
 * CMS "Contact page" document and what the seed script loads into it. Emails,
 * phone lines and offices come from getSiteSettings(); the resource catalogue
 * (for `?resource=`) stays in content/resources.ts.
 */
import type { ContactPage } from "@/content/cms/docs/contactPage";

export const contactPage: ContactPage = {
  seoTitle: "Contact",
  seoDescription:
    "Talk to the BlueWhale Stack team — book a demo, discuss your cloud strategy, or reach sales.",
  intents: [
    {
      key: "demo",
      eyebrow: "Working session",
      title: "See the platform on one of your own accounts",
      body: "A 45-minute working session with a solutions engineer: one cloud account connected read-only, the inventory, cost and audit screens on your real resources, and the export left with you. Nothing is installed on your side.",
      formTitle: "Book a working session",
      formBody: "Tell us which clouds you run and what you would like to see first.",
      submitLabel: "Book a working session",
    },
    {
      key: "sales",
      eyebrow: "Contact Sales",
      title: "Let's talk about your cloud strategy",
      body: "Reach our sales team for pricing, editions, and a tailored evaluation for your environment. We reply within one business day.",
      formTitle: "Talk to sales",
      formBody: "Tell us about your organisation and what you're looking to solve.",
      submitLabel: "Contact sales",
    },
    {
      key: "resource",
      eyebrow: "Resource access",
      title: "Request a resource or control mapping",
      titleWithResourceBefore: "Request “",
      titleWithResourceAfter: "”",
      body: "Tell us who you are and which document or regime mapping you need. We send it directly — usually within one business day.",
      formTitle: "Request access",
      formBody: "Tell us which resource, datasheet or regime control mapping you're after.",
      formBodyWithResourceBefore: "You're requesting: ",
      formBodyWithResourceAfter: ".",
      submitLabel: "Request access",
    },
    {
      key: "preview",
      eyebrow: "Preview programme",
      title: "Join the Telco & Datacenter Edition preview",
      body: "Design partners deploy the edition on their own infrastructure with BlueWhale engineers, run it on real tenants, and move to general-availability licensing (Q4 2026) on a pre-agreed basis.",
      formTitle: "Apply for the preview",
      formBody: "Tell us about your facilities, network and the tenants you would run first.",
      submitLabel: "Apply for the preview",
    },
  ],
  channels: {
    reachLabel: "Reach us directly",
    salesLabel: "Sales",
    generalLabel: "General",
    officesLabel: "Offices",
  },
};
