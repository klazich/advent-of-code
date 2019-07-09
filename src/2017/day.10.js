import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.10.input.txt', 'utf-8').trim()

// 2017
// Day 10: Knot Hash
//  1. 9656
//  2. 20b7b54c92bf73cf3e5631458a715149

const LENS = INPUT.split(/,/g).map(v => +v)
const LIST = Array.from({ length: 256 }, (_, i) => i)

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

const hash = lens => ({ s = 0, skip = 0, arr = LIST } = {}) =>
  lens.reduce(
    ({ s, skip, arr }, len) => ({
      s: (s + len + skip) % arr.length,
      skip: skip + 1,
      arr: writeSpan(arr)(s)(readSpan(arr)(s, len).reverse()),
    }),
    { s, skip, arr }
  )

console.log(hash(LENS)({ arr: LIST }))

// Part Two

const CHAR_CODES = INPUT.split('').map(ch => ch.charCodeAt(0))
const LENS_2 = [...CHAR_CODES, 17, 31, 73, 47, 23]

const pipe = (...fns) => init => fns.reduce((x, f) => f(x), init)
const applyNTimes = n => fn => pipe(...Array.from({ length: n }, () => fn))
const hash64 = applyNTimes(64)(hash(LENS_2))

const block16 = ({ arr }) =>
  arr.reduce(
    ({ blocks, block }, c) =>
      block.length === 15
        ? { blocks: [...blocks, [...block, c]], block: [] }
        : { blocks, block: [...block, c] },
    { blocks: [], block: [] }
  )

const xorBlocks = ({ blocks }) => blocks.map(arr => arr.reduce((a, c) => a ^ c))

const part2 = pipe(
  hash64,
  block16,
  xorBlocks,
  arr => arr.map(n => n.toString(16)),
  arr => arr.join('')
)

console.log(part2())
