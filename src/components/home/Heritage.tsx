import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { Reveal, CountUp } from "@/components/ui/Reveal";
import { heritage, metrics, units } from "@/content/site";

/**
 * §62 — PROOF, part two: forty years, three units, and the numbers behind them.
 *
 * §35: every figure below is one Vestigia already publishes on its own site.
 * Nothing here is estimated, rounded up, or borrowed from a competitor.
 */
export function Heritage() {
  return (
    <Section spacing="default" className="bg-charcoal text-canvas">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-4/5 overflow-hidden rounded-2xl bg-charcoal-soft sm:aspect-3/2 lg:aspect-4/5">
            <Image
              src={heritage.image}
              alt={heritage.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-8 bg-canvas/40" />
              <Eyebrow tone="canvas">{heritage.eyebrow}</Eyebrow>
            </div>

            <h2 className="mt-5 font-display text-display font-light text-balance">
              {heritage.title}
            </h2>

            {heritage.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-6 text-[1.0625rem] leading-relaxed text-canvas/70 text-pretty"
              >
                {paragraph}
              </p>
            ))}

            <ul className="mt-10 flex flex-col gap-3">
              {units.map((unit) => (
                <li
                  key={unit.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-canvas/15 pt-3"
                >
                  <span className="font-display text-lg font-light">
                    {unit.name}
                  </span>
                  <span className="text-sm text-canvas/55">{unit.since}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button
                href="/about"
                variant="secondary"
                withArrow
                className="border-canvas/25 text-canvas hover:border-canvas/60 hover:bg-canvas/[0.06]"
              >
                Our story
              </Button>
            </div>
          </Reveal>
        </div>

        {/* ---- verified metrics ---- */}
        <div className="mt-24 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-canvas/15 pt-16 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 80}>
              <p className="font-display text-title font-light tracking-[-0.02em]">
                {metric.countTo ? (
                  <>
                    <CountUp to={metric.countTo} />
                    {metric.display.endsWith("+") && "+"}
                  </>
                ) : (
                  metric.display
                )}
              </p>
              <p className="mt-3 text-[0.9375rem] text-canvas">{metric.label}</p>
              <p className="mt-1 text-sm text-canvas/50 text-pretty">
                {metric.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
