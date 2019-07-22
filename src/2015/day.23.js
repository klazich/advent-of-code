import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2015/day.23.input.txt', 'utf-8')

// 2015
// Day 23: Opening the Turing Lock
//  1. 307
//  2. 160

const scan = input =>
  input.split(/\r?\n/g).map(s =>
    /(\w{3}) ([+-]?[\w\d]+),? ?([+-]\d+)?/
      .exec(s)
      .slice(1, 4)
      .filter(Boolean)
      .map(v => (/\d/.test(v) ? +v : v))
  )

const ops = ins =>
  ({
    hlf: r => R => ({ ...R, [r]: R[r] / 2 }),
    tpl: r => R => ({ ...R, [r]: R[r] * 3 }),
    inc: r => R => ({ ...R, [r]: R[r] + 1 }),
    jmp: n => R => ({ ...R, ln: R.ln + n - 1 }),
    jie: r => n => R => ({ ...R, ln: R[r] % 2 === 0 ? R.ln + n - 1 : R.ln }),
    jio: r => n => R => ({ ...R, ln: R[r] === 1 ? R.ln + n - 1 : R.ln }),
  }[ins])

const exec = tokens => tokens.reduce((f, token) => f(token), ops)

const next = R => ({ ...R, ln: R.ln + 1 })

const run = instructions => (init = { a: 0, b: 0, ln: 0 }) => {
  let state = init

  while (state.ln >= 0 && state.ln < instructions.length) {
    state = next(exec(instructions[state.ln])(state))
  }
  return state
}

console.log(run(scan(INPUT))())

console.log(run(scan(INPUT))({ a: 1, b: 0, ln: 0 }))
