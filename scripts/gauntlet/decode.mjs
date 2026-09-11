// Decodes blind verdicts. The judge reports which panel (A or B) it preferred per
// composite; this maps that back to "ours" or "ref" using the hidden mapping files.
//
//   node scripts/gauntlet/decode.mjs '{"home--stripe":"A","pricing--attio":"B"}'
//   node scripts/gauntlet/decode.mjs --file verdicts.json
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const PAIRS = path.join(ROOT, "gauntlet", "pairs");

const args = process.argv.slice(2);
const raw =
  args[0] === "--file" ? readFileSync(args[1], "utf8") : args[0];
if (!raw) {
  console.error('usage: decode.mjs \'{"home--stripe":"A"}\'  |  decode.mjs --file verdicts.json');
  process.exit(1);
}

const verdicts = JSON.parse(raw);
const rows = [];
for (const [name, choice] of Object.entries(verdicts)) {
  const mapPath = path.join(PAIRS, `${name}.map.json`);
  if (!existsSync(mapPath)) {
    rows.push({ name, choice, result: "NO MAPPING" });
    continue;
  }
  const mapping = JSON.parse(readFileSync(mapPath, "utf8"));
  const picked = mapping[String(choice).trim().toUpperCase()];
  rows.push({ name, choice, winner: picked, meridianWon: picked === "ours" });
}

const wins = rows.filter((r) => r.meridianWon).length;
const total = rows.filter((r) => r.winner).length;
console.log(JSON.stringify({ rows, meridianWins: wins, of: total }, null, 1));
