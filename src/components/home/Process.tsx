import { Container, Section, SectionHeader } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/content/site";

/**
 * §62 — PROCESS. Eight steps from brief to dispatch.
 *
 * Buyers evaluating a manufacturer want to know what happens between "we like
 * this" and "it arrived". §56: no lead times are quoted — the client has not
 * verified any, so the step describes the stage rather than promising a date.
 */
export function Process() {
  return (
    <Section spacing="default" className="bg-bronze-tint">
      <Container size="wide">
        <SectionHeader
          title="Brief to dispatch, in eight stages."
          lede="The same process runs whether you're ordering from an existing collection or developing a shape that has never been made before."
          className="max-w-3xl"
        />

        <ol className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal
              key={step.step}
              as="li"
              delay={(i % 4) * 80}
              className="border-t border-sand/50 pt-5"
            >
              <span className="font-display text-3xl font-light text-bronze">
                {step.step}
              </span>
              <h3 className="mt-3 font-display text-xl font-normal text-ink">
                {step.name}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
