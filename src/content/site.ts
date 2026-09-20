/**
 * VESTIGIA — canonical content layer.
 *
 * Everything here is either (a) verbatim copy scraped from vestigia.world,
 * (b) copy written to the direction in docs/upgrade.md, or (c) explicitly
 * flagged as UNVERIFIED and awaiting client confirmation.
 *
 * upgrade.md §16/§35/§38 are emphatic: no invented testimonials, logos,
 * certifications or metrics. Anything not confirmed by the client is marked
 * with `verified: false` and must not ship to production as fact.
 */

/**
 * All media is served from this repo, not the Shopify CDN — the deploy has no
 * third-party origin to go down on it, and next/image can only optimise files
 * it owns. Stills were pulled from Shopify once and re-encoded to WebP capped
 * at 2000px (48 files, ~2 MB total, down from ~6.6 MB of JPEG).
 */
export const MEDIA = "/media";

export const img = (file: string) => `${MEDIA}/${file}`;

/* ------------------------------------------------------------------ *
 * BRAND
 * ------------------------------------------------------------------ */

export const brand = {
  name: "Vestigia",
  /** Verbatim from the live site. */
  tagline: "Traces of tableware",
  /** Hero headline — upgrade.md §3. */
  headline: {
    serif: "Tableware, designed for",
    sans: "the way the world dines.",
  },
  /** upgrade.md §3 supporting copy. */
  lede: "Premium tableware engineered for hospitality, retail, outdoor living and private-label collections — designed in India, manufactured for the world.",
  /** Verbatim — "A note from Vestigia", appears on home + about. */
  note: "We believe that every meal leaves a trace of memory, of connection, of care. Our tableware is designed to honor those quiet moments and shared rituals that shape our days. With thoughtful craftsmanship and timeless forms, we create pieces that invite you to slow down, gather, and leave behind something meaningful.",
  foundedYear: 1984,
} as const;

/* ------------------------------------------------------------------ *
 * HERITAGE — verbatim from /pages/about
 * ------------------------------------------------------------------ */

export const heritage = {
  eyebrow: "Since 1984",
  title: "Producing tableware since 1984",
  body: [
    "The journey of Vestigia is deeply traced by a family legacy of craftsmanship and innovation. It began in 1984 with the establishment of Mehra Industries. A family company, who transformed its printing expertise into the art of tableware design. By pioneering at the time, the transfer of patterns into tableware, creating a fusion of art and functionality that would define Mehra Industries heritage.",
    "Over the decades, Mehra Industries gained recognition for its exquisite tableware, known for their luxury and durability. Today, as the third generation, we honor this legacy with Vestigia, a sister company that blends timeless tradition with modern innovation.",
  ],
  image: img("producing-tableware-since-1984-made-in-india-vestigia.webp"),
  imageAlt:
    "Vestigia tableware in production at the Mehra Industries facility, established 1984",
} as const;

/* ------------------------------------------------------------------ *
 * TRUST METRICS — upgrade.md §35
 * Every figure below is stated on the client's own live site today.
 * ------------------------------------------------------------------ */

export const metrics = [
  {
    value: 1984,
    display: "1984",
    label: "Manufacturing since",
    detail: "Third-generation family business",
    countTo: null,
  },
  {
    value: 200,
    display: "200+",
    label: "Molds in production",
    detail: "Fine dining to rustic gatherings",
    countTo: 200,
  },
  {
    value: 200,
    display: "200+",
    label: "Skilled employees",
    detail: "The backbone of our operations",
    countTo: 200,
  },
  {
    value: 2500,
    display: "2,500",
    label: "Sqm of production",
    detail: "Over 30 machines across three units",
    countTo: 2500,
  },
] as const;

/** Header trust strip — upgrade.md §3. */
export const trustStrip = [
  "40+ years of manufacturing",
  "200+ molds",
  "Custom development",
  "Global shipping",
  "Retail & hospitality programs",
] as const;

/* ------------------------------------------------------------------ *
 * FACTORY UNITS — verbatim from /pages/about
 * ------------------------------------------------------------------ */

export const units = [
  { name: "Melamine Unit", since: "Operational since 1984" },
  { name: "Bone China Unit", since: "Established in 2000" },
  { name: "Porcelain Unit", since: "Partnering since 2024" },
] as const;

/* ------------------------------------------------------------------ *
 * MATERIALS — verbatim spec cards from /pages/our-materials
 * NOTE: the live site mislabels slides 2–3 (Porcelain/Melamine headings
 * over Bone China body copy). Corrected here.
 * ------------------------------------------------------------------ */

export type Material = {
  slug: string;
  name: string;
  material: string;
  appearance: string;
  durability: string;
  usage: string;
  microwaveSafe: boolean | string;
  dishwasherSafe: boolean | string;
  image: string;
  imageAlt: string;
};

export const materials: Material[] = [
  {
    slug: "bone-china",
    name: "Bone China",
    material: "Made from a mix of bone ash, kaolin, and feldspar.",
    appearance: "Translucent, lightweight with a delicate, luxurious look.",
    durability: "Strong and durable.",
    usage:
      "Ideal for formal dining, high-end restaurants, and special occasions.",
    microwaveSafe: true,
    dishwasherSafe: true,
    image: img(
      "ripple-texture-gold-line-luxury-tableware-for-hotelware-bone-china-vestigia.webp",
    ),
    imageAlt:
      "Ripple bone china serveware with a gold rim line, made in-house by Vestigia",
  },
  {
    slug: "porcelain",
    name: "Porcelain",
    material: "Made from refined clay and fired at high temperatures.",
    appearance: "White, smooth, often with a glossy finish.",
    durability: "Very durable, chip-resistant.",
    usage: "Versatile for both everyday and professional settings.",
    microwaveSafe: true,
    dishwasherSafe: true,
    image: img("jade-green-porcelain-cup-and-saucer-vestigia.webp"),
    imageAlt: "Jade green porcelain cup and saucer by Vestigia",
  },
  {
    slug: "melamine",
    name: "Melamine",
    material: "Durable plastic resin, not ceramic.",
    appearance: "Matte or glossy finish, available in various colors.",
    durability: "Shatterproof and lightweight.",
    usage: "Great for casual dining, outdoor use, and high-traffic settings.",
    microwaveSafe: false,
    dishwasherSafe: "Yes — top rack recommended",
    image: img(
      "comporta-melamine-plates-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp",
    ),
    imageAlt:
      "Comporta shatter-resistant melamine plates for outdoor and high-traffic dining",
  },
];

/** Verbatim from /pages/our-materials */
export const materialsIntro = {
  eyebrow: "Materials matter",
  title: "From raw material to finished form",
  body: "We take pride in our ability to produce Fine Bone China and Melamine entirely in-house. This vertical integration gives us full control over quality, design, and production, ensuring every piece meets our high standards of durability and elegance. Our Porcelain is locally sourced from trusted partners, adding another layer of care to the materials we offer.",
} as const;

/* ------------------------------------------------------------------ *
 * DESIGN LIBRARY
 * These named designs appear as photography on the live site but have no
 * pages or products behind them. Surfaced here as a design archive —
 * deliberately framed as "available to develop", not as buyable SKUs.
 * ------------------------------------------------------------------ */

export const designs = [
  {
    name: "Ripple",
    material: "Bone China",
    note: "Textured body, gold rim",
    image: img(
      "ripple-bone-china-dinnerware-textured-gold-edge-set-vestigia.webp",
    ),
  },
  {
    name: "Atlantic",
    material: "Bone China",
    note: "Blue and silver banding",
    image: img("atlantic-blue-silver-tableware-bone-china-vestigia.webp"),
  },
  {
    name: "Dandelion",
    material: "Bone China",
    note: "Blue watercolour, tea service",
    image: img(
      "dandelion-blue-watercolour-cup-tea-set-bone-china-vestigia.webp",
    ),
  },
  {
    name: "Mona",
    material: "Bone China",
    note: "Silver line, hotelware serveware",
    image: img(
      "mona-silver-line-luxury-tableware-for-hotelware-donga-servingware-bone-china-vestigia.webp",
    ),
  },
  {
    name: "Primavera",
    material: "Bone China",
    note: "Green brush effect, silver edge",
    image: img(
      "primavera-green-brush-effect-bowl-silver-edge-tableware-bone-china-vestigia.webp",
    ),
  },
  {
    name: "Jade",
    material: "Porcelain",
    note: "Colour-effect glaze, gift-ready",
    image: img(
      "jade-green-colour-effect-dinnerware-set-modern-gift-ready-porcelain-vestigia.webp",
    ),
  },
  {
    name: "Baku",
    material: "Bone China",
    note: "Full dinnerware service",
    image: img(
      "baku-dinnerware-set-producing-tableware-since-1984-made-in-india-vestigia.webp",
    ),
  },
] as const;

/* ------------------------------------------------------------------ *
 * CATEGORIES — verbatim list from the homepage "All ready to be customized"
 * ------------------------------------------------------------------ */

export const categories = [
  {
    name: "Dinner sets",
    image: img("comporta-dinnerware-set-modern-melamine-Vestigia.webp"),
    alt: "Comporta modern melamine dinnerware set",
  },
  {
    name: "Servingware",
    image: img("gourmet-plates-bowls-bone-china-vestigia.webp"),
    alt: "Gourmet bone china plates and bowls",
  },
  {
    name: "Cups & mugs",
    image: img("porcelain-cup-saucer-bulk-order-besboke-vestigia.webp"),
    alt: "Porcelain cup and saucer available for bulk and bespoke orders",
  },
  {
    name: "Tea sets",
    image: img("tea-sets-bone-china-vestigia.webp"),
    alt: "Bone china tea sets",
  },
  {
    name: "Trays",
    image: img("food-storage-trays-pepper-salt-bone-china-vestigia.webp"),
    alt: "Bone china trays with salt and pepper service",
  },
  {
    name: "Food storage",
    image: img("melamine-set-bulk-order-besboke-vestigia.webp"),
    alt: "Melamine food storage set for bulk orders",
  },
] as const;

/* ------------------------------------------------------------------ *
 * MANUFACTURING PROCESS — upgrade.md §5 / §34
 * ------------------------------------------------------------------ */

export const process = [
  {
    step: "01",
    name: "Concept",
    body: "Brief, references and commercial targets translated into a design direction.",
  },
  {
    step: "02",
    name: "Material",
    body: "Bone china, porcelain or melamine selected against use case, durability and price point.",
  },
  {
    step: "03",
    name: "Mold",
    body: "Drawn from a library of over 200 molds, or developed new for exclusive shapes.",
  },
  {
    step: "04",
    name: "Sampling",
    body: "Physical samples produced for approval before any production run is committed.",
  },
  {
    step: "05",
    name: "Production",
    body: "Three units across 2,500 sqm, equipped with over 30 machines.",
  },
  {
    step: "06",
    name: "Quality",
    body: "Hands-on inspection plus process-driven testing for colour, weight, thickness and finish.",
  },
  {
    step: "07",
    name: "Packaging",
    body: "Protective packing by case or pallet, with custom and branded options available.",
  },
  {
    step: "08",
    name: "Dispatch",
    body: "Coordinated logistics with tracking from dispatch through delivery.",
  },
] as const;

/* ------------------------------------------------------------------ *
 * CAPABILITY PILLARS — condensed from the live homepage carousel
 * ------------------------------------------------------------------ */

export const pillars = [
  {
    title: "Built for repeat",
    body: "Whether you're placing a first-time bulk order or planning for steady restocks, our production capacity and inventory planning ensure consistent supply without compromising on quality. Our focus is on reliability, lead-time transparency, and long-term partnerships.",
    image: img("in-house-production-tableware-factory-melamine-bone-china-vestigia.webp"),
    alt: "In-house tableware production line for melamine and bone china",
  },
  {
    title: "Quality control at every stage",
    body: "From raw materials to final packaging, each product undergoes strict quality checks for durability, finish, and food safety. We combine hands-on inspection with process-driven testing to guarantee consistency in colour, weight, thickness and performance.",
    image: img("tableware-quality-inspection-bone-china-porcelain-melamine-vestigia.webp"),
    alt: "Quality inspection of bone china, porcelain and melamine tableware",
  },
  {
    title: "Global shipping",
    body: "From careful packing to coordinated logistics, our shipping process is built to support retail needs — ensuring consistency, safety, and on-time delivery, order after order.",
    image: img("bespoke-tableware-bowl-global-distribution-vestigia.webp"),
    alt: "Bespoke Vestigia bowl prepared for global distribution",
  },
  {
    title: "Behind every piece",
    body: "A team of over 200 skilled employees. Our team is the backbone of our operations, and we are committed to fostering a positive and supportive work environment.",
    image: img("team-hand-crafted-production-quality-control-vestigia.webp"),
    alt: "Vestigia production team hand-finishing and inspecting tableware",
  },
] as const;

/* ------------------------------------------------------------------ *
 * B2B — upgrade.md §6, §63
 * ------------------------------------------------------------------ */

export const buyerTypes = [
  {
    slug: "retailers",
    name: "Retailers",
    body: "Assortment planning, flexible MOQs, retail-ready packaging and replenishment you can forecast against.",
    points: ["Assortment planning", "MOQ flexibility", "Private label", "Product exclusivity"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    body: "Hotels, resorts, restaurants and cafés — specified for daily service, breakage economics and repeat procurement.",
    points: ["Hotels & resorts", "Restaurants & cafés", "Outdoor service", "Repeat procurement"],
  },
  {
    slug: "distributors",
    name: "Distributors",
    body: "Volume pricing, catalogue breadth and territory support across the bone china, porcelain and melamine ranges.",
    points: ["Volume pricing", "Catalogue breadth", "Territory support", "Simple reordering"],
  },
  {
    slug: "private-label",
    name: "Private label",
    body: "Your brand, our factory. Custom shapes, decoration, packaging and unboxing developed end to end.",
    points: ["Custom development", "Branded packaging", "Production capacity", "Quality control"],
  },
] as const;

export const b2bBlock = {
  eyebrow: "Built for buyers",
  title: "From one collection to full-scale production.",
  body: "Vestigia works with retailers, hospitality groups, designers and distributors to develop and manufacture tableware collections at commercial scale.",
  primaryCta: { label: "Start a project", href: "/trade/quote" },
  secondaryCta: { label: "Download trade catalogue", href: "/trade/catalogue" },
  image: img(
    "bulk-and-bespoke-minimum-order-quantities-bone-china-melamine-porcelain-vestigia.webp",
  ),
  alt: "Bone china, melamine and porcelain tableware arranged for a bulk and bespoke order",
} as const;

/* ------------------------------------------------------------------ *
 * NAVIGATION — upgrade.md §2
 * ------------------------------------------------------------------ */

export type NavLink = { label: string; href: string; note?: string };
export type NavGroup = { label: string; href: string; links: NavLink[] };

export const nav: NavGroup[] = [
  {
    label: "Shop",
    href: "/collections",
    links: [
      { label: "All products", href: "/collections/all" },
      { label: "Comporta", href: "/collections/comporta", note: "Melamine" },
      { label: "Mati", href: "/collections/mati", note: "Melamine" },
      { label: "Dinner sets", href: "/collections/dinner-sets" },
      { label: "Plates", href: "/collections/plates" },
      { label: "Bowls", href: "/collections/bowls" },
      { label: "Cups & mugs", href: "/collections/cups-and-mugs" },
    ],
  },
  {
    label: "Trade",
    href: "/trade",
    links: [
      { label: "For retailers", href: "/trade/retailers" },
      { label: "Hospitality", href: "/trade/hospitality" },
      { label: "Distributors", href: "/trade/distributors" },
      { label: "Custom & private label", href: "/trade/private-label" },
      { label: "Request a quote", href: "/trade/quote" },
      { label: "Request samples", href: "/trade/samples" },
    ],
  },
  {
    label: "Explore",
    href: "/about",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Materials", href: "/materials" },
      { label: "Designs", href: "/designs" },
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
];

/**
 * Footer columns — upgrade.md §45.
 * Shop and Trade reuse the header groups so the two can never drift apart.
 */
export const footerNav: NavGroup[] = [
  { label: "Shop", href: "/collections", links: nav[0].links.slice(0, 5) },
  { label: "Trade", href: "/trade", links: nav[1].links },
  {
    label: "Company",
    href: "/about",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Materials", href: "/materials" },
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "Designs", href: "/designs" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    label: "Support",
    href: "/contact",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/policies/shipping" },
      { label: "Returns & refunds", href: "/policies/refund" },
      { label: "Care & use", href: "/care" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "/policies/privacy" },
  { label: "Terms of service", href: "/policies/terms" },
  { label: "Refund policy", href: "/policies/refund" },
  { label: "Shipping policy", href: "/policies/shipping" },
];

/* ------------------------------------------------------------------ *
 * CONTACT — everything verified on the live site.
 * ------------------------------------------------------------------ */

export const contact = {
  /** The only contact address published anywhere on the current site. */
  email: "vestigia.work@gmail.com",
  supportHours: "Monday – Saturday, 10 AM – 6 PM (IST)",
  instagram: {
    handle: "@vestigia.world",
    url: "https://www.instagram.com/vestigia.world",
  },
  /**
   * The live site's LinkedIn link points at a private admin dashboard URL
   * and errors for visitors. Public company URL needed from the client.
   */
  linkedin: { url: null as string | null, verified: false },
  /** Not published anywhere on the current site. */
  phone: { value: null as string | null, verified: false },
  whatsapp: { value: null as string | null, verified: false },
  address: { value: null as string | null, verified: false },
  companyProfilePdf: `${MEDIA}/Vestigia_Traces_of_Tableware_Company_profile.pdf`,
} as const;

/* ------------------------------------------------------------------ *
 * MEDIA
 * ------------------------------------------------------------------ */

export const media = {
  heroVideo: `${MEDIA}/vestigia-hero.mp4`,
  heroPoster: img("comporta-dinnerware-set-modern-melamine-Vestigia.webp"),
  aboutVideo: `${MEDIA}/vestigia-atelier.mp4`,
} as const;
