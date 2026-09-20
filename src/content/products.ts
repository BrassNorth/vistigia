/**
 * VESTIGIA — product catalogue.
 *
 * All 12 products and prices below came from the client's Shopify store; the
 * photography was pulled off their CDN once and now ships from public/media.
 * Nine of these are currently orphaned on the real site (reachable by URL but
 * in no collection); they are restored to a browsable structure here.
 *
 * `dimensionsCm` / `capacityMl` are parsed from the product titles — the only
 * place the live store records size. Everything marked `needsClientInput` is
 * a real content gap (no SKUs, weights or piece breakdowns exist today).
 * upgrade.md §13 requires these before launch.
 */

import { img as f } from "./site";

export type Product = {
  id: string;
  /** Live Shopify handle. Several do not match their title — see `handleMismatch`. */
  handle: string;
  title: string;
  /** Short display name, without the material/size suffix. */
  name: string;
  collection: "comporta" | "mati" | "other";
  category: "dinner-sets" | "plates" | "bowls" | "cups-and-mugs";
  material: "Melamine" | "Stoneware" | "Bone China" | "Porcelain";
  /** Rupees. */
  price: number;
  dimensionsCm?: number;
  capacityMl?: number;
  weightG?: number;
  pieces?: number;
  images: string[];
  alt: string;
  available: boolean;
  /** True where the live Shopify handle contradicts the product title. */
  handleMismatch?: boolean;
  /** Blocking content gaps before this can ship as a real PDP. */
  needsClientInput: string[];
  /** Kept out of merchandised surfaces pending a client decision. */
  flagged?: string;
};

/* Collection-level descriptions — verbatim from the live store.
   Each is currently duplicated across every SKU in the family; lifted to the
   collection where it belongs. upgrade.md §33. */

export const collections = {
  comporta: {
    slug: "comporta",
    name: "Comporta",
    material: "Melamine",
    tagline: "Coastal, shatter-resistant, built for outside",
    description:
      "Made from durable, food-grade melamine, each piece features hand-drawn green illustrations on a soft beige base, inspired by Comporta's coastal charm. Lightweight and shatter-resistant, it's perfect for both indoor and outdoor dining. Whether for everyday use or special occasions, Comporta brings a touch of timeless beauty to the table.",
    hero: f(
      "comporta-melamine-18-dinner_plates-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp",
    ),
    heroAlt:
      "Comporta 18-piece melamine dinner set with hand-drawn green illustrations on a beige base",
  },
  mati: {
    slug: "mati",
    name: "Mati",
    material: "Melamine",
    tagline: "Heirloom florals, reimagined in melamine",
    description:
      "The Mati Collection is a modern reimagination of the cherished tableware our grandmothers passed down with love and care. Inspired by timeless family traditions, each piece features delicate blue floral motifs and soft green leaves, echoing the beauty of hand-painted porcelain heirlooms. Crafted in durable, lightweight melamine, Mati brings heirloom charm into the present day.",
    hero: f(
      "mati-melamine-18-dinner_plates-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp",
    ),
    heroAlt:
      "Mati 18-piece melamine dinner set with delicate blue floral motifs and soft green leaves",
  },
} as const;

const NO_SPECS = [
  "SKU",
  "Weight",
  "Piece breakdown",
  "Care instructions",
  "Trade MOQ",
  "Case quantity",
  "Lead time",
];

export const products: Product[] = [
  /* ---------------- COMPORTA ---------------- */
  {
    id: "comporta-set-18",
    handle: "comporta-18-piece-dinner-set-melamine",
    title: "COMPORTA 18 PIECE DINNER SET | Melamine",
    name: "18-Piece Dinner Set",
    collection: "comporta",
    category: "dinner-sets",
    material: "Melamine",
    price: 3199,
    pieces: 18,
    images: [
      f("comporta-melamine-18-dinner_plates-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
      f("comporta-melamine-18-dinner_plates-unbreakable-set-vestigia.webp"),
      f("comporta-collection-multi-usepieces_appetizerplatesdoubleaslidsforbowls.webp"),
    ],
    alt: "Comporta 18-piece melamine dinner set laid on a table",
    available: true,
    needsClientInput: NO_SPECS,
  },
  {
    id: "comporta-dinner-plate",
    handle: "comporta-dinner-plate-melamine-size-0-cm",
    title: "COMPORTA DINNER PLATE | Melamine | Size 27 cm",
    name: "Dinner Plate",
    collection: "comporta",
    category: "plates",
    material: "Melamine",
    price: 300,
    dimensionsCm: 27,
    images: [
      f("comporta-melamine-dinner_plates-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
      f("comporta-melamine-dinner_set-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
    ],
    alt: "Comporta 27 cm melamine dinner plate with hand-drawn green illustration",
    available: true,
    needsClientInput: NO_SPECS,
  },
  {
    id: "comporta-dessert-plate",
    handle: "comporta-dessert-plate-melamine-size-0-cm",
    title: "COMPORTA DESSERT PLATE | Melamine | Size 20 cm",
    name: "Dessert Plate",
    collection: "comporta",
    category: "plates",
    material: "Melamine",
    price: 185,
    dimensionsCm: 20,
    images: [
      f("comporta-melamine-dessert_plates-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia_cb792640-7ab6-47bc-a1dc-4879aa4ff9a8.webp"),
      f("comporta-melamine-dessert_plates-unbreakable-detail-vestigia_17eb1a2a-7fb5-4611-8ba2-4b37146bb5a7.webp"),
    ],
    alt: "Comporta 20 cm melamine dessert plate",
    available: true,
    needsClientInput: NO_SPECS,
  },
  {
    id: "comporta-appetizer-plate",
    handle: "comporta-appetizer-plate-melamine-size-0-cm",
    title: "COMPORTA APPETIZER PLATE | Melamine | Size 16 cm",
    name: "Appetizer Plate",
    collection: "comporta",
    category: "plates",
    material: "Melamine",
    price: 190,
    dimensionsCm: 16,
    images: [
      f("comporta-melamine-appetizer-plate-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
      f("comporta-collection-multi-usepieces_appetizerplatesdoubleaslidsforbowls_30592ff5-85cc-4093-93cb-f0afbf43a3e6.webp"),
    ],
    alt: "Comporta 16 cm melamine appetizer plate, doubles as a bowl lid",
    available: true,
    needsClientInput: NO_SPECS,
  },
  {
    id: "comporta-serving-bowl",
    handle: "comporta-serving-bowl-melamine-size-0-cm",
    title: "COMPORTA SERVING BOWL | Melamine | Size 16 cm",
    name: "Serving Bowl",
    collection: "comporta",
    category: "bowls",
    material: "Melamine",
    price: 280,
    dimensionsCm: 16,
    images: [
      f("comporta-melamine-serving-bowl-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
      f("comporta-melamine-serving-bowl-with-lid-vestigia.webp"),
      f("comporta-melamine-serving-bowl-table-vestigia.webp"),
    ],
    alt: "Comporta 16 cm melamine serving bowl with matching lid",
    available: true,
    needsClientInput: NO_SPECS,
  },

  /* ---------------- MATI ---------------- */
  {
    id: "mati-set-18",
    handle: "mati-18-piece-dinner-set-melamine",
    title: "MATI 18 PIECE DINNER SET | Melamine",
    name: "18-Piece Dinner Set",
    collection: "mati",
    category: "dinner-sets",
    material: "Melamine",
    price: 2899,
    pieces: 18,
    images: [
      f("mati-melamine-18-dinner_plates-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
      f("mati-melamine-18-dinner_plates-unbreakable-set-vestigia.webp"),
      f("mati-collection-multi-usepieces_appetizerplatesdoubleaslidsforbowls_3fe16d5e-9603-4921-8549-066f6e832576.webp"),
    ],
    alt: "Mati 18-piece melamine dinner set with blue floral motifs",
    available: true,
    needsClientInput: NO_SPECS,
  },
  {
    id: "mati-dinner-plate",
    handle: "mati-dinner-plates",
    title: "MATI DINNER PLATE | Melamine | Size 27 cm",
    name: "Dinner Plate",
    collection: "mati",
    category: "plates",
    material: "Melamine",
    price: 300,
    dimensionsCm: 27,
    images: [
      f("mati-melamine-dinner_plates-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
      f("mati-melamine-dinner_set-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
    ],
    alt: "Mati 27 cm melamine dinner plate with blue floral motif",
    available: true,
    needsClientInput: NO_SPECS,
  },
  {
    id: "mati-dessert-plate",
    handle: "mati-dessert-plates",
    title: "MATI DESSERT PLATE | Melamine | Size 20 cm",
    name: "Dessert Plate",
    collection: "mati",
    category: "plates",
    material: "Melamine",
    price: 185,
    dimensionsCm: 20,
    images: [
      f("mati-melamine-dessert_plates-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
      f("mati-melamine-dessert_plates-unbreakable-food-grade-vestigia.webp"),
    ],
    alt: "Mati 20 cm melamine dessert plate",
    available: true,
    needsClientInput: NO_SPECS,
  },
  {
    id: "mati-appetizer-plate",
    handle: "mati-appetizer-plates",
    title: "MATI APPETIZER PLATE | Melamine | Size 16 cm",
    name: "Appetizer Plate",
    collection: "mati",
    category: "plates",
    material: "Melamine",
    price: 190,
    dimensionsCm: 16,
    images: [
      f("mati-melamine-appetizer-plate-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia_27ad8d5d-b36a-415b-88b9-94b960314fc8.webp"),
      f("mati-collection-multi-usepieces_appetizerplatesdoubleaslidsforbowls.webp"),
    ],
    alt: "Mati 16 cm melamine appetizer plate",
    available: true,
    needsClientInput: NO_SPECS,
  },
  {
    id: "mati-serving-bowl",
    handle: "mati-serving-bowl",
    title: "MATI SERVING BOWL | Melamine | Size 16 cm",
    name: "Serving Bowl",
    collection: "mati",
    category: "bowls",
    material: "Melamine",
    price: 280,
    dimensionsCm: 16,
    images: [
      f("mati-melamine-serving-bowl-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
      f("mati-melamine-serving-bowl-with-lid-vestigia.webp"),
    ],
    alt: "Mati 16 cm melamine serving bowl with lid",
    available: true,
    needsClientInput: NO_SPECS,
  },
  {
    id: "mati-small-bowl",
    // Lives at the *Comporta* handle on the live store.
    handle: "comporta-small-bowl-melamine-size-0-cm",
    title: "MATI SMALL BOWL | Melamine | Size 10 cm",
    name: "Small Bowl",
    collection: "mati",
    category: "bowls",
    material: "Melamine",
    price: 150,
    dimensionsCm: 10,
    images: [
      f("mati-melamine-vegetable-bowl-unbreakable-outdoor-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
      f("mati-melamine-vegetable-bowl-unbreakable-dinnerware-food-grade-rv-dishes-set-vestigia.webp"),
    ],
    alt: "Mati 10 cm melamine small bowl",
    available: true,
    handleMismatch: true,
    needsClientInput: NO_SPECS,
  },

  /* ---------------- OTHER ---------------- */
  {
    id: "juice-mug",
    // Lives at the *Mati small bowl* handle on the live store.
    handle: "mati-small-bowl",
    title: "BAD BITCH JUICE MUG | Stoneware | 390 ml",
    name: "Juice Mug",
    collection: "other",
    category: "cups-and-mugs",
    material: "Stoneware",
    price: 555,
    capacityMl: 390,
    weightG: 500,
    images: [f("IMG_7086_955407dd-b10c-4ad4-841f-c00184888b98.webp")],
    alt: "Stoneware juice mug in warm off-white with a semi-matte glaze, 390 ml",
    available: false,
    handleMismatch: true,
    needsClientInput: ["SKU", "Dimensions", "Care instructions", "Restock date"],
    flagged:
      "Product name is off-brand against the 'heirloom, memory, care' positioning used everywhere else, and the item is sold out. Withheld from merchandised surfaces pending a client decision on renaming or retiring it.",
  },
];

/* ------------------------------------------------------------------ *
 * SELECTORS
 * ------------------------------------------------------------------ */

/** Products safe to merchandise: in stock and not flagged for review. */
export const shoppable = products.filter((p) => p.available && !p.flagged);

export const byCollection = (slug: "comporta" | "mati") =>
  products.filter((p) => p.collection === slug && !p.flagged);

/** "Build the table" — a full place setting from one collection. upgrade.md §18. */
export const buildTheTable = (slug: "comporta" | "mati") =>
  byCollection(slug).filter((p) => p.category !== "dinner-sets");

export const formatINR = (rupees: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);

/** Sum of the individual pieces in a place setting, for set-value messaging. */
export const piecesValue = (slug: "comporta" | "mati") =>
  buildTheTable(slug).reduce((sum, p) => sum + p.price, 0);
