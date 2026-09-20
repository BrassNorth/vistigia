"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { brand } from "@/content/site";

/**
 * Verbatim "A note from Vestigia". The words ink in as you read down: the
 * scroll position is the reading position, so the motion paces the sentence
 * rather than decorating it. Reduced motion: fully inked, no scrub.
 */
export function BrandNote() {
  const root = useRef<HTMLElement>(null);
  const words = brand.note.split(" ");

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-quote]", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-canvas py-24 sm:py-36 lg:py-44">
      <div className="mx-auto max-w-[64rem] px-5 sm:px-8">
        <blockquote data-quote className="font-display text-[clamp(1.6rem,1rem+2.6vw,3.25rem)] leading-[1.18] text-balance text-ink">
          {words.map((word, i) => (
            <span key={i} data-word>
              {word}{" "}
            </span>
          ))}
        </blockquote>
        <cite className="mt-10 block text-[0.7rem] font-medium tracking-[0.28em] text-ink-muted uppercase not-italic">
          A note from {brand.name}
        </cite>
      </div>
    </section>
  );
}
