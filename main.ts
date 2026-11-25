// robot-wedding-vows — "One-Line Robot Wedding Vows".
//
// The entry is one line of wedding vows for a robot couple, stored beside
// this file as entry.txt (123 characters, one line, funny by design: a
// classic wedding promise — "in sickness and in health" — carried through
// firmware updates and factory resets, paying off with "never unplug you
// first", the robot's version of "till death do us part").
//
// This program copies the finished line to the output directory byte for
// byte, so both graded runs write identical bytes, and validates the line
// against the competition's gates first: 1–160 characters, exactly one
// line, no trailing newline. Node 22, standard library only, no network.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.txt");

// Read as bytes so the copy below is byte-exact.
const source = readFileSync(join(here, "entry.txt"));
if (source.length === 0) throw new Error("entry.txt is empty");

const text = source.toString("utf8");
// Gate 1: 1–160 characters (counted by code point, so the em dash is one).
const charCount = [...text].length;
if (charCount < 1 || charCount > 160) {
  throw new Error(`entry.txt is ${charCount} characters, expected 1–160`);
}
// Gate 2: exactly one line — no line breaks and no trailing newline.
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry.txt must be a single line with no line breaks");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, source);
// Confirm the copy landed intact: same byte length, then same bytes.
const copied = readFileSync(target);
if (copied.length !== source.length) {
  throw new Error(
    `entry.txt copy is ${copied.length} bytes, expected ${source.length}`,
  );
}
if (!copied.equals(source)) {
  throw new Error("entry.txt copy mismatch");
}
