import { readFileSync } from 'fs'

const INPUT = 'amgozmfv'

// 2017
// Day 14: Disk Defragmentation
//  1. 8222
//  2.

const readSpan = arr => (s, len) =>
  s + len > arr.length
    ? [...arr.slice(s), ...arr.slice(0, s + len - arr.length)]
    : arr.slice(s, s + len)

const writeSpan = arr => s => rep =>
  s + rep.length > arr.length
    ? [
        ...rep.slice(arr.length - s),
        ...arr.slice(s + rep.length - arr.length, s),
        ...rep.splice(0, arr.length - s),
      ]
    : [...arr.slice(0, s), ...rep, ...arr.slice(s + rep.length)]

const getList = () => Array.from({ length: 256 }, (_, i) => i)
const hash = code => ({ s = 0, skip = 0, arr = getList() } = {}) =>
  code.reduce(
    ({ s, skip, arr }, len) => ({
      s: (s + len + skip) % arr.length,
      skip: skip + 1,
      arr: writeSpan(arr)(s)(readSpan(arr)(s, len).reverse()),
    }),
    { s, skip, arr }
  )

const pipe = (...fns) => init => fns.reduce((x, f) => f(x), init)
const nTimesApplyFn = n => fn => pipe(...Array.from({ length: n }, () => fn))
const hash64 = code => nTimesApplyFn(64)(hash(code))

const block16 = ({ arr }) =>
  arr.reduce(
    ({ blocks, block }, c) =>
      block.length === 15
        ? { blocks: [...blocks, [...block, c]], block: [] }
        : { blocks, block: [...block, c] },
    { blocks: [], block: [] }
  )

const xorBlocks = ({ blocks }) => blocks.map(arr => arr.reduce((a, c) => a ^ c))

const rowMsg = r => `${INPUT}-${r}`
const charCodes = msg => [
  ...msg.split('').map(ch => ch.charCodeAt(0)),
  17,
  31,
  73,
  47,
  23,
]

const msg = pipe(
  rowMsg,
  charCodes
)

const B = n => n.toString(16)

const hashRow = r =>
  pipe(
    hash64(msg(r)),
    block16,
    xorBlocks,
    arr => arr.map(n => (B(n).length < 2 ? '0' + B(n) : B(n))),
    arr => arr.join('').split(''),
    arr => arr.map(v => parseInt(v, 16)),
    arr => arr.map(v => ('0000' + v.toString(2)).substr(-4)),
    arr => arr.join('').split(''),
    arr => arr.map(v => +v)
  )

const GRID = Array.from({ length: 128 }, (_, i) => hashRow(i)())

// console.log(GRID.flat().filter(v => v !== 0).length)

// Part Two

const adjacency = n => ([x, y]) =>
  [[x, y + 1], [x, y - 1], [x + 1, y], [x - 1, y]].filter(
    ([x, y]) => x >= 0 && x < n && y >= 0 && y < n
  )

const adjacency128 = adjacency(128)

const buildAdjacencyList = grid => {
  let list = []
  for (let y in grid) {
    for (let x in grid[y]) {
      const v = grid[y][x]
      if (v === 0) continue

      const adjacent = adjacency128([+x, +y])
      const adjacentOn = adjacent.filter(([j, i]) => grid[i][j] === 1)

      list = [
        ...list,
        [`${x} ${y}`, ...adjacentOn.map(([a, b]) => `${a} ${b}`)],
      ]
    }
  }
  return list
}

const unique = adjacents => [...new Set(adjacents.flat())]

const ADJS = buildAdjacencyList(GRID)
const ON_COS = unique(ADJS)

let cur = ADJS
let pre

do {
  let seen = new Set()
  let groups = []

  for (let co of ON_COS) {
    if (seen.has(co)) continue

    let group = new Set([co])

    for (let adj of cur) {
      if (adj.some(v => group.has(v))) {
        adj.forEach(v => group.add(v))
      }
    }

    groups = [...groups, [...group]]
    seen = new Set(groups.flat())
  }

  pre = cur
  cur = groups
} while (cur.length !== pre.length)

console.log(cur, cur.length)
