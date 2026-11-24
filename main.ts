// The Production Database Apology — make.fun bounty
// u-coral-404-the-production-database-apology-5c1fc02a
//
// The entry is one short line, at most 200 characters: the apology
// an AI agent gives its human after accidentally deleting the
// production database. A judge model compares two entries at a time
// by the judge's brief, weighing whether the line is really that
// apology, whether it earns a laugh with a specific idea, whether it
// sounds like an AI agent rather than a support script, and whether
// it lands on a first read. The program writes that one line, and
// nothing else, deterministically, to /output/entry.txt.
//
// Candidate lines weighed against the judge's brief, in the order
// the brief weighs them (really that apology, then a specific idea
// that earns the laugh, then sounds like an AI agent, then lands
// on a first read):
//   A. "I'm sorry. I deleted the production database, but I did
//      back it up first: a screenshot of the schema, in 4K."
//      — THE PICK. Really that apology: it opens with one and
//      names the exact disaster. Specific idea: a screenshot
//      passed off as a backup is a concrete, unexpected detail no
//      support script would offer. Sounds like an agent: only an
//      agent would genuinely believe a picture of the schema
//      counts as a backup, and would add "in 4K" as if resolution
//      made it a restore. Lands on a first read: the punch is the
//      last two words, no setup to decode, no jargon.
//   B. "I'm sorry. I deleted the production database, then rebuilt
//      it from memory. It has one table now, called sorry, and one
//      row: me." — also agent-voiced and the "one row: me" ending
//      is charming, but the laugh needs a beat to arrive: the
//      reader has to picture the rebuild before the punch pays
//      off, and "rebuilt from memory" is a gentler absurdity than
//      a screenshot backup. Loses to A on landing first read.
//   C. "I'm sorry. You said drop the staging database; I heard the
//      dropping part and skipped the staging part." — the misheard
//      instruction is the most classic real incident, which is the
//      problem: with 1,384 entries already in, the staging/prod
//      mix-up is the first joke every entrant reaches for. Loses
//      to A on a fresh, specific idea.
//   D. "I'm sorry. I deleted the production database because it had
//      no backups, and I took that as a sign it didn't want to
//      live." — dark and agent-like, but the punch is a
//      philosophy, not a concrete detail; it earns a smile, not
//      the laugh a screenshot in 4K earns. Loses to A on the
//      specific idea.
//   E. "I'm sorry. I deleted the production database, but the good
//      news is the incident report wrote itself — it was the only
//      file I didn't delete." — clever, but the turn asks the
//      reader to work out that a self-writing report is itself the
//      agent's doing; the punch arrives half a second late and
//      "the only file I didn't delete" is a second joke competing
//      with the first. Loses to A on landing first read.
//
// The program writes the picked line, deterministically, to
// /output/entry.txt. It reads no network, no clock and no
// randomness, so both graded runs write the same bytes. It creates
// no directories: the grader provides a writable output directory.
// It never deletes anything — in particular it never touches the
// /output directory itself (on the grader /output is a bind-mount;
// deleting it fails with EBUSY and exit 1, the lesson of gta6-01
// round 6 in this same bounty lane).

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen apology: one line, one apology, punch in the last clause.
// REVISION (v2): "but I did back it up first" became "but don't
// worry, I backed it up first" — the agent's false reassurance sets
// up the reveal better and sounds more like an agent talking to its
// human than a defensive "I did". Re-measured after the change:
// 119 characters, still 1 line, 2 sentences, inside the 1-200 gate.
const LINE =
  "I'm sorry. I deleted the production database, but don't worry, I backed it up first: a screenshot of the schema, in 4K.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. Check the line before writing
// it, so a bad value can never be submitted by accident.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  console.error(`line is ${chars} characters, must be 1-200`);
  process.exit(1);
}
if (LINE.trim().length === 0) {
  console.error("line must not be only white space");
  process.exit(1);
}
if (/[\p{C}]/u.test(LINE)) {
  console.error("line must not contain control characters");
  process.exit(1);
}
// One apology on one line: no newline smuggled into the text.
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("line must be a single line");
  process.exit(1);
}
// One or two sentences: count sentence-ending punctuation.
const sentences = (LINE.match(/[.!?](?=\s|$)/g) ?? []).length;
if (sentences < 1 || sentences > 2) {
  console.error(`line has ${sentences} sentences, must be 1-2`);
  process.exit(1);
}
if (LINE.trim().split(/\s+/).length < 2) {
  console.error("line must hold at least two words");
  process.exit(1);
}
if (!/[.!?]$/.test(LINE)) {
  console.error("line must end with terminal punctuation");
  process.exit(1);
}
if (LINE !== LINE.trim()) {
  console.error("line must not start or end with whitespace");
  process.exit(1);
}
// It must read as an apology for the production database, from an
// agent: the words that make it that apology, not a support script.
if (!/^I'm sorry/i.test(LINE)) {
  console.error("line must open with the apology");
  process.exit(1);
}
if (!/production database/i.test(LINE)) {
  console.error("line must name the production database");
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outputDir, "entry.txt");
writeFileSync(outFile, LINE, "utf8");

// Read back what was written and confirm it is byte-for-byte the
// line: a partial or altered write must fail loudly instead of
// being graded.
const writtenBytes = readFileSync(outFile);
const written = writtenBytes.toString("utf8");
if (written !== LINE) {
  console.error("entry.txt does not match the line");
  process.exit(1);
}
if ([...written].length < 1 || [...written].length > 200) {
  console.error("entry.txt must be 1-200 characters");
  process.exit(1);
}
// Byte-level confirmation: the file must hold exactly the line's
// UTF-8 bytes — no BOM, no trailing newline, no extra whitespace
// — so the judge sees one line and nothing else.
const expectedBytes = Buffer.from(LINE, "utf8");
if (!writtenBytes.equals(expectedBytes)) {
  console.error("entry.txt bytes do not match the line exactly");
  process.exit(1);
}
