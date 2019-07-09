import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.6.input.txt', 'utf-8')

// 2015
// Day 6: Probably a Fire Hazard
//  1. 569999
//  2. 17836115

const RE = /(?:turn )?(?<ins>\w+) (?<x1>\d+),(?<y1>\d+) through (?<x2>\d+),(?<y2>\d+)/

const initGrid = () =>
  Array.from({ length: 1000 }, () => Array.from({ length: 1000 }, () => 0))

const parseInput = input =>
  input.split(/\r?\n/g).map(l => ({ ...RE.exec(l).groups }))

const makeInt = ({ ins, x1, y1, x2, y2 }) => ({
  ins,
  x1: +x1,
  y1: +y1,
  x2: +x2,
  y2: +y2,
})

const exec = ops => ({ ins, x1, y1, x2, y2 }) => grid => {
  const op = ops[ins]
  for (let y = y1; y <= y2; y += 1)
    for (let x = x1; x <= x2; x += 1) op(x, y)(grid)
  return grid
}

const instructions = parseInput(input).map(makeInt)

// Part One

const ops1 = {
  toggle: (x, y) => grid => (grid[y][x] = !grid[y][x]),
  on: (x, y) => grid => (grid[y][x] = true),
  off: (x, y) => grid => (grid[y][x] = false),
}

const exec1 = exec(ops1)

const grid1 = initGrid()
const finishedGrid1 = instructions.reduce((a, c) => exec1(c)(a), grid1)
const result1 = finishedGrid1.flat().filter(Boolean).length

console.log(result1)

// Part Two

const ops2 = {
  toggle: (x, y) => grid => (grid[y][x] = grid[y][x] + 2),
  on: (x, y) => grid => (grid[y][x] = grid[y][x] + 1),
  off: (x, y) => grid => (grid[y][x] = grid[y][x] === 0 ? 0 : grid[y][x] - 1),
}

const exec2 = exec(ops2)

const grid2 = initGrid()
const finishedGrid2 = instructions.reduce((a, c) => exec2(c)(a), grid2)
const result2 = finishedGrid2
  .flat()
  .filter(Boolean)
  .reduce((a, c) => a + c, 0)

console.log(result2)
