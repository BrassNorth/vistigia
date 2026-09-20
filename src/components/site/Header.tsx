"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { nav, brand } from "@/content/site";

/* ---------------- icons (inline — avoids an icon-library dependency) ------- */

const Icon = {
  search: (
    <path
      d="M11.5 11.5 15 15m-1.5-6.25a4.75 4.75 0 1 1-9.5 0 4.75 4.75 0 0 1 9.5 0Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  ),
  heart: (
    <path
      d="M9 14.5S3.25 11.2 3.25 7.15A2.9 2.9 0 0 1 9 5.9a2.9 2.9 0 0 1 5.75 1.25C14.75 11.2 9 14.5 9 14.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
  bag: (
    <path
      d="M4.5 5.75h9l.75 8.75h-10.5l.75-8.75Zm2.25 0a2.25 2.25 0 0 1 4.5 0"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
};

function IconButton({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid size-10 place-items-center rounded-full transition-colors duration-300 hover:bg-current/10"
    >
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        {children}
      </svg>
    </Link>
  );
}

/** Two bars that morph into a cross — the state change is the feedback. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-3 w-5">
      <span
        className={cn(
          "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-soft)]",
          open ? "top-1.5 rotate-45" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-soft)]",
          open ? "top-1.5 -rotate-45" : "top-3",
        )}
      />
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* One ScrollTrigger drives both states: glass bar once past the top,
     tucked away while reading down, back the moment you scroll up. */
  useGSAP(() => {
    setScrolled(window.scrollY > 24);
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        setScrolled(y > 24);
        setHidden(self.direction === 1 && y > 240);
      },
    });
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenGroup(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* The header floats over the homepage's full-bleed video. Other routes have
     no dark hero, so they get the glass bar from the start plus a spacer. */
  const overDarkHero = pathname === "/";
  const glass = !mobileOpen && (!overDarkHero || scrolled || openGroup !== null);
  const tucked = hidden && !mobileOpen && openGroup === null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,padding] duration-700 ease-[var(--ease-out-soft)]",
          glass ? "px-3 pt-3 sm:px-5" : "px-0 pt-0",
          tucked && "-translate-y-[130%]",
        )}
        onMouseLeave={() => setOpenGroup(null)}
      >
        <div
          className={cn(
            "mx-auto flex w-full items-center gap-4 transition-[background-color,border-radius,color,max-width,height,box-shadow] duration-700 ease-[var(--ease-out-soft)]",
            glass
              ? "glass-light h-16 max-w-[100rem] rounded-full px-3 pl-6 text-ink"
              : "h-20 max-w-[104rem] px-5 text-canvas sm:px-8 lg:px-12",
          )}
        >
          {/* Desktop nav: small, wide-tracked, left — the FORME register */}
          <nav aria-label="Primary" className="hidden flex-1 items-center gap-7 lg:flex">
            {nav.map((group) => (
              <div key={group.label} onMouseEnter={() => setOpenGroup(group.label)}>
                <Link
                  href={group.href}
                  aria-expanded={openGroup === group.label}
                  onFocus={() => setOpenGroup(group.label)}
                  className="group relative py-2 text-[0.72rem] font-medium tracking-[0.22em] uppercase"
                >
                  {group.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-0.5 h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-out-soft)]",
                      openGroup === group.label ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              </div>
            ))}
          </nav>

          {/* Wordmark. Negative right margin cancels the trailing tracking so
              the letters, not the box, are what sits on centre. */}
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="mr-[-0.45em] font-display text-lg tracking-[0.45em] uppercase sm:text-xl lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            {brand.name}
          </Link>

          <div className="ml-auto flex items-center gap-1 lg:flex-1 lg:justify-end">
            <div className="hidden items-center sm:flex">
              <IconButton label="Search" href="/search">
                {Icon.search}
              </IconButton>
              <IconButton label="Wishlist" href="/wishlist">
                {Icon.heart}
              </IconButton>
              <IconButton label="Cart" href="/cart">
                {Icon.bag}
              </IconButton>
            </div>

            {/* upgrade.md §2: the trade CTA is permanently exposed. */}
            <Link
              href="/trade/quote"
              className={cn(
                "ml-2 hidden h-10 items-center rounded-full px-5 text-[0.72rem] font-medium tracking-[0.18em] uppercase transition-colors duration-300 md:inline-flex",
                glass
                  ? "bg-trade text-canvas hover:bg-trade-deep"
                  : "border border-canvas/35 hover:bg-canvas hover:text-ink",
              )}
            >
              Request a quote
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full lg:hidden"
            >
              <MenuGlyph open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* ---------------- desktop mega panel ---------------- */}
        {nav.map((group) => (
          <div
            key={group.label}
            hidden={openGroup !== group.label}
            className="mx-auto mt-2 hidden max-w-[100rem] animate-fade-up lg:block"
          >
            <div className="glass-light rounded-[2rem] px-10 py-9 text-ink">
              <ul className="grid grid-cols-4 gap-x-10 gap-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpenGroup(null)}
                      className="group flex items-baseline justify-between gap-3 border-b border-stone/70 py-3"
                    >
                      <span className="font-display text-xl transition-colors duration-300 group-hover:text-bronze-deep">
                        {link.label}
                      </span>
                      {link.note && (
                        <span className="text-[0.65rem] tracking-[0.2em] text-ink-muted uppercase">
                          {link.note}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </header>

      {/* ---------------- mobile menu: full-screen curtain ---------------- */}
      <div
        id="mobile-menu"
        inert={!mobileOpen}
        className={cn(
          "fixed inset-0 z-40 overflow-y-auto bg-charcoal text-canvas transition-[clip-path] duration-700 ease-[var(--ease-in-out-soft)] lg:hidden",
          mobileOpen ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]",
        )}
      >
        <nav aria-label="Mobile" className="flex min-h-full flex-col px-5 pt-28 pb-10 sm:px-8">
          <ul className="flex flex-col gap-8">
            {nav.map((group, i) => (
              <li
                key={group.label}
                style={{ transitionDelay: mobileOpen ? `${200 + i * 70}ms` : "0ms" }}
                className={cn(
                  "transition-[transform,opacity] duration-700 ease-[var(--ease-out-soft)]",
                  mobileOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                )}
              >
                <Link
                  href={group.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-condensed text-6xl tracking-tight uppercase"
                >
                  {group.label}
                </Link>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        // 44px tap target.
                        className="inline-flex h-11 items-center rounded-full border border-canvas/20 px-4 text-sm text-canvas/85"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-12">
            <Link
              href="/trade/quote"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-14 items-center justify-center rounded-full bg-trade text-sm font-medium tracking-[0.18em] uppercase"
            >
              Request a quote
            </Link>
            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-14 items-center justify-center rounded-full border border-canvas/25 text-sm font-medium tracking-[0.18em] uppercase"
            >
              Search
            </Link>
          </div>
        </nav>
      </div>

      {/* Fixed header takes no space; pages without a full-bleed hero need it back. */}
      {!overDarkHero && <div aria-hidden="true" className="h-22" />}
    </>
  );
}
