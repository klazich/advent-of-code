import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.18.input.txt', 'utf-8')

// 2015
// Day 18: Like a GIF For Your Yard
//  1. 1061
//  2. 1006

// A light which is on stays on when 2 or 3 neighbors are on, and turns off otherwise.
// A light which is off turns on if exactly 3 neighbors are on, and stays off otherwise.

const parseInput = input =>
  input.split(/\r?\n/g).map(str => str.split('').map(v => (v === '#' ? 1 : 0)))

// Part One

const adjacent = (x, y) =>
  [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ].filter(([x, y]) => x >= 0 && y >= 0 && x < 100 && y < 100)

const count = state => cells => {
  // console.log(cells)
  return cells.reduce((a, [x, y]) => state[y][x] + a, 0)
}

const nextCellState1 = state => (x, y) => {
  const c = count(state)(adjacent(x, y))
  if (c === 2) return state[y][x]
  if (c === 3) return 1
  return 0
}

const exec1 = state => {
  const getNext = nextCellState1(state)
  let next = Array.from({ length: 100 }, () => Array(100).fill(false))
  for (let y = 0; y < 100; y += 1) {
    for (let x = 0; x < 100; x += 1) {
      next[y][x] = getNext(x, y)
    }
  }
  return next
}

const run1 = function*(state) {
  let s = state
  while (true) {
    s = exec1(s)
    yield s
  }
}

const init1 = parseInput(input)
const iter1 = run1(init1)

let last1
for (let i = 0; i < 100; i += 1) {
  last1 = iter1
    .next()
    .value.flat()
    .filter(Boolean).length
}

console.log(last1)

// Part Two

const isCorner = (x, y) =>
  (x === 0 && y === 0) ||
  (x === 0 && y === 99) ||
  (x === 99 && y === 0) ||
  (x === 99 && y === 99)

const nextCellState2 = state => (x, y) => {
  if (isCorner(x, y)) return 1
  const c = count(state)(adjacent(x, y))
  if (c === 2) return state[y][x]
  if (c === 3) return 1
  return 0
}

const exec2 = state => {
  const getNext = nextCellState2(state)
  let next = Array.from({ length: 100 }, () => Array(100).fill(false))
  for (let y = 0; y < 100; y += 1) {
    for (let x = 0; x < 100; x += 1) {
      next[y][x] = getNext(x, y)
    }
  }
  return next
}

const run2 = function*(state) {
  let s = state
  while (true) {
    s = exec2(s)
    yield s
  }
}

const init2 = parseInput(input).map((row, y) =>
  row.map((v, x) => (isCorner(x, y) ? 1 : v))
)
const iter2 = run2(init2)

let last2
for (let i = 0; i < 100; i += 1) {
  last2 = iter2
    .next()
    .value.flat()
    .filter(Boolean).length
}

console.log(last2)
