#!/usr/bin/env node
// Diceware-style passphrase generator. No dependencies, Node >= 18.
//   node passphrase.mjs                  4 words:  maple-crater-violin-summit
//   node passphrase.mjs -n 6             more words = more entropy
//   node passphrase.mjs --sep " "        custom separator
//   node passphrase.mjs --digit          append a random 2-digit suffix
//   node passphrase.mjs --count 5        generate several at once

import { randomInt } from 'node:crypto';
import { WORDS } from './wordlist.mjs';

const args = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : dflt;
};
const nWords = Math.max(2, parseInt(flag('-n', '4'), 10) || 4);
const sep = flag('--sep', '-');
const withDigit = args.includes('--digit');
const count = Math.max(1, parseInt(flag('--count', '1'), 10) || 1);

function generate() {
  const words = Array.from({ length: nWords }, () => WORDS[randomInt(WORDS.length)]);
  let phrase = words.join(sep);
  if (withDigit) phrase += sep + String(randomInt(100)).padStart(2, '0');
  return phrase;
}

const bitsPerWord = Math.log2(WORDS.length);
const totalBits = (nWords * bitsPerWord + (withDigit ? Math.log2(100) : 0)).toFixed(1);

for (let i = 0; i < count; i++) console.log(generate());
console.error(`\n[${nWords} words × ${bitsPerWord.toFixed(1)} bits (list of ${WORDS.length})${withDigit ? ' + 2 digits' : ''} ≈ ${totalBits} bits of entropy]`);
