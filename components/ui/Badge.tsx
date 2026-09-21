import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "neutral" | "success" | "warning";

const tones: Record<Tone, string> = {
  brand: "border-[var(--info-border)] bg-[var(--bg-active)] text-accent",
  accent: "border-[var(--info-border)] bg-[var(--bg-active)] text-accent",
  neutral: "border-line bg-sunken text-muted",
  success: "border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--success-fg)]",
  warning: "border-[var(--warning-border)] bg-[var(--warning-bg)] text-[var(--warning-fg)]",
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
        "inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-[3px] font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.07em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
