import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.13.input.txt', 'utf-8').trim()

// 2017
// Day 13: Packet Scanners
//  1. 1476
//  2. 3937334

const scan = input =>
  input.split(/\r?\n/g).map(str => str.split(/: /g).map(v => +v))

// Part One

const index = r => t =>
  t % (2 * (r - 1)) >= r - 1
    ? r - 1 - ((t % (2 * (r - 1))) % (r - 1))
    : t % (2 * (r - 1))

const mapStats = input => input.map(([d, r]) => [d, r, d * r, index(r)])
const filterSeverity = input => input.filter(([d, , , f]) => f(d) === 0)
const sumSeverity = input => input.reduce((a, [, , s]) => a + s, 0)

const pipe = (...fns) => init => fns.reduce((x, f) => f(x), init)

const run1 = pipe(
  scan,
  mapStats,
  filterSeverity,
  sumSeverity
)

console.log(run1(INPUT))

// Part Two

const scannerPosFns = input => t =>
  mapStats(input).map(([d, , , f]) => f(t + d))

const incScanners = function*(input) {
  const posAt = scannerPosFns(input)
  let t = 0
  while (true) {
    yield posAt(t)
    t += 1
  }
}

const iter = incScanners(scan(INPUT))

let t = 0
let arr
while ((arr = iter.next().value).some(e => e === 0)) t += 1

console.log(arr, t)
