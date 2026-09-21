import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import styles from "./PlatformVisual.module.css";

type Node = { label: string; detail?: string; icon: string };
type Visual = { label: string; core: string; icon: string; inputs: Node[]; outputs: Node[]; footer: string; kind?: "architecture" | "perimeter" | "cost" | "flow" };
const node = (label: string, icon: string, detail?: string): Node => ({ label, icon, detail });
const ESTATES = [node("Public cloud", "Cloud", "AWS · Azure · GCP + more"), node("Private estate", "Server", "Virtualization & datacenters"), node("Sovereign & edge", "Globe", "In-country & disconnected")];
const OUTCOMES = [node("Inventory", "Boxes"), node("Governance", "ShieldCheck"), node("Operations", "Activity")];
const DEFAULT: Visual = { label: "The connected estate", core: "One control plane", icon: "Layers", inputs: ESTATES, outputs: OUTCOMES, footer: "One inventory. One identity. One policy layer." };

const VISUALS: Record<string, Visual> = {
  estate: DEFAULT,
  platform: { ...DEFAULT, label: "Platform architecture", core: "BlueWhale Stack" },
  architecture: { ...DEFAULT, label: "Platform architecture", core: "Six layers. One platform.", kind: "architecture" },
  inventory: { label: "Inventory & discovery", core: "One resource model", icon: "Boxes", inputs: ESTATES, outputs: [node("Resources", "Server"), node("Dependencies", "Network"), node("Ownership", "Users")], footer: "A shared view across your connected infrastructure." },
  "cloud-connectors": { ...DEFAULT, label: "Cloud connectivity", core: "Connect your estate", icon: "Plug", footer: "Cloud APIs + Edge Agent · outbound HTTPS" },
  whalenomics: { label: "Cost intelligence", core: "Whalenomics", icon: "Wallet", inputs: [node("Cloud billing", "ReceiptText", "Across providers"), node("Resources", "Boxes", "The infrastructure context"), node("Ownership", "Users", "Teams & business units")], outputs: [node("Workloads", "Server"), node("Departments", "Building2"), node("Tenants", "Users")], footer: "Understand the cost. Identify the owner.", kind: "cost" },
  "whale-ai": { label: "Intelligence inside your perimeter", core: "Whale AI", icon: "Sparkles", inputs: [node("Inventory", "Boxes", "Resource context"), node("Billing", "Wallet", "Cost context"), node("Tickets", "Headset", "Operational context")], outputs: [node("Explain", "Eye"), node("Recommend", "Sparkles"), node("Document", "FileText")], footer: "Hosted models · your model · fully offline", kind: "perimeter" },
  identity: { label: "Identity & access", core: "One identity fabric", icon: "KeyRound", inputs: [node("Your directory", "Users", "Existing identities"), node("SAML / OIDC", "KeyRound", "Federated sign-in"), node("SCIM", "RefreshCw", "User lifecycle")], outputs: [node("Roles", "Users"), node("Permissions", "Lock"), node("Audit trail", "FileCheck")], footer: "Access tied to your existing identity provider." },
  "cloud-audit": { label: "Governance & evidence", core: "Cloud Audit & Evidence", icon: "FileCheck", inputs: [node("Residency", "Globe", "Where data lives"), node("Access", "KeyRound", "Who can reach it"), node("Configuration", "Settings", "How it is governed")], outputs: [node("Controls", "ShieldCheck"), node("Findings", "Eye"), node("Evidence", "FileCheck")], footer: "One policy layer across the connected estate.", kind: "flow" },
  migration: { label: "Migration planning", core: "Migration Engine", icon: "MoveRight", inputs: [node("Workloads", "Server", "Existing infrastructure"), node("Dependencies", "Network", "Application relationships"), node("Constraints", "ShieldCheck", "Cost, effort & blockers")], outputs: [node("Assess", "FileCheck"), node("Sequence", "Layers"), node("Plan waves", "MoveRight")], footer: "Assessment and wave planning · execution in development", kind: "flow" },
  provisioning: { label: "Governed provisioning", core: "Service Catalog", icon: "PackagePlus", inputs: [node("Approved items", "Boxes", "Cloud resources"), node("Guardrails", "ShieldCheck", "Policy requirements"), node("AI sizing", "Sparkles", "Resource recommendations")], outputs: [node("Request", "FileText"), node("Approve", "UserCheck"), node("Provision", "Cloud")], footer: "A governed path from request to resource.", kind: "flow" },
  whaleforge: { label: "Infrastructure as code", core: "WhaleForge", icon: "Boxes", inputs: [node("YAML", "FileText", "Infrastructure definitions"), node("Cloud targets", "Cloud", "AWS · Azure · GCP"), node("Git", "Layers", "Versioned source")], outputs: [node("Terraform", "Boxes"), node("Diagrams", "Network"), node("Export", "FileText")], footer: "Beta · generated infrastructure applied in your pipeline", kind: "flow" },
  "landing-zone": { label: "Cloud foundations", core: "Landing Zone Builder", icon: "LayoutTemplate", inputs: [node("Accounts", "Cloud", "Cloud organization"), node("Policy", "ShieldCheck", "Guardrails"), node("Network", "Network", "Foundation design")], outputs: [node("Design", "LayoutTemplate"), node("Generate", "FileText"), node("Export", "Boxes")], footer: "Beta · diagram-driven cloud foundations", kind: "flow" },
  observe: { label: "Operational visibility", core: "Observe", icon: "Activity", inputs: [node("Logs", "ScrollText", "Events in context"), node("Metrics", "Activity", "System health"), node("Traces", "Network", "Request paths")], outputs: [node("Service health", "HeartPulse"), node("SLOs", "Gauge"), node("Incidents", "Headset")], footer: "Understand what happened, where, and why." },
  itsm: { label: "Service operations", core: "IT service management", icon: "Headset", inputs: [node("Events", "Activity", "Infrastructure signals"), node("Requests", "FileText", "Team workflows"), node("Resources", "Boxes", "Shared inventory")], outputs: [node("Triage", "Eye"), node("Assign", "Users"), node("Resolve", "FileCheck")], footer: "Connect service work to the resource it concerns.", kind: "flow" },
  tenancy: { label: "Tenancy & monetization", core: "Your cloud service", icon: "Users", inputs: [node("Capacity", "Server", "Your infrastructure"), node("Catalog", "Boxes", "Your service offering"), node("Identity", "KeyRound", "Tenant boundaries")], outputs: [node("Tenant A", "Building2"), node("Tenant B", "Building2"), node("Tenant C", "Building2")], footer: "Conceptual tenant model · preview edition" },
  "sovereign-operations": { label: "Sovereign architecture", core: "Inside your perimeter", icon: "ShieldCheck", inputs: [node("Infrastructure", "Server", "In-country deployment"), node("Identity", "KeyRound", "Your access policy"), node("Whale AI", "Sparkles", "In-region intelligence")], outputs: [node("Residency", "Globe"), node("Segregation", "Lock"), node("Evidence", "FileCheck")], footer: "On-premises · air-gapped · offline-tolerant edge", kind: "perimeter" },
  fabric: { label: "BlueWhale Stack Fabric", core: "One sovereign fabric", icon: "Network", inputs: [node("Operator A", "Server", "Datacenter capacity"), node("Operator B", "Server", "Datacenter capacity"), node("Operator C", "Server", "Datacenter capacity")], outputs: [node("One catalog", "Boxes"), node("One identity", "KeyRound"), node("One bill", "ReceiptText")], footer: "Multi-operator architecture · launching in India", kind: "perimeter" },
};

const INDUSTRIES: Record<string, { label: string; icon: string; sources: string[]; results: string[] }> = {
  government: { label: "Government", icon: "Landmark", sources: ["Agencies", "Directorates", "Sovereign sites"], results: ["Residency", "Segregation", "Evidence"] },
  bfsi: { label: "Banking & finance", icon: "Banknote", sources: ["Core systems", "Digital channels", "Analytics"], results: ["Controls", "Ownership", "Audit evidence"] },
  healthcare: { label: "Healthcare", icon: "HeartPulse", sources: ["Clinical systems", "Hospital estate", "Patient data"], results: ["Residency", "Access policy", "Traceability"] },
  "regulated-enterprise": { label: "Regulated enterprise", icon: "Building2", sources: ["Public clouds", "Private estate", "Business units"], results: ["Visibility", "Governance", "Evidence"] },
  saas: { label: "SaaS & digital native", icon: "Rocket", sources: ["Applications", "Cloud accounts", "Product teams"], results: ["Inventory", "Cost context", "Guardrails"] },
  telco: { label: "Telco & MSP", icon: "RadioTower", sources: ["Your network", "Your capacity", "Your services"], results: ["Tenant catalog", "Metering", "Service health"] },
  datacenter: { label: "Datacenter & colocation", icon: "Server", sources: ["Facilities", "Rack capacity", "Cloud services"], results: ["Inventory", "Tenant services", "Operations"] },
};

const ALIASES: Record<string, string> = {
  "solution-unified-cloud-inventory": "inventory", "solution-ai-native-provisioning": "provisioning", "solution-bundled-observability": "observe", "solution-cloud-migration": "migration", "solution-security-compliance": "cloud-audit", "solution-sovereign-cloud": "sovereign-operations",
  "edition-government": "sovereign-operations", "edition-telco-datacenter": "tenancy", "edition-enterprise": "platform", "edition-standard": "standard", finops: "whalenomics",
};

function visualFor(scene: string): Visual {
  const key = ALIASES[scene] ?? scene;
  if (key === "standard") return { ...DEFAULT, label: "Standard edition", inputs: [node("AWS", "Cloud"), node("Azure", "Cloud"), node("Google Cloud", "Cloud")], footer: "One tenant · SaaS or your own cloud" };
  const industry = INDUSTRIES[key.replace("industry-", "")];
  if (industry) return { label: `${industry.label} architecture`, core: "BlueWhale Stack", icon: industry.icon, inputs: industry.sources.map((label) => node(label, industry.icon)), outputs: industry.results.map((label, i) => node(label, ["Eye", "ShieldCheck", "FileCheck"][i])), footer: "Industry context. One shared control plane." };
  return VISUALS[key] ?? DEFAULT;
}

function Nodes({ nodes, source = false }: { nodes: Node[]; source?: boolean }) {
  return <div className={cn(styles.nodes, source && styles.sources)}>{nodes.map((item) => <div className={styles.node} key={item.label}><Icon name={item.icon} aria-hidden="true" /><span>{item.label}</span>{source && item.detail && <small>{item.detail}</small>}</div>)}</div>;
}

const LAYERS = [
  ["Industry experience", "Enterprises · operators · government", "Building2"],
  ["Digital experience layer", "Portals · catalog · service workflows", "LayoutTemplate"],
  ["Unified platform core", "Nine connected capability families", "Layers"],
  ["Integrations", "Identity · service management · APIs", "Plug"],
  ["Connected infrastructure", "Public · private · hybrid · edge", "Server"],
  ["Deployment", "SaaS · BYOC · on-prem · sovereign", "Globe"],
];

export function PlatformVisual({ scene, title, caption, compact = false, variant = "light", className }: {
  scene: string; title?: string; caption?: string; compact?: boolean; variant?: "light" | "dark"; className?: string;
}) {
  const visual = visualFor(scene);
  return (
    <figure className={cn(styles.panel, compact && styles.compact, variant === "dark" && styles.onDark, className)} aria-label={`${title ?? visual.label} — conceptual architecture`}>
      <div className={styles.header}><span className={styles.status} aria-hidden="true" /><span>{visual.label}</span><span className={styles.diagramLabel}>Architecture</span></div>
      {visual.kind === "architecture" && !compact ? (
        <div className={styles.layers}>{LAYERS.map(([label, detail, icon], i) => <div key={label} className={cn(styles.layer, i === 2 && styles.coreLayer)}><span className={styles.layerNumber}>0{i + 1}</span><Icon name={icon} aria-hidden="true" /><div><strong>{label}</strong><span>{detail}</span></div></div>)}</div>
      ) : (
        <div className={cn(styles.diagram, visual.kind === "perimeter" && styles.perimeter, visual.kind === "cost" && styles.cost)}>
          {!compact && <Nodes nodes={visual.inputs} source />}
          {!compact && <div className={styles.connector} aria-hidden="true"><i /><i /><i /></div>}
          <div className={styles.core}><span className={styles.coreIcon}><Icon name={visual.icon} aria-hidden="true" /></span><div className={styles.coreCopy}><span className={styles.coreEyebrow}>BLUEWHALE STACK</span><strong>{visual.core}</strong></div><span className={styles.coreMark} aria-hidden="true">↗</span></div>
          <div className={styles.connector} aria-hidden="true"><i /><i /><i /></div>
          <Nodes nodes={visual.outputs} />
          {visual.kind === "cost" && !compact && <div className={styles.allocation} aria-hidden="true"><span /><span /><span /></div>}
        </div>
      )}
      {!compact && <figcaption className={styles.footer}><span>{caption ?? visual.footer}</span><span className={styles.captionNote}>Capability map</span></figcaption>}
    </figure>
  );
}
