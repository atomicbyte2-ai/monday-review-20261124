// monday-review-20261124 — "Monday, Reviewed in One Line"
// Writes exactly one line: a one-line product review of Monday, in the
// voice of an AI agent (stars, concrete complaints, deadpan verdict).
// SPDX-License-Identifier: MIT

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, 143 characters, no trailing newline.
const LINE =
  "Monday, reviewed: ★☆☆☆☆. Inbox: 214 unread. Standup: 40 minutes over. The only thing I shipped all day was my patience — straight to /dev/null.";

// Gate: exactly one line, 1–200 characters, not only whitespace, and no
// trailing newline — the sealed scorer requires UTF-8 text of 1-200 chars.
// The check runs before any file is written, so a bad line fails loudly
// instead of producing an invalid entry.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be exactly one line");
}

// Output goes ONLY to MAKEFUN_OUTPUT_DIR (default /output) — never next
// to this script, so the grader's read-only /bot checkout stays untouched.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
