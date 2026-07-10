import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "WhaleForge — Infrastructure as Code",
  description:
    "WhaleForge is a declarative YAML-to-Terraform IaC engine with live HLD/LLD/TOGAF architecture diagrams, Git import and industry landing-zone packs — currently in public beta.",
};

const capabilities = [
  {
    icon: "Code2",
    title: "YAML DSL → real Terraform",
    body: "Write infrastructure in a readable YAML DSL. WhaleForge compiles it to production-ready Terraform HCL for AWS, Azure and GCP — no manual HCL authoring required.",
    chips: ["AWS", "Azure", "GCP", "Real HCL output"],
  },
  {
    icon: "Network",
    title: "Live architecture diagrams",
    body: "Every resource you define renders as a live architecture diagram in HLD, LLD and TOGAF formats. The diagram and the code stay in sync — change one, the other updates.",
    chips: ["HLD", "LLD", "TOGAF", "Auto-sync"],
  },
  {
    icon: "FileDown",
    title: "PDF export & Git import",
    body: "Export your architecture diagrams as PDF for stakeholders, or import existing Terraform from a Git repository to visualise and manage infrastructure you already own.",
    chips: ["PDF export", "Git import", "Share with stakeholders"],
  },
  {
    icon: "LayoutTemplate",
    title: "Industry landing-zone packs",
    body: "Start from a pre-built, compliance-ready foundation for Banking, Telco, Healthcare or Fintech. Each pack enforces guardrails, tags and account structure from day one.",
    chips: ["Banking", "Telco", "Healthcare", "Fintech"],
  },
];

const workflow = [
  {
    step: "01",
    title: "Define in YAML",
    body: "Describe your infrastructure resources — compute, networking, storage, IAM — in a clean, readable YAML DSL. No Terraform syntax knowledge needed.",
  },
  {
    step: "02",
    title: "Review the live diagram",
    body: "WhaleForge renders an HLD/LLD/TOGAF architecture diagram in real time as you type. Catch topology errors before they reach a cloud account.",
  },
  {
    step: "03",
    title: "Generate HCL",
    body: "Click compile and receive production-grade Terraform HCL for AWS, Azure or GCP. The output is clean, modular and ready to commit.",
  },
  {
    step: "04",
    title: "Export & deploy",
    body: "Export diagrams as PDF for architecture review. Apply the HCL with your existing Terraform workflow. Deployment automation is coming in the next release.",
  },
];

const industryPacks = [
  {
    name: "Banking",
    icon: "Banknote",
    features: [
      "Multi-account baseline with isolation",
      "PCI-DSS network segmentation guardrails",
      "Audit-trail tagging enforced",
      "Data residency controls",
    ],
  },
  {
    name: "Telco",
    icon: "RadioTower",
    features: [
      "Multi-tenant account structure",
      "Service mesh and connectivity layers",
      "Edge workload topology",
      "High-availability by default",
    ],
  },
  {
    name: "Healthcare",
    icon: "HeartPulse",
    features: [
      "HIPAA / DPDP-aligned foundation",
      "Data classification tagging",
      "Encrypted storage defaults",
      "In-region residency controls",
    ],
  },
  {
    name: "Fintech",
    icon: "TrendingUp",
    features: [
      "Fast-scale multi-environment layout",
      "SOC 2 guardrails built in",
      "CI/CD-friendly account baseline",
      "Cost tagging enforced from day one",
    ],
  },
];

const diagramTypes = [
  {
    name: "HLD",
    label: "High-Level Design",
    body: "A logical overview of your architecture — services, connectivity and zones — suitable for leadership and architecture review boards.",
  },
  {
    name: "LLD",
    label: "Low-Level Design",
    body: "A detailed blueprint covering compute, storage, networking and IAM — accurate enough for engineers to implement.",
  },
  {
    name: "TOGAF",
    label: "TOGAF-aligned",
    body: "Enterprise Architecture views aligned to the TOGAF ADM — useful for regulated industries and government contracts that require EA framework compliance.",
  },
];

export default function WhaleForge() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="border-b border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <Reveal>
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <Badge tone="warning">Beta</Badge>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Product · WhaleForge
                  </span>
                </div>
                <h1 className="text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
                  Infrastructure as Code,{" "}
                  <span className="text-accent">without the complexity</span>.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                  Write infrastructure in plain YAML. WhaleForge compiles it to real Terraform HCL
                  for AWS, Azure and GCP — with live architecture diagrams that stay in sync with
                  your code.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="flex flex-col gap-4 lg:pb-2">
                <div className="rounded-xl border border-line bg-sunken p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
                    What you get today
                  </p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {[
                      "YAML DSL → Terraform HCL (AWS · Azure · GCP)",
                      "Live HLD / LLD / TOGAF diagrams",
                      "PDF export & Git import",
                      "Industry landing-zone packs",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 flex items-center gap-1.5 text-xs text-faint">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Deployment runner — coming next
                  </p>
                </div>
                <Button href="/contact" size="lg">
                  Request beta access
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-b border-line bg-sunken py-8">
        <Container>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-4">
            {[
              { value: "3", label: "Cloud targets (AWS · Azure · GCP)" },
              { value: "3", label: "Diagram formats (HLD · LLD · TOGAF)" },
              { value: "4", label: "Industry landing-zone packs" },
              { value: "Beta", label: "Available now — free to try" },
            ].map((s) => (
              <div key={s.label} className="bg-surface px-6 py-5 text-center">
                <dd className="text-2xl font-bold text-ink">{s.value}</dd>
                <dt className="mt-1 text-xs text-faint">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="Everything you need to design and ship infrastructure"
              description="WhaleForge combines an IaC compiler with a visual architecture tool — so the design and the deployment artefact are the same file."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 60}>
                <Card className="flex h-full flex-col gap-4 p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {c.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-md bg-sunken px-2.5 py-1 text-xs font-medium text-muted"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How it works ── */}
      <section className="border-y border-line bg-sunken py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Workflow"
              title="From YAML to deployed infrastructure"
              description="Four steps from a blank file to a reviewed, compiled Terraform artefact."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((w, i) => (
              <Reveal key={w.step} delay={i * 60}>
                <div className="flex flex-col gap-4">
                  <span className="text-4xl font-bold tabular-nums text-accent/20">
                    {w.step}
                  </span>
                  <h3 className="text-base font-bold text-ink">{w.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Diagram formats ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Architecture diagrams"
              title="Three diagram formats, one source file"
              description="The same YAML that generates your Terraform also renders live diagrams in HLD, LLD and TOGAF formats — kept in sync automatically."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {diagramTypes.map((d, i) => (
              <Reveal key={d.name} delay={i * 70}>
                <Card className="flex flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-ink">{d.name}</span>
                    <span className="rounded-full bg-[var(--bg-active)] px-3 py-1 text-xs font-semibold text-accent">
                      {d.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{d.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Industry packs ── */}
      <section className="border-y border-line bg-sunken py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Landing-zone packs"
              title="Start from a compliant cloud foundation"
              description="Industry packs give you a pre-built, compliance-aware account structure so your cloud is governed from the first resource, not retrofitted later."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industryPacks.map((pack, i) => (
              <Reveal key={pack.name} delay={(i % 4) * 55}>
                <Card className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                      <Icon name={pack.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-ink">{pack.name}</h3>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {pack.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-muted">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Editions ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Availability"
              title="Included from Standard edition"
              description="WhaleForge is available in Standard, Enterprise and all higher editions. Landing-zone packs and advanced Git import are Enterprise and above."
            />
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {["Standard", "Enterprise", "Telco", "Government", "Datacenter"].map((e) => (
              <span
                key={e}
                className="rounded-full border border-line bg-sunken px-4 py-2 text-sm font-semibold text-muted"
              >
                {e}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-faint">
            Community edition coming. Landing-zone packs: Enterprise and above only.
          </p>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-24">
        <Container className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  Beta · Free to try
                </p>
                <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                  Define your infrastructure in YAML. Ship real Terraform.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/70">
                  Request beta access and get WhaleForge inside your BlueWhale Stack environment.
                  No lock-in, no extra contract.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button href="/contact" size="lg" variant="white">
                  Request beta access
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/editions" size="lg" className="bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/15">
                  Compare editions
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
