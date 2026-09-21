import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "site-button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-lg font-semibold leading-none transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "border border-transparent bg-primary text-primary-fg shadow-[0_4px_12px_-4px_rgba(36,88,245,0.4)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]",
  secondary:
    "bg-surface text-ink border border-line shadow-sm hover:bg-hover hover:border-line-strong",
  outline:
    "border border-line-strong text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink hover:bg-sunken",
  white:
    "border border-white bg-white text-[#0a1530] shadow-sm hover:bg-white/90 active:bg-white/80",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-6 text-[14px]",
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
