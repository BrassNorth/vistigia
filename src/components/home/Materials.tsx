import Image from "next/image";
import { Container, Section, SectionHeader, Eyebrow } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { materials, materialsIntro } from "@/content/site";

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 border-t border-stone py-3">
      <dt className="w-24 shrink-0 text-eyebrow font-sans font-medium text-ink-faint uppercase">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-ink-soft">{value}</dd>
    </div>
  );
}

/**
 * §62 — PROOF, part one: the materials, stated as specifications.
 *
 * Copy is verbatim from /pages/our-materials, with the slide-2/3 heading
 * mismatch on the live site corrected in site.ts.
 */
export function Materials() {
  return (
    <Section spacing="default" className="bg-shell">
      <Container size="wide">
        <SectionHeader
          eyebrow={materialsIntro.eyebrow}
          title={materialsIntro.title}
          lede={materialsIntro.body}
          className="max-w-3xl"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {materials.map((material, i) => (
            <Reveal key={material.slug} as="article" delay={i * 90}>
              <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-stone">
                <Image
                  src={material.image}
                  alt={material.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>

              <h3 className="mt-7 font-display text-heading font-light text-ink">
                {material.name}
              </h3>

              <dl className="mt-5">
                <Spec label="Material" value={material.material} />
                <Spec label="Appearance" value={material.appearance} />
                <Spec label="Durability" value={material.durability} />
                <Spec label="Best for" value={material.usage} />
                <Spec
                  label="Microwave"
                  value={
                    typeof material.microwaveSafe === "string"
                      ? material.microwaveSafe
                      : material.microwaveSafe
                        ? "Yes"
                        : "No"
                  }
                />
                <Spec
                  label="Dishwasher"
                  value={
                    typeof material.dishwasherSafe === "string"
                      ? material.dishwasherSafe
                      : material.dishwasherSafe
                        ? "Yes"
                        : "No"
                  }
                />
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 rounded-xl border border-clay/50 bg-canvas p-6 sm:p-8">
          <Eyebrow tone="bronze">Vertically integrated</Eyebrow>
          <p className="mt-3 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-soft text-pretty">
            Fine bone china and melamine are produced entirely in-house.
            Porcelain is locally sourced from trusted partners — stated plainly,
            because where a piece is made is part of what you are buying.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
