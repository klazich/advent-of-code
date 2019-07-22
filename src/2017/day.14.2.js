import MAP from './day.14.map'
import { GRID } from './day.14'

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

const size = map => new Set(Object.values(map)).size

const run = map => {
  let next = map
  let cur
  let pre = size(next)
  while (cur !== pre) {
    next = exec(next)
    pre = cur
    cur = size(next)
  }
  return cur
}

// console.log(run(MAP))

let input = 'amgozmfv',
  grid = GRID,
  used = 0

// function countBits(num) {
//   return num > 0 ? (num % 2) + countBits(num >> 1) : 0
// }

// for (let i = 0; i < 128; i++) {
//   let h = hash(input + '-' + i)
//     .split('')
//     .map(x => parseInt(x, 16))
//   used += h.map(countBits).reduce((a, b) => a + b)
//   grid.push(
//     h
//       .map(x => ('0000' + x.toString(2)).substr(-4))
//       .join('')
//       .split('')
//   ) // convert hash to binary
// }

// console.log(used)

let c = (x, y) => (x < 0 || y < 0 || x > 127 || y > 127 ? 0 : grid[x][y])

function removeGroup(x, y) {
  if (c(x, y) == 0) return
  grid[x][y] = 0
  removeGroup(x + 1, y)
  removeGroup(x - 1, y)
  removeGroup(x, y + 1)
  removeGroup(x, y - 1)
}

let groups = 0
for (let x = 0; x < 128; x++)
  for (let y = 0; y < 128; y++)
    if (c(x, y) == 1) {
      groups++
      removeGroup(x, y)
    }
console.log(groups)
