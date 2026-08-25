#!/usr/bin/env node
// Wordle in the terminal. No dependencies, Node >= 18.
//   node wordle.mjs            play with a random answer
//   node wordle.mjs --hard     hard mode: revealed hints must be reused
//   node wordle.mjs --word=crane   fix the answer (for testing/demos)

import readline from 'node:readline';
import { ANSWERS } from './words.mjs';

const args = process.argv.slice(2);
const HARD = args.includes('--hard');
const forced = (args.find(a => a.startsWith('--word=')) || '').slice(7).toLowerCase();
const ANSWER = forced.length === 5 ? forced : ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
const MAX_TRIES = 6;

const G = s => `\x1b[42m\x1b[30m ${s.toUpperCase()} \x1b[0m`; // green
const Y = s => `\x1b[43m\x1b[30m ${s.toUpperCase()} \x1b[0m`; // yellow
const D = s => `\x1b[100m\x1b[37m ${s.toUpperCase()} \x1b[0m`; // dark gray

export function score(guess, answer) {
  // returns array of 'g' | 'y' | '-' handling duplicate letters correctly
  const res = Array(5).fill('-');
  const pool = {};
  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) res[i] = 'g';
    else pool[answer[i]] = (pool[answer[i]] || 0) + 1;
  }
  for (let i = 0; i < 5; i++) {
    if (res[i] === '-' && pool[guess[i]] > 0) { res[i] = 'y'; pool[guess[i]]--; }
  }
  return res;
}

function paint(guess, marks) {
  return marks.map((m, i) => (m === 'g' ? G : m === 'y' ? Y : D)(guess[i])).join('');
}

function violatesHardMode(guess, history) {
  for (const { guess: g, marks } of history) {
    for (let i = 0; i < 5; i++) {
      if (marks[i] === 'g' && guess[i] !== g[i]) return `position ${i + 1} must be "${g[i].toUpperCase()}"`;
      if (marks[i] === 'y' && !guess.includes(g[i])) return `guess must contain "${g[i].toUpperCase()}"`;
    }
  }
  return null;
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const history = [];
  let tries = 0;
  console.log(`\nWORDLE — guess the 5-letter word in ${MAX_TRIES} tries.${HARD ? ' (hard mode)' : ''}\n`);

  const ask = () => rl.question(`Guess ${tries + 1}/${MAX_TRIES}: `, raw => {
    const guess = raw.trim().toLowerCase();
    if (!/^[a-z]{5}$/.test(guess)) { console.log('  Need exactly 5 letters.\n'); return ask(); }
    if (HARD) {
      const err = violatesHardMode(guess, history);
      if (err) { console.log(`  Hard mode: ${err}\n`); return ask(); }
    }
    const marks = score(guess, ANSWER);
    history.push({ guess, marks });
    tries++;
    console.log('  ' + paint(guess, marks) + '\n');
    if (guess === ANSWER) {
      console.log(`Solved in ${tries}/${MAX_TRIES}! 🎉\n`);
      rl.close();
    } else if (tries >= MAX_TRIES) {
      console.log(`Out of tries — the word was ${ANSWER.toUpperCase()}.\n`);
      rl.close();
    } else ask();
  });
  ask();
}
