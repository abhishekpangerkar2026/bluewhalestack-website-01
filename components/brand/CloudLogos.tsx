import { cn } from "@/lib/utils";

/**
 * Recognizable cloud-provider logos (brand marks + wordmarks) for the
 * "trusted clouds" strip. Drawn as inline SVG/HTML so they need no external
 * assets and scale crisply.
 */

export const cloudLogoNames = [
  "aws",
  "azure",
  "gcp",
  "oracle",
  "ibm",
  "alibaba",
  "vmware",
  "kubernetes",
] as const;

export type CloudLogoName = (typeof cloudLogoNames)[number];

export function CloudLogo({
  name,
  className,
}: {
  name: CloudLogoName | string;
  className?: string;
}) {
  const wrap = cn("inline-flex items-center gap-2", className);
  const word = "font-display font-bold tracking-tight text-[15px] leading-none";

  switch (name) {
    case "aws":
      return (
        <span className={wrap} aria-label="Amazon Web Services">
          <svg viewBox="0 0 52 30" className="h-6 w-auto" aria-hidden>
            <text
              x="0"
              y="16"
              fontFamily="Arial, sans-serif"
              fontWeight="700"
              fontSize="17"
              fill="#232F3E"
            >
              aws
            </text>
            <path
              d="M2 23 C 16 30, 34 30, 46 23"
              stroke="#FF9900"
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M44 20 l4 2.5 l-4 2.5 z" fill="#FF9900" />
          </svg>
        </span>
      );

    case "azure":
      return (
        <span className={wrap} aria-label="Microsoft Azure">
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
            <rect width="9" height="9" fill="#F25022" />
            <rect x="11" width="9" height="9" fill="#7FBA00" />
            <rect y="11" width="9" height="9" fill="#00A4EF" />
            <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
          </svg>
          <span className={cn(word, "text-slate-700")}>Azure</span>
        </span>
      );

    case "gcp":
      return (
        <span className={wrap} aria-label="Google Cloud">
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
            <path d="M10 2 a8 8 0 0 1 7 4 l-4 2 a3.5 3.5 0 0 0-3-2 z" fill="#EA4335" />
            <path d="M17 6 a8 8 0 0 1 0 8 l-4-2 a3.5 3.5 0 0 0 0-4 z" fill="#FBBC05" />
            <path d="M17 14 a8 8 0 0 1-7 4 v-4 a3.5 3.5 0 0 0 3-2 z" fill="#34A853" />
            <path d="M10 18 a8 8 0 0 1-7-12 l4 2 a3.5 3.5 0 0 0 3 6 z" fill="#4285F4" />
          </svg>
          <span className={cn(word, "text-slate-600")}>Google Cloud</span>
        </span>
      );

    case "oracle":
      return (
        <span className={wrap} aria-label="Oracle">
          <span className={cn(word, "text-[17px] tracking-wide")} style={{ color: "#C74634" }}>
            ORACLE
          </span>
        </span>
      );

    case "ibm":
      return (
        <span className={wrap} aria-label="IBM Cloud">
          <span className={cn(word, "text-[18px] tracking-tight")} style={{ color: "#0F62FE" }}>
            IBM
          </span>
        </span>
      );

    case "alibaba":
      return (
        <span className={wrap} aria-label="Alibaba Cloud">
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
            <rect x="1" y="6" width="18" height="8" rx="2.5" fill="#FF6A00" />
            <path d="M6 8.5 l-2 1.5 l2 1.5 M14 8.5 l2 1.5 l-2 1.5" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={cn(word, "text-slate-700")}>Alibaba Cloud</span>
        </span>
      );

    case "vmware":
      return (
        <span className={wrap} aria-label="VMware">
          <span className={cn(word, "text-[16px]")} style={{ color: "#607078" }}>
            vmware
          </span>
        </span>
      );

    case "kubernetes":
      return (
        <span className={wrap} aria-label="Kubernetes">
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
            <path
              d="M10 1 l7.5 3.6 1.9 8.1 -5.2 6.5 -8.4 0 -5.2-6.5 1.9-8.1 z"
              fill="#326CE5"
            />
            <circle cx="10" cy="10" r="3" fill="none" stroke="#fff" strokeWidth="1.1" />
            <circle cx="10" cy="10" r="1" fill="#fff" />
          </svg>
          <span className={cn(word, "text-slate-700")}>Kubernetes</span>
        </span>
      );

    default:
      return <span className={cn(wrap, word, "text-slate-500")}>{name}</span>;
  }
}
