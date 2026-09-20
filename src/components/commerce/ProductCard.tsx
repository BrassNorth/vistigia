import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatINR, type Product } from "@/content/products";

/**
 * Product card: an inset image well on a raised tile, name and spec, then a
 * price/action row (after the Featured Products + dark sneaker-card refs).
 *
 * The second image cross-fades on hover. Pure CSS, no layout shift.
 */
export function ProductCard({
  product,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 78vw",
}: {
  product: Product;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const alt = product.images[1];
  const href = `/products/${product.handle}`;

  /* Only measurements the live store publishes. */
  const spec = [
    product.dimensionsCm ? `${product.dimensionsCm} cm` : null,
    product.capacityMl ? `${product.capacityMl} ml` : null,
    product.pieces ? `${product.pieces} pieces` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-[1.75rem] bg-canvas p-2.5 shadow-lg",
        className,
      )}
    >
      <Link href={href} className="relative block aspect-square overflow-hidden rounded-[1.3rem] bg-shell">
        <Image
          src={product.images[0]}
          alt={product.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]",
            alt && "group-hover:opacity-0",
          )}
        />
        {alt && (
          <Image
            src={alt}
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            className="scale-[1.04] object-cover opacity-0 transition-opacity duration-700 ease-[var(--ease-out-soft)] group-hover:opacity-100"
          />
        )}
        <span className="absolute top-3 left-3 bg-canvas/90 rounded-full px-3 py-1 text-[0.65rem] font-medium tracking-[0.16em] text-ink uppercase">
          {product.material}
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-3 pt-4 pb-2">
        <h3 className="font-display text-xl text-ink">
          <Link href={href}>{product.name}</Link>
        </h3>
        {spec && <p className="mt-1 text-sm text-ink-muted">{spec}</p>}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="font-display text-2xl text-ink">{formatINR(product.price)}</p>
          <Link
            href={href}
            aria-label={`Shop ${product.name}`}
            className="grid size-11 shrink-0 place-items-center rounded-2xl bg-ink text-canvas transition-[background-color,transform] duration-300 hover:bg-bronze-deep active:scale-95"
          >
            <svg viewBox="0 0 18 18" fill="none" className="size-[18px]" aria-hidden="true">
              <path
                d="M4.5 5.75h9l.75 8.75h-10.5l.75-8.75Zm2.25 0a2.25 2.25 0 0 1 4.5 0"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
