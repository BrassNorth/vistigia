import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next dev takes an exclusive lock on `<distDir>/lock`, so a second instance
  // in this directory is refused. Overriding the dist dir gives that instance
  // its own lock and its own build output, letting two run side by side:
  //   NEXT_DIST_DIR=.next-alt npm run dev -- -p 3001
  distDir: process.env.NEXT_DIST_DIR ?? ".next",

  images: {
    // Every asset now lives in public/media, so there is no remote origin to
    // allow — next/image derives AVIF/WebP variants from the local WebP
    // masters at build/request time.
    formats: ["image/avif", "image/webp"],
    // Matches the breakpoints the layout actually uses — avoids Next
    // generating a dozen unused variants per image.
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
};

export default nextConfig;
