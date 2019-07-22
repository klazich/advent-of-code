import { writeFileSync } from 'fs'

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

export const GRID = Array.from({ length: 128 }, (_, i) => hashRow(i)())

// console.log(GRID.flat().filter(v => v !== 0).length)

// Part Two

let c = 1

const MAP = GRID.reduce(
  (m, arr, y) =>
    arr.reduce((mm, v, x) => (v === 1 ? { ...mm, [`${y} ${x}`]: c++ } : mm), m),
  {}
)

const S = (...c) => c.join(' ')

const adjacent = str => {
  const [y, x] = str.split(' ').map(v => +v)
  return [S(y + 1, x), S(y - 1, x), S(y, x + 1), S(y, x - 1)]
}

const minAdjs = map => str => {
  const val = k => map[k] || Infinity
  const adjs = adjacent(str)
  return Math.min(...[val(str), ...adjs.map(s => val(s))])
}

const exec = map => {
  let next = {}
  for (let str of Object.keys(map)) {
    next[str] = minAdjs(map)(str)
  }
  return next
}
