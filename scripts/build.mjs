import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

const entries = [
  "index.html",
  "index.css",
  ".nojekyll",
  "app.json",
  "humans.txt",
  "LICENSE.md",
  "data",
  "js"
];

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true });
}
mkdirSync(dist, { recursive: true });

for (const entry of entries) {
  const source = join(root, entry);
  if (existsSync(source)) {
    cpSync(source, join(dist, entry), { recursive: true });
  }
}

console.log("Built static GitHub Pages site in dist/");
