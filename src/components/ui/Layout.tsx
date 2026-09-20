import { cn } from "@/lib/utils";

/** Page gutter. `wide` is for full-bleed-ish editorial rows. */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "default" && "max-w-[88rem]",
        size === "wide" && "max-w-[104rem]",
        size === "narrow" && "max-w-[52rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Vertical rhythm. One place to tune the whole page's breathing room. */
export function Section({
  children,
  className,
  id,
  spacing = "default",
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  spacing?: "default" | "tight" | "loose" | "none";
  as?: "section" | "div" | "article";
}) {
  return (
    <Tag
      id={id}
      className={cn(
        spacing === "tight" && "py-14 sm:py-20",
        spacing === "default" && "py-20 sm:py-28 lg:py-36",
        spacing === "loose" && "py-28 sm:py-40 lg:py-52",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Wide-tracked uppercase micro-label — the device that carries the editorial
 * register across the ENOLA / CALLCK references.
 */
export function Eyebrow({
  children,
  className,
  tone = "muted",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "muted" | "bronze" | "canvas";
}) {
  return (
    <p
      className={cn(
        "text-eyebrow font-sans font-medium uppercase",
        tone === "muted" && "text-ink-muted",
        tone === "bronze" && "text-bronze-deep",
        tone === "canvas" && "text-canvas/60",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Section header: eyebrow + display title + optional lede, with a hairline
 * rule. Keeps every section opening identical in structure.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "dark",
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-4",
            align === "center" && "justify-center",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-8",
              tone === "dark" ? "bg-bronze" : "bg-canvas/40",
            )}
          />
          <Eyebrow tone={tone === "dark" ? "bronze" : "canvas"}>{eyebrow}</Eyebrow>
        </div>
      )}

      <h2
        className={cn(
          "font-display text-display font-light text-balance",
          tone === "dark" ? "text-ink" : "text-canvas",
          align === "center" && "max-w-4xl",
        )}
      >
        {title}
      </h2>

      {lede && (
        <p
          className={cn(
            "text-lede max-w-2xl text-pretty",
            tone === "dark" ? "text-ink-muted" : "text-canvas/70",
          )}
        >
          {lede}
        </p>
      )}

      {children}
    </div>
  );
}
