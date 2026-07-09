import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Script } from "node:vm";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const files = [
  "js/game.js",
  "js/entities/entities.js",
  "js/entities/HUD.js",
  "js/screens/title.js",
  "js/screens/play.js",
  "js/screens/gameover.js"
];

for (const file of files) {
  const filename = join(root, file);
  const source = readFileSync(filename, "utf8");
  new Script(source, { filename });
}

console.log("JavaScript syntax OK");
