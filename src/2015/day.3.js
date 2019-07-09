import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.3.input.txt', 'utf-8')

// 2015
// Day 3: Perfectly Spherical Houses in a Vacuum
//  1. 2572
//  2. 2631

const parseInput = input => input.split('')
const pipe = (...fns) => x => fns.reduce((a, f) => f(a), x)

// Part One

const north = s => ({ ...s, y: s.y + 1 })
const south = s => ({ ...s, y: s.y - 1 })
const east = s => ({ ...s, x: s.x + 1 })
const west = s => ({ ...s, x: s.x - 1 })

const move = ch => {
  if (ch === '^') return north
  if (ch === 'v') return south
  if (ch === '>') return east
  if (ch === '<') return west
}

const addVisit = s => ({ ...s, visits: s.visits.add(`${s.x} ${s.y}`) })

const step = ch =>
  pipe(
    move(ch),
    addVisit
  )

const run1 = instructions => init =>
  instructions.reduce((a, c) => step(c)(a), init)

const result1 = run1(parseInput(input))({ x: 0, y: 0, visits: new Set() })

console.log(result1.visits.size)

// Part Two

const run2 = instructions => init =>
  instructions.reduce(
    ({ s, rs }, c, i) =>
      i % 2 === 0 ? { rs, s: step(c)(s) } : { s, rs: step(c)(rs) },
    init
  )

const init = { x: 0, y: 0, visits: new Set() }
const result2 = run2(parseInput(input))({ s: { ...init }, rs: { ...init } })

console.log(result2.s.visits.size, result2.rs.visits.size)
console.log(new Set([...result2.s.visits, ...result2.rs.visits]).size)
