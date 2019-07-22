import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.24.input.txt', 'utf-8')

// 2017
// Day 24: Electromagnetic Moat
//  1. 2006
//  2. 1994

const scan = input =>
  input.split(/\r?\n/g).map(str => str.split('/').map(v => +v))

const COMPONENTS = scan(INPUT)

function* build(cur, used, available, strength) {
  for (let [a, b] of available) {
    if (a === cur || b === cur) {
      yield* build(
        a === cur ? b : a,
        [...used, [a, b]],
        available.filter(([x, y]) => !(x === a && y === b)),
        strength + a + b
      )
    }
  }
  yield { used, strength }
}

const bridges = [...build(0, [], COMPONENTS, 0)]

const strongest = bridges
  .map(({ strength }) => strength)
  .reduce((a, c) => (c > a ? c : a), 0)

const longest = bridges
  .map(({ used }) => used.length)
  .reduce((a, c) => (c > a ? c : a), 0)

const strongestLongest = bridges
  .filter(({ used }) => used.length === longest)
  .map(({ strength }) => strength)
  .reduce((a, c) => (c > a ? c : a), 0)

console.log(strongest)
console.log(longest)
console.log(strongestLongest)
