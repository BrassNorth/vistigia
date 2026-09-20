import type { Metadata, Viewport } from "next";
import { Anton, Geist, Gilda_Display } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { brand, contact, media } from "@/content/site";

/* Condensed poster display — hero and section statements only. */
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

/* High-contrast didone for titles and product names. Single weight by design. */
const gilda = Gilda_Display({
  variable: "--font-gilda",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

/* Absolute URLs in metadata (OG images, canonicals) have to resolve against
   the origin actually serving this build. Production keeps the real domain;
   Vercel previews use their own URL so OG images don't 404 against a domain
   that isn't hosting this site yet. */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://vestigia.world");

const description =
  "Premium tableware engineered for hospitality, retail and private-label collections. Bone china, porcelain and melamine manufactured in-house in India since 1984 — 200+ molds, custom development, global shipping.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vestigia — Premium tableware manufacturer since 1984",
    // upgrade.md §40: every page gets a unique, non-duplicated title.
    template: "%s — Vestigia",
  },
  description,
  applicationName: brand.name,
  alternates: { canonical: "/" },
  keywords: [
    "hospitality tableware manufacturer",
    "custom tableware manufacturer India",
    "private label tableware",
    "wholesale tableware India",
    "bone china manufacturer",
    "premium melamine tableware",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: brand.name,
    title: "Vestigia — Premium tableware manufacturer since 1984",
    description,
    images: [{ url: media.heroPoster, width: 1200, height: 630, alt: brand.tagline }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vestigia — Premium tableware manufacturer since 1984",
    description,
    images: [media.heroPoster],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  colorScheme: "light",
};

/* upgrade.md §40: Organization structured data. Only fields Vestigia has
   actually published are emitted — no invented address, phone or rating. */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: SITE_URL,
  slogan: brand.tagline,
  foundingDate: "1984",
  description,
  email: contact.email,
  sameAs: [contact.instagram.url],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${gilda.variable} ${geist.variable} h-full antialiased`}
    >
      {/* Browser extensions stamp attributes on <body> (e.g. style="margin-top:0px")
          before React hydrates. Suppression is one level deep: body's own
          attributes only, children are still checked. */}
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-canvas text-ink">
        <a
          href="#main"
          className="sr-only-focusable absolute top-4 left-4 z-100 rounded-sm bg-ink px-4 py-2 text-sm text-canvas"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
