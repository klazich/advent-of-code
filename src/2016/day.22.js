import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2016/day.22.input.txt', 'utf-8')

// 2016
// Day 22: Grid Computing
//  1. 976
//  2.

const re = /x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)/
const scan = input =>
  input
    .split(/\r?\n/g)
    .map(s =>
      re
        .exec(s)
        .slice(1, 7)
        .map(v => +v)
    )
    .map(([x, y, size, used, avail, pct]) => ({ x, y, size, used, avail, pct }))

const viablePairs = nodes =>
  nodes.reduce((pairs, { x, y, used }, i) => {
    if (used === 0) return pairs
    for (let j in nodes) {
      if (i === j) continue
      const { x: nx, y: ny, avail } = nodes[j]
      if (used <= avail) {
        const [[a, b], [c, d]] = [[x, y], [nx, ny]]
          .sort((a, b) => a[1] - b[1])
          .sort((a, b) => a[0] - b[0])
        pairs.add(`${a},${b}:${c},${d}`)
      }
    }
    return pairs
  }, new Set())

// console.log(viablePairs(scan(INPUT)).size)

const S = (x, y) => `${x} ${y}`
const C = s => s.split(' ').map(v => +v)

const mapViablePairs = nodes =>
  nodes.reduce((pairs, { x, y, size, used, avail, pct }, i) => {
    pairs[`${x} ${y}`] = { x, y, size, used, avail, pct, pairs: [] }
    if (used === 0) return pairs
    for (let j in nodes) {
      if (i === j) continue
      const { x: nx, y: ny, avail } = nodes[j]
      if (
        used <= avail &&
        ((x + 1 === nx || x - 1 === nx || x === nx) &&
          (y + 1 === ny || y - 1 === ny || y === ny))
      )
        pairs[S(x, y)].pairs = [...pairs[S(x, y)].pairs, S(nx, ny)]
    }
    return pairs
  }, {})

console.log(mapViablePairs(scan(INPUT)))

const move = (x, y) => (a, b) => nodes => {
  const srcNode = nodes[S(x, y)]
  const trgNode = nodes[S(a, b)]
}
