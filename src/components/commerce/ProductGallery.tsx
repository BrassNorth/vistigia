"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/content/products";

/**
 * PDP gallery — upgrade.md §12 ("large product gallery, zoom").
 *
 * One markup for every breakpoint: a native scroll-snap rail. Phones swipe it,
 * desktops click the thumbnails or the arrows, and nothing here is a JS
 * carousel — the browser does the scrolling and the inertia.
 *
 * Zoom is desktop-only and pointer-anchored: mousemove writes the cursor
 * position into --zx/--zy and the image scales about that origin, so you
 * magnify the part of the glaze you're actually looking at.
 */
export function ProductGallery({ product }: { product: Product }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const images = product.images;
  const many = images.length > 1;

  const goTo = (i: number) => {
    const el = rail.current;
    if (!el) return;
    const next = Math.max(0, Math.min(i, images.length - 1));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="lg:sticky lg:top-28">
      {/* Entry animation sits on the inner box, never on the sticky wrapper. */}
      <div className="hero-in relative">
        <div
          ref={rail}
          onScroll={(e) => {
            const el = e.currentTarget;
            setActive(Math.round(el.scrollLeft / el.clientWidth));
          }}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-[1.5rem] bg-shell sm:rounded-[1.75rem]"
        >
          {images.map((src, i) => (
            <figure
              key={src}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--zx",
                  `${((e.clientX - r.left) / r.width) * 100}%`,
                );
                e.currentTarget.style.setProperty(
                  "--zy",
                  `${((e.clientY - r.top) / r.height) * 100}%`,
                );
              }}
              className="group relative aspect-square w-full shrink-0 snap-center overflow-hidden lg:cursor-zoom-in"
            >
              <Image
                src={src}
                alt={i === 0 ? product.alt : ""}
                aria-hidden={i > 0 || undefined}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="origin-[var(--zx,50%)_var(--zy,50%)] object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] lg:group-hover:scale-[1.55] lg:group-hover:duration-500"
              />
            </figure>
          ))}
        </div>

        <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-canvas/90 px-3 py-1 text-[0.65rem] font-medium tracking-[0.16em] text-ink uppercase sm:top-5 sm:left-5">
          {product.material}
        </span>

        {many && (
          <>
            {/* Desktop affordance only — phones have the swipe. */}
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => goTo(active + dir)}
                disabled={dir === -1 ? active === 0 : active === images.length - 1}
                aria-label={dir === -1 ? "Previous image" : "Next image"}
                className={cn(
                  "absolute top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full",
                  "glass-light text-ink transition-[opacity,transform] duration-300 ease-[var(--ease-out-soft)]",
                  "hover:scale-105 disabled:pointer-events-none disabled:opacity-0 lg:grid",
                  dir === -1 ? "left-4" : "right-4",
                )}
              >
                <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                  <path
                    d={dir === -1 ? "M13.5 8h-11m0 0L7 3.5M2.5 8 7 12.5" : "M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}

            {/* Progress hairline — reads as a page indicator on mobile. */}
            <div
              aria-hidden="true"
              className="mt-4 flex gap-1.5 lg:hidden"
            >
              {images.map((src, i) => (
                <span
                  key={src}
                  className={cn(
                    "h-0.5 flex-1 rounded-full transition-colors duration-500",
                    i === active ? "bg-ink" : "bg-stone",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {many && (
        <div className="mt-4 hidden gap-3 lg:flex">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={cn(
                "relative size-20 overflow-hidden rounded-xl bg-shell transition-[box-shadow,opacity] duration-500 ease-[var(--ease-out-soft)]",
                i === active
                  ? "opacity-100 shadow-[0_0_0_1.5px_var(--color-ink)]"
                  : "opacity-55 hover:opacity-90",
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
