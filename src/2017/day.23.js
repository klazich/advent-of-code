import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.23.input.txt', 'utf-8')

// 2017
// Day 23: Coprocessor Conflagration
//  1. 6241
//  2. 909

const RE = /(\w+) ([a-z]|-?\d+)(?: ([a-z]|-?\d+))?/
const scan = input =>
  input.split(/\r?\n/g).map(str =>
    RE.exec(str)
      .slice(1)
      .filter(Boolean)
      .map(v => (/-?\d+/.test(v) ? +v : v))
  )

const v = R => x => (/[a-z]/.test(x) ? R[x] || 0 : x)
const n = R => ({ ...R, n: R.n + 1 })

//  - set X Y - sets register X to the value of Y.
//  - sub X Y - decreases register X by the value of Y.
//  - mul X Y - sets register X to the result of multiplying the value contained in register X by
//    the value of Y.
//  - jnz X Y - jumps with an offset of the value of Y, but only if the value of X is not zero. (An
//    offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction,
//    and so on.)

const set = x => y => R => n({ ...R, [x]: v(R)(y) })
const sub = x => y => R => n({ ...R, [x]: (R[x] || 0) - v(R)(y) })
const mul = x => y => R => n({ ...R, [x]: (R[x] || 0) * v(R)(y) })
const jnz = x => y => R => n(v(R)(x) !== 0 ? { ...R, n: R.n + v(R)(y) - 1 } : R)

const ops = ins => ({ set, sub, mul, jnz }[ins])

const exec = ins => ins.reduce((f, token) => f(token), ops)

const run = instructions => (init = { n: 0 }) => {
  let state = init
  let count = 0
  while (state.n < instructions.length) {
    if (instructions[state.n][0] === 'mul') count += 1
    state = exec(instructions[state.n])(state)
    console.log(state.b, state.c, state.d, state.e)
  }
  console.log(count)
  return state
}

// function isPrime(n) {
//   return !Array(n + 1)
//     .join(1)
//     .match(/^1?$|^(11+?)\1+$/)
// }

const RE_PRIME = /^1?$|^(11+?)\1+$/
const isPrime = n =>
  !Array.from({ length: n }, () => 1)
    .join('')
    .match(RE_PRIME)

let comps = new Set()
for (let i = 108100; i <= 125100; i += 17) {
  console.log(i)
  if (!isPrime(i)) comps.add(i)
}
console.log(comps.size)
