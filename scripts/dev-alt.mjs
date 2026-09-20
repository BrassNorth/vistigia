/**
 * Starts an ADDITIONAL `next dev` server alongside any already running.
 *
 * next dev takes an exclusive lock on `<distDir>/lock`, so a second instance in
 * the same directory is refused. This points it at `.next-alt` (see `distDir`
 * in next.config.ts), giving it its own lock and its own build output.
 *
 * The dist dir is fixed rather than derived from the port on purpose: next dev
 * permanently appends an `include` entry to tsconfig.json for whatever dist dir
 * it sees, so a per-port name would grow that file on every new port. One extra
 * server is all this is for.
 *
 * Exists as a script rather than an inline env var because `VAR=x cmd` is bash
 * syntax and this project gets driven from PowerShell.
 *
 *   npm run dev:alt            → port 3001
 *   npm run dev:alt -- 3002    → port 3002
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const port = process.argv[2] ?? "3001";

if (!/^\d{2,5}$/.test(port)) {
  console.error(`Invalid port: ${port}`);
  process.exit(1);
}

// Resolve Next's CLI and run it under this Node binary. Avoids `shell: true`,
// which triggers a deprecation warning and would need escaping on Windows.
const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");

const child = spawn(process.execPath, [nextBin, "dev", "-p", port], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_DIST_DIR: ".next-alt",
    // This machine has NODE_ENV=production set globally, which next dev warns
    // about and which silently skipped devDependencies on install.
    NODE_ENV: "development",
  },
});

child.on("exit", (code) => process.exit(code ?? 0));
