import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/* tailwind-merge doesn't know our custom --text-* sizes from globals.css, so
   it read `text-display` as a colour and dropped it whenever `text-ink` (a
   real colour) followed. Registering them as font sizes keeps both. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["hero", "display", "title", "heading", "eyebrow", "lede", "mega"] }],
    },
  },
});

/** Merge conditional classes, with later Tailwind utilities winning conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
