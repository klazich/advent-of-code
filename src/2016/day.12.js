import { readFileSync } from 'fs'

const input = readFileSync('./input/2016/day.12.input.txt', 'utf-8')

// 2016
// Day 12: Leonardo's Monorail
//  1. 318083
//  2. 9227737

const scanInput = input =>
  input
    .split(/\r?\n/g)
    .map(str => str.split(' ').map(v => (/\d/.test(v) ? +v : v)))

const get = state => x => (Number.isInteger(x) ? x : state[x])

const cpy = n => reg => state => ({ ...state, [reg]: get(state)(n) })
const inc = reg => state => ({ ...state, [reg]: state[reg] + 1 })
const dec = reg => state => ({ ...state, [reg]: state[reg] - 1 })
const jnz = reg => n => state =>
  get(state)(reg) !== 0 ? { ...state, line: state.line + n - 1 } : state

const ops = type => ({ cpy, inc, dec, jnz }[type])

const exec = ins => ins.reduce((fn, token) => fn(token), ops)
const next = state => ({ ...state, line: state.line + 1 })

const init = { line: 0, a: 0, b: 0, c: 1, d: 0 }
const run = instructions => (state = init) => {
  while (state.line < instructions.length) {
    state = next(exec(instructions[state.line])(state))
    // console.log(state)
  }
  return state
}

const result = run(scanInput(input))()
console.log(result)
