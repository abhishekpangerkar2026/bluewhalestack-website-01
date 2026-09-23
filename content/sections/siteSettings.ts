/**
 * Site-wide settings as the code ships them — the fallback for the CMS
 * "Site settings" document and what the seed script loads into it.
 */
import type { SiteSettings } from "@/content/cms/docs/siteSettings";
import { company, offices, regions, compliance, partnerPortal, primaryNav, utilityNav, footerNav } from "@/content/company";
import { globalRegions } from "@/content/global";

/** InnerPage's section strips — keyed by the page category the code passes. */
export const contextNavFallback = [
  { key: "platform", label: "The platform", links: [["Overview", "/platform"], ["Capabilities", "/modules"], ["Editions", "/editions"], ["Whale AI", "/products/whale-ai"], ["WhaleForge", "/products/whaleforge"]] },
  { key: "solutions", label: "Built for your estate", links: [["Solutions", "/solutions"], ["Industries", "/industries"], ["Customer stories", "/customers"], ["Case studies", "/case-studies"]] },
  { key: "resources", label: "Knowledge & resources", links: [["Resource library", "/resources"], ["Documentation", "/docs"], ["Trust Center", "/trust"]] },
  { key: "company", label: "Inside BlueWhale", links: [["Our story", "/about"], ["Leadership", "/about/leadership"], ["Careers", "/careers"], ["Partners", "/partners"], ["Newsroom", "/newsroom"]] },
  { key: "pricing", label: "A platform that grows with you", links: [["Pricing", "/pricing"], ["Compare editions", "/editions"], ["The 90-day prototype", "/platform#prototype"]] },
  { key: "legal", label: "Trust & transparency", links: [["Trust Center", "/trust"], ["Privacy", "/legal/privacy"], ["Terms of use", "/legal/terms"]] },
].map((s) => ({ key: s.key, label: s.label, links: s.links.map(([label, href]) => ({ label, href })) }));

export const siteSettings: SiteSettings = {
  company: {
    name: company.name,
    tagline: company.tagline,
    metaDescription: company.metaDescription,
    emails: { ...company.emails },
    phones: company.phones.map((p) => ({ ...p })),
    social: { ...company.social },
    appUrl: "https://app.bluewhalestack.com",
  },
  offices: offices.map((o) => ({ ...o })),
  regions: regions.map((r) => {
    const g = globalRegions.find((x) => x.code === r.code);
    return { code: r.code, city: r.city, country: g?.country, serves: g?.serves, compliance: g ? [...g.compliance] : undefined };
  }),
  compliance: [...compliance],
  partnerPortal: { ...partnerPortal },
  header: {
    primaryNav: primaryNav.map((item) => ({
      label: item.label,
      href: item.href,
      columns: item.columns?.map((c) => ({
        heading: c.heading,
        featured: c.featured,
        links: c.links.map((l) => ({ label: l.label, href: l.href, desc: l.desc, external: l.external })),
      })),
    })),
    utilityNav: utilityNav.map((l) => ({ label: l.label, href: l.href })),
    loginLabel: "Log in",
    cta: { label: "Book a demo", href: "/contact?intent=demo" },
  },
  footer: {
    tagline: "Every cloud. One control plane.",
    blurb: "Unified inventory, AI-native provisioning, observability, migration, and governance across public cloud, on-prem, and hybrid.",
    followLabel: "Follow our progress on LinkedIn",
    newsletterKicker: "Connected thinking",
    newsletterTitle: "A clearer view of the cloud.",
    newsletterBody: "Platform updates and ideas for the teams running modern infrastructure.",
    columns: footerNav.map((c) => ({ heading: c.heading, links: c.links.map((l) => ({ label: l.label, href: l.href })) })),
    trustLabel: "Trust, by design",
    copyright: "BlueWhale Stack is a registered trademark. All rights reserved.",
    legalLinks: [
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Terms of service", href: "/legal/terms" },
    ],
  },
  contextNav: contextNavFallback,
  contextAction: { label: "Let’s talk", href: "/contact?intent=demo" },
};
