# mini-projects

[![CI](https://github.com/MattD365/mini-projects/actions/workflows/ci.yml/badge.svg)](https://github.com/MattD365/mini-projects/actions/workflows/ci.yml)

Three small programs, each finished, each dependency-free. Plain Node (18+) or a plain
browser — there is nothing to install.

The constraint is the point. No `package.json`, no build step, no framework: every one of
these should still run five years from now with whatever Node is current then.

---

## Contents

| Project | Runs in | Lines |
|---|---|---|
| [wordle-cli](#wordle-cli) | Terminal | ~75 |
| [game-of-life](#game-of-life) | Browser | ~130 |
| [passphrase](#passphrase) | Terminal | ~35 |

---

## wordle-cli

Wordle in your terminal, with coloured tiles and correct duplicate-letter scoring.

```bash
node wordle-cli/wordle.mjs           # random word
node wordle-cli/wordle.mjs --hard    # hard mode
```

Green means right letter, right place. Yellow means the letter is in the word somewhere
else. Grey means it is not in the word. Six guesses.

In **hard mode** every hint you have been given must be reused in your next guess, which
is a real constraint rather than a cosmetic one.

**The part worth reading** is the duplicate-letter scoring. Guessing `SPEED` against
`ERASE` should mark only *one* of the two E's yellow, because the answer contains one E
that is not already accounted for. Getting this wrong is the classic Wordle-clone bug,
and it is why the scorer runs in two passes: greens are claimed first and their letters
removed from the pool, and only then are the remaining letters checked for yellows.

## game-of-life

Conway's Game of Life on a canvas.

```bash
# macOS
open game-of-life/index.html

# Windows
start game-of-life\index.html

# Linux
xdg-open game-of-life/index.html
```

Or just double-click the file. No server needed.

| Key | Action |
|---|---|
| `Space` | Play / pause |
| `S` | Step one generation |
| `R` | Random soup |
| `C` | Clear the grid |

Drag with the mouse to draw cells. There is a speed slider, and seed patterns are built
in — glider, Gosper glider gun, pulsar, R-pentomino. Edges wrap, so a glider leaving the
right side comes back on the left.

Four rules produce all of it: a live cell with two or three live neighbours survives, a
dead cell with exactly three becomes alive, everything else dies. The R-pentomino is the
one to try if you want to see why that is interesting — five cells that keep going for
over a thousand generations before settling.

## passphrase

A Diceware-style passphrase generator with an honest entropy readout.

```bash
node passphrase/passphrase.mjs                # maple-crater-violin-summit
node passphrase/passphrase.mjs -n 6 --digit   # six words plus a 2-digit suffix
node passphrase/passphrase.mjs --count 5      # five at once, pick your favourite
```

Randomness comes from `crypto.randomInt`, not `Math.random`. That distinction is the
whole reason this exists: `Math.random` is a fast pseudo-random generator that was never
designed to be unpredictable, and it has no business anywhere near a password.

The entropy figure goes to **stderr**, so it shows up on your screen but stays out of a
pipe:

```bash
node passphrase/passphrase.mjs > secret.txt     # file gets the passphrase only
```

**Why "honest" entropy.** The number reported is `log2(wordlist_length) × word_count` —
the actual strength against someone who knows exactly which generator and which wordlist
you used. That is the only threat model worth quoting. Assuming the attacker does not
know your method inflates the number and tells you nothing useful.

---

## License

MIT — see [LICENSE](LICENSE).
