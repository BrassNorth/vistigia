import { trustStrip } from "@/content/site";

/**
 * §3 B2B trust strip, moved out of the hero so the first screen stays one
 * message. The page's only marquee. Pauses on hover; static under reduced
 * motion via the global rule.
 */
export function TrustMarquee() {
  return (
    <section aria-label="At a glance" className="border-b border-stone bg-canvas">
      {/* Screen readers get the list once, not the looping duplicate. */}
      <ul className="sr-only">
        {trustStrip.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="mask-edges group overflow-hidden py-7 sm:py-9">
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {[...trustStrip, ...trustStrip].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center font-condensed text-3xl whitespace-nowrap text-ink uppercase sm:text-5xl"
            >
              {item}
              <span className="mx-8 text-xl text-bronze sm:mx-12 sm:text-2xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
