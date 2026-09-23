/**
 * Blocks that wrap the site's signature components — the animated
 * architecture, the control-plane map, the console showcase, the forms.
 */
import type { ComponentConfig } from "@puckeditor/core";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LayerList, LayerStack } from "@/components/diagrams/LayerStack";
import { ControlPlaneMap } from "@/components/diagrams/ControlPlaneMap";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { EstateTicker } from "@/components/sections/EstateTicker";
import { PrototypeOffer, type PrototypeOfferContent } from "@/components/sections/PrototypeOffer";
import { GlobalInfra } from "@/components/sections/GlobalInfra";
import { ContactForm } from "@/components/forms/ContactForm";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { HomeExtras } from "@/content/cms/docs/homePage";
import type { SiteSettings } from "@/content/cms/docs/siteSettings";
import { cn } from "@/lib/utils";
import { getCatalog } from "../data";
import { bool, headingFields, hidden, items, link, select, text, textarea } from "../fields";
import { str, type Txt } from "./shared";

type Heading = { eyebrow?: Txt; title?: Txt; description?: Txt };
const Head = ({ h, inverse }: { h: Heading; inverse?: boolean }) =>
  h.title ? <Reveal><SectionHeading eyebrow={str(h.eyebrow) || undefined} title={h.title} description={str(h.description) || undefined} inverse={inverse} /></Reveal> : null;

export const Architecture: ComponentConfig<Heading & { button: { label: string; href: string } }> = {
  label: "Animated architecture (six layers)",
  fields: { ...headingFields, button: link("Button under the list (optional)") },
  defaultProps: { eyebrow: "The architecture", title: "One platform, six layers — read top-down, the way value flows.", description: "Industries consume governed services through the Digital Experience Layer; nine capability families in the Unified Platform Core govern every estate underneath.", button: { label: "See the full architecture", href: "/platform#architecture" } },
  render: ({ button, ...h }) => (
    <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
      <div>
        <Head h={h} />
        <Reveal delay={80}><LayerList className="mt-8" /></Reveal>
        {button?.label && <Reveal delay={120}><Button href={button.href || "#"} variant="outline" className="mt-8">{button.label} <ArrowRight size={16} /></Button></Reveal>}
      </div>
      <Reveal delay={100}><LayerStack /></Reveal>
    </div>
  ),
};

export const ControlPlane: ComponentConfig<Heading> = {
  label: "Control-plane map (clouds → outcomes)",
  fields: { ...headingFields },
  defaultProps: { eyebrow: "Every estate — managed as one", title: "One control plane over six platform classes", description: "Public clouds, private and virtualization estates, hybrid and sovereign stacks — discovered, governed and billed as one." },
  render: (h) => (
    <div>
      <Head h={h} inverse />
      <Reveal delay={100}><div className={cn(h.title && "mt-12")}><ControlPlaneMap /></div></Reveal>
    </div>
  ),
};

export const ConsoleShowcase: ComponentConfig<Heading> = {
  label: "Console showcase (the product, by job)",
  fields: { ...headingFields },
  defaultProps: { eyebrow: "See the product", title: "One console. Every job.", description: "Cost, inventory and security posture — three of the screens teams live in." },
  render: (h) => (
    <div>
      <Head h={h} />
      <div className={cn(h.title && "mt-12")}><ProductShowcase /></div>
    </div>
  ),
};

export const Ticker: ComponentConfig<{ tone: "light" | "dark" }> = {
  label: "Estate ticker (cloud logos)",
  fields: { tone: select("Colour", [{ label: "Light", value: "light" }, { label: "Dark", value: "dark" }]) },
  defaultProps: { tone: "light" },
  render: ({ tone }) => <EstateTicker tone={tone} />,
};

export const Prototype: ComponentConfig<{ tinted: boolean; offer: PrototypeOfferContent | null }> = {
  label: "The 90-day prototype",
  fields: { tinted: bool("Grey background"), offer: hidden() },
  defaultProps: { tinted: true, offer: null },
  resolveData: async ({ props }) => ({ props: { ...props, offer: (await getCatalog("prototype")) as PrototypeOfferContent }, readOnly: { offer: true } }),
  render: ({ tinted, offer }) => <PrototypeOffer tinted={tinted} offer={offer ?? undefined} />,
};

type GlobalPayload = { content: HomeExtras["global"]; regions: SiteSettings["regions"] } | null;
export const Global: ComponentConfig<{ data: GlobalPayload }> = {
  label: "Global infrastructure (regions)",
  fields: { data: hidden() },
  defaultProps: { data: null },
  resolveData: async ({ props }) => ({ props: { ...props, data: (await getCatalog("global")) as GlobalPayload }, readOnly: { data: true } }),
  render: ({ data }) => (data ? <GlobalInfra content={data.content} regions={data.regions} /> : <div className="h-40" />),
};

export const Contact: ComponentConfig<{ title: Txt; body: Txt; intent: string; submitLabel: string }> = {
  label: "Contact form",
  fields: { title: text("Form title"), body: textarea("Line under the title"), intent: select("Purpose", [{ label: "Demo / working session", value: "demo" }, { label: "Sales", value: "sales" }, { label: "Resource request", value: "resource" }, { label: "Preview programme", value: "preview" }]), submitLabel: text("Button label") },
  defaultProps: { title: "Book a working session", body: "Tell us which clouds you run and what you would like to see first.", intent: "demo", submitLabel: "Book a working session" },
  render: ({ title, body, intent, submitLabel }) => (
    <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-7 shadow-xl sm:p-10">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      {body && <p className="mt-2 text-muted">{body}</p>}
      <div className="mt-6"><ContactForm submitLabel={str(submitLabel) || "Send"} intent={intent} /></div>
    </div>
  ),
};

export const Newsletter: ComponentConfig<{ title: Txt; body: Txt }> = {
  label: "Newsletter sign-up",
  fields: { title: text("Title"), body: textarea("Line under the title") },
  defaultProps: { title: "A clearer view of the cloud.", body: "Platform updates and ideas for the teams running modern infrastructure." },
  render: ({ title, body }) => (
    <div className="mx-auto max-w-md">
      <p className="font-display text-xl font-medium tracking-tight text-ink">{title}</p>
      {body && <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>}
      <NewsletterForm />
    </div>
  ),
};

export const siteBlocks = { Architecture, ControlPlane, ConsoleShowcase, Ticker, Prototype, Global, Contact, Newsletter };
export type { Heading as SiteHeading };
export const withItems = items;
