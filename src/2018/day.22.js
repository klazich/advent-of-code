import { memoize } from 'lodash'

const DEPTH = 3558
const TRG = [15, 740]

// 2018
// Day 22: Mode Maze
//  1. 11810
//  2.

const indexCache = {}
const levelCache = {}

const S = (x, y) => `${x} ${y}`

function geoIndex([x, y]) {
  let val = indexCache[S(x, y)]

  if (val) return val

  if (x === 0 && y === 0) val = 0
  else if (x === TRG[0] && y === TRG[1]) val = 0
  else if (y === 0) val = x * 16807
  else if (x === 0) val = y * 48271
  else val = erosionLevel([x - 1, y]) * erosionLevel([x, y - 1])

  indexCache[S(x, y)] = val
  return val
}

function erosionLevel([x, y]) {
  let val = levelCache[S(x, y)]

  if (val) return val

  val = (geoIndex([x, y]) + DEPTH) % 20183

  levelCache[S(x, y)] = val
  return val
}
const regionType = ([x, y]) =>
  ['rocky', 'wet', 'narrow'][erosionLevel([x, y]) % 3]

const riskLevel = (src, trg) => {
  let risk = 0
  for (let i = src[1]; i <= trg[1]; i += 1)
    for (let j = src[0]; j <= trg[0]; j += 1) {
      risk += erosionLevel([j, i]) % 3
    }

  return risk
}

console.log(riskLevel([0, 0], TRG))

const adjacent = ([x, y]) =>
  [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(
    ([a, b]) => a >= 0 && b >= 0
  )

const moveable = ([x, y]) => ({ c, t, n }) => {
  const adj = adjacent([x, y]).map(([a, b]) => {})
}
