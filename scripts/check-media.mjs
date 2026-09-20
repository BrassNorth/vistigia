/**
 * Fails if the content layer points at a file that isn't in public/media, or
 * if public/media carries a file nothing references.
 *
 * Media paths are plain strings, so nothing else in the toolchain catches a
 * typo — a wrong name is a silent 404 in production. Run: npm run check:media
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MEDIA = path.join(ROOT, "public/media");

const sources = ["src/content/site.ts", "src/content/products.ts"];
const content = (
  await Promise.all(sources.map((f) => readFile(path.join(ROOT, f), "utf8")))
).join("\n");

/* Filenames reach the browser two ways: through img()/f() as a bare name, and
   inside a `${MEDIA}/...` template literal for the video and PDF. */
const referenced = new Set([
  ...[...content.matchAll(/"([^"/]+\.[a-z0-9]{2,5})"/gi)].map((m) => m[1]),
  ...[...content.matchAll(/\$\{MEDIA\}\/([^`]+)/g)].map((m) => m[1]),
].filter((n) => /\.(webp|png|jpe?g|gif|svg|mp4|webm|pdf)$/i.test(n)));

const onDisk = new Set(await readdir(MEDIA));

const missing = [...referenced].filter((n) => !onDisk.has(n)).sort();
const orphaned = [...onDisk].filter((n) => !referenced.has(n)).sort();

for (const n of missing) console.error(`missing from public/media: ${n}`);
for (const n of orphaned) console.warn(`unreferenced in public/media: ${n}`);

console.log(
  `${referenced.size} referenced, ${onDisk.size} on disk, ` +
    `${missing.length} missing, ${orphaned.length} unreferenced`,
);

process.exit(missing.length ? 1 : 0);
