import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/commerce/ProductGallery";
import { BuyPanel } from "@/components/commerce/BuyPanel";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import {
  buildTheTable,
  byCollection,
  collections,
  formatINR,
  products,
  type Product,
} from "@/content/products";
import { brand, materials } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * PRODUCT DETAIL PAGE — upgrade.md §12–§18, §59 ("decision-making + trust +
 * commerce + B2B conversion"), §64 (contextual trade CTA).
 *
 * Page arc:
 *   DECIDE      gallery + buy panel + trust strip + disclosures
 *   UNDERSTAND  actual-size visualiser (§14), material story (§15)
 *   EXTEND      build the table (§18)
 *   CONVERT     trade band (§64)
 *
 * Every fact on this page comes from `products.ts` or the verified material
 * cards in `site.ts`. Where the client has not supplied a value (§13: SKU,
 * weight, MOQ, lead time) the row reads "On request" — it is never invented.
 */

const find = (handle: string) => products.find((p) => p.handle === handle);

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata(
  props: PageProps<"/products/[handle]">,
): Promise<Metadata> {
  const { handle } = await props.params;
  const product = find(handle);
  if (!product) return {};

  const col = product.collection === "other" ? null : collections[product.collection];
  const size = specLine(product);
  const title = `${col ? `${col.name} ` : ""}${product.name}${size ? `, ${size}` : ""}`;
  const description = col
    ? `${col.description.split(". ")[0]}. ${product.name} in ${product.material} — ${formatINR(product.price)}.`
    : `${product.name} in ${product.material} by ${brand.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.handle}` },
    // Flagged products are reachable by URL but deliberately un-merchandised
    // (see `flagged` in products.ts), so they should not be indexed either.
    ...(product.flagged ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      title,
      description,
      images: [{ url: product.images[0], alt: product.alt }],
    },
  };
}

/** The measurements the store actually publishes, as one line. */
function specLine(p: Product) {
  return [
    p.dimensionsCm ? `${p.dimensionsCm} cm` : null,
    p.capacityMl ? `${p.capacityMl} ml` : null,
    p.pieces ? `${p.pieces} pieces` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export default async function ProductPage(props: PageProps<"/products/[handle]">) {
  const { handle } = await props.params;
  const product = find(handle);
  if (!product) notFound();

  const col = product.collection === "other" ? null : collections[product.collection];
  const material = materials.find((m) => m.name === product.material);
  /* One row of four on desktop; "Shop the collection" carries the remainder. */
  const siblings = col
    ? buildTheTable(col.slug)
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: col?.description ?? product.alt,
    material: product.material,
    brand: { "@type": "Brand", name: brand.name },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://vestigia.world/products/${product.handle}`,
    },
  };

  return (
    <>
      {/* ---------------------------------------------------------------- *
       * DECIDE
       * ---------------------------------------------------------------- */}
      <Section spacing="none" className="pt-24 pb-16 sm:pt-28 lg:pt-36 lg:pb-24">
        <Container size="wide">
          <nav aria-label="Breadcrumb" className="mb-8 lg:mb-12">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-ink-muted">
              {[
                { label: "Shop", href: "/collections" },
                col
                  ? { label: col.name, href: `/collections/${col.slug}` }
                  : { label: "All products", href: "/collections/all" },
              ].map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <Link href={crumb.href} className="transition-colors hover:text-ink">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-stone">
                    /
                  </span>
                </li>
              ))}
              <li aria-current="page" className="text-ink">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16 xl:gap-24">
            <ProductGallery product={product} />

            <div className="lg:py-4">
              <div className="hero-in" style={{ "--d": "80ms" } as React.CSSProperties}>
                <Eyebrow tone="bronze">
                  {col ? `${col.name} collection` : product.material}
                </Eyebrow>
                <h1 className="mt-4 font-display text-title font-light text-ink text-balance">
                  {product.name}
                </h1>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <p className="font-display text-3xl text-ink tabular-nums">
                    {formatINR(product.price)}
                  </p>
                  {specLine(product) && (
                    <p className="text-sm text-ink-muted">{specLine(product)}</p>
                  )}
                  <p className={product.available ? "text-sm text-success" : "text-sm text-ink-faint"}>
                    {product.available ? "In stock" : "Currently unavailable"}
                  </p>
                </div>
              </div>

              {col && (
                <p
                  className="hero-in mt-6 max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft text-pretty"
                  style={{ "--d": "200ms" } as React.CSSProperties}
                >
                  {col.description}
                </p>
              )}

              {/* NOT wrapped in .hero-in: a filled transform makes the wrapper a
                  containing block and the panel's fixed mobile bar would be
                  trapped inside it. The stagger lives in BuyPanel instead. */}
              <BuyPanel product={product} />

              {/* §12 trust strip, directly below the CTA. Only the claims the
                  verified material cards support. */}
              {trustPoints(product).length > 0 && (
              <ul
                className="hero-in mt-8 grid grid-cols-3 gap-3 border-y border-stone py-5"
                style={{ "--d": "400ms" } as React.CSSProperties}
              >
                {trustPoints(product).map((point) => (
                  <li key={point.label} className="flex flex-col items-center gap-2 text-center">
                    <Icon name={point.icon} />
                    <span className="text-[0.75rem] leading-tight text-ink-soft">{point.label}</span>
                  </li>
                ))}
              </ul>
              )}

              {/* §15 — expandable disclosures. Native <details name> gives an
                  exclusive accordion with no JS; the open/close is animated in
                  globals.css where the browser supports it. */}
              <div className="mt-2">
                <Disclosure title="Care &amp; safety">
                  <Rows rows={careRows(product)} />
                </Disclosure>

                <Disclosure title="Specifications">
                  <Rows rows={specRows(product)} />
                </Disclosure>

                <Disclosure title="Shipping &amp; trade orders">
                  <p className="text-ink-soft">
                    Retail orders ship tracked across India. Case quantities, MOQs and lead
                    times for wholesale and private-label programmes are quoted per project.
                  </p>
                  <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    <Link
                      href="/policies/shipping"
                      className="text-bronze-deep underline underline-offset-4"
                    >
                      Shipping policy
                    </Link>
                    <Link
                      href="/trade/samples"
                      className="text-bronze-deep underline underline-offset-4"
                    >
                      Request samples
                    </Link>
                  </p>
                </Disclosure>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- *
       * UNDERSTAND — §14 actual size
       * ---------------------------------------------------------------- */}
      {(product.dimensionsCm || product.capacityMl) && (
        <Section spacing="tight" className="bg-shell">
          <Container size="wide">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal>
                <SectionHeader
                  eyebrow="Actual size"
                  title="Know it before it arrives."
                  lede={
                    product.dimensionsCm
                      ? `Drawn to true scale${col ? ` against the rest of the ${col.name} service` : ""} and a 30 cm place setting — the proportion here is the one that lands on your table.`
                      : "Every measurement the piece is made to, stated plainly."
                  }
                />
                <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:max-w-md">
                  {measureRows(product).map(([k, v]) => (
                    <div key={k} className="border-t border-sand/50 pt-4">
                      <dt className="text-eyebrow font-medium text-ink-muted uppercase">{k}</dt>
                      <dd className="mt-2 font-display text-2xl text-ink tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={120}>
                <SizeVisual product={product} />
              </Reveal>
            </div>
          </Container>
        </Section>
      )}

      {/* §15 — material story, from the verified material cards. */}
      {material && (
        <Section spacing="default">
          <Container size="wide">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
              <Reveal className="order-2 lg:order-1">
                <SectionHeader
                  eyebrow="The material"
                  title={`${material.name}.`}
                  lede={material.material}
                />
                <dl className="mt-10 space-y-6">
                  {[
                    ["Appearance", material.appearance],
                    ["Durability", material.durability],
                    ["Best for", material.usage],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t border-stone pt-4">
                      <dt className="text-eyebrow font-medium text-ink-muted uppercase">{k}</dt>
                      <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Button href="/materials" variant="ghost" withArrow className="mt-10">
                  Compare all materials
                </Button>
              </Reveal>

              <Reveal delay={120} className="order-1 lg:order-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-shell sm:aspect-[5/4] sm:rounded-[2rem]">
                  <Image
                    src={material.image}
                    alt={material.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      )}

      {/* ---------------------------------------------------------------- *
       * EXTEND — §18 build the table
       * ---------------------------------------------------------------- */}
      {col && siblings.length > 0 && (
        <Section spacing="default" className="bg-bronze-tint">
          <Container size="wide">
            <SectionHeader
              eyebrow="Complete the setting"
              title="Build the table."
              lede={`The rest of the ${col.name} service — same decoration, same production run, made to sit together.`}
              className="max-w-3xl"
            />

            <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {siblings.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.id}
                  delay={(i % 4) * 90}
                  className="w-[78vw] shrink-0 snap-start sm:w-auto"
                >
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </ul>

            <div className="mt-12">
              <Button href={`/collections/${col.slug}`} withArrow>
                Shop the {col.name} collection
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* ---------------------------------------------------------------- *
       * CONVERT — §64
       * ---------------------------------------------------------------- */}
      <Section spacing="tight" className="bg-charcoal text-canvas">
        <Container size="wide">
          <Reveal className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <SectionHeader
              tone="light"
              eyebrow="Buying for a business"
              title="This piece, at production volume."
              lede="Bulk pricing, case quantities, custom decoration and private-label development — manufactured in our own units since 1984."
            />
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href="/trade/quote" variant="trade" size="lg" withArrow>
                Request a bulk quote
              </Button>
              <Button
                href="/trade/samples"
                variant="secondary"
                size="lg"
                className="border-canvas/35 text-canvas hover:border-canvas hover:bg-canvas/10"
              >
                Request samples
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        // Static, author-controlled object — no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * PIECES
 * ------------------------------------------------------------------ */

/** Native disclosure. `name` makes the group mutually exclusive with no JS. */
function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details name="pdp" className="group border-b border-stone">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg text-ink transition-colors duration-300 hover:text-bronze-deep">
        {title}
        <span
          aria-hidden="true"
          className="relative grid size-7 shrink-0 place-items-center rounded-full border border-ink/15 transition-[transform,border-color] duration-500 ease-[var(--ease-out-soft)] group-open:rotate-45 group-open:border-bronze"
        >
          <span className="absolute h-px w-3 bg-current" />
          <span className="absolute h-3 w-px bg-current" />
        </span>
      </summary>
      <div className="pb-6 text-[0.9375rem] leading-relaxed">{children}</div>
    </details>
  );
}

function Rows({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="space-y-3">
      {rows.map(([k, v]) => (
        <div key={k} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <dt className="shrink-0 text-ink-muted sm:w-44">{k}</dt>
          <dd className={v === "On request" ? "text-ink-faint" : "text-ink-soft"}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Icon({ name }: { name: "leaf" | "drop" | "shield" }) {
  const paths = {
    leaf: "M4 20c0-8 5-13 16-14 0 11-5 15-13 15m-3-1 7-7",
    drop: "M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z",
    shield: "M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3Zm-3 9 2.2 2.2L15.5 10",
  } as const;

  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-bronze" aria-hidden="true">
      <path
        d={paths[name]}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * §14 — to-scale drawing. The piece against the other sizes in its own
 * collection (and a 30 cm place setting), all drawn at true relative scale.
 * "27 cm" stops being an abstraction the moment it has something to sit in.
 */
function SizeVisual({ product }: { product: Product }) {
  const cm = product.dimensionsCm;

  if (!cm) {
    return (
      <div className="grid aspect-square place-items-center rounded-[2rem] bg-canvas p-10 shadow-lg">
        <p className="font-display text-display leading-none text-ink tabular-nums">
          {product.capacityMl}
          <span className="align-top font-sans text-lg tracking-widest text-ink-muted">ml</span>
        </p>
      </div>
    );
  }

  /* Every distinct diameter in the family, largest first, plus the 30 cm
     place setting they all sit on. */
  const family =
    product.collection === "other" ? [] : byCollection(product.collection);
  const sizes = [...new Set(family.map((p) => p.dimensionsCm).filter(Boolean) as number[])]
    .concat(cm)
    .sort((a, b) => b - a);
  const ref = 30;

  return (
    <div className="relative grid aspect-square place-items-center rounded-[2rem] bg-canvas p-6 shadow-lg sm:p-8">
      {/* 30 cm place setting */}
      <div className="absolute inset-6 rounded-full border border-dashed border-sand/60 sm:inset-8" />
      <span className="absolute top-8 right-8 text-[0.6rem] tracking-[0.18em] text-ink-faint uppercase sm:top-10 sm:right-10">
        30 cm setting
      </span>

      {/* Concentric, true relative scale. */}
      {[...new Set(sizes)].map((size) => {
        const isThis = size === cm;
        return (
          <div
            key={size}
            style={{ width: `${(size / ref) * 88}%` }}
            className={cn(
              "absolute grid aspect-square place-items-center rounded-full transition-colors",
              isThis
                ? "bg-shell shadow-md ring-1 ring-bronze/40"
                : "border border-stone",
            )}
          >
            {!isThis && (
              <span className="absolute bottom-1.5 text-[0.6rem] text-ink-faint tabular-nums">
                {size}
              </span>
            )}
          </div>
        );
      })}

      <p className="relative font-display text-3xl text-ink tabular-nums sm:text-4xl">
        {cm}
        <span className="ml-1 font-sans text-sm tracking-widest text-ink-muted">cm</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * ROWS — every value below is published or verified. Gaps read
 * "On request" rather than being filled in. upgrade.md §13.
 * ------------------------------------------------------------------ */

function trustPoints(p: Product) {
  const m = materials.find((x) => x.name === p.material);
  if (!m) return []; // No verified material card — claim nothing.

  const strip = (text: string) => text.replace(/\.$/, "");

  return [
    {
      icon: "leaf" as const,
      label: m.microwaveSafe === true ? "Microwave safe" : "Not microwave safe",
    },
    {
      icon: "drop" as const,
      label:
        typeof m.dishwasherSafe === "string"
          ? `Dishwasher safe, ${strip(m.dishwasherSafe).replace(/^Yes\s*—\s*/, "")}`
          : m.dishwasherSafe
            ? "Dishwasher safe"
            : "Hand wash only",
    },
    { icon: "shield" as const, label: strip(m.durability) },
  ];
}

function careRows(p: Product): [string, string][] {
  const m = materials.find((x) => x.name === p.material);
  const dishwasher =
    typeof m?.dishwasherSafe === "string" ? m.dishwasherSafe : m?.dishwasherSafe ? "Yes" : "On request";

  return [
    ["Dishwasher", dishwasher],
    ["Microwave", m ? (m.microwaveSafe === true ? "Yes" : "No") : "On request"],
    ["Durability", m?.durability ?? "On request"],
    ["Best suited to", m?.usage ?? "On request"],
  ];
}

function specRows(p: Product): [string, string][] {
  const rows: [string, string][] = [["Material", p.material]];
  if (p.dimensionsCm) rows.push(["Diameter", `${p.dimensionsCm} cm`]);
  if (p.capacityMl) rows.push(["Capacity", `${p.capacityMl} ml`]);
  rows.push(["Weight", p.weightG ? `${p.weightG} g` : "On request"]);
  if (p.pieces) rows.push(["Pieces per set", `${p.pieces}`]);
  rows.push(
    ["SKU", "On request"],
    ["Country of manufacture", "India"],
    ["Case quantity", "On request"],
    ["Trade MOQ", "On request"],
    ["Lead time", "On request"],
  );
  return rows;
}

function measureRows(p: Product): [string, string][] {
  const rows: [string, string][] = [];
  if (p.dimensionsCm) rows.push(["Diameter", `${p.dimensionsCm} cm`]);
  if (p.capacityMl) rows.push(["Capacity", `${p.capacityMl} ml`]);
  if (p.pieces) rows.push(["Pieces", `${p.pieces}`]);
  if (p.weightG) rows.push(["Weight", `${p.weightG} g`]);
  rows.push(["Material", p.material]);
  return rows;
}
