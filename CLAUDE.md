# CLAUDE.md — mini-projects

Context for Claude (or any coding agent) working in this repository.

---

## What this is

Three small, finished programs. Plain Node 18+ or a plain browser.

```
wordle-cli/       Wordle in the terminal          ~75 lines
game-of-life/     Conway's Game of Life on canvas ~130 lines
passphrase/       Diceware passphrase generator   ~35 lines
```

---

## The one rule

**No dependencies. No build step. No `package.json`.**

That is the entire point of this repository, not an accident of it being small. Every one
of these should still run five years from now with whatever Node is current then, and
each should be copyable as a single folder into anything.

This means:
- No npm packages, not even tiny ones. No chalk — write the ANSI escape codes.
- No bundler, no TypeScript, no transpiler.
- `game-of-life/index.html` is one file. HTML, CSS and JS stay inline; it must open by
  double-clicking, with no server.

If a change requires adding a dependency, the change is wrong for this repository.

---

## Per-project notes

### wordle-cli

**The duplicate-letter scoring is the part that matters and the part that is easy to
break.** Guessing `SPEED` against `ERASE` must mark only *one* of the two E's yellow,
because the answer contains one E not already claimed by a green.

It works in two passes: greens are assigned first and their letters removed from the
available pool, then the remaining letters are checked for yellows against what is left.
A single-pass scorer looks correct and is wrong — that is the classic Wordle-clone bug.

If you touch the scorer, test `SPEED`/`ERASE`, `LLAMA`/`ALLAY`, and a guess with three of
a letter against an answer with one.

**Hard mode** (`--hard`) enforces reuse of every revealed hint. It is a real constraint,
not a cosmetic flag; do not let a guess through that ignores a green or yellow.

### game-of-life

Four rules, and all the behaviour comes out of them: a live cell with two or three live
neighbours survives, a dead cell with exactly three becomes alive, everything else dies.

Edges wrap, so a glider leaving the right side returns on the left. Keep that — a bounded
grid kills gliders at the wall and makes the seed patterns much less interesting.

Keys: `Space` play/pause, `S` step, `R` random soup, `C` clear. Mouse drag draws.
Seed patterns: glider, Gosper glider gun, pulsar, R-pentomino.

The next generation is computed into a **new** buffer and swapped in. Do not mutate the
grid in place while reading neighbours from it — cells later in the sweep would see the
new state of their earlier neighbours, which is a different and wrong automaton.

### passphrase

**Randomness comes from `crypto.randomInt`, never `Math.random`.** This is the whole
reason the program exists. `Math.random` is a fast PRNG that was never designed to be
unpredictable and has no business near a password. Do not swap it in for any reason,
including "it's simpler."

The entropy readout goes to **stderr** so the passphrase alone survives a pipe:

```bash
node passphrase/passphrase.mjs > secret.txt
```

The number reported is `log2(wordlist_length) × word_count` — strength against an attacker
who knows exactly which generator and wordlist you used. That is the only threat model
worth quoting. Do not inflate it by assuming the attacker is ignorant of the method.

If you extend the wordlist, keep the words short, common, and unambiguous to type. Entropy
per word rises only as `log2`, so doubling the list buys one bit — a longer passphrase is
almost always the better trade.

---

## Conventions

- ESM (`.mjs`) for the Node programs.
- Two-space indent, single quotes, semicolons.
- Argument parsing is hand-rolled — a few `process.argv` checks. Fine at this size.
- Each program prints usage on `--help`.

---

## Things a fresh agent gets wrong

1. **Adding a dependency.** See the one rule.
2. **Adding a `package.json` "for the scripts."** There is nothing to install, so there is
   nothing to script.
3. **Splitting `game-of-life/index.html` into separate CSS and JS files.** It must stay
   one double-clickable file.
4. **Single-pass Wordle scoring.** See above.
5. **Replacing `crypto.randomInt` with `Math.random`.** See above.
6. **Sending the entropy readout to stdout.** It would end up in the file when someone
   redirects the passphrase.
