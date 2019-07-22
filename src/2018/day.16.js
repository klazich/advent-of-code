import { readFileSync } from 'fs'

const INPUT_1 = readFileSync('./input/2018/day.16.input.1.txt', 'utf-8')
const INPUT_2 = readFileSync('./input/2018/day.16.input.2.txt', 'utf-8')

// 2018
// Day 16: Chronal Classification
//  1. 588
//  2. 627

const o = (a, b, c, d) => ({ 0: a, 1: b, 2: c, 3: d })

const scan1 = input =>
  input
    .split(/\r?\n\r?\n/g)
    .map(s => s.split(/\r?\n/g).map(s => s.match(/\d+/g).map(v => +v)))
    .map(([a, b, c]) => ({ ins: b, before: o(...a), after: o(...c) }))

const scan2 = input => input.split(/\r?\n/g).map(s => s.split(' ').map(v => +v))

// const S = (a, b, c, d) => `${a} ${b} ${c} ${d}`
const S = o => `${o[0]} ${o[1]} ${o[2]} ${o[3]}`
const C = str => str.split(' ').map(v => +v)

const addr = (x, y, z) => R => ({ ...R, [z]: R[x] + R[y] })
const addi = (x, y, z) => R => ({ ...R, [z]: R[x] + y })
const mulr = (x, y, z) => R => ({ ...R, [z]: R[x] * R[y] })
const muli = (x, y, z) => R => ({ ...R, [z]: R[x] * y })
const banr = (x, y, z) => R => ({ ...R, [z]: R[x] & R[y] })
const bani = (x, y, z) => R => ({ ...R, [z]: R[x] & y })
const borr = (x, y, z) => R => ({ ...R, [z]: R[x] | R[y] })
const bori = (x, y, z) => R => ({ ...R, [z]: R[x] | y })
const setr = (x, y, z) => R => ({ ...R, [z]: R[x] })
const seti = (x, y, z) => R => ({ ...R, [z]: x })
const gtir = (x, y, z) => R => ({ ...R, [z]: x > R[y] ? 1 : 0 })
const gtri = (x, y, z) => R => ({ ...R, [z]: R[x] > y ? 1 : 0 })
const gtrr = (x, y, z) => R => ({ ...R, [z]: R[x] > R[y] ? 1 : 0 })
const eqir = (x, y, z) => R => ({ ...R, [z]: x === R[y] ? 1 : 0 })
const eqri = (x, y, z) => R => ({ ...R, [z]: R[x] === y ? 1 : 0 })
const eqrr = (x, y, z) => R => ({ ...R, [z]: R[x] === R[y] ? 1 : 0 })

const OPS = [
  borr,
  seti,
  mulr,
  eqri,
  banr,
  bori,
  bani,
  gtri,
  addr,
  muli,
  addi,
  eqrr,
  gtir,
  eqir,
  setr,
  gtrr,
]

const exec = ([id, x, y, z]) => OPS[id](x, y, z)

const run = instructions => (init = { '0': 0, '1': 0, '2': 0, '3': 0 }) =>
  instructions.reduce((state, ins) => exec(ins)(state), init)

console.log(run(scan2(INPUT_2))())
