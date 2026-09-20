"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal + count-up primitives.
 *
 * Deliberately built on IntersectionObserver + CSS transitions rather than an
 * animation library — upgrade.md §39 calls out "avoid unnecessary animation
 * libraries", and this is ~1KB against ~35KB for the equivalent in Framer.
 *
 * Both primitives degrade to their final state when JS is unavailable or the
 * user prefers reduced motion (handled in globals.css).
 */

function useInView<T extends HTMLElement>(options?: {
  threshold?: number;
  once?: boolean;
}) {
  const { threshold = 0.18, once = true } = options ?? {};
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IO support → show immediately rather than trapping content at opacity
    // 0. Deferred to a microtask so this is a follow-up update rather than a
    // synchronous cascade out of the effect body.
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setInView(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger in ms. Keep under ~400ms — beyond that it reads as lag. */
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "figure";
}) {
  const { ref, inView } = useInView<HTMLElement>();

  // Widened to ElementType so one ref type serves every allowed tag — the
  // union of per-tag ref types has no common member TS will accept.
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      data-revealed={inView ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Counts up to `to` once scrolled into view. upgrade.md §46 lists number
 * counters as an approved micro-interaction.
 */
export function CountUp({
  to,
  duration = 1600,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Respect the OS setting: a zero duration makes the very first frame land
    // on the final number, so reduced-motion users get the value with no
    // animation and no separate code path.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduced ? 0 : duration;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = ms === 0 ? 1 : Math.min((now - start) / ms, 1);
      // easeOutExpo — fast start, long settle. Matches the page's motion feel.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat("en-IN").format(value)}
    </span>
  );
}
