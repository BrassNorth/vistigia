import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The rest of what the factory makes, as capability rather than cart.
 * Bento: 6 items fill a 3×3 grid exactly (one 2×2 lead + five singles).
 */
export function Categories() {
  return (
    <Section spacing="default" className="bg-canvas">
      <Container size="wide">
        <h2 className="max-w-4xl font-display text-display text-balance text-ink">
          Every category, made to your specification.
        </h2>
        <p className="mt-5 max-w-xl text-lede text-ink-muted text-pretty">
          Shape, decoration, finish and packaging developed against your brief, in bone china,
          porcelain or melamine.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal
              key={category.name}
              as="figure"
              delay={i * 60}
              className={cn(
                "group relative isolate overflow-hidden rounded-[1.75rem] bg-shell",
                i === 0 ? "col-span-2 aspect-4/3 lg:row-span-2 lg:aspect-auto" : "aspect-square",
              )}
            >
              <Image
                src={category.image}
                alt={category.alt}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                className="object-cover transition-transform duration-1000 ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal/65 to-transparent to-50%" />
              <figcaption
                className={cn(
                  "absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-canvas sm:p-7",
                  i === 0 ? "font-condensed text-4xl uppercase sm:text-6xl" : "font-display text-lg sm:text-2xl",
                )}
              >
                {category.name}
              </figcaption>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/trade/quote" variant="trade" size="lg" withArrow>
            Request a quote
          </Button>
          <Button href="/trade/samples" variant="secondary" size="lg">
            Request samples
          </Button>
        </div>
      </Container>
    </Section>
  );
}
