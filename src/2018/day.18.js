import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2018/day.18.input.txt', 'utf-8').trim()

// 2018
// Day 18: Settlers of The North Pole
//  1. 384416
//  2. 195776

const scan = input => input.split(/\r?\n/g).map(s => s.split(''))

const adjacent = grid => (y, x) =>
  [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x - 1],
    [y, x + 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
  ].filter(
    ([y, x]) => x >= 0 && y >= 0 && x < grid[0].length && y < grid.length
  )

const counts = grid => (y, x) =>
  adjacent(grid)(y, x).reduce(
    ({ o, t, l }, [y, x]) => ({
      o: grid[y][x] === '.' ? o + 1 : o,
      t: grid[y][x] === '|' ? t + 1 : t,
      l: grid[y][x] === '#' ? l + 1 : l,
    }),
    { o: 0, t: 0, l: 0 }
  )

const next = grid => (y, x) => {
  const { t, l } = counts(grid)(y, x)
  const val = grid[y][x]
  return {
    '.': t >= 3 ? '|' : '.',
    '|': l >= 3 ? '#' : '|',
    '#': l >= 1 && t >= 1 ? '#' : '.',
  }[val]
}

const exec = grid => grid.map((row, i) => row.map((_, j) => next(grid)(i, j)))

const D = grid => grid.map(arr => arr.join(''))

const run = n => grid => {
  let next = grid
  for (let i = 0; i < n; i += 1) {
    next = exec(next)
  }
  return next
}

const value = grid =>
  grid.flat().reduce(
    ({ t, l }, v) => ({
      t: v === '|' ? t + 1 : t,
      l: v === '#' ? l + 1 : l,
    }),
    { t: 0, l: 0 }
  )

const GRID = scan(INPUT)

const m10 = run(10)(GRID)
// console.log(D(m10))
// console.log(value(m10))

const S = grid => grid.map(a => a.join('')).join('')

const logRepeated = grid => {
  const seen = new Set()
  let next = grid
  let i = 0
  while (true) {
    seen.add(S(next))
    next = exec(next)
    i += 1
    if (seen.has(S(next))) {
      console.log(i)
      seen.clear()
    }
    if (i === 440) {
      console.log(D(next))
      console.log(value(next))
    }
  }
}

logRepeated(GRID)

// 417 += 28
// @(417 + 23) = 440
