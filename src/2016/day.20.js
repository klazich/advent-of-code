import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2016/day.20.input.txt', 'utf-8')

// 2016
// Day 20: Firewall Rules
//  1. 31053880
//  2. 117

const scan = input =>
  input
    .split(/\r?\n/g)
    .map(s => s.split('-').map(v => +v))
    .sort((a, b) => a[0] - b[0])

const reduceInside = ranges =>
  ranges.reduce((a, [s, e]) => {
    for (let [x, y] of ranges) {
      if (x === s && y === e) continue
      if (s >= x && e <= y) return a
    }
    a.push([s, e])
    return a
  }, [])

const reduceOverlap = ranges => {
  let pre = []
  let cur = ranges
  while (cur.length !== pre.length) {
    pre = cur
    cur = cur.reduce((a, [s, e]) => {
      for (let [x, y] of cur) {
        if (x === s && y === e) continue
        if (s >= x && e <= y) return a
        if ((s < x && e >= x && e <= y) || x === e + 1) {
          a.push([s, y])
          break
        }
        if ((s >= x && s <= y && e > y) || s === y + 1) {
          a.push([x, e])
          break
        }
      }
      a.push([s, e])

      return [...new Set(reduceInside(a).map(([x, y]) => `${x} ${y}`))].map(s =>
        s.split(' ').map(v => +v)
      )
    }, [])
  }
  return cur
}

const test = ([x, y]) => v => v < x || v > y

const RANGES = reduceOverlap(reduceInside(scan(INPUT)))
const TESTS = RANGES.map(test)

let open = []
for (let ip = 0; ip <= 4294967295; ip += 1) {
  const endBlackRange = RANGES.reduce(
    (a, [x, y]) => (ip >= x && ip <= y ? [x, y] : y),
    null
  )
  if (endBlackRange) ip = endBlackRange + 1
  // if (TESTS.every(f => f(ip))) open.push(ip)
  console.log(endBlackRange)
  console.log(ip, open.length)
}
console.log(open.length)

const OPEN = RANGES.reduce(
  ({ acc, arr }, [x, y]) =>
    acc.length < 1
      ? { acc: [y + 1], arr }
      : { acc: [y + 1], arr: [...arr, [acc[0], x - 1]] },
  { acc: [], arr: [] }
)
console.log(OPEN)

// RANGES.forEach(e => console.log(e))
