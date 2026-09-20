"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { formatINR, type Product } from "@/content/products";

/**
 * Purchase actions — upgrade.md §12 (quantity, add to cart, bulk quote) and
 * §58 (consumer and trade actions must never look alike).
 *
 * Also owns the mobile buy bar: it rises once the inline CTA leaves the
 * viewport, so the price and the action are never more than a thumb away on a
 * phone. One IntersectionObserver, no scroll listener.
 *
 * ponytail: there is no cart in this app yet, so "add" dispatches a
 * `vestigia:add-to-cart` event and confirms inline. Wire that event to the
 * real cart store when one exists — no other file needs to change.
 */
export function BuyPanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [pinned, setPinned] = useState(false);
  const anchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = anchor.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setPinned(entry.boundingClientRect.top < 0 && !entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2600);
    return () => clearTimeout(t);
  }, [added]);

  const add = () => {
    window.dispatchEvent(
      new CustomEvent("vestigia:add-to-cart", { detail: { id: product.id, qty } }),
    );
    setAdded(true);
  };

  const total = formatINR(product.price * qty);

  return (
    <>
      <div
        ref={anchor}
        className="hero-in mt-8 space-y-4"
        style={{ "--d": "300ms" } as React.CSSProperties}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-12 items-center rounded-full border border-ink/15">
            <Step dir={-1} onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty === 1} />
            <span aria-live="polite" className="w-8 text-center font-display text-lg tabular-nums">
              {qty}
            </span>
            <Step dir={1} onClick={() => setQty((q) => Math.min(99, q + 1))} disabled={qty === 99} />
          </div>

          <p className="font-display text-2xl text-ink tabular-nums">{total}</p>
        </div>

        <Button
          onClick={add}
          variant="copper"
          size="lg"
          disabled={!product.available}
          className="w-full"
        >
          {!product.available ? "Sold out" : added ? "Added to cart" : "Add to cart"}
        </Button>

        {/* §64: the trade path is present on every PDP, and olive, not bronze. */}
        <Button href="/trade/quote" variant="secondary" size="lg" withArrow className="w-full">
          Request a bulk quote
        </Button>

        <p
          aria-live="polite"
          className={cn(
            "text-center text-sm text-bronze-deep transition-opacity duration-500",
            added ? "opacity-100" : "opacity-0",
          )}
        >
          {qty} × {product.name} added.
        </p>
      </div>

      {/* Mobile buy bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-stone bg-canvas/95 px-5 py-3 backdrop-blur-lg lg:hidden",
          "transition-transform duration-500 ease-[var(--ease-out-soft)]",
          "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
          pinned ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base text-ink">{product.name}</p>
            <p className="text-sm text-ink-muted tabular-nums">{total}</p>
          </div>
          <Button onClick={add} variant="copper" disabled={!product.available}>
            {!product.available ? "Sold out" : added ? "Added" : "Add to cart"}
          </Button>
        </div>
      </div>
    </>
  );
}

/** Quantity control. 48px target on every breakpoint. */
function Step({
  dir,
  onClick,
  disabled,
}: {
  dir: -1 | 1;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === -1 ? "Decrease quantity" : "Increase quantity"}
      className="grid size-12 place-items-center rounded-full text-lg text-ink transition-colors duration-300 hover:bg-ink/[0.06] disabled:opacity-30"
    >
      {dir === -1 ? "−" : "+"}
    </button>
  );
}
