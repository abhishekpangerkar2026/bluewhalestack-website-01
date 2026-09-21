import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "site-button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[3px] font-medium leading-none tracking-[-0.005em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "border border-transparent bg-primary text-primary-fg hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]",
  secondary:
    "bg-surface text-ink border border-line hover:border-line-strong",
  outline:
    "border border-line-strong text-ink hover:border-[var(--text-primary)]",
  ghost: "text-muted hover:bg-sunken hover:text-ink",
  white:
    "border border-white bg-white text-[#101114] hover:bg-white/90 active:bg-white/80",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[12.5px]",
  md: "h-10 px-[18px] text-[13px]",
  lg: "h-12 px-6 text-[13.5px]",
};

type ButtonProps = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
        aria-label={props["aria-label"]}
        aria-disabled={props.disabled || undefined}
        tabIndex={props.disabled ? -1 : props.tabIndex}
      >
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
