import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { NewsletterForm } from "./NewsletterForm";
import { brand, contact, footerNav, legalLinks } from "@/content/site";

/**
 * upgrade.md §45 — five-column footer (Shop / Trade / Company / Support /
 * Legal) plus newsletter and contact.
 *
 * Contact fields the client has not verified (phone, WhatsApp, postal address,
 * public LinkedIn) are held in site.ts as `null` and are deliberately NOT
 * rendered. §56: nothing gets published as fact without a verified source.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-canvas">
      <Container size="wide" className="pt-20 pb-10 sm:pt-28">
        {/* ---- top: wordmark + trade CTA ---- */}
        <div className="flex flex-col gap-10 border-b border-canvas/12 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Link
              href="/"
              className="font-display text-4xl font-light tracking-[0.12em] uppercase sm:text-5xl"
            >
              {brand.name}
            </Link>
            <p className="mt-5 text-lede text-canvas/60 text-pretty">
              {brand.lede}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href="/trade/quote" variant="trade" size="md" withArrow>
              Request a quote
            </Button>
            <Button
              href="/collections/all"
              variant="secondary"
              size="md"
              className="border-canvas/25 text-canvas hover:border-canvas/60 hover:bg-canvas/[0.06]"
            >
              Shop the collections
            </Button>
          </div>
        </div>

        {/* ---- middle: link columns + newsletter ---- */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1fr_1fr_1fr_1fr_1.25fr] lg:gap-8">
          {footerNav.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <h2 className="text-eyebrow mb-5 font-sans font-medium text-canvas/45 uppercase">
                {group.label}
              </h2>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9375rem] text-canvas/75 transition-colors duration-300 hover:text-canvas"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-eyebrow mb-5 font-sans font-medium text-canvas/45 uppercase">
              Stay in touch
            </h2>
            <NewsletterForm />

            <dl className="mt-10 flex flex-col gap-4 text-[0.9375rem]">
              <div>
                <dt className="text-canvas/45">Email</dt>
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-canvas/85 underline decoration-canvas/25 underline-offset-4 transition-colors hover:decoration-canvas"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-canvas/45">Support hours</dt>
                <dd className="text-canvas/85">{contact.supportHours}</dd>
              </div>
              <div>
                <dt className="text-canvas/45">Instagram</dt>
                <dd>
                  <a
                    href={contact.instagram.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-canvas/85 underline decoration-canvas/25 underline-offset-4 transition-colors hover:decoration-canvas"
                  >
                    {contact.instagram.handle}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* ---- bottom: legal ---- */}
        <div className="flex flex-col gap-5 border-t border-canvas/12 pt-8 text-sm text-canvas/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {brand.name}. Manufactured in India since {brand.foundedYear}.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-300 hover:text-canvas"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
