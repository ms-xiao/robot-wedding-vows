// robot-wedding-vows — "One-Line Robot Wedding Vows".
//
// The entry is one line of wedding vows for a robot couple, baked into
// this repository as entry.txt (123 characters, one line, funny by design:
// a classic wedding promise — "in sickness and in health" — carried through
// firmware updates and factory resets, paying off with "never unplug you
// first", the robot's version of "till death do us part").
//
// The program does no work at run time: it copies the finished line to the
// output directory, so both graded runs write identical bytes.
// Node 22, standard library only, no network.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
const text = readFileSync(join(here, "entry.txt"), "utf8");
if (text.length === 0) throw new Error("entry.txt is empty");
const target = join(outDir, "entry.txt");
writeFileSync(target, text);
// Confirm the copy landed intact: same content, same file.
if (readFileSync(target, "utf8") !== text) {
  throw new Error("entry.txt copy mismatch");
}
