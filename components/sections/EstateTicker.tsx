import { cn } from "@/lib/utils";

/** The six platform classes the control plane governs, as plain-text vendor marks. */
const ESTATES: { name: string; kind: string }[] = [
  { name: "Amazon Web Services", kind: "Public cloud" },
  { name: "Microsoft Azure", kind: "Public cloud" },
  { name: "Google Cloud", kind: "Public cloud" },
  { name: "Oracle OCI", kind: "Public cloud" },
  { name: "Alibaba Cloud", kind: "Public cloud" },
  { name: "Huawei Cloud", kind: "Public cloud" },
  { name: "VMware", kind: "Private & virtualization" },
  { name: "Microsoft Hyper-V", kind: "Private & virtualization" },
  { name: "Nutanix", kind: "Private & virtualization" },
  { name: "Red Hat OpenShift", kind: "Private & virtualization" },
  { name: "Bare metal & KVM", kind: "Private & virtualization" },
  { name: "Azure Stack", kind: "Hybrid & sovereign stack" },
  { name: "Huawei Cloud Stack", kind: "Hybrid & sovereign stack" },
  { name: "Alibaba Apsara Stack", kind: "Hybrid & sovereign stack" },
  { name: "Air-gapped estates", kind: "Sovereign" },
  { name: "Edge sites — Edge Agent", kind: "Offline-tolerant" },
];

/**
 * A slow ticker of every platform the control plane governs. Text only —
 * the brand guardrail: vendor names as plain text, with the disclaimer.
 */
export function EstateTicker({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  const row = (ariaHidden: boolean) => (
    <ul aria-hidden={ariaHidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {ESTATES.map((e) => (
        <li
          key={e.name}
          className={cn(
            "flex items-center gap-2.5 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-semibold",
            dark ? "border-white/15 bg-white/[0.06] text-white/90" : "border-line bg-white text-ink shadow-sm",
          )}
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
          {e.name}
          <span className={cn("text-[11px] font-medium", dark ? "text-white/45" : "text-faint")}>{e.kind}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("relative overflow-hidden py-5", className)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent",
          dark ? "from-[#0d2270]" : "from-white",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent",
          dark ? "from-[#0d2270]" : "from-white",
        )}
      />
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
      <p className={cn("container-x mt-4 text-[11px]", dark ? "text-white/40" : "text-faint")}>
        Vendor marks identify supported platforms; no partnership or endorsement is implied.
      </p>
    </div>
  );
}
