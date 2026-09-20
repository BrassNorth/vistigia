"use client";

import { useState } from "react";

/**
 * TODO(client): no mailing-list provider is connected yet. The current
 * Shopify theme has no newsletter integration either, so there is nothing to
 * port. Point `action` at Klaviyo / Mailchimp / Shopify Customer accounts and
 * delete the local success branch below.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setState("done");
      }}
      className="w-full max-w-md"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      <div className="flex items-center gap-2 border-b border-canvas/25 pb-3 transition-colors duration-300 focus-within:border-canvas/60">
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent text-[0.9375rem] text-canvas placeholder:text-canvas/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-canvas/10 text-canvas transition-all duration-300 ease-[var(--ease-out-soft)] hover:bg-canvas/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas"
        >
          <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
            <path
              d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <p aria-live="polite" className="mt-3 text-sm text-canvas/55">
        {state === "done"
          ? "Thank you — we'll be in touch."
          : "New collections, material notes and trade updates. No more than monthly."}
      </p>
    </form>
  );
}
