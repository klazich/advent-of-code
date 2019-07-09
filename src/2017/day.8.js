import { readFileSync } from 'fs'

const input = readFileSync('./input/2017/day.8.input.txt', 'utf-8')

// 2017
// Day 8: I Heard You Like Registers
//  1. 6611
//  2. 6619

const scanTokens = str =>
  str.split(/\s+/g).map(v => (/[\d-]+/.test(v) ? +v : v))

const swapIns = ([[a, b, c], [x, y, z]]) => ({
  ins: [b, a, c],
  cnd: [y, x, z],
})

const scan = input =>
  input
    .split(/\r?\n/g)
    .map(str => str.split(' if ').map(scanTokens))
    .map(swapIns)

// Part One

const insOps = ins =>
  ({
    inc: reg => n => R => ({ ...R, [reg]: (R[reg] || 0) + n }),
    dec: reg => n => R => ({ ...R, [reg]: (R[reg] || 0) - n }),
  }[ins])

const cndOps = cnd =>
  ({
    '==': reg => y => R => (R[reg] || 0) === y,
    '!=': reg => y => R => (R[reg] || 0) !== y,
    '>=': reg => y => R => (R[reg] || 0) >= y,
    '<=': reg => y => R => (R[reg] || 0) <= y,
    '>': reg => y => R => (R[reg] || 0) > y,
    '<': reg => y => R => (R[reg] || 0) < y,
  }[cnd])

const exec = ins => ins.reduce((f, token) => f(token), insOps)
const test = cnd => cnd.reduce((f, token) => f(token), cndOps)

const run = ({ ins, cnd }) => R => (test(cnd)(R) ? exec(ins)(R) : R)

console.log(scan(input).reduce((a, c) => run(c)(a), {}))

// Part Two

const pipe = (...fns) => x => fns.reduce((s, f) => f(s), x)

const peakValue = R => ({
  ...R,
  peak: Math.max(...Object.values(R)),
})

const step = line =>
  pipe(
    run(line),
    peakValue
  )

console.log(scan(input).reduce((a, c) => step(c)(a), {}))
