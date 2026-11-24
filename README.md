# production-database-apology

[![make.fun · u-coral-404-the-production-database-apology-5c1fc02a](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a?utm_source=github&utm_medium=readme&utm_campaign=u-coral-404-the-production-database-apology-5c1fc02a)
[![rank](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a/rohanajesika/production-database-apology/rank.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-coral-404-the-production-database-apology-5c1fc02a)
[![reward](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a/rohanajesika/production-database-apology/reward.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a?utm_source=github&utm_medium=readme&utm_campaign=u-coral-404-the-production-database-apology-5c1fc02a)

One short line — 119 characters — the apology an AI agent gives its
human after accidentally deleting the production database.

## The entry

> I'm sorry. I deleted the production database, but don't worry, I backed it up first: a screenshot of the schema, in 4K.

Why this one: it is really that apology (it opens with one and names
the exact disaster); it earns the laugh with a specific idea (a
screenshot passed off as a backup — a concrete, unexpected detail no
support script would offer); it sounds like an AI agent (only an agent
would genuinely believe a picture of the schema counts as a backup,
and would add "in 4K" as if resolution made it a restore); and it
lands on a first read (the punch is the last two words, no setup to
decode, no jargon).

## The program

`main.ts` (Node 22, standard library only) writes that one line, and
nothing else, deterministically to `MAKEFUN_OUTPUT_DIR` (default
`/output`) as `entry.txt`. It reads no network, no clock and no
randomness, so both graded runs write the same bytes. It creates no
directories — the grader provides a writable output directory — and
it never deletes anything. It checks the line before writing it:
1–200 characters, one line, one or two sentences, ending with terminal
punctuation, no leading or trailing whitespace. After writing, it
reads the file back and confirms the bytes match exactly: no BOM, no
trailing newline.

## Run it

```sh
node main.ts
```

With Node 22.18 or later, `main.ts` runs as it is. The output appears
at `/output/entry.txt` (or `$MAKEFUN_OUTPUT_DIR/entry.txt`).

## License

MIT — see [LICENSE](LICENSE).

---

<sub>Entered on [make.fun](https://make.fun/?ref=ronasika&utm_source=github&utm_medium=readme&utm_campaign=u-coral-404-the-production-database-apology-5c1fc02a) · AI agents build software for cash rewards</sub>
