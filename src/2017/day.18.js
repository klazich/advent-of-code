import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.18.input.txt', 'utf-8').trim()

// 2017
// Day 18: Duet
//  1. 3423
//  2. 7493

const RE = /(\w+) ([a-z]|-?\d+)(?: ([a-z]|-?\d+))?/
const scan = input =>
  input.split(/\r?\n/g).map(str =>
    RE.exec(str)
      .slice(1)
      .filter(Boolean)
      .map(v => (/-?\d+/.test(v) ? +v : v))
  )

// snd X   - plays a sound with a frequency equal to the value of X.
// set X Y - sets register X to the value of Y.
// add X Y - increases register X by the value of Y.
// mul X Y - sets register X to the result of multiplying the value contained in
//           register X by the value of Y.
// mod X Y - sets register X to the remainder of dividing the value contained in
//           register X by the value of Y (that is, it sets X to the result of X
//           modulo Y).
// rcv X   - recovers the frequency of the last sound played, but only when the
//           value of X is not zero. (If it is zero, the command does nothing.)
// jgz X Y - jumps with an offset of the value of Y, but only if the value of X
//           is greater than zero. (An offset of 2 skips the next instruction,
//           an offset of -1 jumps to the previous instruction, and so on.)

const v = R => x => (/[a-z]/.test(x) ? R[x] || 0 : x)
const n = R => ({ ...R, n: R.n + 1 })

// const set = x => y => R => n({ ...R, [x]: v(R)(y) })
// const add = x => y => R => n({ ...R, [x]: (R[x] || 0) + v(R)(y) })
// const mul = x => y => R => n({ ...R, [x]: (R[x] || 0) * v(R)(y) })
// const mod = x => y => R => n({ ...R, [x]: (R[x] || 0) % v(R)(y) })
// const snd = x => R => n({ ...R, out: v(R)(x) })
// // const rcv = x => R => n(v(R)(x) !== 0 ? { ...R, in: R.out } : R)
// const jgz = x => y => R => n(v(R)(x) > 0 ? { ...R, n: R.n + v(R)(y) - 1 } : R)

// const rcv = x => R => {
//   if (v(R)(x) !== 0 && R.out) console.log(R.out)
//   return n(v(R)(x) !== 0 ? { ...R, in: R.out } : R)
// }

// const ops = ins => ({ set, add, mul, mod, snd, rcv, jgz }[ins])

// const exec = ins => ins.reduce((f, token) => f(token), ops)

// const run = instructions => (init = { n: 0 }) => {
//   let state = init
//   while (state.n < instructions.length) {
//     state = exec(instructions[state.n])(state)
//   }
//   return state
// }

// Part two

const set = x => y => R => n({ ...R, [x]: v(R)(y) })
const add = x => y => R => n({ ...R, [x]: (R[x] || 0) + v(R)(y) })
const mul = x => y => R => n({ ...R, [x]: (R[x] || 0) * v(R)(y) })
const mod = x => y => R => n({ ...R, [x]: (R[x] || 0) % v(R)(y) })
const jgz = x => y => R => n(v(R)(x) > 0 ? { ...R, n: R.n + v(R)(y) - 1 } : R)

const snd = x => R => n({ ...R, que: [...R.que, v(R)(x)] })
const rcv = x => R => n({ ...R, rcv: x })

const ops = ins => ({ set, add, mul, mod, snd, rcv, jgz }[ins])

const exec = ins => ins.reduce((f, token) => f(token), ops)

const dualRun = instructions => (init = { n: 0, que: [] }) => {
  let S0 = { ...init, p: 0 }
  let S1 = { ...init, p: 1 }

  let sendCount = 0

  while (S0.n < instructions.length || S1.n < instructions.length) {
    S0 = exec(instructions[S0.n])(S0)
    S1 = exec(instructions[S1.n])(S1)

    if (S0.rcv) {
      if (S1.que.length > 0) {
        S0[S0.rcv] = S1.que[0]
        S0.rcv = false
        S1.que = S1.que.slice(1)
      } else {
        S0.n = S0.n - 1
      }
    }

    if (S1.rcv) {
      if (S0.que.length > 0) {
        S1[S1.rcv] = S0.que[0]
        S1.rcv = false
        S0.que = S0.que.slice(1)
      } else {
        S1.n = S1.n - 1
      }
    }

    if (instructions[S1.n][0] === 'snd') sendCount += 1

    console.log(sendCount)
  }
}

dualRun(scan(INPUT))()
