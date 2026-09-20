import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * upgrade.md §58: consumer and trade actions must NOT look alike.
 *  - `primary`   → ink pill. Consumer commerce ("Explore collections", "Add to cart")
 *  - `copper`    → bronze gradient pill. The hero's consumer action, from the
 *                  "Aura" glass-card reference. Text on the deep stop is 6:1.
 *  - `trade`     → olive pill. B2B only ("Request a quote")
 *  - `secondary` → hairline outline. Low emphasis, still visible.
 *  - `ghost`     → underlined text link with a travelling rule.
 */
type Variant = "primary" | "copper" | "trade" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-3 font-sans font-medium " +
  "whitespace-nowrap transition-[background-color,color,border-color,transform,filter] duration-300 " +
  "ease-[var(--ease-out-soft)] disabled:pointer-events-none disabled:opacity-45 " +
  "active:scale-[0.985]";

const variants: Record<Variant, string> = {
  primary: "rounded-full bg-ink text-canvas hover:bg-charcoal-soft",
  copper:
    "rounded-full bg-[linear-gradient(135deg,#8f6040,var(--color-bronze-deep))] text-canvas " +
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_10px_30px_-10px_rgb(126_84_51/0.7)] hover:brightness-110",
  trade: "rounded-full bg-trade text-canvas hover:bg-trade-deep",
  secondary:
    "rounded-full border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/[0.04]",
  ghost: "text-ink hover:text-bronze-deep",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

/** Circular arrow badge — the affordance used across the reference designs. */
function ArrowBadge({ variant }: { variant: Variant }) {
  const tone =
    variant === "secondary" || variant === "ghost"
      ? "bg-ink/10 text-ink"
      : "bg-canvas/20 text-canvas";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full transition-transform",
        "duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5",
        tone,
      )}
    >
      <svg viewBox="0 0 16 16" fill="none" className="size-3">
        <path
          d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<"button">, "children">;

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  ...props
}: Props) {
  const classes = cn(
    base,
    variants[variant],
    variant === "ghost" ? "h-auto gap-2 px-0" : sizes[size],
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowBadge variant={variant} />}
      {variant === "ghost" && (
        // Rule that extends on hover rather than a static underline.
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-current opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {inner}
    </button>
  );
}
