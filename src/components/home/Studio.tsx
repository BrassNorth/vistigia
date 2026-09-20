import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { brand, contact, designs } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * §62 — SOCIAL PROOF, handled honestly (§16: no invented testimonials or
 * logos). FORME-style editorial collage of the brand's own photography,
 * anchored by an oversized wordmark that overlaps it.
 *
 * TODO(client): swap in a real Instagram feed when one is connected.
 */
const tiles = [
  { d: designs[0], span: "row-span-2" },
  { d: designs[2], span: "" },
  { d: designs[5], span: "" },
  { d: designs[4], span: "col-span-2" },
];

export function Studio() {
  return (
    <Section spacing="default" className="overflow-hidden bg-canvas pb-0 sm:pb-0 lg:pb-0">
      <Container size="wide">
        <h2 className="sr-only">From the studio</h2>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal className="lg:col-span-4 lg:self-start lg:pt-2">
            <div className="border-l-2 border-bronze pl-5">
              <p className="max-w-sm text-lede text-ink-soft text-pretty">
                New shapes, glaze trials and finished collections as they leave the floor.
              </p>
            </div>
            <div className="mt-8">
              <Button href={contact.instagram.url} variant="copper" withArrow>
                Follow {contact.instagram.handle}
              </Button>
            </div>
          </Reveal>

          <div className="grid h-[30rem] grid-cols-2 grid-rows-3 gap-3 sm:h-[38rem] lg:col-span-8 lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
            {tiles.map(({ d, span }, i) => (
              <Reveal
                key={d.name}
                as="figure"
                delay={i * 80}
                className={cn("group relative overflow-hidden rounded-[1.5rem] bg-shell", span)}
              >
                <Image
                  src={d.image}
                  alt={`${d.name}, ${d.note.toLowerCase()}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      {/* Oversized wordmark, pulled up to overlap the collage's foot. */}
      <p
        aria-hidden="true"
        className="relative z-10 -mt-[6vw] text-center font-display text-[19vw] leading-[0.78] tracking-[-0.02em] text-ink uppercase select-none"
      >
        {brand.name}
      </p>
    </Section>
  );
}
