const STEPS = 12386363

// 2017
// Day 25: The Halting Problem
//  1. 4385
//  2.

// 0 A  0:1rB  1:0lE
// 1 B  0:1lC  1:0rA
// 2 C  0:1lD  1:0rC
// 3 D  0:1lE  1:0lF
// 4 E  0:1lA  1:1lC
// 5 F  0:1lE  1:1rA

const states = {
  0: { 0: [1, 1, 1], 1: [0, -1, 4] }, //  A
  1: { 0: [1, -1, 2], 1: [0, 1, 0] }, //  B
  2: { 0: [1, -1, 3], 1: [0, 1, 2] }, //  C
  3: { 0: [1, -1, 4], 1: [0, -1, 5] }, // D
  4: { 0: [1, -1, 0], 1: [1, -1, 2] }, // E
  5: { 0: [1, -1, 4], 1: [1, 1, 0] }, //  F
}

// const ins = ({ T, S, C }) => states[S][T[C] || 0]

// const exec = ({ T, S, C }) => {
//   const [w, m, s] = ins({ T, S, C })
//   T[C] = w
//   return { T, S: s, C: C + m }
// }

const ins = states => (t, s, c) => states[s][t[c] || 0]

const turing = states =>
  function*(init = 0) {
    const get = ins(states)

    let tape = { 0: 0 }
    let state = init
    let cursor = 0

    while (true) {
      const [w, m, n] = get(tape, state, cursor)
      tape[cursor] = w
      state = n
      cursor += m
      yield { tape, state, cursor }
    }
  }

const iter = turing(states)()

let cur
for (let i = 0; i < STEPS; i += 1) cur = iter.next()

const part1 = Object.values(cur.value.tape).filter(v => v === 1).length

console.log(part1)
