"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/commerce/ProductCard";
import { collections, byCollection } from "@/content/products";
import { cn } from "@/lib/utils";

const SLUGS = ["comporta", "mati"] as const;
type Slug = (typeof SLUGS)[number];

/**
 * §62 — PRODUCT. FORME-style colour block: a condensed title between rules,
 * tabs for the two live collections, and a rail that loops continuously.
 *
 * The loop is one CSS transform on one element (`animate-marquee`), so it stays
 * on the compositor: no per-card animation, no JS per frame. Hover or focus
 * pauses it; reduced motion swaps it for a plain swipeable rail.
 *
 * Only Comporta and Mati are merchandised: they're the only families with
 * in-stock, priced SKUs on the store today.
 */
export function Collections() {
  const [active, setActive] = useState<Slug>("comporta");
  const collection = collections[active];
  const items = byCollection(active);
  /* Short collections are doubled so one copy always outruns the widest
     screen; the track then holds two copies and slides by exactly one. */
  const base = items.length < 8 ? [...items, ...items] : items;

  /* Arrow keys move between tabs (WAI-ARIA tabs pattern). */
  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = SLUGS[(SLUGS.indexOf(active) + 1) % SLUGS.length];
    setActive(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section aria-labelledby="collections-title" className="overflow-hidden bg-sage py-20 text-canvas sm:py-28">
      <div className="mx-auto max-w-[104rem] px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-6">
          <span aria-hidden="true" className="h-px flex-1 bg-canvas/35" />
          <h2 id="collections-title" className="font-condensed text-display text-center uppercase">
            The collections
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-canvas/35" />
        </div>

        <div role="tablist" aria-label="Collections" className="mt-8 flex justify-center gap-8" onKeyDown={onTabKey}>
          {SLUGS.map((slug) => (
            <button
              key={slug}
              id={`tab-${slug}`}
              role="tab"
              type="button"
              aria-selected={active === slug}
              aria-controls="collection-panel"
              tabIndex={active === slug ? 0 : -1}
              onClick={() => setActive(slug)}
              className={cn(
                "relative py-2 text-[0.75rem] font-medium tracking-[0.24em] uppercase transition-opacity duration-300",
                active === slug ? "opacity-100" : "opacity-60 hover:opacity-100",
              )}
            >
              {collections[slug].name}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px origin-center bg-current transition-transform duration-500 ease-[var(--ease-out-soft)]",
                  active === slug ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </div>

        <p key={`t-${active}`} className="mx-auto mt-6 max-w-xl animate-fade-up text-center font-display text-2xl text-balance sm:text-3xl">
          {collection.tagline}.
        </p>
      </div>

      <div
        id="collection-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="group/loop mask-edges mt-12 overflow-hidden motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]"
      >
        <ul
          key={active}
          style={{ animationDuration: `${base.length * 5}s` }}
          className="flex w-max animate-marquee gap-4 py-6 pr-4 sm:pr-5 group-hover/loop:[animation-play-state:paused] group-focus-within/loop:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:px-5 sm:gap-5"
        >
          {[...base, ...base].map((product, i) => (
            <li
              key={`${product.id}-${i}`}
              // Only the first real set is exposed to AT and the tab order.
              aria-hidden={i >= items.length || undefined}
              inert={i >= items.length || undefined}
              className={cn(
                "w-[72vw] max-w-[20rem] shrink-0 sm:w-80 lg:w-[21rem] lg:max-w-none",
                i >= items.length && "motion-reduce:hidden",
              )}
            >
              <ProductCard product={product} priority={i === 0} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex justify-center px-5">
        <Button href={`/collections/${active}`} variant="secondary" withArrow className="border-transparent bg-canvas text-ink hover:border-transparent hover:bg-shell">
          Shop {collection.name}
        </Button>
      </div>
    </section>
  );
}
