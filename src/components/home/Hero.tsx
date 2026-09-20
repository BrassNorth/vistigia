"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { brand, media } from "@/content/site";

/* Poster lines. Broken by hand so the condensed type sets as a block rather
   than wherever the browser happens to wrap. */
const lines = ["Tableware", "designed for", "the way the", "world dines."];

/**
 * §62 — DESIRE. Full-bleed video behind everything, header included.
 *
 * Intro is CSS (runs from first paint, no hydration flash). Scroll is GSAP:
 * as you leave, the frame insets and rounds into a card and the type drifts
 * up, handing off to the page below instead of just scrolling away.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* Desktop only: animating clip-path over a playing video repaints the
         whole frame each scroll tick, which phones can't afford. */
      gsap.matchMedia().add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        tl.fromTo(
          "[data-frame]",
          { clipPath: "inset(0% 0% 0% 0% round 0px)" },
          { clipPath: "inset(6% 3% 0% 3% round 32px)" },
          0,
        )
          .to("[data-media]", { scale: 1.08 }, 0)
          .to("[data-copy]", { yPercent: -18, opacity: 0.2 }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-canvas">
      <div
        data-frame
        className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-charcoal"
      >
        <div data-media className="absolute inset-0 -z-10">
          <div className="video-settle absolute inset-0">
            {/* Poster carries the LCP; the video paints over it once decoded. */}
            <Image
              src={media.heroPoster}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <video
              className="absolute inset-0 size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={media.heroPoster}
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src={media.heroVideo} type="video/mp4" />
            </video>
          </div>
          {/* Scrim: dark at the foot for the type, a light veil at the top
              so the transparent header stays readable over any frame. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(22_19_15/0.88)_0%,rgb(22_19_15/0.35)_45%,rgb(22_19_15/0.1)_70%,rgb(22_19_15/0.5)_100%)]"
          />
        </div>

        <div
          data-copy
          className="mx-auto grid w-full max-w-[104rem] gap-8 px-5 pt-32 pb-10 sm:px-8 sm:pb-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:px-12"
        >
          <div>
            <p
              className="hero-in text-[0.7rem] font-medium tracking-[0.28em] text-canvas/75 uppercase"
              style={{ "--d": "150ms" } as React.CSSProperties}
            >
              {brand.tagline}, since {brand.foundedYear}
            </p>
            <h1 className="mt-5 font-condensed text-mega text-canvas uppercase">
              {lines.map((line, i) => (
                <span key={line} className="line-mask">
                  <span style={{ "--d": `${250 + i * 110}ms` } as React.CSSProperties}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Glass card: the "Aura" reference, carrying lede + both paths. */}
          <div
            className="glass hero-in w-full rounded-[1.75rem] p-6 text-canvas sm:p-7 lg:w-[26rem]"
            style={{ "--d": "800ms" } as React.CSSProperties}
          >
            <p className="font-display text-2xl leading-snug">
              Bone china, porcelain and melamine.{" "}
              <span className="text-[#e4b98f]">Made in-house since 1984.</span>
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-canvas/75 text-pretty">
              {brand.lede}
            </p>
            {/* §58: the two audiences get visually distinct actions. */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              <Button href="/collections/all" variant="copper" withArrow className="sm:flex-1 lg:flex-none">
                Explore collections
              </Button>
              <Button
                href="/trade/quote"
                variant="secondary"
                className="sm:flex-1 lg:flex-none border-canvas/35 text-canvas hover:border-canvas hover:bg-canvas/10"
              >
                Request a quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
