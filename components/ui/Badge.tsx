import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "neutral" | "success" | "warning";

const tones: Record<Tone, string> = {
  brand: "bg-[var(--bg-active)] text-accent",
  accent: "bg-[var(--bg-active)] text-accent",
  neutral: "bg-sunken text-muted",
  success: "bg-[var(--success-bg)] text-[var(--success-fg)]",
  warning: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
};

export function Badge({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
