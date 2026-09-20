import Image from "next/image";
import { Container, Section } from "@/components/ui/Layout";
import { pillars } from "@/content/site";

/**
 * §62 — DIFFERENTIATION. Sticky-stack: each capability pins under the header
 * and the next slides over it, so the four read as layers of one factory
 * rather than four equal tiles. Pure CSS `position: sticky`, no JS.
 */
export function Pillars() {
  return (
    <Section spacing="default" className="bg-shell">
      <Container size="wide">
        <h2 className="font-condensed text-mega text-ink uppercase">
          Not a supplier.
          <span className="block text-bronze-deep">The factory itself.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lede text-ink-muted text-pretty">
          Three production units, 200+ molds and a team of 200+ under one roof. Lead times,
          consistency and custom development are ours to control.
        </p>

        <div className="mt-16 flex flex-col gap-6">
          {pillars.map((pillar, i) => (
            <article
              key={pillar.title}
              style={{ top: `calc(6rem + ${i * 1.25}rem)` }}
              className="group sticky isolate grid min-h-[30rem] overflow-hidden rounded-[2rem] bg-charcoal text-canvas shadow-xl lg:min-h-[70vh] lg:grid-cols-[1fr_1.2fr]"
            >
              <div className="relative order-2 flex flex-col justify-end p-7 sm:p-10 lg:order-1 lg:p-14">
                <span className="font-condensed text-6xl text-canvas/25 lg:text-8xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-title text-balance">{pillar.title}</h3>
                <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-canvas/70 text-pretty">
                  {pillar.body}
                </p>
              </div>
              <div className="relative order-1 min-h-60 lg:order-2">
                <Image
                  src={pillar.image}
                  alt={pillar.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
