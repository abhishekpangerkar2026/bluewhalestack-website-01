import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "site-button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-lg font-semibold leading-none tracking-[-0.005em] transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "border border-transparent bg-primary text-primary-fg shadow-md hover:bg-[var(--primary-hover)] hover:shadow-lg hover:-translate-y-px active:translate-y-0 active:bg-[var(--primary-active)]",
  secondary:
    "bg-surface text-ink border border-line shadow-sm hover:border-line-strong hover:shadow-md",
  outline:
    "border border-line-strong text-ink hover:border-[var(--brand-blue)] hover:text-accent",
  ghost: "text-muted hover:bg-sunken hover:text-ink",
  white:
    "border border-white bg-white text-[#0d2270] shadow-md hover:bg-white/92 active:bg-white/85",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-[52px] px-7 text-[15px]",
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
