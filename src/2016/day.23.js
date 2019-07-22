import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2016/day.23.input.txt', 'utf-8')

// 2016
// Day 23: Safe Cracking
//  1.
//  2.

// - tgl x toggles the instruction x away (pointing at instructions like jnz
//   does: positive means forward; negative means backward):
//
// - For one-argument instructions, inc becomes dec, and all other one-argument
//   instructions become inc.
// - For two-argument instructions, jnz becomes cpy, and all other
//   two-instructions become jnz.
// - The arguments of a toggled instruction are not affected.
// - If an attempt is made to toggle an instruction outside the program,
//   nothing happens.
// - If toggling produces an invalid instruction (like cpy 1 2) and an attempt
//   is later made to execute that instruction, skip it instead.
// - If tgl toggles itself (for example, if a is 0, tgl a would target itself
//   and become inc a), the resulting instruction is not executed until the next
//   time it is reached.

const pipe = (...fns) => init => fns.reduce((x, f) => f(x), init)

const scan = input =>
  input
    .split(/\r?\n/g)
    .map(str => str.split(' ').map(v => (/\d/.test(v) ? +v : v)))

const get = state => x => (Number.isInteger(x) ? x : state[x])

const check = ins => ([type, a, b]) => {
  if (type === 'cpy') return /[abcd]/.test(b)
  if (type === 'inc' || type === 'dec') return /[abcd]/.test(a)
  return true
}

const cpy = n => r => ({ R, I }) => ({ R: { ...R, [r]: get(R)(n) }, I })
const inc = r => ({ R, I }) => ({ R: { ...R, [r]: R[r] + 1 }, I })
const dec = r => ({ R, I }) => ({ R: { ...R, [r]: R[r] - 1 }, I })
const jnz = r => n => ({ R, I }) =>
  get(R)(r) !== 0 ? { R: { ...R, ln: R.ln + get(R)(n) - 1 }, I } : { R, I }

const tgl = n => ({ R, I }) => {
  const ln = R.ln + get(R)(n)
  if (I[ln] === undefined) return { R, I }
  let nI = [...I]

  nI[ln][0] =
    nI[ln][2] === undefined
      ? nI[ln][0] === 'inc'
        ? 'dec'
        : 'inc'
      : nI[ln][0] === 'jnz'
      ? 'cpy'
      : 'jnz'

  return { R, I: nI }
}

const ops = type => ({ cpy, inc, dec, jnz, tgl }[type])
const exec = ins => ins.reduce((fn, token) => fn(token), ops)
const chex = ins => state => (check(ins) ? exec(ins)(state) : state)

const next = ({ R, I }) => ({ R: { ...R, ln: R.ln + 1 }, I })

const run = instructions => (init = { ln: 0, a: 0, b: 0, c: 1, d: 0 }) => {
  let state = { R: init, I: instructions }

  let i = 0
  while (state.R.ln >= 0 && state.R.ln < instructions.length) {
    if (state.I[state.R.ln][0] === 'tgl') console.log(state)
    state = next(chex(state.I[state.R.ln])(state))
    console.log(state.R, state.I[state.R.ln].join(' '))
    if (i === 20) break
    i += 1
  }

  return state
}

console.log(run(scan(INPUT))())
