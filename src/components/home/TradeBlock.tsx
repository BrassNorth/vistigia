import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { b2bBlock, buyerTypes } from "@/content/site";

/**
 * §62 — ACTION, and §63 "Built for buyers".
 *
 * The single most important block on the page for revenue: a consumer who
 * lands here converts for ₹300, a hospitality group converts for a container.
 * §2 — nobody should have to hunt for where the B2B path begins.
 */
export function TradeBlock() {
  return (
    <Section spacing="default" className="bg-trade-deep text-canvas">
      <Container size="wide">
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-8 bg-canvas/40" />
              <Eyebrow tone="canvas">{b2bBlock.eyebrow}</Eyebrow>
            </div>
            <h2 className="mt-5 font-display text-display font-light text-balance">
              {b2bBlock.title}
            </h2>
            <p className="mt-6 max-w-xl text-lede text-canvas/70 text-pretty">
              {b2bBlock.body}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                href={b2bBlock.primaryCta.href}
                size="lg"
                withArrow
                variant="secondary"
                className="border-transparent bg-canvas text-ink hover:border-transparent hover:bg-shell"
              >
                {b2bBlock.primaryCta.label}
              </Button>
              <Button
                href={b2bBlock.secondaryCta.href}
                variant="secondary"
                size="lg"
                className="border-canvas/25 text-canvas hover:border-canvas/60 hover:bg-canvas/[0.06]"
              >
                {b2bBlock.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="relative aspect-4/3 overflow-hidden rounded-2xl bg-trade"
          >
            <Image
              src={b2bBlock.image}
              alt={b2bBlock.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        {/* Four doors into the same trade funnel — §6. */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-xl bg-canvas/15 sm:grid-cols-2 lg:grid-cols-4">
          {buyerTypes.map((buyer, i) => (
            <Reveal key={buyer.slug} delay={i * 70} className="bg-trade-deep">
              <Link
                href={`/trade/${buyer.slug}`}
                className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-trade/60"
              >
                <h3 className="font-display text-heading font-light">
                  {buyer.name}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-canvas/65 text-pretty">
                  {buyer.body}
                </p>
                <ul className="mt-6 flex flex-col gap-1.5">
                  {buyer.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2.5 text-sm text-canvas/80"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1 shrink-0 rounded-full bg-canvas/50"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-7 text-eyebrow font-sans font-medium text-canvas/50 uppercase transition-colors group-hover:text-canvas">
                  Explore →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
