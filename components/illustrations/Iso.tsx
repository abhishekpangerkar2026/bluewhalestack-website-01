import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import styles from "@/components/scenes/PlatformVisual.module.css";

export type IsoVariant = "light" | "dark";
/** Compatibility names retained for the existing content catalog. */
const SCENES = {
  "platform-stack": ["Layers", "Cloud", "ShieldCheck"],
  "cloud-slab": ["Cloud", "Server", "ShieldCheck"],
  "stacked-slabs": ["Layers", "Network", "KeyRound"],
  servers: ["Server", "Users", "Cloud"],
  "shield-slab": ["ShieldCheck", "KeyRound", "FileCheck"],
  chart: ["Wallet", "TrendingUp", "ReceiptText"],
  "ai-cube": ["Sparkles", "Database", "Lock"],
  migration: ["MoveRight", "Server", "Cloud"],
  audit: ["FileCheck", "ShieldCheck", "Eye"],
  datacenter: ["Building2", "Server", "Network"],
  "app-window": ["LayoutTemplate", "Boxes", "FileText"],
  racks: ["Server", "HardDrive", "Network"],
  data: ["Database", "FileText", "FileCheck"],
  network: ["Network", "Cloud", "Globe"],
  saas: ["Cloud", "Users", "Layers"],
  byoc: ["Cloud", "KeyRound", "ShieldCheck"],
  edge: ["Globe", "Server", "Lock"],
  observe: ["Activity", "Gauge", "Eye"],
  partners: ["Handshake", "Building2", "Network"],
  solutions: ["Workflow", "Boxes", "ShieldCheck"],
} as const;

export type IsoName = keyof typeof SCENES;
export const EDITION_ISO: Record<string, IsoName> = { standard: "cloud-slab", enterprise: "stacked-slabs", "telco-datacenter": "servers", government: "shield-slab" };
export const FAMILY_ISO: Record<string, IsoName> = { management: "cloud-slab", whalenomics: "chart", security: "shield-slab", governance: "audit", ai: "ai-cube", migration: "migration", observability: "observe", tenancy: "servers", sovereign: "edge" };
export const SOLUTION_ISO: Record<string, IsoName> = { "unified-cloud-inventory": "cloud-slab", "ai-native-provisioning": "ai-cube", "bundled-observability": "observe", "cloud-migration": "migration", "security-compliance": "shield-slab", "sovereign-cloud": "edge" };
export const INDUSTRY_ISO: Record<string, IsoName> = { BFSI: "audit", Government: "shield-slab", "Telco & Datacenter": "servers", Media: "edge" };
export const DEPLOY_ISO: IsoName[] = ["saas", "byoc", "racks", "shield-slab", "edge"];

/** CSS emblem compositions using the established icon library, without custom SVG. */
export function Iso({ name, variant = "light", className, title }: { name: IsoName; variant?: IsoVariant; className?: string; title?: string }) {
  const icons = SCENES[name];
  if (!icons) return null;
  return (
    <div className={cn(styles.emblem, variant === "dark" && styles.emblemDark, className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <div className={styles.emblemCore}>
        <Icon name={icons[0]} aria-hidden="true" />
        <span className={styles.emblemSatellite}><Icon name={icons[1]} aria-hidden="true" /></span>
        <span className={styles.emblemSatellite}><Icon name={icons[2]} aria-hidden="true" /></span>
      </div>
    </div>
  );
}
