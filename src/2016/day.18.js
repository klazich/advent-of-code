import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2016/day.18.input.txt', 'utf-8')

// 2016
// Day 18: Like a Rogue
//  1. 1951
//  2. 20002936

const trap = reqs =>
  ({
    '^^.': '^',
    '.^^': '^',
    '^..': '^',
    '..^': '^',
  }[reqs] || '.')

const scan = input => input.trim()

const next = row => i =>
  trap(
    [i - 1, i, i + 1]
      .map(v => (v < 0 || v >= row.length ? '.' : row[v]))
      .join('')
  )

const step = function*(init) {
  let row = init
  while (true) {
    yield row
    row = row
      .split('')
      .map((_, i) => next(row)(i))
      .join('')
  }
}

const exec1 = step(scan(INPUT))
let grid = []
for (let i = 0; i < 40; i += 1) {
  grid = [...grid, exec1.next().value]
}
console.log(
  grid.map(s => s.replace(/\^/g, '').length).reduce((a, c) => a + c, 0)
)

const exec2 = step(scan(INPUT))
let count = 0
for (let i = 0; i < 400000; i += 1) {
  count += exec2.next().value.replace(/\^/g, '').length
}
console.log(count)
