"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { gsap, useGSAP } from "@/lib/gsap";
import { designs } from "@/content/site";

/**
 * The design archive. Framed as patterns available to develop, never as
 * buyable SKUs (§56).
 *
 * Desktop: the section pins and vertical scroll pans the archive sideways,
 * so forty years of patterns read as one continuous shelf. Mobile and
 * reduced motion: a native swipeable rail, no hijack.
 */
function Intro() {
  return (
    <>
      <h2 className="font-condensed text-[clamp(3rem,1rem+6vw,7rem)] leading-[0.9] text-ink uppercase">
        The design
        <span className="block text-bronze-deep">archive</span>
      </h2>
      <p className="mt-5 max-w-sm text-lede text-ink-muted text-pretty lg:mt-6">
        Forty years of patterns. Each can be produced as it is, recoloured, or redrawn for your
        brand.
      </p>
      <div className="mt-7 lg:mt-8">
        <Button href="/designs" variant="secondary" withArrow>
          View the archive
        </Button>
      </div>
    </>
  );
}

export function Designs() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        gsap.set(el, { overflow: "visible" });
        const distance = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: wrap },
  );

  return (
    <section ref={wrap} className="overflow-hidden bg-canvas py-20 sm:py-28 lg:flex lg:min-h-[100dvh] lg:items-center lg:py-0">
      {/* Mobile / tablet: intro stacks above a plain swipe rail. */}
      <div className="px-5 sm:px-8 lg:hidden">
        <Intro />
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-5 items-end gap-4 overflow-x-auto px-5 sm:scroll-px-8 sm:gap-5 sm:px-8 lg:mt-0 lg:gap-8 lg:px-12"
      >
        {/* Desktop: the intro rides along as the first panel of the pan. */}
        <div className="hidden w-[30rem] shrink-0 flex-col justify-end self-stretch pr-4 lg:flex">
          <Intro />
        </div>

        {designs.map((design, i) => (
          <figure
            key={design.name}
            className={
              "w-[68vw] shrink-0 snap-start sm:w-[18rem] lg:w-[24rem] " +
              (i % 2 === 1 ? "lg:mb-16" : "")
            }
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-[1.75rem] bg-shell">
              <Image
                src={design.image}
                alt={`${design.name}, ${design.note.toLowerCase()}, ${design.material} by Vestigia`}
                fill
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 72vw"
                className="object-cover transition-transform duration-1000 ease-[var(--ease-out-soft)] hover:scale-[1.04]"
              />
            </div>
            <figcaption className="mt-5 flex items-baseline justify-between gap-4">
              <span className="font-display text-2xl text-ink">{design.name}</span>
              <span className="text-[0.7rem] font-medium tracking-[0.2em] text-ink-muted uppercase">
                {design.material}
              </span>
            </figcaption>
            <p className="mt-1 text-sm text-ink-muted">{design.note}</p>
          </figure>
        ))}
        {/* Trailing breathing room so the last card doesn't end flush. */}
        <div aria-hidden="true" className="w-1 shrink-0 lg:w-12" />
      </div>
    </section>
  );
}
