import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.1.input.txt', 'utf-8')

// 2015
// Day 1: Not Quite Lisp
//  1. 280
//  2. 1797

// Part One

const inc = prop => state => ({ ...state, [prop]: state[prop] + 1 })
const dec = prop => state => ({ ...state, [prop]: state[prop] - 1 })

const incFloor = inc('floor')
const decFloor = dec('floor')

const exec = ch => state => (ch === '(' ? incFloor(state) : decFloor(state))

const run = instructions => init =>
  instructions.reduce((a, c) => exec(c)(a), init)

const result = run(input.split(''))({ floor: 0 })
console.log(result)

// Part Two

const pipe = (...fns) => x => fns.reduce((a, f) => f(a), x)

const incPos = inc('i')
const logIfBase = state => {
  if (state.floor === -1) console.log(state)
  return state
}

const step = ch =>
  pipe(
    incPos,
    exec(ch),
    logIfBase
  )

const run2 = instructions => init =>
  instructions.reduce((a, c) => step(c)(a), init)

const result2 = run2(input.split(''))({ i: 0, floor: 0 })
console.log(result2)
