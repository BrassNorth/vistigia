import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { BrandNote } from "@/components/home/BrandNote";
import { Collections } from "@/components/home/Collections";
import { Categories } from "@/components/home/Categories";
import { Pillars } from "@/components/home/Pillars";
import { Materials } from "@/components/home/Materials";
import { Heritage } from "@/components/home/Heritage";
import { Designs } from "@/components/home/Designs";
import { Process } from "@/components/home/Process";
import { TradeBlock } from "@/components/home/TradeBlock";
import { Studio } from "@/components/home/Studio";

/**
 * Homepage — upgrade.md §62 story arc, in order:
 *
 *   DESIRE          Hero, TrustMarquee, BrandNote
 *   PRODUCT         Collections, Categories
 *   DIFFERENTIATION Pillars
 *   PROOF           Materials, Heritage
 *   PROCESS         Designs, Process
 *   ACTION          TradeBlock
 *   SOCIAL PROOF    Studio — last, so the oversized wordmark closes the page
 *                   into the footer the way the FORME reference does.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <BrandNote />
      <Collections />
      <Categories />
      <Pillars />
      <Materials />
      <Heritage />
      <Designs />
      <Process />
      <TradeBlock />
      <Studio />
    </>
  );
}
