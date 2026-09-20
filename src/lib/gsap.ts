"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/* Register once; every animated leaf imports from here. */
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Scroll choreography runs only when the user hasn't asked for less motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
