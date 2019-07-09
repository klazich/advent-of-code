import { readFileSync } from 'fs'

const input = readFileSync('./input/2016/day.2.input.txt', 'utf-8')

// 2016
// Day 2: Bathroom Security
//  1. 98575
//  2. CD8D4

const instructions = input.split(/\r?\n/g)

// Part One

// 1 2 3
// 4 5 6
// 7 8 9

const MAP1 = {
  1: { U: 1, D: 4, L: 1, R: 2 },
  2: { U: 2, D: 5, L: 1, R: 3 },
  3: { U: 3, D: 6, L: 2, R: 3 },
  4: { U: 1, D: 7, L: 4, R: 5 },
  5: { U: 2, D: 8, L: 4, R: 6 },
  6: { U: 3, D: 9, L: 5, R: 6 },
  7: { U: 4, D: 7, L: 7, R: 8 },
  8: { U: 5, D: 8, L: 7, R: 9 },
  9: { U: 6, D: 9, L: 8, R: 9 },
}

const next1 = ins => ({ n }) => ({ n: MAP1[n][ins] })

const run1 = function*(init = 5) {
  let state = { n: init }
  while (true) {
    const ins = yield state
    state = next1(ins)(state)
  }
}

const iter1 = run1()
iter1.next()

const code1 = instructions.map(instruction => {
  let n
  for (let ins of instruction.split``) {
    n = iter1.next(ins).value.n
  }
  return n
}).join``

console.log(code1)

// Part Two

//     1
//   2 3 4
// 5 6 7 8 9
//   A B C
//     D

const [A, B, C, D] = ['A', 'B', 'C', 'D']

const MAP2 = {
  1: { U: 1, D: 3, L: 1, R: 1 },
  2: { U: 2, D: 6, L: 2, R: 3 },
  3: { U: 1, D: 7, L: 2, R: 4 },
  4: { U: 4, D: 8, L: 3, R: 4 },
  5: { U: 5, D: 5, L: 5, R: 6 },
  6: { U: 2, D: A, L: 5, R: 7 },
  7: { U: 3, D: B, L: 6, R: 8 },
  8: { U: 4, D: C, L: 7, R: 9 },
  9: { U: 9, D: 9, L: 8, R: 9 },
  A: { U: 6, D: A, L: A, R: B },
  B: { U: 7, D: D, L: A, R: C },
  C: { U: 8, D: C, L: B, R: C },
  D: { U: B, D: D, L: D, R: D },
}

const next2 = ins => ({ n }) => ({ n: MAP2[n][ins] })

const run2 = function*(init = 5) {
  let state = { n: init }
  while (true) {
    const ins = yield state
    state = next2(ins)(state)
  }
}

const iter2 = run2()
iter2.next()

const code2 = instructions.map(instruction => {
  let n
  for (let ins of instruction.split``) {
    n = iter2.next(ins).value.n
  }
  return n
}).join``

console.log(code2)
