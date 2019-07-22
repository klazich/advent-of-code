import { readFileSync, writeFileSync } from 'fs'

const INPUT = readFileSync('./input/2018/day.10.input.txt', 'utf-8')

// 2017
// Day 10: The Stars Align
//  1. RECLRNZE
//  2. 10007

const scan = input =>
  input.split(/\r?\n/g).map(str => str.match(/-?\d+/g).map(v => +v))

const asFn = ([x, y, vx, vy]) => t => [t * vx + x, t * vy + y]

const TIME_FN = scan(INPUT).map(asFn)

const max = values => Math.max(...values)
const min = values => Math.min(...values)

const bounds = values => [
  [min(values.map(([x]) => x)), max(values.map(([, y]) => y))],
  [max(values.map(([x]) => x)), min(values.map(([, y]) => y))],
]

const area = ([[minX, maxY], [maxX, minY]]) => (maxX - minX) * (maxY - minY)

const AREA_TIME = Array.from({ length: 100000 }, (_, t) => ({
  t,
  area: area(bounds(TIME_FN.map(f => f(t)))),
}))

const MESSAGE_TIME = 10007
const MESSAGE_COORDS = TIME_FN.map(f => f(MESSAGE_TIME))
// const MESSAGE_BOUNDS = bounds(MESSAGE_COORDS)
const FOCUSED_MSG_COORDS = MESSAGE_COORDS.map(([x, y]) => [x - 117, y - 156])

console.log(bounds(FOCUSED_MSG_COORDS))

const GRID = FOCUSED_MSG_COORDS.reduce((grid, [x, y]) => {
  grid[y][x] = '#'
  return grid
}, Array.from({ length: 10 }, () => Array.from({ length: 62 }, () => ' ')))
  .map(arr => arr.join(''))
  .join('\n')

writeFileSync('./src/2018/day.10.output', GRID)
